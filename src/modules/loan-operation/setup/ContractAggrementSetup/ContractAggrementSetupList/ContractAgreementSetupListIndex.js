import React, { useCallback, useEffect } from "react";
import { Box,  Breadcrumbs,
    Typography, } from "@mui/material";
import { Helmet } from "react-helmet";
import ContractAgreementSetupTable from "./ContractAgreementSetupTable";

const ContractAgreementSetupListIndex = () => {

    return (
        <>
            <Helmet>
                <title>Contract Agreement Setup List</title>
            </Helmet>

            <Box
                sx={{
                    px: 1,
                    display: "flex",
                    mb: 1,
                    alignItems: "center",
                }}
            >
            </Box>
            <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ mb: 1 }}
          className="margin-top-8"
        >
          <Typography color="text.primary">Administration</Typography>
          <Typography color="text.primary">Contract Agreement Setup List</Typography>
        </Breadcrumbs>
            <Box
                sx={{
                    px: 1,
                    pb: 1,
                }}
            >
                <ContractAgreementSetupTable />
            </Box>
        </>
    );
};

export default React.memo(ContractAgreementSetupListIndex);
