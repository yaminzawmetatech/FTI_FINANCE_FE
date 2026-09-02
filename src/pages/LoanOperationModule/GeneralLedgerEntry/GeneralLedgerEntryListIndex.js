import React, { useEffect } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { getAllGeneralLedgerEntries } from "features/generalLedgerEntry/generalLedgerEntrySlice";
import AppBarSyncBtn from "./AppBarSyncBtn";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import AdvancedSearch from "components/form/AdvancedSearch";
import { GENERAL_LEDGER_OPTIONS } from "constants/searchOptions/generalLedgerOptions";

const GeneralLedgerEntryTable = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const { generalLedgerEntries, next_page_param, isLoading } = useSelector(
    (state) => state.generalLedgerEntries
  );

  useEffect(() => {
    dispatch(
      getAllGeneralLedgerEntries({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getAllGeneralLedgerEntries({
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
        field: "extra_document_no",
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
            return value.toLocaleString('en-US', { maximumFractionDigits: 0 });
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

  const handleSearch = (searchData) => {

    const transformedSearchData = {};

    searchData.forEach(item => {
      if (item.type === "date") {
        transformedSearchData[`${item.filtered_by}_from_date`] = item.value1;
        transformedSearchData[`${item.filtered_by}_to_date`] = item.value2;
      } else if (item.type === "autocomplete_status") {
        transformedSearchData[item.filtered_by] = JSON.stringify(item.value1);
      } else {
        transformedSearchData[item.filtered_by] = item.value1;
      }
    });

    dispatch(
      getAllGeneralLedgerEntries({
        params: {
          ...transformedSearchData
        },
      })
    );
    
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Loan Operation</Typography>
        <Typography color="text.primary">General Ledger Entry</Typography>
      </Breadcrumbs>
      <AdvancedSearch 
        options={GENERAL_LEDGER_OPTIONS}
        onSearch={handleSearch}
      />
      <AppBarSyncBtn />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={generalLedgerEntries ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="ApplicationInformationList"
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

export default React.memo(GeneralLedgerEntryTable);
