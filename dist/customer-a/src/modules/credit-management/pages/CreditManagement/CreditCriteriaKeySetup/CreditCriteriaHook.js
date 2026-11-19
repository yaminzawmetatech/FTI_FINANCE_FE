import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { createCreditCriteriaKey, getCreditCriteria, updateCreditCriteria } from "modules/credit-management/slices/creditCriteriaSlice";

const useCreditCriteriaSetupForm = () => {
  const dispatch = useDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const { control, reset, handleSubmit, setValue, watch } = useForm({});

  const is_existing = watch("is_existing");

  const onSubmit = useCallback(
    async (body, editFlag) => {
      try {
        if (editFlag) {
          const data = {
            category_id: body?.category_id,
            sub_category_id: body?.sub_category_id,
            parent_id:	body?.parent_id,
            required_category:	body?.required_category,
            type: body?.type
          }
          await dispatch(
            updateCreditCriteria({ id: body?.uuid, newData: data })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00003.replace("%s", "Credit Criteria Key"));
        } else {
         
          await dispatch(createCreditCriteriaKey({ ...body })).unwrap();

          showSuccessToast(CommonMessage.MFS00001.replace("%s", "Credit Criteria key"));
        }
        reset();
        setCreateModalOpen(false);
        await dispatch(getCreditCriteria({
          firstFetch: true,
        }));
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [dispatch, reset,is_existing]
  );

  return useMemo(
    () => ({
      onSubmit,
      handleSubmit,
      control,
      setValue,
      createModalOpen,
      setCreateModalOpen: (value) => setCreateModalOpen(value),
      reset,
    }),
    [
      control,
      handleSubmit,
      onSubmit,
      setValue,
      createModalOpen,
      setCreateModalOpen,
      reset,
    ]
  );
};

export default useCreditCriteriaSetupForm;
