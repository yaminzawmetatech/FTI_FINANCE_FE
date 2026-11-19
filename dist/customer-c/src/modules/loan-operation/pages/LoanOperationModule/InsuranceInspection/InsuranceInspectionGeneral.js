import React, { useEffect } from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputText from "components/form/FormInputText";
import FormInputSelect from "components/form/FormInputSelect";
import { useSelector } from "react-redux";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import { useWatch } from "react-hook-form";

const InsuranceInspectionGeneral = ({
  control,
  insuranceCompanies,
  insuranceCompaniesLoading,
  setValue
}) => {

  const disabled = useWatch({
    control,
    name: "disabled",
  });

  const insurance_company_id = useWatch({
    control,
    name: "insurance_company_id"
  })

  useEffect(() => {
    if (insurance_company_id && insuranceCompanies?.length > 0) {
      const selectedCompany = insuranceCompanies.find(
        (item) => item.id === insurance_company_id
      );

      if (selectedCompany) {
        setValue("email_code", selectedCompany?.email || "");
      }
    }
  }, [insurance_company_id, insuranceCompanies, setValue]);


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
                name="application.application_id"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              {insuranceCompaniesLoading ? (
                <Skeleton variant="rectangular" height={37.13} />
              ) : (
                <FormInputSelect
                  control={control}
                  options={insuranceCompanies ?? []}
                  getOptionLabel={(option) => option?.name}
                  id="id"
                  name="insurance_company_id"
                  label="Insurance Company"
                  disabled={disabled}
                />
              )}
            </Grid>
            <Grid item xs={7} lg={10} sm={7}>
              <FormInputDatePicker
                control={control}
                label="Requested Date"
                name="requested_date"
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={7} lg={10} sm={7}>
              <FormInputDatePicker
                control={control}
                label="Conducted Date"
                name="conducted_date"
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
              <FormInputText
                control={control}
                disabled={disabled}
                label="Email Code"
                name="email_code"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                multiline
                control={control}
                name="remark"
                label="Remark"
                sx={{
                  pt: 1,
                  textarea: {
                    minHeight: "100px",
                    maxHeight: "100px",
                    overflow: "auto !important",
                  },
                }}
                disabled={disabled}
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
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(InsuranceInspectionGeneral);
