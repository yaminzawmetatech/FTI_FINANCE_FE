import { useState, useEffect, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAddressTownships } from "modules/administration/slices/addressTownshipSlice";
import {
  createAddressVillageTract,
  getAddressVillageTractList,
  getAddressVillageTracts,
  updateAddressVillageTract,
} from "modules/administration/slices/addressVillageTractSlice";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";

const useAddressVillageTractForm = () => {
  const dispatch = useDispatch();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const { control, reset, handleSubmit } = useForm({});

  const { addressVillageTracts, isLoading } = useSelector(
    (state) => state.addressVillageTracts
  );

  const onSubmit = useCallback(
    async (body, editFlag) => {
      try {
        if (editFlag) {
          await dispatch(
            updateAddressVillageTract({ id: body?.uuid, newData: body })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Address Village Tract")
          );
        } else {
          await dispatch(createAddressVillageTract({ ...body })).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Address Village Tract")
          );
        }
        reset();
        setCreateModalOpen(false);
        await dispatch(getAddressVillageTractList({
          firstFetch: true,
        }));
      } catch (error) {
        console.error("Error", error);
      }
    },
    [dispatch, reset]
  );
  return useMemo(
    () => ({
      isLoading,
      onSubmit,
      handleSubmit,
      control,
      createModalOpen,
      setCreateModalOpen: (value) => setCreateModalOpen(value),
      reset,
    }),
    [
      isLoading,
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
