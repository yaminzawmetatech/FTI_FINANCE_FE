import React, { useEffect, useState } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import PrepareForContractTableRowMenu from "./PrepareForContractTableRowMenu";
import {
  Backdrop,
  CircularProgress,
  Breadcrumbs,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import AdvancedSearch from "components/form/AdvancedSearch";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import { getPrepareForContracts } from "features/prepareForContract/prepareForContractSlice";
import PrepareForContractAppBar from "./PrepareForContractAppBar";
import { PREPARE_CONTRACT_SEARCH_OPTIONS } from "constants/searchOptions/prepareContractSearchOptions";

const PrepareForContractTable = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const uuids = params.getAll("uuids");

  const [selectedRows, setSelectedRows] = useState([]);

  const { prepareForContracts, next_page_param, isLoading } = useSelector(
    (state) => state.prepareForContracts
  );

  const { isLoading: isSubmitting } = useSelector((state) => state.contracts);

  const rowData = prepareForContracts || [];

  useEffect(() => {
    if (uuids.length > 0) {
      dispatch(
        getPrepareForContracts({
          firstFetch: true,
          params: {
            uuids: JSON.stringify(uuids),
            is_submitted: 0,
          },
        })
      );
    } else {
      dispatch(
        getPrepareForContracts({
          firstFetch: true,
          params: {
            is_submitted: 0,
          },
        })
      );
    }
  }, [dispatch, params]);

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => {},
    }),
    []
  );

  const handleSelectionChanged = useCallback(
    (rows) => {
      setSelectedRows(rows);
    },
    [selectedRows]
  );

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
        width: 110,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "application.application_info.mnet_application_id",
        headerName: "MNET ApplicationID",
        width: 140,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "application.application_info.customer_loan_id",
        headerName: "Customer Loan ID",
        width: 130,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        sortable: true,
        resizable: true,
      },
      {
        headerName: "",
        field: "menu",
        width: 50,
        lockPosition: "left",
        pinned: "left",
        cellRenderer: PrepareForContractTableRowMenu,
        cellRendererParams: {},
        lockPinned: true,
        suppressRowClickSelection: true
      },
      {
        field: "prorata_interest",
        headerName: "Prorata Interest",
        valueFormatter: CurrencyFormatter,
        width: 120,
        sortable: true,
        resizable: true,
      },
      {
        field: "first_due_date",
        headerName: "First Due Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 120,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.category.name",
        headerName: "Category",
        width: 100,
        resizable: true,
      },
      {
        field: "application.sub_category.name",
        headerName: "Sub Category",
        width: 100,
        resizable: true,
      },
      {
        field: "monthly_installment_amount",
        headerName: "Monthly Installment",
        valueFormatter: CurrencyFormatter,
        width: 120,
        sortable: true,
        resizable: true,
      },
      {
        field: "disbursed_date",
        headerName: "Disbursed Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        width: 180,
        sortable: true,
        resizable: true,
      },
      {
        field: "net_disbursed_amount",
        headerName: "Net Disbursement Amount",
        valueFormatter: CurrencyFormatter,
        width: 120,
        sortable: true,
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
        width: 180,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.living_phone_number",
        headerName: "Living Phone Number",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.loan_amount",
        headerName: "Loan Amount",
        width: 100,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: prepareForContracts.assessment_approved_amount
          ? "application.assessment_approved_amount"
          : "application.approved_amount",
        headerName: "Approved Amount",
        width: 100,
        sortable: true,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "application.application_info.mnet_township",
        headerName: "MNET Township",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.address_township.name",
        headerName: "Customer Current Township",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.address_ward.name",
        headerName: "Customer Current Ward",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "application.applied_date",
        headerName: "Applied Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        width: 200,
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

  const handleBodyScroll = useCallback(async () => {
    if (next_page_param) {
      dispatch(
        getPrepareForContracts({
          firstFetch: false,
          params: next_page_param,
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
      } else {
        transformedSearchData[item.filtered_by] = item.value1;
      }
    });

    dispatch(
      getPrepareForContracts({
        params: {
          is_submitted: 0,
          ...transformedSearchData,
        },
      })
    );
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSubmitting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ width: "100%" }}>
        <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
          <Typography color="text.primary">Loan Operation</Typography>
          <Typography color="text.primary">Preparation For Contract</Typography>
        </Breadcrumbs>
        <AdvancedSearch
          options={PREPARE_CONTRACT_SEARCH_OPTIONS}
          onSearch={handleSearch}
        />
        <PrepareForContractAppBar
          selectedRows={selectedRows}
          ids={rowData.map((data) => data.id)}
        />
        <Paper sx={{ width: "100%" }}>
          <Table
            searchParams={params}
            setSearchParams={setParams}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            name="PrepareForContractTable"
            rowKey="id"
            agThemeStyle={{
              height: "calc(100vh - 210px)",
            }}
            onScrollBottomEnd={handleBodyScroll}
            loading={isLoading}
            rowSelection={"multiple"}
            //rowMultiSelectWithClickFlag={"true"}
            onSelectionChanged={handleSelectionChanged}
          />
        </Paper>
      </Box>
    </>
  );
};

export default React.memo(PrepareForContractTable);
