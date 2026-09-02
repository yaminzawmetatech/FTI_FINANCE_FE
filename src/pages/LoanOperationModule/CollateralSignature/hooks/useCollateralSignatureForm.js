// hooks/useCollateralSignatureForm.js
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { getCMCO, getUsers } from "features/users/usersSlice";
import { getDealerContactPeople } from "features/dealerContactPerson/dealerContactPersonSlice";
import { createCollateralSignature, getCollateralSignature } from "features/collateralSignature/collateralSignatureSlice";
import { getCollateralByUuid } from "features/collateral/collateralSlice";

const useCollateralSignatureForm = () => {
  const { uuid, id, type } = useParams(); // application ID
  const dispatch = useDispatch();

  const sigCanvasCMCO = useRef(null);
  const sigCanvasDealer = useRef(null);
  const sigCanvasLoan = useRef(null);
  const sigCanvasCustomer = useRef(null);

  const { control, getValues, reset, handleSubmit, setValue } = useForm({
    defaultValues: {
      disabled: false,
    },
  });

  const { selectedCollateral } = useSelector(
    (state) => state.collaterals
  );
  const { collateralSignature, isLoading } = useSelector((state) => state.collateralSignature);
  const { CMCO, isLoading: CMCOLoading } = useSelector((state) => state.users);
  const { users, isLoading: LoanLoading } = useSelector((state) => state.users);
  const { dealerContactPeople, isLoading: isContatPeopleLoading } = useSelector(
    (state) => state.dealerContactPeople
  );
  const auth = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getCMCO("CMCE"));
    // Dispatching the action
    dispatch(getUsers("Loan Operation Manager"));
    dispatch(getCollateralSignature({
      params: {
        application_collateral_id: id,
        signature_type: type
      }
    }));
    dispatch(getCollateralByUuid({ uuid }));
  }, [dispatch, id, uuid, type]);

  useEffect(() => {
    if (selectedCollateral && selectedCollateral.data) {
      dispatch(
        getDealerContactPeople({
          params: {
            dealer_id: selectedCollateral?.data?.application?.dealer_id,
            type: "Authorized Signer",
          },
          //allFlag: true,
        })
      );
    }
  }, [dispatch,selectedCollateral]);

  // useEffect(() => {
  //   if (mode !== "CreateApplicationGuarantor" && uuid) {
  //     dispatch(getCollateralByUuid({ uuid }));
  //   }
  // }, [dispatch, uuid]);


  useEffect(() => {
    if (collateralSignature && Array.isArray(collateralSignature) && selectedCollateral?.data?.application) {
      const signature = collateralSignature[0];
      let cmcoIdToUse = null;

      let loanManagerIdToUse = null;

      // If user is CMCE and is the same as selected CMCO
      if (auth?.user_group === "CMCE") {
        if (signature?.cmco_id) {
          cmcoIdToUse = signature.cmco_id;
        } else if (auth?.id) {
          cmcoIdToUse = auth.id;
        }
      } else {
        cmcoIdToUse = signature?.cmco_id ?? null;
      }

      // If user is CMCE and is the same as selected CMCO
      if (auth?.user_group === "Loan Operation Manager") {
        if (signature?.loan_manager_id) {
          loanManagerIdToUse = signature.loan_manager_id;
        } else if (auth?.id) {
          loanManagerIdToUse = auth.id;
        }
      } else {
        loanManagerIdToUse = signature?.loan_manager_id ?? null;
      }

      reset({
        cmco_id: cmcoIdToUse,
        dealer_signer_id: signature?.dealer_signer_id ?? null,
        loan_manager_id: loanManagerIdToUse,
        customer_name: selectedCollateral.data.application.applicant_name ?? "",
      });
    }
  }, [reset, collateralSignature, selectedCollateral, auth]);


  const onSubmit = useCallback(
    async (body) => {
      let isSuccess = false;
      try {
        // Ensure refs are checked before calling methods
        const cmcoSignatureDataUrl = sigCanvasCMCO?.current?.isEmpty()
          ? null
          : sigCanvasCMCO?.current?.getTrimmedCanvas()?.toDataURL("image/jpeg", 0.75) ?? null;

        const dealerSignatureDataUrl = sigCanvasDealer?.current?.isEmpty()
          ? null
          : sigCanvasDealer?.current?.getTrimmedCanvas()?.toDataURL("image/jpeg", 0.75) ?? null;

        const loanSignatureDataUrl = sigCanvasLoan?.current?.isEmpty()
          ? null
          : sigCanvasLoan?.current?.getTrimmedCanvas()?.toDataURL("image/jpeg", 0.75) ?? null;

        const customerSignatureDataUrl = sigCanvasCustomer?.current?.isEmpty()
          ? null
          : sigCanvasCustomer?.current?.getTrimmedCanvas()?.toDataURL("image/jpeg", 0.75) ?? null;

        const finalBody = {
          ...body,
          application_collateral_id: id,
          cmco_signature: cmcoSignatureDataUrl,
          dealer_signer_signature: dealerSignatureDataUrl,
          customer_signature: customerSignatureDataUrl,
          loan_manager_signature: loanSignatureDataUrl,
          signature_type: type,
        };

        await dispatch(createCollateralSignature({ body: finalBody })).unwrap();

        // Fetch updated collateral signature data
        await dispatch(
          getCollateralSignature({
            params: {
              application_collateral_id: id,
              signature_type: type,
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
    [dispatch, id, type]
  );

  return useMemo(
    () => ({
      onSubmit,
      handleSubmit,
      control,
      getValues,
      setValue,
      collateralSignature,
      isLoading,
      CMCO,
      CMCOLoading,
      sigCanvasCMCO,
      dealerContactPeople,
      isContatPeopleLoading,
      sigCanvasDealer,
      sigCanvasLoan,
      sigCanvasCustomer,
      users,
      LoanLoading,
      type,
      auth,
    }),
    [
      onSubmit,
      handleSubmit,
      control,
      getValues,
      setValue,
      collateralSignature,
      isLoading,
      CMCO,
      CMCOLoading,
      sigCanvasCMCO,
      dealerContactPeople,
      isContatPeopleLoading,
      sigCanvasDealer,
      sigCanvasLoan,
      sigCanvasCustomer,
      users,
      LoanLoading,
      type,
      auth,
    ]
  );
};

export default useCollateralSignatureForm;