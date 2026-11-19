import React, { useEffect, useMemo } from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputText from "components/form/FormInputText";
import { get, intersection } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getNRCStates } from "modules/administration/slices/nrcStateSlice";
import { getNRCTownships } from "modules/administration/slices/nrcTownshipSlice";
import FormInputSelect from "components/form/FormInputSelect";
import { useController, useWatch } from "react-hook-form";
import { getNRCRemarks } from "modules/administration/slices/NRCRemarkSlice";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import { toast } from "react-toastify";
import FormInputDateTimePicker from "components/form/FormInputDateTimePicker";


const ApplicantInformation = ({ control }) => {
  const disabled = useWatch({
    control,
    name: "disabled",
  });

  const fields = [
    "applicant_name",
    "nrc",
    "father_name",
    "other",
    "gender",
    "date_of_birth",
    "age",
    "marital_status",
    "living_phone_number",
    "viber_number",
    'living_period'
  ];
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
                control={control}
                label="Customer Id"
                name="customer_id"
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Customer Name"
                name="customer_name"
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                multiline
                control={control}
                label="Current Address"
                name="application.address_full_address"
                disabled
                sx={{
                  pt: 1,
                  textarea: {
                    minHeight: "100px",
                    maxHeight: "100px",
                    overflow: "auto !important",
                  },
                }}
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
                label="NRC"
                name="nrc"
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDateTimePicker
                control={control}
                label="Date Of Birth"
                name="date_of_birth"
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Contact Phone Number/ Living Phone Number"
                name="living_phone_number"
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Gender"
                name="gender"
                disabled={disabled}
              />
            </Grid>

          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );

};

export default React.memo(ApplicantInformation);
