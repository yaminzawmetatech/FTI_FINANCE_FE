import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { useNavigate } from "react-router-dom";
import { createInsufficientPaymentBatch, getInsufficientPaymentBatchByUuid, applyInsufficientPayment, removeInsufficientPaymentContract, updateInsufficientPaymentBatch, changeStatusInsufficientPaymentBatch, changeRejectStatusInsufficientPaymentBatch } from "modules/collection/slices/insufficientPaymentBatchSlice";
import { getInsufficientPaymentIds } from "modules/collection/slices/insufficientPaymentSlice";

const useInsufficientPaymentBatchForm = () => {
  const [params] = useSearchParams();
  const { uuid, mode, route } = useParams();

  // const ids = params.getAll("contract_ids");
  const raw = params.get("contract_ids"); // "9922,9923"
  const ids = raw ? raw.split(",") : [];  // ["9922", "9923"]

    const navigate = useNavigate();
  const dispatch = useDispatch();
  const [insufficientPaymentContracts, setInsufficientPaymentContracts] = useState([]);
  const [isShowToolbar, setIsShowToolBar] = useState(true);
  const [isCreateStage, setIsCreateStage] = useState(true);

  const { control, reset, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      disabled: false,
    },
  });


  const { isLoading: isSubmitting } = useSelector(
    (state) => state.contracts.updateContractByUuid
  );

  const { insufficientPaymentBatchs, isLoading: isinsufficientPaymentBatchLoading } = useSelector((state) => state.insufficientPaymentBatchs);

  const { insufficientContracts, isLoading: isinsufficientPaymentLoading } = useSelector(
    (state) => state.insufficientContracts
  );

  const description = watch("description");

  const defaultParams = {
    latest_unpaid_tenor : 1,
    insufficient_status :"open",
  }

  useEffect(() => {
    const fetchInsufficientPaymentBatchByUuid = async () => {
      await dispatch(getInsufficientPaymentBatchByUuid({ uuid: uuid }));
    };
    const fetchContracts = async () => {
      //const idsString = `[${ids.join(",")}]`;

      await dispatch(
        getInsufficientPaymentIds({
          params: {
            ...defaultParams,
            contract_ids: ids,
          },
        })
      );
    };
    if (mode === "view" || mode === "edit") {
      fetchInsufficientPaymentBatchByUuid();
    } else {
      fetchContracts();
    }
  }, [mode, uuid, dispatch]);

  useEffect(() => {

    if (!mode) {
      setIsShowToolBar(false);
    }

    if (mode === "view" || mode === "edit") {
      setInsufficientPaymentContracts(insufficientPaymentBatchs?.insufficient_contracts);
    } else {
      setInsufficientPaymentContracts(insufficientContracts);
    }
  }, [insufficientContracts, insufficientPaymentBatchs, mode, route]);

  const editAbleForm = useMemo(() => {
    if (mode && mode === "view") {
      return false;
    } else if (
      insufficientPaymentBatchs?.status === "Approved" ||
      insufficientPaymentBatchs?.status === "Rejected"
    ) {
      return false;
    } else {
      return true;
    }
  }, [mode, insufficientPaymentBatchs]);

  //calculate ar/ ai / write_off_amount using reduce
  useEffect(() => {
    const totals = insufficientPaymentContracts?.reduce(
      (total, contract) => {
        total.remainingMi +=  parseFloat(contract.remaining_mi);
        return total;
      },
      { remainingMi: 0 }
    );
    const roundedTotal = Number(totals?.remainingMi.toFixed(2));

    setValue("total_waived_amount",  roundedTotal);
  }, [insufficientPaymentContracts]);

  const handleButtonClick = useCallback(async (rowData) => {
    setInsufficientPaymentContracts((prevContracts) =>
      prevContracts.filter(
        (contract) => contract.id !== rowData.id
      )
    );
    if (mode === "edit") {
      try {
        await dispatch(
          removeInsufficientPaymentContract({ contract_id: rowData.contract_id })
        ).unwrap();

        showSuccessToast(CommonMessage.MFS00012);
        dispatch(getInsufficientPaymentBatchByUuid({ uuid: uuid }));
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, [mode, dispatch, uuid]);

  useEffect(() => {
    reset({
      ...insufficientPaymentBatchs,
      created_at:
        insufficientPaymentBatchs?.created_at && dayjs(insufficientPaymentBatchs?.created_at),
      updated_at:
        insufficientPaymentBatchs?.updated_at && dayjs(insufficientPaymentBatchs?.updated_at),
      disabled: !editAbleForm,
    });
  }, [insufficientPaymentBatchs, mode, reset, editAbleForm]);

  useEffect(() => {
    if (insufficientContracts) {
      setValue("category_id", insufficientContracts[0]?.category_id);
    }
  }, [insufficientContracts]);

  useEffect(() => {
    if ((mode === "view" || mode === "edit")) {
      if (!insufficientPaymentContracts) {
        setValue("category_id", "");
      } else if (insufficientPaymentContracts) {
        setValue("category_id", insufficientPaymentContracts[0]?.contract?.category_id);
      }
    }
  }, [insufficientPaymentContracts, mode]);

  const onSubmit = useCallback(
    () => async (body) => {
      const temp_ids = insufficientPaymentContracts.map((contract) => {
        return contract.id;
      });

      if (temp_ids.length === 0) {
        showErrorToast(CommonMessage.MFE00017);
      } else {
        try {
          if (mode === "view") {
            window.close();
          } else if (mode === "edit") {
            // const prepareData = insufficientPaymentContracts?.map((writeOff) => {
            //   return {
            //     write_off_contract_id: writeOff.id,
            //     total_waived_amount: writeOff.write_off_amount,
            //   };
            // });

            await dispatch(
              updateInsufficientPaymentBatch({
                body: {
                  description: body?.description,
                  // total_waived_amount:
                  //   body?.total_waived_amount,
                  // write_off_id: insufficientPaymentBatchs?.id,
                  // write_off_contract_data: prepareData,
                },
                uuid: insufficientPaymentBatchs?.uuid,
              })
            ).unwrap();

            showSuccessToast(CommonMessage.MFS00008);
            setTimeout(() => {
              window.close();
            }, 5000);
          } else {
            await dispatch(
              createInsufficientPaymentBatch({
                body: {
                  ...body,
                  contract_ids: temp_ids,
                },
              })
            ).unwrap();

            showSuccessToast(CommonMessage.MFS00007);
            // setTimeout(() => {
            //   window.close();
            // }, 5000);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    },
    [dispatch, insufficientPaymentContracts, insufficientPaymentBatchs]
  );

  const handleChangeStatus = useCallback(
    async (status) => {
      try {
        const responseData = await dispatch(
          changeStatusInsufficientPaymentBatch({
            status: status,
            uuid: insufficientPaymentBatchs?.uuid,
          })
        );

        if (responseData.payload.success === true) {
          showSuccessToast(CommonMessage.MFS00006);
          await dispatch(getInsufficientPaymentBatchByUuid({ uuid: uuid }));
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [dispatch, insufficientPaymentBatchs]
  );

  const handleChangeRejectStatus = useCallback(
    async () => {
      try {
        const responseData = await dispatch(
          changeRejectStatusInsufficientPaymentBatch({
            uuid: insufficientPaymentBatchs?.uuid,
          })
        );

        if (responseData.payload.success === true) {
          showSuccessToast(CommonMessage.MFS00006);
          await dispatch(getInsufficientPaymentBatchByUuid({ uuid: uuid }));
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [dispatch, insufficientPaymentBatchs]
  );

  const handlePosted = useCallback(async () => {
    try {
      const responseData = await dispatch(
        applyInsufficientPayment({
          uuid: insufficientPaymentBatchs?.uuid,
        })
      );

      if (responseData.payload.success === true) {
        showSuccessToast("Applied Success");
        await dispatch(getInsufficientPaymentBatchByUuid({ uuid: uuid }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, [dispatch, insufficientPaymentBatchs, uuid]);

  return useMemo(
    () => ({
      watch,
      isSubmitting,
      onSubmit,
      handleSubmit,
      control,
      editAbleForm,
      insufficientContracts,
      insufficientPaymentContracts,
      setInsufficientPaymentContracts,
      handleButtonClick,
      isinsufficientPaymentLoading,
      isShowToolbar,
      handleChangeStatus,
      watch,
      isinsufficientPaymentBatchLoading,
      handlePosted,
      uuid,
      setValue,
      insufficientPaymentBatchs,
      handleChangeRejectStatus,
      isCreateStage,
    }),
    [
      watch,
      control,
      handleSubmit,
      isSubmitting,
      onSubmit,
      editAbleForm,
      insufficientContracts,
      insufficientPaymentContracts,
      setInsufficientPaymentContracts,
      handleButtonClick,
      isinsufficientPaymentLoading,
      isShowToolbar,
      handleChangeStatus,
      watch,
      isinsufficientPaymentBatchLoading,
      handlePosted,
      uuid,
      setValue,
      insufficientPaymentBatchs,
      handleChangeRejectStatus,
      isCreateStage,
    ]
  );
};

export default useInsufficientPaymentBatchForm;
