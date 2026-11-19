import React, { useState, useCallback, useEffect } from "react";
import CustomAppBar from "components/CustomAppBar";
import StampDutyPaymentAppBarSearchInput from "./StampDutyBatchAppBarSearch";
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { getAllStampDutyPayments } from "modules/loan-operation/slices/stampDutyPaymentSlice";
import StampDutySettlementAppBarStatus from "./StampDutyBatchAppBarStatus";

const StampDutyPaymentAppBar = ({ }) => {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState("All");

  const handleSearchClick = useCallback(() => {
    const newParams = {
      // status: "Approved"
    };

    if (searchValue !== "") {
      newParams.name = searchValue;
    }

    if (status !== "All" && status !== null) {
      newParams.stamp_duty_status = status;
    }

    const entries = Object.entries(newParams);

    dispatch(
      getAllStampDutyPayments({
        params: {
          ...Object.fromEntries(entries),
        },
      })
    );
  }, [status, searchValue, dispatch]);

  return (
    <>
      <CustomAppBar>
        <StampDutyPaymentAppBarSearchInput onIdsChange={setSearchValue} />
        <StampDutySettlementAppBarStatus onChange={setStatus} />
        <Button variant="outlined" onClick={handleSearchClick}>
          Search
        </Button>
      </CustomAppBar>
    </>
  );
};

export default React.memo(StampDutyPaymentAppBar);
