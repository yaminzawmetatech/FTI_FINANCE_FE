import React, { useEffect } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import WriteOffTableRowMenu from "./WriteOffBatchTableRowMenu";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import AdvancedSearch from "components/form/AdvancedSearch";
import { getAllWriteOffBatchs } from "modules/collection/slices/writeOffBatchSlice";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import { WRITE_OFF_BATCH_STATUS } from "constants/writeOffBatchStatus";
import { WRITE_OFF_BATCH_SEARCH_OPTIONS } from "constants/searchOptions/writeOffBatchSearchOptions";

const WriteOffBatchTable = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const { writeOffBatchs, next_page_param, isLoading } = useSelector(
    (state) => state.writeOffBatchs
  );

  useEffect(() => {
    dispatch(
      getAllWriteOffBatchs({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getAllWriteOffBatchs({
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
        width: 100,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "write_off_month",
        headerName: "Write Off Month",
        width: 100,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM"),
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
        cellRenderer: WriteOffTableRowMenu,
        cellRendererParams: {
          selectedData: (data) => {},
        },
        lockPinned: true,
      },
      {
        field: "total_ar",
        headerName: "Total AR",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "total_ai",
        headerName: "Total AI",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "total_write_off_amount",
        headerName: "Total Write Off Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "total_outstanding_principal",
        headerName: "Total Outstanding Principal",
        width: 150,
        sortable: true,
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
      getAllWriteOffBatchs({
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
          Write Off Batch List
        </Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={WRITE_OFF_BATCH_SEARCH_OPTIONS}
        status={WRITE_OFF_BATCH_STATUS}
        onSearch={handleSearch}
      />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={writeOffBatchs ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="WriteOffBatchList"
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

export default React.memo(WriteOffBatchTable);
