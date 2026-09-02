import React, { useState, useCallback } from "react";
import ContractExportButton from "./ContractExportButton";
import { AppBar } from "@mui/material";

const ContractAppBar = ({ contractIds, transformedSearchData, auth }) => {

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
