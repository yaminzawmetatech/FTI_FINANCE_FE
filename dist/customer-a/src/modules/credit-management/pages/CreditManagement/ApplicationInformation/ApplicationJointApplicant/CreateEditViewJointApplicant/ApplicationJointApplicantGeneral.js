import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import FormInputText from "components/form/FormInputText";
import Accordion from "components/Accordion";
import { useController, useWatch } from "react-hook-form";
import FormInputSelect from "components/form/FormInputSelect";
import FormInputNumber from "components/form/FormInputNumber";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import ApplicationJointApplicantNRC from "./ApplicationJointApplicantNRC";
import { CUSTOMER_RELATIONS } from "constants/customerRelations";
import { MARITAL_STATUS } from "constants/maritalStatus";

const ApplicationJointApplicantGeneral = ({ control }) => {

  const disabled = useWatch({
    control,
    name: "disabled",
  });
  const { field } = useController({
    name: "age",
    control,
  });

  const dob = useWatch({
    control,
    name: "dob",
  });

  useEffect(() => {
    if (dob) {
      const dateOfBirth = new Date(dob);
      const today = new Date();
      const age = today.getFullYear() - dateOfBirth.getFullYear();

      field.onChange(age);
    }
  }, [dob, field]);

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
        <Accordion title="Joint Applicant Information">
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
                  <FormInputText
                    disabled
                    control={control}
                    label="Application ID"
                    name="application_id"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Full Name"
                    name="full_name"
                    disabled={disabled}
                    rules= {{ required : true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    disabled={disabled}
                    control={control}
                    label="Father Name"
                    name="father_name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={CUSTOMER_RELATIONS}
                    getOptionLabel={(option) => option?.id}
                    id="id"
                    name="relation_with_customer"
                    label="Relation With Customer"
                    disabled={disabled}
                  />
                </Grid>
                <ApplicationJointApplicantNRC control={control} />
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={[{ id: "Male" }, { id: "Female" }, { id: "Other"}]}
                    getOptionLabel={(option) => option?.id}
                    id="id"
                    label="Gender"
                    name="gender"
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputDatePicker
                    control={control}
                    label="Date of Birth"
                    name="dob"
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputNumber
                    disabled
                    control={control}
                    label="Age"
                    name="age"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={MARITAL_STATUS}
                    getOptionLabel={(option) => option?.id}
                    id="id"
                    label="Marital Status"
                    name="marital_status"
                    disabled={disabled}
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
                    disabled={disabled}
                    control={control}
                    label="Primary Phone No"
                    name="primary_phone_no"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    disabled={disabled}
                    control={control}
                    label="Secondary Phone No"
                    name="secondary_phone_no"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    disabled={disabled}
                    control={control}
                    label="Viber Number"
                    name="viber_number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    disabled={disabled}
                    control={control}
                    label="Facebook Account"
                    name="facebook_account"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    disabled={disabled}
                    control={control}
                    label="Tiktok Account"
                    name="tiktok_account"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    multiline
                    disabled={disabled}
                    control={control}
                    label="Remark"
                    name="description"
                    sx={{
                      pt: 1,
                      textarea: {
                        minHeight: "200px",
                        maxHeight: "200px",
                        overflow: "auto !important",
                      },
                    }}
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

export default React.memo(ApplicationJointApplicantGeneral);
