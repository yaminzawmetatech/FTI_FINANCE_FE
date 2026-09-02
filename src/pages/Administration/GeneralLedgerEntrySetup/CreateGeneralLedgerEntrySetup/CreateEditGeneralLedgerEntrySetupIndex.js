import React, { useState, useMemo } from "react";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import useGeneralLedgerEntrySetupForm from "./hooks/useGeneralLedgerEntrySetupForm";
import CommonMessage from "common/CommonMessage";
import ConfirmationModal from "common/ConfirmationModal";
import GeneralLedgerEntryAccSetupLines from "./GeneralLedgerEntryAccSetupLines";
import General from "./General";
import { useWatch } from "react-hook-form";

const CreateEditGeneralLedgerEntrySetupIndex = () => {
  const {
    control,
    handleSubmit,
    isSubmitting,
    onSubmit,
    editAbleForm,
    generalLedgerEntrySetups,
    setTableData,
    tableData,
    setValue,
    values,
    valuesLoading,
    getGeneralRepaymentAmountTypes,
    getGeneralRepaymentDateTypes,
    accountTypes,
    amountTypes,
    transactionTypes,
    accountCodes,
  } = useGeneralLedgerEntrySetupForm();


  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // for confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for confirm message body
  
      // Watch for selected account type
      const selectedAccountType = useWatch({ control, name: "account_type" });

  
      const selectedGroupCode = useMemo(() => {
        if (!Array.isArray(accountTypes)) return null; // Prevent errors if undefined
        return accountTypes.find((item) => item.key === selectedAccountType)?.group_code;
      }, [selectedAccountType, accountTypes]);
      
    
      const filteredAmountTypes = useMemo(() => {
        if (!Array.isArray(amountTypes) || !selectedGroupCode) return []; // Ensure amountTypes is an array & selectedGroupCode is valid
        return amountTypes.filter((amount) => amount?.group_code?.includes(selectedGroupCode));
      }, [selectedGroupCode, amountTypes]);
      
  

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSubmitting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Helmet>
        <title>General Ledger Entry Setup</title>
      </Helmet>
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
          <General control={control} setValue={setValue} getGeneralRepaymentAmountTypes={getGeneralRepaymentAmountTypes} getGeneralRepaymentDateTypes={getGeneralRepaymentDateTypes} accountTypes={accountTypes} amountTypes={amountTypes} transactionTypes={transactionTypes} />
          <GeneralLedgerEntryAccSetupLines
            tableData={tableData}
            setTableData={setTableData}
            values={values}
            valuesLoading={valuesLoading}
            generalLedgerEntrySetup={generalLedgerEntrySetups}
            filteredAmountTypes={filteredAmountTypes}
            control={control}
            transactionTypes={transactionTypes}
            setValue={setValue}
            accountCodes={accountCodes}
          />
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
      {/* <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        //onConfirm={handleSubmit(onSubmit())}
        onConfirm={ () => {
          setIsConfirmModalOpen(false);
          handleSubmit(onSubmit());
        }
        } 
        message={confirmMessage}
      /> */}
    </>
  );
};

export default CreateEditGeneralLedgerEntrySetupIndex;
