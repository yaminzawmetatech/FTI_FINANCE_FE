import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputText from "components/form/FormInputText";
import { useWatch } from "react-hook-form";
import FormInputNumber from "components/form/FormInputNumber";

const LoanInformation = ({ control, setValue }) => {

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
             {/* <label
              style={{
                fontWeight: "bold",
                marginTop: "26px",
                marginBottom: "4px",
                paddingLeft: "12px",
              }}
            >
              Loan Information
            </label> */}
          
            {/* <Grid item xs={12}>
              <FormInputDecimal
                control={control}
                label="Received Amount"
                name="received_amount"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDecimal
                control={control}
                label="Outstanding TTL Amount"
                name="outstanding_ttl_amount"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDecimal
                control={control}
                label="Outstanding Principal(1)"
                name="outstanding_principal"
                disabled
              />
            </Grid> */}
             <label
              style={{
                fontWeight: "bold",
                marginTop: "26px",
                marginBottom: "4px",
                paddingLeft: "12px",
              }}
            >
              Minimum Installment
            </label>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Loan Amount"
                name="loan_amount"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="ET Type"
                name="et_type"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Minimum Tenor"
                name="min_installment_tenor"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Minimum Installment"
                name="min_installment_mi_before_6"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Received Min. Installment"
                name="received_mi_before_6"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Outstanding Min. Installment Amount"
                name="outstanding_mi_amount"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Outstanding Min. Inst. Principal"
                name="outstanding_principal_before"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Outstanding Min. Inst. Interest"
                name="outstanding_interest_before"
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
             <label
              style={{
                fontWeight: "bold",
                marginTop: "26px",
                marginBottom: "4px",
                paddingLeft: "12px",
              }}
            >
              Interest
            </label>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Interest on Promise Month"
                name="interest_on_promise_month"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Interest Amount Per Day"
                name="interest_amount_per_day"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="No. Days Till Promise Date"
                name="no_days_till_promise_date"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Interest Amount"
                name="interest_amount"
                disabled
              />
            </Grid>
            <label
              style={{
                fontWeight: "bold",
                marginTop: "26px",
                marginBottom: "4px",
                paddingLeft: "12px",
              }}
            >
              Customer Payment Detail
            </label>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="ET Base"
                name="et_base"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="ET Fees %"
                name="et_percent"
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Fees Amount"
                name="et_value"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Interest Amount"
                name="interest_amount"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Amount to Pay"
                name="outstanding_ttl_amount"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Collected Collection Fee"
                name="collected_collection_fee"
             />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="System Collection Fee"
                name="penalty_fee"
                disabled
             />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Amount to Pay(Without Penalty)"
                name="outstanding_without_penalty"
             />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(LoanInformation);
