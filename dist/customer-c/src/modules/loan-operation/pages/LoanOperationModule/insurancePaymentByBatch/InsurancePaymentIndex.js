import React, { useState } from "react";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import ToolbarStampDutyPayment from "./ToolbarStampDutyPayment";
import General from "./General";
import InsuranceJournalLine from "./InsuranceJournalLine";
import CommonMessage from "common/CommonMessage";
import ConfirmationModal from "common/ConfirmationModal";
import { useParams } from "react-router-dom";
import useInsurancePaymentForm from "./hooks/useInsurancePaymentForm";
import InsuranceInformation from "./InsuranceInformation";

const InsurancePaymentIndex = () => {
  const {
    control,
    handleSubmit,
    isSubmitting,
    onSubmit,
    editAbleForm,
    setActualAmount,
    contracts,
    updatedContracts,
    handleButtonClick,
    isContractsLoading,
    isShowToolbar,
    isShowRemove,
    isDisable,
    insurancePayments,
    handleChangeStatus,
    handlePosted,
    user,
  } = useInsurancePaymentForm();

  const { route } = useParams();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // for confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for confirm message body

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSubmitting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Helmet>
        <title>Insurance Payment</title>
      </Helmet>
      {isShowToolbar && (
        <ToolbarStampDutyPayment
          handleChangeStatus={handleChangeStatus}
          isDisable={isDisable}
          insurancePayments={insurancePayments}
          handlePosted={handlePosted}
        />
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
          marginTop: "20px",
        }}
      >
        <Box sx={{ width: "100%", flex: 1 }}>
          <General control={control} insurancePayments={insurancePayments} user={user}/>
          <InsuranceJournalLine
            setActualAmount={setActualAmount}
            contracts={contracts}
            updatedContracts={updatedContracts}
            handleButtonClick={handleButtonClick}
            isContractsLoading={isContractsLoading}
            isShowRemove={isShowRemove}
            insurancePayments={insurancePayments}
          />
          <InsuranceInformation
            control={control}
            insurancePayments={insurancePayments}
          />
        </Box>
      </Box>
      {editAbleForm ? (
        <Box sx={{ display: "flex", px: 1, pb: 1, justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setIsConfirmModalOpen(true);
              setConfirmMessage(CommonMessage.MFC00003);
            }}
          >
            OK
          </Button>
        </Box>
      ) : null}
      {/* {route === "StampDutySettlement" && (
        <Box sx={{ display: "flex", px: 1, pb: 1, justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setIsConfirmModalOpen(true);
              setConfirmMessage(CommonMessage.MFC00005);
            }}
          >
            POST
          </Button>
        </Box>
      )} */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        //onConfirm={handleSubmit(onSubmit())}
        onConfirm={() => {
          setIsConfirmModalOpen(false);
          handleSubmit(onSubmit())();
        }}
        message={confirmMessage}
      />
    </>
  );
};

export default InsurancePaymentIndex;
