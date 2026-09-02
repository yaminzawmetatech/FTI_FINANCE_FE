import React from "react";
import { Box, Grid } from "@mui/material";
import Accordion from "components/Accordion";
import { useWatch } from "react-hook-form";
import FormInputDecimal from "components/form/FormInputDecimal";
import { useParams } from "react-router-dom";

const DisbursementInformation = ({ control, stampDutyPayments }) => {
  const disabled = useWatch({
    control,
    name: "disabled",
  });

  const { route, mode } = useParams();

  return (
    <Accordion title="Stamp Duty Information">
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
              <FormInputDecimal
                control={control}
                label="Actual Amount"
                name="actual_amount"
                disabled
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormInputDecimal
                control={control}
                label={<span className="required">Payment Amount</span>}
                name="payment_amount"
                disabled={
                  route === "StampDutySettlement"
                    ? stampDutyPayments?.is_settled === "1"
                      ? disabled
                      : undefined
                    : mode === "view" ||
                      stampDutyPayments?.stamp_duty_status === "approved" ||
                      stampDutyPayments?.stamp_duty_status === "rejected"
                    ? disabled
                    : undefined
                }
                rules={{ required: true }}
              />
            </Grid> */}
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
                label="Exceed Amount"
                name="exceed_amount"
                disabled
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(DisbursementInformation);
