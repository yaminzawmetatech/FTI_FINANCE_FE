import { useState, useEffect, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAddressTownships } from "modules/administration/slices/addressTownshipSlice";
import {
  createAddressCity,
  getAddressCities,
  updateAddressCity,
} from "modules/administration/slices/addressCitySlice";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";

const useAddressDistrictForm = () => {
  const dispatch = useDispatch();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]); // row values to edit

  const { control, reset, handleSubmit } = useForm({});

  const { addressCities, isLoading } = useSelector(
    (state) => state.addressCities
  );

  const { addressTownships } = useSelector((state) => state.addressTownships);

  useEffect(() => {
    dispatch(getAddressTownships());
    dispatch(getAddressCities());
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
            updateAddressCity({ id: editValues?.uuid, newData: body })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Address City")
          );
        } else {
          await dispatch(createAddressCity({ ...body })).unwrap();
          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Address City")
          );
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getAddressCities());
      } catch (error) {
        console.error("Error", error);
      }
    },
    [dispatch, editValues, reset]
  );
  return useMemo(
    () => ({
      isLoading,
      onSubmit,
      handleSubmit,
      control,
      addressCities,
      addressTownships,
      createModalOpen,
      setCreateModalOpen: (value) => setCreateModalOpen(value),
      setEditValues: (value) => setEditValues(value),
      reset,
    }),
    [
      isLoading,
      onSubmit,
      handleSubmit,
      control,
      addressCities,
      addressTownships,
      createModalOpen,
      setCreateModalOpen,
      setEditValues,
      reset,
    ]
  );
};

export default useAddressDistrictForm;
