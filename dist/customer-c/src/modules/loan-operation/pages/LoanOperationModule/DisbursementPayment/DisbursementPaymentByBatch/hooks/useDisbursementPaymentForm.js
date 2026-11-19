import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import {
  createDisbursementPayment,
  postDisbursementPayment,
  updateDisbursementPayment,
} from "modules/loan-operation/slices/disbursementPaymentSlice";
import { getDisbursementPaymentByUuid } from "modules/loan-operation/slices/disbursementPaymentSlice";
import { showSuccessToast } from "common/ToastMessage";
import { changeStatusDisbursementPayment } from "modules/loan-operation/slices/disbursementPaymentSlice";
import CommonMessage from "common/CommonMessage";
import { getAllBookings } from "modules/loan-operation/slices/bookingProcessSlice";
import { getBankAccountCodes } from "modules/finance/slices/accountCodeSlice";
import { getProjectCategory } from "modules/administration/slices/projectcategorySlice";

const useDisbursementPaymentForm = () => {
  const [params] = useSearchParams();
  const { uuid, mode, route, category } = useParams();

  const ids = params.getAll("booking_ids");

  const dispatch = useDispatch();
  const [actualAmount, setActualAmount] = useState(0);
  const [updatedBookings, setUpdatedBookings] = useState([]);
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

  const { disbursementPayments } = useSelector(
    (state) => state.disbursementPayments
  );

  const { contracts, isLoading: isContractsLoading } = useSelector((state) => state.contracts);
  const { bookings } = useSelector((state) => state.bookings);

  const paymentAmountValue = watch("payment_amount");
  const actualAmountValue = watch("actual_amount");

  const { bankAccountCodes, } = useSelector(
    (state) => state.accountCodes
  );

  const { projectCategories } = useSelector(
    (state) => state.projectCategories
  );

  useEffect(() => {
    const fetchDisbursementPaymentByUuid = async () => {
      await dispatch(getDisbursementPaymentByUuid({ uuid: uuid }));
    };
    const fetchContracts = async () => {
      await dispatch(
        getAllBookings({
          firstFetch: false,
          params: {
            booking_ids: JSON.stringify(ids),
            not_disbursement: 1,
          },
        })
      );
    };
    if (mode === "view" || mode === "edit") {
      fetchDisbursementPaymentByUuid();
    } else {
      fetchContracts();
    }
  }, [mode, uuid, dispatch]);

  useEffect(()=> {
    dispatch(getBankAccountCodes());
    dispatch(getProjectCategory());
  },[dispatch])


  useEffect(() => {
    setValue("actual_amount", actualAmount);
  }, [actualAmount, setValue]);

  useEffect(() => {
    if (disbursementPayments.uuid) {
      setIsShowRemove(true);
      setIsDisable(true);
    }

    if (!mode) {
      setIsShowToolBar(false);
    }
    if (mode === "view" || mode === "edit") {
      setUpdatedBookings(disbursementPayments?.disbursement_payment_books);
    } else {
      setUpdatedBookings(bookings);
    }
  }, [contracts, bookings, disbursementPayments, mode, route]);

  useEffect(() => {
    const temp_value = paymentAmountValue - actualAmountValue;
    setValue("exceed_amount", temp_value);
  }, [paymentAmountValue, actualAmountValue]);

  const editAbleForm = useMemo(() => {
    if (mode && mode === "view") {
      return false;
    } else if (
      disbursementPayments?.disbursement_status === "approved" ||
      disbursementPayments?.disbursement_status === "rejected"
    ) {
      return false;
    } else {
      return true;
    }
  }, [mode, route, disbursementPayments]);

  useEffect(() => {
    if (!mode) {
      const sumAmount = updatedBookings?.reduce(
        (total, booking) => total + booking.disbursement_amount,
        0
      );
      setActualAmount(sumAmount);
    }
  }, [updatedBookings, setActualAmount, mode]);

  const handleButtonClick = useCallback((rowData) => {

    setUpdatedBookings((prevBookings) =>
      prevBookings.filter((booking) => booking.id !== rowData.id)
    );
  }, []);

  useEffect(() => {
    const currentDate = dayjs(Date.now());
    reset({
      ...disbursementPayments,
      category_id: disbursementPayments?.category_id ?? parseInt(category),
      posting_date:
        (disbursementPayments?.posting_date &&
          dayjs(disbursementPayments?.posting_date)) ||
        currentDate,
      created_at:
        disbursementPayments?.created_at &&
        dayjs(disbursementPayments?.created_at),
      updated_at:
        disbursementPayments?.updated_at &&
        dayjs(disbursementPayments?.updated_at),
      disabled: !editAbleForm,
    });
  }, [disbursementPayments, mode, reset, editAbleForm, category]);

  const onSubmit = useCallback(
    () => async (body) => {
      const temp_ids = updatedBookings.map((booking) => {
        return booking.id;
      });
      const contract_ids = updatedBookings.map((booking) => {
        return booking?.contract?.id;
      });

      try {
        if (mode === "view") {
          window.close();
        } else if (mode === "edit") {
          await dispatch(
            updateDisbursementPayment({
              body: {
                ...body,
                booking_process_ids: temp_ids,
                contract_ids: contract_ids,
                posting_date:
                  (body?.posting_date &&
                    body?.posting_date.format("YYYY-MM-DD HH:mm:ss")) ||
                  null,
              },
              uuid: disbursementPayments?.uuid,
            })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00008);
          setTimeout(() => {
            window.close();
          }, 5000);
        } else {
          await dispatch(
            createDisbursementPayment({
              body: {
                ...body,
                booking_process_ids: temp_ids,
                contract_ids: contract_ids,
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
    [dispatch, updatedBookings, disbursementPayments]
  );

  const handleChangeStatus = useCallback(
    async (status) => {
      try {
        const responseData = await dispatch(
          changeStatusDisbursementPayment({
            status: status,
            uuid: disbursementPayments?.uuid,
          })
        );

        if (responseData.payload.success === true) {
          showSuccessToast(CommonMessage.MFS00006);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [dispatch, disbursementPayments]
  );

  const handlePosted = useCallback(async () => {
    try {
      const responseData = await dispatch(
        postDisbursementPayment({
          uuid: disbursementPayments?.uuid,
        })
      );

      if (responseData.payload.success === true) {
        showSuccessToast("Posted Success");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, [dispatch, disbursementPayments]);

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
      updatedBookings,
      handleButtonClick,
      isContractsLoading,
      isShowToolbar,
      isShowRemove,
      isDisable,
      disbursementPayments,
      handleChangeStatus,
      handlePosted,
      bookings,
      bankAccountCodes,
      projectCategories
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
      updatedBookings,
      handleButtonClick,
      isContractsLoading,
      isShowToolbar,
      isShowRemove,
      isDisable,
      disbursementPayments,
      handleChangeStatus,
      handlePosted,
      bookings,
      bankAccountCodes,
      projectCategories
    ]
  );
};

export default useDisbursementPaymentForm;