import React, { useState, useCallback } from "react";
import CustomAppBar from "components/CustomAppBar";
import ContractAppBarSearchInput from "./ContractAppBarSearchInput";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import ContractAppBarCategories from "./ContractAppBarCategories";
import { getContracts } from "modules/loan-operation/slices/contractSlice";
import ContractExportButton from "./ContractExportButton";
import ContractAppBarDateRange from "./ContractAppBarDateRange";
import { AppBar } from "@mui/material";

const ContractAppBar = ({ contractIds, transformedSearchData }) => {
  const dispatch = useDispatch();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");

  const handleSearchClick = useCallback(() => {
    const newParams = {};

    if (category !== "") {
      newParams.category_id = category;
    }

    if (searchValue !== "") {
      newParams.ids = searchValue;
    }

    if (fromDate !== null) {
      newParams.from_date = fromDate;
    }

    if (toDate !== null) {
      newParams.to_date = toDate;
    }

    const entries = Object.entries(newParams);

    dispatch(
      getContracts({
        params: {
          ...Object.fromEntries(entries),
          is_generated_gl: 1,
        },
      })
    );
  }, [searchValue, dispatch, category, fromDate, toDate, dispatch]);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fafafb",
          color: "black",
          boxShadow: "none",
          mb: 1,
          mt: -1,
        }}
      >
        {/* <ContractAppBarSearchInput onIdsChange={setSearchValue}/>
                <ContractAppBarCategories setCategory={setCategory}/>
                <ContractAppBarDateRange onFromDateChange={setFromDate}
                                             onToDateChange={setToDate}
                />
                <Button variant="outlined" onClick={handleSearchClick} sx={{marginLeft: "10px"}}>
                    Search
                </Button> */}
        <div style={{ marginLeft: "auto" }}>
          <ContractExportButton contractIds={contractIds} transformedSearchData={transformedSearchData} />
        </div>
      </AppBar>
    </>
  );
};

export default React.memo(ContractAppBar);
