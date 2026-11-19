import React from "react";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import useRepaymentForm from "./hooks/useRepaymentForm";
import RepaymentToolbar from "./RepaymentToolbar";
import General from "./General";
import MonthlyInstallment from "./MonthlyInstallment";
import BankStatementImportError from "./BankStatementImportError";
import EarlyTermination from "./EarlyTermination";
import DownPayment from "./DownPayment";
import RecoveryIncome from "./RecoveryIncome";

const RepaymentIndex = () => {
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
    selectedETRows,
    setSelectedRows,
    setSelectedETRows,
    setSelectedRecoveryRows,
    selectedRecoveryRows,
    setSelectedDPRows,
    selectedDPRows
  } = useRepaymentForm();

  const settlements = repaymentDetails?.settlements ?? [];

  const downPaymentRows = settlements.filter(
    (row) => row.type === "downpayment"
  );
  const monthlyInstallmentRows = settlements.filter(
    (row) => row.type === "monthly_installment"
  );
  const earlyTerminationRows = settlements.filter(
    (row) => row.type === "early_settlement"
  );
  const recoveryIncomeRows = settlements.filter(
    (row) => row.type === "recovery_income"
  );
  const bankStatementErrorRows = settlements.filter((row) => !row.is_ok);

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
          {bankStatementErrorRows.length > 0 && (
            <BankStatementImportError
              isLoading={isLoading}
              repayment={repaymentDetails}
            />
          )}
          {downPaymentRows.length > 0 && (
            <DownPayment
              isLoading={isLoading}
              repayment={repaymentDetails}
              selectedDPRows={selectedDPRows}
              setSelectedDPRows={setSelectedDPRows}
            />
          )}

          {monthlyInstallmentRows.length > 0 && (
            <MonthlyInstallment
              isLoading={isLoading}
              repayment={repaymentDetails}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
            />
          )}

          {earlyTerminationRows.length > 0 && (
            <EarlyTermination
              isLoading={isLoading}
              repayment={repaymentDetails}
              selectedETRows={selectedETRows}
              setSelectedETRows={setSelectedETRows}
            />
          )}

          {recoveryIncomeRows.length > 0 && (
            <RecoveryIncome
              isLoading={isLoading}
              repayment={repaymentDetails}
              selectedRecoveryRows={selectedRecoveryRows}
              setSelectedRecoveryRows={setSelectedRecoveryRows}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default RepaymentIndex;
