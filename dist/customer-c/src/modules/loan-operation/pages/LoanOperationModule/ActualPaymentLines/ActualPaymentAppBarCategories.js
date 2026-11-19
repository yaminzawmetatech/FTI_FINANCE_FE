import React, { useEffect, useState} from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { getProjectCategory } from "modules/administration/slices/projectcategorySlice";
import { useDispatch, useSelector } from "react-redux";

const ActualPaymentAppBarCategories = ({onCategoryChange}) => {

  const dispatch = useDispatch();

  const { projectCategories, isError, isSuccess, isLoading, message } =
  useSelector((state) => state.projectCategories);

  useEffect(()=> {
    dispatch(getProjectCategory());
  },[dispatch])


  const [ searchValue, setSearchValue ] = useState(null);

  const onSearch = (value) =>{
    setSearchValue(value);
    onCategoryChange(value);
  }

  return (

    <Autocomplete
      value={searchValue}
      id="category_id"
      name="category_id"
      options={projectCategories}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => <TextField {...params} label="Category" size="small"  />}
      onChange={(e, selectedValue) => {
        onSearch(selectedValue);
      }}
      sx={{ width:"200px", marginLeft: "5px", marginRight: "5px" }}
    />
  );
};

export default React.memo(ActualPaymentAppBarCategories);
