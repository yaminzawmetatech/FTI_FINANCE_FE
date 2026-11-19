import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { createInsuranceCompany, getInsuranceCompaines, updateInsuranceCompany } from "modules/loan-operation/slices/insuranceCompanySlice";

const useInsuranceCompanyForm = () => {
  const dispatch = useDispatch();

  const { control, reset, handleSubmit, setValue } = useForm({});

  const onSubmit = useCallback(
    async (body, editFlag) => {
      try {
        if (body?.email) {
          body.email = body.email.split(",").map((email) => email.trim());
        }

        if (editFlag) {
          await dispatch(
            updateInsuranceCompany({ id: body?.uuid, newData: body})
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Insurance Company")
          );
        } else {
          await dispatch(createInsuranceCompany(body)).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Insurance Company")
          );
        }
        await dispatch(
          getInsuranceCompaines({
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

export default useInsuranceCompanyForm;
