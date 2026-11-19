import React, { useEffect, useCallback, useRef } from "react";
import { Box, Grid } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputText from "components/form/FormInputText";
import { useWatch } from "react-hook-form";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import FormInputSelect from "components/form/FormInputSelect";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "modules/administration/slices/categorySlice";
import { useParams } from "react-router-dom";

const General = ({ control, writeOffPrepareContracts }) => {
  const disabled = useWatch({ control, name: "disabled" });
  const dispatch = useDispatch();
  const { projectCategories } = useSelector((state) => state.projectCategories);
  const { mode } = useParams();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  

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
                label={<span className="required">Description</span>}
                name="description"
                disabled={disabled}
                rules={{ required: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputSelect
                control={control}
                options={projectCategories ?? []}
                getOptionLabel={(option) => option?.name || ""}
                id="id"
                label={<span>Category</span>}
                name="category_id"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Status"
                name="status"
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
              <FormInputText
                control={control}
                label="Created By"
                name="created_user.user_name"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDatePicker
                control={control}
                label="Created Date"
                name="created_at"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Modified By"
                name="modified_user.user_name"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDatePicker
                control={control}
                label="Modified Date"
                name="updated_at"
                disabled
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(General);
