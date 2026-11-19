import * as React from "react";
import TextField from "@mui/material/TextField";

const ApprovedApplicationAppBarSearchInput = ({ onIdsChange }) => {
  const handleValueChange = (e) => {
    const temp_id = e.target.value;
    onIdsChange(temp_id);
  };

  return (
    <TextField
      id="search-value"
      sx={{ marginLeft: "2px", width: "135px" }}
      label="MNet ID/Application ID"
      variant="outlined"
      size="small"
      onChange={handleValueChange}
    />
  );
};

export default React.memo(ApprovedApplicationAppBarSearchInput);
