import * as React from "react";
import { AppBar } from "@mui/material";
import ExportExcel from "./LoanApplicationExcelExportButton";

const DealerAppBar = ({ids}) => {

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
          <div style={{ marginLeft: "auto" }}>
            <ExportExcel ids={ids} />
          </div>
        </div>
      </AppBar>
    </>
  );
};

export default React.memo(DealerAppBar);
