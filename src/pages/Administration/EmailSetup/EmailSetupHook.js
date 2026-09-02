import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { createEmailSetup, getEmailSetups, updateEmailSetup } from "features/emailSetup/emailSetupSlice";

const useEmailSetupForm = () => {
  const dispatch = useDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]); // row values to edit

  const { control, reset, handleSubmit, setValue } = useForm({});

  const { emailSetups, isLoading, } = useSelector(
    (state) => state.emailSetups
  );

  useEffect(() => {
    dispatch(getEmailSetups());
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
            updateEmailSetup({ id: editValues?.uuid, newData: body })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00003.replace("%s", "Email Setup"));
        } else {
          await dispatch(createEmailSetup({ ...body })).unwrap();

          showSuccessToast(CommonMessage.MFS00001.replace("%s", "Email Setup"));
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getEmailSetups());
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
      emailSetups,
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
      emailSetups,
      setValue,
      createModalOpen,
      setCreateModalOpen,
      reset,
      setEditValues,
      editValues,
    ]
  );
};

export default useEmailSetupForm;
