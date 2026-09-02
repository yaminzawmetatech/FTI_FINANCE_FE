import React, { useEffect } from "react";
import { Box, FormControl, FormLabel, Grid } from "@mui/material";
import FormInputText from "../../../components/form/FormInputText";
import Accordion from "../../../components/Accordion";
import FormInputDatePicker from "../../../components/form/FormInputDatePicker";
import { useController, useWatch } from "react-hook-form";
import FormInputNumber from "../../../components/form/FormInputNumber";
import FormInputDateTimePicker from "components/form/FormInputDateTimePicker";
import FormInputDecimal from "components/form/FormInputDecimal";

const ApplicationAssessmentGeneral = ({ control }) => {

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
                disabled
                control={control}
                label="Application ID"
                name="application_id"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDateTimePicker
                control={control}
                label="Conduct Date"
                name="conduct_at"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                disabled
                multiline
                control={control}
                label="Remark"
                name="remark"
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
            <Grid item xs={12}>
              <FormInputText
                disabled
                multiline
                control={control}
                label="Investigation Result"
                name="investigation_result"
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
            <Grid item xs={12}>
              <FormInputText
                disabled
                control={control}
                label="Assessment Type"
                name="assessment_type"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                disabled
                control={control}
                label="Status"
                name="status"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                disabled
                control={control}
                label="Approved by"
                name="approved_user.user_name"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                disabled
                multiline
                control={control}
                label="Summary for Final Judgement"
                name="summary_for_final_judgement"
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
                    label="Category Code"
                    name="category.code"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    disabled
                    control={control}
                    label="Category Name"
                    name="category.name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    disabled
                    control={control}
                    label="Subcategory Code"
                    name="sub_category.code"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    disabled
                    control={control}
                    label="Subcategory Name"
                    name="sub_category.name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputDatePicker
                    disabled
                    control={control}
                    label="Commencement Date"
                    name="commencement_date"
                  />
                </Grid>
                {/*<Grid item xs={12}>*/}
                {/*  <FormInputText*/}
                {/*    control={control}*/}
                {/*    label="Total Amount"*/}
                {/*    name="total_amount"*/}
                {/*  />*/}
                {/*</Grid>*/}
                <Grid item xs={12}>
                  <FormInputText
                    disabled
                    control={control}
                    label="Tenor"
                    name="tenor"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputNumber
                    disabled
                    control={control}
                    label="Loan Amount"
                    name="loan_amount"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputDecimal
                    disabled
                    control={control}
                    label="Stamp Duty Fee %"
                    name="stamp_duty_fee_percentage"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputNumber
                    disabled
                    control={control}
                    label="Stamp Duty Fee"
                    name="stamp_duty_fee"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputDecimal
                    disabled
                    control={control}
                    label="Processing Fee %"
                    name="processing_fee_percentage"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputNumber
                    disabled
                    control={control}
                    label="Processing Fee"
                    name="processing_fee"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormInputDecimal
                    disabled
                    control={control}
                    label="Interest Rate"
                    name="interest_rate"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormInputDecimal
                    disabled
                    control={control}
                    label="Monthly Interest Rate"
                    name="monthly_interest_rate"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormInputNumber
                    disabled
                    control={control}
                    label="Interest First Installment"
                    name="interest_first_installment"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormInputNumber
                    disabled
                    control={control}
                    label="Monthly Installment Amount"
                    name="monthly_installment_amount"
                  />
                </Grid>
              </Grid>
            </FormControl>
            <FormControl
              sx={{ ml: 2, mt: 1, width: "100%" }}
              component="fieldset"
              variant="standard"
            >
              <FormLabel sx={{ fontWeight: "bold", color: "black" }}>
                Monthly Income Ratio Calculation
              </FormLabel>
              <Grid
                sx={{ mt: "3px" }}
                container
                item
                spacing={2}
                xs={12}
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid item xs={12}>
                  <FormInputNumber
                    disabled
                    control={control}
                    label="Estimated Monthly Income"
                    name="estimated_monthly_income"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormInputDecimal
                    disabled
                    control={control}
                    label="Monthly Income Ratio"
                    name="monthly_income_ratio"
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

export default React.memo(ApplicationAssessmentGeneral);
