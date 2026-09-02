import React, { useEffect } from "react";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import FormInputText from "components/form/FormInputText";
import { calculatePenalties } from "features/penaltyLogs/penaltyLogSlice";
import { useForm } from "react-hook-form";
import { Button, Grid } from "@mui/material";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import { showSuccessToast } from "common/ToastMessage";


const CalculatePenalties = () => {
  const dispatch = useDispatch();

  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      application_id: "",
      penalty_date: null,
    },
  });

  const application_id = watch("application_id");
  const penalty_date = watch("penalty_date");

  const onSubmit = useCallback(
    async (data) => {
      try {
        dispatch(
          calculatePenalties({
            application_id: data.application_id,
            penalty_date: data.penalty_date?.format("YYYY-MM-DD"),
          })
        );
        showSuccessToast("Success");
      } catch (e) {
        console.error("response here", e);
      }
    },
    [dispatch]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Collection Module</Typography>
        <Typography color="text.primary">Calculate Penalties</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <Grid
          container
          item
          spacing={2}
          xs={12}
          sm={6}
          justifyContent="flex-start"
          alignItems="flex-start"
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid item xs={6}>
            <FormInputText
              control={control}
              label={<span className="required">Application ID</span>}
              name="application_id"
              rules={{
                required: "Application ID is required",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormInputDatePicker
              control={control}
              label="Penalty Date"
              name="penalty_date"
            />
          </Grid>
          <Grid item xs={2} sm={2} lg={2} md={2}>
            <Button variant="contained" type="submit">
              Calculate
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default React.memo(CalculatePenalties);
