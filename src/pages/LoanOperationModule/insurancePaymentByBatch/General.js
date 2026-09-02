import React, { useEffect, useMemo } from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputText from "components/form/FormInputText";
import { useWatch } from "react-hook-form";
import FormInputDateTimePicker from "components/form/FormInputDateTimePicker";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import { useParams } from "react-router-dom";
import { getBankAccountCodes } from "features/cashDepositSetup/AccountCode/accountCodeSlice";
import { useDispatch, useSelector } from "react-redux";
import FormInputSelect from "components/form/FormInputSelect";
import { getProjectCategory } from "features/projectcategory/projectcategorySlice";

const General = ({ control, insurancePayments, user}) => {

  const { route } = useParams();

  const disabled = useWatch({
    control,
    name: "disabled",
  });

  const dispatch = useDispatch();

  const { bankAccountCodes, } = useSelector(
    (state) => state.accountCodes
  );

  const { projectCategories } = useSelector(
    (state) => state.projectCategories
  );

  useEffect(()=> {
    dispatch(getBankAccountCodes());
    dispatch(getProjectCategory());
  },[dispatch])

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
                    label= {<span className="required">Description</span>}
                    name="name"
                    disabled={disabled}
                    rules={{required: true}}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputDateTimePicker
                    control={control}
                    label= {<span className="required">Posting Date</span>}
                    name="posting_date"
                    disabled={disabled}
                    rules={{required: true}}
                  />
                </Grid>
                 <Grid item xs={12}>
                    <FormInputSelect
                      control={control}
                      options={projectCategories ?? []}
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
                      options={bankAccountCodes ?? []}
                      //getOptionLabel={(option) => option?.name || ""}
                      getOptionLabel={(option) =>`(${option.account_no ?? ""}) - ${option.name ?? ""}`}
                      id="id"
                      label= {<span>Bank Account Code</span>}
                      name="account_code_id"
                      disabled={disabled || user.user_group === "Loan Operation Staff"}
                    />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Status"
                    name="insurance_status"
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
               <Grid item xs={12} sx={{marginBottom: "14px"}}>
                  {/* <FormInputCheckbox
                    control={control}
                    label="Posted"
                    name="is_posted"
                    disabled
                  /> */}
                  <input type="checkbox" style={{ width: "22px", height: "15px", marginBottom: "13px", marginTop: "10px" }} disabled checked={insurancePayments?.is_posted} /> Posted
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
