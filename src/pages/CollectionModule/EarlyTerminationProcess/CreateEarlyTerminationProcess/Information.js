import React, { useCallback, useEffect } from "react";
import { Box, Button, Grid } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputText from "components/form/FormInputText";
import { useWatch } from "react-hook-form";
import FormInputDateTimePicker from "components/form/FormInputDateTimePicker";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import { useDispatch, useSelector } from "react-redux";
import FormInputSelect from "components/form/FormInputSelect";
import { getCategories } from "features/category/categorySlice";
import { getSubCategory } from "features/subcategory/subcategorySlice";
import { useParams } from "react-router-dom";
import { getDataForEarlyTerminationByApplicationId } from "../../../../features/earlyTerminationFeesSetup/earlyTerminationFeesSetupSlice";
import dayjs from "dayjs";

const Information = ({ control, earlyTerminationProcesses }) => {
  const { mode } = useParams();

  const disabled = useWatch({
    control,
    name: "disabled",
  });

  const dispatch = useDispatch();

  const { projectCategories } = useSelector((state) => state.projectCategories);

  const { subCategories } = useSelector((state) => state.subCategories);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubCategory());
  }, [dispatch]);

  const application_id = useWatch({
    control,
    name: "application_id",
  });

  const customer_inform_date = useWatch({
    control,
    name: "customer_inform_date",
  });

  const promise_date = useWatch({
    control,
    name: "promise_date",
  });

  const handleCheckButton = useCallback(async () => {
    try {
      dispatch(
        getDataForEarlyTerminationByApplicationId({
          body: {
            application_id: application_id,
            customer_inform_date: customer_inform_date.format("YYYY-MM-DD"),
            promise_date: promise_date.format("YYYY-MM-DD"),
          },
        })
      );
    } catch (e) {
      console.error("response here", e);
    }
  }, [application_id, customer_inform_date, promise_date]);
  return (
    <Accordion title="Information">
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
            <Grid item xs={10} sm={10} lg={10} md={10}>
              <FormInputText
                control={control}
                label={<span className="required">Application ID</span>}
                name="application_id"
                disabled={disabled || mode === "view" || mode === "edit"}
                rules={{ required: true }}
              />
            </Grid>
            <Grid item xs={2} sm={2} lg={2} md={2}>
              <Button
                variant={"contained"}
                disabled={
                  !application_id ||
                  !customer_inform_date ||
                  earlyTerminationProcesses?.status === "Approved" ||
                  earlyTerminationProcesses?.status === "Rejected"
                }
                fullWidth={true}
                onClick={handleCheckButton}
              >
                Calculate
              </Button>
            </Grid>

            <Grid item xs={12}>
              <FormInputDatePicker
                control={control}
                label="Customer Inform Date"
                name="customer_inform_date"
                disabled={disabled}
                rules={{ required: true }}
                minDate={dayjs()}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDatePicker
                control={control}
                label="Promise Date"
                name="promise_date"
                disabled={disabled}
                rules={{ required: true }}
                minDate={dayjs()}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDatePicker
                control={control}
                label="Due Date"
                name="due_date"
                disabled
                minDate={dayjs()}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Contract Status"
                name="contract_status"
                disabled
              />
            </Grid>
            <label
              style={{
                fontWeight: "bold",
                marginTop: "26px",
                marginBottom: "4px",
                paddingLeft: "12px",
              }}
            >
              Application
            </label>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Name"
                name="name"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="NRC"
                name="nrc"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Brand"
                name="brand"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Model"
                name="model"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Plate No"
                name="plate_no"
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
              <FormInputDatePicker
                control={control}
                label="Commencement Date"
                name="commencement_date"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputSelect
                control={control}
                options={projectCategories}
                getOptionLabel={(option) => option?.name || ""}
                id="id"
                label="Category"
                name="category_id"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputSelect
                control={control}
                options={subCategories}
                getOptionLabel={(option) => option?.name || ""}
                id="id"
                label="Sub Category"
                name="sub_category_id"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="ET Status"
                name="status"
                disabled
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(Information);
