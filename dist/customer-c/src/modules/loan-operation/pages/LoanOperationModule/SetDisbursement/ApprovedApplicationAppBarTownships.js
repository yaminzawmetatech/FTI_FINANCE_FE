import React, { useEffect, useState} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { getAddressTownships } from "modules/administration/slices/addressTownshipSlice";

const ApprovedApplicationAppBarTownships = ({onTownshipChange}) => {

  const dispatch = useDispatch();

  const { addressTownships } = useSelector((state) => state.addressTownships);

  useEffect(()=> {
    dispatch(getAddressTownships());
  },[dispatch])


  const [ searchValue, setSearchValue ] = useState(null);

  const onSearch = (value) =>{
    setSearchValue(value);
    onTownshipChange(value);
  }

  return (

    <Autocomplete
      value={searchValue}
      id="id"
      name="id"
      options={addressTownships}
      getOptionLabel={(option) => option?.name || ""}
      renderInput={(params) => <TextField {...params} label="Townships" size="small"  />}
      onChange={(e, selectedValue) => {
        onSearch(selectedValue);
      }}
      sx={{ width:"120px", marginLeft: "2px", marginRight: "2px" }}
    />
  );
};

export default React.memo(ApprovedApplicationAppBarTownships);
