import React, { useEffect, useState } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { getContracts } from "features/contract/contractSlice";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import AdvancedSearch from "components/form/AdvancedSearch";
import { CONTRACT_SEARCH_OPTIONS } from "constants/searchOptions/contractSearchOptions";
import { CONTRACT_STATUS } from "constants/contractStatus";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import openNewWindow from "utils/windowUtils";
import { getAllBookings } from "features/bookingProcess/bookingProcessSlice";
import { BOOKING_PROCESS_SEARCH_OPTIONS } from "constants/searchOptions/bookingProcessOptions";
import { BOOKING_PROCESS_STATUS } from "constants/bookingProcessStatus";
import BookingHistoryAppBar from "./BookingHistoryAppBar";
import BookingProcessHistoryTableRowMenu from "./BookingProcessHistoryTableRowMenu";

const BookingProcessHistoryTable = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const { bookings, next_page_param, isLoading } = useSelector(
    (state) => state.bookings
  );

  const user = useSelector((state) => state.auth.user); // Get logged-in user details

  const rowData = bookings || [];


  // const filteredData = user?.user_group === "administrator" ? rowData : rowData.filter((i) => i.current_step === user?.user_group);
  // console.log(filteredData);



  const isDisable = rowData.map((i) => i.current_step !== user?.user_group);


  useEffect(() => {
    dispatch(
      getAllBookings({
        firstFetch: true,
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
      // {
      //   headerCheckboxSelection: true,
      //   checkboxSelection: true,
      //   field: "checkbox",
      //   width: 50,
      //   headerName: "",
      //   suppressMenu: true,
      //   sortable: false,
      //   resizable: false,
      //   pinned: "left",
      //   lockPosition: "left",
      //   lockPinned: true,
      // },
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
      // {
      //   field: "contract.id",
      //   headerName: "ContractID",
      //   width: 130,
      //   sortable: true,
      //   resizable: true,
      //   pinned: "left",
      //   lockPosition: "left",
      //   lockPinned: true,
      // },
      {
        field: "commission",
        headerName: "Commission %",
        width: 130,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "commission_amount",
        headerName: "Commission Amount",
        width: 130,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
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
        cellRenderer: BookingProcessHistoryTableRowMenu,
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
        field: "approved_date",
        headerName: "Approved Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        width: 180,
        sortable: true,
        resizable: true,
      },
      {
        field: "approved_by",
        headerName: "Approved By",
        width: 200,
        resizable: true,
      },
      {
        field: "status",
        headerName: "Booking Status",
        width: 150,
        sortable: true,
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

  const handleBodyScroll = useCallback(async () => {
    if (next_page_param) {
      dispatch(
        getAllBookings({
          params: next_page_param,
          firstFetch: false,
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
        },
      })
    );
  };

  const handleRowDoubleClick = (event) => {

    const rowId = event.data.uuid; // Assuming 'id' is the key
    const category = event.data?.contract?.category_id;

    openNewWindow(
      `/BookingProcess/${category}/booking/${rowId}/edit`
    );
  };

  const getRowStyle = useCallback((params) => {
    const isRowDisabled = params.data?.current_step !== user?.user_group;
    return isRowDisabled ? { backgroundColor: "#f0f0f0", pointerEvents: "none" } : {};
  }, [user]);

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Loan Operation</Typography>
        <Typography color="text.primary">Booking Processes</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={BOOKING_PROCESS_SEARCH_OPTIONS}
        status={BOOKING_PROCESS_STATUS}
        onSearch={handleSearch}
      />
      <BookingHistoryAppBar bookingIds={bookings.map((app) => app?.id)} transformedSearchData={filterBy} selectedRows={selectedRows} />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={rowData ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="Booking Processes"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 210px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
          // onSelectionChanged={handleSelectionChanged}
          // rowSelection={"multiple"}
          // rowMultiSelectWithClickFlag={"true"}
          // onRowDoubleClicked={handleRowDoubleClick}
        // getRowStyle={getRowStyle} // Disable rows based on condition
        />
      </Paper>
    </Box>
  );
};

export default React.memo(BookingProcessHistoryTable);
