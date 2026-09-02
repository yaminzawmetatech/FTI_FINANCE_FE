import { useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";

import { createCreditScheme, getCreditSchemes, updateCreditScheme } from "features/creditSchemeSetup/creditSchemeSlice";

const useCreditSchemeForm = () => {
  const dispatch = useDispatch();

  const { control, reset, handleSubmit, setValue } = useForm({});

  const onSubmit = useCallback(
    async (body, editFlag) => {
      try {
        if (editFlag) {
          await dispatch(
            updateCreditScheme({
              id: body?.uuid,
              newData: {
                ...body
              },
            })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Credit Scheme")
          );
        } else {
          await dispatch(
            createCreditScheme(body)
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Credit Scheme")
          );
        }
        await dispatch(
          getCreditSchemes({
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

export default useCreditSchemeForm;
