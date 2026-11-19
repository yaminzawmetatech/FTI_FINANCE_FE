import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getBillingDates,
  updateBillingDate,
  createBillingDate,
} from "modules/loan-operation/slices/billingDateSlice";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import dayjs from "dayjs";

const useBillingDateForm = () => {
  const dispatch = useDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]); // row values to edit

  const { control, reset, handleSubmit, setValue } = useForm({});

  const { billingDates, isLoading } = useSelector(
    (state) => state.billingDates
  );

  useEffect(() => {
    dispatch(getBillingDates());
  }, [dispatch]);

  useEffect(() => {
    reset({
      ...editValues,
      version_start_date:
        editValues?.version_start_date && dayjs(editValues?.version_start_date),
      version_end_date:
        editValues?.version_end_date && dayjs(editValues?.version_end_date),
    });
  }, [reset, editValues]);

  const onSubmit = useCallback(
    async (body, editFlag) => {
      try {
        if (editFlag) {
          await dispatch(
            updateBillingDate({
              id: editValues?.uuid,
              newData: {
                ...body,
                version_start_date:
                  (body?.version_start_date &&
                    body?.version_start_date.format("YYYY-MM-DD")) ||
                  null,
                version_end_date:
                  (body?.version_end_date &&
                    body?.version_end_date.format("YYYY-MM-DD")) ||
                  null,
              },
            })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Billing Date")
          );
        } else {
          await dispatch(
            createBillingDate({
              ...body,
              version_start_date:
                (body?.version_start_date &&
                  body?.version_start_date.format("YYYY-MM-DD")) ||
                null,
              version_end_date:
                (body?.version_end_date &&
                  body?.version_end_date.format("YYYY-MM-DD")) ||
                null,
            })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Billing Date")
          );
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getBillingDates());
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [dispatch, reset, editValues]
  );

  return useMemo(
    () => ({
      isLoading,
      onSubmit,
      handleSubmit,
      control,
      billingDates,
      setValue,
      createModalOpen,
      setCreateModalOpen: (value) => setCreateModalOpen(value),
      setEditValues: (value) => setEditValues(value),
      reset,
    }),
    [
      control,
      handleSubmit,
      isLoading,
      onSubmit,
      billingDates,
      setValue,
      createModalOpen,
      setCreateModalOpen,
      reset,
      setEditValues,
      editValues,
    ]
  );
};

export default useBillingDateForm;
