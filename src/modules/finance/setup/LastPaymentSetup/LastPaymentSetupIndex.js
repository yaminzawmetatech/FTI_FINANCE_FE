import * as React from "react";
import { Box, Paper, Breadcrumbs, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useEffect } from "react";
import AdvancedSearch from "components/form/AdvancedSearch";
import Table from "components/Table";
import { useSearchParams } from "react-router-dom";
import LastPaymentSetupTableRowMenu from "./LastPaymentSetupTableRowMenu";
import LastPaymentSetupAppBar from "./LastPaymentSetupAppBar";
import dayjs from "dayjs";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import { getLastPayments } from "modules/collection/slices/lastPaymentSlice";
import { LAST_PAYMENT_OPTIONS } from "constants/searchOptions/lastPaymentOptions";

const LastPaymentSetupIndex = () => {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();

  const { lastPayments, isLoading, next_page_param } = useSelector(
    (state) => state.lastPayments
  );

  const types = [
    { id: "insufficient", value: "Insufficient Payment"},
    { id: "exceed_payment", value: "Exceed Payment" },
  ];

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
        field: "category.name",
        headerName: "Category",
        width: 200,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "sub_category.name",
        headerName: "Sub Category",
        width: 200,
        sortable: true,
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
        cellRenderer: LastPaymentSetupTableRowMenu,
        cellRendererParams: {},
        lockPinned: true,
      },
      {
        field: "type",
        headerName: "Type",
        width: 200,
        resizable: true,
        valueFormatter: (params) => {
          const typeObj = types.find((t) => t.id === params.value);
          return typeObj ? typeObj.value : params.value;
        },
      },
      
      {
        field: "threshold_amount",
        headerName: "Threshold Amount",
        width: 150,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "retain_period",
        headerName: "Retain Period",
        width: 150,
        resizable: true,
      },
      {
        field: "start_date",
        headerName: "Version Start Date",
        width: 200,
        sortable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        resizable: true,
      },
      {
        field: "end_date",
        headerName: "Version End Date",
        width: 200,
        sortable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
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
    ],
    []
  );

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = useCallback(() => {
    dispatch(
      getLastPayments({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getLastPayments({
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
      getLastPayments({
        params: {
          ...transformedSearchData,
        },
      })
    );
  };

  const getRowStyle = (params) => {
    const status = params?.data?.in_active;
    return status === 0 ? {background: "rgba(128, 128, 128, 0.1)"} : { };
  };

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => {},
    }),
    []
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 1 }}
        className="margin-top-8"
      >
        <Typography color="text.primary">Collection</Typography>
        <Typography color="text.primary">Last Payment Setup</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={LAST_PAYMENT_OPTIONS}
        onSearch={handleSearch}
      />
      <LastPaymentSetupAppBar />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={lastPayments ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="LastPaymentSetupTable"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 170px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
          getRowStyle={getRowStyle}
        />
      </Paper>
    </Box>
  );
};

export default LastPaymentSetupIndex;
