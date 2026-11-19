import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import {
  createDealerPackage,
  getDealerPackages,
  updateDealerPackage,
} from "modules/loan-operation/slices/dealerPackageSlice";

const useDealerPackageForm = () => {
  const dispatch = useDispatch();

  const { control, reset, handleSubmit, setValue } = useForm({});

  const onSubmit = useCallback(
    async (body, editFlag) => {
      try {
        if (editFlag) {
          await dispatch(
            updateDealerPackage({ id: body?.uuid, newData: { ...body } })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Dealer Package")
          );
        } else {
          await dispatch(createDealerPackage({ ...body })).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Dealer Package")
          );
        }
        await dispatch(
          getDealerPackages({
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

export default useDealerPackageForm;
