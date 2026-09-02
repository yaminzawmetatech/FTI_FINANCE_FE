import React from "react";
import { Box, Grid } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputText from "components/form/FormInputText";
import FormInputSelect from "components/form/FormInputSelect";
import { useSelector } from "react-redux";

const InitialPaymentCalGeneral = ({ control }) => {

  const { subCategories } = useSelector(
    (state) => state.subCategories
  );

  const { dealers } = useSelector(
    (state) => state.dealers
  );

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
                disabled
                label="Loan Term Duration"
                name="loan_term_duration"
              />
            </Grid>
            <Grid item xs={12}>
                  <FormInputSelect
                  control={control}
                  options={dealers}
                  getOptionLabel={(option) => option?.name}
                  id="id"
                  name="dealer_id"
                  label="Dealer"
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
                label="Category"
                name="category"
              />
            </Grid>
            <Grid item xs={12}>
            <FormInputSelect
                  control={control}
                  options={subCategories}
                  getOptionLabel={(option) => option?.name}
                  id="id"
                  name="sub_category_id"
                  label="Sub Category"
                  disabled
                />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                disabled
                label="Status"
                name="status"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Loan Staff Name"
                name="created_by"
                disabled
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(InitialPaymentCalGeneral);
