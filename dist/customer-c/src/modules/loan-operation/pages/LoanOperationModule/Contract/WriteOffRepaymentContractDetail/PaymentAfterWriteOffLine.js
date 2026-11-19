import React, { useMemo } from "react";
import { Box, Button, Stack } from "@mui/material";
import Accordion from "components/Accordion";
import Table from "components/Table";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import PaymentAfterWOButton from "./PaymentAfterWOExportButton";
import { useSelector } from "react-redux";

const PaymentAfterWriteOffLines = ({
  isLoading,
  recoveryIncomes,
  handleClose,
  contractId,
}) => {
  const [params, setParams] = useSearchParams();

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
        field: "write_off_date",
        headerName: "Write Off Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "total_write_off_amount",
        headerName: "Total Write Off Amount",
        width: 200,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "total_outstanding_amount",
        headerName: "Total Outstanding Amount",
        width: 200,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "paid_amount",
        headerName: "Paid Amount",
        width: 150,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "paid_date",
        headerName: "Paid Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 180,
        sortable: true,
        resizable: true,
      },
      {
        field: "remaining_write_off_amount",
        headerName: "Remaining Write Off Amount",
        width: 200,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "remaining_outstanding_amount",
        headerName: "Remaining Outstanding Amount",
        width: 200,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "channel",
        headerName: "Channel",
        width: 150,
        sortable: false,
        resizable: true,
      },
    ],
    []
  );

  const auth = useSelector((state) => state.auth.user);

  const showApply =
    auth?.permissions.includes("PaymentAfterWriteOff-HandleStatus") ||
    auth.is_super === true;

  return (
    <Accordion title="Payment After Write Off Lines">
      <Box
        sx={{
          display: "flex",
          px: 1,
          pb: 1,
          justifyContent: "flex-start",
          gap: 2,
        }}
      >
        {showApply && (
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleClose("Write Off Fully Paid")}
          >
            Write Off Fully Paid
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={() => handleClose("Recovery Fully Paid")}
          >
            Recovery Fully Paid
          </Button>
        </Stack>
      )}
        <PaymentAfterWOButton contractId={contractId} />
      </Box>
      <Box sx={{ mt: 1 }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={recoveryIncomes ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="PaymentAfterWriteOffLines"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 400px)",
            // width: "700px"
          }}
          loading={isLoading}
          // sx={{ width: "520px" }}
        />
      </Box>
    </Accordion>
  );
};

export default PaymentAfterWriteOffLines;
