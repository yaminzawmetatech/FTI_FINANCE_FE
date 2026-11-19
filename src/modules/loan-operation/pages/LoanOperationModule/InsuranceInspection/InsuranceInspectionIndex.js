import React from "react";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import useInsuranceInspectionForm from "./hooks/useInuranceInspectionForm";
import InsuranceInspectionGeneral from "./InsuranceInspectionGeneral";
import InitialPaymentCalToolbar from "./InsuranceInspectionToolbar";

const InsuranceInspectionindex = () => {
  const {
    onSubmit,
      handleSubmit,
      control,
      editAbleForm,
      insuranceCompanies,
      insuranceCompaniesLoading,
      insuranceInspections,
      isLoading,
      setValue
  } = useInsuranceInspectionForm();

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
        <title>Insurance Inspection</title>
      </Helmet>
      <InitialPaymentCalToolbar
        insuranceInspections={insuranceInspections}
        editAbleForm={editAbleForm}
      />
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
          <InsuranceInspectionGeneral
            control={control}
            insuranceCompanies={insuranceCompanies}
            insuranceCompaniesLoading={insuranceCompaniesLoading}
            setValue={setValue}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", px: 1, mb: 10, justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
          disabled={!editAbleForm}
        >
          OK
        </Button>
      </Box>
    </>
  );
};

export default React.memo(InsuranceInspectionindex);
