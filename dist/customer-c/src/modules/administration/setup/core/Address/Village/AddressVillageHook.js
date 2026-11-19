import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  createAddressVillage,
  getAddressVillageList,
  updateAddressVillage,
} from "modules/administration/slices/addressVillageSlice";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";

const useAddressVillageTractForm = () => {
  const dispatch = useDispatch();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const { control, reset, handleSubmit } = useForm({});

  const onSubmit = useCallback(
    async (body, editFlag) => {
      try {
        if (editFlag) {
          await dispatch(
            updateAddressVillage({ id: body?.uuid, newData: body })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Address Village")
          );
        } else {
          await dispatch(createAddressVillage({ ...body })).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Address Village")
          );
        }
        reset();
        setCreateModalOpen(false);
        await dispatch(
          getAddressVillageList({
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

export default useAddressVillageTractForm;
