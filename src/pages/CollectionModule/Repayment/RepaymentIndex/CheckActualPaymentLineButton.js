import React from 'react'
import { useDispatch } from "react-redux";
import { checkActualPaymentLinesBySettlementUuid, getRepaymentByUuid } from 'features/repayment/repaymentSlice';
import { toast } from "react-toastify";

export default function CheckActualPaymentLineButton(props) {
    let dispatch = useDispatch();
    let data = props.data;
    let repaymentUuid = props.uuid;
    let CheckActualPaymentLineButton = async () => {
        let response = await dispatch(checkActualPaymentLinesBySettlementUuid(data.uuid));
        if (response?.payload?.success) {
            await dispatch(getRepaymentByUuid({ uuid: repaymentUuid }))
            toast.success("Actual payment lines check success.");
        }
    }

    return (
        <div>
            <button onClick={CheckActualPaymentLineButton} style={{ padding: "3px 10px" }}>Check Actual Payment Lines</button>
        </div>
    )
}
