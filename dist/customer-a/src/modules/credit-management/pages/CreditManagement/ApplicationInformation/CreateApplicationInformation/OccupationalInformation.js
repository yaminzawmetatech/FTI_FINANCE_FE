import React, { useEffect, useMemo } from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputText from "components/form/FormInputText";
import { get, intersection } from "lodash";
import { useWatch } from "react-hook-form";
import FormInputSelect from "components/form/FormInputSelect";
import { useDispatch, useSelector } from "react-redux";
import FormInputNumber from "components/form/FormInputNumber";
import {
  OCCUPATIONS,
  TYPE_OF_EMPLOYMENT,
  TYPE_OF_PROOF_OF_INCOME,
} from "constants/occupationalInformation";
import { getMainBusinessCategories } from "modules/administration/slices/mainbusinesscategorySlice";
import { getSubBusinessCategories } from "modules/administration/slices/subbusinesscategorySlice";
import { getTypeofBusinesses } from "modules/administration/slices/typeofbusinessSlice";
import { getAllNameOfBusinesses } from "modules/loan-operation/slices/nameOfBusinessSlice";

const FormInputTypeOfBusiness = React.memo(
  ({
    control,
    application_fields = {},
    typeofBusinesses,
    isTypeofBusinessesLoading,
  }) => {
    const disabled = useWatch({
      control,
      name: "disabled",
    });

    if (isTypeofBusinessesLoading) {
      return (
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={50} />
        </Grid>
      );
    }

    return (
      <Grid item xs={12}>
        <FormInputSelect
          control={control}
          options={typeofBusinesses}
          getOptionLabel={(option) => option?.name}
          id="id"
          name="type_of_business_id"
          label="Type of Business"
          disabled={disabled}
          rules={{
            required: application_fields.type_of_business_id.required,
          }}
        />
      </Grid>
    );
  }
);

const FormInputMainBusinessCategory = React.memo(
  ({
    control,
    application_fields = {},
    mainBusinessCategories,
    isMainBusinessCategoriesLoading,
  }) => {
    const disabled = useWatch({
      control,
      name: "disabled",
    });

    if (isMainBusinessCategoriesLoading) {
      return (
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={50} />
        </Grid>
      );
    }

    return (
      <Grid item xs={12}>
        <FormInputSelect
          control={control}
          options={mainBusinessCategories}
          getOptionLabel={(option) => option?.bc1_name}
          id="id"
          label="Business Category 1/ Main Business Category"
          name="main_business_category_id"
          disabled={disabled}
          rules={{
            required: application_fields.main_business_category_id.required,
          }}
        />
      </Grid>
    );
  }
);

const FormInputSubBusinessCategory = React.memo(
  ({
    control,
    application_fields = {},
    subBusinessCategories,
    isSubBusinessCategoriesLoading,
  }) => {
    const main_business_category_id = useWatch({
      control,
      name: "main_business_category_id",
    });

    const subBusinessCategoriesByMainBusinessCategoryId = useMemo(
      () =>
        subBusinessCategories.filter(
          (item) =>
            item?.main_business_category_id === main_business_category_id
        ),
      [subBusinessCategories, main_business_category_id]
    );

    const disabled = useWatch({
      control,
      name: "disabled",
    });

    if (isSubBusinessCategoriesLoading) {
      return (
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={50} />
        </Grid>
      );
    }

    return (
      <Grid item xs={12}>
        <FormInputSelect
          control={control}
          options={subBusinessCategoriesByMainBusinessCategoryId}
          getOptionLabel={(option) => option?.bc2_name}
          id="id"
          label="Business Category 2/ Sub Business Category"
          name="sub_business_category_id"
          disabled={disabled}
          rules={{
            required: application_fields.sub_business_category_id.required,
          }}
        />
      </Grid>
    );
  }
);

const OccupationalInformation = ({
  control,
  application_fields = {},
  setValue
  // typeofBusinesses,
  // isTypeofBusinessesLoading,
  // mainBusinessCategories,
  // isMainBusinessCategoriesLoading,
  // subBusinessCategories,
  // isSubBusinessCategoriesLoading,
}) => {
  const dispatch = useDispatch();

  const disabled = useWatch({
    control,
    name: "disabled",
  });

  const { nameOfBusinesses, isLoading: isNameOfBusinessesLoading } =
    useSelector((state) => state.nameOfBusinesses);

  const name_of_emp_or_business_id = useWatch({
    control,
    name: "name_of_emp_or_business_id",
  });

  useEffect(() => {
    dispatch(getAllNameOfBusinesses());
  }, [dispatch]);

  useEffect(() => {
    if (name_of_emp_or_business_id) {
      const nameOfBusiness = nameOfBusinesses.find(
        (item) => item.id === name_of_emp_or_business_id
      );
      setValue("name_of_emp_or_business", nameOfBusiness?.name);
    }
  }, [nameOfBusinesses,name_of_emp_or_business_id]);

  const fields = [
    "employment_period_years",
    "employment_period_months",
    "type_of_proof_of_income",
    "type_of_employment",
    "type_of_business_id",
    "main_business_category_id",
    "sub_business_category_id",
    "occupation",
    "name_of_emp_or_business",
    "detail_of_business",
    "title_position",
    "monthly_income",
    "estimate_monthly_income_ratio",
    "estimate_income_calculation_reference",
    "estimate_income_calculation_remark",
    "office_land_line_number",
    "second_business_job",
    "second_business_job_income",
  ];

  const { typeofBusinesses, isTypeofBusinessesLoading } = useSelector(
    (state) => state.typeofBusinesses
  );

  const { mainBusinessCategories, isMainBusinessCategoriesLoading } =
    useSelector((state) => state.mainBusinessCategories);

  const { subBusinessCategories, isSubBusinessCategoriesLoading } = useSelector(
    (state) => state.subBusinessCategories
  );

  useEffect(() => {
    dispatch(getMainBusinessCategories());
    dispatch(getSubBusinessCategories());
    dispatch(getTypeofBusinesses());
  }, [dispatch]);

  if (intersection(fields, Object.keys(application_fields)).length) {
    return (
      <Accordion title="Occupational Information">
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
              {get(application_fields, "employment_city") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Employment City"
                    name="employment_city"
                    disabled={disabled}
                    rules={{
                      required: application_fields.employment_city.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "employment_township") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Employment Township"
                    name="employment_township"
                    disabled={disabled}
                    rules={{
                      required: application_fields.employment_township.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "employment_period_years") && (
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Employment Period Year"
                    name="employment_period_years"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.employment_period_years.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "employment_period_months") && (
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Employment Period Month"
                    name="employment_period_months"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.employment_period_months.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {/* {get(application_fields, "type_of_proof_of_income") && ( */}
              <Grid item xs={12}>
                <FormInputSelect
                  control={control}
                  options={TYPE_OF_PROOF_OF_INCOME}
                  getOptionLabel={(option) => option?.value}
                  id="value"
                  label="Type of Proof of Income"
                  name="type_of_proof_of_income"
                  disabled={disabled}
                  // rules={{
                  //   required: application_fields.type_of_proof_of_income.required, // Set required dynamically
                  // }}
                />
              </Grid>
              {/* )} */}
              {get(application_fields, "type_of_employment") && (
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={TYPE_OF_EMPLOYMENT}
                    getOptionLabel={(option) => option?.value}
                    id="value"
                    label="Type of Employment"
                    name="type_of_employment"
                    disabled={disabled}
                    rules={{
                      required: application_fields.type_of_employment.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "department") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Department"
                    name="department"
                    disabled={disabled}
                    rules={{
                      required: application_fields.department.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "type_of_business_id") && (
                <FormInputTypeOfBusiness
                  control={control}
                  application_fields={application_fields}
                  typeofBusinesses={typeofBusinesses}
                  isTypeofBusinessesLoading={isTypeofBusinessesLoading}
                />
              )}
              {get(application_fields, "main_business_category_id") && (
                <FormInputMainBusinessCategory
                  control={control}
                  application_fields={application_fields}
                  mainBusinessCategories={mainBusinessCategories}
                  isMainBusinessCategoriesLoading={
                    isMainBusinessCategoriesLoading
                  }
                />
              )}
              {get(application_fields, "sub_business_category_id") && (
                <FormInputSubBusinessCategory
                  control={control}
                  application_fields={application_fields}
                  subBusinessCategories={subBusinessCategories}
                  isSubBusinessCategoriesLoading={
                    isSubBusinessCategoriesLoading
                  }
                />
              )}
              {get(application_fields, "occupation") && (
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={OCCUPATIONS}
                    getOptionLabel={(option) => option?.value}
                    id="value"
                    label="Occupation"
                    name="occupation"
                    disabled={disabled}
                    rules={{
                      required: application_fields.occupation.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "name_of_emp_or_business") && (
                <Grid item xs={12}>
                  {isNameOfBusinessesLoading ? (
                    <Skeleton variant="rectangular" height={37.13} />
                  ) : (
                    <FormInputSelect
                      control={control}
                      options={nameOfBusinesses ?? []}
                      getOptionLabel={(option) => option?.name}
                      id="id"
                      label="Select Name Of Business (Company)"
                      name="name_of_emp_or_business_id"
                      disabled={disabled}
                    />
                  )}
                </Grid>
              )}
              {get(application_fields, "name_of_emp_or_business") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Name of Business"
                    name="name_of_emp_or_business"
                    disabled={disabled || name_of_emp_or_business_id !== null}
                    rules={{
                      required:
                        application_fields.name_of_emp_or_business.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "employment_address") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Employment Address"
                    name="employment_address"
                    disabled={disabled}
                    rules={{
                      required: application_fields.employment_address.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "office_land_line_number") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Office Land Line Number"
                    name="office_land_line_number"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.office_land_line_number.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "second_business_job") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Second Business/Job"
                    name="second_business_job"
                    disabled={disabled}
                    rules={{
                      required: application_fields.second_business_job.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "second_business_job_income") && (
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Second Business/Job Income"
                    name="second_business_job_income"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.second_business_job_income.required,
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
              {get(application_fields, "detail_of_business") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Detail of Business"
                    name="detail_of_business"
                    disabled={disabled}
                    rules={{
                      required: application_fields.detail_of_business.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "title_position") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Title/Position"
                    name="title_position"
                    disabled={disabled}
                    rules={{
                      required: application_fields.title_position.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "monthly_income") && (
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Monthly Income"
                    name="monthly_income"
                    disabled={disabled}
                    rules={{
                      required: application_fields.monthly_income.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "monthly_income_ratio") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Monthly Income Ratio"
                    name="monthly_income_ratio"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.monthly_income_ratio.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "estimate_monthly_income") && (
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Estimate Monthly Income"
                    name="estimate_monthly_income"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.estimate_monthly_income?.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "estimate_monthly_income_ratio") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Estimate Monthly Income Ratio"
                    name="estimate_monthly_income_ratio"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.estimate_monthly_income_ratio
                          .required,
                    }}
                  />
                </Grid>
              )}
              {get(
                application_fields,
                "estimate_income_calculation_remark"
              ) && (
                <Grid item xs={12}>
                  <FormInputText
                    multiline
                    control={control}
                    label="Estimate Income Calculation Remark"
                    name="estimate_income_calculation_remark"
                    disabled={disabled}
                    sx={{
                      pt: 1,
                      textarea: {
                        minHeight: "200px",
                        maxHeight: "200px",
                        overflow: "auto !important",
                      },
                    }}
                    rules={{
                      required:
                        application_fields.estimate_income_calculation_remark
                          .required,
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

export default React.memo(OccupationalInformation);
