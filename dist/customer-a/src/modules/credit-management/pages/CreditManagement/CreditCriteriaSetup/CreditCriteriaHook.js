import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import {
  createCreditCriteriaValue,
  getCreditCriteria,
  updateCreditCriteriaValue,
} from "modules/credit-management/slices/creditCriteriaSlice";

const useCreditCriteriaSetupForm = () => {
  const dispatch = useDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const { control, reset, handleSubmit, setValue } = useForm({});

  const onSubmit = useCallback(
    async (body, editFlag, is_new_version,valueFields) => {
      try {
        const data = {
          required_key_id: body?.required_key_id,
          value: editFlag? body?.value : valueFields.length>0 ? valueFields.map((field)=>field.value) : "",
          remark: body?.remark,
          start_date:
            (body?.version_start_date &&
              body?.version_start_date.format("YYYY-MM-DD")) ||
            null,
          end_date:
            (body?.version_end_date &&
              body?.version_end_date.format("YYYY-MM-DD")) ||
            null,
        };
        // edit value
        if (editFlag) {
          // new version add
          if (is_new_version) {
            const new_version_data = {
              uuid: body?.history_id ? body?.history_id : body?.value_id,
              required_key_id: body?.required_key_id,
              value: [body?.new_value],
              remark: body?.new_remark,
              start_date:
                (body?.new_version_start_date &&
                  body?.new_version_start_date.format("YYYY-MM-DD")) ||
                null,
              end_date:
                (body?.new_version_end_date &&
                  body?.new_version_end_date.format("YYYY-MM-DD")) ||
                null,
            };
            await dispatch(
              createCreditCriteriaValue({ ...new_version_data })
            ).unwrap();

            await dispatch(
              updateCreditCriteriaValue({ id: body?.id, newData: { ...data, is_history: 1 } })
            ).unwrap();

            showSuccessToast(
              CommonMessage.MFS00001.replace("%s", "Credit Criteria Value")
            );
          }
          // edit value only
          else {
            await dispatch(
              updateCreditCriteriaValue({ id: body?.id, newData: data })
            ).unwrap();

            showSuccessToast(
              CommonMessage.MFS00003.replace("%s", "Credit Criteria Value")
            );
          }
        } 
        // create new value
        else {
          await dispatch(createCreditCriteriaValue({ ...data })).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Credit Criteria Value")
          );
        }
        await dispatch(
          getCreditCriteria({
            firstFetch: true,
          })
        );
        reset();
        setCreateModalOpen(false);
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [dispatch, reset]
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
