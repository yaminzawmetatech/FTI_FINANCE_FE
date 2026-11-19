import React, { useMemo, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, CircularProgress, Backdrop, TextField } from "@mui/material";
import Accordion from "components/Accordion";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { useParams } from "react-router-dom";
import FormInputSelect from "components/form/FormInputSelect";
import { useWatch } from "react-hook-form";
import FormInputText from "components/form/FormInputText";

const GeneralLedgerEntryAcctSetupLines = ({
  tableData,
  setTableData,
  generalLedgerEntrySetup,
  valuesLoading,
  values,
  control,
  filteredAmountTypes,
  transactionTypes,
  setValue,
  accountCodes,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const gridApiRef = useRef(null);

  const account_code_id = useWatch({
    control,
    name: "account_code_id",
  });

  const amount_type = useWatch({
    control,
    name: "amount_type",
  });

  const transaction_type = useWatch({
    control,
    name: "transaction_type",
  });

  const { mode, uuid } = useParams();

  const handleAddSetup = () => {
    // Find the matching account code to get the account number
    const matchingAccountCodes = accountCodes.find(
      (accountCode) => accountCode?.id === account_code_id
    );

    const newRow = {
      account_code_id: account_code_id,
      account_no: matchingAccountCodes?.account_no || "",
      amount_type: amount_type,
      transaction_type: transaction_type,
      accountCode: matchingAccountCodes?.name || "",
    };
    setTableData((prevData) => [...prevData, newRow]);

    // Reset input fields after adding
    setValue("account_code_id", null);
    setValue("amount_type", "");
    setValue("transaction_type", "");
  };

  const handleRemoveSelectedRows = () => {
    const updatedTableData = tableData.filter(
      (row) => !selectedRows.includes(row)
    );
    setTableData(updatedTableData);
    setSelectedRows([]);
  };

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      editable: false, // Default to non-editable
      cellDataType: false,
    };
  }, []);

  const columnDefs = useMemo(() => {
    // Transform options for AG Grid dropdowns and memoize them to prevent re-creation
    const amountTypeOptions = filteredAmountTypes?.map(item => item.key) || [];
    const transactionTypeOptions = transactionTypes?.map(item => item.key) || [];

    return [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        minWidth: 70,
      },
      {
        field: "account_no",
        headerName: "Account No.",
        minWidth: 150,
        editable: true, // Make this column editable
        sortable: true,
        resizable: true,
      },
      {
        field: "accountCode",
        headerName: "Account Code",
        minWidth: 200,
        editable: false, // This column is now read-only and auto-populated
        sortable: true,
        resizable: true,
      },
      {
        field: "amount_type",
        headerName: "Amount Type",
        minWidth: 200,
        editable: true, // Make this column editable
        sortable: true,
        resizable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: amountTypeOptions,
        },
      },
      {
        field: "transaction_type",
        headerName: "Transaction Type",
        minWidth: 200,
        editable: true, // Make this column editable
        sortable: true,
        resizable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: transactionTypeOptions,
        },
      },
    ];
  }, [filteredAmountTypes, transactionTypes]);

  useEffect(() => {
    if (gridApiRef.current) {
      // Use setRowData to update the grid with the new tableData
      gridApiRef.current.setRowData(tableData);
    }
  }, [tableData]);

  const onGridReady = (params) => {
    gridApiRef.current = params.api;
  };

  const onCellValueChanged = (params) => {
    const { data, newValue, colDef } = params;
    let updatedRow = { ...data };

    // If the account number is changed, find the corresponding account code
    if (colDef.field === "account_no") {
      const matchingAccount = accountCodes.find(
        (account) => account.account_no === newValue
      );
      if (matchingAccount) {
        updatedRow.account_code_id = matchingAccount.id;
        updatedRow.accountCode = matchingAccount.name;
        updatedRow.account_no = newValue; // Ensure the new value is set
      } else {
        // If no match is found, clear the associated fields
        updatedRow.account_code_id = null;
        updatedRow.accountCode = null;
        updatedRow.account_no = newValue;
      }
    } else {
      // For other editable fields (like amount_type and transaction_type), just update the value
      updatedRow[colDef.field] = newValue;
    }

    setTableData((prevData) =>
      prevData.map((row) =>
        row === data ? updatedRow : row
      )
    );
  };

  const onSelectionChanged = () => {
    const selectedNodes = gridApiRef.current.getSelectedNodes();
    const selectedRows = selectedNodes.map((node) => node.data);
    setSelectedRows(selectedRows);
  };

  const uniqueAccountCodes = accountCodes.map((item, index) => ({
    ...item,
    uniqueKey: `${item.name}-${index}`,
  }));

  return (
    <Accordion title="General Ledger Entry Account Lines">
      <Box sx={{ mt: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <FormInputSelect
            control={control}
            options={uniqueAccountCodes ?? []}
            getOptionLabel={(option) =>`(${option.account_no ?? ""}) - ${option.name ?? ""}`}
            // The fix is here: use the new, unique key for getOptionValue

            id="id"
            label="Account Code"
            name="account_code_id"
            fullWidth
            margin="normal"
          />
          <FormInputSelect
            control={control}
            options={filteredAmountTypes ?? []}
            getOptionLabel={(option) => option?.value || ""}
            id="key"
            label="Amount Type"
            name="amount_type"
            fullWidth
            margin="normal"
          />
          <FormInputSelect
            control={control}
            options={transactionTypes ?? []}
            getOptionLabel={(option) => option?.value || ""}
            id="key"
            label="Transaction Type"
            name="transaction_type"
            fullWidth
            margin="normal"
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Button onClick={handleAddSetup} variant="contained" color="primary">
            Add Setup
          </Button>
          <Button
            onClick={handleRemoveSelectedRows}
            variant="contained"
            color="secondary"
          >
            Remove
          </Button>
        </Box>
        {valuesLoading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={valuesLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <div
            className="ag-theme-balham"
            style={{ height: "calc(100vh - 400px)", marginTop: "5px" }}
          >
            <AgGridReact
              rowData={tableData || []} // Pass rowData directly here for more reliable updates
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              onCellValueChanged={onCellValueChanged}
              onSelectionChanged={onSelectionChanged}
              alwaysShowHorizontalScroll={true}
              suppressRowClickSelection={true}
              suppressCopyRowsToClipboard={true}
              enableRangeSelection={true}
              onGridReady={onGridReady}
              rowSelection="multiple"
            />
          </div>
        )}
      </Box>
    </Accordion>
  );
};

export default GeneralLedgerEntryAcctSetupLines;
