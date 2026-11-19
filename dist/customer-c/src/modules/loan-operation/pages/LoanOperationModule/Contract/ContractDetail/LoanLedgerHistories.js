import React, { useMemo } from "react";
import { Box } from "@mui/material";
import Accordion from "components/Accordion";
import Table from "components/Table";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import LoanLedgerHistoriesExportButton from "./LoanLedgerHistoriesExportButton";
import { CurrencyFormatter } from "common/CurrencyFormatter";

const LoanLedgerHistories = ({ isLoading, contract }) => {
    const [params, setParams] = useSearchParams();

    const defaultColDef = useMemo(
        () => ({
            valueSetter: (params) => {
            },
        }),
        []
    );

    const applicationId = contract?.application?.application_id;

    const modifiedRowData = contract?.loan_ledger_histories?.map((row) => ({
        ...row,
        application_id: applicationId,
        category_name: contract?.category?.name,
        sub_category_name: contract?.sub_category?.name,
    }));

    const columnDefs = useMemo(
        () => [
            {
                field: "row",
                headerName: "Line No",
                valueGetter: "node.rowIndex + 1",
                width: 50,
                sortable: true,
                resizable: true,
            },
            {
                field: "application_id",
                width: 100,
                headerName: "Applicant ID",
                sortable: false,
                resizable: true,
            },
            {
                field: 'entry_no',
                width: 100,
                headerName: "Entry No",
                sortable: false,
                resizable: true,
            },
            {
                field: 'document_type',
                width: 100,
                headerName: "Document Type",
                sortable: false,
                resizable: true,
            },
            {
                field: 'document_no',
                width: 100,
                headerName: "Document No",
                sortable: false,
                resizable: true,
            },
            {
                field: 'description',
                width: 100,
                headerName: "Description",
                sortable: false,
                resizable: true,
            },
            {
                field: 'gl_account_no',
                width: 100,
                headerName: "GL Account No",
                sortable: false,
                resizable: true,
            },
            {
                field: 'account_type',
                width: 100,
                headerName: "Account Type",
                sortable: false,
                resizable: true,
            },
            {
                field: 'debit_amount'
                , width: 100,
                headerName: "Debit Amount",
                sortable: false,
                resizable: true,
                valueFormatter: CurrencyFormatter
            },
            {
                field: 'credit_amount',
                width: 100,
                headerName: "Credit Amount",
                sortable: false,
                resizable: true,
                valueFormatter: CurrencyFormatter
            },
            {
                field: 'amount',
                width: 100,
                headerName: "Amount",
                sortable: false,
                resizable: true,
                valueFormatter: CurrencyFormatter
            },
            {
                field: "created_at",
                headerName: "Created Date",
                width: 200,
                sortable: true,
                valueFormatter: (params) =>
                    params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
                resizable: true,
            },
            {
                field: "created_user.user_name",
                headerName: "Created By",
                width: 200,
                resizable: true,
            },
            {
                field: "updated_at",
                headerName: "Modified Date",
                width: 200,
                sortable: true,
                resizable: true,
                valueFormatter: (params) =>
                    params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
            },
            {
                field: "modified_user.user_name",
                headerName: "Modified By",
                width: 200,
                resizable: true,
            },
            {
                field: "category_name",
                width: 100,
                headerName: "Category Code",
                sortable: false,
                resizable: true,
            },
            {
                field: "sub_category_name",
                width: 100,
                headerName: "Sub Category Code",
                sortable: false,
                resizable: true,
            },
        ],
        []
    );

    return (
        <Accordion title="Loan Ledger Histories">
            <LoanLedgerHistoriesExportButton contract={contract}></LoanLedgerHistoriesExportButton>
            <Box sx={{ mt: 1 }}>
                <Table
                    searchParams={params}
                    setSearchParams={setParams}
                    rowData={modifiedRowData ?? []}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    name="Loan Ledger Histories"
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

export default LoanLedgerHistories;
