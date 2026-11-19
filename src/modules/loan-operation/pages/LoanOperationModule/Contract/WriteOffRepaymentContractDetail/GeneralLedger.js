import React, { useMemo } from "react";
import { Box } from "@mui/material";
import Accordion from "components/Accordion";
import Table from "components/Table";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import LoanLedgerHistoriesExportButton from "./LoanLedgerHistoriesExportButton";
import GeneralLedgerEntriesExportButton from './GeneralLedgerEntriesExportButton';
import { CurrencyFormatter } from "common/CurrencyFormatter";

const GeneralLedger = ({ isLoading, contract }) => {
    const [params, setParams] = useSearchParams();

    const defaultColDef = useMemo(
        () => ({
            valueSetter: (params) => {
            },
        }),
        []
    );

    const columnDefs = useMemo(
        () => [
          {
            field: "journal_template_name",
            headerName: "Journal Template Name",
            width: 100,
            sortable: true,
            resizable: true,
          },
          {
            field: "journal_batch_name",
            headerName: "Journal Batch Name",
            width: 150,
            sortable: true,
            resizable: true,
          },
          {
            field: "posting_date",
            headerName: "Posting Date",
            width: 100,
            sortable: true,
            valueFormatter: (params) =>
              params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
            resizable: true,
          },
          {
            field: "document_date",
            headerName: "Document Date",
            width: 100,
            sortable: true,
            valueFormatter: (params) =>
              params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
            resizable: true,
          },
          {
            field: "document_type",
            headerName: "Document Type",
            width: 100,
            sortable: true,
            resizable: true,
          },
          {
            field: "document_no",
            headerName: "Document No",
            width: 150,
            sortable: true,
            resizable: true,
          },
          {
            field: "external_document_no",
            headerName: "External Document No",
            width: 100,
            sortable: true,
            resizable: true,
          },
          {
            field: "account_type",
            headerName: "Account Type",
            width: 100,
            sortable: true,
            resizable: true,
          },
          {
            field: "account_no",
            headerName: "Account No",
            width: 100,
            resizable: true,
          },
          {
            field: "description",
            headerName: "Description",
            width: 200,
            resizable: true,
          },
          {
            field: "amount",
            headerName: "Amount",
            width: 100,
            sortable: true,
            resizable: true,
            valueFormatter: CurrencyFormatter
          },
          {
            field: "debit_amount",
            headerName: "Debit Amount",
            width: 100,
            sortable: true,
            resizable: true,
            valueFormatter: CurrencyFormatter
          },
          {
            field: "credit_amount",
            headerName: "Credit Amount",
            width: 100,
            sortable: true,
            resizable: true,
            valueFormatter: CurrencyFormatter
          },
        ],
        []
      );

    return (
        <Accordion title="General Ledger">
            <GeneralLedgerEntriesExportButton contract={contract}></GeneralLedgerEntriesExportButton>
            <Box sx={{ mt: 1 }}>
                <Table
                    searchParams={params}
                    setSearchParams={setParams}
                    rowData={contract?.general_ledger_entries ?? []}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    name="General Ledger"
                    rowKey="id"
                    agThemeStyle={{
                        height: "calc(100vh - 400px)",
                    }}
                    suppressCopyRowsToClipboard={true}
                    enableRangeSelection={true}
                    copyHeadersToClipboard={true}
                    loading={isLoading}
                />
            </Box>
        </Accordion>
    );
};

export default GeneralLedger;
