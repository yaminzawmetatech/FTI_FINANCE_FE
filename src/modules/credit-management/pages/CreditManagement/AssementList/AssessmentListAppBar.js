import * as React from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { AppBar } from "@mui/material";
import ExcelExportButton from "./AssessmentExcelExportButton";

const AssessmentListAppBar = ({ applicationIds, transformedSearchData }) => {
  const { categoryName } = useParams();

  const [params] = useSearchParams();

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
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: "auto" }}>
          <ExcelExportButton
            applicationIds={applicationIds}
            transformedSearchData={transformedSearchData}
          />
        </div>
      </div>
    </AppBar>
  );
};

export default React.memo(AssessmentListAppBar);
