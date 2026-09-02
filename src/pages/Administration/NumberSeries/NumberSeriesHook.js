import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import {
  createNumberSeries,
  getNumberSeries,
  updateNumberSeries,
} from "features/numberSeries/numberSeriesSlice";

const useNumberSeriesForm = () => {
  const dispatch = useDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]);

  const { control, reset, handleSubmit } = useForm({});

  const { numberSeries, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.numberSeries
  );

  useEffect(() => {
    dispatch(getNumberSeries());
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
            updateNumberSeries({ id: editValues?.uuid, newData: body })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Number Series")
          );
        } else {
          await dispatch(createNumberSeries({ ...body })).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Number Series")
          );
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getNumberSeries());
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
      numberSeries,
      createModalOpen,
      setCreateModalOpen: (value) => setCreateModalOpen(value),
      setEditValues: (value) => setEditValues(value),
      editValues,
      isLoading,
      isError,
      reset,
    }),
    [
      control,
      onSubmit,
      handleSubmit,
      numberSeries,
      createModalOpen,
      editValues,
      isError,
      isLoading,
      reset,
    ]
  );
};

export default useNumberSeriesForm;
