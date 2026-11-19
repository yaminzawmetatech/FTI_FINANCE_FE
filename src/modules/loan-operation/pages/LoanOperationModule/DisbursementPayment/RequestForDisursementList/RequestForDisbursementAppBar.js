import React, { useState, useCallback } from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import ConfirmationModal from "common/ConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { getContracts, updateContractDisbursement } from "modules/loan-operation/slices/contractSlice";
import openNewWindow from "utils/windowUtils";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import { AppBar } from "@mui/material";
import RequestForDisbursementExcelExport from "./RequestForDisbursementExcelExport";
import { getAllBookings } from "modules/loan-operation/slices/bookingProcessSlice";

const DisbursementProcessAppBar = ({ applicationIds, selectedRows }) => {

  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false); // <-- NEW STATE

  const checkConfirm = async () => {
    if (!selectedRows || selectedRows.length === 0) {
      console.error("No contracts selected.");
      return;
    }

    const uniqueContractIds = selectedRows.map((contract) => contract?.contract_id);

    try {
      setIsSubmitting(true); // disable button during request
      await dispatch(
        updateContractDisbursement({
            contract_ids: uniqueContractIds, request_for_disbursement: 1
        })
      ).unwrap();

      showSuccessToast(CommonMessage.MFS00001.replace("%s", "Request For Disbursement"));
      refreshData();
    } catch (error) {
      console.error("Error creating booking:", error);
    } finally {
      setIsSubmitting(false); // re-enable button
    }
  };

  const refreshData = () => {
    dispatch(
      getAllBookings({
        firstFetch: true,
        params: {
          booking_status: ["approved"],
          request_for_disbursement: 0
        }
      })
    );
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
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end", // align all children to the right
          paddingX: 2,
          paddingY: 1,
          gap: 2, // spacing between button and export
        }}
      >
        <Button
          variant="contained"
          type="submit"
          disabled={selectedRows.length === 0 || isSubmitting}
          onClick={checkConfirm}
        >
          Request For Disbursement
        </Button>

        <RequestForDisbursementExcelExport applicationIds={applicationIds} />
      </AppBar>
    </>


  );
};

export default React.memo(DisbursementProcessAppBar);
