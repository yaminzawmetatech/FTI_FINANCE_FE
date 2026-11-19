import * as React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAddressStates } from "modules/administration/slices/addressStateSlice";
import {
  createAddressDistrict,
  getAddressDistricts,
  updateAddressDistrict,
} from "modules/administration/slices/addressDistrictSlice";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";

const useAddressDistrictForm = () => {
  const dispatch = useDispatch();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]); // row values to edit

  const { control, reset, handleSubmit } = useForm({});

  const { addressDistricts, isLoading } = useSelector(
    (state) => state.addressDistricts
  );

  const { addressStates } = useSelector((state) => state.addressStates);

  useEffect(() => {
    dispatch(getAddressStates());
    dispatch(getAddressDistricts());
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
            updateAddressDistrict({ id: editValues?.uuid, newData: body })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Address District")
          );
        } else {
          await dispatch(createAddressDistrict({ ...body })).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Address District")
          );
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getAddressDistricts());
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
      addressStates,
      addressDistricts,
      createModalOpen,
      setCreateModalOpen,
      setEditValues,
      reset,
    ]
  );
};

export default useAddressDistrictForm;
