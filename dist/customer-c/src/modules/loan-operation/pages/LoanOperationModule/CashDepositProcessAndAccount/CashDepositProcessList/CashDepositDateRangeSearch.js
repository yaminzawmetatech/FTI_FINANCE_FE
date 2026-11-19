import React, { useState } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const CashDepositDateRangeSearch = ({ onFromDateChange, onToDateChange }) => {
  const [params, setParams] = useSearchParams();
  // const searchFromValue = useMemo(() => params.get("from_date"), [params]);
  // const searchToValue = useMemo(() => params.get("to_date"), [params]);

  const handleFromDateChange = (date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD H:mm:ss") : "";
    onFromDateChange(formattedDate);
  };

  const handleToDateChange = (date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD H:mm:ss") : "";
    onToDateChange(formattedDate);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          slotProps={{ textField: { size: "small" } }}
          label="From Date"
          onChange={handleFromDateChange}
          sx={{ marginLeft: "5px", width: "150px" }}
          //value={searchFromValue ? dayjs(searchFromValue) : null}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          slotProps={{ textField: { size: "small" } }}
          label="To Date"
          onChange={handleToDateChange}
          sx={{ marginLeft: "5px", width: "150px" , marginRight: "5px"}}
          //value={searchToValue ? dayjs(searchToValue) : null}
        />
      </LocalizationProvider>
    </>
  );
};

export default React.memo(CashDepositDateRangeSearch);
