import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import {
  getPrepareForContractByUuid,
  updatePrepareForContractByUuid,
} from "modules/loan-operation/slices/prepareForContractSlice";

const useContractForm = () => {
  const { uuid, mode } = useParams();

  const dispatch = useDispatch();

  const { control, reset, watch, handleSubmit } = useForm({
    defaultValues: {
      disabled: false,
    },
  });

  const { prepareForContracts, isLoading } = useSelector(
    (state) => state.prepareForContracts
  );

  const { isLoading: isSubmitting } = useSelector(
    (state) => state.prepareForContracts.updatePrepareForContractByUuid
  );

  useEffect(() => {
    dispatch(getPrepareForContractByUuid({ uuid }));
  }, [uuid, dispatch]);

  const editAbleForm = useMemo(() => {
    if (mode && mode === "view") {
      return false;
    } else {
      return true;
    }
  }, [mode]);

  useEffect(() => {
    reset({
      ...prepareForContracts.application,
      prorata_interest: prepareForContracts?.prorata_interest,
      net_disbursed_amount: prepareForContracts?.net_disbursed_amount,
      approved_amount: prepareForContracts?.application?.approved_amount,
      disbursed_date:
        prepareForContracts?.disbursed_date &&
        dayjs(prepareForContracts?.disbursed_date),
      first_due_date:
        prepareForContracts?.first_due_date &&
        dayjs(prepareForContracts?.first_due_date),
      commencement_date:
        prepareForContracts?.application?.commencement_date &&
        dayjs(prepareForContracts?.application?.commencement_date),
      applied_date:
        prepareForContracts?.application?.applied_date &&
        dayjs(prepareForContracts?.application?.applied_date),
      disabled: !editAbleForm,
      monthly_installment: prepareForContracts?.monthly_installment_amount,
    });
  }, [prepareForContracts, mode, reset, editAbleForm]);

  const onSubmit = useCallback(
    async (body) => {
      if (mode === "view") {
        window.close();
      } else {
        await dispatch(
          updatePrepareForContractByUuid({
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
      prepareForContracts,
      editAbleForm,
    }),
    [
      watch,
      control,
      handleSubmit,
      isLoading,
      isSubmitting,
      onSubmit,
      prepareForContracts,
      editAbleForm,
    ]
  );
};

export default useContractForm;
