import React, { useState } from "react";
import { Button, CircularProgress, Portal, Backdrop } from "@mui/material";
import axiosInstance from "core/services/api/axiosInstance";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { saveAs } from "file-saver";
import {useParams} from "react-router-dom";

const ExcelExportButton = ({ documentNumber }) => {
  const [exporting, setExporting] = useState(false);
  const {uuid} = useParams();

  const handleExport = async () => {
    setExporting(true);

    try {
      const response = await axiosInstance.get(
        `/insurance-batch/${uuid}`,
        {
          responseType: "arraybuffer",
        }
      );

      const blob = new Blob([response.data], {
        type: "insurancePaymentLine/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, "insurancePaymentLineReport.xlsx");
    } catch (error) {
      console.error("Error exporting data:", error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <>
      <Portal container={document.body}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={exporting}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Portal>
      <Button
        color="inherit"
        sx={{ borderRadius: 0 }}
        onClick={handleExport}
        disabled={exporting || !uuid}
        startIcon={<FileDownloadIcon />}
      >
        Excel Export
      </Button>
    </>
  );
};

export default ExcelExportButton;