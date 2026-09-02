import { useCallback, useEffect, useMemo } from "react";

import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createSurveyResult,
  updateSurveyResultByUuid,
} from "../../../../../features/surveryResult/surveyResultSlice";

const useInHouseSurveyForm = () => {
  const { surveyType: survey_type, applicationId: application_id } =
    useParams();
  const { surveyResult, isLoading } = useSelector(
    (state) => state.surveyResult
  );

  const dispatch = useDispatch();

  const { control, reset, watch, handleSubmit } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    dispatch(createSurveyResult({ body: { application_id, survey_type } }));
  }, [application_id, dispatch, survey_type]);

  useEffect(() => {
    reset({
      ...surveyResult,
      created_at: surveyResult?.created_at && dayjs(surveyResult?.created_at),
      updated_at: surveyResult?.updated_at && dayjs(surveyResult?.updated_at),
    });
  }, [surveyResult, reset]);

  // const onSubmit = useCallback(
  //   async (body) => {
  //     await dispatch(
  //       updateSurveyResultByUuid({
  //         uuid: surveyResult?.uuid,
  //         body: {
  //           ...body,
  //         },
  //       })
  //     );
  //     toast.success("Update Success", {
  //       position: "top-right",
  //       autoClose: 1000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   },
  //   [dispatch, surveyResult?.uuid]
  // );

  const onSubmit = () =>{
    window.close();
  }

  return useMemo(
    () => ({
      isLoading,
      onSubmit,
      handleSubmit,
      control,
      surveyResult,
    }),
    [control, handleSubmit, isLoading, onSubmit, surveyResult]
  );
};

export default useInHouseSurveyForm;
