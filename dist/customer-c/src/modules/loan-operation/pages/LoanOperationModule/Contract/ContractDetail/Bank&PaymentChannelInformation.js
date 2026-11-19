import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputText from "components/form/FormInputText";
import FormInputSelect from "components/form/FormInputSelect";
import { getCustomerBanks } from "modules/administration/slices/customerBankSlice";
import { useDispatch, useSelector } from "react-redux";

const BankPaymentChannelInformation = ({ control }) => {

  const dispatch = useDispatch();

    const { customerBanks } = useSelector((state) => state.customerBanks);

    const auth = useSelector((state) => state.auth.user);

    useEffect(() => {
      dispatch(getCustomerBanks({}));
    },[]);

    return (
      <Accordion title="Customer Bank/Payment Channel Information">
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
                  <FormInputSelect
                    control={control}
                    options={customerBanks}
                    getOptionLabel={(option) => option?.name}
                    id="id"
                    name="customer_bank_payment_channel_id"
                    label="Bank/ Payment Channel"
                    disabled={!auth.is_super ? true : false}                   
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Account Name"
                    name="customer_bank_account_name"
                    disabled={!auth.is_super ? true : false}   
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
                    label="Account No."
                    name="customer_bank_account_no"
                    disabled={!auth.is_super ? true : false}   
                  />
                </Grid>
            </Grid>
          </Grid>
        </Box>
      </Accordion>
    );
};

export default BankPaymentChannelInformation;
