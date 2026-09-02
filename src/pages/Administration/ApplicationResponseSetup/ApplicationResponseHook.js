import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { createApplicationResponse, getApplicationAssessmentResponses, updateApplicationResponse } from "features/applicationResponseSetup/applicationResponseSlice";

const useApplicationResponseForm = () => {
  const dispatch = useDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]); // row values to edit

  const { control, reset, handleSubmit, setValue } = useForm({});

  const { applicationResponses, isLoading } = useSelector(
    (state) => state.applicationResponses
  );

  useEffect(() => {
    dispatch(getApplicationAssessmentResponses());
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
            updateApplicationResponse({ id: editValues?.uuid, newData: body })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00003.replace("%s", "Application Response"));
        } else {
          await dispatch(createApplicationResponse({ ...body })).unwrap();

          showSuccessToast(CommonMessage.MFS00001.replace("%s", "Application Response"));
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getApplicationAssessmentResponses());
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
      applicationResponses,
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
      applicationResponses,
      setValue,
      createModalOpen,
      setCreateModalOpen,
      reset,
      setEditValues,
      editValues,
    ]
  );
};

export default useApplicationResponseForm;
