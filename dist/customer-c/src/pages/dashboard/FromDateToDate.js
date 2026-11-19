import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const FromDateToDate = ({
  handleFromDateChange,
  handleToDateChange,
  searchData,
}) => {
  return (
    <Grid item xs={12} md={5} sx={{ mb: 2.25, marginTop: "20px" }}>
      <Grid container spacing={1.5}>
        <Grid item md={5} sx={{ mb: 2.25 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              slotProps={{ textField: { size: "small" } }}
              label="From Date"
              onChange={handleFromDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item md={5} sx={{ mb: 2.25 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              slotProps={{ textField: { size: "small" } }}
              label="To Date"
              onChange={handleToDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item md={2} sx={{ mb: 2.25 }}>
          <Button variant="outlined" onClick={searchData}>
            Search
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FromDateToDate;
