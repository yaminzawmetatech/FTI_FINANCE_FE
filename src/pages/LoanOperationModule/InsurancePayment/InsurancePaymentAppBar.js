import React, { useState, useCallback } from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import ConfirmationModal from "common/ConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { getContracts } from "features/contract/contractSlice";
import openNewWindow from "utils/windowUtils";
import { showErrorToast } from "common/ToastMessage";
import { AppBar } from "@mui/material";
import InsurancePaymentExcelExport from "./InsurancePaymentExcelExport";

const InsuranceProcessAppBar = ({ applicationIds,selectedRows }) => {

  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // for confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body

  const handleConfirmed = () => {
    setIsConfirmModalOpen(false);
    const arrayOfIds = selectedRows.map(obj => obj.id);
    const category = selectedRows.map((contract) => contract.category_id);
    let paramsUrl = `/${category[0]}/Insurance?contract_ids=${arrayOfIds}`;
    openNewWindow(
        paramsUrl
    );
  };

  const checkConfirm = () => {
    const uniqueCategoryIds = [
      ...new Set(selectedRows.map((contract) => contract.category_id)),
    ];
    if (uniqueCategoryIds?.length > 1) {
      showErrorToast(CommonMessage.MFE00015);
    } else {
      setIsConfirmModalOpen(true);
      setConfirmMessage(CommonMessage.MFC00013);
    }
  };

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
        {/* <StampDutyProcessAppBarSearchInput onIdsChange={setSearchValue} />
        <StampDutyProcessAppBarCategories setCategory={setCategory} />
        <StampDutyPaymentDateRangeSearch
          onFromDateChange={setFromDate}
          onToDateChange={setToDate}
        />
        <Button variant="outlined" onClick={handleSearchClick}>
          Search
        </Button> */}
        <div style={{ display : "flex" }}>
          <div style={{ alignContent : "center"}}>
            No. Selected Row(s) : {selectedRows.length}
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Button
              variant="contained"
              onClick={() => {
                checkConfirm();
              }}
              disabled={selectedRows.length === 0}
            >
              Create New
            </Button>
            <InsurancePaymentExcelExport
              ids={searchValue}
              categoryId={category}
              fromDate={fromDate}
              toDate={toDate}
              applicationIds={applicationIds}
            />
          </div>
        </div>
      </AppBar>
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmed}
        message={confirmMessage}
      />
    </>
  );
};

export default React.memo(InsuranceProcessAppBar);
