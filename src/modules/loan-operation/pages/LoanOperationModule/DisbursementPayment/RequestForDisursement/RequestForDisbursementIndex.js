import React, { useState } from "react";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import ToolbarBookingProcess from "./ToolbarBookingProcess";
import General from "./General";
import LoanInformation from "./LoanInformation";
import useRequestForDisbursementFrom from "./hooks/useRequestForDisbursementForm";

const RequestForDisbursementIndex = () => {
  const {
    control,
    handleSubmit,
    selectedBooking,
    onSubmit,
    customerBanks,
  } = useRequestForDisbursementFrom();


  const { route } = useParams();

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      // open={isSubmitting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Helmet>
        <title>Request For Disbursement</title>
      </Helmet>

      <ToolbarBookingProcess
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
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
          <General control={control} selectedBooking={selectedBooking} customerBanks={customerBanks}/>
          <LoanInformation control={control} contract={selectedBooking?.data?.contract} />
        </Box>
      </Box>
      {/* {editAbleForm ? ( */}
      <Box sx={{ display: "flex", px: 1, pb: 1, justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          OK
        </Button>
      </Box>
      {/* ) : null} */}
    </>
  );
};

export default RequestForDisbursementIndex;
