import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createContractAggrementSetup,
  getContractTemplateParameters,
  updateAContractAggrementSetupByUuid,
} from "modules/loan-operation/slices/contractAggrementSetupSlice";
import { getProjectCategory } from "modules/administration/slices/projectcategorySlice";
import { getSubCategory } from "modules/administration/slices/subcategorySlice";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";

const useContractAggrementSetupForm = () => {
  const { uuid, mode } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContractTemplateParameters());
    dispatch(getProjectCategory());
    dispatch(getSubCategory());
  }, [dispatch]);

  const { projectCategories, isLoading } = useSelector(
    (state) => state.projectCategories
  );

  const { subCategories } = useSelector((state) => state.subCategories);

  const { templateParameters } = useSelector(
    (state) => state.contractAgreementSetup
  );

  const { contractAgreementSetup } = useSelector(
    (state) => state.contractAgreementSetup.contractAgreementSetupDetail
  );

  const { control, reset, watch, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      disabled: false,
    },
  });

  useEffect(() => {
    reset({
      ...contractAgreementSetup,
      disabled: mode && mode === "ViewContractAgreementSetup",
    });
  }, [contractAgreementSetup, reset]);

  const onSubmit = useCallback(
    async (body) => {
      try {
        if (mode === "EditContractAgreementSetup" && uuid) {
          await dispatch(
            updateAContractAggrementSetupByUuid({
              id: uuid,
              body: {
                ...body,
              },
            })
          ).unwrap();
          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Contract Agreement Template")
          );
          setTimeout(() => {
            window.close();
          }, 5000);
        } else if (mode === "CreateContractAgreementSetup") {
          await dispatch(
            createContractAggrementSetup({
              body: {
                ...body,
              },
            })
          ).unwrap();
          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Contract Agreement Template")
          );
          setTimeout(() => {
            window.close();
          }, 5000);
        } else if (mode === "ViewContractAgreementSetup") {
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

export default useContractAggrementSetupForm;
