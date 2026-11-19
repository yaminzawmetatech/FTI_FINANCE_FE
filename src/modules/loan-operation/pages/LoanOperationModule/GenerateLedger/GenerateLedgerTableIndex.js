import React, { useEffect, useState } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import GenerateLedgerAppBar from "./GenerateLedgerAppBar";
import { getContracts } from "modules/loan-operation/slices/contractSlice";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import { useParams } from "react-router";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import { GENERATE_PAYMENT_SCHEDULE_LINES_OPTIONS } from "constants/searchOptions/generatePaymentScheduleLinesOptions";
import AdvancedSearch from "components/form/AdvancedSearch";

const ReportTable = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const uuids = params.getAll("uuids");

  const { contracts, next_page_param, isLoading } = useSelector(
    (state) => state.contracts
  );

  const rowData = contracts || [];

  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChanged = useCallback(
    (rows) => {
      setSelectedRows(rows);
    },
    [selectedRows]
  );

  useEffect(() => {
    if (uuids.length > 0) {
      dispatch(
        getContracts({
          firstFetch: true,
          params: {
            category_id: categoryId,
            is_generated_gl: 0,
            uuids: JSON.stringify(uuids),
          },
        })
      );
    } else {
      dispatch(
        getContracts({
          firstFetch: true,
          params: {
            category_id: categoryId,
            is_generated_gl: 0,
          },
        })
      );
    }
  }, [dispatch, params]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getContracts({
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
        headerCheckboxSelection: true,
        checkboxSelection: true,
        width: 50,
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
        headerName: "ApplicationID",
        width: 150,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "mnet_application_id",
        headerName: "MNet Application ID",
        width: 130,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        sortable: true,
        resizable: true,
      },
      {
        field: "customer_loan_id",
        headerName: "Customer Loan ID",
        width: 130,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.application_info.kpay_id",
        headerName: "Kpay ID",
        width: 140,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "disbursement_date",
        headerName: "Disbursed Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "loan_amount",
        headerName: "Approved Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "applied_date",
        headerName: "Applied Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
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
      {
        field: "sub_category.name",
        headerName: "Sub Category",
        width: 100,
        resizable: true,
      },
      {
        field: "ihco_name",
        headerName: "IHCO",
        width: 200,
        resizable: true,
      },
      {
        field: "application.applicant_name",
        headerName: "Applicant Name",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.nrc",
        headerName: "NRC Number",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "living_phone_number",
        headerName: "Living Phone Number",
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
      getContracts({
        params: {
          is_generated_gl: false,
          ...transformedSearchData,
        },
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Loan Operation</Typography>
        <Typography color="text.primary">
          Generate Payment Scheduled Lines/ GL
        </Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={GENERATE_PAYMENT_SCHEDULE_LINES_OPTIONS}
        onSearch={handleSearch}
      />
      <GenerateLedgerAppBar selectedRows={selectedRows} />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="GeneralLedgerListTable"
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
