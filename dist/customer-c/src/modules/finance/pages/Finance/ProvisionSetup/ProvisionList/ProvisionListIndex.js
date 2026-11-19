import * as React from "react";
import Box from "@mui/material/Box";
import ProvisionListTable from "./ProvisionListTable";
import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const ProvisionListIndex = () => {

    return (
        <>
            <Box sx={{ width: "100%" }}>
                <ProvisionListTable></ProvisionListTable>
            </Box>
        </>

    );
};

export default React.memo(ProvisionListIndex);