import React, { useCallback, useMemo, useRef } from "react";
import { Box, Chip, Button } from "@mui/material";
import _ from "lodash";
import Accordion from "components/Accordion";
import Table from "components/Table";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { CurrencyFormatter } from "../../../../common/CurrencyFormatter";
import {
  getRepaymentByUuid,
  updateDiscountAmount,
  updateWaiveAmount,
} from "../../../../features/repayment/repaymentSlice";
import { showSuccessToast } from "../../../../common/ToastMessage";
import CommonMessage from "../../../../common/CommonMessage";
import { useDispatch, useSelector } from "react-redux";
import PenaltyAllWaiveButton from "./PenaltyAllWaiveButton";
import DiscountButton from "./DiscountInterestAmountButton";
import ApplyETButton from "./ApplyETButton";
import openNewWindow from "utils/windowUtils";

const EarlyTermination = ({
  isLoading,
  repayment,
  selectedETRows,
  setSelectedETRows,
}) => {
  const [params, setParams] = useSearchParams();
  const gridApiRef = useRef(null);

  const { uuid, mode } = useParams();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.user);

  const showDiscount =
    auth?.permissions.includes("Repayment-EarlyTermination-Discount") ||
    auth.is_super === true;
  const showWaive =
    auth?.permissions.includes("Repayment-EarlyTermination-WaivePenalty") ||
    auth.is_super === true;
  const showViewApplied =
    auth?.permissions.includes("Repayment-EarlyTermination-ViewApplied") ||
    auth.is_super === true;
  const showApply =
    auth?.permissions.includes("Repayment-EarlyTermination-Apply") ||
    auth.is_super === true;

  const isMob = repayment?.category?.mob_status === 1;

  const defaultColDef = useMemo(() => ({}), []);

  const onGridReady = (params) => {
    gridApiRef.current = params.api;
  };

  let filterRow = (row) => row.is_ok === 1 && row.type === "early_settlement";

  let modifiedRowData = (row) => {
    return {
      ...row,
      discount_interest_amount:
        row.discount_interest_amount === null && row.description !== "REPAYMENT"
          ? row.actual_payment_line?.interest - row.out_mmk
          : row.discount_interest_amount,
      waive_penalty_fee:
        row.waive_penalty_fee === null
          ? row.remaining_penalty_fee
          : row.waive_penalty_fee,
    };
  };

  let data = repayment?.settlements?.filter(filterRow).map(modifiedRowData);
  let rowData = _.sortBy(data, "due_date_system");

  // selected rows bind after close accordion
  const onFirstDataRendered = (params) => {
    const nodesToSelect = [];

    params.api.forEachNode((node) => {
      if (node.data) {
        selectedETRows?.map((row) => {
          if (node.data.id === row.id) {
            nodesToSelect.push(node);
          }
        });
      }
    });

    params.api.setNodesSelected({ nodes: nodesToSelect, newValue: true });
  };

  const handleCellValueChanged = async (event) => {
    const value = event.newValue;
    const selectedUuid = event.data.uuid;
    try {
      await dispatch(
        updateDiscountAmount({ uuid: selectedUuid, value: value })
      ).unwrap();

      showSuccessToast(CommonMessage.MFS00008);
      dispatch(getRepaymentByUuid({ uuid: uuid }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleWaivePenaltyValueChanged = async (event) => {
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

  const columnDefs = [
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
      sortable: true,
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
      field: "actual_payment_line.monthly_installment",
      width: 150,
      headerName: "Monthly Installment Amount (System)",
      sortable: false,
      resizable: true,
      type: "rightAligned",
      valueFormatter: CurrencyFormatter,
    },
    {
      field: "actual_payment_line.principal",
      width: 150,
      headerName: "Principal (System)",
      sortable: false,
      resizable: true,
      type: "rightAligned",
      valueFormatter: CurrencyFormatter,
    },
    {
      field: "actual_payment_line.interest",
      width: 150,
      headerName: "Interest (System)",
      sortable: false,
      resizable: true,
      type: "rightAligned",
      valueFormatter: CurrencyFormatter,
    },
    {
      field: "out_mmk",
      width: 150,
      headerName: "Discount Interest (Excel)",
      sortable: false,
      resizable: true,
      type: "rightAligned",
      valueFormatter: CurrencyFormatter,
    },
    {
      field: "discount_interest_amount",
      width: 200,
      headerName: "Discount Interest Amount",
      sortable: false,
      resizable: true,
      editable: (params) =>
        params.data.description !== "REPAYMENT" && showDiscount,
      cellEditor: "agTextCellEditor",
      type: "rightAligned",
      cellClass: (params) =>
        params.data.description !== "REPAYMENT" && showDiscount
          ? "textfield-cell"
          : "", // call textfield-cell css
      valueFormatter: CurrencyFormatter,
      onCellValueChanged: handleCellValueChanged,
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
      editable: (params) =>
        params.data.description === "REPAYMENT" && showWaive,
      cellEditor: "agTextCellEditor",
      type: "rightAligned",
      cellClass: (params) =>
        params.data.description === "REPAYMENT" && showWaive
          ? "textfield-cell"
          : "", // call textfield-cell css
      valueFormatter: CurrencyFormatter,
      onCellValueChanged: handleWaivePenaltyValueChanged,
    },
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
  ];

  const getRowStyle = (params) => {
    const isDiscount = params.data?.is_discounted;
    const isApplied = params.data?.is_applied;

    return isApplied
      ? { background: "rgb(194,237,211)" }
      : isDiscount
      ? { background: "rgb(248,250,220)" }
      : {};
  };

  // row select function
  const handleSelectionChanged = useCallback(
    (rows) => {
      setSelectedETRows(rows);
    },
    [selectedETRows]
  );

  const isRowSelectable = (rowNode) => {
    if (showDiscount || showWaive) {
      return true;
    }
    if (showDiscount) {
      return rowNode.data.description !== "REPAYMENT";
    }

    if (showWaive) {
      return rowNode.data.description === "REPAYMENT";
    }
  };
  // (showWaive ?? rowNode.data.description === 'REPAYMENT') ?
  //  (showDiscount ?? rowNode.data.description !== 'REPAYMENT') : false;

  return (
    <Accordion title="Early Terminations">
      <Box sx={{ display: "flex" }}>
        <div style={{ alignContent: "center", marginRight: "10px" }}>
          No. Selected Row(s) : {selectedETRows?.length}
        </div>
        {(mode === "edit" || mode === "view") && showApply ? (
          <ApplyETButton
            selectedRows={selectedETRows}
            // monthlyInstallmentTableRef={monthlyInstallementTableRef}
            repaymentUuid={uuid}
            isMob={isMob}
          />
        ) : (
          ""
        )}
        {(mode === "edit" || mode === "view") && showViewApplied ? (
          <Button
            variant="outlined"
            //size="small"
            sx={{ marginLeft: "10px" }}
            onClick={() => {
              openNewWindow(`applied-settlement-data/et`);
            }}
          >
            View ET Applied Settlement Data
          </Button>
        ) : (
          ""
        )}
        {/* <EarlyTerminationExportButton /> */}

        {(mode === "edit" || mode === "view") && showDiscount ? (
          <DiscountButton selectedRows={selectedETRows} repaymentUuid={uuid} />
        ) : (
          ""
        )}
        {(mode === "edit" || mode === "view") && showWaive ? (
          <PenaltyAllWaiveButton
            // monthlyInstallementTableRef={monthlyInstallementTableRef}
            selectedRows={selectedETRows}
            repaymentUuid={uuid}
          />
        ) : (
          ""
        )}

        <Box sx={{ marginLeft: "auto" }}>
          <Chip
            label={"Collection Handled"}
            sx={{ background: "rgb(248,250,220)", marginRight: "3px" }}
            size={"medium"}
          />
          <Chip
            label={"Accounting Applied"}
            sx={{ background: "rgb(194,237,211)", marginRight: "3px" }}
            size={"medium"}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 1 }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={rowData ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="Early Terminations"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 400px)",
          }}
          rowMultiSelectWithClickFlag={"true"}
          getRowStyle={getRowStyle}
          suppressCopyRowsToClipboard={true}
          enableRangeSelection={true}
          copyHeadersToClipboard={true}
          loading={isLoading}
          rowSelection={"multiple"}
          onGridReady={onGridReady}
          onSelectionChanged={handleSelectionChanged}
          onFirstDataRendered={onFirstDataRendered}
          isRowSelectable={isRowSelectable}
        />
      </Box>
    </Accordion>
  );
};

export default EarlyTermination;
