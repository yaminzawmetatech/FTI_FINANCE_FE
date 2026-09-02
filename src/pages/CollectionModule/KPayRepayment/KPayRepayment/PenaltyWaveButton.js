import ConfirmationDialog from 'components/ConfirmationDialog';
import { getRepaymentByUuid, waivePenaltyFeesBySettlementUuid } from 'features/repayment/repaymentSlice';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function PenaltyWaveButton({ onButtonClick, node, uuid }) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    let wavePenalty = async () => {
        let remaining_penalty_fee = node.data.remaining_penalty_fee;
        let penalty_fees_waive_amount = +node.data.waive_penalty_fee;
        let settlement_uuid = node.data.uuid;

        if (remaining_penalty_fee === 0) {
            toast.error('Remaining penalty fees do not exist.');
        } else if (!(typeof penalty_fees_waive_amount === 'number' && penalty_fees_waive_amount > 0)) {
            toast.error('Penalty waive value must be positive number.');
        } else if (penalty_fees_waive_amount > remaining_penalty_fee) {
            toast.error('Penalty waive value cannot greater than remaining penalty fees.');
        } else {
            let response = await dispatch(waivePenaltyFeesBySettlementUuid({ uuid: settlement_uuid, body: { waive_amount: penalty_fees_waive_amount } }))

            if (response?.payload?.success) {
                dispatch(getRepaymentByUuid({ uuid }))
                toast.success("Waived all penalty successfully.");
            }
        }
    }
    return (
        <div>
            <button  onClick={handleClickOpen} style={{ padding: "3px 10px" }}>Waive</button>
            <ConfirmationDialog
                open={open}
                onClose={handleClose}
                onOk={wavePenalty}
                title="Waive Penalty"
                content="Are you sure you want to waive penalty?"
            />
        </div>
    )
}
