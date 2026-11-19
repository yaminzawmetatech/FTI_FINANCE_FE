import React, { useEffect } from "react";
import { Box, FormControl, FormLabel, Grid } from "@mui/material";
import FormInputText from "components/form/FormInputText";
import Accordion from "components/Accordion";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import { useController, useWatch } from "react-hook-form";
import FormInputNumber from "components/form/FormInputNumber";
import FormInputDateTimePicker from "components/form/FormInputDateTimePicker";
import FormInputDecimal from "components/form/FormInputDecimal";

const CustomerDetailInfo = ({ control }) => {

  return (
    <Accordion title="Customer Information">
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
                disabled
                control={control}
                label="Name"
                name="name"
              />
            </Grid>
            <Grid item xs={12}>
                  <FormInputText
                    disabled
                    control={control}
                    label="Father Name"
                    name="father_name"
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
            <FormControl
              sx={{ ml: 2, mt: 2, width: "100%" }}
              component="fieldset"
              variant="standard"
            >
              <Grid
                container
                item
                spacing={2}
                xs={12}
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid item xs={12}>
                  <FormInputText
                    disabled
                    control={control}
                    label="Gender"
                    name="gender"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputDatePicker
                    disabled
                    control={control}
                    label="Date of Birth"
                    name="date_of_birth"
                  />
                </Grid>
             
             
              </Grid>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(CustomerDetailInfo);
