import * as React from "react";
import { Box, Paper, Breadcrumbs, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useEffect } from "react";
import AdvancedSearch from "components/form/AdvancedSearch";
import Table from "components/Table";
import { useSearchParams } from "react-router-dom";
import RefinanceCustomerAppBar from "./RefinanceCustomerAppBar";
import dayjs from "dayjs";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import { REFINANCE_CUSTOMER_SEARCH_OPTIONS } from "constants/searchOptions/refinanceCustomerSearchOptions";
import { getRefinanceCustomers } from "modules/credit-management/slices/refinanceCustomerSlice";
import RefinanceCustomerTableRowMenu from "./RefinanceCustomerTableRowMenu";

const RefinanceCustomerIndex = () => {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();

  const {   refinanceCustomers, isLoading, next_page_param } = useSelector(
    (state) => state.  refinanceCustomers
  );

  const columnDefs = useMemo(
    () => [
      {
        headerName: "No.",
        width: 50,
        valueGetter: "node.rowIndex + 1",
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "application_id",
        headerName: "Application ID",
        width: 150,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "partner_id",
        headerName: "Partner ID",
        width: 100,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "customer_name",
        headerName: "Name",
        width: 150,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        headerName: "",
        field: "menu",
        width: 50,
        lockPosition: "left",
        pinned: "left",
        cellRenderer: RefinanceCustomerTableRowMenu,
        cellRendererParams: {},
        lockPinned: true,
      },
      {
        field: "nrc",
        headerName: "NRC",
        width: 200,
        resizable: true,
      },
      {
        field: "loan_amount",
        headerName: "Loan Amount",
        width: 100,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "status",
        headerName: "Status",
        width: 100,
        resizable: true,
      },
      {
        field: "refinance_category",
        headerName: "Refinance Category",
        width: 100,
        resizable: true,
      },
      {
        field: "next_eligible_loan_amount",
        headerName: "Next Eligible Loan Amount",
        width: 100,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "eligible_month",
        headerName: "Eligible Month",
        width: 150,
        sortable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        resizable: true,
      },
      {
        field: "next_eligible_mi_amount",
        headerName: "Next Eligible MI Amount",
        width: 100,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "category_name",
        headerName: "Category",
        width: 100,
        resizable: true,
      },
      {
        field: "segment",
        headerName: "Segment",
        width: 150,
        resizable: true,
      },
      {
        field: "min_income",
        headerName: "Min Income(2 times)",
        width: 100,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "estimate_income",
        headerName: "Estimate Income",
        width: 100,
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
        field: "created_user.user_name",
        headerName: "Created By",
        width: 200,
        resizable: true,
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => {},
    }),
    []
  );

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = useCallback(() => {
    dispatch(
      getRefinanceCustomers({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getRefinanceCustomers({
            params: next_page_param,
            firstFetch: false,
          })
        );
      }
    },
    [dispatch, next_page_param]
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

    dispatch(
      getRefinanceCustomers({
        params: {
          ...transformedSearchData,
        },
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 1 }}
        className="margin-top-8"
      >
        <Typography color="text.primary">PDSD</Typography>
        <Typography color="text.primary">/ Refinance Customer</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={REFINANCE_CUSTOMER_SEARCH_OPTIONS}
        onSearch={handleSearch}
      />
      <RefinanceCustomerAppBar fetchApi={fetchApi} />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={refinanceCustomers ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="RefinanceCustomerTable"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 170px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
        />
      </Paper>
    </Box>
  );
};

export default RefinanceCustomerIndex;
