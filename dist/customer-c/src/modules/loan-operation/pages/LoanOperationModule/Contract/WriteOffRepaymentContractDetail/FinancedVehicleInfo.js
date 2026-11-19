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
import { get } from "lodash";
import FormInputNumber from "components/form/FormInputNumber";

const FinancedVehicleInformation = ({ control, application_fields }) => {
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
            {/* {get(application_fields, "insurance_company_id") && (
              <Grid item xs={12}>
                <FormInputText
                  control={control}
                  name="insurance_company_id"
                  label="Insurance Company"
                  disabled
                />
              </Grid>
            )}
            {get(application_fields, "insurance_default_rate") && (
              <Grid item xs={12}>
                <FormInputText
                  control={control}
                  label="Insurance Default Rate"
                  name="insurance_default_rate"
                  disabled
                />
              </Grid>
            )}
            {get(application_fields, "insurance_fixed_amount") && (
              <Grid item xs={12}>
                <FormInputNumber
                  control={control}
                  label="Insurance Fixed Amount"
                  name="insurance_fixed_amount"
                  disabled
                />
              </Grid>
            )} */}
            {get(application_fields, "vehicle_color") && (
              <Grid item xs={12}>
                <FormInputText
                  control={control}
                  label="Vehicle Color"
                  name="vehicle_color"
                  disabled
                />
              </Grid>
            )}
            {get(application_fields, "brand_id") && (
              <Grid item xs={12}>
                <FormInputText
                  control={control}
                  name="brand_id"
                  label="Brand Code"
                  disabled
                />
              </Grid>
            )}
            {get(application_fields, "model_id") && (
              <Grid item xs={12}>
                <FormInputText
                  control={control}
                  name="model_id"
                  label="Model Code"
                  disabled
                />
              </Grid>
            )}
            {get(application_fields, "engine_power") && (
              <Grid item xs={12}>
                <FormInputText
                  control={control}
                  label="Engine Power"
                  name="engine_power"
                  disabled
                />
              </Grid>
            )}
            {get(application_fields, "year_of_manufacture") && (
              <Grid item xs={12}>
                <FormInputText
                  control={control}
                  label="Year of Manufacture"
                  name="year_of_manufacture"
                  disabled
                />
              </Grid>
            )}
             {/* {get(application_fields, "manufacturer") && (
              <Grid item xs={12}>
                <FormInputText
                  control={control}
                  label="Manufacture"
                  name="manufacturer"
                  disabled
                />
              </Grid>
            )} */}
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
            {get(application_fields, "division") && (
              <Grid item xs={12}>
                <FormInputText
                  control={control}
                  label="Division"
                  name="division"
                  disabled
                />
              </Grid>
            )}
            {get(application_fields, "plate_no") && (
              <Grid item xs={12}>
                <FormInputText
                  control={control}
                  label="Plate No."
                  name="plate_no"
                  disabled
                />
              </Grid>
            )}
            {get(application_fields, "chassis_no") && (
              <Grid item xs={12}>
                <FormInputText
                  control={control}
                  label="Chassis No."
                  name="chassis_no"
                  disabled
                />
              </Grid>
            )}
            {get(application_fields, "engine_no") && (
              <Grid item xs={12}>
                <FormInputText
                  control={control}
                  label="Engine No."
                  name="engine_no"
                  disabled
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(FinancedVehicleInformation);
