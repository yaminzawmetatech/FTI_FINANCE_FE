import { useCallback, useEffect, useMemo } from "react";
import { getContractByUuid } from "features/contract/contractDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { updateGuarantorByUuid } from "features/guarantor/guarantorSlice";
import { useParams } from "react-router-dom";
import { updateContractByUuid } from "features/contract/contractSlice";
import dayjs from "dayjs";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { getWriteOffRecoveryIncomeByUuid } from "features/writeOffRecoveryIncome/writeOffRecoveryIncomeSlice";

const useContractForm = () => {

  const { uuid, mode } = useParams();

  const dispatch = useDispatch();

  const { control, reset, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      disabled: false,
    },
  });



  const { writeOffRecoveryIncomes, isLoading } = useSelector(
    (state) => state.writeOffRecoveryIncomes
  );

  const { isLoading: isSubmitting } = useSelector(
    (state) => state.contracts.updateContractByUuid
  );

  useEffect(() => {
    dispatch(getWriteOffRecoveryIncomeByUuid({ uuid }));
  }, [uuid, dispatch]);

  const editAbleForm = useMemo(() => {
    if (mode && mode === "view") {
      return false;
    }
    else {
      return true;
    }
  }, [mode]);

  useEffect(() => {
    reset({
      ...writeOffRecoveryIncomes,
      // brand_id: writeOffRecoveryIncomes?.contract?.vehicle_informations?.vehicle?.brand_info?.brand_name,
      // model_id: writeOffRecoveryIncomes?.contract?.vehicle_informations?.vehicle?.model_info?.model_name,
      // total_amount: writeOffRecoveryIncomes?.contract?.application?.application_info?.total_amount ?? null,
      // cmco_id: writeOffRecoveryIncomes?.contract?.application?.cmco_id ?? "",
      generated_application_id: writeOffRecoveryIncomes?.contract?.generated_application_id ?? "",
      category: writeOffRecoveryIncomes?.contract?.category ?? null,
      sub_category: writeOffRecoveryIncomes?.contract?.sub_category ?? null,
      sub_category_id: writeOffRecoveryIncomes?.contract?.sub_category_id ?? null,
      customer_id: writeOffRecoveryIncomes?.contract?.customer_id,
      customer_name: writeOffRecoveryIncomes?.contract?.customer_name,
      living_phone_number: writeOffRecoveryIncomes?.contract?.living_phone_number	,
      current_address: writeOffRecoveryIncomes?.contract?.current_address,
      loan_amount: writeOffRecoveryIncomes?.contract?.loan_amount,
      commencement_date: writeOffRecoveryIncomes?.contract?.commencement_date,
      monthly_installment_amount: writeOffRecoveryIncomes?.contract?.monthly_installment_amount,
      interest_rate: writeOffRecoveryIncomes?.contract?.interest_rate,
      write_off_date: writeOffRecoveryIncomes?.write_off_date && dayjs(writeOffRecoveryIncomes?.write_off_date),
      disbursement_date:
        writeOffRecoveryIncomes?.contract?.disbursement_date && dayjs(writeOffRecoveryIncomes?.contract?.disbursement_date),
      first_due_date:
        writeOffRecoveryIncomes?.contract?.first_due_date && dayjs(writeOffRecoveryIncomes?.contract?.first_due_date),
      commencement_date:
        writeOffRecoveryIncomes?.contract?.commencement_date && dayjs(writeOffRecoveryIncomes?.contract?.commencement_date),
      commencement_date:
        writeOffRecoveryIncomes?.contract?.commencement_date && dayjs(writeOffRecoveryIncomes?.contract?.commencement_date),
      applied_date:
        writeOffRecoveryIncomes?.contract?.applied_date && dayjs(writeOffRecoveryIncomes?.contract?.applied_date),
      nrc: writeOffRecoveryIncomes?.contract?.nrc_or_csc || "",
      gender: writeOffRecoveryIncomes?.contract?.application?.gender || "",
      date_of_birth: writeOffRecoveryIncomes?.contract?.application?.date_of_birth ? dayjs(writeOffRecoveryIncomes?.contract?.application?.date_of_birth) : null,
      disabled: !editAbleForm,
    });
  }, [writeOffRecoveryIncomes, mode, reset, editAbleForm]);

  const onSubmit = useCallback(
    async (body) => {

      if (mode === "view") {
        window.close();
      } else {
        await dispatch(
          updateContractByUuid({
            body: {
              ...body,
              dob:
                (body?.dob && body?.dob.format("YYYY-MM-DD HH:mm:ss")) || null,
            },
          })
        ).unwrap();
        showSuccessToast(CommonMessage.MFS00008);
        setTimeout(() => {
          window.close();
        }, 5000);
      }
    },
    [dispatch]
  );

  return useMemo(
    () => ({
      watch,
      isLoading,
      isSubmitting,
      onSubmit,
      handleSubmit,
      control,
      writeOffRecoveryIncomes,
      editAbleForm,
      setValue
    }),
    [
      watch,
      control,
      handleSubmit,
      isLoading,
      isSubmitting,
      onSubmit,
      writeOffRecoveryIncomes,
      editAbleForm,
      setValue
    ]
  );

}

export default useContractForm;