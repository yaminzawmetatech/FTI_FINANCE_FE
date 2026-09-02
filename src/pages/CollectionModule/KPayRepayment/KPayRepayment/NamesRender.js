import {
  checkCustomerNameBySettlementUuid,
  getRepaymentByUuid,
} from "features/repayment/repaymentSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function NamesRender(props) {
  const [names, setNames] = useState(props.data.contract_info);
  const [visable, setVisable] = useState(1);

  const dispatch = useDispatch();
  const repaymentUuid = props.uuid;
  const onNameChange = async (event) => {
    let response = await dispatch(
      checkCustomerNameBySettlementUuid({
        uuid: props.data.uuid,
        body: { customer_name: event.target.value.trim() },
      })
    );

    if (response?.payload?.success) {
      await dispatch(getRepaymentByUuid({ uuid: repaymentUuid }));
      toast.success("Customer name check success.");
      setVisable(0);
    }
  };

  const checkName = () => {
    return (
      props.data.customer_name === props?.data?.contract_info[0]?.customer_name ?? ''
    );
  };

  let dropDownStyle = {
    padding: "3px 5px",
    width: "100%",
    background: "transparent",
    border: "none",
  };

  return (
    <div>
      {visable === 1 && !checkName() && (
        <select onChange={onNameChange} style={dropDownStyle}>
          <option value=""/>
          {names.map((name, index) => (
            <option key={index} value={name.customer_name}>
              {name.customer_name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default NamesRender;
