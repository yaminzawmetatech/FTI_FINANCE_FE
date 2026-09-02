import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { calculateAmountsByWriteOffMonth, getWriteOffIds } from "features/writeOff/writeOffSlice";
import {
  changeStatusWriteOffBatch,
  createWriteOffBatch,
  getWriteOffBatchByUuid,
  postWriteOff,
  removeWriteOffContract,
  updateWriteOffAmounts,
  updateWriteOffBatch,
} from "features/writeOffBatch/writeOffBatchSlice";
import axiosInstance from "features/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useWatch } from "react-hook-form";
import { current } from "../../../../../node_modules/@reduxjs/toolkit/dist/index";


const useWriteOffBatchForm = () => {
  const [params] = useSearchParams();
  const { uuid, mode, route } = useParams();

  const ids = params.getAll("contract_ids");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [writeOffPrepareContracts, setWriteOffPrepareContracts] = useState([]);
  const [isShowToolbar, setIsShowToolBar] = useState(true);
  const [isCreateStage, setIsCreateStage] = useState(true);
  const [isDisable, setIsDisable] = useState(false);
  const [normalSelectedRows, setNormalSelectedRows] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false); // State for modal visibility



  const { control, reset, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      disabled: false,
    },
  });

  const writeOffMonth = useWatch({control, name: "write_off_month"});
  const penaltyDays = useWatch({ control, name: "penalty_date" });

  const { isLoading: isSubmitting } = useSelector(
    (state) => state.contracts.updateContractByUuid
  );

  const auth = useSelector((state) => state.auth.user);

  const { writeOffBatchs, isLoading: isWriteOffBatchLoading } = useSelector((state) => state.writeOffBatchs);

  const { writeOffs, isLoading: isWriteOffLoading } = useSelector(
    (state) => state.writeOffs
  );

  const description = watch("description");

  useEffect(() => {
    const fetchWriteOffBatchByUuid = async () => {
      await dispatch(getWriteOffBatchByUuid({ uuid: uuid }));
    };
    const fetchContracts = async () => {
      await dispatch(
        getWriteOffIds({
          params: {
            contract_ids: JSON.stringify(ids),
          },
        })
      );
    };
    if (mode === "view" || mode === "edit") {
      fetchWriteOffBatchByUuid();
    } else {
      fetchContracts();
    }
  }, [mode, uuid, dispatch]);

  useEffect(() => {
    if (writeOffBatchs.uuid) {
      setIsCreateStage(false);
      setIsDisable(true);
    }

    if (!mode) {
      setIsShowToolBar(false);
    }

    if (mode === "view" || mode === "edit") {
      setWriteOffPrepareContracts(writeOffBatchs.write_off_contracts);
    } else {
      setWriteOffPrepareContracts(writeOffs);
    }
  }, [writeOffs, writeOffBatchs, mode, route]);

  const editAbleForm = useMemo(() => {
    if (mode && mode === "view") {
      return false;
    } else if (
      writeOffBatchs?.status === "approved" ||
      writeOffBatchs?.status === "rejected"
    ) {
      return false;
    } else {
      return true;
    }
  }, [mode, writeOffBatchs]);

  //calculate ar/ ai / write_off_amount using reduce
  useEffect(() => {
    const totals = writeOffPrepareContracts?.reduce(
      (total, contract) => {
        total.writeOffAmount += contract.write_off_amount;
        total.arAmount += contract.ar;
        total.aiAmount += contract.ai;
        total.outstandingAmount += contract.total_outstanding;
        return total;
      },
      { writeOffAmount: 0, arAmount: 0, aiAmount: 0, outstandingAmount: 0 }
    );

    setValue("total_write_off_amount", totals?.writeOffAmount);
    setValue("total_ar", totals?.arAmount);
    setValue("total_ai", totals?.aiAmount);
    setValue("total_outstanding_principal", totals?.outstandingAmount);
  }, [writeOffPrepareContracts]);

  const handleButtonClick = useCallback(async (rowData) => {
    setWriteOffPrepareContracts((prevContracts) =>
      prevContracts.filter(
        (contract) => contract.contract_id !== rowData.contract_id
      )
    );
    if (mode === "edit") {
      try {
        await dispatch(
          removeWriteOffContract({ writeOffUuid: uuid, contractUuid: rowData.uuid })
        ).unwrap();

        showSuccessToast(CommonMessage.MFS00012);
        dispatch(getWriteOffBatchByUuid({ uuid: uuid }));
      } catch (error) {
        console.error("Error:", error);
      }
    }
    // await axiosInstance.post(
    //   `/write-off-preparations/${uuid}/write-off-contracts/${rowData.uuid}/update`,

    // );
  }, [mode, dispatch]);

  useEffect(() => {
    const currentDate = dayjs(Date.now());
    reset({
      ...writeOffBatchs,
      write_off_month: mode ? dayjs(writeOffBatchs?.write_off_month)
        : (dayjs(writeOffs[0]?.write_off_month) ??
          currentDate),
      penalty_date: mode ? dayjs(writeOffBatchs?.penalty_date)
        : (dayjs(writeOffs[0]?.penalty_date) ??
          currentDate),
      // category_id: writeOffs[0]?.category_id,
      created_at:
        writeOffBatchs?.created_at && dayjs(writeOffBatchs?.created_at),
      updated_at:
        writeOffBatchs?.updated_at && dayjs(writeOffBatchs?.updated_at),
      disabled: !editAbleForm,
    });
  }, [writeOffBatchs, mode, reset, editAbleForm]);

  useEffect(() => {
    if (writeOffs) {
      setValue("category_id", writeOffs[0]?.category_id);
    }
  }, [writeOffs]);

  useEffect(() => {
    if ((mode === "view" || mode === "edit")) {
      if (!writeOffPrepareContracts) {
        setValue("category_id", "");
      } else if (writeOffPrepareContracts) {
        setValue("category_id", writeOffPrepareContracts[0]?.contract?.category_id);
      }

    }
  }, [writeOffPrepareContracts, mode]);

  const handleCellValueChanged = async (event) => {
    const value = event.newValue;
    const selectedUuid = event.data.uuid;
    const field = event.colDef.field;

    setWriteOffPrepareContracts((prevContracts) =>
      prevContracts.map((contract) => {
        if (contract.uuid === selectedUuid) {
          return { ...contract, [field]: parseInt(value) };
        }
        return contract;
      })
    );

    const prepareData = {
      write_off_id: writeOffBatchs?.id,
      description: description,
      write_off_contract_data: {
        write_off_contract_id: event.data.id,
        ai: event.data.ai,
        ar: event.data.ar,
        write_off_amount: event.data.write_off_amount,
        total_outstanding: event.data.total_outstanding,
      },
    };

    try {
      await dispatch(
        updateWriteOffAmounts({ prepareData, uuid: uuid })
      ).unwrap();

      showSuccessToast(CommonMessage.MFS00008);
      dispatch(getWriteOffBatchByUuid({ uuid: uuid }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleNormalSubmit = () => {
    // Collect IDs from selected rows
    const selectedIdsFromRows = normalSelectedRows.map((row) => row.id);
    const allIds = [...ids, ...selectedIdsFromRows]

    const uniqueIds = Array.from(new Set(allIds)); // remove duplicates

    // Final correct format: [2774,2790,2835]
    const contractIdsParam = `[${uniqueIds.join(",")}]`;
    const contractIdsParams = `${uniqueIds.join(",")}`;
    console.log(contractIdsParam, "contractIdsParam");
    

    // Use writeOffMonth if it exists, otherwise use today's date
    const now = dayjs();
    const writeOffMonthValue = writeOffMonth
      ? writeOffMonth.format("YYYY-MM")
      : now.format("YYYY-MM");

    const penaltyDaysValue = penaltyDays
      ? penaltyDays.format("YYYY-MM-DD")
      : now.format("YYYY-MM-DD");


    // Validation: Check if all category IDs are the same
    const selectedCategoryIds = normalSelectedRows.map((row) => row.category_id);
    const existingCategoryIds = writeOffPrepareContracts.map((item) => item.category_id);

    const allCategoryIds = [...selectedCategoryIds, ...existingCategoryIds];
    const uniqueCategoryIds = new Set(allCategoryIds);

    if (uniqueCategoryIds.size > 1) {
      showErrorToast("Selected contracts must have the same category.");
      return; // stop here
    }

    try {
      dispatch(
        calculateAmountsByWriteOffMonth({
          params: {
            contract_ids: contractIdsParam,
            write_off_month: writeOffMonthValue,
            penalty_days: penaltyDaysValue,
          },
        })
      );

      setWriteOffPrepareContracts(writeOffs);
      navigate(`/write-off-preparation?contract_ids=${contractIdsParams}`);

      showSuccessToast("Write Off Contracts Add Successfully");
    } catch (error) {
      console.error("Error:", error);
      showErrorToast(CommonMessage.MFE00017);
    } finally {
      setOpenAddModal(false); // Close the modal after adding
      setNormalSelectedRows([]); // Clear selected rows after adding
    }
  };




  const onSubmit = useCallback(
    () => async (body) => {
      const temp_ids = writeOffPrepareContracts.map((contract) => {
        return contract.contract_id;
      });

      if (temp_ids.length === 0) {
        showErrorToast(CommonMessage.MFE00017);
      } else {
        try {
          if (mode === "view") {
            window.close();
          } else if (mode === "edit") {
            const prepareData = writeOffPrepareContracts?.map((writeOff) => {
              return {
                write_off_contract_id: writeOff.id,
                ai: writeOff.ai,
                ar: writeOff.ar,
                write_off_amount: writeOff.write_off_amount,
                total_outstanding: writeOff.total_outstanding,
              };
            });

            await dispatch(
              updateWriteOffBatch({
                body: {
                  description: body?.description,
                  total_outstanding_principal:
                    body?.total_outstanding_principal,
                  total_ai: body?.total_ai,
                  total_ar: body?.total_ar,
                  total_write_off_amount: body?.total_write_off_amount,
                  write_off_id: writeOffBatchs?.id,
                  write_off_month:
                    (body?.write_off_month &&
                      body?.write_off_month.format("YYYY-MM")) ||
                    null,
                  penalty_days:
                    (body?.penalty_date &&
                      body?.penalty_date.format("YYYY-MM-DD")) ||
                    null,
                  write_off_contract_data: prepareData,
                },
                uuid: writeOffBatchs?.uuid,
              })
            ).unwrap();

            showSuccessToast(CommonMessage.MFS00008);
            setTimeout(() => {
              window.close();
            }, 5000);
          } else {
            await dispatch(
              createWriteOffBatch({
                body: {
                  ...body,
                  contract_ids: temp_ids,
                  write_off_month:
                    (body?.write_off_month &&
                      body?.write_off_month.format("YYYY-MM")) ||
                    null,
                  penalty_days:
                    (body?.penalty_date &&
                      body?.penalty_date.format("YYYY-MM-DD")) ||
                    null,
                },
              })
            ).unwrap();

            showSuccessToast(CommonMessage.MFS00007);
            setTimeout(() => {
              window.close();
            }, 5000);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    },
    [dispatch, writeOffPrepareContracts, writeOffBatchs]
  );

  const handleChangeStatus = useCallback(
    async (status) => {
      try {
        const responseData = await dispatch(
          changeStatusWriteOffBatch({
            status: status,
            uuid: writeOffBatchs?.uuid,
          })
        );

        if (responseData.payload.success === true) {
          showSuccessToast(CommonMessage.MFS00006);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [dispatch, writeOffBatchs]
  );

  const handlePosted = useCallback(async () => {
    try {
      const responseData = await dispatch(
        postWriteOff({
          uuid: writeOffBatchs?.uuid,
        })
      );

      if (responseData.payload.success === true) {
        showSuccessToast("Posted Success");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, [dispatch, writeOffBatchs]);

  console.log(ids, "ids in form");

  return useMemo(
    () => ({
      watch,
      isSubmitting,
      onSubmit,
      handleSubmit,
      control,
      editAbleForm,
      writeOffs,
      writeOffPrepareContracts,
      setWriteOffPrepareContracts,
      handleButtonClick,
      isWriteOffLoading,
      isShowToolbar,
      isCreateStage,
      isDisable,
      writeOffBatchs,
      handleChangeStatus,
      handleCellValueChanged,
      watch,
      isWriteOffBatchLoading,
      handlePosted,
      uuid,
      setNormalSelectedRows,
      handleNormalSubmit,
      setOpenAddModal,
      openAddModal,
      setValue,
      auth,
      ids
    }),
    [
      watch,
      control,
      handleSubmit,
      isSubmitting,
      onSubmit,
      editAbleForm,
      writeOffs,
      writeOffPrepareContracts,
      setWriteOffPrepareContracts,
      handleButtonClick,
      isWriteOffLoading,
      isShowToolbar,
      isCreateStage,
      isDisable,
      writeOffBatchs,
      handleChangeStatus,
      handleCellValueChanged,
      watch,
      isWriteOffBatchLoading,
      handlePosted,
      uuid,
      setNormalSelectedRows,
      handleNormalSubmit,
      setOpenAddModal,
      openAddModal,
      setValue,
      auth,
      ids
    ]
  );
};

export default useWriteOffBatchForm;
