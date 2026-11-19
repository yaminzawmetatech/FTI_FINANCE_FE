import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppBar, Button } from "@mui/material";
import { createBooking, getAllBookings, updateBookings } from "modules/loan-operation/slices/bookingProcessSlice";
import { getContracts } from "modules/loan-operation/slices/contractSlice";
import BookingProcessExcelExport from "./BookingProcessExcelExport";
import CommonMessage from "common/CommonMessage";
import { showSuccessToast } from "common/ToastMessage";

const BookingAppBar = ({ bookingIds, transformedSearchData, selectedRows }) => {

  const dispatch = useDispatch();

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");

  // Handle Create Booking
  const checkConfirm = async () => {
    if (!selectedRows || selectedRows.length === 0) {
      console.error("No contracts selected.");
      return;
    }

    // Create the array of booking objects to update
    const bookingUpdates = selectedRows.map(row => {
      return {
        uuid: row.uuid, // Assuming contract_id is the uuid
        booking_status: "approved", // You can modify this based on your use case (e.g., "approved" or "rejected")
        category_id: row?.contract?.category_id,
      };
    });

    try {
      await dispatch(updateBookings(bookingUpdates,  // Pass the array to the action
      )).unwrap();
      showSuccessToast(
        CommonMessage.MFS00003.replace("%s", "Booking Process")
      );
      refreshData(); // Refresh the contract list
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  // Refresh Contracts List
  const refreshData = () => {
        dispatch(
          getAllBookings({
            firstFetch: true,
          })
        );
  };

  // Handle Search Click
  const handleSearchClick = useCallback(() => {
    const newParams = {};

    if (category !== "") newParams.category_id = category;
    if (searchValue !== "") newParams.ids = searchValue;
    if (fromDate !== null) newParams.from_date = fromDate;
    if (toDate !== null) newParams.to_date = toDate;

    dispatch(
      getAllBookings({
        params: {
          ...newParams,

        },
      })
    );
  }, [searchValue, dispatch, category, fromDate, toDate]);

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
        <div style={{ marginLeft: "auto" }}>

          <Button
            variant="contained"
            type="submit"
            disabled={selectedRows.length === 0}
            onClick={checkConfirm}
          >
            Approved
          </Button>

          <BookingProcessExcelExport bookingIds={bookingIds} transformedSearchData={transformedSearchData} />
        </div>
      </AppBar>
    </>
  );
};

export default React.memo(BookingAppBar);
