import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import {
  getAccountCodes,
  createAccountCode,
  updateAccountCode,
} from "features/cashDepositSetup/AccountCode/accountCodeSlice";
import { getCategories } from "features/category/categorySlice";
import { getSubCategory } from "features/subcategory/subcategorySlice";
import { getBanks } from "features/bank/bankSlice";

const useAccountCodeForm = () => {
  const dispatch = useDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]); // row values to edit

  const { control, reset, handleSubmit, setValue } = useForm({});

  const { accountCodes, isLoading } = useSelector(
    (state) => state.accountCodes
  );
  const { projectCategories } = useSelector((state) => state.projectCategories);
  const { subCategories } = useSelector((state) => state.subCategories);
  const { banks } = useSelector((state) => state.banks);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubCategory());
    //dispatch(getAccountCodes());
    dispatch(getAccountCodes({params:{}}));
    dispatch(getBanks());
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
            updateAccountCode({ id: editValues?.uuid, data: body })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Account Code")
          );
        } else {
          await dispatch(createAccountCode({ ...body })).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Account Code")
          );
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getAccountCodes({params:{}}));;
      } catch (error) {
        console.error("Error", error);
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
      accountCodes,
      projectCategories,
      subCategories,
      banks,
      createModalOpen,
      setCreateModalOpen: (value) => setCreateModalOpen(value),
      setEditValues: (value) => setEditValues(value),
      reset,
      setValue,
    }),
    [
      control,
      handleSubmit,
      isLoading,
      onSubmit,
      accountCodes,
      projectCategories,
      banks,
      subCategories,
      createModalOpen,
      setCreateModalOpen,
      reset,
      setEditValues,
      setValue,
    ]
  );
};

export default useAccountCodeForm;
