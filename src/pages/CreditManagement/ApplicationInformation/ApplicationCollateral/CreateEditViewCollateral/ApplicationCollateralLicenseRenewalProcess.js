import React, { useEffect, useMemo } from "react";
import { Box, FormControl, FormLabel, Grid } from "@mui/material";
import FormInputText from "../../../../../components/form/FormInputText";
import Accordion from "../../../../../components/Accordion";
import { useController, useWatch } from "react-hook-form";
import FormInputSelect from "components/form/FormInputSelect";
import FormInputNumber from "components/form/FormInputNumber";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import ApplicationGuarantorNRC from "./ApplicationGuarantorNRC";
import FormInputCheckbox from "components/form/FormInputCheckbox";

const ApplicationCollateralLicenseRenewalProcess = ({
  control,
  collateralTypes,
  vehicles,
  CMCO,
  auth,
}) => {
  const disabled = useWatch({
    control,
    name: "disabled",
  });

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

  return (
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
        <Accordion title="Collateral's License Renewal Process">
          <Box sx={{ mt: 1 }}>
            <Grid
              container
              item
              spacing={2}
              xs={12}
              sm={12}
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
                <Grid item xs={12}>
                  <FormInputDatePicker
                    control={control}
                    label="Renewal Due Date"
                    name="license_renewal_date"
                    disabled={
                      disabled ||
                      !(
                        auth?.user_group === "Loan Operation Manager" ||
                        auth?.user_group === "Loan Operation Staff" ||
                        auth?.is_super === true
                      )
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputDatePicker
                    control={control}
                    label="Notice Date to Customer (before 1 month ahead):"
                    name="license_notice_date"
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputCheckbox
                    disabled={disabled}
                    control={control}
                    label="To Inform Customer"
                    name="is_license_informed_to_customer"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputDatePicker
                    disabled={disabled}
                    control={control}
                    label="Appointment Date"
                    name="license_appointment_date"
                  />
                </Grid>
                {/* <Grid item xs={12}>
                                    <FormInputText
                                        disabled={disabled}
                                        control={control}
                                        label="Number"
                                        name="number"
                                    />
                                </Grid> */}
                <Grid item xs={12}>
                  <FormInputDatePicker
                    disabled={disabled}
                    control={control}
                    label="Released Date"
                    name="license_released_date"
                  />
                </Grid>
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
                  <FormInputDatePicker
                    disabled={disabled}
                    control={control}
                    label="GRD/CMCE to Loan Dept Received Date"
                    name="license_received_date"
                  />
                </Grid>
                {/* new field add based on loan dept request */}
                <Grid item xs={12}>
                  <FormInputDatePicker
                    disabled={disabled}
                    control={control}
                    label="Loan Dept to GRD/CMCE Delivered Date"
                    name="license_loan_to_GRD_CMCE_delivered_date"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputCheckbox
                    disabled={disabled}
                    control={control}
                    label="Renewal Owner Book"
                    name="renewal_owner_book"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormInputCheckbox
                    disabled={disabled}
                    control={control}
                    label="Renewal Insurance Premium Book"
                    name="renewal_insurance_premium_book"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={CMCO}
                    getOptionLabel={(option) => option?.user_name || ""}
                    id="id"
                    name="license_renewal_assign_user_id"
                    label="License Renewal Assign User"
                    disabled={disabled}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Accordion>
      </Box>
    </Box>
  );
};

export default React.memo(ApplicationCollateralLicenseRenewalProcess);
