import * as React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import ConfirmationDialog from "components/ConfirmationDialog";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  getRepaymentByUuid,
  waivePenaltyFeesBySettlementMob,
  waivePenaltyFeesBySettlementUuids,
} from "modules/collection/slices/repaymentSlice";

const RepaymentListNewButton = ({ selectedRows, repaymentUuid, categoryId, handleSearch }) => {
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
      let response;

      let settlementArray = selectedRows.map((settlement) => ({
        settlement_id: settlement.id,
        contract_id: settlement.contract_id,
      }));

      if(categoryId === 1){
        response = await dispatch(
          waivePenaltyFeesBySettlementUuids({ uuids: settlementIds })
        );
      }else{
        response = await dispatch(
          waivePenaltyFeesBySettlementMob({ body: settlementArray })
        );
      }
     
      if (response?.payload?.success) {
        await dispatch(getRepaymentByUuid({ uuid: repaymentUuid }));
        // handleSearch();
        toast.success("Waived selected penalty successfully.");
      }
    }
  };

  return (
    <>
      <ConfirmationDialog
        open={open}
        onClose={handleClose}
        onOk={handleOk}
        title="Waive Penalty"
        content="Are you sure you want to waive selected penalty?"
      />
      <Button
        variant="outlined"
        //size="small"
        // sx={{ borderRadius: , ml: 2 }}
        onClick={handleClickOpen}
        sx={{
          marginLeft: "10px",
          color: "red",
          borderColor: "red",
          "&:hover": {
            backgroundColor: "rgba(255, 0, 0, 0.04)",
          },
        }}
      >
        Waive Penalty
      </Button>
    </>
  );
};

export default React.memo(RepaymentListNewButton);
