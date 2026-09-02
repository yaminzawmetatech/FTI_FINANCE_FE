import React, { useEffect } from "react";
import { Box, FormControl, FormLabel, Grid } from "@mui/material";
import FormInputText from "../../../../../components/form/FormInputText";
import Accordion from "../../../../../components/Accordion";
import FormInputDatePicker from "../../../../../components/form/FormInputDatePicker";
import { useController, useWatch } from "react-hook-form";
import FormInputNumber from "../../../../../components/form/FormInputNumber";
import FormInputDateTimePicker from "components/form/FormInputDateTimePicker";
import FormInputDecimal from "components/form/FormInputDecimal";
import FormInputSelect from "../../../../../components/form/FormInputSelect";

const ApplicationAssessmentGeneral = ({ control, getValues, setValue }) => {
  const { field: stamp_duty_fee_field } = useController({
    name: "stamp_duty_fee",
    control,
  });

  const { field: monthly_interest_rate_field } = useController({
    name: "monthly_interest_rate",
    control,
  });

  const { field: monthly_income_ratio_field } = useController({
    name: "monthly_income_ratio",
    control,
  });

  const stamp_duty_fee_percentage = useWatch({
    control,
    name: "stamp_duty_fee_percentage",
  });

  const processing_fee_percentage = useWatch({
    control,
    name: "processing_fee_percentage",
  });

  const processing_fee = useWatch({
    control,
    name: "processing_fee",
  });

  const loan_amount = useWatch({
    control,
    name: "loan_amount",
  });

  const interest_rate = useWatch({
    control,
    name: "interest_rate",
  });

  const estimated_monthly_income = useWatch({
    control,
    name: "estimated_monthly_income",
  });

  const monthly_installment_amount = useWatch({
    control,
    name: "monthly_installment_amount",
  });

  useEffect(() => {
    stamp_duty_fee_field.onChange(
      (+stamp_duty_fee_percentage / 100) * +loan_amount
    );
  }, [stamp_duty_fee_percentage, loan_amount, stamp_duty_fee_field]);

  useEffect(() => {
    monthly_interest_rate_field.onChange(+interest_rate / 12);
  }, [stamp_duty_fee_percentage, interest_rate, monthly_interest_rate_field]);

  useEffect(() => {
    monthly_income_ratio_field.onChange(
      (estimated_monthly_income / monthly_installment_amount).toFixed(1)
    );
  }, [
    estimated_monthly_income,
    monthly_installment_amount,
    monthly_interest_rate_field,
  ]);

  useEffect(() => {
    if (processing_fee_percentage !== "") {
      const calculatedProcessingFee =
        (+processing_fee_percentage / 100) * +loan_amount;
      setValue("processing_fee", Math.round(calculatedProcessingFee));
    }
  }, [loan_amount]);

  const handleProcessingFeePercentage = (event) => {
    if (event) {
      if (processing_fee !== "") {
        const calculatedProcessingFeePercentage =
          (+processing_fee / +loan_amount) * 100;
        setValue(
          "processing_fee_percentage",
          calculatedProcessingFeePercentage.toFixed(2)
        );
      }
    }
  };

  const handleProcessingFee = (event) => {
    if (event) {
      if (processing_fee_percentage !== "") {
        const calculatedProcessingFee =
          (+processing_fee_percentage / 100) * +loan_amount;
        setValue("processing_fee", Math.round(calculatedProcessingFee));
      }
    }
  };

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
                name="application.application_id"
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
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={[{ id: "D" }, { id: "M" }]}
                    getOptionLabel={(option) => option?.id}
                    id="id"
                    label="Tenor/Loan Term Type"
                    name="loan_term_type"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Tenor/Loan Term Duration"
                    name="loan_term_duration"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Loan Amount"
                    name="loan_amount"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputDecimal
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
                    control={control}
                    label="Processing Fee %"
                    name="processing_fee_percentage"
                    onFocus={handleProcessingFeePercentage}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Processing Fee"
                    name="processing_fee"
                    onFocus={handleProcessingFee}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormInputDecimal
                    control={control}
                    label="Interest Rate"
                    name="interest_rate"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormInputDecimal
                    control={control}
                    label="Monthly Interest Rate"
                    name="monthly_interest_rate"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputNumber
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
                    control={control}
                    label="Estimated Monthly Income"
                    name="estimated_monthly_income"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormInputDecimal
                    control={control}
                    label="Monthly Income Ratio"
                    name="monthly_income_ratio"
                    disabled
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
