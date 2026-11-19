import React, { useState } from "react";
import { Button, CircularProgress, Portal, Backdrop } from "@mui/material";
import axiosInstance from "core/services/api/axiosInstance";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { saveAs } from "file-saver";

const ExcelExportButton = ({ ids }) => {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);

    try {
      const response = await axiosInstance.post(
        "/customer-inquiry-form-export",
        {
          form_ids: JSON.stringify(ids),
        },
        {
          responseType: "arraybuffer", // Set response type to array buffer
        }
      );

      const blob = new Blob([response.data], {
        type: "collection/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, "CustomerInquiryForms.xlsx");
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
        Export
      </Button>
    </>
  );
};

export default ExcelExportButton;
