import * as React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ConfirmationDialog from "components/ConfirmationDialog";
import openNewWindow from "utils/windowUtils";
import CreateEditModel from "./CreateEditModel";
import { useEffect } from "react";
import ProvisionSetupForm from "./ProvisionSetupForm";


const ProvisionSetupListNewButton = () => {
  const { setCreateEditFormOpen,
    createEditFormOpen,
    control,
    onSubmit,
    handleSubmit,
    getValues,
    isLoading,
    close,
    reset
  } = ProvisionSetupForm();

  const handleClickOpen = () => {
    setCreateEditFormOpen(true)
  }

  return (
    <>
      <CreateEditModel
        createEditFormOpen={createEditFormOpen}
        setCreateEditFormOpen={setCreateEditFormOpen}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        reset={reset}
        control={control}
        isLoading={isLoading}
        getValues={getValues}
      ></CreateEditModel>
      <Button
        color="inherit"
        sx={{ borderRadius: 0 }}
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        New
      </Button>
    </>
  );
};

export default React.memo(ProvisionSetupListNewButton);
