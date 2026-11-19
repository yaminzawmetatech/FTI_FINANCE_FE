import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { getBanks, createBank, updateBank } from "modules/administration/slices/bankSlice";

const useBankForm = () => {
  const dispatch = useDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]); // row values to edit

  const { control, reset, handleSubmit, setValue } = useForm({});

  const { banks, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.banks
  );

  useEffect(() => {
    dispatch(getBanks());
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
            updateBank({ id: editValues?.uuid, newData: body })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00003.replace("%s", "Bank"));
        } else {
          await dispatch(createBank({ ...body })).unwrap();

          showSuccessToast(CommonMessage.MFS00001.replace("%s", "Bank"));
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getBanks());
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
      banks,
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
      banks,
      setValue,
      createModalOpen,
      setCreateModalOpen,
      reset,
      setEditValues,
      editValues,
    ]
  );
};

export default useBankForm;
