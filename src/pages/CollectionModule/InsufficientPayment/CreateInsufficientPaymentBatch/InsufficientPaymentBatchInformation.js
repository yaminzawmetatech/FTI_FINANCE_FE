import React from "react";
import { Box, Grid } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputDecimal from "components/form/FormInputDecimal";
import { useParams } from "react-router-dom";
import FormInputNumber from "components/form/FormInputNumber";

const insufficientPaymentBatchInformation = ({ control }) => {

  return (
    <Accordion title="Insufficient Payment Contracts Information">
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
              <FormInputNumber
                control={control}
                label="Total Contracts Count"
                name="total_count"
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
             <Grid item xs={12}>
              <FormInputDecimal
                control={control}
                label="Total Waived Amount"
                name="total_waived_amount"
                disabled
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(insufficientPaymentBatchInformation);
