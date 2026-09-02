import React, { useEffect, useCallback, useRef } from "react";
import { Box, Grid } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputText from "components/form/FormInputText";
import { useWatch } from "react-hook-form";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import FormInputSelect from "components/form/FormInputSelect";
import FormInputMonthYearPicker from "components/form/FormInputMonthYearPicker";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "features/category/categorySlice";
import { calculateAmountsByWriteOffMonth } from "features/writeOff/writeOffSlice";
import { useParams } from "react-router-dom";

const General = ({ control, writeOffPrepareContracts }) => {
  const disabled = useWatch({ control, name: "disabled" });
  const dispatch = useDispatch();
  const { projectCategories } = useSelector((state) => state.projectCategories);
  const { mode } = useParams();

  const writeOffMonth = useWatch({ control, name: "write_off_month" });
  const penaltyDays = useWatch({ control, name: "penalty_date"});
  const prevWriteOffMonth = useRef(writeOffMonth);
  console.log(writeOffMonth, "prevWriteOffMonth");
  const prevPenaltyDay = useRef(penaltyDays);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const onChangeWriteOffMonth = useCallback(
    async (newValue) => {
      if (
        newValue && 
        ((!prevWriteOffMonth?.current ||
          !newValue.isSame(prevWriteOffMonth?.current, "month")))
      ) {
        const temp_ids = writeOffPrepareContracts?.map(
          (contract) => contract.contract_id
        );
        if (temp_ids && temp_ids?.length !== 0) {
          try {
            await dispatch(
              calculateAmountsByWriteOffMonth({
                params: {
                  contract_ids: JSON.stringify(temp_ids),
                  write_off_month: newValue.format("YYYY-MM"),
                  penalty_days: penaltyDays?.format("YYYY-MM-DD")
                },
              })
            ).unwrap();
          } catch (error) {
            console.error(error);
          }

          prevWriteOffMonth.current = newValue; // Update the previous value reference
        }
      }
    },
    [dispatch, writeOffPrepareContracts]
  );
  
  const onChangePenaltyDays = useCallback(
    async (newValue) => {
      if (
        newValue && 
        ( (!prevPenaltyDay?.current ||
            !newValue.isSame(prevPenaltyDay?.current, "day")))
      ) {
        const temp_ids = writeOffPrepareContracts?.map(
          (contract) => contract.contract_id
        );
        if (temp_ids && temp_ids?.length !== 0) {
          try {
            await dispatch(
              calculateAmountsByWriteOffMonth({
                params: {
                  contract_ids: JSON.stringify(temp_ids),
                  write_off_month: writeOffMonth.format("YYYY-MM"),
                  penalty_days: newValue.format("YYYY-MM-DD")
                },
              })
            ).unwrap();
          } catch (error) {
            console.error(error);
          }

          prevPenaltyDay.current = newValue; // Update the previous value reference
        }
      }
    },
    [dispatch, writeOffPrepareContracts]
  );

  //call function when write off month changes
  useEffect(() => {
    if(mode === undefined){
      onChangeWriteOffMonth(writeOffMonth);
    }
  }, [writeOffMonth, onChangeWriteOffMonth, mode]);

  useEffect(() => {
    if(mode === undefined){
      onChangePenaltyDays(penaltyDays); 
    }
  }, [penaltyDays, onChangePenaltyDays]);

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
              <FormInputMonthYearPicker
                control={control}
                label={<span className="required">Write Off Month</span>}
                name="write_off_month"
                disabled={disabled || mode}
                rules={{ required: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDatePicker
                control={control}
                label="Calculate Penalty Days"
                name="penalty_date"
                disabled={disabled || mode}
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
