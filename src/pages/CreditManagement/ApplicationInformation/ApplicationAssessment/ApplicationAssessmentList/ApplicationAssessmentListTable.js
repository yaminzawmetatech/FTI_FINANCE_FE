import * as React from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { useParams } from "react-router";
import { getAssessments } from "../../../../../features/assessment/assessmentSlice";
import Table from "../../../../../components/Table";

const ApplicationAssessmentListTable = ({ onSelectionChangedAssessments }) => {
  const { applicationId: application_id } = useParams();
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const { assessments, next_page_url, isLoading } = useSelector(
    (state) => state.assessments
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
        field: "application.application_id",
        headerName: "Application ID",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "conduct_at",
        headerName: "Conduct Date",
        width: 200,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "remark",
        headerName: "Remark",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "investigation_result",
        headerName: "Investigation Result",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "assessment_type",
        headerName: "Assessment Type",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "status",
        headerName: "Status",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "approved_user.user_name",
        headerName: "Approved by",
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
        sortable: true,
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
        sortable: true,
        resizable: true,
      },
    ],
    []
  );

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_url) {
        dispatch(
          getAssessments({
            params: {
              ...Object.fromEntries(params),
              application_id,
            },
            firstFetch: false,
            url: next_page_url,
          })
        );
      }
    },
    [application_id, dispatch, next_page_url, params]
  );

  return (
    <Table
      rowSelection={"single"}
      onSelectionChanged={onSelectionChangedAssessments}
      searchParams={params}
      setSearchParams={setParams}
      rowData={assessments ?? []}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      name="ApplicationAssessmentTable"
      rowKey="id"
      agThemeStyle={{
        height: "calc(100vh - 280px)",
      }}
      onScrollBottomEnd={handleBodyScroll}
      loading={isLoading}
    />
  );
};

export default React.memo(ApplicationAssessmentListTable);
