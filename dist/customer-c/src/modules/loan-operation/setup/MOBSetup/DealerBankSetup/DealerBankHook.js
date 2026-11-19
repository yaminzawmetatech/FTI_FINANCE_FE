import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { createDealerBank, getDealerBanks, updateDealerBank } from "modules/loan-operation/slices/dealerBankSlice";

const useDealerBankForm = () => {
  const dispatch = useDispatch();
  const [openEditModal, setOpenEditModal] = useState(false);

  const { control, reset, handleSubmit, setValue } = useForm({});

  const [openBankAccountModal, setOpenBankAccountModal] = useState(false);

  const onSubmit = useCallback(
    async (body, editFlag) => {
      const createData = body.valueFields?.map((row) => ({
        ...row,
        dealer_contact_person_id: row.dealer_contact_person_id || "",
        dealer_id: row.dealer_id || "",
      }));
      try {
        if (editFlag) {
          await dispatch(
            updateDealerBank({ id: body?.uuid, newData: { ...body, in_active : body.in_active === true ? 1 : 0 } })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Dealer Bank")
          );
        } else {
          await dispatch(createDealerBank(createData)).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Dealer Bank")
          );
        }
        reset();
        setOpenEditModal(false);
        setOpenBankAccountModal(false);
        await dispatch(
          getDealerBanks({
            firstFetch: true,
          })
        );
      } catch (error) {
        console.error("Error", error);
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
      openBankAccountModal,
      setOpenBankAccountModal,
    }),
    [
      onSubmit,
      handleSubmit,
      control,
      openEditModal,
      setOpenEditModal,
      reset,
      setValue,
      openBankAccountModal,
      setOpenBankAccountModal,
    ]
  );
};

export default useDealerBankForm;
