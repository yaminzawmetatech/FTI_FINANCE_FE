import React from "react";
import { Box, Grid } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputText from "components/form/FormInputText";
import FormInputSelect from "components/form/FormInputSelect";

const InHouseSurveyGeneral = ({ control }) => {
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
                disabled
                control={control}
                label="Name"
                name="name"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputSelect
                control={control}
                options={[
                  {
                    name: "In House Survey",
                    id: "inhouse_survey",
                  },
                ]}
                getOptionLabel={(option) => option.name}
                id="id"
                name="survey_type"
                label="Survey Type"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText disabled control={control} label="CMCO ID" name="cmco_id" />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="CMCO Name"
                name="cmco_user.user_name"
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
              <FormInputText
                control={control}
                disabled
                label="IHCO ID"
                name="ihco_id"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="IHCOT Name"
                name="ihco_user.user_name"
                disabled
              />
            </Grid>

            <Grid item xs={12}>
              <FormInputSelect
                options={[
                  {
                    name: "Conducting",
                    id: "conducting",
                  },
                  {
                    name: "Skipped",
                    id: "skipped",
                  },
                  {
                    name: "Completed",
                    id: "completed",
                  },
                ]}
                id="id"
                getOptionLabel={(option) => option.name}
                control={control}
                label="Investigation Status"
                name="investigation_status"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                disabled
                multiline
                control={control}
                label="Remark"
                name="remark"
                sx={{
                  pt: 1,
                  textarea: {
                    minHeight: "100px",
                    maxHeight: "calc(100vh - 200px)",
                    overflow: "auto !important",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(InHouseSurveyGeneral);
