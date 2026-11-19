import * as React from "react";
import TextField from '@mui/material/TextField';

const ReportAppBarSearchInput = ({onIdsChange}) => {

  const handleValueChange = (e) =>{
    
    const temp_id = e.target.value;
    onIdsChange(temp_id);
  }

  return (
    <TextField id="search-value" sx={{marginLeft:"5px"}} label="MNet ID/Application ID" variant="outlined" size="small" onChange={handleValueChange} />
  );
};

export default React.memo(ReportAppBarSearchInput);
