import * as React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  applyMonthlyInstallmentBySettlementUuids,
  getRepaymentByUuid,
  waivePenaltyFeesBySettlementUuids,
} from "features/repayment/repaymentSlice";

const ApplyMonthlyInstallmentButton = ({ selectedRows, repaymentUuid }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    if (selectedRows?.length === 0) {
      toast.error("Please select rows.");
    } else {
      let settlementIds = selectedRows.map((settlement) => settlement.uuid);
      let response = await dispatch(
        applyMonthlyInstallmentBySettlementUuids({
          selttlement_uuids: settlementIds,
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
        title="Apply Monthly Installments"
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

export default React.memo(ApplyMonthlyInstallmentButton);
