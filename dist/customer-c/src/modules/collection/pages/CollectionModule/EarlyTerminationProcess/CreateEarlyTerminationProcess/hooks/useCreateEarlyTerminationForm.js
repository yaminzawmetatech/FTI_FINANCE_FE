import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { showSuccessToast } from "common/ToastMessage";
import {
  changeStatusEarlyTerminationProcess,
  createEarlyTerminationProcess,
  getEarlyTerminationProcessByUuid,
  updateEarlyTerminationProcess,
} from "modules/collection/slices/earlyTerminationProcessSlice";
import CommonMessage from "common/CommonMessage";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const useCreateEarlyTerminationProcessForm = () => {
  const { uuid, mode, route } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [isShowToolbar, setIsShowToolBar] = useState(true);
  const [isShowRemove, setIsShowRemove] = useState(false);

  const { control, reset, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      disabled: false,
    },
  });

  const { earlyTerminationProcesses, isLoading: isSubmitting } = useSelector(
    (state) => state.earlyTerminationProcesses
  );

  const { earlyTerminationInfo, isLoading: isEarlyTerminationInfo } =
    useSelector((state) => state.earlyTerminationInfo);

  useEffect(() => {
    if (mode === "view" || mode === "edit") {
      dispatch(getEarlyTerminationProcessByUuid({ uuid: uuid }));
    }
  }, [mode, uuid, dispatch]);

  const editAbleForm = useMemo(() => {
    if (mode && mode === "view") {
      return false;
    } else if (
      earlyTerminationProcesses?.status === "Approved" ||
      earlyTerminationProcesses?.status === "Rejected"
    ) {
      return false;
    } else {
      return true;
    }
  }, [mode, route, earlyTerminationProcesses]);

  useEffect(() => {
    const contract =
      earlyTerminationProcesses?.contract ||
      earlyTerminationInfo?.contract ||
      {};
    const vehicleInfo = contract?.vehicle_informations?.vehicle || {};
    const brand = vehicleInfo?.brand_info?.brand_name || "";
    const model = vehicleInfo?.model_info?.model_name || "";
    const plate_no = contract?.vehicle_informations?.plate_no || "";
    const application_id = contract?.generated_application_id || "";

    const getDate = (field) => {
      if (
        field === "commencement_date" &&
        (mode === "edit" || mode === "view")
      ) {
        return contract?.commencement_date
          ? dayjs(contract?.commencement_date)
          : null;
      }
      const infoDate = earlyTerminationInfo?.[field];
      const processDate = earlyTerminationProcesses?.[field];
      return infoDate
        ? dayjs(infoDate)
        : processDate
        ? dayjs(processDate)
        : null;
    };

    // Compute and round outstanding total amount
    const rawOutstanding =
      earlyTerminationInfo?.outstanding_ttl_amount ??
      earlyTerminationProcesses?.outstanding_ttl_amount;
    const outstanding_ttl_amount = Math.round(parseFloat(rawOutstanding) || 0);

    const rawOutstandingMiAmt =
      earlyTerminationInfo?.outstanding_mi_amount ??
      earlyTerminationProcesses?.outstanding_mi_Amount;
    const outstanding_mi_amount = rawOutstandingMiAmt;

    reset({
      ...earlyTerminationProcesses,
      ...earlyTerminationInfo,
      ...contract,
      name: earlyTerminationProcesses?.name ?? contract?.customer_name,
      nrc: earlyTerminationProcesses?.nrc ?? contract?.nrc_or_csc,
      outstanding_ttl_amount,
      outstanding_mi_amount,
      application_id,
      brand,
      model,
      plate_no,
      commencement_date: getDate("commencement_date"),
      due_date: getDate("due_date"),
      promise_date: getDate("promise_date"),
      customer_inform_date: getDate("customer_inform_date"),
      disabled: !editAbleForm,
    });
  }, [
    earlyTerminationProcesses,
    earlyTerminationInfo,
    mode,
    reset,
    editAbleForm,
  ]);

  const collected_collection_fee = watch("collected_collection_fee");
  const penalty_fee = watch("penalty_fee");

  useEffect(() => {
    if (parseFloat(collected_collection_fee) > 0) {
      const fee = parseFloat(collected_collection_fee) || 0;
      const outstanding =
        parseFloat(
          earlyTerminationInfo?.outstanding_without_penalty ??
            earlyTerminationProcesses?.outstanding_without_penalty
        ) || 0;
      const total = Math.round(outstanding + fee);
      setValue("outstanding_ttl_amount", total);
    } else if (parseFloat(collected_collection_fee) === 0) {
      const outstanding =
        parseFloat(
          earlyTerminationInfo?.outstanding_without_penalty ??
            earlyTerminationProcesses?.outstanding_without_penalty
        ) || 0;
      const total = Math.round(outstanding + 0);
      setValue("outstanding_ttl_amount", total);
    } else if (!collected_collection_fee) {
      const outstanding =
        parseFloat(
          earlyTerminationInfo?.outstanding_without_penalty ??
            earlyTerminationProcesses?.outstanding_without_penalty
        ) || 0;
      const total = Math.round(outstanding + parseFloat(penalty_fee));
      setValue("outstanding_ttl_amount", total);
    }
  }, [
    collected_collection_fee,
    earlyTerminationProcesses,
    earlyTerminationInfo,
    penalty_fee,
  ]);
  const onSubmit = useCallback(
    () => async (body) => {
      try {
        const formatDate = (date) => (date ? date.format("YYYY-MM-DD") : null);

        const isEdit = mode === "edit";

        const application_id = isEdit
          ? earlyTerminationProcesses?.contract?.application_id
          : earlyTerminationInfo?.contract?.application_id;
        const contract_id = isEdit
          ? earlyTerminationProcesses?.contract?.id
          : earlyTerminationInfo?.contract?.id;

        const formattedBody = {
          ...body,
          application_id,
          contract_id,
          commencement_date: formatDate(body?.commencement_date),
          due_date: formatDate(body?.due_date),
          promise_date: formatDate(body?.promise_date),
          customer_inform_date: formatDate(body?.customer_inform_date),
        };

        if (isEdit) {
          await dispatch(
            updateEarlyTerminationProcess({
              body: formattedBody,
              uuid: earlyTerminationProcesses?.uuid,
            })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00008);
        } else {
          let response = await dispatch(
            createEarlyTerminationProcess({
              body: formattedBody,
            })
          ).unwrap();

          // showSuccessToast(CommonMessage.MFS00007);
          navigate(
            `/collection-module/early-termination-process/${response?.data?.uuid}/edit`
          );
          // window.location.reload(true);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [dispatch, mode, earlyTerminationProcesses, earlyTerminationInfo]
  );

  const handleChangeStatus = useCallback(
    async (status) => {
      try {
        await dispatch(
          changeStatusEarlyTerminationProcess({
            status: status,
            uuid: earlyTerminationProcesses?.uuid,
            id: earlyTerminationProcesses?.id,
          })
        ).unwrap();

        showSuccessToast(CommonMessage.MFS00006);
        dispatch(getEarlyTerminationProcessByUuid({ uuid: uuid }));
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [dispatch, earlyTerminationProcesses]
  );

  return useMemo(
    () => ({
      watch,
      isSubmitting,
      isEarlyTerminationInfo,
      onSubmit,
      handleSubmit,
      control,
      editAbleForm,
      isShowToolbar,
      isShowRemove,
      earlyTerminationProcesses,
      handleChangeStatus,
      setValue,
    }),
    [
      watch,
      control,
      handleSubmit,
      isSubmitting,
      isEarlyTerminationInfo,
      onSubmit,
      editAbleForm,
      isShowToolbar,
      isShowRemove,
      earlyTerminationProcesses,
      handleChangeStatus,
      setValue,
    ]
  );
};

export default useCreateEarlyTerminationProcessForm;
