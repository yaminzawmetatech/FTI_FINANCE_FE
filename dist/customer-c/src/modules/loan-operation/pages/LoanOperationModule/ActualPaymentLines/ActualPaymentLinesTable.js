import React, { useMemo, useEffect, useCallback, useState } from "react";
import Table from "components/Table";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import { getAllActualPaymentLines } from "modules/collection/slices/actualPaymentLinesSlice";
import { useDispatch, useSelector } from "react-redux";
import ActualPaymentAppBar from "./ActualPaymentAppBar";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import AdvancedSearch from "components/form/AdvancedSearch";
import { ACTUAL_PAYMENT_LINES_OPTIONS } from "constants/searchOptions/actualPaymentLinesOptions";
import { ACTUAL_PAYMENT_LINES_STATUS } from "constants/actualPaymentLinesStatus";

const ActualPaymentLines = ({}) => {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();

  const [transformedSearchDataResponse, setTransformedSearchDataResponse] =
  useState();

  const { actualPaymentLines, next_page_param, isLoading } = useSelector(
    (state) => state.actualPaymentLines
  );

  useEffect(() => {
    dispatch(
      getAllActualPaymentLines({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getAllActualPaymentLines({
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

  const DisabledCheckboxRenderer = ({ value }) => (
    <input
      type="checkbox"
      style={{ width: "20px", height: "15px" }}
      disabled
      checked={value}
    />
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
        field: "status",
        width: 100,
        headerName: "Status",
        sortable: false,
        resizable: true,
      },
      // {
      //   field: "paid",
      //   width: 50,
      //   headerName: "Paid",
      //   suppressMenu: true,
      //   sortable: false,
      //   resizable: false,
      //   cellRenderer: DisabledCheckboxRenderer,
      // },
      {
        field: "eom",
        width: 60,
        headerName: "EOM",
        suppressMenu: true,
        sortable: false,
        resizable: false,
        cellRenderer: DisabledCheckboxRenderer,
      },
      {
        field: "rev_eom",
        width: 80,
        headerName: "Rev EOM",
        suppressMenu: true,
        sortable: false,
        resizable: false,
        cellRenderer: DisabledCheckboxRenderer,
      },
      {
        field: "application_id",
        width: 100,
        headerName: "Applicant ID",
        sortable: false,
        resizable: true,
      },
      {
        field: "tenor",
        headerName: "Tenor",
        width: 80,
        sortable: false,
        resizable: true,
      },
      {
        field: "monthly_installment",
        headerName: "Monthly Installment",
        width: 100,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "due_date",
        headerName: "Due Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "prorata_interest",
        headerName: "Prorata Interest",
        width: 100,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "principal",
        headerName: "Principal",
        width: 100,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "interest",
        headerName: "Interest",
        width: 100,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "accrued_interest",
        width: 100,
        headerName: "Accrued Interest",
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "outstanding_principal",
        headerName: "Outstanding Principal",
        width: 150,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      // {
      //   field: "accrued_interest_from_due_to_eom_for_amortization",
      //   headerName: "Accrued Interest Due to End",
      //   width: 100,
      //   sortable: false,
      //   resizable: true,
      //   valueFormatter: CurrencyFormatter
      // },
      // {
      //   field: "accrued_interest_from_som_to_due_for_amortization",
      //   headerName: "Accrued Interest Start to Due",
      //   width: 100,
      //   sortable: false,
      //   resizable: true,
      //   valueFormatter: CurrencyFormatter
      // },
      {
        field: "total_accrued_interest_for_amortization",
        headerName: "Total Accrued Interest (Amortization)",
        width: 100,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "outstanding_ttl_amount",
        headerName: "Outstanding TTL",
        width: 150,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "total_received_amount",
        headerName: "Total Received Amount",
        width: 200,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "received_date",
        headerName: "Received Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "penalty_fee",
        width: 100,
        headerName: "Penalty",
        sortable: false,
        resizable: false,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "overdue_day",
        width: 100,
        headerName: "Overdue Day(s)",
        sortable: false,
        resizable: true,
      },
      {
        field: "daily_interest",
        width: 100,
        headerName: "Daily Interest",
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "days",
        width: 100,
        headerName: "Days",
        sortable: false,
        resizable: true,
      },
      {
        field: "category_code",
        width: 100,
        headerName: "Category",
        sortable: false,
        resizable: true,
      },
      {
        field: "sub_category_code",
        width: 100,
        headerName: "Sub Category",
        sortable: false,
        resizable: true,
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
        field: "created_by",
        headerName: "Created By",
        width: 200,
        resizable: true,
      },
      {
        field: "last_modified",
        headerName: "Modified Date",
        width: 200,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "modified_by",
        headerName: "Modified By",
        width: 200,
        resizable: true,
      },
    ],
    []
  );

  const handleSearch = (searchData) => {
    const transformedSearchData = {};

    searchData.forEach((item) => {
      if (item.type === "date") {
        transformedSearchData[`${item.filtered_by}_from_date`] = item.value1;
        transformedSearchData[`${item.filtered_by}_to_date`] = item.value2;
      } else if (item.type === "autocomplete_status") {
        transformedSearchData[item.filtered_by] = JSON.stringify(item.value1);
      } else {
        transformedSearchData[item.filtered_by] = item.value1;
      }
    });

    setTransformedSearchDataResponse(transformedSearchData);
    dispatch(
      getAllActualPaymentLines({
        params: {
          ...transformedSearchData,
        },
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Loan Operation</Typography>
        <Typography color="text.primary">Actual Payment Lines</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={ACTUAL_PAYMENT_LINES_OPTIONS}
       // status={ACTUAL_PAYMENT_LINES_STATUS}
        onSearch={handleSearch}
      />
      <ActualPaymentAppBar transformedSearchDataResponse={transformedSearchDataResponse} />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={actualPaymentLines ?? []}
          columnDefs={columnDefs}
          suppressCopyRowsToClipboard={true}
          enableRangeSelection={true}
          copyHeadersToClipboard={true}
          defaultColDef={defaultColDef}
          name="ActualPaymentLinesList"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 210px)",
          }}
          loading={isLoading}
          onScrollBottomEnd={handleBodyScroll}
        />
      </Paper>
    </Box>
  );
};

export default ActualPaymentLines;
