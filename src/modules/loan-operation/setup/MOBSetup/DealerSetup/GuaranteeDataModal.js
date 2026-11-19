import React, { useMemo, useEffect, useState, useCallback } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Table from "components/Table";
import dayjs from "dayjs";
import {
  deleteGuaranteeData,
  getGuaranteeData,
  updateGuaranteeData,
} from "modules/loan-operation/slices/dealerGuaranteeSlice";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import {
  deleteDealer,
  getDealers,
  updateDealer,
} from "modules/loan-operation/slices/dealerSlice";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CommonMessage from "common/CommonMessage";
import { showSuccessToast } from "common/ToastMessage";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import { Switch } from "@mui/material";
import GuaranteeDataModalAppBar from "./GuaranteeDataModalAppBar";

const GuaranteeDataModal = ({ open, onClose, selectedId }) => {
  const dispatch = useDispatch();
  const [deleteData, setDeleteData] = useState([]); // want to delete data
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body

  const [selectedRows, setSelectedRows] = useState([]);

  const { guaranteeData, isLoading } = useSelector(
    (state) => state.guaranteeData
  );

  useEffect(() => {
    if (open) {
      dispatch(
        getGuaranteeData({
          params: {
            dealer_id: selectedId,
          },
          firstFetch: true,
        })
      );
    }
  }, [open, dispatch, selectedId]);
  
  const defaultColDef = useMemo(() => ({}), []);

  let modifiedRowData = (row) => {
    return {
      ...row,
    };
  };

  let rowDataTemp = guaranteeData?.map(modifiedRowData);

  const buttonRenderer = (params) => {
    const rowData = params.data;
    return (
      <Tooltip title="Remove" placement="top-start">
        <DeleteOutlinedIcon
          onClick={() => handleButtonClick(rowData)}
          style={{ cursor: "pointer", color: "gray" }}
        />
      </Tooltip>
    );
  };

  const handleButtonClick = (row) => {
    setIsDeleteModalOpen(true);
    setConfirmMessage(CommonMessage.MFC00001);
    setDeleteData(row);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteData([]);
  };

  const handleDeleteConfirmed = async () => {
    setIsDeleteModalOpen(false);
    try {
      await dispatch(deleteGuaranteeData({id:deleteData.uuid})).unwrap();
      showSuccessToast(
        CommonMessage.MFS00002.replace("%s", "Dealer Guarantee Data")
      );
      await dispatch(
        getGuaranteeData({
          params: {
            dealer_id: selectedId,
          },
          firstFetch: true,
        })
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAmtCellValueChanged = useCallback(
    async (event) => {
      const value = event.newValue;
      const selectedUuid = event.data.uuid;
      try {
        await dispatch(
          updateGuaranteeData({
            id: selectedUuid,
            newData: { guarantee_amount: value },
          })
        ).unwrap();

        showSuccessToast(CommonMessage.MFS00008);
        await dispatch(
          getGuaranteeData({
            params: {
              dealer_id: selectedId,
            },
            firstFetch: true,
          })
        );
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [dispatch, selectedId]
  );

  const handleNoCellValueChanged = useCallback(
    async (event) => {
      const value = event.newValue;
      const selectedUuid = event.data.uuid;

      try {
        await dispatch(
          updateGuaranteeData({
            id: selectedUuid,
            newData: { no_of_vehicles: value },
          })
        ).unwrap();

        showSuccessToast(CommonMessage.MFS00008);
        await dispatch(
          getGuaranteeData({
            params: {
              dealer_id: selectedId,
            },
            firstFetch: true,
          })
        );
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [dispatch, selectedId]
  );

  const handleToggleSwitch = async (rowData) => {
    try {
      await dispatch(
        updateGuaranteeData({
          id: rowData.uuid,
          newData: { in_active: !rowData.in_active },
        })
      ).unwrap();

      showSuccessToast(CommonMessage.MFS00008);

      await dispatch(
        getGuaranteeData({
          params: {
            dealer_id: selectedId,
          },
          firstFetch: true,
        })
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const columnDefs = useMemo(
    () => [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        width: 50,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        headerName: "No.",
        width: 50,
        valueGetter: "node.rowIndex + 1",
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "guarantee_amount",
        headerName: "Guarantee Amount",
        width: 200,
        resizable: true,
        cellRenderer: CurrencyFormatter,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        //editable: true,
        editable: (params) => params.data.no_of_vehicles === null,
        cellEditor: "agTextCellEditor",
        cellClass: "textfield-cell", // call textfield-cell css
        // valueFormatter: CurrencyFormatter,
        onCellValueChanged: handleAmtCellValueChanged,
      },
      {
        field: "no_of_vehicles",
        headerName: "No of Vehicles",
        width: 200,
        resizable: true,
        sortable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        //editable: true,
        editable: (params) => params.data.guarantee_amount === null,
        cellEditor: "agTextCellEditor",
        cellClass: "textfield-cell", // call textfield-cell css
        // valueFormatter: CurrencyFormatter,
        onCellValueChanged: handleNoCellValueChanged,
      },
      {
        headerName: "Actions",
        field: "actions",
        width: 80,
        sortable: false,
        //resizable: true,
        cellRenderer: buttonRenderer,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        headerName: "Is Active",
        field: "in_active",
        width: 80,
        sortable: false,
        cellRenderer: (params) => {
          const rowData = params.data;
          return (
            <Switch
              checked={rowData.in_active === 1}
              onChange={() => handleToggleSwitch(rowData)}
              color="primary"
            />
          );
        },
      },

      {
        field: "start_date",
        headerName: "Start Date",
        width: 200,
        sortable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        resizable: true,
      },
      {
        field: "end_date",
        headerName: "End Date",
        width: 200,
        sortable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
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
    ],
    []
  );

  const handleSelectionChanged = useCallback(
    (rows) => {
      setSelectedRows(rows);
    },
    [selectedRows]
  );


  return (
    <>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "100%" } }}
        maxWidth="md"
        open={open}
      >
        <DialogTitle
          id="scroll-dialog-title"
          variant="h5"
          sx={{ color: "#1890ff" }}
        >
          <div style={{ display: "flex" }}>
            <div>Guarantee Data History</div>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <GuaranteeDataModalAppBar selectedRows={selectedRows} selectedIdState={selectedId} ids={rowDataTemp?.map((item) => item.id)} />
          <Table
            //searchParams={params}
            rowData={rowDataTemp ?? []}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            name="GuaranteeDataHistoryModalTable"
            rowKey="id"
            agThemeStyle={{
              height: "calc(100vh - 300px)",
            }}
            loading={isLoading}
            buttonRenderer={buttonRenderer}
            onSelectionChanged={handleSelectionChanged}
            rowSelection={"multiple"}
            rowMultiSelectWithClickFlag={"true"}
          />
        </DialogContent>
        <DialogActions sx={{ marginBottom: "10px", marginTop: "10px" }}>
          <Button
            variant="contained"
            onClick={() => {
              onClose();
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onDelete={handleDeleteConfirmed}
        message={confirmMessage}
      />
    </>
  );
};

export default React.memo(GuaranteeDataModal);
