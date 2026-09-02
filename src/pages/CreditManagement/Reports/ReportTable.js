import React, { useEffect, useState } from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import { getApplication } from "features/application/applicationSlice";
import dayjs from "dayjs";
import ReportAppBar from "./ReportAppBar";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import { APPLICATION_REPORT_OPTIONS } from "constants/searchOptions/applicationReportOptions";
import AdvancedSearch from "components/form/AdvancedSearch";
import { Breadcrumbs, Typography, Box, Paper, Grid } from "@mui/material";
import { REPORT_STATUS } from "constants/reportsStatus";

const ReportTable = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const [applicationsData, setApplicationsData] = useState([]);

  const { applications, next_page_param, isLoading } = useSelector(
    (state) => state.application
  );

  // useEffect(() => {
  //   let temp_arr = [];
  //   temp_arr = applications.filter((item) => {
  //     return item.status != "New";
  //   });
  //   setApplicationsData(temp_arr);
  // }, [applications]);

  useEffect(() => {
    dispatch(
      getApplication({
        firstFetch: false,
        params: {
          is_report:1,
          status_array: JSON.stringify([
            "New",
            "Pending",
            "Request For Approval",
            "Reconsideration",
            "Approved",
            "Rejected",
            "Application Cancel",
          ]),
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
            is_report:1,
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
        field: "id",
        headerName: "ID",
        width: 80,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "application_info.mnet_application_id",
        headerName: "MNet ID",
        width: 100,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        sortable: true,
      },
      {
        field: "application_info.customer_loan_id",
        headerName: "Customer Loan ID",
        width: 150,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        sortable: true,
      },
      {
        field: "application_info.kpay_id",
        headerName: "Kpay ID",
        width: 150,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        sortable: true,
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
        field: "status",
        headerName: "Status",
        width: 150,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "approved_amount",
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
        field: "credit_assessment_date",
        headerName: "Credit Assessment Date",
        width: 200,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
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
        field: "ihco_user.user_name",
        headerName: "IHCO",
        width: 200,
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
        field: "nrc",
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

  const uniqueCategoryIds = [
    ...new Set(applications?.map((app) => app.category_id)),
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
      getApplication({
        params: {
          ...transformedSearchData,
          is_report:1,
        },
      })
    );
  };
  const mode = "divide_mode";
  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Credit Management</Typography>
        <Typography color="text.primary">Reports</Typography>
      </Breadcrumbs>
      {/* <Grid
        container
        spacing={1}
      >
        <Grid item xs={8} sm={8} md={8} lg={8} sx={{ borderBottom: "1px solid rgb(167, 173, 182)" }}>
          <AdvancedSearch
            options={APPLICATION_REPORT_OPTIONS}
            status={REPORT_STATUS}
            onSearch={handleSearch}
            mode={mode}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4} sx={{ borderBottom: "1px solid rgb(167, 173, 182)" }}>
          <h1>Hahahahahahaaaaaaaaaaaaaaa</h1>
        </Grid>
      </Grid> */}
      <AdvancedSearch
        options={APPLICATION_REPORT_OPTIONS}
        status={REPORT_STATUS}
        onSearch={handleSearch}
        //mode={mode}
      />
      <ReportAppBar
        applicationIds={applications?.map((app) => app.id)}
        categoryId={uniqueCategoryIds}
      />
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={applications ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="ReportsTableList"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 170px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
        />
      </Paper>
    </Box>
  );
};

export default React.memo(ReportTable);
