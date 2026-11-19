import * as React from "react";
import TextField from '@mui/material/TextField';

const ApprovedApplicationAppBarSearchInput = ({onNoChange}) => {

  const handleValueChange = (e) =>{
    onNoChange(e.target.value);
  }

  return (
    <TextField id="document_no" sx={{marginLeft:"5px", marginRight: "5px"}} label="Document No" variant="outlined" size="small" onChange={handleValueChange} />
  );
};

export default React.memo(ApprovedApplicationAppBarSearchInput);
