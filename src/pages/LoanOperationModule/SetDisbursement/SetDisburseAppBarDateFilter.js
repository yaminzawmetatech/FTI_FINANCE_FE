import React, { useState } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const SetDisburseAppBarDateFilter = ({ onFromDateChange, onToDateChange }) => {
    const [params, setParams] = useSearchParams();
    // const searchFromValue = useMemo(() => params.get("from_date"), [params]);
    // const searchToValue = useMemo(() => params.get("to_date"), [params]);

    const handleFromDateChange = (date) => {
        const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : "";
        onFromDateChange(formattedDate);
    };

    const handleToDateChange = (date) => {
        const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : "";
        onToDateChange(formattedDate);
    };

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    slotProps={{ textField: { size: "small" } }}
                    label="From Date"
                    onChange={handleFromDateChange}
                    sx={{ marginLeft: "2px", width: "150px" }}
                    //value={searchFromValue ? dayjs(searchFromValue) : null}
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    slotProps={{ textField: { size: "small" } }}
                    label="To Date"
                    onChange={handleToDateChange}
                    sx={{ margin: "2px", width: "150px" }}
                    //value={searchToValue ? dayjs(searchToValue) : null}
                />
            </LocalizationProvider>
        </>
    );
};

export default React.memo(SetDisburseAppBarDateFilter);
