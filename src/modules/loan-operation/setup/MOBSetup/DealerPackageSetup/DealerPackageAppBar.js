import * as React from "react";
import { useState } from "react";
import { AppBar } from "@mui/material";
import CreateEditDealerPackageModal from "./CreateEditDealerPackageModal";
import { Button } from "@mui/material";
import useDealerPackageForm from "./DealerPackageHook";
import ExportExcel from "./DealerPackageExcelExportButton";

const DealerPackageAppBar = ({ ids }) => {
  const { onSubmit, handleSubmit, control, reset } = useDealerPackageForm();

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
      <CreateEditDealerPackageModal
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

export default React.memo(DealerPackageAppBar);
