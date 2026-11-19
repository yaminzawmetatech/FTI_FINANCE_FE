import React from "react";
import { Box, Grid } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputText from "components/form/FormInputText";
import FormInputNumber from "components/form/FormInputNumber";
import { useWatch } from "react-hook-form";
import FormInputDecimal from "components/form/FormInputDecimal";
import FormInputDatePicker from "components/form/FormInputDatePicker";

const LoanInformation = ({ control, prepareForContracts }) => {
  const disabled = useWatch({
    control,
    name: "disabled",
  });

  return (
    <Accordion title="Loan Information">
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
            {prepareForContracts?.category?.id === 2 ?? (
              <Grid item xs={12}>
                <FormInputText
                  control={control}
                  label="Customer Loan Id"
                  name="customer_loan_id"
                  disabled={disabled}
                />
              </Grid>
            )}

            {prepareForContracts?.category?.id === 1 ?? (
              <Grid item xs={12}>
                <FormInputText
                  control={control}
                  label="Mnet Application Id"
                  name="mnet_application_id"
                  disabled={disabled}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Loan Amount"
                name={
                  prepareForContracts.assessment_approved_amount
                    ? "assessment_approved_amount"
                    : "loan_amount"
                }
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Tenor"
                name={
                  prepareForContracts.assessment_tenor
                    ? "assessment_tenor"
                    : "loan_term_duration"
                }
                disabled={disabled}
              />
            </Grid>

            <Grid item xs={12}>
              <FormInputDatePicker
                control={control}
                label="Commencement Date"
                name="disbursed_date"
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDatePicker
                control={control}
                label="First Due Date"
                name="first_due_date"
                disabled={disabled}
              />
            </Grid>

            <Grid item xs={12}>
              <FormInputDecimal
                control={control}
                label="Interest Rate"
                name={
                  prepareForContracts.assessment_interest_rate
                    ? "assessment_interest_rate"
                    : "interest_rate"
                }
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
              <FormInputNumber
                control={control}
                disabled={disabled}
                label="Prorata Interest"
                name="prorata_interest"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Monthly Installment"
                disabled={disabled}
                name="monthly_installment"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDecimal
                control={control}
                label="Stamp Duty %"
                name={
                  prepareForContracts.assessment_stamp_duty_percentage
                    ? "assessment_stamp_duty_percentage"
                    : "stamp_duty_percentage"
                }
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Stamp Duty Fee"
                disabled={disabled}
                name={
                  prepareForContracts.assessment_stamp_duty_fees
                    ? "assessment_stamp_duty_fees"
                    : "stamp_duty_fees"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDecimal
                control={control}
                label="Processing %"
                name={
                  prepareForContracts.assessment_processing_percentage
                    ? "assessment_processing_percentage"
                    : "processing_percentage"
                }
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Processing Fee"
                name={
                  prepareForContracts.assessment_processing_fees
                    ? "assessment_processing_fees"
                    : "processing_fees"
                }
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Net Disbursement Amount"
                name="net_disbursed_amount"
                disabled={disabled}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(LoanInformation);
