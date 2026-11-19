import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import {
  createLastPayment,
  getLastPayments,
  updateLastPayment,
} from "modules/collection/slices/lastPaymentSlice";

const useLastPaymentSetupForm = () => {
  const dispatch = useDispatch();

  const { control, reset, handleSubmit, setValue } = useForm({});

  const onSubmit = useCallback(
    async (body, editFlag) => {
      try {
        const formattedBody = {
          ...body,
          start_date: body?.start_date?.format("YYYY-MM-DD") || null,
          end_date: body?.end_date?.format("YYYY-MM-DD") || null,
        };
  
        const action = editFlag
          ? updateLastPayment({ id: body?.uuid, newData: formattedBody, in_active : body.in_active === true ? 1 : 0 })
          : createLastPayment({ ...formattedBody, in_active : body.in_active === true ? 1 : 0 });
  
        await dispatch(action).unwrap();
  
        showSuccessToast(
          CommonMessage[
            editFlag ? "MFS00003" : "MFS00001"
          ].replace("%s", "Last Payment Setup")
        );
  
        await dispatch(getLastPayments({ firstFetch: true }));
        reset();
        return true;
      } catch (error) {
        console.error("Error", error);
        return false;
      }
    },
    [dispatch, reset]
  );
  

  return useMemo(
    () => ({
      onSubmit,
      handleSubmit,
      control,
      reset,
      setValue,
    }),
    [onSubmit, handleSubmit, control, reset, setValue]
  );
};

export default useLastPaymentSetupForm;
