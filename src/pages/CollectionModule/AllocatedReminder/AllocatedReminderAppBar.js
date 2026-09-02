import React, { useState } from "react";
import { AppBar } from "@mui/material";
import Button from "@mui/material/Button";
import AssignUserModal from "./AssignUserModal";
import { showErrorToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import ReminderAllocationExcelExportButton from "./ReminderAllocationExcelExportButton";
import { useSelector } from "react-redux";

const AllocatedReminderAppBar = ({
  selectedRows,
  reminderAllocationIds,
  transformedSearchDataResponse,
}) => {
  const [userModalOpen, setUserModalOpen] = useState(false); // for create confirm modal open
  const [mode, setMode] = useState("");

  const auth = useSelector((state) => state.auth.user);

  const showReallocatedBtn =
    auth?.permissions.includes(
      "CollectionManagement-AllocatedReminderReallocate"
    ) || auth.is_super === true;

  const handleButtonClick = () => {
    if (selectedRows.length === 0) {
      showErrorToast(CommonMessage.MFE00017);
    } else {
      setUserModalOpen(true);
      setMode("reassign");
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
            {showReallocatedBtn && (
              <Button variant="contained" onClick={handleButtonClick}>
                Reallocate User
              </Button>
            )}
            <ReminderAllocationExcelExportButton
              reminderAllocationIds={reminderAllocationIds}
              transformedSearchDataResponse={transformedSearchDataResponse}
            />
            {/* <ExcelExportButton />
          <ReminderAllocationExcelImportButton fetchApi={fetchApi} /> */}
          </div>
        </div>
      </AppBar>
      <AssignUserModal
        selectedRows={selectedRows}
        open={userModalOpen}
        onClose={() => setUserModalOpen(false)}
        mode={mode}
        transformedSearchDataResponse={transformedSearchDataResponse}
      />
    </>
  );
};

export default React.memo(AllocatedReminderAppBar);
