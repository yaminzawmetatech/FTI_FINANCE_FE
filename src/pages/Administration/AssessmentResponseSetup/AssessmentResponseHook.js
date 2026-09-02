import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { createAssessmentResponse, getAssessmentResponses, updateAssessmentResponse } from "features/assessmentResponseSetup/assessmentResponseSlice";

const useAssessmentResponseForm = () => {
  const dispatch = useDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]); // row values to edit

  const { control, reset, handleSubmit, setValue } = useForm({});

  const { assessmentResponses, isLoading } = useSelector(
    (state) => state.assessmentResponses
  );

  useEffect(() => {
    dispatch(getAssessmentResponses());
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
            updateAssessmentResponse({ id: editValues?.uuid, newData: body })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00003.replace("%s", "Assessment Response"));
        } else {
          await dispatch(createAssessmentResponse({ ...body })).unwrap();

          showSuccessToast(CommonMessage.MFS00001.replace("%s", "Assessment Response"));
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getAssessmentResponses());
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
      assessmentResponses,
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
      assessmentResponses,
      setValue,
      createModalOpen,
      setCreateModalOpen,
      reset,
      setEditValues,
      editValues,
    ]
  );
};

export default useAssessmentResponseForm;
