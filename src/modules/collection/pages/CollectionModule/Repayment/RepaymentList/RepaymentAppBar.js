import React from "react";
import RepaymentListNewButton from "./RepaymentListNewButton";
import { AppBar } from "@mui/material";

const RepaymentAppBar = () => {
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
        <RepaymentListNewButton />
      </div>
    </AppBar>
  );
};

export default React.memo(RepaymentAppBar);
