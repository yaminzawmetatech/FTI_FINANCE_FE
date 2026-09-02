import { useCallback, useEffect, useMemo } from "react";

import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAssessment,
  updateAssessmentByUuid,
} from "../../../../features/assessment/assessmentSlice";

const useApplicationAssessmentForm = () => {
  const { id } = useParams();
  const { assessment, isLoading } = useSelector(
    (state) => state.assessments.assessmentDetail
  );

  const dispatch = useDispatch();

  const { control, reset, handleSubmit, setValue } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    dispatch(getAssessment({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    reset({
      ...assessment,
      conduct_at: assessment?.conduct_at && dayjs(assessment?.conduct_at),
      commencement_date:
        assessment?.commencement_date && dayjs(assessment?.commencement_date),
      created_at: assessment?.created_at && dayjs(assessment?.created_at),
      updated_at: assessment?.updated_at && dayjs(assessment?.updated_at),
    });
  }, [assessment, reset]);

  const onSubmit = () => {
    window.close();
  };

  return useMemo(
    () => ({
      isLoading,
      onSubmit,
      handleSubmit,
      control,
      assessment,
    }),
    [control, handleSubmit, isLoading, onSubmit, assessment]
  );
};

export default useApplicationAssessmentForm;
