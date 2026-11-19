import React, { useState } from "react";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import useCashDepositForm from "./hooks/useCashDepositForm";
import ToolbarCashDeposit from "./ToolbarCashDeposit";
import General from "./General";
import CommonMessage from "common/CommonMessage";
import ConfirmationModal from "common/ConfirmationModal";
import AssessmentList from "./AssessmentList";
import { useParams } from "react-router-dom";

const CashDepositProcessIndex = () => {
  const {
    control,
    handleSubmit,
    isSubmitting,
    onSubmit,
    editAbleForm,
    isShowToolbar,
    isDisable,
    handleChangeStatus,
      handlePostCashDeposit,
      cashDeposits
  } = useCashDepositForm();

  const { mode } = useParams();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);// for confirmation modal open flag
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
        <title>Cash Deposit</title>
      </Helmet>
      {isShowToolbar && 
        <ToolbarCashDeposit
          handleChangeStatus={handleChangeStatus}
          handlePostCashDeposit = {handlePostCashDeposit}
          isDisable={isDisable}
        />
      }
      <Box
        sx={{
          px: 1,
          pb: 1,
          display: "flex",
          gap: 2,
          "@media (max-width: 600px)": {
            flexDirection: "column",
          },
          marginTop: "20px"
        }}
      >
        <Box sx={{ width: "100%", flex: 1 }}>
          <General control={control} />
          {mode === "view" &&
            <AssessmentList cashDeposits={cashDeposits} />
          }
        </Box>
      </Box>
      {editAbleForm ? (
        <Box sx={{ display: "flex", px: 1, pb: 1, justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => { setIsConfirmModalOpen(true); setConfirmMessage(CommonMessage.MFC00003); }}
            //onClick={handleSubmit(onSubmit())}
          >
            OK
          </Button>
        </Box>
      ) : null}
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

export default CashDepositProcessIndex;
