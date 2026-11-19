import React from "react";
import ReportAppBarExcelExportButton from "./ReportAppBarExcelExportButton";
import { AppBar } from "@mui/material";

const ReportAppBar = ({ applicationIds, categoryId }) => {

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fafafb",
        color: "black",
        boxShadow: "none",
        mb: 1,
        mt: 1,
      }}
    >
      <div style={{ marginLeft: "auto" }}>
        <ReportAppBarExcelExportButton
          applicationIds={applicationIds}
          categoryId={categoryId}
        />
      </div>
    </AppBar>
  );
};

export default React.memo(ReportAppBar);
