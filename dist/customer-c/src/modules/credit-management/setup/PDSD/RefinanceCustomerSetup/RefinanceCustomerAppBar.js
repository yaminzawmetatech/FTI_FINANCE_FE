import * as React from "react";
import { AppBar } from "@mui/material";
import RefinanceCustomerExcelImportButton from "./RefinanceCustomerExcelImportButton";
import { Button } from "@mui/material";
import useRefinanceCustomerForm from "./RefinanceCustomerHook";
import CreateEditRefinanceCustomer from "./CreateEditRefinanceCustomerModal";
import { useState } from "react";

const RefinanceCustomerAppBar = ({fetchApi}) => {
  const { onSubmit, handleSubmit, control, reset } = useRefinanceCustomerForm();

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
            <RefinanceCustomerExcelImportButton fetchApi={fetchApi} />
          </div>
        </div>
      </AppBar>
      <CreateEditRefinanceCustomer
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

export default React.memo(RefinanceCustomerAppBar);
