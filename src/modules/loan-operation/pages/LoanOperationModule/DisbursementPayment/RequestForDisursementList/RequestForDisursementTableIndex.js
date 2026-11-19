import React, { useEffect, useState } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { getContracts } from "modules/loan-operation/slices/contractSlice";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import AdvancedSearch from "components/form/AdvancedSearch";
import { CONTRACT_SEARCH_OPTIONS } from "constants/searchOptions/contractSearchOptions";
import { CONTRACT_STATUS } from "constants/contractStatus";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import openNewWindow from "utils/windowUtils";
import { getAllBookings } from "modules/loan-operation/slices/bookingProcessSlice";
import { BOOKING_PROCESS_SEARCH_OPTIONS } from "constants/searchOptions/bookingProcessOptions";
import { BOOKING_PROCESS_STATUS } from "constants/bookingProcessStatus";
import RequestForDisbursementTableRowMenu from "./RequestForDisbursementTableRowMenu";
import RequestForDisbursementAppBar from "./RequestForDisbursementAppBar";

const RequestForDisursementTableIndex = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const { bookings, next_page_param, isLoading } = useSelector(
    (state) => state.bookings
  );

  const user = useSelector((state) => state.auth.user); // Get logged-in user details

  const rowData = bookings || [];


  const isDisable = rowData.map((i) => i.current_step !== user?.user_group);


  useEffect(() => {
    dispatch(
      getAllBookings({
        firstFetch: true,
        params: {
          booking_status: ["approved"],
          request_for_disbursement: 0
        }
      })
    );
  }, [dispatch]);

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => { },
    }),
    []
  );

  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChanged = useCallback((rows) => {
    setSelectedRows(rows);
  }, []);

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
        field: "application.application_id",
        headerName: "ApplicationID",
        width: 130,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "approved_date",
        headerName: "Booking Approved Date",
        width: 130,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
         valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "current_step",
        headerName: "Current Step",
        width: 130,
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
        cellRenderer: RequestForDisbursementTableRowMenu,
        cellRendererParams: {
          selectedData: (data) => { },
        },
        lockPinned: true,
      },
      {
        field: "application.name_of_emp_or_business",
        headerName: "Name Of Business",
        width: 120,
        sortable: true,
        resizable: true,
      },
      {
        field: "commission",
        headerName: "Commission %",
        width: 130,
        sortable: true,
        resizable: true,
      },
      {
        field: "commission_amount",
        headerName: "Commission Amount",
        width: 130,
        sortable: true,
        resizable: true,
      },
      {
        field: "contract.net_disbursed_amount",
        headerName: "Net Disbursed Amount",
        valueFormatter: CurrencyFormatter,
        width: 130,
        sortable: true,
        resizable: true,

      },
      // {
      //   field: "contract.customer_disbursed_amount",
      //   headerName: "Customer Disbursed Amount",
      //   valueFormatter: CurrencyFormatter,
      //   width: 130,
      //   sortable: true,
      //   resizable: true,

      // },
      {
        field: "contract.customer_bank_account_no",
        headerName: "Customer Bank Account No",
        width: 130,
        sortable: true,
        resizable: true,

      },
      {
        field: "contract.customer_bank_account_name",
        headerName: "Customer Bank Account Name",
        width: 130,
        sortable: true,
        resizable: true,

      },
      {
        field: "contract.customer_bank_payment_channel.name",
        headerName: "Customer Bank Payment Channel",
        width: 130,
        sortable: true,
        resizable: true,

      },
      {
        field: "dealer.name",
        headerName: "Dealer Name",
        width: 130,
        sortable: true,
        resizable: true,

      },
      {
        field: "dealer_disbursed_amount",
        headerName: "Dealer Disbursed Amount",
        valueFormatter: CurrencyFormatter,
        width: 130,
        sortable: true,
        resizable: true,
        valueGetter: (params) =>
          params.data?.contract?.application?.application_info?.total_amount ??
          params.data?.contract?.loan_amount,

      },
      {
        field: "contract.dealer_bank_account_no",
        headerName: "Dealer Bank Account No",
        width: 130,
        sortable: true,
        resizable: true,

      },
      {
        field: "contract.dealer_bank_account_name",
        headerName: "Dealer Bank Account Name",
        width: 130,
        sortable: true,
        resizable: true,

      },
      {
        field: "contract.dealer_bank_payment_channel",
        headerName: "Dealer Bank Payment Channel",
        width: 130,
        sortable: true,
        resizable: true,

      },
    ],
    []
  );

  const handleBodyScroll = useCallback(async () => {
    if (next_page_param) {
      dispatch(
        getAllBookings({
          params: next_page_param,
          firstFetch: false,
          booking_status: "approved",
          request_for_disbursement: 0
        })
      );
    }
  }, [dispatch, next_page_param]);

  const [filterBy, setFilterBy] = useState();

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

    setFilterBy(transformedSearchData);
    dispatch(
      getAllBookings({
        params: {
          ...transformedSearchData,
          booking_status: "approved",
          request_for_disbursement: 0
        },
      })
    );
  };

  // const handleRowDoubleClick = (event) => {
  //   const rowId = event.data.uuid; // Assuming 'id' is the key
  //   console.log(rowId)
  //   openNewWindow(
  //     `/BookingProcess/booking/${rowId}/edit`
  //   );
  // };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Loan Operation</Typography>
        <Typography color="text.primary">Request For Disbursement</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={BOOKING_PROCESS_SEARCH_OPTIONS}
        status={BOOKING_PROCESS_STATUS}
        onSearch={handleSearch}
      />
      <RequestForDisbursementAppBar applicationIds={bookings.map((app) => app?.contract?.id)}  selectedRows={selectedRows}/>
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={rowData ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="RequestForDisbursementTable"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 210px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
          onSelectionChanged={handleSelectionChanged}
          rowSelection={"multiple"}
        // rowMultiSelectWithClickFlag={"true"}
        // onRowDoubleClicked={handleRowDoubleClick}
        // getRowStyle={getRowStyle} // Disable rows based on condition
        />
      </Paper>
    </Box>
  );
};

export default React.memo(RequestForDisursementTableIndex);
