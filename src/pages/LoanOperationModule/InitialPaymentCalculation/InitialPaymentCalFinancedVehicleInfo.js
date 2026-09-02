import React, { useEffect, useMemo } from "react";
import {
  Box,
  Grid,
  Skeleton,
  Button,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import Accordion from "components/Accordion";
import FormInputText from "components/form/FormInputText";
import { get, intersection } from "lodash";
import { useWatch } from "react-hook-form";
import FormInputSelect from "components/form/FormInputSelect";
import FormInputNumber from "components/form/FormInputNumber";
import FormInputRadio from "components/form/FormInputRadio";

const FinancedVehicleInformation = ({
  control,
  vehicles,
  vehicleLoading,
  insuranceCompanies,
  insuranceCompaniesLoading,
  initialPaymentCalLoading,
}) => {
  const disabled = useWatch({
    control,
    name: "disabled",
  });

  const stockAvailabilityOptions = [
    { id: 2, value: "Yes" },
    { id: 1, value: "No" },
  ];

  const parkingAddressOptions = [
    { id: "current", key: "Copy From Current Address" },
    { id: "permanent", key: "Copy From Permanent Address" },
    { id: "parking", key: "No Copy From Both" },
  ];

  const OTR_OV = [{ value: "On The Road" }, { value: "Only Vehicle" }];

  // // Deduplicate vehicles array by brand_id
  const uniqueBrandVehicles = useMemo(() => {
    const vehicleMap = new Map();
    vehicles.forEach((vehicle) => {
      if (vehicle?.brand_id) {
        vehicleMap.set(vehicle.brand_id, vehicle);
      }
    });
    return Array.from(vehicleMap.values());
  }, [vehicles]);

  // // Deduplicate vehicles array by model_id
  const uniqueModelVehicles = useMemo(() => {
    const vehicleMap = new Map();
    vehicles.forEach((vehicle) => {
      if (vehicle?.model_id) {
        vehicleMap.set(vehicle.model_id, vehicle);
      }
    });
    return Array.from(vehicleMap.values());
  }, [vehicles]);

  // if (initialPaymentCalLoading) {
  //   return (
  //     <Backdrop
  //       sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
  //       open={initialPaymentCalLoading}
  //     >
  //       <CircularProgress color="inherit" />
  //     </Backdrop>
  //   );
  // }

  return (
    <Accordion title="Financed Vehicle Information">
      <Box sx={{ mt: 1 }}>
        <Grid
          container
          spacing={2}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid
            container
            item
            spacing={2}
            xs={12}
            sm={6}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {/* {insuranceCompaniesLoading ? (
              <Skeleton variant="rectangular" height={37.13} />
            ) : (
              <Grid item xs={12}>
                <FormInputSelect
                  control={control}
                  options={insuranceCompanies}
                  getOptionLabel={(option) => option?.name}
                  id="id"
                  name="insurance_company_id"
                  label="Insurance Company"
                  disabled
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Insurance Default Rate"
                name="insurance_default_rate"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Insurance Fixed Amount"
                name="insurance_fixed_amount"
                disabled
              />
            </Grid> */}
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Vehicle Color"
                name="vehicle_color"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              {vehicleLoading ? (
                <Skeleton variant="rectangular" height={37.13} />
              ) : (
                <FormInputSelect
                  control={control}
                  options={uniqueBrandVehicles}
                  getOptionLabel={(option) =>
                    option?.brand_name || "Select Brands"
                  }
                  id="brand_id"
                  name="brand_id"
                  label="Brand Code"
                  disabled
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {vehicleLoading ? (
                <Skeleton variant="rectangular" height={37.13} />
              ) : (
                <FormInputSelect
                  control={control}
                  options={uniqueModelVehicles}
                  getOptionLabel={(option) =>
                    option?.model_name || "Select Models"
                  }
                  id="model_id"
                  name="model_id"
                  label="Model Code"
                  disabled
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Engine Power"
                name="engine_power"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Year of Manufacture"
                name="year_of_manufacture"
                disabled
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Manufacture"
                name="manufacture"
                disabled
              />
            </Grid> */}
          </Grid>
          <Grid
            container
            item
            spacing={2}
            xs={12}
            sm={6}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Division"
                name="division"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Plate No."
                name="plate_no"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Chassis No."
                name="chassis_no"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Engine No."
                name="engine_no"
                disabled
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(FinancedVehicleInformation);
