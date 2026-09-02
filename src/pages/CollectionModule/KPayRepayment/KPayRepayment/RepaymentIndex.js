import React from "react";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import useRepaymentForm from "./hooks/useRepaymentForm";
import RepaymentToolbar from "./RepaymentToolbar";
import General from "./General";
import MonthlyInstallment from "./MonthlyInstallment";

const KPayRepaymentIndex = () => {
  const {
    control,
    isSubmitting,
    isShowToolbar,
    isDisable,
    stampDutyPayments,
    handleChangeStatus,
    handlePosted,
    repaymentDetails,
    isLoading,
    selectedRows,
    setSelectedRows,
  } = useRepaymentForm();

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSubmitting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Helmet>
        <title>Repayment</title>
      </Helmet>
      {isShowToolbar && (
        <RepaymentToolbar
          handleChangeStatus={handleChangeStatus}
          isDisable={isDisable}
          handlePosted={handlePosted}
          repaymentDetails={repaymentDetails}
        />
      )}

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
          <General
            control={control}
            stampDutyPayments={stampDutyPayments}
            repaymentDetails={repaymentDetails}
          />
          <MonthlyInstallment
            isLoading={isLoading}
            repayment={repaymentDetails}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
        </Box>
      </Box>
    </>
  );
};

export default KPayRepaymentIndex;
