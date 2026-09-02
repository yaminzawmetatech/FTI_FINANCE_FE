import * as React from "react";
import TextField from "@mui/material/TextField";

const StampDutyProcessAppBarSearchInput = ({ onIdsChange }) => {
  const handleValueChange = (e) => {
    const temp_id = e.target.value;
    onIdsChange(temp_id);
  };

  return (
    <TextField
      id="search-value"
      sx={{
        marginLeft: "5px",
        "@media (min-width: 600px)": {
          width: "120px", // Set a different width for screens with a maximum width of 600px
        },
      }}
      label="Application ID"
      variant="outlined"
      size="small"
      onChange={handleValueChange}
    />
  );
};

export default React.memo(StampDutyProcessAppBarSearchInput);
