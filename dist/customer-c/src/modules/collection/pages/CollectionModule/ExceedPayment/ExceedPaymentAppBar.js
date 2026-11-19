import React, { act, useState } from "react";
import { useDispatch } from "react-redux";
import ExceedPaymentExportButton from "./ExceedPaymentExportButton";
import { AppBar } from "@mui/material";
import Button from "@mui/material/Button";
import { showSuccessToast } from "common/ToastMessage";
import { getExceedPayments, refundPayments } from "modules/loan-operation/slices/contractSlice";

const ExceedPaymentAppBar = ({ transformedSearchData, activeTab, selectedRows, type, isActive }) => {
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false); // <-- NEW STATE

  const checkConfirm = async () => {
    if (!selectedRows || selectedRows.length === 0) {
      console.error("No exceed payments selected.");
      return;
    }

    const uniqueRefundUuids = selectedRows.map((refund) => refund?.uuid);

    try {
      setIsSubmitting(true); // disable button during request
      await dispatch(
        refundPayments({
          uuids: uniqueRefundUuids,
        })
      ).unwrap();

      showSuccessToast("Due Retain Period Exceed Payment Refund Successfully");
      refreshData();
    } catch (error) {
      console.error("Error creating booking:", error);
    } finally {
      setIsSubmitting(false); // re-enable button
    }
  };

  const refreshData = () => {
    if (isActive) {
      dispatch(
        getExceedPayments({
          ...transformedSearchData,
          firstFetch: true,
          params: {
            exceed_status: type
          },
        })
      );
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
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end", // align all children to the right
          paddingX: 2,
          paddingY: 1,
          gap: 2, // spacing between button and export
        }}
      >
        {
          activeTab === '2' && (
            <Button
              variant="contained"
              type="submit"
              disabled={selectedRows.length === 0 || isSubmitting}
              onClick={checkConfirm}
            >
              Refund Exceed Payment
            </Button>
          )
        }

        <ExceedPaymentExportButton activeTab={activeTab} transformedSearchData={transformedSearchData} />
      </AppBar>

    </>
  );

};

export default React.memo(ExceedPaymentAppBar);