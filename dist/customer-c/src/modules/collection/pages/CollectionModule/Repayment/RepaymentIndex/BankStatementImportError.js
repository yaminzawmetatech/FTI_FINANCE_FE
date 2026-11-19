import React, { useMemo } from "react";
import { Box, Button } from "@mui/material";
import Accordion from "components/Accordion";
import Table from "components/Table";
import { useSearchParams } from "react-router-dom";
import CheckActualPaymentLineButton from "./CheckActualPaymentLineButton";
import { useParams } from "react-router-dom";
import NamesRender from "./NamesRender";
import BankStatementImportErrorExportButton from "./BankStatementImportErrorExportButton";
import {
  checkCustomerNameBySettlementUuid,
  getRepaymentByUuid,
} from "modules/collection/slices/repaymentSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const BankStatementImportError = ({ isLoading, repayment }) => {
  const [params, setParams] = useSearchParams();
  const { uuid, mode } = useParams();

  const defaultColDef = useMemo(() => ({}), []);

  const dispatch = useDispatch();

  const formatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const currencyFormatter = (params) => {
    return formatter.format(params.value);
  };

  let filterRow = (row) => !row.is_ok;

  const rowData = repayment?.settlements?.filter(filterRow);

  const handleClickApply = async () => {
    const tempData = rowData?.map(item => ({
        uuid: item?.uuid,
        customer_name: item?.contract_info[0]?.customer_name || item?.customer_name
    }));
    let response = await dispatch(
      checkCustomerNameBySettlementUuid(
        tempData,
      )
    );
    if (response?.payload?.success) {
      await dispatch(getRepaymentByUuid({ uuid: uuid }));
      toast.success("Name Applied successfully.");
    }
  };

  const columnDefs = useMemo(
    () => [
      {
        field: "row",
        headerName: "Line No",
        valueGetter: "node.rowIndex + 1",
        width: 50,
        sortable: true,
        resizable: true,
      },
      {
        field: "transaction_timestamp",
        width: 150,
        headerName: "Transaction Date",
        sortable: false,
        resizable: true,
      },
      {
        field: "repayment_date",
        width: 150,
        headerName: "Value Date",
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
        field: "application_id",
        width: 150,
        headerName: "Mnet Application ID",
        sortable: false,
        resizable: true,
      },
      {
        field: "customer_id",
        width: 150,
        headerName: "Mnet Customer ID",
        sortable: false,
        resizable: true,
      },
      {
        field: "repayment_amount",
        width: 150,
        headerName: "Amount",
        sortable: false,
        resizable: true,
        valueFormatter: currencyFormatter,
        type: "rightAligned",
      },
      {
        field: "application_id",
        width: 150,
        headerName: "Error Application ID",
        sortable: false,
        resizable: true,
      },
      {
        field: "customer_name",
        width: 150,
        headerName: "Error Customer Name",
        sortable: false,
        resizable: true,
      },
      // {
      //     headerName: "Customer Name Check",
      //     field: "color",
      //     cellRenderer: mode === 'edit' ? NamesRender : null,
      //     cellRendererParams: {
      //         uuid
      //     }
      // },
      {
        headerName: "Customer Name Check",
        editable: false,
        valueGetter: (params) =>
          params.data?.contract_info?.[0]?.customer_name || "",
        //type: 'rightAligned',
        cellClass: "textfield-cell",
      },
      {
        field: "error_message",
        width: 300,
        headerName: "Error Message",
        sortable: false,
        resizable: true,
      },
      {
        field: "",
        width: 150,
        headerName: "Reference No.",
        sortable: false,
        resizable: true,
      },
      {
        field: "customer_name",
        width: 150,
        headerName: "Customer Name",
        sortable: false,
        resizable: true,
      },
      {
        field: "customer_id_system",
        width: 150,
        headerName: "Actual Customer ID",
        sortable: false,
        resizable: true,
      },
      {
        field: "value",
        width: 220,
        headerName: "Check Actual Line Payment",
        cellRenderer: mode === "edit" ? CheckActualPaymentLineButton : null,
        cellRendererParams: {
          uuid,
        },
        resizable: true,
      },
    ],
    []
  );

  return (
    <Accordion title="Bank Statement Import Error">
      <BankStatementImportErrorExportButton />
      <Button
        variant="contained"
        //size="small"
        // sx={{ borderRadius: , ml: 2 }}
        onClick={handleClickApply}
      >
        Apply Name
      </Button>
      <Box sx={{ mt: 1 }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={rowData ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="Bank Statement Import Error"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 400px)",
          }}
          suppressCopyRowsToClipboard={true}
          enableRangeSelection={true}
          copyHeadersToClipboard={true}
          rowSelection={"multiple"}
          loading={isLoading}
        />
      </Box>
    </Accordion>
  );
};

export default BankStatementImportError;
