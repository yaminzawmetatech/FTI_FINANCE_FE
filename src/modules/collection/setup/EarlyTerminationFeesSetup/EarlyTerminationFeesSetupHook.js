import { useState, useEffect, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import {
  createEarlyTerminationFees,
  getEarlyTerminationFees,
  updateEarlyTerminationFees,
} from "modules/collection/slices/earlyTerminationFeesSetupSlice";

const useEarlyTerminationFeesSetupForm = () => {
  const dispatch = useDispatch();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]); // row values to edit

  const { control, reset, handleSubmit } = useForm({});

  const { earlyTerminationFees, isLoading, isSuccess, isError, message } =
    useSelector((state) => state.earlyTerminationFees);

  useEffect(() => {
    dispatch(getEarlyTerminationFees());
  }, [dispatch]);

  useEffect(() => {
    reset({
      ...editValues,
    });
  }, [reset, editValues]);

  const onSubmit = useCallback(
    async (body, editFlag) => {
      try {
        if (editFlag) {
          await dispatch(
            updateEarlyTerminationFees({ id: editValues?.uuid, newData: body })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Early Termination Fees Setup")
          );
        } else {
          await dispatch(createEarlyTerminationFees({ ...body })).unwrap();
          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Early Termination Fees Setup")
          );
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getEarlyTerminationFees());
      } catch (error) {
        console.error("Error", error);
      }
    },
    [dispatch, editValues, reset]
  );
  return useMemo(
    () => ({
      isLoading,
      onSubmit,
      handleSubmit,
      control,
      earlyTerminationFees,
      createModalOpen,
      setCreateModalOpen: (value) => setCreateModalOpen(value),
      setEditValues: (value) => setEditValues(value),
      reset,
    }),
    [
      isLoading,
      onSubmit,
      handleSubmit,
      control,
      earlyTerminationFees,
      createModalOpen,
      setCreateModalOpen,
      setEditValues,
      reset,
    ]
  );
};

export default useEarlyTerminationFeesSetupForm;
