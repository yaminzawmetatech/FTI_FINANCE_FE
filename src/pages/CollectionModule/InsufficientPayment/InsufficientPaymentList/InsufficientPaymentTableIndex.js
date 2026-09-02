import React, { useEffect, useState } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import AdvancedSearch from "components/form/AdvancedSearch";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import InsufficientPaymentAppBar from "./InsufficientPaymentAppBar";
import { getInsufficientPayments } from "features/insufficientPayment/insufficientPaymentSlice";
import { INSUFFICIENT_PAYMENT_TABLE_SEARCH_OPTIONS } from "constants/searchOptions/insufficientPaymentSearchOptions";

const InsufficientPaymentTable = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const [filterBy,setFilterBy] = useState();

  const { insufficientContracts, next_page_param, isLoading } = useSelector(
    (state) => state.insufficientContracts
  );

  const defaultParams = {
    latest_unpaid_tenor : 1,
    insufficient_status :"open",
  }

  useEffect(() => {
    dispatch(
      getInsufficientPayments({
        firstFetch: true,
        params:{
          ...defaultParams
        }
      })
    );
  }, [dispatch]);

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => {},
    }),
    []
  );

  const [selectedRows, setSelectedRows] = useState([]);

   // link to contract
   const LinkCellRenderer = ({ value, data }) => {
    const uuid = data?.uuid;
    const url = `/contracts/${uuid}/view`;
    return (
      <a href={url} target="_blank" style={{ textDecoration: "underline" }}>
        {value}
      </a>
    );
  };

  const columnDefs = useMemo(
    () => [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        field: "checkbox",
        width: 50,
        headerName: "",
        suppressMenu: true,
        sortable: false,
        resizable: false,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
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
        field: "generated_application_id",
        headerName: "Application ID",
        width: 130,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        cellRenderer: LinkCellRenderer,
      },
      {
        field: "customer_name",
        headerName: "Customer Name",
        width: 150,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "loan_amount",
        headerName: "Loan Amount",
        width: 150,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "last_repayment_amount",
        headerName: "Last Repayment Amount",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "remaining_mi",
        headerName: "Insufficient  Amount ",
        width: 130,
        sortable: true,
        resizable: true,
      },
      {
        field: "latestactual_payment_line.received_date",
        headerName: "Repayment Date ",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 100,
        sortable: true,
        resizable: true,
      },
      // {
      //   field: "latestactual_payment_line.total_penalty_fee",
      //   headerName: "Penalty Fees",
      //   width: 100,
      //   sortable: true,
      //   resizable: true,
      //   valueFormatter: CurrencyFormatter,
      // },
      {
        field: "threshold_amount",
        headerName: "Threshold Amount ",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "overdue_status",
        headerName: "Overdue Status",
        width: 100,
        sortable: true,
        resizable: true,
        valueFormatter: (params) => {
          const value = params.value;
          return value !== null ? `Overdue${value}` : "";
        },
      },
      {
        field: "category.name",
        headerName: "Category",
        width: 100,
        resizable: true,
      },
      {
        field: "sub_category.name",
        headerName: "Sub Category",
        width: 150,
        resizable: true,
      },
    ],
    []
  );

  const handleBodyScroll = useCallback(async () => {
    if (next_page_param) {
      dispatch(
        getInsufficientPayments({
          params: next_page_param,
          firstFetch: false,
        })
      );
    }
  }, [dispatch, next_page_param]);

  const handleSearch = (searchData) => {
    const transformedSearchData = {};

    searchData.forEach((item) => {
      if (item.type === "date") {
        transformedSearchData[`${item.filtered_by}_from_date`] = item.value1;
        transformedSearchData[`${item.filtered_by}_to_date`] = item.value2;
      } else if (item.type === "autocomplete_status") {
        transformedSearchData[item.filtered_by] = JSON.stringify(item.value1);
      } else if (item.filtered_by === "contract_ids") {
        const tempData = item.value1.split(",");
        transformedSearchData[item.filtered_by] = JSON.stringify(tempData);
      } else {
        transformedSearchData[item.filtered_by] = item.value1;
      }
    });

    setFilterBy(transformedSearchData);
    dispatch(
      getInsufficientPayments({
        params: {
          ...defaultParams,
          ...transformedSearchData,
        },
      })
    );
  };

  const handleSelectionChanged = useCallback(
    (rows) => {
      setSelectedRows(rows);
    },
    [selectedRows]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Collection Module</Typography>
        <Typography color="text.primary">Insufficient Payment List</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={INSUFFICIENT_PAYMENT_TABLE_SEARCH_OPTIONS}
        onSearch={handleSearch}
      />
      <InsufficientPaymentAppBar
        transformedSearchData={filterBy}
        defaultParams={defaultParams}
        selectedRows={selectedRows}
      />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={insufficientContracts ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="InsufficientPaymentListIndex"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 210px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
          onSelectionChanged={handleSelectionChanged}
          rowSelection={"multiple"}
          rowMultiSelectWithClickFlag={"true"}
        />
      </Paper>
    </Box>
  );
};

export default React.memo(InsufficientPaymentTable);
