import React, { useMemo , useEffect, useCallback} from "react";
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
import { useParams } from "react-router";
import DemandLetterHistoryTableRowMenu from "./DemandLetterHistoryTableRowMenu";
import { getAllDemandLetters } from "features/demandLetter/demandLetterSlice";

const ToolbarDemandLetterHistoryModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { uuid, } = useParams();

  const { demandLetters, isLoading, next_page_param } = useSelector((state) => state.demandLetters);

  const { contract } = useSelector(
    (state) => state.contractDetail
  );

  useEffect(() => {
    dispatch(getAllDemandLetters({ contract_id: contract?.id, firstFetch: true }));
}, [ dispatch, uuid, open, contract ]);

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => {},
    }),
    []
  );

  const handleBodyScroll = useCallback(
    async () => {
      if (next_page_param) {
        dispatch(
          getAllDemandLetters({
            params: next_page_param,
            contract_id: contract?.id,
            firstFetch: false,
          })
        );
      }
    },
    [dispatch, next_page_param, contract]
  );

  const columnDefs = useMemo(
    () => [
      {
        field: "letter_no",
        headerName: "Letter No",
        width: 200,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "demand_letter_type",
        headerName: "Demand Letter Type",
        width: 200,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "date",
        headerName: "Date",
        width: 200,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
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
        cellRenderer: DemandLetterHistoryTableRowMenu,
        cellRendererParams: {},
        lockPinned: true,
      },
      {
        field: "description",
        headerName: "Description",
        width: 200,
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
        Demand Letter History List
      </DialogTitle>
      <DialogContent dividers>
          <Table
            //searchParams={params}
            rowData={demandLetters ?? []}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            name="demandLetters"
            rowKey="id"
            agThemeStyle={{
              height: "calc(100vh - 300px)",
            }}
            onScrollBottomEnd={handleBodyScroll}
            loading={isLoading}
        />
      </DialogContent>
      <DialogActions sx={{ marginBottom: "10px", marginTop: "10px" }}>
        <Button variant="contained" 
          onClick={handleClose}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(ToolbarDemandLetterHistoryModal);
