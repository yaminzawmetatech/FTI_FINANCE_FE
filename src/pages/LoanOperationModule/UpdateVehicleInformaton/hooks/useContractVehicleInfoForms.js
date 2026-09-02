import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";

import {
  createVehicleInformation,
  getLatestVehicleInformation,
  updateVehicleInformation,
} from "features/vehicleInformation/vehicleInformationSlice";
import { getAllVehicles } from "features/vehicleSetup/vehicleSlice";
import { getCategories } from "features/category/categorySlice";
import { getSubCategory } from "features/subcategory/subcategorySlice";

const useVehicleInfoForm = (initialSearchData = []) => {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState(initialSearchData);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const searchAppId = useMemo(() => {
    const appIdItem = searchData.find(item => item.filtered_by === "application_id");
    return appIdItem?.value1 || null;
  }, [searchData]);

  const { latestVehicleInformation, isLoading } = useSelector(
    (state) => state.vehicleInformation
  );

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
    formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      application_id: searchAppId || null
    }
  });

  const selectedBrand = watch("brand_id");
  const selectedModel = watch("model_id");
  const selectedCategory = watch("category_id");
  const selectedSubcategory = watch("sub_category_id");
  const formApplicationId = watch("application_id");

  const selectedVehicleId = useMemo(() => {
    return vehicles.find(
      (v) => v.brand_id === selectedBrand &&
        v.model_id === selectedModel
    )?.id || null;
  }, [selectedBrand, selectedModel, vehicles]);

  // useEffect(() => {
  //   if (searchAppId && searchAppId !== formApplicationId) {
  //     reset({
  //       ...getValues(),
  //       application_id: searchAppId
  //     });
  //   }
  // }, [searchAppId, formApplicationId, reset, getValues]);

  useEffect(() => {
    if (searchAppId && searchAppId !== formApplicationId) {
      reset((formValues) => ({
        ...formValues,
        application_id: searchAppId,
      }));
    }
  }, [searchAppId, formApplicationId, reset]);


  useEffect(() => {
    dispatch(getAllVehicles({
      params: {
        brand_id: selectedBrand,
        category_id: latestVehicleInformation?.vehicle?.category_id || null,
        sub_category_id: latestVehicleInformation?.vehicle?.sub_category_id || null,
      }
    }));
    dispatch(getCategories());
    dispatch(getSubCategory());
  }, [uuid, dispatch, selectedBrand, latestVehicleInformation]);

  useEffect(() => {
    if (latestVehicleInformation) {
      reset({
        ...latestVehicleInformation,
        application_id: formApplicationId,
        initial_downpayment_id: latestVehicleInformation?.initial_downpayment_id ?? null,
        vehicle_color: latestVehicleInformation?.vehicle_color,
        division: latestVehicleInformation?.division ?? null,
        plate_no: latestVehicleInformation?.plate_no ?? null,
        chassis_no: latestVehicleInformation?.chassis_no ?? null,
        engine_no: latestVehicleInformation?.engine_no ?? null,
        engine_power: latestVehicleInformation?.engine_power ?? null,
        year_of_manufacture: latestVehicleInformation?.year_of_manufacture ?? null,
        manufacture: latestVehicleInformation?.manufacture ?? null,
        brand_id: latestVehicleInformation?.vehicle?.brand_id ?? null,
        model_id: latestVehicleInformation?.vehicle?.model_id ?? null,
        category_id: latestVehicleInformation?.vehicle?.category_id ?? null,
        sub_category_id: latestVehicleInformation?.vehicle?.sub_category_id ?? null,
        manufacturer: latestVehicleInformation?.manufacturer ?? null,
      });
    } else if (formApplicationId) {
      reset({
        application_id: formApplicationId
      });
    }
  }, [latestVehicleInformation, reset, formApplicationId]);

  useEffect(() => {
    if (formApplicationId) {
      dispatch(
        getLatestVehicleInformation({
          params: {
            generated_application_id: formApplicationId,
          },
        })
      );
    }
  }, [dispatch, formApplicationId, shouldRefresh]);

  const onSubmit = useCallback(
    async (formData) => {
      try {
        const payload = {
          vehicle_id: selectedVehicleId,
          application_id: latestVehicleInformation?.application_id || null,
          brand_id: formData.brand_id || null,
          model_id: formData.model_id || null,
          category_id: latestVehicleInformation?.vehicle?.category_id || null,
          sub_category_id: latestVehicleInformation?.vehicle?.sub_category_id || null,
          vehicle_color: formData.vehicle_color || null,
          year_of_manufacture: formData.year_of_manufacture || null,
          plate_no: formData.plate_no || null,
          chassis_no: formData.chassis_no || null,
          engine_no: formData.engine_no || null,
          engine_power: formData.engine_power || null,
          division: formData.division || null,
          manufacturer: formData.manufacturer || null,
        };

        if (latestVehicleInformation?.uuid) {
          await dispatch(updateVehicleInformation({
            data: payload,
            uuid: latestVehicleInformation.uuid
          })).unwrap();
          showSuccessToast(CommonMessage.MFS00009);
          setShouldRefresh(prev => !prev);
          setIsSuccess(true);
        } else {
          await dispatch(createVehicleInformation({ data: payload })).unwrap();
          showSuccessToast(CommonMessage.MFS00008);
          setIsSuccess(true);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("An error occurred during submission.");
      }
    },
    [dispatch, selectedVehicleId, latestVehicleInformation, formApplicationId]
  );

  return {
    isLoading: isLoading || isSubmitting,
    vehicleLoading,
    subcategoryLoading,
    categoryLoading,
    onSubmit,
    handleSubmit,
    control,
    getValues,
    setValue,
    vehicles,
    categories,
    subcategories,
    selectedVehicleId,
    formApplicationId,
    setSearchData,
    latestVehicleInformation,
    isSuccess,
    reset
  };
};

export default useVehicleInfoForm;