import React, { useMemo, useState, useEffect } from "react";
import { Box, Button, IconButton } from "@mui/material";
import Accordion from "components/Accordion";
import Table from "components/Table";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import ActualPaymentSubPageExportButton from "./ActualPaymentSubPageExportButton";
import ActualPaymentLinesRowMenu from "./ActualPaymentLinesRowMenu";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "common/ConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { updateAPLByUuid } from "modules/loan-operation/slices/contractSlice";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import { getContractByUuid } from "modules/loan-operation/slices/contractDetailSlice";
import Tooltip from "@mui/material/Tooltip";
import { YesNoRenderer } from "common/YesNoRenderer";
import WaiveConfirmationModal from "common/WaiveConfirmationModal";
import BlockIcon from '@mui/icons-material/Block';

const ActualPaymentLines = ({ isLoading, contract }) => {
  const [params, setParams] = useSearchParams();
  const dispatch = useDispatch();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // for confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for confirm message body
  const [pendingUpdate, setPendingUpdate] = useState(null);
  const [deleteConfirmMessage, setDeleteConfirmMessage] = useState(""); // for confirm message body
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [deleteData, setDeleteData] = useState([]); // want to delete data

  const [waivedConfirmMessage, setWaivedConfirmMessage] = useState(""); // for confirm message body
  const [waivedData, setWaivedData] = useState([]); // want to delete data

  const [waiveType, setWaiveType] = useState(null); // "all" or "remaining"

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (contract?.actual_payment_lines) {
      const modified = contract.actual_payment_lines.map((row) => ({
        ...row,
        application_id: contract?.application?.application_id,
        category_name: contract?.category?.name,
        sub_category_name: contract?.sub_category?.name,
      }));
      setRowData(modified);
    }
  }, [contract]);

  const auth = useSelector((state) => state.auth.user);

  const defaultColDef = useMemo(() => ({}), []);

  const DisabledCheckboxRenderer = ({ value }) => (
    <input
      type="checkbox"
      style={{ width: "20px", height: "15px" }}
      disabled
      checked={value === "paid"}
    />
  );

  const DisabledCheckboxRendererEOM = ( { value }) => (
    <input
      type="checkbox"
      style={{ width: "20px", height: "15px" }}
      disabled
      checked={value !== null }
    />
  );

  const applicationId = contract?.application?.application_id;

  const modifiedRowData = contract?.actual_payment_lines?.map((row) => ({
    ...row,
    application_id: applicationId,
    category_name: contract?.category?.name,
    sub_category_name: contract?.sub_category?.name,
  }));

  const handleCellValueChanged = async (event) => {
    const { newValue, data } = event;
    if (
      data?.received_penalty > data?.penalty_fee ||
      data?.received_penalty < 0
    ) {
      showErrorToast(
        "Received Penalty must be greater than or equal to 0 and cannot exceed the Penalty Fee for this tenor."
      );
    } else {
      setPendingUpdate({ ...data, newValue });
      setConfirmMessage(CommonMessage.MFC00003);
      setIsConfirmModalOpen(true);
    }
  };

  const handleSubmit = async (row, type) => {
    try {
      let payload = {};
      let updatedRowData = [];

      if (type === "penalty") {
        payload = { received_penalty: row.newValue };

        updatedRowData = rowData.map((r) =>
          r.uuid === row.uuid ? { ...r, received_penalty: row.newValue } : r
        );
        setRowData(updatedRowData);
      } else if (type === "all") {
        payload = { is_all_waived: 1 };

        updatedRowData = rowData.map((r) =>
          r.uuid === row.uuid ? { ...r, is_all_waived: 1 } : r
        );
        setRowData(updatedRowData);
      } else if (type === "remaining") {
        payload = { status: "paid" };

        updatedRowData = rowData.map((r) =>
          r.uuid === row.uuid ? { ...r, status: "paid" } : r
        );
        setRowData(updatedRowData);
      }

      await dispatch(
        updateAPLByUuid({
          uuid: row.uuid,
          data: payload,
        })
      ).unwrap();

      showSuccessToast(CommonMessage.MFS00008);

      // silent background refresh
      dispatch(getContractByUuid({ uuid: contract.uuid }));
    } catch (error) {
      console.error("Error:", error);
      showErrorToast("Failed to update");
    }
  };

  const buttonRenderer = (params) => {
    const { data, disabled } = params;

    return (
      <Button
        className="confirm-cancel-btn"
        variant="contained" // gives stronger button look
        color="error"
        onClick={() => handleButtonClick(data)}
        disabled={disabled}
        size="small"
        sx={{ fontSize: "0.75rem", px: 1.5, py: 0.5, borderRadius: "8px" }}
      >
        All Waived
      </Button>
    );
  };

  const handleButtonClick = (row) => {
    setIsDeleteModalOpen(true);
    setDeleteConfirmMessage(CommonMessage.MFC00016);
    setWaivedData(row);
    setWaiveType("all");
  };

  const handleRemainingWaivedClick = (row) => {
    setIsDeleteModalOpen(true);
    setDeleteConfirmMessage(CommonMessage.MFC00016);
    setDeleteData(row);
    setWaiveType("remaining");
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteData([]);
    setWaivedData([]);
  };

  const remainingWaivedButtonRenderer = (params) => {
    const { data, disabled } = params;

    return (
      <Button
        className="confirm-cancel-btn"
        variant="contained"
        color="warning"
        onClick={() => handleRemainingWaivedClick(data)}
        disabled={disabled}
        size="small"
        sx={{ fontSize: "0.75rem", px: 1.5, py: 0.5, borderRadius: "8px" }}
      >
        Remaining Waived
      </Button>
    );
  };

  const handleDeleteConfirmed = async () => {
    setIsDeleteModalOpen(false);
    try {
      if (waiveType === "all") {
        await handleSubmit(waivedData, "all");
      } else if (waiveType === "remaining") {
        await handleSubmit(deleteData, "remaining");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setWaiveType(null);
      setWaivedData([]);
      setDeleteData([]);
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
        field: "end_of_month",
        width: 80,
        headerName: "EOM",
        suppressMenu: true,
        sortable: false,
        resizable: false,
        cellRenderer: DisabledCheckboxRendererEOM,
      },
      {
        field: "application_id",
        width: 100,
        headerName: "Applicant ID",
        sortable: false,
        resizable: true,
        lockPosition: "left",
        pinned: "left",
      },
      {
        field: "status",
        width: 80,
        headerName: "Paid",
        suppressMenu: true,
        sortable: false,
        resizable: false,
        lockPosition: "left",
        pinned: "left",
        lockPinned: true,
        cellRenderer: DisabledCheckboxRenderer,
      },
      {
        field: "status",
        width: 100,
        headerName: "Status",
        sortable: false,
        resizable: true,
        lockPosition: "left",
        pinned: "left",
        valueFormatter: (params) =>
          params.value && params.value.toString().toUpperCase(),
      },
      {
        headerName: "",
        field: "menu",
        width: 50,
        lockPosition: "left",
        pinned: "left",
        cellRenderer: ActualPaymentLinesRowMenu,
        cellRendererParams: {},
        lockPinned: true,
      },
      {
        field: "tenor",
        headerName: "Tenor",
        width: 70,
        sortable: false,
        resizable: true,
      },
      {
        field: "monthly_installment",
        headerName: "Monthly Installment",
        width: 100,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "due_date",
        headerName: "Due Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 120,
        sortable: true,
        resizable: true,
      },
      {
        field: "principal",
        headerName: "Principal",
        width: 100,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "interest",
        headerName: "Interest",
        width: 100,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "prorata_interest",
        headerName: "Prorata Interest",
        width: 100,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },

      {
        field: "prorata_for_disbursed_date_to_eom",
        headerName: "Prorata Interest (Disbursed to EOM)",
        width: 100,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "prorata_for_bom_to_due",
        headerName: "Prorata Interest (BOM to Tenor-0 DUE)",
        width: 100,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "prorata_for_same_month",
        headerName: "Prorata Interest (For Same Month)",
        width: 100,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "daily_interest",
        width: 100,
        headerName: "Daily Interest",
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "accrued_interest",
        width: 100,
        headerName: "Accrued Interest",
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },

      {
        field: "interest_income",
        width: 100,
        headerName: "Interest Income",
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "total_interest",
        width: 100,
        headerName: "Total Interest",
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "outstanding_principal",
        headerName: "Outstanding Principal",
        width: 150,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "accrued_interest_for_prorata_interest_for_amortization",
        headerName: "Accrued Interest with Prorata Interest",
        width: 100,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "accrued_interest_from_due_to_eom_for_amortization",
        headerName: "Accrued Interest Due to End",
        width: 100,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "accrued_interest_from_som_to_due_for_amortization",
        headerName: "Accrued Interest Start to Due",
        width: 100,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "amortization_origination_income",
        headerName: "Amortization Origination Income",
        width: 100,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "amortization_origination_income_for_before_tenor_zero_month",
        headerName: "Amortization Origination Income For Before Tenor Zero Due",
        width: 100,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "total_interest_for_origination_fee",
        headerName: "Total Interest For Origination (Amortization)",
        width: 100,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "outstanding_ttl_amount",
        headerName: "Outstanding TTL",
        width: 150,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "total_received_amount",
        headerName: "Total Received Amount",
        width: 150,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "total_penalty_fee",
        width: 120,
        headerName: "Total Penalty",
        sortable: false,
        resizable: false,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "penalty_fee",
        width: 120,
        headerName: "Cumulative Penalty",
        sortable: false,
        resizable: false,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "overdue_day",
        width: 120,
        headerName: "Total Overdue Days",
        sortable: false,
        resizable: true,
      },
      {
        field: "overdue_day_by_tenor",
        width: 120,
        headerName: "Cumulative Penalty Days",
        sortable: false,
        resizable: true,
      },
      {
        field: "received_penalty",
        headerName: "Received Penalty",
        width: 150,
        sortable: false,
        resizable: true,
        //editable: true,
        editable: (params) => {
          return (
            Number(params.data?.penalty_fee) > 0 &&
            params.data?.status === "unpaid" &&
            params.data?.is_all_waived === 0 &&
            !Number(params.data?.received_penalty) &&
            [
              "Collection-Officer",
              "Collection-Manager",
              "administrator",
            ].includes(auth?.user_group)
          );
        },
        cellEditor: "agTextCellEditor",
        type: "rightAligned",
        cellClass: "textfield-cell", // call textfield-cell css
        valueFormatter: CurrencyFormatter,
        onCellValueChanged: handleCellValueChanged,
      },
      {
        field: "all_waived",
        headerName: "All Waived",
        width: 110,
        sortable: false,
        resizable: true,
        cellRenderer: buttonRenderer,
        cellRendererParams: (params) => ({
          disabled: !(
            Number(params.data?.penalty_fee) > 0 &&
            params.data?.is_all_waived === 0 &&
            params.data?.status === "unpaid" &&
            [
              "Collection-Officer",
              "Collection-Manager",
              "administrator",
            ].includes(auth?.user_group)
          ),
        }),
      },
      {
        field: "remaining_waived",
        headerName: "Remaining Waived",
        width: 150,
        sortable: false,
        resizable: true,
        cellRenderer: remainingWaivedButtonRenderer,
        cellRendererParams: (params) => ({
          disabled: !(
            Number(params.data?.penalty_fee) > 0 &&
            params.data?.status === "unpaid" &&
            params.data?.is_all_waived === 0 &&
            [
              "Collection-Officer",
              "Collection-Manager",
              "administrator",
            ].includes(auth?.user_group)
          ),
        }),
      },
      {
        field: "is_all_waived",
        headerName: "Is All Waived?",
        width: 130,
        sortable: true,
        resizable: true,
        cellRenderer: YesNoRenderer,
      },
      {
        field: "days",
        width: 100,
        headerName: "Days",
        sortable: false,
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
      {
        field: "category_name",
        width: 100,
        headerName: "Category Code",
        sortable: false,
        resizable: true,
      },
      {
        field: "sub_category_name",
        width: 100,
        headerName: "Sub Category Code",
        sortable: false,
        resizable: true,
      },
    ],
    []
  );

  return (
    <>
      <Accordion title="Actual Payment Sub. Page">
        <ActualPaymentSubPageExportButton contract={contract} />
        <Box sx={{ mt: 1 }}>
          <Table
            searchParams={params}
            setSearchParams={setParams}
            rowData={rowData ?? []}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            name="ActualPaymentLinesTable"
            rowKey="id"
            agThemeStyle={{
              height: "calc(100vh - 400px)",
            }}
            suppressCopyRowsToClipboard={true}
            enableRangeSelection={true}
            copyHeadersToClipboard={true}
            loading={isLoading}
            rowHeight={32}   
          />
        </Box>
      </Accordion>
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() => {
          setIsConfirmModalOpen(false);
          handleSubmit(pendingUpdate, "penalty");
        }}
        message={confirmMessage}
      />
      <WaiveConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onDelete={handleDeleteConfirmed}
        message={deleteConfirmMessage}
      />
    </>
  );
};

export default ActualPaymentLines;
