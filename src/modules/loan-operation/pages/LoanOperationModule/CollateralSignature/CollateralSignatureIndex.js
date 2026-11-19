// CollateralSignatureIndex.js
import React, { useMemo } from "react";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import CMCOSignature from "./CMCOSignature";
import DealerSignature from "./DealerSignature";
import useCollateralSignatureForm from "./hooks/useCollateralSignatureForm";
import CollateralSignatureToolbar from "./CollateralSignatureToolbar";
import LoanManagerSignature from "./LoanManagerSignature";
import CustomerSignature from "./CustomerSignature";

const CollateralSignatureIndex = () => {
  const {
    onSubmit,
    handleSubmit,
    control,
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
  } = useCollateralSignatureForm();

  const updateAvailableFlag = useMemo(() => {
    if (
      auth?.is_super === true &&
      Array.isArray(collateralSignature) &&
      collateralSignature[0]?.status === "completed"
    ) {
      return true;
    }
    return false;
  }, [auth, collateralSignature]);


  // console.log("collateralSignature", collateralSignature);

  // if (isLoading) {
  //   return (
  //     <Backdrop
  //       sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
  //       open={true}
  //     >
  //       <CircularProgress color="inherit" />
  //     </Backdrop>
  //   );
  // }



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


  return (
    <>
      <Helmet>
        <title>Sign For Collateral</title>
      </Helmet>
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
          <CollateralSignatureToolbar collateralSignature={collateralSignature} type={type} />
          {
            type === "COR" ? (
              <CMCOSignature
                control={control}
                CMCO={CMCO}
                CMCOLoading={CMCOLoading}
                sigCanvas={sigCanvasCMCO}
                collateralSignature={collateralSignature}
                updateAvailableFlag={updateAvailableFlag}
              />
            ) : null}
          {
            (type === "UncollectedLC" || type === "COR") ? (
              <DealerSignature
                control={control}
                dealerContactPeople={dealerContactPeople}
                isContatPeopleLoading={isContatPeopleLoading}
                sigCanvas={sigCanvasDealer}
                collateralSignature={collateralSignature}
                updateAvailableFlag={updateAvailableFlag}
              />
            ) : null}
          {
            (type === "UncollectedLC" || type === "CollectedLC") ? (
              <LoanManagerSignature
                control={control}
                users={users}
                LoanLoading={LoanLoading}
                sigCanvas={sigCanvasLoan}
                collateralSignature={collateralSignature}
                updateAvailableFlag={updateAvailableFlag}
              />
            ) : null
          }

          {
            (type === "UncollectedLC" || type === "CollectedLC") ? (
              <CustomerSignature
                control={control}
                sigCanvas={sigCanvasCustomer}
                collateralSignature={collateralSignature}
                updateAvailableFlag={updateAvailableFlag}
              />
            ) : null
          }

        </Box>
      </Box>
      <Box sx={{ display: "flex", px: 1, mb: 10, justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
          disabled={
            auth.is_super === false &&
            Array.isArray(collateralSignature) &&
            collateralSignature[0]?.status === "completed"
          }

        >
          Submit Signatures
        </Button>
      </Box>
    </>
  );
};

export default React.memo(CollateralSignatureIndex);