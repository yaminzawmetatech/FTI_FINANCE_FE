import * as React from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { useParams } from "react-router";
import Table from "../../../../../components/Table";
import { getJointApplicants } from "features/jointApplicant/jointApplicantSlice";

const JointApplicantListTable = ({ onSelectionChangedGuarantors }) => {
  const { applicationId: application_id } = useParams();
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const { jointApplicants, next_page_url, isLoading } = useSelector(
    (state) => state.jointApplicants
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
        field: "generated_application_id",
        headerName: "Application ID",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "full_name",
        headerName: "Full Name",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "full_nrc",
        headerName: "NRC",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "gender",
        headerName: "Gender",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "relation_with_customer",
        headerName: "Relation With Customer",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "monthly_income",
        headerName: "Monthly Income",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "current_full_address",
        headerName: "Current Address",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "permanent_full_address",
        headerName: "Permanent Address",
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
          getJointApplicants({
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
      onSelectionChanged={onSelectionChangedGuarantors}
      searchParams={params}
      setSearchParams={setParams}
      rowData={jointApplicants ?? []}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      name="ApplicationJointApplicantTable"
      rowKey="id"
      agThemeStyle={{
        height: "calc(100vh - 280px)",
      }}
      onScrollBottomEnd={handleBodyScroll}
      loading={isLoading}
    />
  );
};

export default React.memo(JointApplicantListTable);
