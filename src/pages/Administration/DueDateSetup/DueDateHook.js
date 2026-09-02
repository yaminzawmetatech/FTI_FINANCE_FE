import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { createDueDate, getDueDates, updateDueDate } from "features/dueDateSetup/dueDateSlice";

const useDueDateForm = () => {
  const dispatch = useDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]); // row values to edit

  const { control, reset, handleSubmit, setValue } = useForm({});

  const { dueDates, isLoading } = useSelector((state) => state.dueDates);

  useEffect(() => {
    dispatch(getDueDates());
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
            updateDueDate({ id: editValues?.uuid, newData: body })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00003.replace("%s", "Due Date"));
        } else {
          await dispatch(createDueDate({ ...body })).unwrap();

          showSuccessToast(CommonMessage.MFS00001.replace("%s", "Due Date"));
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getDueDates());
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [dispatch, reset, editValues]
  );

  return useMemo(
    () => ({
      isLoading,
      onSubmit,
      handleSubmit,
      control,
      dueDates,
      setValue,
      createModalOpen,
      setCreateModalOpen: (value) => setCreateModalOpen(value),
      setEditValues: (value) => setEditValues(value),
      reset,
    }),
    [
      control,
      handleSubmit,
      isLoading,
      onSubmit,
      dueDates,
      setValue,
      createModalOpen,
      setCreateModalOpen,
      reset,
      setEditValues,
      editValues,
    ]
  );
};

export default useDueDateForm;
