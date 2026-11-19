import { useState, useEffect, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { createFollowUpResult, getFollowUpResults, updateFollowUpResult } from "modules/collection/slices/followUpResultSlice";

const useFollowUpResultForm = () => {
  const dispatch = useDispatch();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]); // row values to edit

  const { control, reset, handleSubmit } = useForm({});

  const { followUpResults, isLoading } = useSelector(
    (state) => state.followUpResults
  );

  useEffect(() => {
    dispatch(getFollowUpResults());
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
            updateFollowUpResult({ id: editValues?.uuid, newData: body })
          ).unwrap();
          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Follow Up Result")
          );
        } else {
          await dispatch(createFollowUpResult({ ...body })).unwrap();
          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Follow Up Result")
          );
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getFollowUpResults());
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
      followUpResults,
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
      followUpResults,
      createModalOpen,
      setCreateModalOpen,
      setEditValues,
      reset,
    ]
  );
};

export default useFollowUpResultForm;
