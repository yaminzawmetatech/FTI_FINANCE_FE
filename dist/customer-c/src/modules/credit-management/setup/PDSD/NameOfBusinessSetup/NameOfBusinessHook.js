import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { createNameOfBusiness, getNameOfBusinesses, updateNameOfBusiness } from "modules/loan-operation/slices/nameOfBusinessSlice";

const useNameOfBusinessForm = () => {
  const dispatch = useDispatch();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const { control, reset, handleSubmit } = useForm({});

  const onSubmit = useCallback(
    async (body, editFlag) => {
      try {
        if (editFlag) {
          await dispatch(
            updateNameOfBusiness({ id: body?.uuid, newData: body })
          ).unwrap();
          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Name of Business")
          );
        } else {
          await dispatch(createNameOfBusiness({ ...body })).unwrap();
          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Name of Business")
          );
        }
        reset();
        setCreateModalOpen(false);
        await dispatch(
          getNameOfBusinesses({
            firstFetch: true,
          })
        );
      } catch (error) {
        console.error("Error", error);
      }
    },
    [dispatch, reset]
  );

  return useMemo(
    () => ({
      onSubmit,
      handleSubmit,
      control,
      createModalOpen,
      setCreateModalOpen: (value) => setCreateModalOpen(value),
      reset,
    }),
    [
      onSubmit,
      handleSubmit,
      control,
      createModalOpen,
      setCreateModalOpen,
      reset,
    ]
  );
};

export default useNameOfBusinessForm;
