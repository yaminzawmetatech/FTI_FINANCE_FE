import React, { useEffect, useMemo, useCallback } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Table from "components/Table";
import dayjs from "dayjs";
import { getReminderAllocationHistoryByContractId, reset } from "modules/collection/slices/reminderAllocationHistorySlice";
import { Box, Chip, Tooltip } from "@mui/material";
import ExcelExportButton from "./ReminderHistoryExcelExportButton";

const ReminderAllocationHistoryModal = ({ selectedContractId, selectedApplicantName, selectedPartnerId, open, handleClose }) => {
  const dispatch = useDispatch();

  const { reminderAllocationsByContractId, next_page_param, isLoading } = useSelector(
    (state) => state.reminderAllocationsByContractId
  );
  
  const rowData = reminderAllocationsByContractId || [];
  const defaultColDef = useMemo(() => ({}), []);

  useEffect(() => {
    if (selectedContractId && open) {
      dispatch(getReminderAllocationHistoryByContractId({
        params: {
          contract_id: selectedContractId,
          is_history: 1
        },
        firstFetch: true
      }));
    }
  }, [dispatch, selectedContractId, open]);

  const ChipRenderer = (props) => {
    if (props?.data?.collection_responses?.length === 0) {
      return null;
    }
  
    const data_arr = props.data.collection_responses;
  
    return (
      <Box display="flex" flexDirection="column" gap={1} sx={{ marginBottom: "5px", marginTop: "3px" }}>
        {data_arr?.map((value, index) => {
          if (props.colDef.field === "concatenated_remarks") {
            return (
              <Tooltip key={index} title={value?.remark}>
                <Chip
                  label={value?.remark?.length > 30 ? value?.remark?.slice(0, 30) + "..." : value?.remark}
                />
              </Tooltip>
            );
          }
          if (props.colDef.field === "concatenated_contact_dates") {
            return <Chip key={index} label={value?.contact_date} />;
          }
          if (props.colDef.field === "concatenated_promise_dates") {
            return <Chip key={index} label={value?.promised_date} />;
          }
          if (props.colDef.field === "concatenated_follow_up_results") {
            return <Chip key={index} label={value?.follow_up_result.name} />;
          }
          return null;
        })}
      </Box>
    );
  };

  const handleBodyScroll = useCallback(
    async () => {
      if (next_page_param) {
        dispatch(
          getReminderAllocationHistoryByContractId({
            params: next_page_param,
            firstFetch: false,
            params: {
              contract_id: selectedContractId,
              is_history: 1
            }
          })
        );
      }
    },
    [dispatch, next_page_param, selectedContractId]
  );

  
  const columnDefs = useMemo(
    () => [
      {
        field: "row",
        headerName: "No",
        valueGetter: "node.rowIndex + 1",
        width: 50,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
      field: "pic.user_name",
        headerName: "Allocated PIC",
        width: 100,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "allocate_activity.name",
        headerName: "Allocated Activity",
        width: 120,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "assigned_date",
        headerName: "Assigned Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 110,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "latest_contact_date",
        headerName: "Contact Date",
        width: 200,
        sortable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        resizable: true,
      },
      {
        field: "latest_promised_date",
        headerName: "Promise Date",
        width: 200,
        sortable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        resizable: true,
      },
      {
        field: "latest_follow_up_result",
        headerName: "Follow Up Result",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "latest_remark",
        headerName: "Remark",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "concatenated_contact_dates",
        headerName: "Contact Date(Concatenate)",
        width: 200,
        sortable: true,
        resizable: true,
        autoHeight: true,
        cellRenderer: ChipRenderer,
      },
      {
        field: "concatenated_promise_dates",
        headerName: "Promise Date(Concatenate)",
        width: 200,
        sortable: true,
        resizable: true,
        autoHeight: true,
        cellRenderer: ChipRenderer,
      },
      {
        field: "concatenated_follow_up_results",
        headerName: "Follow Up Result(Concatenate)",
        width: 200,
        sortable: true,
        resizable: true,
        autoHeight: true,
        cellRenderer: ChipRenderer,
      },
      {
        field: "concatenated_remarks",
        headerName: "Remarks(Concatenate)",
        width: 200,
        sortable: true,
        resizable: true,
        autoHeight: true,
        cellRenderer: ChipRenderer,
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
    dispatch(reset());
    handleClose();
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
        Reminder Allocation History - {selectedPartnerId} - {selectedApplicantName}
      </DialogTitle>
      <DialogContent dividers>
        <>
          <ExcelExportButton 
            selectedContractId={selectedContractId} 
            selectedPartnerId={selectedPartnerId}
          />
          <Table
            rowData={rowData ?? []}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            name="ReminderAllocationHistoryList"
            rowKey="id"
            agThemeStyle={{
              height: "calc(100vh - 300px)",
            }}
            loading={isLoading}
            ChipRenderer={ChipRenderer}
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

export default React.memo(ReminderAllocationHistoryModal);
