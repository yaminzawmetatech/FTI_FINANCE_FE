import * as React from "react";
import { useEffect, useMemo, useCallback } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import { getLastPaymentHistory } from "features/lastPaymentSetup/lastPaymentSlice";
import Table from "components/Table";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import LastPaymentSetupTableRowMenu from "./LastPaymentSetupTableRowMenu";

export const LastPaymentHistoryModal = ({
  open,
  onClose,
  editValues,
}) => {
  const dispatch = useDispatch();

  const { lastPaymentHistory, next_page_param, isLoading } = useSelector(
    (state) => state.lastPaymentHistory
  );

  const types = [
    { id: "insufficient", value: "Insufficient Payment"},
    { id: "exceed_payment", value: "Exceed Payment" },
  ];

  const rowData = lastPaymentHistory || [];
  const defaultColDef = useMemo(() => ({}), []);

  useEffect(() => {
    if (open) {
      dispatch(
        getLastPaymentHistory({
          params: {
            category_id: editValues?.category_id,
            sub_category_id: editValues?.sub_category_id,
            type: editValues?.type
          },
          firstFetch: true,
        })
      );
    }
  }, [dispatch, editValues, open]);

  const handleBodyScroll = useCallback(async () => {
    if (next_page_param) {
      dispatch(
        getLastPaymentHistory({
          params: next_page_param,
          firstFetch: false,
          params: {
            category_id: editValues?.category_id,
            sub_category_id: editValues?.sub_category_id,
            type: editValues?.type
          },
        })
      );
    }
  }, [dispatch, next_page_param, editValues]);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "No.",
        width: 50,
        valueGetter: "node.rowIndex + 1",
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "category.name",
        headerName: "Category",
        width: 200,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "sub_category.name",
        headerName: "Sub Category",
        width: 200,
        sortable: true,
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
        cellRenderer: LastPaymentSetupTableRowMenu,
        cellRendererParams: {},
        lockPinned: true,
      },
      {
        field: "type",
        headerName: "Type",
        width: 200,
        resizable: true,
        valueFormatter: (params) => {
          const typeObj = types.find((t) => t.id === params.value);
          return typeObj ? typeObj.value : params.value;
        },
      },
      
      {
        field: "threshold_amount",
        headerName: "Threshold Amount",
        width: 150,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "retain_period",
        headerName: "Retain Period",
        width: 150,
        resizable: true,
      },
      {
        field: "start_date",
        headerName: "Version Start Date",
        width: 200,
        sortable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        resizable: true,
      },
      {
        field: "end_date",
        headerName: "Version End Date",
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


  const handleModalClose = () => {
    onClose();
  };

  return (
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
        Last Payment Version History List
      </DialogTitle>
      <DialogContent dividers>
        <>
          <Table
            rowData={rowData ?? []}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            name="LastPaymentHistoryList"
            rowKey="id"
            agThemeStyle={{
              height: "calc(100vh - 300px)",
            }}
            loading={isLoading}
            onScrollBottomEnd={handleBodyScroll}
          />
        </>
      </DialogContent>
      <DialogActions sx={{ marginBottom: "10px", marginTop: "10px" }}>
        <Button
          variant="outlined"
          sx={{
            color: "red",
            borderColor: "red",
            "&:hover": {
              backgroundColor: "rgba(255, 0, 0, 0.04)",
              borderColor: "red",
            },
          }}
          onClick={handleModalClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LastPaymentHistoryModal;
