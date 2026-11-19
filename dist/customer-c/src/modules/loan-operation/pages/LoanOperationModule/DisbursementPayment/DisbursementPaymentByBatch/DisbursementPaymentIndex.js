import React, { useState } from "react";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";

import ToolbarDisbursementPayment from "./ToolbarDisbursementPayment";
import DisbursementInformation from "./DisbursementInformation";
import General from "./General";
import DisbursementJournalLine from "./DisbursementJournalLine";
import CommonMessage from "common/CommonMessage";
import ConfirmationModal from "common/ConfirmationModal";
import { useParams } from "react-router-dom";
import useDisbursementPaymentForm from "./hooks/useDisbursementPaymentForm";


const DisbursementPaymentIndex = () => {
  const {
    control,
    handleSubmit,
    isSubmitting,
    onSubmit,
    editAbleForm,
    setActualAmount,
    contracts,
    updatedBookings,
    handleButtonClick,
    isContractsLoading,
    isShowToolbar,
    isShowRemove,
    isDisable,
    handleChangeStatus,
    handlePosted,
    bookings,
    disbursementPayments,
    bankAccountCodes,
    projectCategories
  } = useDisbursementPaymentForm();

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
        <title>Disbursement Payment</title>
      </Helmet>
      {isShowToolbar && (
        <ToolbarDisbursementPayment
          handleChangeStatus={handleChangeStatus}
          isDisable={isDisable}
          disbursementPayments={disbursementPayments}
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
          <General control={control} disbursementPayments={disbursementPayments}
            bankAccountCodes={bankAccountCodes}
            projectCategories={projectCategories}
          />
          <DisbursementJournalLine
            setActualAmount={setActualAmount}
            contracts={contracts}
            updatedBookings={updatedBookings}
            handleButtonClick={handleButtonClick}
            isContractsLoading={isContractsLoading}
            isShowRemove={isShowRemove}
            bookings={bookings}
            disbursementPayments={disbursementPayments}
            projectCategories={projectCategories}
          />
          {/* <DisbursementInformation
            control={control}
            disbursementPayments={disbursementPayments}
          /> */}
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

export default DisbursementPaymentIndex;
