import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputText from "components/form/FormInputText";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import { useWatch } from "react-hook-form";
import FormInputDecimal from "components/form/FormInputDecimal";
import FormInputSelect from "components/form/FormInputSelect";

const General = ({ control, selectedBooking, setValue }) => {
  const handleChange = (name, value) => {
    // Handle onChange for each input field here

    setValue(name, value); // Update form state
  };

  const disabled = useWatch({
    control,
    name: "disabled",
  });

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
                control={control}
                label="Application ID"
                name="application_id"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Applicant Name"
                name="applicant_name"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Category"
                name="category"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Sub Category"
                name="sub_category"
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
                label="Owner Name"
                name="owner_name"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDatePicker
                control={control}
                label="Approved Date"
                name="approved_date"
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Approved By"
                name="approved_by"
                disabled
                defaultValue={selectedBooking?.approved_by}
                onChange={(e) => handleChange("approved_by", e.target.value)}
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
              <FormInputDecimal
                control={control}
                label="Vehicle Selling Price/Total Amount"
                name="total_amount"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDecimal
                control={control}
                label="Vehicle Down Payment Amount"
                name="vehicle_down_payment_amount"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDecimal
                control={control}
                label="Financed Amount"
                name="loan_amount"
                disabled
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormInputDecimal
                control={control}
                label="Customer Disbursed Amount"
                name="customer_disbursed_amount"
                disabled
            />
            </Grid> */}
            <Grid item xs={12}>
              <FormInputDecimal
                control={control}
                label="Amount"
                name="total_amount"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Commission"
                name="commission"
                defaultValue={selectedBooking?.commission}
                onChange={(e) => handleChange("commission", e.target.value)}
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Commission Amount"
                name="commission_amount"
                defaultValue={selectedBooking?.commission_amount}
                onChange={(e) =>
                  handleChange("commission_amount", e.target.value)
                }
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Created By"
                name="created_by"
                disabled
                defaultValue={selectedBooking?.created_by}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Modified By"
                name="modified_by"
                disabled
                defaultValue={selectedBooking?.modified_by}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <input type="checkbox" style={{ width: "22px", height: "15px" }} disabled checked={selectedBooking?.active} /> Active
            </Grid> */}
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(General);
