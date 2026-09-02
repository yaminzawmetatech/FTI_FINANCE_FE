import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  getProjectCategory,
  createProjectCategory,
  updateProjectCategory,
} from "features/projectcategory/projectcategorySlice";
import { showSuccessToast, showErrorToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";

const useProductCategoryForm = () => {
  const dispatch = useDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]);
  const { control, reset, handleSubmit, setValue } = useForm({});

  useEffect(() => {
    reset({
      ...editValues,
    });
  }, [reset, editValues]);

  const onSubmit = useCallback(
    async (body, editFlag) => {
      try {
        if (editFlag) {
          await dispatch(
            updateProjectCategory({ id: editValues?.uuid, newData: body })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Product Category")
          );
        } else {
          await dispatch(createProjectCategory({ ...body, is_loan_operation_skipped: body?.is_loan_operation_skipped ?? false })).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Product Category")
          );
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getProjectCategory());
      } catch (error) {
        console.error("Error", error);
      }
    },
    [dispatch, reset, editValues]
  );

  return useMemo(
    () => ({
      control,
      onSubmit,
      handleSubmit,
      createModalOpen,
      setCreateModalOpen: (value) => setCreateModalOpen(value),
      setEditValues: (value) => setEditValues(value),
      reset,
      setValue
    }),
    [
      control,
      onSubmit,
      handleSubmit,
      createModalOpen,
      setEditValues,
      editValues,
      reset,
      setValue
    ]
  );
};

export default useProductCategoryForm;
