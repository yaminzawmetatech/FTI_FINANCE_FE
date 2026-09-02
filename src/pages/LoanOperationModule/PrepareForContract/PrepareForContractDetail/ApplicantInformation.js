import React from "react";
import { Box, Grid } from "@mui/material";
import Accordion from "../../../../components/Accordion";
import FormInputText from "../../../../components/form/FormInputText";
import { useWatch } from "react-hook-form";

const ApplicantInformation = ({ control }) => {
  const disabled = useWatch({
    control,
    name: "disabled",
  });

  return (
    <Accordion title="Applicant Information">
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
                multiline
                control={control}
                label="Current Address"
                name="address_full_address"
                disabled={disabled}
                sx={{
                  pt: 1,
                  textarea: {
                    minHeight: "100px",
                    maxHeight: "100px",
                    overflow: "auto !important",
                  },
                }}
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
              <FormInputText
                control={control}
                label="Contact Phone Number/ Living Phone Number"
                name="living_phone_number"
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Viber Phone Number"
                name="viber_number"
                disabled={disabled}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(ApplicantInformation);
