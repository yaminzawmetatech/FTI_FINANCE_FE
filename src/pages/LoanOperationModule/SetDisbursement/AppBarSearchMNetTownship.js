import * as React from "react";
import TextField from "@mui/material/TextField";

const AppBarSearchMNetTownship = ({ onChangeMnetTownship }) => {
  const handleValueChange = (e) => {
    onChangeMnetTownship(e.target.value);
  };

  return (
    <TextField
      sx={{ width: "120px" }}
      id="search-township"
      label="MNet Township"
      variant="outlined"
      size="small"
      onChange={handleValueChange}
    />
  );
};

export default React.memo(AppBarSearchMNetTownship);
