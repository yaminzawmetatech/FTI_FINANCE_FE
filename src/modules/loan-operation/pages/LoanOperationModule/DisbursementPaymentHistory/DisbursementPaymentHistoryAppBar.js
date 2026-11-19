import React, { useState, useCallback } from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import ConfirmationModal from "common/ConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { getContracts } from "modules/loan-operation/slices/contractSlice";
import openNewWindow from "utils/windowUtils";
import { showErrorToast } from "common/ToastMessage";
import { AppBar } from "@mui/material";
import DisbursementPaymentHistoryExcelExport from "./DisbursementPaymentHistoryExcelExport";
import { createDisbursementGeneratedSMS } from "modules/collection/slices/smsGenerateSlice";
import axiosInstanceV2 from "core/services/api/axiosInstanceV2";
import { saveAs } from "file-saver";

const DisbursementPaymentHistoryAppBar = ({ applicationIds, selectedRows }) => {

  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // for confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body
  const dispatch = useDispatch();

  const handleConfirmed = async () => {
    try {
      setIsConfirmModalOpen(false);
  
      const arrayOfIds = selectedRows.map(obj => obj.id);
      const category = selectedRows.length > 0 ? selectedRows[0].category_id : null;
  
      if (!category) {
        throw new Error("Category is missing from selected rows.");
      }
  
      const smsTypes = [];
      const hasDealer = selectedRows.some(row => row.dealer_disbursed_amount > 0);
      const hasCustomer = selectedRows.some(row => row.customer_disbursed_amount > 0);
  
      if (hasDealer) smsTypes.push("disbursement-dealer");
      if (hasCustomer) smsTypes.push("disbursement-customer");
  
      if (smsTypes.length === 0) {
        throw new Error("No valid disbursement type found (dealer/customer).");
      }
  
      // Step 1: Create SMS
      const createResponse = await dispatch(
        createDisbursementGeneratedSMS({
          contract_ids: arrayOfIds,
          sms_types: smsTypes,
          application_status: selectedRows?.[0]?.application?.status?.toLowerCase() || null,
          category_id: category,
        })
      ).unwrap();
    
  
      // Step 2: If success, call export
      if (createResponse?.success) {
        await handleExport(arrayOfIds);
      } else {
        showErrorToast("SMS creation failed. Export skipped.");
      }
  
      // Step 3: Refresh contracts list
      await dispatch(
        getContracts({
          params: {
            disbursement_status: "approved",
            is_generated_gl: true,
            mob_status: 1,
            disbursement_generate_sms: 0,
          },
          firstFetch: true,
        })
      ).unwrap();
  
    } catch (error) {
      console.error("Error during disbursement generation:", error);
      // showErrorToast(error?.message || "An error occurred during SMS generation.");
    }
  };
  
  const handleExport = async (contractIds) => {
    try {
      const response = await axiosInstanceV2.get(
        "/download-disbursement-sms-histories-excel",
        {
          params: {
            contract_ids: contractIds, // Ensure backend handles array properly (as CSV or repeated keys)
            is_exported: 0,
          },
          paramsSerializer: params => {
            const query = new URLSearchParams();
            params.contract_ids.forEach(id => query.append("contract_ids[]", id));
            query.append("is_exported", params.is_exported);
            return query.toString();
          },
          responseType: "arraybuffer",
        }
      );
  
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
  
      saveAs(blob, "SMSHistory.xlsx");
  
    } catch (error) {
      console.error("Export error:", error);
      if (error.response && error.response.data) {
        const decoder = new TextDecoder("utf-8");
        const errorText = decoder.decode(error.response.data);
        try {
          const parsedError = JSON.parse(errorText);
          const errorMessage = parsedError.message || "An unknown error occurred";
          showErrorToast(errorMessage);
        } catch (e) {
          showErrorToast("Failed to parse server error.");
        }
      } else {
        showErrorToast("An error occurred during export.");
      }
    }
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
        <div style={{ display: "flex" }}>
          <div style={{ alignContent: "center" }}>
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
              Generate SMS
            </Button>
            <DisbursementPaymentHistoryExcelExport
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

export default React.memo(DisbursementPaymentHistoryAppBar);
