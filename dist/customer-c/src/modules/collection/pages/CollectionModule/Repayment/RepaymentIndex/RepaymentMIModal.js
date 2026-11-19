import React, { useEffect, useState, useMemo } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import { YesNoRenderer } from "common/YesNoRenderer";
import ConfirmationModal from "common/ConfirmationModal";
import Table from "components/Table";
import { useSearchParams } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import { useDispatch, useSelector } from "react-redux";
import { getActualPaymentLinesByContractId } from "modules/loan-operation/slices/contractDetailSlice";
import CommonMessage from "common/CommonMessage";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import { updateAPLByUuid } from "modules/loan-operation/slices/contractSlice";
import dayjs from "dayjs";
import WaiveConfirmationModal from "common/WaiveConfirmationModal";
import { getRepaymentByUuid, waivePenaltyAPLModal } from "modules/collection/slices/repaymentSlice";

const RepaymentMIModal = ({ open, handleClose, contractId, settlementId, repaymentUuid, generatedApplicationId }) => {
  const [params, setParams] = useSearchParams();
  const dispatch = useDispatch();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // for confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for confirm message body
  const [pendingUpdate, setPendingUpdate] = useState(null);
  const [deleteConfirmMessage, setDeleteConfirmMessage] = useState(""); // for confirm message body
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [deleteData, setDeleteData] = useState([]); // want to delete data

  const [waivedData, setWaivedData] = useState([]); // want to delete data

  const [waiveType, setWaiveType] = useState(null); // "all" or "remaining"

  const [rowData, setRowData] = useState([]);

  const { actualPaymentLinesByContractId, isLoading } = useSelector(
    (state) => state.actualPaymentLinesByContractId
  );

  useEffect(() => {
    if (actualPaymentLinesByContractId) {
      const today = new Date();

      const modified = actualPaymentLinesByContractId
        .filter((row) => {
          const rowDate = new Date(row.due_date);

          return (
            row.status === "unpaid" &&
            // rowDate <= today &&
            row.tenor !== 0 &&
            Number(row.penalty_fee) > 0
          );
        })
        .map((row) => ({
          ...row,
          application_id: generatedApplicationId,
        }));

      setRowData(modified);
    }
  }, [actualPaymentLinesByContractId, generatedApplicationId]);

  useEffect(() => {
    if (open && contractId) {
      dispatch(
        getActualPaymentLinesByContractId({
          id: contractId,
        })
      );
    }
  }, [contractId, open]);

  const auth = useSelector((state) => state.auth.user);

  const defaultColDef = useMemo(() => ({}), []);
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
      dispatch(getActualPaymentLinesByContractId({ id: contractId }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleWaivePenalty = async() => {
    try {
      await dispatch(
        waivePenaltyAPLModal({
          settlement_id: settlementId,
        })
      ).unwrap();

      showSuccessToast(CommonMessage.MFS00006);
      dispatch(getRepaymentByUuid({ uuid: repaymentUuid }));
    } catch ( error ) {
      console.error("Error:", error);
    }
  }

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
        lockPosition: "left",
        pinned: "left",
      },
      // {
      //   field: "application_id",
      //   width: 100,
      //   headerName: "Applicant ID",
      //   sortable: false,
      //   resizable: true,
      //   lockPosition: "left",
      //   pinned: "left",
      // },
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
        field: "tenor",
        headerName: "Tenor",
        width: 70,
        sortable: false,
        resizable: true,
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
        width: 140,
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
        field: "days",
        width: 100,
        headerName: "Days",
        sortable: false,
        resizable: true,
      },
    ],
    []
  );

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            maxWidth: "1200px",
            borderRadius: "16px",
          },
        }}
      >
        <DialogTitle
          id="scroll-dialog-title"
          variant="h5"
          sx={{ color: "#1890ff" }}
        >
          Actual Payment Lines - {generatedApplicationId}
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mt: 1 }}>
            <Table
              searchParams={params}
              setSearchParams={setParams}
              rowData={rowData ?? []}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              name="RepaymentAPLModal"
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
        </DialogContent>

        <DialogActions sx={{ marginBottom: "10px", marginTop: "10px" }}>
          <Button variant="outlined" color="warning" onClick={handleWaivePenalty}>
            Waive Penalty
          </Button>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
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

export default React.memo(RepaymentMIModal);
