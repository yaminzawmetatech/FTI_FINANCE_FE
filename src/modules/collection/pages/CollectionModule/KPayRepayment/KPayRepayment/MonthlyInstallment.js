import React, { useMemo, useCallback } from "react";
import { Box, Button, Chip } from "@mui/material";
import Accordion from "components/Accordion";
import Table from "components/Table";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PenaltyAllWaiveButton from "./PenaltyAllWaiveButton";
import ApplyMonthlyInstallmentButton from "./ApplyMonthlyInstallmentButton";
import openNewWindow from "utils/windowUtils";
import {
  getRepaymentByUuid,
  updateWaiveAmount,
} from "modules/collection/slices/repaymentSlice";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import MonthlyInstallmentExportButton from "./MonthlyInstallmentExportButton";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import dayjs from "dayjs";

const MonthlyInstallment = ({
  isLoading,
  repayment,
  selectedRows,
  setSelectedRows,
}) => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const { uuid, mode } = useParams();

  const auth = useSelector((state) => state.auth.user);

  //show hide menus by permissions
  const showApply =
    auth?.permissions.includes("Repayment-MonthlyInstalment-Apply") ||
    auth.is_super === true;
  const showViewApplied =
    auth?.permissions.includes("Repayment-MonthlyInstalment-ViewApplied") ||
    auth.is_super === true;
  const showWaive =
    auth?.permissions.includes("Repayment-MonthlyInstalment-WaivePenalty") ||
    auth.is_super === true;
  let filterRow = (row) => row.is_ok && row.type === "monthly_installment";

  let modifiedRowData = (row) => {
    return {
      ...row,
      waive_penalty_fee:
        row.waive_penalty_fee === null
          ? row.remaining_penalty_fee
          : row.waive_penalty_fee,
    };
  };

  let rowData = repayment?.settlements?.filter(filterRow).map(modifiedRowData);

  const defaultColDef = useMemo(() => ({}), []);

  // change row style adding background color
  const getRowStyle = (params) => {
    const isApplied = params.data?.is_applied;
    const isHandling = params.data?.is_waived;
    // return !isApplied ? {} : {background: "rgb(194, 237, 211)"};
    return isApplied
      ? { background: "rgb(194,237,211)" }
      : isHandling
      ? { background: "rgb(248,250,220)" }
      : {};
  };

  // click enter and update waive amount
  const handleCellValueChanged = async (event) => {
    const value = event.newValue;
    const selectedUuid = event.data.uuid;

    try {
      await dispatch(
        updateWaiveAmount({ uuid: selectedUuid, value: value })
      ).unwrap();

      showSuccessToast(CommonMessage.MFS00008);
      dispatch(getRepaymentByUuid({ uuid: uuid }));
    } catch (error) {
      console.error("Error:", error);
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
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "application_id",
        width: 150,
        headerName: "Mnet Application ID",
        sortable: false,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        width: 50,
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
        field: "due_date_excel",
        width: 150,
        headerName: "Due Date (Excel)",
        sortable: false,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "due_date_system",
        width: 150,
        headerName: "Due Date (System)",
        sortable: false,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "repayment_amount",
        width: 150,
        headerName: "Repayment Amount",
        sortable: false,
        resizable: true,
        type: "rightAligned",
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "repayment_amount_excel",
        width: 150,
        headerName: "Repayment Amount (Excel)",
        sortable: false,
        resizable: true,
        type: "rightAligned",
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "penalty_fees_system",
        width: 150,
        headerName: "Penalty (System)",
        sortable: false,
        resizable: true,
        type: "rightAligned",
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "penalty_fees_excel",
        width: 150,
        headerName: "Penalty Excel (In)",
        sortable: false,
        resizable: true,
        type: "rightAligned",
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "penalty_discount_fees_excel",
        width: 150,
        headerName: "Penalty Excel (Out)",
        sortable: false,
        resizable: true,
        type: "rightAligned",
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "penalty_received",
        width: 150,
        headerName: "Received Penalty",
        sortable: false,
        resizable: true,
        type: "rightAligned",
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "remaining_penalty_fee",
        width: 150,
        headerName: "Remaining Penalty",
        sortable: false,
        resizable: true,
        type: "rightAligned",
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "waive_penalty_fee",
        width: 200,
        headerName: "Penalty Fees Waive Amount",
        sortable: false,
        resizable: true,
        editable: true,
        cellEditor: "agTextCellEditor",
        type: "rightAligned",
        cellClass: "textfield-cell", // call textfield-cell css
        valueFormatter: CurrencyFormatter,
        onCellValueChanged: handleCellValueChanged,
      },
      // {
      //     width: 200,
      //     headerName: "Penalty Waive Button",
      //     cellRenderer: mode === 'edit' ? PenaltyWaveButton : null,
      //     cellRendererParams: {
      //         uuid
      //     },
      // },
      {
        field: "customer_id",
        width: 150,
        headerName: "Mnet Customer ID",
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
        field: "",
        width: 150,
        headerName: "Reference No.",
        sortable: false,
        resizable: true,
      },
      {
        field: "",
        width: 150,
        headerName: "Remark",
        sortable: false,
        resizable: true,
      },
      {
        field: "",
        width: 150,
        headerName: "Error Application Name",
        sortable: false,
        resizable: true,
      },
      {
        field: "",
        width: 150,
        headerName: "Error Application ID",
        sortable: false,
        resizable: true,
      },
    ],
    []
  );

  const waveMoneyColumnDefs = useMemo(
    () => [
      {
        field: "row",
        headerName: "Line No",
        valueGetter: "node.rowIndex + 1",
        width: 50,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "disbursed_loan_id",
        width: 150,
        headerName: "Wave Customer Loan ID",
        sortable: false,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        width: 50,
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
        field: "due_date_excel",
        width: 150,
        headerName: "Due Date (Excel)",
        sortable: false,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "due_date_system",
        width: 150,
        headerName: "Due Date (System)",
        sortable: false,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "repayment_amount",
        width: 150,
        headerName: "Repayment Amount",
        sortable: false,
        resizable: true,
        type: "rightAligned",
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "repayment_amount_excel",
        width: 150,
        headerName: "Repayment Amount (Excel)",
        sortable: false,
        resizable: true,
        type: "rightAligned",
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "penalty_fees_system",
        width: 150,
        headerName: "Penalty (System)",
        sortable: false,
        resizable: true,
        type: "rightAligned",
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "penalty_fees_excel",
        width: 150,
        headerName: "Penalty (Excel)",
        sortable: false,
        resizable: true,
        type: "rightAligned",
        valueFormatter: CurrencyFormatter,
      },

      {
        field: "penalty_received",
        width: 150,
        headerName: "Received Penalty",
        sortable: false,
        resizable: true,
        type: "rightAligned",
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "remaining_penalty_fee",
        width: 150,
        headerName: "Remaining Penalty",
        sortable: false,
        resizable: true,
        type: "rightAligned",
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "waive_penalty_fee",
        width: 200,
        headerName: "Penalty Fees Waive Amount",
        sortable: false,
        resizable: true,
        editable: true,
        cellEditor: "agTextCellEditor",
        type: "rightAligned",
        cellClass: "textfield-cell", // call textfield-cell css
        valueFormatter: CurrencyFormatter,
        onCellValueChanged: handleCellValueChanged,
      },
      // {
      //     width: 200,
      //     headerName: "Penalty Waive Button",
      //     cellRenderer: mode === 'edit' ? PenaltyWaveButton : null,
      //     cellRendererParams: {
      //         uuid
      //     },
      // },
      {
        field: "customer_name",
        width: 150,
        headerName: "Customer Name",
        sortable: false,
        resizable: true,
      },
      {
        field: "wave_nrc",
        width: 150,
        headerName: "Wave NRC",
        sortable: false,
        resizable: true,
      },
      {
        field: "mobile_operator_type",
        width: 150,
        headerName: "Mobile Operator",
        sortable: false,
        resizable: true,
      },
      {
        field: "loan_approval_date",
        width: 150,
        headerName: "Loan Approval Date",
        sortable: false,
        resizable: true,
      },
      {
        field: "loan_amount",
        width: 150,
        headerName: "Loan Amount",
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "outstanding_amount_pi",
        width: 150,
        headerName: "Outstanding Principal (P + I)",
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "loan_collected_in_full",
        width: 150,
        headerName: "Loan Collected in Full",
        sortable: false,
        resizable: true,
      },
      {
        field: "repayment_amount_collectted",
        width: 150,
        headerName: "Repayment Amount Collected",
        sortable: false,
        resizable: true,
      },
      {
        field: "late_outstanding",
        width: 150,
        headerName: "Late Outstanding",
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
    ],
    []
  );

  // row select function
  const handleSelectionChanged = useCallback(
    (rows) => {
      setSelectedRows(rows);
    },
    [selectedRows]
  );

  // selected rows bind after close accordion
  const onFirstDataRendered = (params) => {
    const nodesToSelect = [];

    params.api.forEachNode((node) => {
      if (node.data) {
        selectedRows?.map((row) => {
          if (node.data.id === row.id) {
            nodesToSelect.push(node);
          }
        });
      }
    });

    params.api.setNodesSelected({ nodes: nodesToSelect, newValue: true });
  };

    return (
        <Accordion title="Monthly Installment">
            <Box sx={{display: 'flex'}}>
                {/* <div style={{ alignContent : "center", marginRight: "10px"}}>
                    No. Selected Row(s) : {selectedRows.length}
                </div> */}
                {/* {((mode === 'edit' || mode === 'view') && showApply) ?
                    <ApplyMonthlyInstallmentButton
                        selectedRows={selectedRows}
                        // monthlyInstallmentTableRef={monthlyInstallementTableRef}
                        repaymentUuid={uuid}
                    /> : ''
                } */}

        {(mode === "edit" || mode === "view") && showViewApplied ? (
          <Button
            variant="outlined"
            //size="small"
            sx={{ marginLeft: "10px" }}
            onClick={() => {
              openNewWindow(`/collection-module/repayment/${uuid}/applied-settlement-data`);
            }}
          >
            View Applied Settlement Data
          </Button>
        ) : (
          ""
        )}
        {/* {(mode === "edit" || mode === "view") && showWaive ? (
          <PenaltyAllWaiveButton
            // monthlyInstallementTableRef={monthlyInstallementTableRef}
            selectedRows={selectedRows}
            repaymentUuid={uuid}
          />
        ) : (
          ""
        )} */}
        <MonthlyInstallmentExportButton />
        <Box sx={{ marginLeft: "auto" }}>
          {/* <Chip
            label={"Collection Handled"}
            sx={{ background: "rgb(248,250,220)", marginRight: "3px" }}
            size={"medium"}
          /> */}
          <Chip
            label={"Accounting Applied"}
            sx={{ background: "rgb(194,237,211)", marginRight: "3px" }}
            size={"medium"}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={rowData ?? []}
          columnDefs={
            repayment?.category_id && repayment?.category_id === 2
              ? waveMoneyColumnDefs
              : columnDefs
          }
          defaultColDef={defaultColDef}
          name="MonthlyInstallment"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 400px)",
          }}
          loading={isLoading}
          rowSelection={"multiple"}
          rowMultiSelectWithClickFlag={"true"}
          getRowStyle={getRowStyle}
          isRowSelectable={(rowData) => {
            if (
              auth?.permissions.includes("Repayment-MonthlyInstalment-Apply")
            ) {
              return rowData.data.collection_approved;
            }
            return true;
          }}
          onSelectionChanged={handleSelectionChanged}
          onFirstDataRendered={onFirstDataRendered}
        />
      </Box>
    </Accordion>
  );
};

export default MonthlyInstallment;
