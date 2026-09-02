import React, { useEffect } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import InsufficientPaymentBatchTableRowMenu from "./InsufficientBatchTableRowMenu";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import AdvancedSearch from "components/form/AdvancedSearch";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import { WRITE_OFF_BATCH_STATUS } from "constants/writeOffBatchStatus";
import { getAllInsufficientPaymentBatchs } from "features/insufficientPaymentBatch/insufficientPaymentBatchSlice";
import { INSUFFICIENT_BATCH_SEARCH_OPTIONS } from "constants/searchOptions/insufficientBatchSearchOptions";

const InsufficientPaymentBatchTable = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const { insufficientPaymentBatchs, next_page_param, isLoading } = useSelector(
    (state) => state.insufficientPaymentBatchs
  );

  useEffect(() => {
    dispatch(
      getAllInsufficientPaymentBatchs({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getAllInsufficientPaymentBatchs({
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
        headerName: "No",
        valueGetter: "node.rowIndex + 1",
        width: 80,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "description",
        headerName: "Description",
        width: 200,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "status",
        headerName: "Status",
        width: 100,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "current_step",
        headerName: "Current Step",
        width: 100,
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
        cellRenderer: InsufficientPaymentBatchTableRowMenu,
        cellRendererParams: {
          selectedData: (data) => {},
        },
        lockPinned: true,
      },
      {
        field: "total_waived_amount",
        headerName: "Total Waived Amount",
        width: 250,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "waived_date",
        headerName: "Waived Date",
        width: 200,
        sortable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        resizable: true,
      },
      {
        field: "waived_user.user_name",
        headerName: "Wavied By",
        width: 200,
        resizable: true,
      },
      {
        field: "approved_date",
        headerName: "Approved Date",
        width: 200,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "approved_user.user_name",
        headerName: "Approved By",
        width: 200,
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
      getAllInsufficientPaymentBatchs({
        params: {
          ...transformedSearchData
        },
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Collection Module</Typography>
        <Typography color="text.primary">
          Insufficient Batch List
        </Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={INSUFFICIENT_BATCH_SEARCH_OPTIONS}
        status={WRITE_OFF_BATCH_STATUS}
        onSearch={handleSearch}
      />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={insufficientPaymentBatchs ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="InsufficientBatchList"
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

export default React.memo(InsufficientPaymentBatchTable);
