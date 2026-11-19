import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getNRCStates,
  createNRCState,
  updateNRCState,
} from "modules/administration/slices/nrcStateSlice";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";

const useNRCStateForm = () => {
  const dispatch = useDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]); // row values to edit

  const { control, reset, watch, handleSubmit, setValue } = useForm({});

  const { nrcStates, isLoading, isError } = useSelector(
    (state) => state.nrcStates
  );

  useEffect(() => {
    dispatch(getNRCStates());
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
            updateNRCState({ id: editValues?.uuid, newData: body })
          ).unwrap();
          showSuccessToast(CommonMessage.MFS00003.replace("%s", "NRC State"));
        } else {
          await dispatch(createNRCState({ ...body })).unwrap();
          showSuccessToast(CommonMessage.MFS00001.replace("%s", "NRC State"));
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getNRCStates());
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
      nrcStates,
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
      nrcStates,
      setValue,
      createModalOpen,
      setCreateModalOpen,
      reset,
      setEditValues,
      editValues,
    ]
  );
};

export default useNRCStateForm;
