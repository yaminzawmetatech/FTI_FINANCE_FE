import React, { useEffect, useMemo } from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputText from "components/form/FormInputText";
import FormInputDateTimePicker from "components/form/FormInputDateTimePicker";
import { getMenuApplicationSetups } from "modules/administration/slices/menuApplicationSetupSlice";
import { useDispatch, useSelector } from "react-redux";
import { useWatch } from "react-hook-form";
import FormInputSelect from "components/form/FormInputSelect";
import { getCMCO, getUsers } from "modules/administration/slices/usersSlice";

const ApplicationInformation = ({ control }) => {
  const { menuApplicationSetups: categories, isLoading: categoryIsLoading } =
    useSelector((state) => state.menuApplicationSetup);
  const dispatch = useDispatch();

  const disabled = useWatch({
    control,
    name: "disabled",
  });

  const category = useWatch({
    control,
    name: "category",
  });

  const subCategories = useMemo(
    () =>
      categories?.find((item) => item?.id === category?.id)?.sub_categories ||
      [],
    [categories, category?.id]
  );

  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getMenuApplicationSetups());
    dispatch(getUsers("IHCO"));
    dispatch(getUsers("CMCO"));
  }, [dispatch]);

  if (categoryIsLoading) {
    return (
      <Grid item xs={12}>
        <Skeleton variant="rectangular" height={300} />
      </Grid>
    );
  }

  return (
    <Accordion title="Application Information">
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
                name="generated_application_id"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Category"
                name="category.name"
                disabled
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
              <FormInputDateTimePicker
                control={control}
                label="Disbursement Date"
                name="disbursement_date"
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
              <FormInputDateTimePicker
                control={control}
                label="Applied Date"
                name="applied_date"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="IHCO Name"
                name="application.ihco_user.user_name"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="CMCO Name"
                name="cmco_name"
                disabled
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default ApplicationInformation;
