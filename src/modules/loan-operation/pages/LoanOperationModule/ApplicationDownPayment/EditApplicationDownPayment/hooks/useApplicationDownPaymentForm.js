import { useCallback, useEffect, useMemo } from "react";

import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import {
  getApplicationDownPaymentByUuid,
  updateApplicationDownPaymentByUuid,
} from "modules/loan-operation/slices/applicationDownPaymentSlice";

const useApplicationDownPaymentForm = () => {
  const { uuid } = useParams();
  const { downPayment, isLoading } = useSelector(
    (state) => state.applicationDownPayments.applicationDownPaymentDetail
  );

  const dispatch = useDispatch();

  const { control, reset, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    dispatch(getApplicationDownPaymentByUuid({ uuid }));
  }, [dispatch, uuid]);

  useEffect(() => {
    const currentDate = dayjs(Date.now());
    reset({
      ...downPayment,
      created_at: downPayment?.created_at && dayjs(downPayment?.created_at),
      updated_at: downPayment?.updated_at && dayjs(downPayment?.updated_at),
      payment_date:
        downPayment?.payment_date ? dayjs(downPayment?.payment_date) : currentDate,
    });
  }, [downPayment, reset]);

  const handleOnOk = useCallback(
    handleSubmit(async (data, event) => {
      await dispatch(
        updateApplicationDownPaymentByUuid({
          uuid: downPayment?.uuid,
          body: {
            ...data,
            payment_date:
              (data?.payment_date && data?.payment_date.format("YYYY-MM-DD")) ||
              null,
          },
        })
      ).unwrap();
      showSuccessToast(CommonMessage.MFS00008);
    }),
    [downPayment, dispatch, handleSubmit]
  );

  const handleStatusChange = useCallback(
    (status) =>
      handleSubmit(async (data, event) => {
        try {
          await dispatch(
            updateApplicationDownPaymentByUuid({
              uuid: downPayment?.uuid,
              body: {
                ...data,
                status: status,
                payment_date:
                  (data?.payment_date &&
                    data?.payment_date.format("YYYY-MM-DD")) ||
                  null,
              },
            })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00008);
          //setTimeout(() => {
          //   window.close();
          //}, 5000);
        } catch (e) {}
      }),
    [handleSubmit, dispatch, downPayment]
  );

  return useMemo(
    () => ({
      isLoading,
      handleOnOk,
      control,
      downPayment,
      setValue,
      getValues,
      handleStatusChange,
      handleSubmit,
      reset,
      downPayment,
    }),
    [
      control,
      isLoading,
      handleOnOk,
      downPayment,
      setValue,
      getValues,
      handleStatusChange,
      handleSubmit,
      reset,
      downPayment,
    ]
  );
};

export default useApplicationDownPaymentForm;
