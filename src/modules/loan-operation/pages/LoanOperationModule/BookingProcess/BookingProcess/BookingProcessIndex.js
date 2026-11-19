import React, { useState } from "react";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import useBookingForm from "./hooks/useBookingProcessForm";
import ToolbarBookingProcess from "./ToolbarBookingProcess";
import General from "./General";

const BookingProcessIndex = () => {
  const {
    control,
    handleSubmit,
    selectedBooking,
    onSubmit,
    handleChangeStatus,
    editAbleForm,
  } = useBookingForm();

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        // open={isSubmitting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Helmet>
        <title>Booking Process</title>
      </Helmet>

      <ToolbarBookingProcess
        handleChangeStatus={handleChangeStatus}
        selectedBooking={selectedBooking}
      />

      <Box
        sx={{
          px: 1,
          pb: 1,
          display: "flex",
          gap: 2,
          "@media (max-width: 600px)": {
            flexDirection: "column",
          },
          marginTop: "20px",
        }}
      >
        <Box sx={{ width: "100%", flex: 1 }}>
          <General control={control} selectedBooking={selectedBooking} />
        </Box>
      </Box>
      {editAbleForm ? (
        <Box sx={{ display: "flex", px: 1, pb: 1, justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            OK
          </Button>
        </Box>
      ) : null}
    </>
  );
};

export default BookingProcessIndex;
