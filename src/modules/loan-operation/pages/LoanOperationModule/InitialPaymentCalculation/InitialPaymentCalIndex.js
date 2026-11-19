import React, { useMemo } from "react";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import useInitialPaymentCalForm from "./hooks/useInitialPaymentCalculationForm";
import InitialPaymentCalGeneral from "./InitialPaymentCalGeneral";
import InitialPaymentCalToolbar from "./InitialPaymentCalToolbar";
import InitialPaymentCalFinancedVehicleInfo from "./InitialPaymentCalFinancedVehicleInfo";
import InitialPaymentCalLoanInformation from "./InitialPaymentCalLoanInformation";
import { useParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useSelector } from "react-redux";

const InHouseSurveyIndex = () => {
  const {
    control,
    getValues,
    onSubmit,
    handleSubmit,
    vehicles,
    vehicleLoading,
    setValue,
    insuranceCompanies,
    insuranceCompaniesLoading,
    projectCategories,
    projectCategoriesloading,
    isCalculating,
    initialPaymentCalculations,
    initialPaymentCalLoading,
    editAbleForm,
    insurancePremiumFeesLoading,
    application_fields
  } = useInitialPaymentCalForm();

  const { route } = useParams();

  const { user } = useSelector((state) => state.auth);

  const application_fields_group = useMemo(() => {
    return Object.values(application_fields || {}).map((item) => item.group);
  }, [application_fields]);

  if (initialPaymentCalLoading || isCalculating) {
    return (
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <>
      <Helmet>
        <title>{route === "initial-payment-calculation" ? "Initial Payment Calculation" : "View Contract"}</title>
      </Helmet>



      {route === "initial-payment-calculation" ? (
        <InitialPaymentCalToolbar
          initialPaymentCalculations={initialPaymentCalculations}
          editAbleForm={editAbleForm}
        />
      ) : null}

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
          {route === "view-contract" ?
            <FormControl>
              <FormLabel sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "primary.main",
                //textTransform: "uppercase", 
                mb: 3,
                mt: 3
              }}>
                View Vehicle and Loan Information
              </FormLabel>
            </FormControl> : null}
          <InitialPaymentCalGeneral
            control={control}
            projectCategories={projectCategories}
            projectCategoriesloading={projectCategoriesloading}
          />
          {(application_fields_group.includes("Financed Vehicle Information") && route === "view-contract") && (
            <InitialPaymentCalFinancedVehicleInfo
              vehicles={vehicles}
              vehicleLoading={vehicleLoading}
              insuranceCompanies={insuranceCompanies}
              insuranceCompaniesLoading={insuranceCompaniesLoading}
              control={control}
            />)}
          <InitialPaymentCalLoanInformation
            control={control}
            setValue={setValue}
            formValues={getValues}
            initialPaymentCalculations={initialPaymentCalculations}
            initialPaymentCalLoading={initialPaymentCalLoading}
            editAbleForm={editAbleForm}
            insurancePremiumFeesLoading={insurancePremiumFeesLoading}
            vehicleLoading={vehicleLoading}
            insuranceCompaniesLoading={insuranceCompaniesLoading}
            insuranceCompanies={insuranceCompanies}
            route={route}
            application_fields={application_fields}
            projectCategories={projectCategories}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", px: 1, mb: 10, justifyContent: "flex-end" }}>
        {route !== "view-contract" ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
            disabled={ user?.is_super === false ? !editAbleForm : false }
          >
            OK
          </Button>
        ) : (
          <Button variant="outlined" color="error" onClick={() => window.close()}>
            Close
          </Button>
        )}
      </Box>
    </>
  );
};

export default React.memo(InHouseSurveyIndex);
