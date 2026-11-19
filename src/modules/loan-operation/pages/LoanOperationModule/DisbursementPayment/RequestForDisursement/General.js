import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputText from "components/form/FormInputText";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import { useDispatch } from "react-redux";
import FormInputDateTimePicker from "components/form/FormInputDateTimePicker";
import FormInputSelect from "components/form/FormInputSelect";

const General = ({ control, selectedBooking, setValue, customerBanks }) => {
  const handleChange = (name, value) => {
    // Handle onChange for each input field here

    setValue(name, value); // Update form state
  };

  return (
    <Accordion title="General">
      <Box sx={{ mt: 1 }}>
        <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-start">
          <Grid container item spacing={2} xs={12} sm={6} justifyContent="flex-start" alignItems="flex-start">
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Commission"
                name="commission"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Commission Amount"
                name="commission_amount"

                disabledd
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDateTimePicker
                control={control}
                label="Approved Date"
                name="approved_date"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Approved By"
                name="approved_by"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Dealer Name"
                name="dealer_name"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Dealer Bank Account No."
                name="dealer_bank_account_no"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Dealer Bank Account Name"
                name="dealer_bank_account_name"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Dealer Bank Payment Channel"
                name="dealer_bank_payment_channel"
              />
            </Grid>
          </Grid>

          <Grid container item spacing={2} xs={12} sm={6} justifyContent="flex-start" alignItems="flex-start">
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Created By"
                name="created_by"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Modified By"
                name="modified_by"
                disabled

              />
            </Grid>
            {/* <Grid item xs={12}>
              <input type="checkbox" style={{ width: "22px", height: "15px" }} disabled checked={selectedBooking?.active} /> Active
            </Grid> */}
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Customer Bank Account No."
                name="customer_bank_account_no"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Customer Bank Account Name"
                name="customer_bank_account_name"
              />
            </Grid>
            <Grid item xs={12}>

              <FormInputSelect
                control={control}
                options={customerBanks}
                getOptionLabel={(option) => option?.name}
                id="id"
                name="customer_bank_payment_channel_id"
                label="Customer Bank Payment Channel"
              // disabled={disabled}
              />

            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(General);
