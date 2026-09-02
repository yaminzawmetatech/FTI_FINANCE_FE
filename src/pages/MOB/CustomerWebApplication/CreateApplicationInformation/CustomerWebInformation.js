import React from "react";
import { Box, Grid } from "@mui/material";
import Accordion from "../../../../components/Accordion";
import FormInputText from "../../../../components/form/FormInputText";
import { get, intersection } from "lodash";
import { useWatch } from "react-hook-form";
import FormInputSelect from "components/form/FormInputSelect";

const CustomerWebinformation = ({
  control,
  application_fields = {},
  users,
}) => {
  const disabled = useWatch({
    control,
    name: "disabled",
  });

  const fields = [
    "region",
    "customer_web_category_name",
    "mediator_id",
    "school_name",
    "yearly_school_fees",
    "current_address",

  ];

  if (intersection(fields, Object.keys(application_fields)).length) {
    return (
      <Accordion title="Customer Web Information">
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
              {get(application_fields, "region") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Region"
                    name="region"
                    disabled={disabled}
                    rules={{
                      required: application_fields.region?.required,
                    }}
                  />
                </Grid>
              )}

              {get(application_fields, "customer_web_category_name") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="customer Web Category"
                    name="customer_web_category_name"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.customer_web_category_name?.required,
                    }}
                  />
                </Grid>
              )}
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
              {get(application_fields, "mediator_id") && (
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={users ?? []}
                    getOptionLabel={(option) => option?.user_name}
                    id="id"
                    name="mediator_id"
                    label="Mediator"
                    disabled
                  />
                </Grid>
              )}
              {get(application_fields, "school_name") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="school Name"
                    name="school_name"
                    disabled={disabled}
                    rules={{
                      required: application_fields.school_name?.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "yearly_school_fees") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="School Fees"
                    name="yearly_school_fees"
                    disabled={disabled}
                    rules={{
                      required: application_fields.yearly_school_fees?.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "current_address") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Customer Web Current Address"
                    name="current_address"
                    disabled={disabled}
                    rules={{
                      required: application_fields.current_address?.required,
                    }}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Box>
      </Accordion>
    );
  }
  return <></>;
};

export default React.memo(CustomerWebinformation);
