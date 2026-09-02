import { useCallback, useEffect, useMemo } from "react";

import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { getInsuranceCompaines } from "features/insuranceCompany/insuranceCompanySlice";
import { getInsuranceInspectionByUuid, updateInsuranceInspection } from "features/insuranceInspection/insuranceInspectionSlice";

const useInsuranceInspectionForm = () => {
  const { uuid, id } = useParams();

  const dispatch = useDispatch();

  const { control, getValues, reset, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      disabled: false,
    },
  });

  const { insuranceInspections, isLoading } = useSelector(
    (state) => state.insuranceInspections
  );

  const { insuranceCompanies, isLoading: insuranceCompaniesLoading } = useSelector(
    (state) => state.insuranceCompanies
  );

  useEffect(() => {
    dispatch(
      getInsuranceInspectionByUuid({uuid})
    );
    dispatch(getInsuranceCompaines({
      allFlag: true,
    }));
  }, [uuid, dispatch]);

  useEffect(() => {
    reset({
      ...insuranceInspections,
      disabled: !editAbleForm,
      requested_date:
      insuranceInspections.requested_date &&
        dayjs(insuranceInspections?.requested_date),
      conducted_date:
      insuranceInspections.conducted_date &&
        dayjs(insuranceInspections?.conducted_date),
      created_at:
        insuranceInspections?.created_at &&
        dayjs(insuranceInspections?.created_at),
      updated_at:
        insuranceInspections?.updated_at &&
        dayjs(insuranceInspections?.updated_at),
    });
  }, [reset, insuranceInspections]);


  const editAbleForm = useMemo(() => {
    if (insuranceInspections === "completed") {
      return false;
    }
    return true;
  }, [insuranceInspections]);

  const onSubmit = useCallback(
    async (body) => {
      await dispatch(
        updateInsuranceInspection({
          uuid:insuranceInspections?.uuid,
          body: {
            ...body,
            requested_date:
            (body?.requested_date &&
              body?.requested_date.format("YYYY-MM-DD")) ||
            null,
            conducted_date:
            (body?.conducted_date &&
              body?.conducted_date.format("YYYY-MM-DD")) ||
            null,
           
          },
        })
      );
      showSuccessToast(CommonMessage.MFS00008);
    },
    [dispatch, insuranceInspections,id]
  );

  return useMemo(
    () => ({
      onSubmit,
      handleSubmit,
      control,
      getValues,
      setValue,
      editAbleForm,
      insuranceCompanies,
      insuranceCompaniesLoading,
      insuranceInspections,
      isLoading
    }),
    [
      onSubmit,
      handleSubmit,
      control,
      getValues,
      setValue,
      editAbleForm,
      insuranceCompanies,
      insuranceCompaniesLoading,
      insuranceInspections,
      isLoading
    ]
  );
};

export default useInsuranceInspectionForm;
