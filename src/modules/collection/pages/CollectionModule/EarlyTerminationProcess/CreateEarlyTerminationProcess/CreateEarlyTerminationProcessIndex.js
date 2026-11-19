import React, { useState } from "react";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import useCashDepositForm from "./hooks/useCreateEarlyTerminationForm";
import ToolbarCreateEarlyTerminationProcess from "./ToolbarCreateEarlyTerminationProcess";
import Information from "./Information";
import CommonMessage from "common/CommonMessage";
import ConfirmationModal from "common/ConfirmationModal";
import LoanInformation from "./LoanInformation";

const CreateEarlyTerminationProcessIndex = () => {
  const {
    control,
    handleSubmit,
    isSubmitting,
    isEarlyTerminationInfo,
    onSubmit,
    editAbleForm,
    isShowToolbar,
    handleChangeStatus,
    earlyTerminationProcesses,
    setValue,
  } = useCashDepositForm();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // for confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for confirm message body

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSubmitting || isEarlyTerminationInfo}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Helmet>
        <title>Early Termination Process</title>
      </Helmet>
      {isShowToolbar && (
        <ToolbarCreateEarlyTerminationProcess
          handleChangeStatus={handleChangeStatus}
          earlyTerminationProcesses={earlyTerminationProcesses}
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
          <Information
            control={control}
            earlyTerminationProcesses={earlyTerminationProcesses}
          />
          <LoanInformation control={control} setValue={setValue} />
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
            disabled={
              earlyTerminationProcesses?.status === "Approved" ||
              earlyTerminationProcesses?.status === "Rejected"
            }
          >
            Save
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

export default CreateEarlyTerminationProcessIndex;
