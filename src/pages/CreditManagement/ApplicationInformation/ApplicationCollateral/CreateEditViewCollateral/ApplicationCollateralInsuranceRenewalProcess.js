import React, { useMemo } from "react";
import { Box, Grid } from "@mui/material";
import Accordion from "../../../../../components/Accordion";
import { useWatch } from "react-hook-form";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import FormInputCheckbox from "components/form/FormInputCheckbox";

const ApplicationCollateralInsuranceRenewalProcess = ({
  control,
  collateralTypes,
  vehicles,
  auth,
}) => {
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
        <Accordion title="Collateral's Insurance Renewal Process">
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
                    label="Insurance Renewal Due Date"
                    name="insurance_renewal_date"
                    disabled={
                      disabled ||
                      !(
                        auth?.user_group === "Loan Operation Manager" ||
                        auth?.user_group === "Loan Operation Staff" ||
                        auth?.is_super === true
                      )
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputDatePicker
                    control={control}
                    label="Insurance Notice Date to Customer (before 1 month ahead):"
                    name="insurance_notice_date"
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
                    label="To Inform Customer"
                    name="is_insurance_informed_to_customer"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputDatePicker
                    disabled={disabled}
                    control={control}
                    label="Insurance Appointment Date"
                    name="insurance_appointment_date"
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

export default React.memo(ApplicationCollateralInsuranceRenewalProcess);
