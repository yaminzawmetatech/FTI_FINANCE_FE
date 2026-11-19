import React, { useMemo } from "react";
import { Box, Skeleton, Grid } from "@mui/material";
import FormInputText from "components/form/FormInputText";
import Accordion from "components/Accordion";
import { useWatch } from "react-hook-form";
import FormInputSelect from "components/form/FormInputSelect";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import FormInputCheckbox from "components/form/FormInputCheckbox";

const ApplicationCollateralManagement = ({
  control,
  collateralTypes,
  vehicles,
  auth,
  isCollateralTypesLoading,
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
        <Accordion title="Collateral & RTA Management Process">
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
                  {isCollateralTypesLoading ? (
                    <Skeleton variant="rectangular" height={37.13} />
                  ) : (
                    <FormInputSelect
                      control={control}
                      options={collateralTypes}
                      getOptionLabel={(option) => option?.name}
                      id="id"
                      label="Collateral Type"
                      name="collateral_type_id"
                      disabled={disabled}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    disabled={disabled}
                    control={control}
                    label="Plate No"
                    name="plate_no"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    disabled={disabled}
                    control={control}
                    label="Division"
                    name="division"
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
                  <FormInputText
                    disabled={disabled}
                    control={control}
                    label="Chassis No"
                    name="chassis_no"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={uniqueBrandVehicles}
                    getOptionLabel={(option) =>
                      option?.brand_name || "Select Brands"
                    }
                    id="brand_id"
                    name="brand_id"
                    label="Brand Code"
                    disabled={disabled}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={uniqueModelVehicles}
                    getOptionLabel={(option) =>
                      option?.model_name || "Select Models"
                    }
                    id="model_id"
                    name="model_id"
                    label="Model Code"
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    disabled={disabled}
                    control={control}
                    label="Engine No"
                    name="engine_no"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    disabled={disabled}
                    control={control}
                    label="Engine Power"
                    name="engine_power"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    disabled={disabled}
                    control={control}
                    label="Year of Manufacturer"
                    name="year_of_manufacture"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    disabled={disabled}
                    control={control}
                    label="Color"
                    name="vehicle_color"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputDatePicker
                    control={control}
                    label="Collected Date"
                    name="collected_date"
                    disabled={disabled}
                    rules={{
                      required: "Collected Date is required",
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputDatePicker
                    control={control}
                    label="Delivered Date"
                    name="delivered_date"
                    disabled={disabled}
                    // rules={{
                    //   required: "Delivered Date is required",
                    // }}
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
                {/* Remove because of Loan feedback */}
                {/* <Grid item xs={12}>
                  <FormInputDatePicker
                    control={control}
                    label="Docs from CMCO to Loan Dept Date"
                    name="cmco_to_loan_date"
                    disabled={disabled}
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <FormInputCheckbox
                    disabled={disabled}
                    control={control}
                    label="Owner's Book"
                    name="owner_book"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputCheckbox
                    disabled={disabled}
                    control={control}
                    label="Insurance Premium Book"
                    name="insurance_premium_book"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputCheckbox
                    disabled={disabled}
                    control={control}
                    label="Certi.Receipt(With Sign)"
                    name="certi_receipt_with_sign"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormInputCheckbox
                    disabled={disabled}
                    control={control}
                    label="Insu.Certificate of Receipt"
                    name="insu_certificate_of_receipt"
                  />
                </Grid>
                {(auth?.user_group === "Loan Operation Manager" ||
                  auth?.user_group === "Loan Operation Staff" ||
                  auth?.is_super === true) && (
                  <Grid item xs={12}>
                    <FormInputDatePicker
                      control={control}
                      label="Collateral Received Date" // Updated label >> Received Date to Collateral Received Date
                      name="received_date"
                      disabled={disabled}
                    />
                  </Grid>
                )}
                {/* Remove because of Loan feedback */}
                {/* <Grid item xs={12}>
                  <FormInputDatePicker
                    control={control}
                    label="Docs. CMCO/CMCE to Loan Dept"
                    name="sm_to_loan_date"
                    disabled={disabled}
                  />
                </Grid> */}

                <Grid item xs={12}>
                  <FormInputDatePicker
                    control={control}
                    label="GRD Informed Date (Block Letter)" // Updated label >> Informed Date to GRD Informed Date
                    name="grd_informed_date"
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputDatePicker
                    control={control}
                    label="Block Letter Received Date" // Updated label >> Received Date to Block Letter Received Date
                    name="grd_received_date"
                    disabled={disabled}
                  />
                </Grid>
                {(auth?.user_group === "Loan Operation Manager" ||
                  auth?.user_group === "Loan Operation Staff" ||
                  auth?.is_super === true) && (
                  <Grid item xs={12}>
                    <FormInputDatePicker
                      control={control}
                      label="Filling Date"
                      name="filing_date"
                      disabled={disabled}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Box>
        </Accordion>
      </Box>
    </Box>
  );
};

export default React.memo(ApplicationCollateralManagement);
