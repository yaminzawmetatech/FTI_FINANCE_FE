import { useState, useEffect, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { createAllocateActivity, getAllocateActivities, updateAllocateActivity } from "modules/collection/slices/allocateActivitiesSlice";

const useAllocateActivitiesForm = () => {
  const dispatch = useDispatch();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]); // row values to edit

  const { control, reset, handleSubmit } = useForm({});

  const { allocateActivities, isLoading } = useSelector(
    (state) => state.allocateActivities
  );

  useEffect(() => {
    dispatch(getAllocateActivities());
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
            updateAllocateActivity({ id: editValues?.uuid, newData: body })
          ).unwrap();
          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Allocate Activity")
          );
        } else {
          await dispatch(createAllocateActivity({ ...body })).unwrap();
          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Allocate Activity")
          );
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getAllocateActivities());
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
      allocateActivities,
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
      allocateActivities,
      createModalOpen,
      setCreateModalOpen,
      setEditValues,
      reset,
    ]
  );
};

export default useAllocateActivitiesForm;
