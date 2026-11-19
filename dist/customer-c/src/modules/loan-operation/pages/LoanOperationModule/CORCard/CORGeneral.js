import React, { useMemo} from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputText from "components/form/FormInputText";
import FormInputSelect from "components/form/FormInputSelect";
import { useSelector } from "react-redux";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import { useWatch } from "react-hook-form";

const General = ({ control, vehicles, vehicleLoading }) => {
  
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
    <Accordion title="General">
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
                label="Application ID"
                name="application.application_id"
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
                label="Engine No."
                name="engine_no"
                disabled
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
                label="Vehicle Color"
                name="vehicle_color"
                disabled
              />
            </Grid>
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
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(General);
