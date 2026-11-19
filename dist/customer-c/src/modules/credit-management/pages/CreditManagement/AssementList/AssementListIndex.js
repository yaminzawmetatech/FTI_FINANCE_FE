import * as React from "react";
import { useMemo, useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import {
  Breadcrumbs,
  Typography,
} from "@mui/material";
import { getAssessments } from "modules/credit-management/slices/assessmentSlice";
import dayjs from "dayjs";
import Table from "components/Table";
import { useSearchParams } from "react-router-dom";
import AssessmentListAppBar from "./AssessmentListAppBar";
import { ASSESSMENT_SEARCH_OPTIONS } from "constants/searchOptions/assessmentListSearchOptions";
import AdvancedSearch from "components/form/AdvancedSearch";
import { APPLICATION_ASSESSMENT_STATUS } from "constants/applicationStatusArr";
import AssessmentTableRowMenu from "./AssessmentTableRowMenu";


const AssementList = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const [transformedSearchDataResponse, setTransformedSearchDataResponse] =
    useState();

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => {},
    }),
    []
  );

  const columnDefs = useMemo(
    () => [
      {
        headerName: "No.",
        width: 50,
        valueGetter: "node.rowIndex + 1",
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "application.application_id",
        headerName: "Application ID",
        width: 150,
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
        cellRenderer: AssessmentTableRowMenu,
        cellRendererParams: {},
        lockPinned: true,
      },
      {
        field: "conduct_at",
        headerName: "Conduct Date",
        width: 200,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
          sortable: true,
          resizable: true,
      },
      {
        field: "remark",
        headerName: "Remark",
        width: 200,
        resizable: true,
      },
      {
        field: "investigation_result",
        headerName: "Investigation Result",
        width: 200,
        resizable: true,
      },
      {
        field: "assessment_type",
        headerName: "Assessment Type",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "status",
        headerName: "Status",
        width: 100,
        resizable: true,
      },
      {
        field: "approved_user.user_name",
        headerName: "Approved by",
        width: 150,
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
        field: "created_user.user_name",
        headerName: "Created By",
        size: 100,
      },

      {
        field: "created_at",
        headerName: "Created Date",
        width: 200,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "modified_user.user_name",
        headerName: "Modified By",
        size: 150,
      },
      {
        field: "updated_at",
        headerName: "Modified Date",
        width: 200,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
    ],
    []
  );

  const { assessments, next_page_param, isLoading } = useSelector((state) => state.assessments);

  useEffect(() => {
    dispatch(getAssessments({
      firstFetch: true,
    }));
  }, [dispatch]);

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getAssessments({
            params: next_page_param,
            firstFetch: false,
          })
        );
      }
    },
    [dispatch, next_page_param]
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

    setTransformedSearchDataResponse(transformedSearchData);
    dispatch(
      getAssessments({
        params: {
          ...transformedSearchData,
        },
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 1 }}
        className="margin-top-8"
      >
        <Typography color="text.primary">Credit Management</Typography>
        <Typography color="text.primary">Assement List</Typography>
      </Breadcrumbs>
      <AdvancedSearch
        options={ASSESSMENT_SEARCH_OPTIONS}
        onSearch={handleSearch}
        status={APPLICATION_ASSESSMENT_STATUS}
      />
      <AssessmentListAppBar
        applicationIds={[
          ...new Set(assessments?.map((assessment) => assessment.application_id))
        ]}
        transformedSearchData={transformedSearchDataResponse}
      />
      
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={assessments ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="AssessmentListTable"
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

export default AssementList;
