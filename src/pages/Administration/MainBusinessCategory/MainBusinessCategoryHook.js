import { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import {
  createMainBusinessCategory,
  getMainBusinessCategories,
  updateMainBusinessCategory,
} from "features/mainbusinesscategory/mainbusinesscategorySlice";

const useMainBusinessCategoryForm = () => {
  const dispatch = useDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]);
  const { control, reset, handleSubmit } = useForm({});

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
            updateMainBusinessCategory({ id: editValues?.uuid, newData: body })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Main Business Category")
          );
        } else {
          await dispatch(createMainBusinessCategory({ ...body })).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Main Business Category")
          );
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getMainBusinessCategories());
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
      editValues,
    }),
    [
      control,
      onSubmit,
      handleSubmit,
      createModalOpen,
      editValues,
    ]
  );
};

export default useMainBusinessCategoryForm;
