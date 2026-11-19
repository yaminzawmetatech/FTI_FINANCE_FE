import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { getContracts } from "modules/loan-operation/slices/contractSlice";
import {
  createInsurancePayment,
  postInsurancePayment,
  updateInsurancePayment,
} from "modules/loan-operation/slices/insurancePaymentSlice";
import { getInsurancePaymentByUuid } from "modules/loan-operation/slices/insurancePaymentSlice";
import { showSuccessToast } from "common/ToastMessage";
import { changeStatusInsurancePayment } from "modules/loan-operation/slices/insurancePaymentSlice";
import CommonMessage from "common/CommonMessage";

const useInsurancePaymentForm = () => {
  const [params] = useSearchParams();
  const { uuid, mode, route, category } = useParams();

  const contractIds = params.getAll("contract_ids");

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

  const { insurancePayments } = useSelector(
    (state) => state.insurancePayments
  );

  const { user } = useSelector((state) => state.auth);

  const { contracts, isLoading: isContractsLoading } = useSelector((state) => state.contracts);

  const paymentAmountValue = watch("payment_amount");
  const actualAmountValue = watch("actual_amount");

  useEffect(() => {
    const fetchInsurancePaymentByUuid = async () => {
      await dispatch(getInsurancePaymentByUuid({ uuid: uuid }));
    };
    const fetchContracts = async () => {
      await dispatch(
        getContracts({
          firstFetch: true,
          params: {
            insurance_contract_ids: JSON.stringify(contractIds),
            mob_status:1
          },
        })
      );
    };
    if (mode === "view" || mode === "edit") {
      fetchInsurancePaymentByUuid();
    } else {
      fetchContracts();
    }
  }, [mode, uuid, dispatch]);

  useEffect(() => {
    setValue("actual_amount", actualAmount);
  }, [actualAmount, setValue]);

  useEffect(() => {
    if (insurancePayments.uuid) {
      setIsShowRemove(true);
      setIsDisable(true);
    }

    if (!mode) {
      setIsShowToolBar(false);
    }
    if (mode === "view" || mode === "edit") {
      setUpdatedContracts(insurancePayments.insurance_payment_contracts);
    } else {
      setUpdatedContracts(contracts);
    }
  }, [contracts, insurancePayments, mode]);

  useEffect(() => {
    const temp_value = paymentAmountValue - actualAmountValue;
    setValue("exceed_amount", temp_value);
  }, [paymentAmountValue, actualAmountValue]);

  const editAbleForm = useMemo(() => {
    if (mode && mode === "view") {
      return false;
    } else if (
      insurancePayments?.insurance_status === "approved" ||
      insurancePayments?.insurance_status === "rejected"
    ) {
      return false;
    } else {
      return true;
    }
  }, [mode, insurancePayments]);

  useEffect(() => {
    if (!mode) {
      const sumAmount = updatedContracts?.reduce(
        (total, contract) => total + contract.insurance_amount,
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
      ...insurancePayments,
      category_id: insurancePayments?.category_id ?? parseInt(category),
      posting_date:
        insurancePayments?.posting_date &&
        dayjs(insurancePayments?.posting_date) || currentDate,
      created_at:
        insurancePayments?.created_at && dayjs(insurancePayments?.created_at),
      updated_at:
        insurancePayments?.updated_at && dayjs(insurancePayments?.updated_at),
      disabled: !editAbleForm,
    });
  }, [insurancePayments, mode, reset, editAbleForm, category]);

  const onSubmit = useCallback(
    () => async (body) => {
      const contractIds = updatedContracts.map((contract) => contract.id);

      try {
        if (mode === "view") {
          window.close();
        } else if (mode === "edit") {
          await dispatch(
            updateInsurancePayment({
              body: {
                ...body,
                contract_ids: contractIds,
                posting_date:
                  (body?.posting_date &&
                    body?.posting_date.format("YYYY-MM-DD HH:mm:ss")) ||
                  null,
              },
              uuid: insurancePayments?.uuid,
            })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00008);
          setTimeout(() => {
            window.close();
          }, 5000);
        } else {
          await dispatch(
            createInsurancePayment({
              body: {
                ...body,
                contract_ids: contractIds,
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
    [dispatch, updatedContracts, insurancePayments, mode]
  );

  const handleChangeStatus = useCallback(
    async (status) => {
      try {
        const responseData = await dispatch(
          changeStatusInsurancePayment({
            status: status,
            uuid: insurancePayments?.uuid,
          })
        );

        if (responseData.payload.success === true) {
          showSuccessToast(CommonMessage.MFS00006);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [dispatch, insurancePayments]
  );

  const handlePosted = useCallback(async () => {
    try {
      const responseData = await dispatch(
        postInsurancePayment({
          uuid: insurancePayments?.uuid,
        })
      );

      if (responseData.payload.success === true) {
        showSuccessToast("Posted Success");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, [dispatch, insurancePayments]);

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
      insurancePayments,
      handleChangeStatus,
      handlePosted,
      user,
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
      insurancePayments,
      handleChangeStatus,
      handlePosted,
      user,
    ]
  );
};

export default useInsurancePaymentForm;