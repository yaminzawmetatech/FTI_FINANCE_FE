import { useCallback, useEffect, useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getGuarantor,
  updateGuarantorByUuid,
  createGuarantor,
} from "modules/credit-management/slices/guarantorSlice";
import { getApplicationByUuid } from "modules/credit-management/slices/applicationDetailSlice";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { checkExistingGuarantor } from "modules/credit-management/slices/guarantorCheckNrcSlice";

const useApplicationGuarantorForm = () => {
  const { applicationId,id, applicationUUId, mode } = useParams();
  const [category, setCategory] = useState();

  const { guarantor, isLoading } = useSelector(
    (state) => state.guarantors.guarantorDetail
  );

  const dispatch = useDispatch();

  const { control, reset, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      disabled: false,
    },
  });

  const { application } = useSelector((state) => state.applicationDetail);

  const { isSubmitting } = useSelector(
    (state) => state.guarantors.createGuarantor
  );

  const { guarantorInfo } = useSelector((state) => state.guarantorInfo);

  useEffect(() => {
    dispatch(getApplicationByUuid({ uuid: applicationUUId }));
  }, [applicationUUId, dispatch]);

  useEffect(() => {
    if (application?.application_id) {
      setValue("application_id", application?.application_id);
      setCategory(application?.category_id);
    }
  }, [application, setValue]);

  useEffect(() => {
    reset({
      ...guarantorInfo.guarantor,
      dob:
      guarantorInfo?.guarantor?.dob && dayjs(guarantorInfo?.guarantor?.dob),
    });
  }, [guarantorInfo, reset]);

  useEffect(() => {
    reset({
      ...guarantor,
      application_id: application?.application_id,
      dob: guarantor?.dob && dayjs(guarantor?.dob),
      disabled: mode && mode === "ViewApplicationGuarantor",
    });
  }, [guarantor, reset, application]);

  useEffect(() => {
    if (mode !== "CreateApplicationGuarantor" && id) {
      dispatch(getGuarantor({ id }));
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

  
  // const handleCheckExistingCustomer = useCallback(async (nrc) => {
  //   try {
  //     dispatch(checkExistingGuarantor({ body: { nrc: nrc, uuid: id } }));
  //   } catch (e) {
  //     console.error("Error", e);
  //   }
  // }, []);

  const handleCheckExistingCustomer = useCallback(async (nrc) => {
    try {
      dispatch(checkExistingGuarantor({ body: { nrc: nrc, uuid: id, guarantor_uuid : guarantor?.application_guarantor?.uuid } }));
    } catch (e) {
      console.error("Error", e);
    }
  }, [id, guarantor]);

  const onSubmit = useCallback(
    async (body) => {
      if (mode === "EditApplicationGuarantor" && id) {
        await dispatch(
          updateGuarantorByUuid({
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
      } else if (mode === "CreateApplicationGuarantor") {
        await dispatch(
          createGuarantor({
            body: {
              ...body,
              application_id: applicationId,
              current_permanent_same:
                body.current_permanent_same === true ? true : false,
              dob:
                (body?.dob && body?.dob.format("YYYY-MM-DD HH:mm:ss")) || null,
            },
          })
        ).unwrap();
        showSuccessToast(CommonMessage.MFS00007);
        setTimeout(() => {
          window.close();
        }, 5000);
      } else if (mode === "ViewApplicationGuarantor") {
        window.close();
      }
    },
    [dispatch]
  );

  return useMemo(
    () => ({
      onSubmit,
      handleSubmit,
      control,
      setValue,
      category,
      isLoading,
      isSubmitting,
      handleCheckExistingCustomer
    }),
    [control, handleSubmit, isLoading, onSubmit, setValue, category, isSubmitting,handleCheckExistingCustomer]
  );
};

export default useApplicationGuarantorForm;
