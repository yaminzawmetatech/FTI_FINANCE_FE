import { useCallback, useEffect, useMemo } from "react";

import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAssessment,
  updateAssessmentByUuid,
  updateAssessmentStatusByUuid,
} from "../../../../../../features/assessment/assessmentSlice";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";

const useApplicationAssessmentForm = () => {
  const { id } = useParams();
  const { assessment, isLoading } = useSelector(
    (state) => state.assessments.assessmentDetail
  );

  const dispatch = useDispatch();

  const { control, reset, watch, handleSubmit, setValue, getValues } = useForm({
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

  const handleOnOk = useCallback(
    handleSubmit(async (data, event) => {
      await dispatch(
        updateAssessmentByUuid({
          id: assessment?.id,
          body: {
            ...data,
            commencement_date:
              (data?.commencement_date &&
                data?.commencement_date.format("YYYY-MM-DD HH:mm:ss")) ||
              null,
          },
        })
      ).unwrap();
      showSuccessToast(CommonMessage.MFS00008);
      setTimeout(() => {
        window.close();
      }, 5000);
    }),
    [assessment?.id, dispatch, handleSubmit]
  );

  const handleStatusChange = useCallback(
    (status) =>
      handleSubmit(async (data, event) => {
        try {
          await dispatch(
            updateAssessmentStatusByUuid({
              id: assessment?.id,
              status,
              body: {
                ...data,
                commencement_date:
                  (data?.commencement_date &&
                    data?.commencement_date.format("YYYY-MM-DD HH:mm:ss")) ||
                  null,
              },
            })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00008);
          setTimeout(() => {
            window.close();
          }, 5000);
        } catch (e) {}
      }),
    [handleSubmit, dispatch, assessment?.id]
  );

  return useMemo(
    () => ({
      isLoading,
      handleOnOk,
      control,
      assessment,
      setValue,
      getValues,
      handleStatusChange,
    }),
    [
      control,
      isLoading,
      handleOnOk,
      assessment,
      setValue,
      getValues,
      handleStatusChange,
    ]
  );
};

export default useApplicationAssessmentForm;
