import React, { useMemo, useEffect, useCallback } from "react";
import Table from "components/Table";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import { getAllActualPaymentLines } from "features/actualPaymentLines/actualPaymentLinesSlice";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "components/Accordion";
import { Box } from "../../../../../node_modules/@mui/material/index";

const AssessmentList = ({cashDeposits}) => {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();

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
        headerName: "Line No",
        valueGetter: "node.rowIndex + 1",
        width: 70,
        sortable: true,
        resizable: true,
      },
      {
        field: "balance",
        width: 150,
        headerName: "Balance",
        suppressMenu: true,
        sortable: true,
        resizable: true,
      },
      {
        field: "disbursed_total_amount",
        width: 150,
        headerName: "Disbursed Amount",
        suppressMenu: true,
        sortable: true,
        resizable: true,
      },
      {
        field: "status",
        width: 100,
        headerName: "Status",
        suppressMenu: true,
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

  return (
    <Accordion title="Assessment List">
    <Box sx={{ mt: 1, paddingLeft: "200px" , paddingRight: "200px" }}>
      <Table
        searchParams={params}
        setSearchParams={setParams}
        rowData={cashDeposits?.cash_credits ?? []}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        name="AssessmentList"
        rowKey="id"
        agThemeStyle={{
          height: "calc(100vh - 300px)",
        }}
        // loading={isLoading}
        // onScrollBottomEnd={handleBodyScroll}
      />
    </Box>
    </Accordion>
  );
};

export default AssessmentList;
