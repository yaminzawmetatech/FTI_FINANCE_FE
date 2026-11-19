import React from "react";
import Button from "@mui/material/Button";
import openNewWindow from "utils/windowUtils";
import { AppBar } from "@mui/material";

const EarlyTerminationProcessListAppBar = () => {

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
          <Button
            variant="contained"
            onClick={() => {
              openNewWindow(
                `/collection-module/early-termination-process/create`
              );
            }}
          >
            Create New
          </Button>
        </div>
      </div>
    </AppBar>
  );
};

export default React.memo(EarlyTerminationProcessListAppBar);
