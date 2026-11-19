import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppBar, Button } from "@mui/material";
import { createBooking } from "modules/loan-operation/slices/bookingProcessSlice";
import { getContracts } from "modules/loan-operation/slices/contractSlice";
import RequestForBookingExcelExport from "./RequestForBookingExcelExport";
import CommonMessage from "common/CommonMessage";
import { showSuccessToast } from "common/ToastMessage";

const RequestForBookingAppBar = ({ contractIds, transformedSearchData, selectedRows }) => {
  const dispatch = useDispatch();

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // <-- NEW STATE

  const checkConfirm = async () => {
    if (!selectedRows || selectedRows.length === 0) {
      console.error("No contracts selected.");
      return;
    }

    const uniqueContractIds = selectedRows.map((contract) => contract.id);

    try {
      setIsSubmitting(true); // disable button during request
      await dispatch(
        createBooking({
          body: { contract_ids: uniqueContractIds }
        })
      ).unwrap();

      showSuccessToast(CommonMessage.MFS00001.replace("%s", "Booking Process"));
      refreshData();
    } catch (error) {
      console.error("Error creating booking:", error);
      //alert("Failed to create booking.");
    } finally {
      setIsSubmitting(false); // re-enable button
    }
  };

  const refreshData = () => {
    dispatch(
      getContracts({
        params: { is_generated_gl: 1, is_booking: 0, mob_status: 1 },
      })
    );
  };

  const handleSearchClick = useCallback(() => {
    const newParams = {};

    if (category !== "") newParams.category_id = category;
    if (searchValue !== "") newParams.ids = searchValue;
    if (fromDate !== null) newParams.from_date = fromDate;
    if (toDate !== null) newParams.to_date = toDate;

    dispatch(
      getContracts({
        params: {
          ...newParams,
          is_generated_gl: 1,
          mob_status: 1,
        },
      })
    );
  }, [searchValue, dispatch, category, fromDate, toDate]);

  return (
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
      <div style={{ marginLeft: "auto" }}>
        <Button
          variant="contained"
          type="submit"
          disabled={selectedRows.length === 0 || isSubmitting} // <--- disabled while submitting
          onClick={checkConfirm}
        >
          Request For Booking
        </Button>

        <RequestForBookingExcelExport
          contractIds={contractIds}
          transformedSearchData={transformedSearchData}
        />
      </div>
    </AppBar>
  );
};

export default React.memo(RequestForBookingAppBar);
