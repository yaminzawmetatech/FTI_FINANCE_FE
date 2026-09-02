import React, { useMemo } from "react";
import { Box, Grid } from "@mui/material";
import FormInputText from "../../../../../components/form/FormInputText";
import Accordion from "../../../../../components/Accordion";
import { useWatch } from "react-hook-form";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import FormInputCheckbox from "components/form/FormInputCheckbox";

const ProcessAfterFullRepayment = ({ control, vehicles }) => {
  const disabled = useWatch({
    control,
    name: "disabled",
  });

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
        <Accordion title="Process after full repayment">
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
                  <FormInputDatePicker
                    control={control}
                    label="From Loan Dept Returning Document Date" // Updated label >>  From Loan Dept Returning Document Date
                    name="return_document_date"
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputDatePicker
                    control={control}
                    label="Repayment GRD Informed Date"
                    name="repayment_grd_informed_date"
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputDatePicker
                    control={control}
                    label="Repayment GRD Received Date"
                    name="repayment_grd_received_date"
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Serial Number"
                    name="serial_no"
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputDatePicker
                    control={control}
                    label="Full Repayment Date"
                    name="full_repayment_date"
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
                  <FormInputCheckbox
                    disabled={disabled}
                    control={control}
                    label="Repayment Owner Book"
                    name="repayment_owner_book"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputCheckbox
                    disabled={disabled}
                    control={control}
                    label="Repayment Insurance Premium Book"
                    name="repayment_insurance_premium_book"
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

export default React.memo(ProcessAfterFullRepayment);
