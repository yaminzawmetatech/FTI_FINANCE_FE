import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getNRCStates,
  createNRCState,
  updateNRCState,
} from "features/nrc/NRCState/nrcStateSlice";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import {
  getNRCTownships,
  createNRCTownship,
  updateNRCTownship,
} from "features/nrc/NRCTownship/nrcTownshipSlice";

const useNRCTownshipForm = () => {
  const dispatch = useDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]); // row values to edit
  const [variationModalOpen, setVariationModalOpen] = useState(false);
  const [variationListModalOpen, setVariationListModalOpen] = useState(false);


  const { control, reset, handleSubmit, setValue } = useForm({});

  const { nrcTownships, isLoading, } = useSelector(
    (state) => state.nrcTownships
  );

  const { nrcStates, } =
    useSelector((state) => state.nrcStates);

  useEffect(() => {
    dispatch(getNRCStates());
    dispatch(getNRCTownships());
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
            updateNRCTownship({ id: editValues?.uuid, newData: body })
          ).unwrap();
          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "NRC Township")
          );
        } else {
          await dispatch(createNRCTownship({ ...body })).unwrap();
          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "NRC Township")
          );
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getNRCTownships());
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
      nrcTownships,
      setValue,
      createModalOpen,
      variationModalOpen,
      variationListModalOpen,
      setCreateModalOpen: (value) => setCreateModalOpen(value),
      setVariationModalOpen: (value) => setVariationModalOpen(value),
      setVariationListModalOpen: (value) => setVariationListModalOpen(value),
      setEditValues: (value) => setEditValues(value),
      reset,
    }),
    [
      control,
      handleSubmit,
      isLoading,
      onSubmit,
      nrcStates,
      nrcTownships,
      setValue,
      createModalOpen,
      variationModalOpen,
      setCreateModalOpen,
      setVariationModalOpen,
      variationListModalOpen,
      setVariationListModalOpen,
      reset,
      setEditValues,
      editValues,
    ]
  );
};

export default useNRCTownshipForm;
