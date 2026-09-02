import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createDemandLetterSetup,
  getDemandLetterTemplateParameters,
  updateDemandLetterSetupByUuid,
} from "features/demandLetterSetup/demandLetterSetupSlice";
import { getProjectCategory } from "features/projectcategory/projectcategorySlice";
import { getSubCategory } from "features/subcategory/subcategorySlice";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";

const useDemandLetterSetupForm = () => {
  const { uuid, mode } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDemandLetterTemplateParameters());
    dispatch(getProjectCategory());
    dispatch(getSubCategory());
  }, [dispatch]);

  const { projectCategories, isLoading } = useSelector(
    (state) => state.projectCategories
  );

  const { subCategories } = useSelector((state) => state.subCategories);

  const { templateParameters } = useSelector(
    (state) => state.demandLetterSetup
  );

  const { demandLetterSetup } = useSelector(
    (state) => state.demandLetterSetup.demandLetterSetupDetail
  );

  const { control, reset, watch, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      disabled: false,
    },
  });

  useEffect(() => {
    reset({
      ...demandLetterSetup,
      disabled: mode && mode === "view",
    });
  }, [demandLetterSetup, reset]);

  const onSubmit = useCallback(
    async (body) => {
      try {
        if (mode === "edit" && uuid) {
          await dispatch(
            updateDemandLetterSetupByUuid({
              id: uuid,
              body: {
                ...body,
              },
            })
          ).unwrap();
          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Demand Letter Template")
          );
        } else if (mode === "create") {
          await dispatch(
            createDemandLetterSetup({
              body: {
                ...body,
              },
            })
          ).unwrap();
          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Demand Letter Template")
          );
        } else if (mode === "view") {
          window.close();
        }
      } catch (error) {
        console.error("Error:", error);
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
      setValue,
      projectCategories,
      subCategories,
      templateParameters,
      getValues,
    }),
    [
      control,
      handleSubmit,
      isLoading,
      onSubmit,
      setValue,
      projectCategories,
      subCategories,
      templateParameters,
      getValues,
    ]
  );
};

export default useDemandLetterSetupForm;
