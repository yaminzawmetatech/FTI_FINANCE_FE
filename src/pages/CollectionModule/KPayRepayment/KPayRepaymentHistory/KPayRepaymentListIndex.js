import React, { useEffect } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import AdvancedSearch from "components/form/AdvancedSearch";
import { getAllKpayRepaymentHistories } from "features/kpayRepaymentHistory/kpayRepaymentHistorySlice";
import { KPAY_REPAYMENT_HISTORIES_OPTIONS } from "constants/searchOptions/kpayRepaymentHistoriesOptions";
import KpayRepaymentTableRowMenu from "./KpayRepaymentTableRowMenu";

const KPayRepaymentHistoryTable = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const { kpayRepaymentHistories, next_page_param, isLoading } = useSelector(
    (state) => state.kpayRepaymentHistories
  );

  useEffect(() => {
    dispatch(
      getAllKpayRepaymentHistories({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getAllKpayRepaymentHistories({
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
        width: 50,
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
        valueFormatter: (params) => params.value && params.value.toUpperCase(),
      },

      {
        field: "current_step",
        headerName: "Current Step",
        width: 200,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        valueFormatter: (params) => params.value && params.value.toUpperCase(),
      },
      {
        field: "description",
        headerName: "Description",
        width: 300,
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
        cellRenderer: KpayRepaymentTableRowMenu,
        cellRendererParams: {
          selectedData: (data) => {},
        },
        lockPinned: true,
      },
      {
        field: "posting_date",
        headerName: "Posting Date",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "account_code.name",
        headerName: "Bank Account Code",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "category.name",
        headerName: "Category",
        width: 100,
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

    dispatch(
      getAllKpayRepaymentHistories({
        params: {
          ...transformedSearchData,
        },
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Collection Module</Typography>
        <Typography color="text.primary">KPay Repayment History</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={KPAY_REPAYMENT_HISTORIES_OPTIONS}
        onSearch={handleSearch}
      />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={kpayRepaymentHistories ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="kpayRepaymentHistories"
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

export default React.memo(KPayRepaymentHistoryTable);
