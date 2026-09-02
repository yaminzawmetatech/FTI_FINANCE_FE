import React, { useEffect, useMemo, useCallback } from "react";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import useContractForm from "./hooks/useContractForm";
import ApplicationInformation from "./ApplicationInformation";
import ToolbarContract from "./ToolbarContract";
import LoanInformation from "./LoanInformation";
import ApplicantInformation from "./ApplicantInformation";
import PaymentScheduleLine from "./PaymentScheduleLine";
import ActualPaymentLines from "./ActualPaymentLines";
import LoanLedgerHistories from "./LoanLedgerHistories";
import GeneralLedger from "./GeneralLedger";
import { useParams } from "react-router";
import ToolBarRequestBooking from "pages/LoanOperationModule/RequestForBooking/RequestForBookingList/ToolBarRequestBooking";
import { getApplicationSetupList } from "features/menuApplicationSetup/menuApplicationSetupSlice";
import FinancedVehicleInfo from "./FinancedVehicleInfo";
import BankPaymentChannelInformation from "./Bank&PaymentChannelInformation";
import CommonMessage from "common/CommonMessage";
import { updateContractByUuidAdmin } from "features/contract/contractSlice";
import { getContractByUuid } from "features/contract/contractDetailSlice";
import { showSuccessToast } from "common/ToastMessage";

const EditContractIndex = () => {
  const {
    control,
    handleSubmit,
    isLoading,
    isSubmitting,
    onSubmit,
    contract,
    editAbleForm,
    setValue,
  } = useContractForm();

  const dispatch = useDispatch();
  const { route, uuid } = useParams();

  const { data: applicationSetups, isLoading: applicationSetupsLoading } =
    useSelector((state) => state.menuApplicationSetup.applicationSetups);

  const applicationSetup = useMemo(
    () =>
      applicationSetups?.find(
        (item) => +item.category_id === +contract?.category_id
      ),
    [contract, applicationSetups]
  );

  const application_fields = useMemo(
    () => applicationSetup?.application_fields || {},
    [applicationSetup]
  );

  useEffect(() => {
    dispatch(getApplicationSetupList());
  }, [dispatch]);

  const application_fields_group = useMemo(
    () => Object.values(application_fields).map((item) => item.group),
    [application_fields]
  );

  // if (
  //   contracts === null ||
  //   isLoading
  // ) {
  //   return (
  //     <Backdrop
  //       sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
  //       open={true}
  //     >
  //       <CircularProgress color="inherit" />
  //     </Backdrop>
  //   );
  // }

  const handleUpdate = useCallback(
    async (body) => {
      await dispatch(
        updateContractByUuidAdmin({
          id: uuid,
          body: {
            living_phone_number: body.living_phone_number,
            viber_number: body.viber_number,
            current_address: body.current_address,
            customer_name: body.customer_name,
            customer_bank_payment_channel_id: body.customer_bank_payment_channel_id,
            customer_bank_account_name: body.customer_bank_account_name,
            customer_bank_account_no: body.customer_bank_account_no,
            nrc_or_csc: body.nrc_or_csc,
          },
        })
      ).unwrap();
  
      showSuccessToast(CommonMessage.MFS00008);
  
      await dispatch(getContractByUuid({ uuid }));
    },
    [uuid, dispatch]   
  );  
 
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSubmitting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Helmet>
        <title>
          {route === "booking"
            ? "Request For Booking Information"
            : "Contract Information"}
        </title>
      </Helmet>
      {route !== "booking" ? (
        <ToolbarContract
          contract={contract}
          control={control}
          setValue={setValue}
          isLoading={isLoading}
        />
      ) : (
        <ToolBarRequestBooking contract={contract} isLoading={isLoading} />
      )}
      <Box
        sx={{
          px: 1,
          pb: 1,
          display: "flex",
          gap: 2,
          "@media (max-width: 600px)": {
            flexDirection: "column",
          },
        }}
      >
        <Box sx={{ width: "100%", flex: 1 }}>
          <ApplicationInformation control={control} />
          <ApplicantInformation control={control} />
          {application_fields_group.includes(
            "Financed Vehicle Information"
          ) && (
            <FinancedVehicleInfo
              control={control}
              application_fields={application_fields}
            />
          )}
          <BankPaymentChannelInformation control={control} />
          <LoanInformation
            contract={contract}
            control={control}
            application_fields={application_fields}
          />
          {route !== "booking" ? (
            <>
              <PaymentScheduleLine contract={contract} isLoading={isLoading} />
              <ActualPaymentLines contract={contract} isLoading={isLoading} />
              {/* <LoanLedgerHistories contract={contract} isLoading={isLoading} /> */}
              <GeneralLedger contract={contract} isLoading={isLoading} />
            </>
          ) : null}
        </Box>
      </Box>
      {editAbleForm ? (
        <Box sx={{ display: "flex", px: 1, pb: 1, justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(handleUpdate)}
          >
            OK
          </Button>
        </Box>
      ) : null}
    </>
  );
};

export default EditContractIndex;
