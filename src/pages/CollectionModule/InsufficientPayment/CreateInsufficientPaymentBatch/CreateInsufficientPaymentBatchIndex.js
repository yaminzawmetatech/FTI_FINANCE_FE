import React, { useState } from "react";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import useInsufficientPaymentBatchForm from "./hooks/useInsufficientPaymentBatchCreateForm";
import ToolbarInsufficientPaymentBatch from "./ToolbarInsufficientPaymentBatch";
import General from "./General";
import InsufficientPaymentList from "./InsufficientPaymentList";
import CommonMessage from "common/CommonMessage";
import ConfirmationModal from "common/ConfirmationModal";
import { useParams } from "react-router-dom";
import InsufficientPaymentBatchInformation from "./InsufficientPaymentBatchInformation";
// import WriteOffInformation from "./InsufficientPaymentInformation";

const CreateInsufficientPaymentIndex = () => {
  const {
    control,
    handleSubmit,
    isSubmitting,
    onSubmit,
    editAbleForm,
    insufficientPaymentContracts,
    handleButtonClick,
    isinsufficientPaymentLoading,
    isShowToolbar,
    insufficientPaymentBatchs,
    handleChangeStatus,
    isinsufficientPaymentBatchLoading,
    handlePosted,
    uuid,
    setValue,
    handleChangeRejectStatus,
    isCreateStage
  } = useInsufficientPaymentBatchForm();

  const { mode } = useParams();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // for confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for confirm message body
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSubmitting || isinsufficientPaymentLoading || isinsufficientPaymentBatchLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Helmet>
        <title>
          {mode === "edit" 
            ? "Edit Insufficient Payment Batch"
            : "Create Insufficient Payment Batch"}
        </title>
      </Helmet>
      {isShowToolbar && (
        <ToolbarInsufficientPaymentBatch
          handleChangeStatus={handleChangeStatus}
          insufficientPaymentBatchs={insufficientPaymentBatchs}
          insufficientPaymentContracts={insufficientPaymentContracts}
          selectedRows={selectedRows}
          handlePosted={handlePosted}
          control={control}
          handleChangeRejectStatus={handleChangeRejectStatus}
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
          <General
            control={control}
            insufficientPaymentContracts={insufficientPaymentContracts}
          />
          <InsufficientPaymentList
            insufficientPaymentContracts={insufficientPaymentContracts}
            handleButtonClick={handleButtonClick}
            isinsufficientPaymentLoading={isinsufficientPaymentLoading}
            control={control}
            editAbleForm={editAbleForm}
            setSelectedRows={setSelectedRows}
            mode={mode}
            uuid={uuid}
            setValue={setValue}
            isCreateStage={isCreateStage}
          />
          <InsufficientPaymentBatchInformation control={control} />
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
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() => {
          setIsConfirmModalOpen(false);
          handleSubmit(onSubmit())();
        }}
        message={confirmMessage}
      />
    </>
  );
};

export default CreateInsufficientPaymentIndex;
