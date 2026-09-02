import React, { useEffect } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import StampDutySettlementAppBar from "./StampDutySettlementAppBar";
import { getAllStampDutyPayments } from "features/stampDutyPayment/stampDutyPaymentSlice";
import StampDutyPaymentTableRowMenu from "./StampDutySettlementTableRowMenu";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import AdvancedSearch from "components/form/AdvancedSearch";
import { STAMP_DUTY_SETTLEMENT_OPTIONS } from "constants/searchOptions/stampDutySettlementOptions";

const StampDutyPaymentTable = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const { stampDutyPayments, next_page_param, isLoading } = useSelector(
    (state) => state.stampDutyPayments
  );

  useEffect(() => {
    dispatch(
      getAllStampDutyPayments({
        firstFetch: true,
        params: {
          status_array: JSON.stringify([ "approved" ]),
        },
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getAllStampDutyPayments({
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

  const getRowStyle = (params) => {
    const isSettled = params.data.is_settled;
    return isSettled ? {} : { background: "rgba(255, 0, 0, 0.1)" };
  };

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
        field: "stamp_duty_status",
        headerName: "Status",
        width: 100,
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
        lockPinned: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        headerName: "",
        field: "menu",
        width: 50,
        lockPosition: "left",
        pinned: "left",
        cellRenderer: StampDutyPaymentTableRowMenu,
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
        width: 100,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "payment_amount",
        headerName: "Payment Amount",
        width: 100,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "exceed_amount",
        headerName: "Exceed Amount",
        width: 100,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter
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
        field: "is_settled",
        width: 80,
        headerName: "Settled",
        suppressMenu: true,
        sortable: false,
        resizable: false,
        cellRenderer: DisabledCheckboxRenderer,
      },
      {
        field: "settlement_date",
        headerName: "Settlement Date",
        width: 100,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
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
      getAllStampDutyPayments({
        params: {
          status_array: JSON.stringify([ "approved" ]),
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
          Stamp Duty Payment Settlement
        </Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={STAMP_DUTY_SETTLEMENT_OPTIONS}
        onSearch={handleSearch}
      />
      {/* <StampDutySettlementAppBar /> */}
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={stampDutyPayments ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="StampDutySettlement"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 210px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
          getRowStyle={getRowStyle}
        />
      </Paper>
    </Box>
  );
};

export default React.memo(StampDutyPaymentTable);
