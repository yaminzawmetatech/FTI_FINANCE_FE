import React, { useEffect, useCallback } from "react";
import { Box, FormControl, FormLabel, Grid, Button } from "@mui/material";
import FormInputNumber from "components/form/FormInputNumber";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import FormInputText from "components/form/FormInputText";
import Accordion from "components/Accordion";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import FormInputDateTimePicker from "components/form/FormInputDateTimePicker";
import { useController, useWatch } from "react-hook-form";
import FormInputDecimal from "components/form/FormInputDecimal";

const ApplicationDownPaymentGeneral = ({
  control,
  getValues,
  setValue,
  downPayment,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const downpayment_amount = useWatch({
    control,
    name: "downpayment_amount",
  });

  const amount_paid = useWatch({
    control,
    name: "amount_paid",
  });

  useEffect(() => {
    if (downpayment_amount && amount_paid) {
      const outstandingAmt = downpayment_amount - amount_paid;

      setValue("outstanding_amount", outstandingAmt > 0 ? outstandingAmt : 0);

      const exceedAmt = amount_paid - downpayment_amount;

      setValue("exceed_amount", exceedAmt > 0 ? exceedAmt : 0);
    }
  }, [downpayment_amount, amount_paid, setValue]);

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
              <FormInputText
                multiline
                control={control}
                label="Description"
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
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Down Payment"
                name="downpayment_amount"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDatePicker
                control={control}
                label="Payment Date"
                name="payment_date"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Amount"
                name="amount_paid"
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
                  <FormInputDecimal
                    disabled
                    control={control}
                    label="Outstanding Payment"
                    name="outstanding_amount"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputDecimal
                    disabled
                    control={control}
                    label="Exceed Amount"
                    name="exceed_amount"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Created By"
                    name="created_user.user_name"
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputDateTimePicker
                    control={control}
                    label="Created Date"
                    name="created_at"
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Modified By"
                    name="modified_user.user_name"
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputDateTimePicker
                    control={control}
                    label="Modified Date"
                    name="updated_at"
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

export default React.memo(ApplicationDownPaymentGeneral);
