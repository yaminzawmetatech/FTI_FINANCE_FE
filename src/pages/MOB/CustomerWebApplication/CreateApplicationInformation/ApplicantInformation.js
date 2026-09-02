import React, { useEffect } from "react";
import { Box, Grid, Skeleton, Button } from "@mui/material";
import Accordion from "../../../../components/Accordion";
import FormInputText from "../../../../components/form/FormInputText";
import { get, intersection } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getNRCTownships } from "../../../../features/nrc/NRCTownship/nrcTownshipSlice";
import FormInputSelect from "../../../../components/form/FormInputSelect";
import { useController, useWatch } from "react-hook-form";
import FormInputDatePicker from "../../../../components/form/FormInputDatePicker";
import { toast } from "react-toastify";
import { MARITAL_STATUS } from "constants/maritalStatus";
import { GENDER } from "constants/Gender";
import { CURRENT_RESIDENTIAL_STATUS } from "constants/currentResidentialStatus";

const FormInputNrc = React.memo(
  ({
    control,
    application_fields = {},
    handleCheckExistingCustomer,
    nrcStates,
    nrcStateLoading,
    application,
  }) => {

    const { field } = useController({
      name: "nrc",
      control,
    });

    const dispatch = useDispatch();

    const nrc_state_id = useWatch({
      control,
      name: "nrc_state_id",
    });

    const nrc_township_id = useWatch({
      control,
      name: "nrc_township_id",
    });
    const nrc_number = useWatch({
      control,
      name: "nrc_number",
    });
    
    const nrc_remark = useWatch({
      control,
      name: "nrc_remark",
    });

    const nrc = useWatch({
      control,
      name: "nrc",
    });

    const old_nrc = useWatch({
      control,
      name: "old_nrc",
    });

    const { field: nrcTownshipField } = useController({
      name: "nrc_township_id",
      control,
    });

    const highestEduBackgroundOptions = [
      { value: "High School", label: "High School" },
      { value: "Diploma", label: "Diploma" },
      { value: "Bachelor's Degree", label: "Bachelor's Degree" },
      { value: "Master's Degree", label: "Master's Degree" },
      { value: "Ph.D.", label: "Ph.D." },
      { value: "Other", label: "Other" },
    ];

    const nrcRemarks = [
      { key: "n", value: "N"},
      {key: "e", value: "E" },
      { key: "p",value: "P"},
      {key: "c",value: "C"}
    ];
    

    const { nrcTownships, isLoading: nrcTownshipLoading } = useSelector(
      (state) => state.nrcTownships
    );

    useEffect(() => {
      if (nrc_state_id) {
        dispatch(
          getNRCTownships({
            n_r_c_state_id: nrc_state_id,
          })
        );
      }
    }, [dispatch, nrc_state_id]);

    useEffect(() => {
      const nrc_state = nrcStates.find((item) => item.id === nrc_state_id);
      const nrc_township = nrcTownships.find(
        (item) => item.id === nrc_township_id
      );
      const nrc =
        nrc_state?.state_code &&
        nrc_township?.township_nrc_code &&
        nrc_remark &&
        nrc_number
          ? `${nrc_state?.state_code || ""}/${
              nrc_township?.township_nrc_code || ""
            }(${nrc_remark || ""})${nrc_number || ""}`
          : "";
      field.onChange(nrc);
    }, [
      field,
      nrcStates,
      nrcTownships,
      nrc_number,
      nrc_remark,
      nrc_state_id,
      nrc_township_id,
    ]);

    const disabled = useWatch({
      control,
      name: "disabled",
    });

    return (
      <>
        <Grid item xs={12}>
          {nrcStateLoading ? (
            <Skeleton variant="rectangular" height={37.13} />
          ) : (
            <FormInputSelect
              control={control}
              options={nrcStates}
              getOptionLabel={(option) => option?.state_code}
              id="id"
              name="nrc_state_id"
              label="NRC State/Division"
              disabled={disabled}
              rules={{
                required: !!!old_nrc && application_fields.nrc.required,
              }}
              onSelect={(value) => {
                nrcTownshipField.onChange("");
              }}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          {nrcTownshipLoading ? (
            <Skeleton variant="rectangular" height={37.13} />
          ) : (
            <FormInputSelect
              control={control}
              options={nrcTownships}
              getOptionLabel={(option) => option?.township_nrc_code}
              id="id"
              name="nrc_township_id"
              label="NRC District/Township"
              disabled={disabled}
              rules={{
                required: !!!old_nrc && application_fields.nrc.required,
              }}
            />
          )}
        </Grid>
        <Grid item xs={12}>
            <FormInputSelect
              control={control}
              options={nrcRemarks}
              getOptionLabel={(option) => option?.value}
              id="value"
              name="nrc_remark"
              label="NRC Remark"
              disabled={disabled}
              rules={{
                required: !!!old_nrc && application_fields.nrc.required,
              }}
            />
        </Grid>
        <Grid item xs={12}>
          <FormInputText
            control={control}
            label="NRC Number"
            name="nrc_number"
            disabled={disabled}
            rules={{
              required: !!!old_nrc && application_fields.nrc.required,
            }}
          />
        </Grid>
        <Grid item xs={7} lg={10} sm={7}>
          <FormInputText control={control} label="NRC" disabled name="nrc" />
        </Grid>
        <Grid item xs={2} lg={2} sm={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleCheckExistingCustomer(nrc)}
            sx={{ width: "80px" }}
            disabled
          >
            Check
          </Button>
        </Grid>
        {/* </Grid> */}
        <Grid item xs={12}>
          <FormInputText
            control={control}
            label="Old NRC"
            name="old_nrc"
            disabled={disabled}
            rules={{
              required: !!!nrc && application_fields.nrc.required,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <FormInputText
            control={control}
            label="Living Period"
            disabled={disabled}
            name="living_period"
          />
        </Grid>

        <Grid item xs={12}>
          <FormInputText
            control={control}
            label="Driving License"
            disabled={disabled}
            name="driving_license"
          />
        </Grid>

        <Grid item xs={12}>
          <FormInputText
            control={control}
            label="Race"
            disabled={disabled}
            name="race"
          />
        </Grid>

        <Grid item xs={12}>
            <FormInputSelect
              control={control}
              options={highestEduBackgroundOptions}
              getOptionLabel={(option) => option?.value}
              id="value"
              name="highest_edu_background"
              label="Highest Edu. Background"
              disabled={disabled}
            />
        </Grid>
      </>
    );
  }
);

const ApplicantInformation = ({
  control,
  application_fields = {},
  handleCheckExistingCustomer,
  nrcStates,
  nrcStateLoading,
  application,
}) => {
  const disabled = useWatch({
    control,
    name: "disabled",
  });

  const { field } = useController({
    name: "age",
    control,
  });

  const date_of_birth = useWatch({
    control,
    name: "date_of_birth",
  });

  useEffect(() => {
    if (date_of_birth) {
      const dob = new Date(date_of_birth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();

      field.onChange(age);
      if (age < 18 || age > 60) {
        toast.warning("Applicant age is " + age + " years.");
      }
    }
  }, [date_of_birth, field]);

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
    "living_period",
  ];
  if (intersection(fields, Object.keys(application_fields)).length) {
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
              {get(application_fields, "applicant_name") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Applicant Name"
                    name="applicant_name"
                    disabled={disabled}
                    rules={{
                      required: application_fields.applicant_name.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "nrc") && (
                <FormInputNrc
                  control={control}
                  application_fields={application_fields}
                  handleCheckExistingCustomer={handleCheckExistingCustomer}
                  nrcStates={nrcStates}
                  nrcStateLoading={nrcStateLoading}
                  application={application}
                />
              )}

              {get(application_fields, "facebook_account") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Facebook Account"
                    disabled={disabled}
                    name="facebook_account"
                    rules={{
                      required: application_fields.facebook_account.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "tiktok_account") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="TikTok Account"
                    disabled={disabled}
                    name="tiktok_account"
                    rules={{
                      required: application_fields.tiktok_account.required,
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
              {get(application_fields, "father_name") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Father's Name"
                    name="father_name"
                    disabled={disabled}
                    rules={{
                      required: application_fields.father_name.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {/* {get(application_fields, "other") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Other"
                    name="other"
                    disabled={disabled}
                  />
                </Grid>
              )} */}
              {get(application_fields, "gender") && (
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={GENDER}
                    getOptionLabel={(option) => option?.value}
                    id="value"
                    name="gender"
                    label="Gender"
                    disabled={disabled}
                    rules={{
                      required: application_fields.gender.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "date_of_birth") && (
                <Grid item xs={12}>
                  <FormInputDatePicker
                    control={control}
                    label="Date of Birth"
                    name="date_of_birth"
                    disabled={disabled}
                    rules={{
                      required: application_fields.date_of_birth.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "age") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Age"
                    disabled
                    name="age"
                    rules={{
                      required: application_fields.age.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "marital_status") && (
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={MARITAL_STATUS}
                    getOptionLabel={(option) => option?.id}
                    id="id"
                    name="marital_status"
                    label="Marital Status"
                    disabled={disabled}
                    rules={{
                      required: application_fields.marital_status.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
               {get(application_fields, "e_mail") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Email"
                    name="e_mail"
                    disabled={disabled}
                    rules={{
                      required: application_fields.e_mail.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "living_phone_number") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Contact Phone Number/ Living Phone Number"
                    name="living_phone_number"
                    disabled={disabled}
                    rules={{
                      required: application_fields.living_phone_number.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "secondary_phone_number") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Secondary Phone Number"
                    disabled={disabled}
                    name="secondary_phone_number"
                    rules={{
                      required:
                        application_fields.secondary_phone_number.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "viber_number") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Viber Phone Number"
                    name="viber_number"
                    disabled={disabled}
                    rules={{
                      required: application_fields.viber_number.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "current_living_period") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Current Living Period"
                    name="current_living_period"
                    disabled={disabled}
                    rules={{
                      required: application_fields.current_living_period.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "current_residential_status") && (
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={CURRENT_RESIDENTIAL_STATUS}
                    getOptionLabel={(option) => option?.id}
                    id="id"
                    label="Current Residential Status"
                    name="current_residential_status"
                    disabled={disabled}
                    rules={{
                      required: application_fields.current_residential_status.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "other") && (
                <Grid item xs={12}>
                  <FormInputText
                    multiline
                    control={control}
                    label="Other"
                    name="other"
                    disabled={disabled}
                    rules={{
                      required: application_fields.other.required, // Set required dynamically
                    }}
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
              )}
            </Grid>
          </Grid>
        </Box>
      </Accordion>
    );
  }
  return <></>;
};

export default React.memo(ApplicantInformation);
