import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";

import {
  createVehicleInformation,
  getVehicleInformation,
  updateVehicleInformation,
} from "modules/loan-operation/slices/vehicleInformationSlice";
import { getApplicationByUuid } from "modules/credit-management/slices/applicationDetailSlice";
import { getSubCategory } from "modules/administration/slices/subcategorySlice"; // Import subcategory
import { getCategories } from "modules/administration/slices/categorySlice"; // Import category
import { getAllVehicles } from "modules/loan-operation/slices/vehicleSlice"; // Import vehicles

const useVehicleInfoForm = () => {
  const { uuid } = useParams();
  const dispatch = useDispatch();

  const { application } = useSelector((state) => state.applicationDetail ?? []);

  const { vehicleInformation, isLoading } = useSelector(
    (state) => state.vehicleInformation ?? []
  );
  const vehicleInformationData = vehicleInformation[0]

  const { vehicles, isLoading: vehicleLoading } = useSelector((state) => state.vehicles ?? []);
  const { subcategories, isLoading: subcategoryLoading } = useSelector((state) => state.subcategory ?? []);
  const { categories, isLoading: categoryLoading } = useSelector((state) => state.category ?? []);

  const {
    control,
    getValues,
    reset,
    watch,
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {},
  });

  const selectedBrand = watch("brand_id");
  const selectedModel = watch("model_id");
  const selectedCategory = watch("category_id");
  const selectedSubcategory = watch("sub_category_id");

  const selectedVehicleId = useMemo(() => {
    return vehicles.find(
      (v) => v.brand_id === selectedBrand && v.model_id === selectedModel && v.category_id === selectedCategory && v.sub_category_id === selectedSubcategory
    )?.id || null;
  }, [selectedBrand, selectedModel, vehicles, selectedCategory, selectedSubcategory]);

  useEffect(() => {
    dispatch(getApplicationByUuid({ uuid }));
    dispatch(getCategories());
    dispatch(getSubCategory());
    dispatch(getAllVehicles()); // Fetch all vehicles initially
  }, [uuid, dispatch]);

  useEffect(() => {

    if (vehicleInformation[0]) { // Ensure both are loaded
      reset({
        ...vehicleInformation[0],
        // application_id: vehicleInformation[0].application_id,
        application_id: application?.id,
        initial_downpayment_id: vehicleInformation[0]?.initial_downpayment_id ?? null,
        vehicle_color: vehicleInformation[0]?.vehicle_color,
        division: vehicleInformation[0]?.division ?? null,
        plate_no: vehicleInformation[0]?.plate_no ?? null,
        chassis_no: vehicleInformation[0]?.chassis_no ?? null,
        engine_no: vehicleInformation[0]?.engine_no ?? null,
        engine_power: vehicleInformation[0]?.engine_power ?? null,
        year_of_manufacture: vehicleInformation[0]?.year_of_manufacture ?? null,
        manufacturer: vehicleInformation[0]?.manufacturer ?? null,
        brand_id: vehicleInformation[0]?.vehicle?.brand_id ?? null,
        model_id: vehicleInformation[0]?.vehicle?.model_id ?? null,
        category_id: vehicleInformation[0]?.vehicle?.category_id ?? null,
        sub_category_id: vehicleInformation[0]?.vehicle?.sub_category_id ?? null,
      });
    }else{
      reset({
      application_id: application?.id
      })
    }
  }, [vehicleInformation[0], reset, application]);

  useEffect(() => {
    dispatch(
      getVehicleInformation({
        params: {
          application_id: application?.id,
          type: 'Add Vehicle'
        },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllVehicles({
      params: {
        category_id: selectedCategory,
        sub_category_id: selectedSubcategory,
        brand_id: selectedBrand,
      },
    }));
  }, [dispatch, selectedCategory, selectedSubcategory, selectedBrand]);

  useEffect(() => {
    if (!selectedCategory) {
      setValue("sub_category_id", "");
      setValue("model_id", "");
      setValue("brand_id", "");
    }
  }, [selectedCategory, setValue]);

  useEffect(() => {
    if (!selectedSubcategory) {
      setValue("model_id", "");
      setValue("brand_id", "");
    }
  }, [selectedSubcategory, setValue]);

  useEffect(() => {
    if (!selectedBrand) {
      setValue("model_id", "");
    }
  }, [selectedBrand, setValue]);


  const onSubmit = useCallback(
    async (body) => {

      try {
        if (vehicleInformation[0]?.uuid) {
          await dispatch(updateVehicleInformation({ data: body, uuid: vehicleInformation[0].uuid }));
          showSuccessToast(CommonMessage.MFS00009);
        } else {
          await dispatch(createVehicleInformation({ data: body }));
          showSuccessToast(CommonMessage.MFS00008);
        }

        setTimeout(() => {
          window.close();
        }, 5000);
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("An error occurred during submission.");
      }
    },
    [dispatch, vehicleInformation[0]?.uuid]
  );

  const memoizedValues = useMemo(() => ({
    isLoading,
    vehicleLoading,
    subcategoryLoading,
    categoryLoading,
    onSubmit,
    handleSubmit,
    control,
    getValues,
    setValue,
    vehicleInformation,
    application,
    vehicles,
    categories,
    subcategories,
    selectedVehicleId
  }), [isLoading, vehicleLoading, subcategoryLoading, categoryLoading, onSubmit, handleSubmit, control, getValues, setValue, vehicleInformation, application, vehicles, categories, subcategories, selectedVehicleId]);

  return memoizedValues;
};

export default useVehicleInfoForm;