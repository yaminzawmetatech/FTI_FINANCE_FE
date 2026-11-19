import React, { useMemo } from "react";
import { Box } from "@mui/material";
import Accordion from "components/Accordion";
import Table from "components/Table";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Tooltip from "@mui/material/Tooltip";
import { useParams } from "react-router-dom";
import { Payment } from "@mui/icons-material";
import PaymentScheduleLineExportButton from "./PaymentScheduleLineExportButton";
import { CurrencyFormatter } from "common/CurrencyFormatter";

const PaymentScheduleLine = ({isLoading, contract}) => {
  const [params, setParams] = useSearchParams();
  const { mode } = useParams();

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
        field: "monthly_installment",
        headerName: "Monthly Installment",
        width: 150,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter
      },
      {
        field: "due_date",
        headerName: "Due Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "no_of_sms",
        headerName: "No. of SMS",
        width: 150,
        sortable: false,
        resizable: true,
      },
      {
        field: "no_of_activity",
        headerName: "No. of Activity",
        width: 150,
        sortable: false,
        resizable: true,
      },
      {
        field: "tenor",
        headerName: "Tenor",
        width: 80,
        sortable: false,
        resizable: true,
      },
    ],
    []
  );

  return (
    <Accordion title="Payment Schedule Line">
      <PaymentScheduleLineExportButton contract={contract}></PaymentScheduleLineExportButton>
      <Box sx={{ mt: 1}}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={contract?.actual_payment_lines ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="PaymentScheduleLines"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 400px)",
            width: "700px"
          }}
          loading={isLoading}
          sx={{width: "520px"}}
        />
      </Box>
    </Accordion>
  );
};

export default PaymentScheduleLine;
