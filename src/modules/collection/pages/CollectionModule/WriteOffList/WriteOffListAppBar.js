import React, { useState } from "react";
import Button from "@mui/material/Button";
import ConfirmationModal from "common/ConfirmationModal";
import CommonMessage from "common/CommonMessage";
import openNewWindow from "utils/windowUtils";
import { showErrorToast } from "common/ToastMessage";
import { AppBar } from "@mui/material";

const WriteOffListAppBar = ({ selectedRows, writeOffIds }) => {

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // for confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body

  const handleConfirmed = () => {
    setIsConfirmModalOpen(false);

    const arrayOfIds = selectedRows.map(obj => obj.contract_id);
    let paramsUrl = `/write-off-preparation?contract_ids=${arrayOfIds}`;
    openNewWindow(paramsUrl);
  };

  const checkConfirm = () => {
    const uniqueCategoryIds = [
      ...new Set(selectedRows.map((contract) => contract.category_id)),
    ];
    if (uniqueCategoryIds?.length > 1) {
      showErrorToast(CommonMessage.MFE00015);
    } else {
      setIsConfirmModalOpen(true);
      setConfirmMessage(CommonMessage.MFC00010);
    }
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fafafb",
          color: "black",
          boxShadow: "none",
          mb: 1,
          mt: -1,
        }}
      >
        <div style={{ display : "flex" }}>
          <div style={{ alignContent : "center"}}>
            No. Selected Row(s) : {selectedRows.length}
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Button
              variant="contained"
              onClick={() => {
                checkConfirm();
              }}
              disabled={selectedRows.length === 0}
            >
              Create New
            </Button>
          </div>
        </div>
      </AppBar>
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmed}
        message={confirmMessage}
      />
    </>
  );
};

export default React.memo(WriteOffListAppBar);
