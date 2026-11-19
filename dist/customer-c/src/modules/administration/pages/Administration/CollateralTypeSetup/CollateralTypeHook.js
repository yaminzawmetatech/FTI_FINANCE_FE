import { useState, useMemo, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { createCollateralType, updateCollateralType, getAllCollateralTypes } from "modules/loan-operation/slices/collateralTypesSetupSlice";

const useCollateralTypeForm = () => {
  const dispatch = useDispatch();
  const [openEditModal, setOpenEditModal] = useState(false);

  const { control, reset, handleSubmit, setValue } = useForm({});

  const onSubmit = useCallback(
    async (body, editFlag) => {
      try {
        if (editFlag) {
          await dispatch(
            updateCollateralType({
              uuid: body?.uuid,
              data: body,
            })
          ).unwrap();
          showSuccessToast(CommonMessage.MFS00003.replace("%s", "Collateral Type"));
        } else {
          await dispatch(createCollateralType({ data: body })).unwrap();
          showSuccessToast(CommonMessage.MFS00001.replace("%s", "Collateral Type"));
        }
        reset();
        setOpenEditModal(false);
        await dispatch(
          getAllCollateralTypes({
            firstFetch: true,
          })
        );
        return true;
      } catch (error) {
        console.error("Error", error);
        showErrorToast(error.message || "An error occurred"); // Add error toast
        return false;
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
    [
      onSubmit,
      handleSubmit,
      control,
      openEditModal,
      setOpenEditModal,
      reset,
      setValue,
    ]
  );
};

export default useCollateralTypeForm;
