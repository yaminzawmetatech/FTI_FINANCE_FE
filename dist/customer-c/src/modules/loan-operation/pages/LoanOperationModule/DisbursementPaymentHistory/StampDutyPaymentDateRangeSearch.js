import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const StampDutyPaymentDateRangeSearch = ({
  onFromDateChange,
  onToDateChange,
}) => {
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
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          slotProps={{ textField: { size: "small" } }}
          label="To Date"
          onChange={handleToDateChange}
          sx={{ marginLeft: "5px", width: "150px", marginRight: "5px" }}
        />
      </LocalizationProvider>
    </>
  );
};

export default React.memo(StampDutyPaymentDateRangeSearch);
