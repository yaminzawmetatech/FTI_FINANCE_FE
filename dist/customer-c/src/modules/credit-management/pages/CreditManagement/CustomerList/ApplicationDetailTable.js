import * as React from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { useParams } from "react-router";
import { getAssessments } from "modules/credit-management/slices/assessmentSlice";
import Table from "components/Table";

const ApplicationDetailTable = () => {
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
        field: "application_id",
        headerName: "Application ID",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "ihco_id",
        headerName: "IHCO Name",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "category.name",
        headerName: "Category",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "sub_category_id",
        headerName: "Sub Category",
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
        field: "loan_amount",
        headerName: "Loan Amount",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "loan_term_type",
        headerName: "Tenor/Loan Term Type",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "loan_term_duration",
        headerName: "Tenor/Loan Term Duration",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "interest_rate",
        headerName: "Interest Rate",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "purpose_of_loan",
        headerName: "Purpose of Loan",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "monthly_installment",
        headerName: "Monthly Installment",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "stamp_duty_percentage",
        headerName: "Stamp Duty %",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "stamp_duty_fees",
        headerName: "Stamp Duty Fee",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "processing_percentage",
        headerName: "Processing %",
        width: 150,
        sortable: true,
        resizable: true,
      },
      {
        field: "processing_fees",
        headerName: "Processing Fee",
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
        sortable: true,
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

export default React.memo(ApplicationDetailTable);
