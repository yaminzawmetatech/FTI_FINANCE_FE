import React from "react";
import { Box, Grid } from "@mui/material";
import FormInputText from "components/form/FormInputText";
import Accordion from "components/Accordion";
import { useWatch } from "react-hook-form";

const ApplicationCollateralGeneral = ({ control }) => {

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
        <Accordion title="General">
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
                  <FormInputText
                    disabled
                    control={control}
                    label="Application ID"
                    name="application_id"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    disabled
                    control={control}
                    label="Name"
                    name="name"
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
                    label="Contact Number"
                    name="contact_number"
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Status"
                    name="status"
                    disabled
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

export default React.memo(ApplicationCollateralGeneral);
