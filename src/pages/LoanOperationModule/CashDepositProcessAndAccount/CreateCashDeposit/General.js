import React, { useEffect, useMemo } from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputText from "components/form/FormInputText";
import { useWatch } from "react-hook-form";
import FormInputDateTimePicker from "components/form/FormInputDateTimePicker";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import FormInputCheckbox from "components/form/FormInputCheckbox";
import { getBanks } from "features/bank/bankSlice";
import { useDispatch, useSelector } from "react-redux";
import FormInputSelect from "components/form/FormInputSelect";
import FormInputNumber from "components/form/FormInputNumber";
import {getAccountCodes, getBankAccountCodes} from "features/cashDepositSetup/AccountCode/accountCodeSlice";
import { getCategories } from "features/category/categorySlice";
import { useParams } from "react-router-dom";

const General = ({ control, setValue }) => {
  const { mode } = useParams();

  const disabled = useWatch({
    control,
    name: "disabled",
  });

  const dispatch = useDispatch();

  const { bankAccountCodes, isLoading: isBankAccountCodesLoading } = useSelector(
      (state) => state.accountCodes
  );

  const { projectCategories } = useSelector((state) => state.projectCategories);

  useEffect(() => {
    // dispatch(getBanks());
    dispatch(getBankAccountCodes());
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Accordion title="Cash Deposit Process and Account">
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
                control={control}
                label={<span className="required">Deposit Amount</span>}
                name="deposit_amount"
                disabled={disabled}
                rules={{ required: true }}
              />
            </Grid>
            {mode === "create" && (
              <>
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Balance"
                    name="balance"
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Updated Balance"
                    name="updated_balance"
                    disabled
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <FormInputSelect
                control={control}
                options={projectCategories}
                getOptionLabel={(option) => option?.name || ""}
                id="id"
                label={<span className="required">Category</span>}
                name="category_id"
                disabled={disabled}
                rules={{ required: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputSelect
                control={control}
                options={bankAccountCodes}
                //getOptionLabel={(option) => option?.name || ""}
                getOptionLabel={(option) =>`(${option.account_no ?? ""}) - ${option.name ?? ""}`}
                id="id"
                label={<span className="required">Bank Account Code</span>}
                name="account_code_id"
                disabled={disabled}
                rules={{ required: true }}
              />
            </Grid>
            {/*<Grid item xs={12}>*/}
            {/*  <FormInputSelect*/}
            {/*    control={control}*/}
            {/*    options={banks}*/}
            {/*    getOptionLabel={(option) => option?.name || ""}*/}
            {/*    id="id"*/}
            {/*    label={<span className="required">Bank Account</span>}*/}
            {/*    name="bank_id"*/}
            {/*    disabled={disabled}*/}
            {/*    rules={{ required: true }}*/}
            {/*  />*/}
            {/*</Grid>*/}
            <Grid item xs={12}>
              <FormInputText
                multiline
                control={control}
                label="Description"
                name="description"
                disabled={disabled}
                sx={{
                  pt: 1,
                  textarea: {
                    minHeight: "80px",
                    maxHeight: "80px",
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
                label="Status"
                name="status"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDateTimePicker
                control={control}
                label="Posting Date"
                name="posted_date"
                disabled={disabled}
                //rules={{ required: true }}
              />
            </Grid>
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
                label="Approved By"
                name="approved_user.user_name"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDatePicker
                control={control}
                label="Approved Date"
                name="approved_date"
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
