import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import FormInputText from "../../../../../components/form/FormInputText";
import Accordion from "../../../../../components/Accordion";
import { useWatch } from "react-hook-form";
import FormInputSelect from "components/form/FormInputSelect";
import { getTypeofBusinesses } from "features/typeofbusiness/typeofbusinessSlice";
import { getMainBusinessCategories } from "features/mainbusinesscategory/mainbusinesscategorySlice";
import { getSubBusinessCategories } from "features/subbusinesscategory/subbusinesscategorySlice";
import FormInputNumber from "components/form/FormInputNumber";

const ApplicationJointApplicantOccupation = ({
  control,
  setValue
}) => {
  const dispatch = useDispatch();

  const { typeofBusinesses } =
    useSelector((state) => state.typeofBusinesses);

  const { mainBusinessCategories } = useSelector((state) => state.mainBusinessCategories);

  const { subBusinessCategories } = useSelector((state) => state.subBusinessCategories);

  useEffect(() => {
    dispatch(getTypeofBusinesses());
    dispatch(getMainBusinessCategories());
    dispatch(getSubBusinessCategories());
  }, [dispatch]);

  const main_business_category_id = useWatch({
    control,
    name: "main_business_category_id",
  });

  const subBusinessCategoriesByMainBusinessCategoryId = useMemo(
    () =>
      subBusinessCategories.filter(
        (item) => item?.main_business_category_id === main_business_category_id
      ),
    [subBusinessCategories, main_business_category_id]
  );


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
                <Grid item xs={12}>
                  <FormInputNumber
                    disabled={disabled}
                    control={control}
                    label="Employment Period Year"
                    name="employment_period_year"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Employment Period Month"
                    name="employment_period_month"
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={typeofBusinesses}
                    getOptionLabel={(option) => option?.code}
                    id="id"
                    name="type_of_business_id"
                    label="Type of Business"
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={mainBusinessCategories}
                    getOptionLabel={(option) => option?.bc1_code}
                    id="id"
                    label="Main Business Category"
                    name="main_business_category_id"
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={subBusinessCategoriesByMainBusinessCategoryId}
                    getOptionLabel={(option) => option?.bc2_code}
                    id="id"
                    label="Sub Business Category"
                    name="sub_business_category_id"
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
                    label="Name of Business"
                    name="name_of_business"
                    disabled={disabled}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormInputText
                    disabled={disabled}
                    control={control}
                    label="Details of Business"
                    name="details_of_business"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    disabled={disabled}
                    control={control}
                    label="Title Position"
                    name="title_position"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputNumber
                    disabled={disabled}
                    control={control}
                    label="Monthly Income"
                    name="monthly_income"
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

export default React.memo(ApplicationJointApplicantOccupation);
