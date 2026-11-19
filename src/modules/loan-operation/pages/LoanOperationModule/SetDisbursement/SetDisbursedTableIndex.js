import React, { useEffect, useState } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import { getApplication } from "modules/credit-management/slices/applicationSlice";
import dayjs from "dayjs";
import ApprovedApplicationAppBar from "./ApprovedApplicationAppBar";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import AdvancedSearch from "components/form/AdvancedSearch";
import { DISBURSED_SEARCH_OPTIONS } from "constants/searchOptions/disbursementSearchOptions";
import { CurrencyFormatter } from "common/CurrencyFormatter";

const DisbursedTable = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const { applications, next_page_param, isLoading } = useSelector(
    (state) => state.application
  );

  useEffect(() => {
    dispatch(
      getApplication({
        firstFetch: true,
        params: {
          status_array: JSON.stringify(["Approved"]),
          is_disbursed: 0,
          //mob_status: 0,
          mob_or_is_loan_operation_skipped: 1,
        },
      })
    );
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getApplication({
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

  const [selectedRows, setSelectedRows] = useState([]);

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
        field: "application_id",
        headerName: "ApplicationID",
        width: 150,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "application_info.mnet_application_id",
        headerName: "MNet Application ID",
        width: 130,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        sortable: true,
        resizable: true,
      },
      {
        field: "application_info.customer_loan_id",
        headerName: "Customer Loan ID",
        width: 130,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        sortable: true,
        resizable: true,
      },
      {
        field: "application_info.kpay_id",
        headerName: "Kpay ID",
        width: 130,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        sortable: true,
        resizable: true,
      },
      {
        field: "assessment_prorata_interest",
        headerName: "Prorata Interest",
        width: 120,
        resizable: true,
      },
      {
        field: "assessment_commencement_date",
        headerName: "Commencement Date",
        width: 150,
        resizable: true,
      },
      {
        field: "assessment_first_due_date",
        headerName: "First Due Date",
        width: 150,
        resizable: true,
      },
      {
        field: "category.name",
        headerName: "Category",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "sub_category.name",
        headerName: "Sub Category",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "sub_category.name",
        headerName: "Sub Category",
        width: 100,
        resizable: true,
      },
      {
        field: "applicant_name",
        headerName: "Applicant Name",
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
        field: "nrc",
        headerName: "NRC Number",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "status",
        headerName: "Status",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "assessment_approved_amount",
        headerName: "Approved Amount",
        width: 150,
        sortable: true,
        resizable: true,
        valueGetter: (params) => {
          return (
            params.data.assessment_approved_amount ??
            params.data.approved_amount
          );
        },
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "application_info.mnet_township",
        headerName: "MNet Township",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "address_township.name",
        headerName: "Customer Current Township",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "address_ward.name",
        headerName: "Customer Current Ward",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "ihco_user.user_name",
        headerName: "IHCO",
        width: 200,
        resizable: true,
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
        field: "credit_assessment_date",
        headerName: "Approved Date",
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

  const uniqueCategoryIds = [
    ...new Set(applications.map((app) => app.category_id)),
  ];

  const handleSearch = (searchData) => {
    const transformedSearchData = {};

    searchData.forEach((item) => {
      if (item.type === "date" || item.type === "date_time") {
        transformedSearchData[`${item.filtered_by}_from_date`] = item.value1;
        transformedSearchData[`${item.filtered_by}_to_date`] = item.value2;
      } else if (item.type === "autocomplete_status") {
        transformedSearchData[item.filtered_by] = JSON.stringify(item.value1);
      } else {
        transformedSearchData[item.filtered_by] = item.value1;
      }
    });

    dispatch(
      getApplication({
        params: {
          status_array: JSON.stringify(["Approved"]),
          is_disbursed: 0,
          //mob_status: 0,
          mob_or_is_loan_operation_skipped: 1,
          ...transformedSearchData,
        },
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Loan Operation</Typography>
        <Typography color="text.primary">Set Disbursement</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={DISBURSED_SEARCH_OPTIONS}
        onSearch={handleSearch}
      />
      <ApprovedApplicationAppBar
        applicationIds={applications.map((app) => app.id)}
        categoryId={uniqueCategoryIds}
        selectedRows={selectedRows}
      />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={applications ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="SetDisbursedInformation"
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

export default React.memo(DisbursedTable);
