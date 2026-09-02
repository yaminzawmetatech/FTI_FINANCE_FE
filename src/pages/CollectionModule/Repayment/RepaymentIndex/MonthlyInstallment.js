import React, { useMemo, useCallback, useState, useEffect } from "react";
import { Box, Button, Chip, Grid } from "@mui/material";
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
} from "features/repayment/repaymentSlice";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import MonthlyInstallmentExportButton from "./MonthlyInstallmentExportButton";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import dayjs from "dayjs";
import RepaymentMITableRowMenu from "./RepaymentMITableRowMenu";
import { REPAYMENT_MI_SEARCH_OPTIONS } from "constants/searchOptions/repaymentMISearchOptions";
import AdvancedSearch from "components/form/AdvancedSearch";

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
  const [searchDataState, setSearchDataState] = useState([]);

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

  // let rowData = repayment?.settlements?.filter(filterRow).map(modifiedRowData);
  const [rowData, setRowData] = useState(
    repayment?.settlements?.filter(filterRow).map(modifiedRowData) ?? []
  );


  const defaultColDef = useMemo(() => ({}), []);

  // change row style adding background color
  const getRowStyle = (params) => {
    const isApplied = params.data?.is_applied;
    const isHandling = params.data?.is_waived === 1;
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
      handleSearch(); //search by filter after api call
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Line No",
        valueGetter: (params) => params.data?.__line_no,
        width: 80,
        sortable: false,
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
        field: "mmf_id",
        width: 150,
        headerName: "Application ID",
        sortable: false,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        headerName: "",
        field: "menu",
        width: 50,
        lockPosition: "left",
        pinned: "left",
        cellRenderer: RepaymentMITableRowMenu,
        cellRendererParams: {},
        lockPinned: true,
        hide: !showWaive || repayment?.category_id === 1
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
    [repayment]
  );

  const waveMoneyColumnDefs = useMemo(
    () => [
      {
        headerName: "Line No",
        valueGetter: (params) => params.data?.__line_no,
        width: 80,
        sortable: false,
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
        field: "mmf_id",
        width: 150,
        headerName: "Application ID",
        sortable: false,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        headerName: "",
        field: "menu",
        width: 50,
        lockPosition: "left",
        pinned: "left",
        cellRenderer: RepaymentMITableRowMenu,
        cellRendererParams: {},
        lockPinned: true,
        hide: !showWaive
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

  const handleSearch = useCallback(
    (searchData = searchDataState) => {
      const transformedSearchData = {};
  
      searchData.forEach((item) => {
        transformedSearchData[item.filtered_by] = item.value1;
      });
    
      const filtered = repayment?.settlements
        ?.filter((row) => {
          const hasGenerated = !!transformedSearchData?.generated_application_id;
          const hasPartner = !!transformedSearchData?.partner_ids;
          const hasWaived = !!transformedSearchData?.is_waived;
          const hasPenalty = !!transformedSearchData?.is_penalty;
  
          const generatedMatch = hasGenerated
            ? transformedSearchData.generated_application_id
                .split(",")
                .map((id) => id.trim())
                .includes(String(row?.contract?.generated_application_id))
            : true;
  
          const partnerMatch = hasPartner
            ? transformedSearchData.partner_ids
                .split(",")
                .map((id) => id.trim())
                .includes(
                  String(
                    row?.contract?.mnet_application_id ||
                      row?.contract?.customer_loan_id ||
                      row?.contract?.kpay_id
                  )
                )
            : true;
  
          const waivedMatch = hasWaived
            ? String(row?.is_waived) === String(transformedSearchData?.is_waived)
            : true;
  
          const penaltyMatch = hasPenalty
            ? String(transformedSearchData?.is_penalty) === "1"
              ? row?.actual_payment_line?.total_penalty_fee != null
              : row?.actual_payment_line?.total_penalty_fee == null
            : true;
  
          return generatedMatch && partnerMatch && waivedMatch && penaltyMatch;
        })
  
        const final = (filtered ?? []).map((row, idx) => ({
          ...row,
          __line_no: idx + 1,   // assign continuous numbers
        }));
        
        //repayment?.settlements?.filter(filterRow).map(modifiedRowData)
        setRowData(final.filter(filterRow));
      //setRowData(filtered ?? []);
      setSearchDataState(searchData);
    },
    [repayment?.settlements, searchDataState]
  );

  
  useEffect(() => {
    if (repayment?.settlements) {
      handleSearch(); // run search whenever settlements update
    }
  }, [repayment?.settlements, handleSearch]);

  return (
    <Accordion title="Monthly Installment">
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
              // pr: 2,
            }}
          >
            <div>No. Selected Row(s): {selectedRows.length}</div>

            {(mode === "edit" || mode === "view") && showApply && (
              <ApplyMonthlyInstallmentButton
                selectedRows={selectedRows}
                repaymentUuid={uuid}
              />
            )}

            {(mode === "edit" || mode === "view") && showViewApplied && (
              <Button
                variant="outlined"
                onClick={() => openNewWindow(`applied-settlement-data`)}
              >
                View Applied Settlement Data
              </Button>
            )}

            {(mode === "edit" || mode === "view") && showWaive && (
              <PenaltyAllWaiveButton
                selectedRows={selectedRows}
                repaymentUuid={uuid}
                categoryId={repayment?.category_id}
                handleSearch={() => handleSearch(searchDataState)}               
              />
            )}

            <MonthlyInstallmentExportButton />
          </Grid>

          <Grid item xs={12} md={6}>
            <AdvancedSearch
              options={REPAYMENT_MI_SEARCH_OPTIONS}
              onSearch={handleSearch}
              mode="divide_mode"
            />
          </Grid>
        </Grid>
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
          name="MonthlyInstallmentList"
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
