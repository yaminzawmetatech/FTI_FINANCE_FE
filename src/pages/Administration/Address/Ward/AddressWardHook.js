import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  createAddressWard,
  getAddressWardList,
  updateAddressWard,
} from "features/address/Ward/addressWardSlice";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";

const useAddressWardForm = () => {
  const dispatch = useDispatch();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const { control, reset, handleSubmit } = useForm({});

  const onSubmit = useCallback(
    async (body, editFlag) => {
      try {
        if (editFlag) {
          await dispatch(
            updateAddressWard({ id: body?.uuid, newData: body })
          ).unwrap();
          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Address Ward")
          );
        } else {
          await dispatch(createAddressWard({ ...body })).unwrap();
          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Address Ward")
          );
        }
        reset();
        setCreateModalOpen(false);
        await dispatch(
          getAddressWardList({
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

export default useAddressWardForm;
