import { useState, useEffect, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAddressStates } from "features/address/State/addressStateSlice";
import { getAddressDistricts } from "features/address/District/addressDistrictSlice";
import {
  getAddressTownships,
  updateAddressTownship,
  createAddressTownship,
} from "features/address/Township/addressTownshipSlice";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";

const AddressTownshipHook = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState({});
  const { control, reset, handleSubmit } = useForm({});
  const dispatch = useDispatch();

  const { addressStates } = useSelector((state) => state.addressStates);
  const { addressDistricts } = useSelector((state) => state.addressDistricts);
  const { addressTownships, isLoading } = useSelector(
    (state) => state.addressTownships
  );

  useEffect(() => {
    dispatch(getAddressStates());
    dispatch(getAddressDistricts());
    dispatch(getAddressTownships());
  }, [dispatch]);

  useEffect(() => {
    reset({
      ...editValues,
    });
  }, [editValues, reset]);

  const onSubmit = useCallback(
    async (body, editFlag) => {
      try {
        if (editFlag) {
          await dispatch(
            updateAddressTownship({ id: editValues?.uuid, newData: body })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Address Township")
          );
        } else {
          await dispatch(createAddressTownship({ ...body })).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Address Township")
          );
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getAddressTownships());
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
      addressStates,
      addressDistricts,
      addressTownships,
      createModalOpen,
      setCreateModalOpen,
      setEditValues,
      reset,
    }),
    [
      addressDistricts,
      addressStates,
      addressTownships,
      control,
      createModalOpen,
      handleSubmit,
      isLoading,
      onSubmit,
      reset,
    ]
  );
};

export default AddressTownshipHook;
