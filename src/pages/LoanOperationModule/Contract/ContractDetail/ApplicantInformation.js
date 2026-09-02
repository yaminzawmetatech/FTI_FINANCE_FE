import React, { useEffect, useMemo } from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import Accordion from "../../../../components/Accordion";
import FormInputText from "../../../../components/form/FormInputText";
import { get, intersection } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getNRCStates } from "../../../../features/nrc/NRCState/nrcStateSlice";
import { getNRCTownships } from "../../../../features/nrc/NRCTownship/nrcTownshipSlice";
import FormInputSelect from "../../../../components/form/FormInputSelect";
import { useController, useWatch } from "react-hook-form";
import { getNRCRemarks } from "../../../../features/blacklistCustomer/NRCRemarkSlice";
import FormInputDatePicker from "../../../../components/form/FormInputDatePicker";
import { toast } from "react-toastify";


const ApplicantInformation = ({ control}) => {
  const disabled = useWatch({
    control,
    name: "disabled",
  });

  const fields = [
    "applicant_name",
    "nrc",
    "father_name",
    "other",
    "gender",
    "date_of_birth",
    "age",
    "marital_status",
    "living_phone_number",
    "viber_number",
    'living_period'
  ];
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
                    control={control}
                    label="Customer Id"
                    name="customer_id"
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Customer Name"
                    name="customer_name"
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                  multiline
                  control={control}
                  label="Current Address"
                  name="current_address"
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
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="NRC"
                    name="nrc_or_csc"
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
