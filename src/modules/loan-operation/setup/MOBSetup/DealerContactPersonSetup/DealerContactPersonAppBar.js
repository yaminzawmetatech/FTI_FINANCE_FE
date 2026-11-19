import * as React from "react";
import { useState } from "react";
import { AppBar } from "@mui/material";
import { Button } from "@mui/material";
import useDealerContactPersonForm from "./DealerContactPersonHook";
import CreateDealerContactPersonModal from "./CreateDealerContactPersonModal";
import EditDealerContactPersonModal from "./EditDealerContactPersonModal";
import ExportExcel from "./ContactPersonExcelExportButton";

const DealerContactPersonAppBar = ({ids}) => {
  const { onSubmit, handleSubmit, control, reset } = useDealerContactPersonForm();

  const [open, setOpen] = useState(false);

  const handleCreateEdit = () => {
    setOpen(true);
  };

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
            <Button variant="contained" onClick={handleCreateEdit}>
              Create New
            </Button>
            <ExportExcel ids={ids} />
          </div>
        </div>
      </AppBar>
      <EditDealerContactPersonModal
        open={open}
        onClose={() => setOpen(false)}
        editFlag={false}
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        reset={reset}
      />
    </>
  );
};

export default React.memo(DealerContactPersonAppBar);
