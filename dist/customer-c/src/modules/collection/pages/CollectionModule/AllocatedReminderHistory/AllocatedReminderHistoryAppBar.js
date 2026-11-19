import React, { } from "react";
import { AppBar } from "@mui/material";
import ReminderAllocationExcelExportButton from "./AllocatedReminderHistoryExcelExportButton";

const ContractAppBar = ({ selectedRows }) => {

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
        <div style={{ marginLeft: "auto" }}>
          <ReminderAllocationExcelExportButton 
            selectedRows={selectedRows}
          />
        </div>
      </AppBar>
    </>
  );
};

export default React.memo(ContractAppBar);
