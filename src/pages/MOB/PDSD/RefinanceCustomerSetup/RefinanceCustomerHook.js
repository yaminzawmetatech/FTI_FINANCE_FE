import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import {
  createRefinanceCustomer,
  getRefinanceCustomers,
  updateRefinanceCustomer,
} from "features/refinanceCustomer/refinanceCustomerSlice";

const useRefinanceCustomerForm = () => {
  const dispatch = useDispatch();

  const { control, reset, handleSubmit, setValue } = useForm({});

  const onSubmit = useCallback(
    async (body, editFlag) => {
      try {
        if (editFlag) {
          await dispatch(
            updateRefinanceCustomer({
              id: body?.uuid,
              newData: {
                ...body,
                eligible_month:
                  (body?.eligible_month &&
                    body?.eligible_month.format("YYYY-MM-DD")) ||
                  null,
              },
            })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Refinance Customer")
          );
        } else {
          await dispatch(
            createRefinanceCustomer({
              ...body,
              eligible_month:
                (body?.eligible_month &&
                  body?.eligible_month.format("YYYY-MM-DD")) ||
                null,
            })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Refinance Customer")
          );
        }
        await dispatch(
          getRefinanceCustomers({
            firstFetch: true,
          })
        );
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

export default useRefinanceCustomerForm;
