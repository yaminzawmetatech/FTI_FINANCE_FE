import React, { useMemo, useEffect, useState } from "react";
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
import { getCreditCriteriaVersions } from "modules/credit-management/slices/creditCriteriaVersionSlice";
import { FormLabel } from "@mui/material";
import { saveAs } from "file-saver";
import axiosInstance from "core/services/api/axiosInstance";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const VersionHistoryModal = ({ open, handleClose, selectedId, data }) => {
  const dispatch = useDispatch();

  const { creditCriteriaVersions, isLoading } = useSelector(
    (state) => state.creditCriteriaVersions
  );

  useEffect(() => {
    if (open) {
      dispatch(
        getCreditCriteriaVersions({
          id: selectedId,
        })
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
        field: "value",
        headerName: "Value",
        width: 300,
        resizable: true,
      },
      {
        field: "remark",
        headerName: "Remark",
        width: 150,
        resizable: true,
      },
      {
        field: "start_date",
        headerName: "Version Start Date",
        width: 150,
        sortable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        resizable: true,
      },
      {
        field: "end_date",
        headerName: "Version End Date",
        width: 150,
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

  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);

    try {
      const response = await axiosInstance.post(
        `/credit-criteria-history-export/${selectedId}`,
        {},
        {
          responseType: "arraybuffer", // Set response type to array buffer
        }
      );

      const blob = new Blob([response.data], {
        type: "collection/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(
        blob,
        data?.category?.name +
          " - " +
          data?.subcategory?.name +
          " - " +
          data?.type +
          " - " +
          data?.required_category +
          "-Version List.xlsx"
      );
    } catch (error) {
      console.error("Error exporting data:", error);
    } finally {
      setExporting(false);
      handleClose();
    }
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
        <div style={{ display: "flex" }}>
          <div>Credit Criteria Version History</div>
          <div style={{ marginLeft: "auto" }}>
            <Button
              color="inherit"
              sx={{ borderRadius: 0 }}
              onClick={handleExport}
              disabled={exporting}
              startIcon={<FileDownloadIcon />}
            >
              Export
            </Button>
          </div>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <FormLabel sx={{ fontWeight: "bold", marginBottom: "2px" }}>
          {data?.category?.name +
            " - " +
            data?.subcategory?.name +
            " - " +
            data?.type +
            " - " +
            data?.required_category}
        </FormLabel>
        <Table
          //searchParams={params}
          rowData={creditCriteriaVersions ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="CreditCriteriaVersionHistory"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 300px)",
          }}
          loading={isLoading}
        />
      </DialogContent>
      <DialogActions sx={{ marginBottom: "10px", marginTop: "10px" }}>
        <Button variant="contained" onClick={handleClose}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(VersionHistoryModal);
