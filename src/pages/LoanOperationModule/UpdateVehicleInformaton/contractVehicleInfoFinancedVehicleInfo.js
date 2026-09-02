import React, { useEffect, useMemo } from "react";
import { Box, Grid, Skeleton, Button } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputText from "components/form/FormInputText";
import { get, intersection } from "lodash";
import { useWatch } from "react-hook-form";
import FormInputSelect from "components/form/FormInputSelect";
import FormInputNumber from "components/form/FormInputNumber";
import FormInputRadio from "components/form/FormInputRadio";

const VehicleInfoFinancedVehicleInfo = ({
  control,
  vehicles,
  vehicleLoading,
  setValue,
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



  const fields = [
    "vehicle_color",
    "brand_id",
    "model_id",
    "engine_power",
    "year_of_manufacture",
    "division",
    "plate_no",
    "chassis_no",
    "engine_no",
    "stock_availability",
    "parking_address",
    "user_of_unit",
    "purpose_of_unit",
    "otr_ov",
  ];
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
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Vehicle Color"
                name="vehicle_color"
                disabled={disabled}
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
                  disabled={disabled}
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
                  disabled={disabled}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Engine Power"
                name="engine_power"
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Year of Manufacture"
                name="year_of_manufacture"
                disabled={disabled}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Manufacture"
                name="manufacturer"
                disabled={disabled}
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
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Plate No."
                name="plate_no"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Chassis No."
                name="chassis_no"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Engine No."
                name="engine_no"
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(VehicleInfoFinancedVehicleInfo);
