import React, { useState } from "react";
import { Button, CircularProgress, Portal, Backdrop } from "@mui/material";
import axiosInstance from "core/services/api/axiosInstance";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { saveAs } from "file-saver";
import {useParams} from "react-router-dom";

const ExcelExportButton = ({ transformedSearchData, defaultParams }) => {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);

    try {
      const response = await axiosInstance.post(
        "/export-insufficient-contracts",
        {
          ...transformedSearchData,
          ...defaultParams
        },
        {
          responseType: "arraybuffer", // Set response type to array buffer
        }
      );

      const blob = new Blob([response.data], {
        type: "InsufficientPaymentList/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, "Insufficient Payment Contracts.xlsx");
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
        disabled={exporting}
        startIcon={<FileDownloadIcon />}
      >
        Excel Export
      </Button>
    </>
  );
};

export default ExcelExportButton;