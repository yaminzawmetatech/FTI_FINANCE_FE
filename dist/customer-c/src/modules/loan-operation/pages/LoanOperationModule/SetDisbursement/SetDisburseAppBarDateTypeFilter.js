import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";

const SetDisburseAppBarDateTypeFilter = ({ onDateTypeChange }) => {
  const types = ["Applied Date", "Approved Date"];

  const [searchValue, setSearchValue] = useState("Applied Date");

  const onSearch = (value) => {
    setSearchValue(value);
    onDateTypeChange(value);
  };

  return (
    <Autocomplete
      value={searchValue === null ? "Applied Date" : searchValue}
      id="date_type"
      name="date_type"
      options={types}
      renderInput={(params) => (
        <TextField {...params} label="Date Type" size="small" />
      )}
      onChange={(e, selectedValue) => {
        onSearch(selectedValue);
      }}
      sx={{ width: "120px", marginLeft: "2px", marginRight: "2px" }}
    />
  );
};

export default React.memo(SetDisburseAppBarDateTypeFilter);
