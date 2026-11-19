import React from "react";
import ReportAppBarExcelExportButton from "./CollectionReportExcelExportButton";
import { AppBar } from "@mui/material";

const ReportAppBar = ({ contractIds,transformedSearchData }) => {

  return (
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
        <ReportAppBarExcelExportButton
          transformedSearchData={transformedSearchData}
          contractIds={contractIds}
        />
      </div>
    </AppBar>
  );
};

export default React.memo(ReportAppBar);
