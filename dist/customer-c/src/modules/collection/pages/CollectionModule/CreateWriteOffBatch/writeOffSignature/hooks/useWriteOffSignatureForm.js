// hooks/useWriteOffSignatureForm.js
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { getCMCO, getUsers } from "modules/administration/slices/usersSlice";
import {  createWriteOffSignature, getWriteOffSignature } from "modules/collection/slices/writeOffSignatureSlice";

const useWriteOffSignatureForm = () => {
  const { uuid, id, type } = useParams(); // application ID
  const dispatch = useDispatch();

  const sigCanvas = useRef(null);

  const { control, getValues, reset, handleSubmit, setValue } = useForm({
    defaultValues: {
      disabled: false,
    },
  });

  const { writeOffSignature, isLoading } = useSelector((state) => state.writeOffSignature);
  const auth = useSelector((state) => state.auth.user);

  useEffect(() => {
    // Dispatching the action
    dispatch(getUsers());
    dispatch(getWriteOffSignature({
      params: {
        write_off_id: id,
        signature_type: auth?.user_group,
      }
    }));
  }, [dispatch, id, uuid, auth, type]);

  // useEffect(() => {
  //   if (mode !== "CreateApplicationGuarantor" && uuid) {
  //     dispatch(getCollateralByUuid({ uuid }));
  //   }
  // }, [dispatch, uuid]);


  // useEffect(() => {
  //   if (writeOffSignature && Array.isArray(writeOffSignature) && selectedCollateral?.data?.application) {
  //     const signature = writeOffSignature[0];
  //     let cmcoIdToUse = null;

  //     let loanManagerIdToUse = null;

  //     // If user is CMCE and is the same as selected CMCO
  //     if (auth?.user_group === "CMCE") {
  //       if (signature?.cmco_id) {
  //         cmcoIdToUse = signature.cmco_id;
  //       } else if (auth?.id) {
  //         cmcoIdToUse = auth.id;
  //       }
  //     } else {
  //       cmcoIdToUse = signature?.cmco_id ?? null;
  //     }

  //     // If user is CMCE and is the same as selected CMCO
  //     if (auth?.user_group === "Loan Operation Manager") {
  //       if (signature?.loan_manager_id) {
  //         loanManagerIdToUse = signature.loan_manager_id;
  //       } else if (auth?.id) {
  //         loanManagerIdToUse = auth.id;
  //       }
  //     } else {
  //       loanManagerIdToUse = signature?.loan_manager_id ?? null;
  //     }

  //     reset({
  //       cmco_id: cmcoIdToUse,
  //       dealer_signer_id: signature?.dealer_signer_id ?? null,
  //       loan_manager_id: loanManagerIdToUse,
  //       customer_name: selectedCollateral.data.application.applicant_name ?? "",
  //     });
  //   }
  // }, [reset, writeOffSignature, selectedCollateral, auth]);


  const onSubmit = useCallback(
    async (body) => {
      let isSuccess = false;
      try {
        // Ensure refs are checked before calling methods
        const signatureDataUrl = sigCanvas?.current?.isEmpty()
          ? null
          : sigCanvas?.current?.getTrimmedCanvas()?.toDataURL("image/jpeg", 0.75) ?? null;

        const finalBody = {
          ...body,
          write_off_id: id,
          signature: signatureDataUrl,
          signature_type: auth?.user_group,
        };

        await dispatch(createWriteOffSignature({ body: finalBody })).unwrap();

        // Fetch updated collateral signature data
        await dispatch(
          getWriteOffSignature({
            params: {
              write_off_id: id,
              signature_type: auth?.user_group,
              user_group: auth?.user_group,
            },
          })
        ).unwrap();

        isSuccess = true;
      } catch (error) {
        console.error("Error submitting signature:", error);
        // You might want to show an error toast here as well
        // showErrorToast(error.message || "Failed to submit signature");
      } finally {
        if (isSuccess) {
          showSuccessToast(CommonMessage.MFS00008);
        }
        // Any cleanup code can go here
      }
    },
    [dispatch, id, auth]
  );
  return useMemo(
    () => ({
      onSubmit,
      handleSubmit,
      control,
      getValues,
      setValue,
      writeOffSignature,
      isLoading,
      sigCanvas,
      type,
      auth,
    }),
    [
      onSubmit,
      handleSubmit,
      control,
      getValues,
      setValue,
      writeOffSignature,
      isLoading,
      sigCanvas,
      type,
      auth,
    ]
  );
};

export default useWriteOffSignatureForm;