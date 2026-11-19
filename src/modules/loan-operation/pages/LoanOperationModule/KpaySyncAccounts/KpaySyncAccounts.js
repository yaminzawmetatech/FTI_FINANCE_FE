import React, { useMemo, useEffect, useCallback } from "react";
import Table from "components/Table";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import { useDispatch, useSelector } from "react-redux";
import { getKpaySyncAccounts } from "modules/loan-operation/slices/kpaySyncAccountSlice";
import AppBarSyncBtn from "./AppBarSyncBtn";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";

const KpaySyncAccounts = () => {
  const [params, setParams] = useSearchParams();

  const dispatch = useDispatch();

  const { kpaySyncAccounts, next_page_param, isLoading } = useSelector(
    (state) => state.kpaySyncAccounts
  );

  useEffect(() => {
    dispatch(
      getKpaySyncAccounts({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getKpaySyncAccounts({
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
      valueSetter: (params) => {},
    }),
    []
  );

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
        field: "document_type",
        width: 120,
        headerName: "Document Type",
        sortable: false,
        resizable: true,
      },
      {
        field: "document_no",
        width: 130,
        headerName: "Document No",
        sortable: false,
        resizable: true,
      },
      {
        field: "description",
        width: 150,
        headerName: "Description",
        sortable: false,
        resizable: true,
      },
      {
        field: "account_no",
        width: 120,
        headerName: "GL Account No",
        sortable: false,
        resizable: true,
      },
      {
        field: "account_type",
        width: 100,
        headerName: "Account Type",
        sortable: false,
        resizable: true,
      },
      {
        field: "debit_amount",
        width: 100,
        headerName: "Debit Amount",
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "credit_amount",
        width: 100,
        headerName: "Credit Amount",
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "amount",
        width: 100,
        headerName: "Amount",
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
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
        field: "updated_at",
        headerName: "Modified Date",
        width: 200,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
    ],
    []
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Loan Operation</Typography>
        <Typography color="text.primary">Kpay Sync Accounts</Typography>
      </Breadcrumbs>
      <AppBarSyncBtn />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={kpaySyncAccounts ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="KpaySyncAccounts"
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

export default KpaySyncAccounts;
