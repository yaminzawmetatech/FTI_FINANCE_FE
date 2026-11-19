import React, { useMemo, useRef } from "react";
import { Box, Button } from "@mui/material";
import Accordion from "components/Accordion";
import Table from "components/Table";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getEOMLogEntryByUuid } from "modules/finance/slices/EOMSlice";

const EOMLogTable = ({ isLoading,logTableLoading, jobQueueLogEntryDetails }) => {

  const dispatch = useDispatch();
  const { uuid, mode , route } = useParams();

  const defaultColDef = useMemo(
    () => ({
      valueSetter: () => { },
    }),
    []
  );

  let rowData = jobQueueLogEntryDetails ? [jobQueueLogEntryDetails] : [];

  const columnDefs = useMemo(
    () => [
      {
        field: "row",
        headerName: "Line No",
        valueGetter: "node.rowIndex + 1",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "eom_date",
        width: 150,
        headerName: "EOM Date",
        sortable: false,
        resizable: true,
      },
      {
        field: "bom_date",
        width: 150,
        headerName: "BOM Datee",
        sortable: false,
        resizable: true,
      },
      {
        field: "description",
        width: 150,
        headerName: "Description",
        sortable: false,
        resizable: true,
      },
      {
        field: "status",
        width: 150,
        headerName: "Status",
        sortable: false,
        resizable: true,
      },
      {
        field: "start_date_time",
        width: 150,
        headerName: "Start Date Time",
        sortable: false,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "end_date_time",
        width: 150,
        headerName: "End Date Time",
        sortable: false,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "error_message",
        headerName: "Error Message",
        width: 200,
        sortable: true,
        resizable: true
      },
      {
        field: "created_at",
        headerName: "Created At",
        width: 200,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "created_user.user_name",
        width: 150,
        headerName: "Created User",
        sortable: false,
        resizable: true,
      },
      {
        field: "updated_at",
        headerName: "Modified At",
        width: 200,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "modified_user.user_name",
        width: 150,
        headerName: "Modififed User",
        sortable: false,
        resizable: true,
      }
    ],
    []
  );

  return (
    <Accordion title="Log Entry">
      {(mode && mode === 'view') && <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => {
          console.log();
          dispatch(getEOMLogEntryByUuid(uuid));
        }}
      >
        Refresh
      </Button>}

      <Box sx={{ mt: 1 }}>
        <Table
          rowData={rowData || []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="EOMBOMLogTable"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 500px)",
          }}
          suppressCopyRowsToClipboard={true}
          enableRangeSelection={true}
          copyHeadersToClipboard={true}
          loading={logTableLoading}
        />
      </Box>
    </Accordion>
  );
};

export default EOMLogTable;
