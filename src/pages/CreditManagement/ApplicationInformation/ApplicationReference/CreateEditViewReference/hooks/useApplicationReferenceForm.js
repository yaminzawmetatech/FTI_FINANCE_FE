import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getReference,
  updateReferenceByUuid,
  createReferences,
} from "features/reference/referenceSlice";
import { getApplicationByUuid } from "features/application/applicationDetailSlice";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";

const useApplicationReferenceForm = (applicationId) => {
  const { id, applicationUUId, mode } = useParams();

  const { reference, isLoading } = useSelector(
    (state) => state.references.referenceDetail
  );

  const { isSubmitting } = useSelector(
    (state) => state.references.createReferences
  );

  const dispatch = useDispatch();

  const { control, reset, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      disabled: false,
    },
  });

  const { application } = useSelector(
    (state) => state.applicationDetail
  );

  useEffect(() => {
    dispatch(getApplicationByUuid({ uuid: applicationUUId }));
  }, [applicationUUId, dispatch]);

  useEffect(() => {
    if (application?.application_id) {
      setValue("application_id", application?.application_id);
    }
  }, [application, setValue]);

  useEffect(() => {
    reset({
      ...reference,
      dob: reference?.dob && dayjs(reference?.dob),
      application_id: application?.application_id,
      disabled: mode && mode === "ViewApplicationReference",
    });
  }, [reference, reset, application]);

  useEffect(() => {
    if (mode !== "CreateApplicationReference" && id) {
      dispatch(getReference({ id }));
    }
  }, [dispatch, id]);

  const currentPermanentSame = watch("current_permanent_same");
  const currentState = watch("current_state_id");
  const currentDistrict = watch("current_district_id");
  const currentTownship = watch("current_township_id");
  const currentCity = watch("current_city_id");
  const currentVillageTract = watch("current_village_tract_id");
  const currentWard = watch("current_ward_id");
  const currentVillage = watch("current_village_id");
  const currentRoad = watch("current_road_street");

  useEffect(() => {
    if (currentPermanentSame === true) {
      setValue("permanent_state_id", currentState);
      setValue("permanent_district_id", currentDistrict);
      setValue("permanent_township_id", currentTownship);
      setValue("permanent_city_id", currentCity);
      setValue("permanent_village_tract_id", currentVillageTract);
      setValue("permanent_ward_id", currentWard);
      setValue("permanent_village_id", currentVillage);
      setValue("permanent_road_street", currentRoad);
    }
  }, [
    currentPermanentSame,
    currentState,
    currentDistrict,
    currentTownship,
    currentCity,
    currentVillageTract,
    currentWard,
    currentVillage,
    currentRoad,
    setValue,
  ]);

  useEffect(() => {
    if (currentPermanentSame === false) {
      setValue("permanent_state_id", "");
      setValue("permanent_district_id", "");
      setValue("permanent_township_id", "");
      setValue("permanent_city_id", "");
      setValue("permanent_village_tract_id", "");
      setValue("permanent_ward_id", "");
      setValue("permanent_village_id", "");
      setValue("permanent_road_street", "");
    }
  }, [currentPermanentSame]);

  const onSubmit = useCallback(
    async (body) => {
      if (mode === "EditApplicationReference" && id) {
        await dispatch(
          updateReferenceByUuid({
            id: id,
            body: {
              ...body,
              dob:
                (body?.dob && body?.dob.format("YYYY-MM-DD HH:mm:ss")) || null,
            },
          })
        ).unwrap();
        showSuccessToast(CommonMessage.MFS00008);
        setTimeout(() => {
          window.close();
        }, 5000);
      } else if (mode === "CreateApplicationReference") {
        await dispatch(
          createReferences({
            body: {
              ...body,
              application_id: applicationId,
              dob:
                (body?.dob && body?.dob.format("YYYY-MM-DD HH:mm:ss")) || null,
            },
          })
        ).unwrap();
        showSuccessToast(CommonMessage.MFS00007);
        setTimeout(() => {
          window.close();
        }, 5000);
      } else if (mode === "ViewApplicationReference") {
        window.close();
      }
    },
    [dispatch]
  );

  return useMemo(
    () => ({
      isLoading,
      onSubmit,
      handleSubmit,
      control,
      reference,
      setValue,
      isSubmitting
    }),
    [control, handleSubmit, isLoading, onSubmit, reference, setValue, isSubmitting]
  );
};

export default useApplicationReferenceForm;
