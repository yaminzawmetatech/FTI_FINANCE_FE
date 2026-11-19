import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import {
  changeStatusRepayment,
  createRepayment,
  getRepaymentByUuid,
  updateRepayment,
} from "modules/collection/slices/repaymentSlice";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";

const useRepaymentForm = () => {
  const navigate = useNavigate();

  const { uuid, mode, route } = useParams();

  const dispatch = useDispatch();
  const [actualAmount, setActualAmount] = useState(0);
  const [updatedContracts, setUpdatedContracts] = useState([]);
  const [isShowToolbar, setIsShowToolBar] = useState(true);
  const [isShowRemove, setIsShowRemove] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedETRows, setSelectedETRows] = useState([]);
  const [selectedRecoveryRows, setSelectedRecoveryRows] = useState([]);
  const [selectedDPRows, setSelectedDPRows] = useState([]);

  const { control, reset, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      disabled: false,
    },
  });

  const { isLoading: isSubmitting } = useSelector((state) => state.repayments);

  const { repayments, repaymentDetails, createdRepayment, isError, isLoading } =
    useSelector((state) => state.repayments);

  useEffect(() => {
    if (repaymentDetails && repaymentDetails?.status === "open") {
      setIsDisable(true);
    }
  }, [repaymentDetails]);

  const {
    // contracts,
    // next_page_param,
    isLoading: isRepaymentLoading,
  } = useSelector((state) => state.repayments);

  const paymentAmountValue = watch("payment_amount");
  const actualAmountValue = watch("actual_amount");

  useEffect(() => {
    if (mode === "view" || mode === "edit") {
      dispatch(getRepaymentByUuid({ uuid: uuid }));
    }
  }, []);

  useEffect(() => {
    setValue("actual_amount", actualAmount);
  }, [actualAmount]);

  useEffect(() => {
    const temp_value = paymentAmountValue - actualAmountValue;
    setValue("exceed_amount", temp_value);
  }, [paymentAmountValue, actualAmountValue]);

  const editAbleForm = useMemo(() => {
    if (mode && mode === "view") {
      return false;
    }
    return true;
  }, [mode, route, repaymentDetails]);

  useEffect(() => {
    const sumAmount = updatedContracts?.reduce(
      (total, contract) => total + contract.stamp_duty_amount,
      0
    );
    setActualAmount(sumAmount);
  }, [updatedContracts, setActualAmount]);

  const handleButtonClick = useCallback((rowData) => {
    setUpdatedContracts((prevContracts) =>
      prevContracts.filter((contract) => contract.id !== rowData.id)
    );
  }, []);

  const handleChangeStatus = useCallback(
    async (status) => {
      
      const mergeArray = [
        ...selectedRows,
        ...selectedETRows,
        ...selectedRecoveryRows,
        ...selectedDPRows,
      ];

      const transformedData = mergeArray.map((row) => ({
        uuid: row.uuid,
        waive_penalty_fee: row.waive_penalty_fee,
      }));

      try {
        await dispatch(
          changeStatusRepayment({
            status: status,
            uuid: repaymentDetails?.uuid,
            settlements: transformedData,
          })
        ).unwrap();

        showSuccessToast(CommonMessage.MFS00006);
        dispatch(getRepaymentByUuid({ uuid: uuid }));
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [dispatch, repaymentDetails, selectedRows, selectedETRows, selectedRecoveryRows, selectedDPRows]
  );

  useEffect(() => {
    reset({
      ...repaymentDetails,
      posting_date:
        repaymentDetails?.posting_date && dayjs(repaymentDetails?.posting_date),
      type: repaymentDetails?.account_code_type,
      created_user: repaymentDetails?.created_user?.user_name,
      format_code: +repaymentDetails?.format_code,
      // created_at:
      //   stampDutyPayments?.created_at && dayjs(stampDutyPayments?.created_at),
      // updated_at:
      //   stampDutyPayments?.updated_at && dayjs(stampDutyPayments?.updated_at),
      disabled: !editAbleForm,
    });
  }, [repaymentDetails, mode, reset]);

  const onSubmit = useCallback(
    () => async (body) => {

      try {
        if (mode === "edit") {
          // updateRepayment
          let data = {
            params: {
              description: body?.description,
              posting_date: body?.posting_date.format("YYYY-MM-DD HH:mm:ss"),
            },
            uuid,
          };
          const updatedRepayment = await dispatch(
            updateRepayment(data)
          ).unwrap();
          navigate(
            `/collection-module/repayment/${updatedRepayment?.data?.uuid}/edit`
          );
          window.location.reload(true);
        } else {
          const createdRepayment = await dispatch(
            createRepayment(body)
          ).unwrap();
          navigate(
            `/collection-module/repayment/${createdRepayment?.data?.uuid}/edit`
          );
          window.location.reload(true);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [dispatch, updatedContracts, createdRepayment]
  );



  return useMemo(
    () => ({
      watch,
      isSubmitting,
      onSubmit,
      handleSubmit,
      control,
      editAbleForm,
      setActualAmount,
      updatedContracts,
      handleButtonClick,
      isRepaymentLoading,
      isShowToolbar,
      isShowRemove,
      isDisable,
      repaymentDetails,
      isLoading,
      createdRepayment,
      handleChangeStatus,
      selectedRows,
      selectedETRows,
      setSelectedRows,
      setSelectedETRows,
      setSelectedRecoveryRows,
      selectedRecoveryRows,
      setSelectedDPRows,
      selectedDPRows
    }),
    [
      watch,
      control,
      handleSubmit,
      isSubmitting,
      onSubmit,
      editAbleForm,
      setActualAmount,
      updatedContracts,
      handleButtonClick,
      isRepaymentLoading,
      isShowToolbar,
      isShowRemove,
      isDisable,
      repaymentDetails,
      isLoading,
      createdRepayment,
      handleChangeStatus,
      selectedRows,
      selectedETRows,
      setSelectedRows,
      setSelectedETRows,
      setSelectedRecoveryRows,
      selectedRecoveryRows,
      setSelectedDPRows,
      selectedDPRows
    ]
  );
};

export default useRepaymentForm;
