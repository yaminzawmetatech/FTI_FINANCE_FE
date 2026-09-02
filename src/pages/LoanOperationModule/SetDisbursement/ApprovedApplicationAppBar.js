import React, { useState, useCallback } from "react";
import CustomAppBar from "components/CustomAppBar";
import ApprovedApplicationAppBarSearchInput from "./ApprovedApplicationAppBarSearchInput";
import Button from "@mui/material/Button";
import { getApplication } from "features/application/applicationSlice";
import { useDispatch } from "react-redux";
import ApprovedApplicationAppBarCategories from "./ApprovedApplicationAppBarCategories";
import SetDibursementDateModal from "./SetDisbursementDateModal";
import ApprovedApplicationAppBarTownships from "./ApprovedApplicationAppBarTownships";
import AppBarSearchMNetTownship from "./AppBarSearchMNetTownship";
import SetDisburseAppBarDateTypeFilter from "./SetDisburseAppBarDateTypeFilter";
import SetDisburseAppBarDateFilter from "./SetDisburseAppBarDateFilter";
import { AppBar } from "@mui/material";

const ApprovedApplicationAppBar = ({ selectedRows }) => {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");
  const [township, setTownship] = useState("");
  const [searchMnetTownship, setSearchMnetTownship] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false); // for create confirm modal open

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [dateType, setDateType] = useState(null);

  const handleSearchClick = useCallback(() => {
    const newParams = {
      page: "1",
      status: "Approved",
      is_disbursed: 0,
    };

    if (category !== "") {
      newParams.category_id = category;
    }

    if (township !== "") {
      newParams.address_township_id = township?.id;
    }

    if (searchValue !== "") {
      newParams.ids = searchValue;
    }

    if (searchMnetTownship !== "") {
      newParams.mnet_township = searchMnetTownship;
    }

    if (fromDate !== null) {
      newParams.from_date = fromDate;
    }

    if (toDate !== null) {
      newParams.to_date = toDate;
    }

    newParams.date_type = dateType === null ? "Applied Date" : dateType;

    const entries = Object.entries(newParams);

    dispatch(
      getApplication({
        params: {
          ...Object.fromEntries(entries),
        },
      })
    );
  }, [
    category,
    township,
    searchValue,
    searchMnetTownship,
    dispatch,
    fromDate,
    toDate,
    dateType,
  ]);

  return (
    // <CustomAppBar>
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
        {/* <ApprovedApplicationAppBarSearchInput onIdsChange={setSearchValue} />
        <ApprovedApplicationAppBarCategories setCategory={setCategory} />
        <AppBarSearchMNetTownship
          onChangeMnetTownship={setSearchMnetTownship}
        />
        <ApprovedApplicationAppBarTownships onTownshipChange={setTownship} />
        <SetDisburseAppBarDateTypeFilter onDateTypeChange={setDateType} />
        <SetDisburseAppBarDateFilter
          onFromDateChange={setFromDate}
          onToDateChange={setToDate}
        />
        <Button
          sx={{ width: "max-content" }}
          variant="outlined"
          onClick={handleSearchClick}
        >
          Search
        </Button> */}
        <div style={{ display : "flex" }}>
          <div style={{ alignContent : "center"}}>
            No. Selected Row(s) : {selectedRows.length}
          </div>
        <div style={{ marginLeft: "auto" }}>
          <Button
            variant="contained"
            onClick={() => setCreateModalOpen(true)}
            disabled={selectedRows.length === 0}
          >
            Set Disbursed Date
          </Button>
        </div>
        </div>
        
      </AppBar>
      <SetDibursementDateModal
        selectedRows={selectedRows}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </>
    // </CustomAppBar>
  );
};

export default React.memo(ApprovedApplicationAppBar);
