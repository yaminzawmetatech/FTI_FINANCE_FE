import React, { useEffect, useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputText from "components/form/FormInputText";
import { useWatch, Controller } from "react-hook-form";
import FormInputDateTimePicker from "components/form/FormInputDateTimePicker";
import { getBankAccountCodes } from "modules/finance/slices/accountCodeSlice";
import { useDispatch, useSelector } from "react-redux";
import FormInputSelect from "components/form/FormInputSelect";
// import useRepaymentForm from "";
import ConfirmationModal from "common/ConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { useParams } from 'react-router-dom';
import useJobQueueFrom from "../Hook/useJobQueueFrom";
import FormInputMonthYearPicker from "components/form/FormInputMonthYearPicker";
import dayjs from 'dayjs'
import { useForm } from "react-hook-form"
import ProvisionSetupForm from "modules/finance/pages/Finance/ProvisionSetup/ProvisionList/ProvisionSetupForm";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import FormInputMultiSelect from "components/form/FormInputMultiSelect";
import { getContracts } from "modules/loan-operation/slices/contractSlice";

const General = ({ control, setValue, handleSubmit, onSubmit, disabledFormAction }) => {
  const dispatch = useDispatch();

  // const { control, setValue, handleSubmit, onSubmit, disabledFormAction } = useJobQueueFrom();

  const { mode } = useParams();

  const { contracts, next_page_param, isLoading } = useSelector(
    (state) => state.contracts
  );


  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const EOMDate = useWatch({
    control,
    name: "test_date",
  })

  useEffect(() => {
    dispatch(
      getContracts({
        firstFetch: true,
      })
    );
  }, [dispatch])

  useEffect(() => {
    setValue('description', 'EOM/BOM Process');
  }, [])

  useEffect(() => {

    const lastDayOfMonth = dayjs(EOMDate).endOf('month');

    const firstDayOfNextMonth = dayjs(EOMDate).add(1, 'month').startOf('month');

    setValue('eom_date', lastDayOfMonth);

    setValue('bom_date', firstDayOfNextMonth);
  }, [EOMDate])

  const [EOM, setEOM] = useState("");
  const [BOM, setBOM] = useState("");


  const handleClick = () => {
    setConfirmModalOpen(false)
    handleSubmit(onSubmit)();
  };

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
                disabled={true}
                rules={{ required: true }}
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
              <FormInputMonthYearPicker
                control={control}
                label={<span className="required">Test Date</span>}
                name="test_date"
                rules={{ required: true }}
                disabled={disabledFormAction()}
              // onFieldChange={setEOMAndBOM}
              />
              <Grid container spacing={2} sx={{ pt: 2 }}>
                <Grid item xs={6}>
                  <FormInputDatePicker
                    control={control}
                    label="EOM Date"
                    name="eom_date"
                    disabled
                    sx={{ mt: 2 }}></FormInputDatePicker>

                </Grid>
                <Grid item xs={6}>
                  <FormInputDatePicker
                    control={control}
                    label="BOM Date"
                    name="bom_date"
                    disabled
                    sx={{ mt: 2 }}></FormInputDatePicker>
                </Grid>
             
                {/* <Grid item xs={6}>
                  <FormInputMultiSelect
                    limitTags={2}
                    name="contract_ids"
                    control={control}
                    options={contracts ?? []}
                    label="Select Contracts"
                    id="id"
                    getOptionLabel={(option) => option?.generated_application_id}                  
                  />
                </Grid> */}
              </Grid>

             
                  <Grid item xs={6}>
                     {/* <FormInputSelect
                      control={control}
                      options={contracts}
                      getOptionLabel={(option) => option?.generated_application_id}
                      id="id"
                      name="contract_id"
                      label="Contract"
                    /> */}
                    {/* <FormInputText
                      control={control}
                      label="Application Id"
                      name="generated_application_id"
                      sx={{ mt: 2 }}
                      rules={{ required: true }}
                    /> */}
                </Grid>                
                
            </Grid>
          </Grid>
        </Grid>
      </Box>


      {EOM.length != "" && <Box sx={{ display: "flex", px: 1, pb: 1, justifyContent: "flex-end", my: 2 }}>
        <h4>{EOM.length != "" && EOM}</h4>
      </Box>}

      {BOM.length != "" && <Box sx={{ display: "flex", px: 1, pb: 1, justifyContent: "flex-end", my: 2 }}>
        <h4>{BOM.length != "" && BOM}</h4>
      </Box>}

      <Box sx={{ display: "flex", px: 1, pb: 1, justifyContent: "flex-end", my: 2 }}>
        {!disabledFormAction() && <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setConfirmModalOpen(true);
          }}
        >
          OK
        </Button>}

      </Box>
      <ConfirmationModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleClick}
        message="Are you sure to run EOM/BOM?"
      />
    </Accordion>
  );

};

export default React.memo(General);

