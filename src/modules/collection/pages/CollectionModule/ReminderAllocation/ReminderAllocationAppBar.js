import React, { useState } from "react";
import { AppBar } from "@mui/material";
import Button from "@mui/material/Button";
import AssignUserModal from "./AssignUserModal";
import { showErrorToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import ReminderAllocationExcelExportButton from "./ReminderAllocationExcelExportButton";

const ReminderAllocationAppBar = ({
  contractIds,
  selectedRows,
  searchValueDate,
  transformedSearchDataResponse,
}) => {
  const [userModalOpen, setUserModalOpen] = useState(false); // for create confirm modal open

  const handleButtonClick = () => {
    if (selectedRows.length === 0) {
      showErrorToast(CommonMessage.MFE00017);
    } else {
      setUserModalOpen(true);
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
        <div style={{ display: "flex" }}>
          <div style={{ alignContent: "center" }}>
            No. Selected Row(s) : {selectedRows.length}
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Button variant="contained" onClick={handleButtonClick}>
              Allocate User
            </Button>
            <ReminderAllocationExcelExportButton
              contractIds={contractIds}
              transformedSearchDataResponse={transformedSearchDataResponse}
            />
          </div>
        </div>
      </AppBar>
      <AssignUserModal
        selectedRows={selectedRows}
        open={userModalOpen}
        onClose={() => setUserModalOpen(false)}
        searchValueDate={searchValueDate}
        transformedSearchDataResponse={transformedSearchDataResponse}
      />
    </>
  );
};

export default React.memo(ReminderAllocationAppBar);
