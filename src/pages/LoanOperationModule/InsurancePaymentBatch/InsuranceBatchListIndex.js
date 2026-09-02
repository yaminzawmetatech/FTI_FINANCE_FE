import React, { useEffect } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import StampDutyBatchAppBar from "./StampDutyBatchAppBar";
import { getAllStampDutyPayments } from "features/stampDutyPayment/stampDutyPaymentSlice";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import AdvancedSearch from "components/form/AdvancedSearch";
import { SUBMITTED_STAMP_DUTY_PAYMENT_OPTIONS } from "constants/searchOptions/submittedStampDutyPaymentOptions";
import { STAMP_DUTY_PAYMENT_STATUS } from "constants/stampDutyPaymentStatus";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import { getAllInsurancePayments } from "features/insurancePayment/insurancePaymentSlice";
import InsuranceBatchTableRowMenu from "./InsuranceBatchTableRowMenu";
import { SUBMITTED_INSURANCE_PAYMENT_OPTIONS } from "constants/searchOptions/submittedInsurancePaymentOptions";
import { INSURANCE_PAYMENT_STATUS } from "constants/insurancePaymentStatus";

const InsurancePaymentTable = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const { insurancePayments, next_page_param, isLoading } = useSelector(
    (state) => state.insurancePayments
  );

  useEffect(() => {
    dispatch(
      getAllInsurancePayments({
        firstFetch: true,
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getAllInsurancePayments({
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

  const DisabledCheckboxRenderer = ({ value }) => (
    <input
      type="checkbox"
      style={{ width: "20px", height: "15px" }}
      disabled
      checked={value}
    />
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
        field: "name",
        headerName: "Name",
        width: 250,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "insurance_status",
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
        width: 200,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "posting_date",
        headerName: "Posting Date",
        width: 170,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        lockPinned: true,
      },
      {
        headerName: "",
        field: "menu",
        width: 50,
        lockPosition: "left",
        pinned: "left",
        cellRenderer: InsuranceBatchTableRowMenu,
        cellRendererParams: {
          selectedData: (data) => {},
        },
        lockPinned: true,
      },
      {
        field: "description",
        headerName: "Description",
        width: 150,
        sortable: true,
        resizable: true,
      },

      {
        field: "actual_amount",
        headerName: "Actual Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },

      {
        field: "payment_amount",
        headerName: "Payment Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "exceed_amount",
        headerName: "Exceed Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "is_posted",
        width: 80,
        headerName: "Posting",
        suppressMenu: true,
        sortable: false,
        resizable: false,
        cellRenderer: DisabledCheckboxRenderer,
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
      getAllInsurancePayments({
        params: {
          ...transformedSearchData
        },
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Loan Operation</Typography>
        <Typography color="text.primary">
          Submitted Insurance Payment
        </Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={SUBMITTED_INSURANCE_PAYMENT_OPTIONS}
        status={INSURANCE_PAYMENT_STATUS}
        onSearch={handleSearch}
      />
      {/* <StampDutyBatchAppBar /> */}
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={insurancePayments ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="SubmittedInsurancepayment"
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

export default React.memo(InsurancePaymentTable);
