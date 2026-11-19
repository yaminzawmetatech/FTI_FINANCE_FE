import React, { act, useEffect, useState } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { getExceedPayments } from "modules/loan-operation/slices/contractSlice";
import ContractTableRowMenu from "./ContractTableRowMenu";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import AdvancedSearch from "components/form/AdvancedSearch";
import { CONTRACT_STATUS } from "constants/contractStatus";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import { EXCEED_PAYMENT_SEARCH_OPTIONS } from "constants/searchOptions/exceedPaymentSearchOptions";
import ExceedPaymentAppBar from "./ExceedPaymentAppBar";

const ExceedPaymentTableIndex = ({ type, activeTab, isActive }) => {
  console.log(activeTab, 'activeTab')
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const [selectedRows, setSelectedRows] = useState([]);

  const auth = useSelector((state) => state.auth.user);

  const { contracts, next_page_param, isLoading } = useSelector(
    (state) => state.contracts
  );

  const { exceedPayments } = useSelector(
    (state) => state.contracts
  );
  console.log(exceedPayments, 'exceedPayment')



  const rowData = exceedPayments || [];

  useEffect(() => {

    if (isActive) {
      dispatch(
        getExceedPayments({
          firstFetch: true,
          params: {
            ...params,
            exceed_status: type
          },
        })
      );
    }
  }, [dispatch, type, isActive]);


  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => { },
    }),
    []
  );

  const handleSelectionChanged = useCallback((rows) => {
    setSelectedRows(rows);
  }, []);

  const columnDefs = useMemo(() => {
    if (!isActive) return []; // Return empty array if not active

    return [
      ...activeTab === '2' ? [
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
        }] : [],
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
        headerName: "ApplicationID",
        width: 130,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "loan_amount",
        headerName: "Loan Amount",
        width: 100,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "remaining_exceed_amount",
        headerName: "Exceed Amount",
        width: 100,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "exceed_status",
        headerName: "Exceed Status",
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
        cellRenderer: ContractTableRowMenu,
        cellRendererParams: {
          activeTab
        },
        lockPinned: true,
      },
      {
        field: "last_repayment_date",
        headerName: "Last Repayment Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "threshold_amount",
        headerName: "Threshold Amount",
        width: 100,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      // Micelleneous Income columns
      ...activeTab === '1' ? [
        {
          field: "exceed_status_date",
          headerName: "Miscellaneous Income Date",
          valueFormatter: (params) =>
            params.value && dayjs(params.value).format("YYYY-MM-DD"),
          width: 200,
          sortable: true,
          resizable: true,
        },
        {
          field: "remaining_exceed_amount",
          headerName: "Miscellaneous Income Amount",
          width: 200,
          sortable: true,
          resizable: true,
          valueFormatter: CurrencyFormatter,
        },
      ] : [],

      // Retain as Advanced Payment columns
      ...activeTab === '2' ? [
        {
          field: "exceed_status_date",
          headerName: "Retain as Advanced Payment Date",
          valueFormatter: (params) =>
            params.value && dayjs(params.value).format("YYYY-MM-DD"),
          width: 200,
          sortable: true,
          resizable: true,
        },
        {
          field: "remaining_exceed_amount",
          headerName: "Retain as Advanced Payment Amount",
          width: 200,
          sortable: true,
          resizable: true,
          valueFormatter: CurrencyFormatter,
        }] : [],
      // Settlement as Micelleneous Income columns
      ...activeTab === '3' ? [
        {
          field: "exceed_status_date",
          headerName: "Settlement as Miscellaneous Income Date",
          valueFormatter: (params) =>
            params.value && dayjs(params.value).format("YYYY-MM-DD"),
          width: 200,
          sortable: true,
          resizable: true,
        },
        {
          field: "remaining_exceed_amount",
          headerName: "Settlement as Miscellaneous Income Amount",
          width: 200,
          sortable: true,
          resizable: true,
          valueFormatter: CurrencyFormatter,
        }] : [],
      // Refund columns
      ...activeTab === '4' ? [
        {
          field: "exceed_status_date",
          headerName: "Refund Date",
          valueFormatter: (params) =>
            params.value && dayjs(params.value).format("YYYY-MM-DD"),
          width: 200,
          sortable: true,
          resizable: true,
        },
        {
          field: "remaining_exceed_amount",
          headerName: "Refund Amount",
          width: 200,
          sortable: true,
          resizable: true,
          valueFormatter: CurrencyFormatter,
        }] : [],
      // Common columns
      {
        field: "created_at",
        headerName: "Created Date",
        width: 200,
        sortable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
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
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "modified_user.user_name",
        headerName: "Modified By",
        width: 200,
        resizable: true,
      },
    ];
  }, [activeTab, isActive]);

  const handleBodyScroll = useCallback(async () => {
    // Only fetch if tab is active and there's a next page
    if (isActive && next_page_param) {
      dispatch(
        getExceedPayments({
          firstFetch: false,  // Set to false for infinite scroll loads
          params: {
            next_page_param,
            exceed_status: type
          },
        })
      );
    }
  }, [dispatch, next_page_param, type, isActive]);

  const [filterBy, setFilterBy] = useState();

  const handleSearch = (searchData) => {
    if (isActive) {
      const transformedSearchData = {};

      searchData.forEach((item) => {
        if (item.filtered_by === "disbursed_date") {
          const startOfDay = `${item.value1}T00:00:00`;
          const endOfDay = `${item.value2}T23:59:59`;
          transformedSearchData[`${item.filtered_by}_from_date`] = startOfDay;
          transformedSearchData[`${item.filtered_by}_to_date`] = endOfDay;
        }
        else if (item.type === "date") {
          transformedSearchData[`${item.filtered_by}_from_date`] = item.value1;
          transformedSearchData[`${item.filtered_by}_to_date`] = item.value2;
        } else if (item.type === "autocomplete_status") {
          transformedSearchData[item.filtered_by] = JSON.stringify(item.value1);
        } else {
          transformedSearchData[item.filtered_by] = item.value1;
        }
      });

      setFilterBy(transformedSearchData);
      dispatch(
        getExceedPayments({
          params: {
            ...transformedSearchData,
            exceed_status: type
          },
        })
      );
    }
  };


  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Collection Module</Typography>
        <Typography color="text.primary">Exceed Payment In Last Tenor</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={EXCEED_PAYMENT_SEARCH_OPTIONS}
        status={CONTRACT_STATUS}
        onSearch={handleSearch}
      />
      <ExceedPaymentAppBar transformedSearchData={filterBy} auth={auth} activeTab={activeTab} selectedRows={selectedRows} type={type} isActive={isActive} />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={rowData ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="ExceedPaymentLastTenor"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 210px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
          onSelectionChanged={activeTab === '2' ? handleSelectionChanged : undefined}
          rowSelection={activeTab === '2' ? "multiple" : "none"}
        />
      </Paper>
    </Box>
  );
};

export default React.memo(ExceedPaymentTableIndex);
