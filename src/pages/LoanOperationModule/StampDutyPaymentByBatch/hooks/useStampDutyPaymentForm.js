import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { getContracts } from "features/contract/contractSlice";
import { useSearchParams } from "react-router-dom";
import {
  createStampDutyPayment,
  postStampDutyPayment,
  settledStampDutyPayment,
  updateStampDutyPayment,
} from "features/stampDutyPayment/stampDutyPaymentSlice";
import { getStampDutyPaymentByUuid } from "features/stampDutyPayment/stampDutyPaymentSlice";
import { showSuccessToast } from "common/ToastMessage";
import { changeStatusStampDutyPayment } from "features/stampDutyPayment/stampDutyPaymentSlice";
import CommonMessage from "common/CommonMessage";

const useStampDutyPaymentForm = () => {
  const [ params ] = useSearchParams();
  const { uuid, mode, route, category } = useParams();

  const ids = params.getAll("contract_ids");

  const dispatch = useDispatch();
  const [actualAmount, setActualAmount] = useState(0);
  const [updatedContracts, setUpdatedContracts] = useState([]);
  const [isShowToolbar, setIsShowToolBar] = useState(true);
  const [isShowRemove, setIsShowRemove] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const { control, reset, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      disabled: false,
    },
  });

  const { isLoading: isSubmitting } = useSelector(
    (state) => state.contracts.updateContractByUuid
  );

  const { stampDutyPayments, } = useSelector(
    (state) => state.stampDutyPayments
  );

  const { contracts, isLoading: isContractsLoading } = useSelector((state) => state.contracts);

  const paymentAmountValue = watch("payment_amount");
  const actualAmountValue = watch("actual_amount");

  useEffect(() => {
    const fetchStampDutyPaymentByUuid = async () => {
       await dispatch(getStampDutyPaymentByUuid({ uuid: uuid }));
    }
    const fetchContracts = async () => {
        await dispatch(
            getContracts({
                firstFetch: true,
                params: {
                    stamp_duty_contract_ids: JSON.stringify(ids),
                },
            })
        );
    }
    if (mode === "view" || mode === "edit") {
      fetchStampDutyPaymentByUuid();
    } else {
      fetchContracts();
    }
  }, [mode, uuid, dispatch]);

  useEffect(() => {
    setValue("actual_amount", actualAmount);
  }, [actualAmount, setValue]);

  useEffect(() => {
    if (stampDutyPayments.uuid) {
      setIsShowRemove(true);
      setIsDisable(true);
    }

    if (route === "StampDutySettlement") {
        setIsShowToolBar(false);
    }
    if (!mode) {
      setIsShowToolBar(false);
    }
    if (mode === "view" || mode === "edit") {
      setUpdatedContracts(stampDutyPayments?.stamp_duty_payment_contracts);
    } else {
      setUpdatedContracts(contracts);
    }
  }, [contracts, stampDutyPayments, mode, route]);

  useEffect(() => {
    const temp_value = paymentAmountValue - actualAmountValue;
    setValue("exceed_amount", temp_value);
  }, [paymentAmountValue, actualAmountValue]);

  const editAbleForm = useMemo(() => {
    if (mode && mode === "view") {
      return false;
    } else if (route === "StampDutySettlement") {
      return false;
    } else if (
      stampDutyPayments?.stamp_duty_status === "approved" ||
      stampDutyPayments?.stamp_duty_status === "rejected"
    ) {
      return false;
    } else {
      return true;
    }
  }, [mode, route, stampDutyPayments]);

  useEffect(() => {
    if (!mode) {
      const sumAmount = updatedContracts?.reduce(
        (total, contract) => total + contract.stamp_duty_amount,
        0
      );
      setActualAmount(sumAmount);
    }
  }, [updatedContracts, setActualAmount, mode]);

  const handleButtonClick = useCallback((rowData) => {
    setUpdatedContracts((prevContracts) =>
      prevContracts.filter((contract) => contract.id !== rowData.id)
    );
  }, []);

  useEffect(() => {
    const currentDate = dayjs(Date.now());
    reset({
      ...stampDutyPayments,
      category_id: stampDutyPayments?.category_id ?? parseInt(category) ,
      posting_date:
        stampDutyPayments?.posting_date &&
        dayjs(stampDutyPayments?.posting_date) || currentDate,
      created_at:
        stampDutyPayments?.created_at && dayjs(stampDutyPayments?.created_at),
      updated_at:
        stampDutyPayments?.updated_at && dayjs(stampDutyPayments?.updated_at),
      disabled: !editAbleForm,
    });
  }, [stampDutyPayments, mode, reset, editAbleForm, category]);

  useEffect(() => {
    if (route === "StampDutySettlement") {
      const currentDate = dayjs(Date.now());
      const initialPostingDate = stampDutyPayments?.settlement_date && dayjs(stampDutyPayments?.settlement_date) || currentDate;

      setValue("settlement_date", initialPostingDate);
    }
  }, [route, stampDutyPayments]);

  const onSubmit = useCallback(
    () => async (body) => {
      const temp_ids = updatedContracts.map((contract) => {
        return contract.id;
      });

      try {
        if (route === "StampDutySettlement") {
          await dispatch(
            settledStampDutyPayment({
              body: {
                payment_amount: body?.payment_amount,
                exceed_amount: body?.exceed_amount,
                settlement_date:  (body?.settlement_date &&
                  body?.settlement_date.format("YYYY-MM-DD HH:mm:ss")) ||
                null,
              },
              uuid: stampDutyPayments?.uuid,
            })
          ).unwrap();

          showSuccessToast("Settled Success");
          setTimeout(() => {
            window.close();
          }, 5000);
        } else if (mode === "view") {
          window.close();
        } else if (mode === "edit") {
          await dispatch(
            updateStampDutyPayment({
              body: {
                ...body,
                contract_ids: temp_ids,
                posting_date:
                  (body?.posting_date &&
                    body?.posting_date.format("YYYY-MM-DD HH:mm:ss")) ||
                  null,
              },
              uuid: stampDutyPayments?.uuid,
            })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00008);
          setTimeout(() => {
            window.close();
          }, 5000);
        } else {
          await dispatch(
            createStampDutyPayment({
              body: {
                ...body,
                contract_ids: temp_ids,
                posting_date:
                  (body?.posting_date &&
                    body?.posting_date.format("YYYY-MM-DD HH:mm:ss")) ||
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
    },
    [dispatch, updatedContracts, stampDutyPayments]
  );

  const handleChangeStatus = useCallback(
    async (status) => {
      try {
        const responseData = await dispatch(
          changeStatusStampDutyPayment({
            status: status,
            uuid: stampDutyPayments?.uuid,
          })
        );

        if (responseData.payload.success === true) {
          showSuccessToast(CommonMessage.MFS00006);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [dispatch, stampDutyPayments]
  );

  const handlePosted = useCallback(async () => {
    try {
      const responseData = await dispatch(
        postStampDutyPayment({
          uuid: stampDutyPayments?.uuid,
        })
      );

      if (responseData.payload.success === true) {
        showSuccessToast("Posted Success");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, [dispatch, stampDutyPayments]);

  return useMemo(
    () => ({
      watch,
      isSubmitting,
      onSubmit,
      handleSubmit,
      control,
      editAbleForm,
      setActualAmount,
      contracts,
      updatedContracts,
      handleButtonClick,
      isContractsLoading,
      isShowToolbar,
      isShowRemove,
      isDisable,
      stampDutyPayments,
      handleChangeStatus,
      handlePosted,
    }),
    [
      watch,
      control,
      handleSubmit,
      isSubmitting,
      onSubmit,
      editAbleForm,
      setActualAmount,
      contracts,
      updatedContracts,
      handleButtonClick,
      isContractsLoading,
      isShowToolbar,
      isShowRemove,
      isDisable,
      stampDutyPayments,
      handleChangeStatus,
      handlePosted,
    ]
  );
};

export default useStampDutyPaymentForm;
