import React, { useState, useCallback, useEffect } from "react";
import CustomAppBar from "components/CustomAppBar";
import CashDepositAppBarStatus from "./CashDepositAppBarStatus";
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import CashDepositAppBarCategories from "./CashDepositAppBarCategories";
import CashDepositDateRangeSearch from "./CashDepositDateRangeSearch";
import openNewWindow from "utils/windowUtils";
import { getAllCashDeposits } from "features/cashDepositProcess/cashDepositSlice";
import { AppBar } from "@mui/material";

const CashDepositAppBar = ({ }) => {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);// for delete confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body
  const [status, setStatus] = useState("All");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const handleSearchClick = useCallback(() => {
    const newParams = {
      // status: "Approved"
    };

    if (category !== "") {
      newParams.category_id = category?.id;
    }

    if (fromDate !== null) {
      newParams.from_date = fromDate;
    }

    if (toDate !== null) {
      newParams.to_date = toDate;
    }

    if (searchValue !== "") {
      newParams.ids = searchValue;
    }

    if (status !== "All" && status !== null) {
      newParams.status = status;
    }

    const entries = Object.entries(newParams);

    dispatch(
      getAllCashDeposits({
        params: {
          ...Object.fromEntries(entries),
        },
      })
    );
  }, [category, status, searchValue, dispatch]);

  return (
    <>
      <AppBar
      position="static"
      sx={{
        backgroundColor: "#fafafb",
        color: "black",
        boxShadow: "none",
        mb: 1,
        mt: -1,
      }}>
        {/* <CashDepositAppBarCategories onCategoryChange={setCategory} />
        <CashDepositDateRangeSearch
          onFromDateChange={setFromDate}
          onToDateChange={setToDate}
        />
        <CashDepositAppBarStatus  onChange={setStatus} />
        <Button variant="outlined" onClick={handleSearchClick}>
          Search
        </Button> */}
        <div style={{ marginLeft: "auto" }}>
          <Button
            variant="contained"
            onClick={() => {
              openNewWindow(
                `/CashDepositProcess/create`
              );
            }}
          >
            Create New
          </Button>
        </div>
      </AppBar>
    </>
  );
};

export default React.memo(CashDepositAppBar);
