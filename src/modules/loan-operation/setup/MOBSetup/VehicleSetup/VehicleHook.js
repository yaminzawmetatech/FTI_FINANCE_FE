import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { createVehicle, getVehicles, updateVehicle } from "modules/loan-operation/slices/vehicleSlice";

const useVehicleForm = () => {
  const dispatch = useDispatch();
  const [openEditModal, setOpenEditModal] = useState(false);
  const { control, reset, handleSubmit, setValue } = useForm({});

  const onSubmit = useCallback(
    async (body, editFlag) => {
      // Prepare payload: include all fields, even if null; exclude only undefined
      const payload = Object.keys(body).reduce((acc, key) => {
        if (body[key] !== undefined) {
          acc[key] = body[key]; // include null values
        }
        return acc;
      }, {});

      try {
        if (editFlag) {
          await dispatch(
            updateVehicle({
              data: payload,
              uuid: body?.uuid,
            })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00003.replace("%s", "Vehicle"));
        } else {
          await dispatch(createVehicle({ data: payload })).unwrap();

          showSuccessToast(CommonMessage.MFS00001.replace("%s", "Vehicle"));
        }

        // Reset form and close modal
        reset();
        setOpenEditModal(false);

        // Refresh vehicle list
        await dispatch(
          getVehicles({
            firstFetch: true,
          })
        );

        return true;
      } catch (error) {
        console.error("Error submitting vehicle form:", error);
      }
    },
    [dispatch, reset]
  );

  return useMemo(
    () => ({
      onSubmit,
      handleSubmit,
      control,
      openEditModal,
      setOpenEditModal: (value) => setOpenEditModal(value),
      reset,
      setValue,
    }),
    [onSubmit, handleSubmit, control, openEditModal, setOpenEditModal, reset, setValue]
  );
};

export default useVehicleForm;
