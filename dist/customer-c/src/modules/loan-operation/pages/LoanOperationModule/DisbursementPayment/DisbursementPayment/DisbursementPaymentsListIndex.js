import React, { useEffect, useState } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import DisbursementProcessAppBar from "./DisbursementPaymentAppBar";
import { getContracts } from "modules/loan-operation/slices/contractSlice";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import { useParams } from "react-router";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import AdvancedSearch from "components/form/AdvancedSearch";
import { getAllBookings } from "modules/loan-operation/slices/bookingProcessSlice";
import { DISBURSEMENT_PAYMENT_OPTIONS } from "constants/searchOptions/disbursementPaymentOptions";

const ReportTable = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const [params, setParams] = useSearchParams();

  // const { contracts, next_page_param, isLoading } = useSelector(
  //   (state) => state.contracts
  // );

  const { bookings, next_page_param, isLoading } = useSelector(
    (state) => state.bookings
  );

  useEffect(() => {
    dispatch(
      getAllBookings({
        firstFetch: true,
        params: {
          booking_status: ["approved"],
          request_for_disbursement: 1,
          not_disbursement: 1,
        }
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getAllBookings({
            firstFetch: false,
            params: next_page_param,
            booking_status: ["approved"],
            request_for_disbursement: 1,
            not_disbursement: 1,
          })
        );
        // dispatch(
        //   getContracts({
        //     params: next_page_param,
        //     firstFetch: false,
        //   })
        // );
      }
    },
    [dispatch, next_page_param]
  );

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
        field: "application.name_of_emp_or_business",
        headerName: "Name Of Business",
        width: 150,
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
        field: "dealer_disbursed_amount",
        headerName: "Dealer Disbursed Amount",
        width: 130,
        sortable: true,
        resizable: true,
        valueGetter: (params) =>
          params.data?.contract?.application?.application_info?.total_amount ??
          params.data?.contract?.loan_amount,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "dealer.name",
        headerName: "Dealer Name",
        width: 130,
        sortable: true,
        resizable: true,

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

      // {
      //   field: "contract.category.name",
      //   headerName: "Category",
      //   width: 130,

      // },
      // {
      //   field: "contract.interest_rate",
      //   headerName: "Interest Rate",
      //   width: 130,

      // },
      // {
      //   field: "contract.loan_amount",
      //   headerName: "Loan Amount",
      //   valueFormatter: CurrencyFormatter,
      //   width: 130,

      // },

      // {
      //   headerName: "",
      //   field: "menu",
      //   width: 50,
      //   lockPosition: "left",
      //   pinned: "left",
      //   cellRenderer: RequestForDisbursementTableRowMenu,
      //   cellRendererParams: {
      //     selectedData: (data) => { },
      //   },
      //   lockPinned: true,
      // },
    ],
    []
  );



  const uniqueCategoryIds = [
    ...new Set(bookings.map((app) => app?.contract?.category_id)),
  ];


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
      getAllBookings({
        params: {
          booking_status: "approved",
          request_for_disbursement: 1,
          not_disbursement: 1,
          ...transformedSearchData,
        },
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Loan Operation</Typography>
        <Typography color="text.primary">Disbursement Payment</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={DISBURSEMENT_PAYMENT_OPTIONS}
        onSearch={handleSearch}
      />
      <DisbursementProcessAppBar
        applicationIds={bookings.map((app) => app?.contract?.id)}
        categoryId={uniqueCategoryIds}
        selectedRows={selectedRows}
      />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={bookings ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="Disbursement Payment List"
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

export default React.memo(ReportTable);
