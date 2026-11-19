import React, { useMemo, useCallback } from "react";
import { Box, Button, Chip } from "@mui/material";
import Accordion from "components/Accordion";
import Table from "components/Table";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import openNewWindow from "utils/windowUtils";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import ApplyRecoveryIncomeButton from "./ApplyRecoveryIncomeButton";
import RecoveryIncomeExportButton from "./RecoveryIncomeExportButton";

const RecoveryIncome = ({
  isLoading,
  repayment,
  selectedRecoveryRows,
  setSelectedRecoveryRows,
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

  let filterRow = (row) => row.is_ok && row.type === "recovery_income";

  let modifiedRowData = (row) => {
    return {
      ...row,
    };
  };

  let rowData = repayment?.settlements?.filter(filterRow).map(modifiedRowData);

  const defaultColDef = useMemo(() => ({}), []);

  // change row style adding background color
  const getRowStyle = (params) => {
    const isApplied = params.data?.is_applied;
    const isHandling = params.data?.is_collection_handling;
    // return !isApplied ? {} : {background: "rgb(194, 237, 211)"};
    return isApplied
      ? { background: "rgb(194,237,211)" }
      : isHandling
      ? { background: "rgb(248,250,220)" }
      : {};
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
        headerName: "Application ID",
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
        width: 300,
        headerName: "Description",
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
        field: "repayment_amount",
        width: 150,
        headerName: "Repayment Amount",
        sortable: false,
        resizable: true,
        type: "rightAligned",
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "transaction_reference_no",
        width: 150,
        headerName: "Reference No.",
        sortable: false,
        resizable: true,
      },
    ],
    []
  );

  // row select function
  const handleSelectionChanged = useCallback(
    (rows) => {
      setSelectedRecoveryRows(rows);
    },
    [selectedRecoveryRows]
  );

  // selected rows bind after close accordion
  const onFirstDataRendered = (params) => {
    const nodesToSelect = [];

    params.api.forEachNode((node) => {
      if (node.data) {
        selectedRecoveryRows?.map((row) => {
          if (node.data.id === row.id) {
            nodesToSelect.push(node);
          }
        });
      }
    });

    params.api.setNodesSelected({ nodes: nodesToSelect, newValue: true });
  };

  return (
    <Accordion title="Recovery Income">
      <Box sx={{ display: "flex" }}>
        <div style={{ alignContent: "center", marginRight: "10px" }}>
          No. Selected Row(s) : {selectedRecoveryRows?.length}
        </div>
        {(mode === "edit" || mode === "view") && showApply ? (
          <ApplyRecoveryIncomeButton
            selectedRecoveryRows={selectedRecoveryRows}
            repaymentUuid={uuid}
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
              openNewWindow(`applied-settlement-data`);
            }}
          >
            View Applied Settlement Data
          </Button>
        ) : (
          ""
        )}
        <RecoveryIncomeExportButton />
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
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="RecoveryIncomeList"
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

export default RecoveryIncome;
