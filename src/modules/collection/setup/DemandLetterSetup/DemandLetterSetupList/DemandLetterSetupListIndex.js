import React from "react";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import DemandLetterSetupTable from "./DemandLetterSetupTable";

const ContractAgreementSetupListIndex = () => {
  return (
    <>
      <Box
        sx={{
          px: 1,
          display: "flex",
          mb: 1,
          alignItems: "center",
        }}
      ></Box>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 1 }}
        className="margin-top-8"
      >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">Demand Letter Setup List</Typography>
      </Breadcrumbs>
      <Box
        sx={{
          px: 1,
          pb: 1,
        }}
      >
        <DemandLetterSetupTable />
      </Box>
    </>
  );
};

export default React.memo(ContractAgreementSetupListIndex);
