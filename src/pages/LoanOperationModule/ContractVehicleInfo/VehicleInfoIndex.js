import React, { useEffect } from "react";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";

import VehicleInfoFinancedVehicleInfo from "./contractVehicleInfoFinancedVehicleInfo";
import useVehicleInfoForm from "./hooks/useContractVehicleInfoForms";

const VehicleInfoIndex = () => {
  const {
    control,
    // getValues,
    onSubmit,
    handleSubmit,
    isLoading,
    watch,
    vehicles,
    vehicleLoading,
    application,
    setValue,
    insuranceCompanies,
    insuranceCompaniesLoading,
  } = useVehicleInfoForm();

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
        <title>Vehicle Info</title>
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
          <VehicleInfoFinancedVehicleInfo
            vehicles={vehicles}
            vehicleLoading={vehicleLoading}
            insuranceCompanies={insuranceCompanies}
            insuranceCompaniesLoading={insuranceCompaniesLoading}
            control={control}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", px: 1, mb: 2, justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          OK
        </Button>
      </Box>
    </>
  );
};

export default React.memo(VehicleInfoIndex);
