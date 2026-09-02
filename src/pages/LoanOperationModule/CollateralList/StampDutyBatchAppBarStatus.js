import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { STATUS } from "constants/status";

const StampDutySettlementAppBarStatus = ({ onChange }) => {
  const [searchValue, setSearchValue] = useState("All");

  const onSearch = (value) => {
    setSearchValue(value);
    onChange(value);
  };

  return (
    <Autocomplete
      value={searchValue === null ? "All" : searchValue}
      options={STATUS}
      renderInput={(params) => (
        <TextField {...params} label="Status" size="small" />
      )}
      onChange={(e, selectedValue) => {
        onSearch(selectedValue);
      }}
      sx={{ width: "200px", marginLeft: "5px", marginRight: "5px" }}
    />
  );
};

export default React.memo(StampDutySettlementAppBarStatus);
