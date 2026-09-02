import React, {useEffect} from "react";
import {useCallback, useMemo} from "react";
import {useSearchParams} from "react-router-dom";
import Table from "components/Table";
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
import AppBarSyncBtn from "./AppBarSyncBtn";
import {Breadcrumbs, Typography, Box, Paper} from "@mui/material";
import {getAllSyncEOM} from "features/eomSync/eomSyncSlice";
import {useParams} from "react-router";
import {CurrencyFormatter} from "../../../../common/CurrencyFormatter";

const EOMSyncTable = () => {
    const dispatch = useDispatch();
    const [params, setParams] = useSearchParams();

    const {id, route} = useParams();

    const {syncEOM, next_page_param, isLoading} = useSelector(
        (state) => state.syncEOM
    );

    const getRowStyle = (params) => {
        const isSynced = params.data?.is_synced;
        return isSynced ? {background: "rgb(194,237,211)"} : '';
    };


    useEffect(() => {
        dispatch(
            getAllSyncEOM({
                firstFetch: true,
                id: id
            })
        );
    }, [dispatch, id]);

    const handleBodyScroll = useCallback(
        async (event) => {
            if (next_page_param) {
                dispatch(
                    getAllSyncEOM({
                        id: id,
                        params: next_page_param,
                        firstFetch: false,
                    })
                );
            }
        },
        [dispatch, next_page_param]
    );

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
                width: 100,
                sortable: true,
                resizable: true,
            },
            {
                field: "line_no",
                headerName: "Line No",
                width: 100,
                sortable: true,
                resizable: true,
            },
            {
                field: "posting_date",
                headerName: "Posting Date",
                width: 200,
                sortable: true,
                valueFormatter: (params) =>
                    params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
                resizable: true,
            },
            {
                field: "document_date",
                headerName: "Document Date",
                width: 200,
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
                width: 100,
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
                field: "amount_lcy",
                headerName: "Amount_LCY",
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
                valueFormatter: (params) => {
                    const value = parseFloat(params.value);

                    if (!isNaN(value)) {
                        return value.toLocaleString('en-US', {maximumFractionDigits: 0});
                    }

                    return '';
                },
            },
            {
                field: "acc_name",
                headerName: "Account Name",
                width: 100,
                resizable: true,
            },
        ],
        []
    );


    return (
        <Box sx={{width: "100%"}}>
            <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
                <Typography color="text.primary">Loan Operation</Typography>
                <Typography color="text.primary">General Ledger Entry</Typography>
            </Breadcrumbs>
            <AppBarSyncBtn/>
            <Paper sx={{width: "100%"}}>
                <Table
                    searchParams={params}
                    setSearchParams={setParams}
                    rowData={syncEOM ?? []}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    name="EOMSyncListTable"
                    getRowStyle={getRowStyle}
                    rowKey="id"
                    agThemeStyle={{
                        height: "calc(100vh - 210px)",
                    }}
                    onScrollBottomEnd={handleBodyScroll}
                    loading={isLoading}
                />
            </Paper>
        </Box>
    );
};

export default React.memo(EOMSyncTable);
