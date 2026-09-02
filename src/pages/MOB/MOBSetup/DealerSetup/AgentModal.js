import React, { useMemo, useEffect } from "react";
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
import { getAgentsByDealerId } from "features/users/usersSlice";

const AgentModal = ({ open, onClose, selectedId }) => {
  const dispatch = useDispatch();

  const { agents, isLoading } = useSelector(
    (state) => state.agents
  );

  useEffect(() => {
    if (open) {
      dispatch(
        getAgentsByDealerId(selectedId)
      );
    }
  }, [open, dispatch, selectedId]);

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => {},
    }),
    []
  );

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
        field: "user.user_name",
        headerName: "Name",
        width: 200,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "user.office_email",
        headerName: "Email",
        width: 130,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "user.nrc_or_csc	",
        headerName: "Nrc",
        width: 120,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
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
    [selectedId]
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
            <div>Agents</div>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <Table
            //searchParams={params}
            rowData={agents ?? []}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            name="AgentModal"
            rowKey="id"
            agThemeStyle={{
              height: "calc(100vh - 300px)",
            }}
            loading={isLoading}
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
    </>
  );
};

export default React.memo(AgentModal);
