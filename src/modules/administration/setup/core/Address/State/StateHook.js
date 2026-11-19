import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  getAddressStates,
  createAddressState,
  updateAddressState,
} from "modules/administration/slices/addressStateSlice";
import { showSuccessToast, showErrorToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";

const useStateForm = () => {
  const dispatch = useDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]);
  const { control, reset, handleSubmit } = useForm({});

  const { addressStates, isLoading, isError } = useSelector(
    (state) => state.addressStates
  );

  useEffect(() => {
    dispatch(getAddressStates());
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
            updateAddressState({ id: editValues?.uuid, newData: body })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Address State")
          );
        } else {
          await dispatch(createAddressState({ ...body })).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Address State")
          );
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getAddressStates());
      } catch (error) {
        console.error("Error", error);
      }
    },
    [dispatch, reset, editValues]
  );

  return useMemo(
    () => ({
      control,
      onSubmit,
      handleSubmit,
      addressStates,
      createModalOpen,
      setCreateModalOpen: (value) => setCreateModalOpen(value),
      setEditValues: (value) => setEditValues(value),
      editValues,
      isLoading,
      isError,
    }),
    [
      control,
      onSubmit,
      handleSubmit,
      addressStates,
      createModalOpen,
      editValues,
      isError,
      isLoading,
    ]
  );
};

export default useStateForm;
