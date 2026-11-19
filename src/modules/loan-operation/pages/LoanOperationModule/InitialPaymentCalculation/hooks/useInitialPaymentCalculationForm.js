import { useCallback, useEffect, useMemo } from "react";

import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import {
  createInitialPaymentCalculation,
  getInitialPaymentCalculation,
  updateInitialPaymentCalculation,
} from "modules/loan-operation/slices/initialPaymentCalSlice";
import { getApplicationByUuid } from "modules/credit-management/slices/applicationDetailSlice";
import { getSubCategory } from "modules/administration/slices/subcategorySlice";
import { getDealers, getDealersByUserRole } from "modules/loan-operation/slices/dealerSlice";
import { getAllVehicles } from "modules/loan-operation/slices/vehicleSlice";
import { getInsuranceCompaines } from "modules/loan-operation/slices/insuranceCompanySlice";
import { getInsurancePremiumFees } from "modules/loan-operation/slices/insurancePremiumFeeSlice";
import { getCategories } from "modules/administration/slices/categorySlice";
import { getApplicationSetupList } from "modules/administration/slices/menuApplicationSetupSlice";

const useInitialPaymentCalForm = () => {
  const { uuid, id, route } = useParams();

  const { projectCategories, isLoading: projectCategoriesloading } =
    useSelector((state) => state.projectCategories);

  const { subCategories } = useSelector((state) => state.subCategories);

  const {
    initialPaymentCalculations,
    isLoading: initialPaymentCalLoading,
    isCalculating,
  } = useSelector((state) => state.initialPaymentCalculations);

  const { vehicles, isLoading: vehicleLoading } = useSelector(
    (state) => state.vehicles
  );

  const { insuranceCompanies, isLoading: insuranceCompaniesLoading } =
    useSelector((state) => state.insuranceCompanies);

  const { insurancePremiumFees, isLoading: insurancePremiumFeesLoading } =
    useSelector((state) => state.insurancePremiumFees);
  
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { control, getValues, reset, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      disabled: false,
      calculate_date: dayjs(), // today's date
    },
  });

  const insurance_company_id = watch("insurance_company_id");

  const selectedBrand = watch("brand_id");
  const selectedModel = watch("model_id");

  const selectedVehicleId = useMemo(() => {
    const vehicle = vehicles.find(
      (v) => v.brand_id === selectedBrand && v.model_id === selectedModel
    );
    return vehicle ? vehicle.id : null;
  }, [selectedBrand, selectedModel, vehicles]);

  const {data: applicationSetups, isLoading: applicationSetupsLoading} =
  useSelector((state) => state.menuApplicationSetup.applicationSetups);

  useEffect(() => {
    dispatch(
      getInitialPaymentCalculation({
        params: {
          application_id: id,
        },
      })
    );
  }, [uuid, dispatch]);

  useEffect(() => {
    dispatch(getApplicationSetupList());
    dispatch(getCategories());
    dispatch(getSubCategory());
    // dispatch(getDealersByUserRole());
    dispatch(
      getInsuranceCompaines({
        allFlag: true,
      })
    );
    // dispatch(
    //   getDealers({
    //     allFlag: true,
    //   })
    // );
  }, [dispatch]);

  useEffect(() => {
    if (!initialPaymentCalculations?.length) return;

    const appData = initialPaymentCalculations[0]?.application || {};
    const vehicleInfo =
      route === "initial-payment-calculation"
        ? initialPaymentCalculations[0]?.vehicle_information?.[0] || {}
        : initialPaymentCalculations[0]?.latest_vehicle_information?.[0] || {};

    reset({
      ...initialPaymentCalculations[0],
      application_id: appData.application_id,
      applicant_name: appData.applicant_name,
      category_id: appData.category_id,
      sub_category_id: appData.sub_category_id,
      dealer_name: appData?.dealer?.name ?? "",
      model_id: vehicleInfo?.vehicle?.model_id,
      brand_id: vehicleInfo?.vehicle?.brand_id,
      vehicle_color: vehicleInfo?.vehicle_color,
      engine_power: vehicleInfo?.engine_power,
      year_of_manufacture: vehicleInfo?.year_of_manufacture,
      manufacture: vehicleInfo?.manufacture,
      division: vehicleInfo?.division,
      plate_no: vehicleInfo?.plate_no,
      chassis_no: vehicleInfo?.chassis_no,
      engine_no: vehicleInfo?.engine_no,
      insurance_default_rate: appData.application_info?.insurance_default_rate,
      insurance_fixed_amount: appData.application_info?.insurance_fixed_amount,
      disbursed_based_on_package_setup : initialPaymentCalculations[0]?.disbursed_based_on_package_setup === 1 ? true : false,
      disabled:  user?.is_super === true ? false : !editAbleForm,
      commencement_date: initialPaymentCalculations[0]?.commencement_date
        ? dayjs(initialPaymentCalculations[0].commencement_date)
        : null,
      first_due_date: initialPaymentCalculations[0]?.first_due_date
        ? dayjs(initialPaymentCalculations[0].first_due_date)
        : null,
      created_at: initialPaymentCalculations[0]?.created_at
        ? dayjs(initialPaymentCalculations[0].created_at)
        : null,
      updated_at: initialPaymentCalculations[0]?.updated_at
        ? dayjs(initialPaymentCalculations[0].updated_at)
        : null,
    });
  }, [reset, initialPaymentCalculations, route, user]);

  const applicationSetup = useMemo(
    () => applicationSetups.find((item) => +item.category_id === +initialPaymentCalculations[0]?.application?.category_id),
    [initialPaymentCalculations, applicationSetups]
  );
  
  const application_fields = useMemo(
    () => applicationSetup?.application_fields || {},
    [applicationSetup]
  );

  useEffect(() => {
    dispatch(
      getAllVehicles({
        params: {
          category_id: initialPaymentCalculations[0]?.application?.category_id,
          sub_category_id:
            initialPaymentCalculations[0]?.application?.sub_category_id,
          brand_id: selectedBrand,
        },
      })
    );
  }, [dispatch, initialPaymentCalculations, selectedBrand]);

  useEffect(() => {
    if (insurance_company_id && selectedVehicleId) {
      dispatch(
        getInsurancePremiumFees({
          params: {
            vehicle_id: selectedVehicleId,
            insurance_company_id: insurance_company_id,
          },
          allFlag: true,
        })
      );
    }
  }, [dispatch, insurance_company_id, selectedVehicleId]);

  useEffect(() => {
      if (insurancePremiumFees.length > 0) {
        setValue("insurance_premium_fee", insurancePremiumFees[0]?.amount ?? 0);
      } else if (insurancePremiumFees.length === 0 && initialPaymentCalculations) {
        setValue("insurance_premium_fee", initialPaymentCalculations[0]?.insurance_premium_fee);
      } else {
        setValue("insurance_premium_fee", 0);
      }
  }, [
    insurancePremiumFees,
    insurance_company_id,
    setValue,
    selectedVehicleId,
    initialPaymentCalculations
  ]);

  useEffect(() => {
    if (!selectedBrand) {
      setValue("model_id", "");
      //setValue("insurance_premium_fee", 0);
    }
  }, [setValue, selectedBrand]);

  const editAbleForm = useMemo(() => {
    if (initialPaymentCalculations[0]?.status === "completed") {
      return false;
    }
    return true;
  }, [initialPaymentCalculations]);

  const onSubmit = useCallback(
    async (body) => {
      await dispatch(
        updateInitialPaymentCalculation({
          uuid: initialPaymentCalculations[0]?.uuid,
          body: {
            ...body,
            application_id: id,
            disbursed_based_on_package_setup: body?.disbursed_based_on_package_setup === true ? 1 : 0,
            commencement_date:
              (body?.commencement_date &&
                body?.commencement_date.format("YYYY-MM-DD")) ||
              null,
            first_due_date:
              (body?.first_due_date &&
                body?.first_due_date.format("YYYY-MM-DD")) ||
              null,
          },
        })
      );
      showSuccessToast(CommonMessage.MFS00008);
      // setTimeout(() => {
      //   window.close();
      // }, 5000);
      await dispatch(
        getInitialPaymentCalculation({
          params: {
            application_id: id,
          },
        })
      );
    },
    [dispatch, initialPaymentCalculations, id]
  );

  return useMemo(
    () => ({
      onSubmit,
      handleSubmit,
      control,
      initialPaymentCalculations,
      initialPaymentCalLoading,
      getValues,
      vehicles,
      vehicleLoading,
      setValue,
      insuranceCompanies,
      insuranceCompaniesLoading,
      projectCategories,
      projectCategoriesloading,
      isCalculating,
      editAbleForm,
      insurancePremiumFeesLoading,
      application_fields
    }),
    [
      control,
      handleSubmit,
      onSubmit,
      initialPaymentCalculations,
      initialPaymentCalLoading,
      getValues,
      vehicles,
      vehicleLoading,
      setValue,
      insuranceCompanies,
      insuranceCompaniesLoading,
      projectCategories,
      projectCategoriesloading,
      isCalculating,
      editAbleForm,
      insurancePremiumFeesLoading,
      application_fields
    ]
  );
};

export default useInitialPaymentCalForm;
