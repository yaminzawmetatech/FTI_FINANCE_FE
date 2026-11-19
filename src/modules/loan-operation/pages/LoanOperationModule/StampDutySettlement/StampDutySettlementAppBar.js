import React, { useState, useCallback } from "react";
import CustomAppBar from "components/CustomAppBar";
import StampDutyPaymentAppBarSearchInput from "./StampDutySettlementAppBarSearch";
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { getAllStampDutyPayments } from "modules/loan-operation/slices/stampDutyPaymentSlice";

const StampDutyPaymentAppBar = () => {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");

  const handleSearchClick = useCallback(() => {
    const newParams = {
      stamp_duty_status: "Approved"
    };

    if (searchValue !== "") {
      newParams.name = searchValue;
    }

    const entries = Object.entries(newParams);

    dispatch(
      getAllStampDutyPayments({
        params: {
          ...Object.fromEntries(entries),
        },
      })
    );
  }, [searchValue, dispatch]);

  return (
    <>
      <CustomAppBar>
        <StampDutyPaymentAppBarSearchInput onIdsChange={setSearchValue} />
        <Button variant="outlined" onClick={handleSearchClick}>
          Search
        </Button>
      </CustomAppBar>
    </>
  );
};

export default React.memo(StampDutyPaymentAppBar);
