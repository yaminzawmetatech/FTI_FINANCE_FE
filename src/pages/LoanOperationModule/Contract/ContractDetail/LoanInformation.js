import React, { useEffect, useMemo } from "react";
import { Box, Grid } from "@mui/material";
import Accordion from "../../../../components/Accordion";
import FormInputText from "../../../../components/form/FormInputText";
import FormInputNumber from "../../../../components/form/FormInputNumber";
import { useController, useWatch } from "react-hook-form";
import FormInputDecimal from "components/form/FormInputDecimal";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import { useDispatch, useSelector } from "react-redux";
import { getApplicationSetupList } from "features/menuApplicationSetup/menuApplicationSetupSlice";
import { get } from "lodash";

const LoanInformation = ({contract, control, application_fields }) => {
  

  const disabled = useWatch({
    control,
    name: "disabled",
  });

  const { field: stamp_duty_fee_field } = useController({
    name: "stamp_duty_fees",
    control,
  });

  const stamp_duty_percentage = useWatch({
    control,
    name: "stamp_duty_percentage",
  });

  const loan_amount = useWatch({
    control,
    name: "loan_amount",
  });

  const processing_percentage = useWatch({
    control,
    name: "processing_percentage",
  });

  const processing_fees = useWatch({
    control,
    name: "processing_fees",
  });

  const mnet_application_id = useWatch({
    control,
    name: "mnet_application_id",
  });

  const customer_loan_id = useWatch({
    control,
    name: "customer_loan_id",
  });

  const kpay_id = useWatch({
    control,
    name: "kpay_id",
  });

  useEffect(() => {
    stamp_duty_fee_field.onChange(
      (+stamp_duty_percentage / 100) * +loan_amount
    );
  }, [stamp_duty_percentage, loan_amount, stamp_duty_fee_field]);

  const handleProcessingFeePercentage = (event) => {
    if (event) {
      if (processing_fees !== "") {
        const calculatedProcessingFeePercentage =
          (+processing_fees / +loan_amount) * 100;
        // setValue(
        //   "processing_percentage",
        //   calculatedProcessingFeePercentage.toFixed(2)
        // );
      }
    }
  };

  const handleProcessingFee = (event) => {
    if (event) {
      if (processing_percentage !== "") {
        const calculatedProcessingFee =
          (+processing_percentage / 100) * +loan_amount;
        //setValue("processing_fees", Math.round(calculatedProcessingFee));
      }
    }
  };

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
            {contract?.category?.id === 2 ?? (
              <Grid item xs={12}>
                <FormInputText
                  control={control}
                  label="Customer Loan Id"
                  name="customer_loan_id"
                  disabled={disabled}
                />
              </Grid>
            )}
            {(mnet_application_id || customer_loan_id || kpay_id) && (
              <Grid item xs={12}>
                {mnet_application_id && (
                  <FormInputText
                    control={control}
                    label="Partner Application Id"
                    name="mnet_application_id"
                    disabled={disabled}
                  />
                )}
                {customer_loan_id && (
                  <FormInputText
                    control={control}
                    label="Partner Application Id"
                    name="customer_loan_id"
                    disabled={disabled}
                  />
                )}
                {kpay_id && (
                  <FormInputText
                    control={control}
                    label="Partner Application Id"
                    name="kpay_id"
                    disabled={disabled}
                  />
                )}
              </Grid>
            )}
            {get(application_fields, "total_amount") && (
              <Grid item xs={12}>
                <FormInputNumber
                  control={control}
                  label="Total Amount/Vehicle Selling Price"
                  name="total_amount"
                  disabled
                />
              </Grid>
            )}
            {get(application_fields, "vehicle_down_payment_ratio") && (
              <Grid item xs={12}>
                <FormInputDecimal
                  control={control}
                  label="Vehicle Down Payment Ratio %"
                  name="vehicle_down_payment_ratio"
                  disabled
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Loan Amount"
                name="loan_amount"
                disabled={disabled}
              />
            </Grid>
            {get(application_fields, "vehicle_down_payment_amount") && (
              <Grid item xs={12}>
                <FormInputNumber
                  control={control}
                  label="Vehicle Down Payment Amount"
                  name="vehicle_down_payment_amount"
                  disabled
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Tenor"
                name="tenor"
                disabled={disabled}
              />
            </Grid>

            <Grid item xs={12}>
              <FormInputDatePicker
                control={control}
                label="Commencement Date"
                name="disbursement_date"
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
                name="interest_rate"
                disabled={disabled}
                {...control.register("interest_rate")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDecimal
                control={control}
                label="Monthly Interest Rate"
                name="monthly_interest_rate"
                disabled={disabled}
                {...control.register("monthly_interest_rate")}
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
                label="Interest First Installment Prorata Interest"
                name="interest_first_installment_prorata_interest"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Monthly Installment"
                disabled
                name="monthly_installment_amount"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDecimal
                control={control}
                label="Stamp Duty %"
                name="stamp_duty_percent"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Stamp Duty Fee"
                disabled
                name="stamp_duty_amount"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDecimal
                control={control}
                label="Processing %"
                name="processing_percent"
                disabled
                onFocus={handleProcessingFeePercentage}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Processing Fee"
                name="processing_amount"
                disabled
                onFocus={handleProcessingFee}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Net Disbursement Amount"
                name="net_disbursed_amount"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Insurance Amount"
                name="insurance_amount"
                disabled
              />
            </Grid>
            {get(application_fields, "down_payment_amount") && (
              <Grid item xs={12}>
                <FormInputNumber
                  control={control}
                  label="Total Down Payment Amount"
                  name="down_payment_amount"
                  disabled
                  rules={{
                    required: application_fields?.down_payment_amount?.required, // Set required dynamically
                  }}
                />
              </Grid>
            )}
            {get(application_fields, "dealer_disbursed_ratio") && (
              <Grid item xs={12}>
                <FormInputNumber
                  control={control}
                  label="Dealer Disbursed Ratio"
                  name="dealer_disbursed_ratio"
                  disabled
                />
              </Grid>
            )}
            {get(application_fields, "dealer_disbursed_amount") && (
              <Grid item xs={12}>
                <FormInputNumber
                  control={control}
                  label="Dealer Disbursed Amount"
                  name="dealer_disbursed_amount"
                  disabled
                />
              </Grid>
            )}
            {get(application_fields, "customer_disbursed_ratio") && (
              <Grid item xs={12}>
                <FormInputNumber
                  control={control}
                  label="Customer Disbursed Ratio"
                  name="customer_disbursed_ratio"
                  disabled
                />
              </Grid>
            )}
            {get(application_fields, "customer_disbursed_amount") && (
              <Grid item xs={12}>
                <FormInputNumber
                  control={control}
                  label="Customer Disbursed Amount"
                  name="customer_disbursed_amount"
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

export default React.memo(LoanInformation);
