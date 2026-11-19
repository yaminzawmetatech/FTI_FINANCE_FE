import * as React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ConfirmationDialog from "components/ConfirmationDialog";
import openNewWindow from "utils/windowUtils";

const RepaymentListNewButton = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    openNewWindow(`repayment-list-create/`);
  };

  return (
    <>
      <ConfirmationDialog
        open={open}
        onClose={handleClose}
        onOk={handleOk}
        title="Confirm New Repayment"
        content="Are you sure you want to create new repayment?"
      />
      <Button variant="contained" onClick={handleClickOpen}>
        Create New
      </Button>
    </>
  );
};

export default React.memo(RepaymentListNewButton);
