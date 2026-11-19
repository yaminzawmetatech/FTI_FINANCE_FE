import React from "react";
import { AppBar } from "@mui/material";

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
        </div>
      </AppBar>
    </>
  );
};

export default React.memo(SMSHistoryAppBar);
