import * as React from "react";
import Box from "@mui/material/Box";
import RepaymentListTable from "./RepaymentListTable";

const RepaymentListIndex = () => {

  return (
    <Box sx={{ width: "100%" }}>
        <RepaymentListTable />
    </Box>
  );
};

export default React.memo(RepaymentListIndex);
