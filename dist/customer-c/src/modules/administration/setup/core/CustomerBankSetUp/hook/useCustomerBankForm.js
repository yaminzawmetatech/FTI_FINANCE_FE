import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";

import {
  createCustomerBank,
  getCustomerBanks,
  updateCustomerBank,
} from "modules/administration/slices/customerBankSlice";

const useCustomerBankForm = () => {
  const dispatch = useDispatch();

  const { control, reset, handleSubmit, setValue } = useForm({});

  const onSubmit = useCallback(
    async (body, editFlag) => {
      try {
        if (editFlag) {
          await dispatch(
            updateCustomerBank({
              id: body?.uuid,
              newData: {
                ...body,
                is_active: body?.is_active ? 1 : 0,
              },
            })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00003.replace("%s", "Customer Bank"));
        } else {
          await dispatch(
            createCustomerBank({
              ...body,
              is_active: body?.is_active ? 1 : 0,
            })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00001.replace("%s", "Customer Bank"));
        }

        reset();

        await dispatch(
          getCustomerBanks({
            firstFetch: true,
          })
        );

        return true;
      } catch (error) {
        console.error("Error in Customer Bank submission:", error);
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

export default useCustomerBankForm;
