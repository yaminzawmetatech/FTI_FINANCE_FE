import * as React from "react";
import { AppBar } from "@mui/material";
import CreditCriteriaExportExcel from "./CreditCriteriaExcelExportButton";

const CreditCriteriaAppBar = ({ ids }) => {

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
            <CreditCriteriaExportExcel ids={ids} />
          </div>
        </div>
      </AppBar>
    </>
  );
};

export default React.memo(CreditCriteriaAppBar);
