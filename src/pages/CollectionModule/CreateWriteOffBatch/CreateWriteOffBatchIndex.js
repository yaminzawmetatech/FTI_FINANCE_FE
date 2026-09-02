import React, { useState } from "react";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import useWriteOffBatchForm from "./hooks/useWriteOffBatchCreateForm";
import ToolbarWriteOffBatch from "./ToolbarWriteOffBatch";
import General from "./General";
import WriteOffList from "./WriteOffList";
import CommonMessage from "common/CommonMessage";
import ConfirmationModal from "common/ConfirmationModal";
import { useParams } from "react-router-dom";
import WriteOffInformation from "./WriteOffInformation";

const CreateWriteOffBatchIndex = () => {
  const {
    control,
    handleSubmit,
    isSubmitting,
    onSubmit,
    editAbleForm,
    writeOffPrepareContracts,
    handleButtonClick,
    isWriteOffLoading,
    isShowToolbar,
    isCreateStage,
    isDisable,
    writeOffBatchs,
    handleChangeStatus,
    handleCellValueChanged,
    isWriteOffBatchLoading,
    handlePosted,
    uuid,
    setNormalSelectedRows,
    handleNormalSubmit,
    setOpenAddModal,
    openAddModal,
    setValue,
    auth,
    ids,
  } = useWriteOffBatchForm();

  const { mode } = useParams();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // for confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for confirm message body
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSubmitting || isWriteOffLoading || isWriteOffBatchLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Helmet>
        <title>
          {mode === "edit" 
            ? "Edit Write Off Batch"
            : "Create Write Off Batch"}
        </title>
      </Helmet>
      {isShowToolbar && (
        <ToolbarWriteOffBatch
          handleChangeStatus={handleChangeStatus}
          isDisable={isDisable}
          writeOffBatchs={writeOffBatchs}
          writeOffPrepareContracts={writeOffPrepareContracts}
          selectedRows={selectedRows}
          handlePosted={handlePosted}
          control={control}
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
            writeOffPrepareContracts={writeOffPrepareContracts}
            auth={auth}
          />
          <WriteOffList
            writeOffPrepareContracts={writeOffPrepareContracts}
            handleButtonClick={handleButtonClick}
            isWriteOffLoading={isWriteOffLoading}
            isCreateStage={isCreateStage}
            control={control}
            handleCellValueChanged={handleCellValueChanged}
            editAbleForm={editAbleForm}
            setSelectedRows={setSelectedRows}
            mode={mode}
            uuid={uuid}
            setNormalSelectedRows={setNormalSelectedRows}
            handleNormalSubmit={handleNormalSubmit}
            setOpenAddModal={setOpenAddModal}
            openAddModal={openAddModal}
            setValue={setValue}
            auth={auth}
            writeOffBatchs={writeOffBatchs}
            ids={ids}
          />
          <WriteOffInformation control={control} />
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

export default CreateWriteOffBatchIndex;
