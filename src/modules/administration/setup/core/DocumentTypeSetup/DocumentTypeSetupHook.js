import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import {
  createDocumentType,
  getDocumentTypes,
  updatedocumentType,
} from "modules/administration/slices/documentTypeSlice";

const useDocumentTypeForm = () => {
  const dispatch = useDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]); // row values to edit

  const { control, reset, handleSubmit, setValue } = useForm({});

  const { documentTypes, isLoading } = useSelector(
    (state) => state.documentTypes
  );

  useEffect(() => {
    dispatch(getDocumentTypes());
  }, [dispatch]);

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
            updatedocumentType({ id: editValues?.uuid, newData: body })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Document Type")
          );
        } else {
          await dispatch(createDocumentType({ ...body })).unwrap();
          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Document Type")
          );
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getDocumentTypes());
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
      documentTypes,
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
      documentTypes,
      setValue,
      createModalOpen,
      setCreateModalOpen,
      reset,
      setEditValues,
      editValues,
    ]
  );
};

export default useDocumentTypeForm;
