import React, { useEffect, useMemo } from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputText from "components/form/FormInputText";
import FormInputDateTimePicker from "components/form/FormInputDateTimePicker";
import { getMenuApplicationSetups } from "modules/administration/slices/menuApplicationSetupSlice";
import { useDispatch, useSelector } from "react-redux";
import { useWatch } from "react-hook-form";
import FormInputSelect from "components/form/FormInputSelect";
import { getUsers } from "modules/administration/slices/usersSlice";

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
                name="application_id"
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Category"
                name="category.name"
                disabled={disabled}
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
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDateTimePicker
                control={control}
                label="Disbursed Date"
                name="disbursed_date"
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
              <FormInputDateTimePicker
                control={control}
                label="Applied Date"
                name="applied_date"
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="IHCO Name"
                name="ihco_user.user_name"
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputSelect
                control={control}
                options={users}
                getOptionLabel={(option) => option?.user_name}
                id="id"
                name="cmco_id"
                label="CMCO Name"
                disabled={disabled}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default ApplicationInformation;
