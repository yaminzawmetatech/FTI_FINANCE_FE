import * as React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import ConfirmationDialog from "components/ConfirmationDialog";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
    applyETBySettlementUuids,
    getRepaymentByUuid,
    mobApplyETBySettlementUuids,
} from "modules/collection/slices/repaymentSlice";

const ApplyETButton = ({ selectedRows, repaymentUuid, isMob }) => {
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
            if(isMob){
                response = await dispatch(
                    mobApplyETBySettlementUuids({
                        et_uuids: settlementIds,
                    })
                );
            }else {
                response = await dispatch(
                    applyETBySettlementUuids({
                        et_uuids: settlementIds,
                    })
                );
            }
           
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
                title="Apply Early Terminations"
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

export default React.memo(ApplyETButton);
