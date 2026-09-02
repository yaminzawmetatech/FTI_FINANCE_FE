import { useState, useEffect, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import {
  createCollectionFees,
  getCollectionFees,
  getCollectionFeesPercentageTypes,
  updateCollectionFees,
} from "features/collectionFeesSetup/collectionFeesSetupSlice";
import dayjs from "dayjs";
import { getProjectCategory } from "features/projectcategory/projectcategorySlice";
import { getSubCategory } from "features/subcategory/subcategorySlice";

const useCollectionFeesSetupForm = () => {
  const dispatch = useDispatch();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]); // row values to edit

  const { control, reset, handleSubmit, setValue } = useForm({});

  const { collectionFees, isLoading } = useSelector(
    (state) => state.collectionFees
  );

  useEffect(() => {
    dispatch(getCollectionFees());
    dispatch(getProjectCategory());
    dispatch(getSubCategory());
    dispatch(getCollectionFeesPercentageTypes());
  }, [dispatch]);

  useEffect(() => {
    reset({
      ...editValues,
      version_start_date:
        editValues?.version_start_date && dayjs(editValues?.version_start_date),
    });
  }, [reset, editValues]);

  const removeFields = (data, fieldsToRemove) => {
    const result = { ...data };
    fieldsToRemove.forEach(field => delete result[field]);
    return result;
  };
  

  const onSubmit = useCallback(
    async (body, editFlag) => {

      const cleanedData = removeFields(body, [
        "created_by",
        "modified_by",
        "created_at",
        "last_modified",
      ]);

      try {
        const currentDate = dayjs(Date.now());
        if (editFlag) {
          await dispatch(
            updateCollectionFees({
              id: body?.uuid,
              newData: {
                ...cleanedData,
                sub_category_id: cleanedData?.sub_category_id ?? null,
                version_start_date: cleanedData?.version_start_date?.format?.("YYYY-MM-DD hh:mm:ss") ?? null,
                version_end_date: currentDate.format("YYYY-MM-DD hh:mm:ss"),
                collection_fee_percentage: cleanedData?.collection_fee_percentage || 0,
                collection_fee_fixed_amount: cleanedData?.collection_fee_fixed_amount || 0,
                collection_fee_max_days: cleanedData?.collection_fee_max_days || 0,
                collection_fee_max_amount: cleanedData?.collection_fee_max_amount || 0,
              },
            })
          ).unwrap();
  
          showSuccessToast(CommonMessage.MFS00003.replace("%s", "Collection Fees Setup"));
        } else {
          await dispatch(
            createCollectionFees({
              ...cleanedData,
              version_start_date: cleanedData?.version_start_date?.format?.("YYYY-MM-DD hh:mm:ss") ?? null,
              collection_fee_percentage: cleanedData?.collection_fee_percentage || 0,
              collection_fee_fixed_amount: cleanedData?.collection_fee_fixed_amount || 0,
              collection_fee_max_days: cleanedData?.collection_fee_max_days || 0,
              collection_fee_max_amount: cleanedData?.collection_fee_max_amount || 0,
            })
          ).unwrap();
          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Collection Fees Setup")
          );
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getCollectionFees());
      } catch (error) {
        console.error("Error", error);
      }
    },
    [dispatch, editValues, reset]
  );

  return useMemo(
    () => ({
      isLoading,
      onSubmit,
      handleSubmit,
      control,
      collectionFees,
      createModalOpen,
      setCreateModalOpen: (value) => setCreateModalOpen(value),
      setEditValues: (value) => setEditValues(value),
      reset,
      setValue,
    }),
    [
      isLoading,
      onSubmit,
      handleSubmit,
      control,
      collectionFees,
      createModalOpen,
      setCreateModalOpen,
      setEditValues,
      reset,
      setValue,
    ]
  );
};

export default useCollectionFeesSetupForm;
