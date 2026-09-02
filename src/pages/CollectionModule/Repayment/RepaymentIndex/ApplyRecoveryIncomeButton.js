import * as React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  applyETBySettlementUuids,
  applyRecoveryIncomeSettlementUuids,
  getRepaymentByUuid,
  mobApplyETBySettlementUuids,
} from "features/repayment/repaymentSlice";

const ApplyRecoveryIncomeButton = ({ selectedRecoveryRows, repaymentUuid }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    if (selectedRecoveryRows?.length === 0) {
      toast.error("Please select rows.");
    } else {
      let settlementIds = selectedRecoveryRows.map((settlement) => settlement.uuid);
      const response = await dispatch(
        applyRecoveryIncomeSettlementUuids({
          settlement_uuids: settlementIds,
        })
      );

      if (response?.payload?.success) {
        await dispatch(getRepaymentByUuid({ uuid: repaymentUuid }));
        toast.success("Applied successfully.");
      }
    }
  };

  return (
    <>
      <ConfirmationDialog
        open={open}
        onClose={handleClose}
        onOk={handleOk}
        title="Apply Recovery Income"
        content="Are you sure you want to apply selected rows?"
      />
      <Button
        variant="contained"
        //size="small"
        // sx={{ borderRadius: , ml: 2 }}
        onClick={handleClickOpen}
      >
        Apply
      </Button>
    </>
  );
};

export default React.memo(ApplyRecoveryIncomeButton);
