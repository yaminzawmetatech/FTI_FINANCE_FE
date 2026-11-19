import { useCallback, useEffect, useMemo } from "react";
import { getContractByUuid } from "modules/loan-operation/slices/contractDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { updateGuarantorByUuid } from "modules/credit-management/slices/guarantorSlice";
import { useParams } from "react-router-dom";
import { updateContractByUuid } from "modules/loan-operation/slices/contractSlice";
import dayjs from "dayjs";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";

const useContractForm = () => {
  const { uuid, mode } = useParams();

  const dispatch = useDispatch();

  const { control, reset, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      disabled: false,
    },
  });

  const { contract, isLoading } = useSelector((state) => state.contractDetail);

  const { isLoading: isSubmitting } = useSelector(
    (state) => state.contracts.updateContractByUuid
  );

  useEffect(() => {
    dispatch(getContractByUuid({ uuid }));
  }, [uuid, dispatch]);

  const auth = useSelector((state) => state.auth.user);

  const editAbleForm = useMemo(() => {
    if ((mode && mode === "view") || !auth?.is_super) {
      return false;
    } else {
      return true;
    }
  }, [mode]);

  useEffect(() => {
    reset({
      ...contract,
      ...contract?.vehicle_informations,
      brand_id: contract?.vehicle_informations?.vehicle?.brand_info?.brand_name,
      model_id: contract?.vehicle_informations?.vehicle?.model_info?.model_name,
      total_amount:
        contract?.application?.application_info?.total_amount ?? null,
      cmco_name: contract?.cmco_name ?? "",
      disbursement_date:
        contract?.disbursement_date && dayjs(contract?.disbursement_date),
      first_due_date:
        contract?.first_due_date && dayjs(contract?.first_due_date),
      commencement_date:
        contract?.commencement_date && dayjs(contract?.commencement_date),
      commencement_date:
        contract?.commencement_date && dayjs(contract?.commencement_date),
      applied_date: contract?.applied_date && dayjs(contract?.applied_date),
      disabled: !editAbleForm,
    });
  }, [contract, mode, reset, editAbleForm]);

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
      contract,
      editAbleForm,
      setValue,
    }),
    [
      watch,
      control,
      handleSubmit,
      isLoading,
      isSubmitting,
      onSubmit,
      contract,
      editAbleForm,
      setValue,
    ]
  );
};

export default useContractForm;
