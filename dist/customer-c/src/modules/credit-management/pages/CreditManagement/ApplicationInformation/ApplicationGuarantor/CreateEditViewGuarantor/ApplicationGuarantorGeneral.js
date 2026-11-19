import React, { useEffect, useMemo } from "react";
import { Box, FormControl, FormLabel, Grid } from "@mui/material";
import FormInputText from "components/form/FormInputText";
import Accordion from "components/Accordion";
import { useController, useWatch } from "react-hook-form";
import FormInputSelect from "components/form/FormInputSelect";
import FormInputNumber from "components/form/FormInputNumber";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import ApplicationGuarantorNRC from "./ApplicationGuarantorNRC";

const ApplicationGuarantorGeneral = ({ control, category, handleCheckExistingCustomer  }) => {
  const customerRelations = [
    { id: "Aunt in law" },
    { id: "Aunty" },
    { id: "Boss" },
    { id: "Brother" },
    { id: "Brother in law" },
    { id: "Colleague" },
    { id: "Cousin" },
    { id: "Daughter" },
    { id: "Daughter in Law" },
    { id: "Dealer" },
    { id: "Father" },
    { id: "Father in Law" },
    { id: "Friend" },
    { id: "Grandson" },
    { id: "Husband" },
    { id: "Mother" },
    { id: "Mother in Law" },
    { id: "Neighbor" },
    { id: "Nephew" },
    { id: "Niece" },
    { id: "Relatives" },
    { id: "Sister" },
    { id: "Sister in Law" },
    { id: "Son" },
    { id: "Son in Law" },
    { id: "Spouse" },
    { id: "Step Father" },
    { id: "Uncle" },
  ];

  const typesProofIncome = [
    { id: "Accounting Book" },
    { id: "Bank Statement" },
    { id: "Employment Card" },
    { id: "Employment Confirmation Letter" },
    { id: "Employment Contract" },
    { id: "Financial Statements" },
    { id: "None" },
    { id: "Others" },
    { id: "Payment Slip" },
  ];

  const maritalStatus = [
    { id: "Single" },
    { id: "Married" },
    { id: "Divorced" },
    { id: "Separated" },
    { id: "Widow/Widower" },
    { id: "Defacto" },
    { id: "Unknown" },
  ];

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
        <Accordion title="Guarantor Information">
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
                    options={customerRelations}
                    getOptionLabel={(option) => option?.id}
                    id="id"
                    name="relation_with_customer"
                    label="Relation With Customer"
                    disabled={disabled}
                  />
                </Grid>
                <ApplicationGuarantorNRC
                  control={control}
                  category={category}
                  handleCheckExistingCustomer={handleCheckExistingCustomer}
                />
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={[
                      { id: "Male" },
                      { id: "Female" },
                      { id: "Other" },
                    ]}
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
                    options={maritalStatus}
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

export default React.memo(ApplicationGuarantorGeneral);
