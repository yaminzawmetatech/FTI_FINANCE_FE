import React, { useMemo } from "react";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import useCORForm from "./hooks/useCORForm";
import General from "./CORGeneral";
import CORToolbar from "./CORToolbar";
import ApplicantSignature from "./ApplicantSignature";
import CMCOSignature from "./CMCOSignature";
import DealerSignature from "./DealerSignature";
import GuarantorSignature from "./GuarantorSignature";
import JointApplicantSignature from "./JointApplicantSignature";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const CORIndex = () => {
  const {
    onSubmit,
    handleSubmit,
    control,
    getValues,
    setValue,
    COR,
    isLoading,
    vehicleLoading,
    vehicles,
    CMCO,
    CMCOLoading,
    sigCanvasCMCO,
    sigCanvasApplicant,
    dealerContactPeople,
    isContatPeopleLoading,
    sigCanvasDealer,
    guarantors,
    isGuarantorLoading,
    sigCanvasGuarantor,
    jointApplicants,
    isJointApplicantsLoading,
    sigCanvasJointApplicant,
    applicationSignatures,
    initialPaymentCalculations,
    application
  } = useCORForm();

  const auth = useSelector((state) => state.auth.user);

  const { uuid, id, route } = useParams();

  const updateAvailableFlag = useMemo(() => {
    if (!auth.is_super) {
      return false;
    }
  
    if (route === "signature-correction") {
      return true;
    }
  
    return (
      initialPaymentCalculations[0]?.application?.is_signature_complete === 1
    );
  }, [auth.is_super, initialPaymentCalculations, route]);
 
  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  console.log("route haha",route);
  return (
    <>
      <Helmet>
        <title>Sign Loan Agreement</title>
      </Helmet>
      <CORToolbar initialPaymentCalculations={initialPaymentCalculations} />
      <Box
        sx={{
          px: 1,
          pb: 1,
          display: "flex",
          gap: 2,
          "@media (max-width: 600px)": {
            flexDirection: "column",
          },
        }}
      >
        <Box sx={{ width: "100%", flex: 1 }}>
          {route !== "signature-correction" &&
          <General
            control={control}
            vehicleLoading={vehicleLoading}
            vehicles={vehicles}
          />}
          <ApplicantSignature
            control={control}
            sigCanvas={sigCanvasApplicant}
            applicationSignatures={applicationSignatures}
            updateAvailableFlag={updateAvailableFlag}
          />
          {jointApplicants.map((jointApplicant, index) => {
            if (!sigCanvasJointApplicant.current[jointApplicant.id]) {
              sigCanvasJointApplicant.current[jointApplicant.id] =
                React.createRef();
            }
            return (
              <JointApplicantSignature
                key={jointApplicant.id || index}
                control={control}
                jointApplicant={jointApplicant}
                isJointApplicantsLoading={isJointApplicantsLoading}
                sigCanvas={sigCanvasJointApplicant.current[jointApplicant.id]}
                setValue={setValue}
                applicationSignatures={applicationSignatures}
                updateAvailableFlag={updateAvailableFlag}
              />
            );
          })}
          {(route !== "signature-correction" || application?.cmco_id !== null) && (
            <CMCOSignature
              control={control}
              CMCO={CMCO}
              CMCOLoading={CMCOLoading}
              sigCanvas={sigCanvasCMCO}
              applicationSignatures={applicationSignatures}
              updateAvailableFlag={updateAvailableFlag}
            />
          )}
          {initialPaymentCalculations[0]?.application?.category_id === 4 && (
            <DealerSignature
              control={control}
              dealerContactPeople={dealerContactPeople}
              isContatPeopleLoading={isContatPeopleLoading}
              sigCanvas={sigCanvasDealer}
              applicationSignatures={applicationSignatures}
              updateAvailableFlag={updateAvailableFlag}
            />
          )}
          {guarantors.map((guarantor, index) => {
            if (!sigCanvasGuarantor.current[guarantor.id]) {
              sigCanvasGuarantor.current[guarantor.id] = React.createRef();
            }
            return (
              <GuarantorSignature
                key={guarantor.id || index}
                control={control}
                guarantor={guarantor}
                isGuarantorLoading={isGuarantorLoading}
                sigCanvas={sigCanvasGuarantor.current[guarantor.id]}
                setValue={setValue}
                applicationSignatures={applicationSignatures}
                updateAvailableFlag={updateAvailableFlag}
              />
            );
          })}
        </Box>
      </Box>
      <Box sx={{ display: "flex", px: 1, mb: 10, justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
          disabled={auth.is_super === false && initialPaymentCalculations[0]?.application?.is_signature_complete === 1}
        >
          OK
        </Button>
      </Box>
    </>
  );
};

export default React.memo(CORIndex);
