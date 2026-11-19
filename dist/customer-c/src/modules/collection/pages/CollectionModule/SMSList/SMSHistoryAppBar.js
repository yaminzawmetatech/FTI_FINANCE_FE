import React from "react";
import { AppBar } from "@mui/material";
import SMSHistoryExcelExportButton from "./SMSHistoryExcelExportButton";

const SMSHistoryAppBar = ({ smsHistoryIds, transformedSearchDataResponse }) => {

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
          <SMSHistoryExcelExportButton smsHistoryIds={smsHistoryIds} transformedSearchDataResponse={transformedSearchDataResponse} />
        </div>
      </AppBar>
    </>
  );
};

export default React.memo(SMSHistoryAppBar);
