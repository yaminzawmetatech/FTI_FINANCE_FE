import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import {
  createDealerGroup,
  getDealerGroups,
  updateDealerGroup,
} from "modules/loan-operation/slices/dealerGroupSlice";

const useDealerGroupForm = () => {
  const dispatch = useDispatch();

  const { control, reset, handleSubmit, setValue } = useForm({});

  const onSubmit = useCallback(
    async (body, editFlag) => {
      try {
        if (editFlag) {
          await dispatch(
            updateDealerGroup({ id: body?.uuid, newData: { ...body, in_active : body.in_active === true ? 1 : 0 } })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Dealer Group")
          );
        } else {
          await dispatch(createDealerGroup({ ...body, in_active : body.in_active === true ? 1 : 0 })).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Dealer Group")
          );
        }
        await dispatch(
          getDealerGroups({
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

export default useDealerGroupForm;
