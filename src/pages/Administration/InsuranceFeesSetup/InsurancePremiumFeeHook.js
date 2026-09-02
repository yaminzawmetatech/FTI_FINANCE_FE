import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { createInsurancePremiumFee, getInsurancePremiumFees, updateInsurancePremiumFee } from "features/insurancePremiumFee/insurancePremiumFeeSlice";

const useInsurancePremiumFeeForm = () => {
  const dispatch = useDispatch();

  const { control, reset, handleSubmit, setValue } = useForm({});

  const onSubmit = useCallback(
    async (body, editFlag) => {
      try {
       
        if (editFlag) {
          await dispatch(
            updateInsurancePremiumFee({ id: body?.uuid, newData: body})
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Insurance Premium Fee")
          );
        } else {
          await dispatch(createInsurancePremiumFee(body)).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Insurance Premium Fee")
          );
        }
        await dispatch(
          getInsurancePremiumFees({
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
    [
      onSubmit,
      handleSubmit,
      control,
      reset,
      setValue,
    ]
  );
};

export default useInsurancePremiumFeeForm;
