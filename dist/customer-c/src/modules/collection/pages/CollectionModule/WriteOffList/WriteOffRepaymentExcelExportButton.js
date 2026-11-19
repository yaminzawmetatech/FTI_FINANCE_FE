import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Portal,
  Backdrop,
  AppBar,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { saveAs } from "file-saver";
import { showErrorToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import axiosInstanceV2 from "core/services/api/axiosInstanceV2";

const ExcelExportButton = ({ transformedSearchDataResponse }) => {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);

    try {
      const response = await axiosInstanceV2.get(
        "/download-payment-after-write-off-excel",
        {
          params: {
            ...transformedSearchDataResponse,
          },
          responseType: "arraybuffer", // Ensure binary data response
        }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, "Payment After Write Off.xlsx");
    } catch (error) {
      if (error.response && error.response.data) {
        // Convert ArrayBuffer to text
        const decoder = new TextDecoder("utf-8");
        const errorText = decoder.decode(error.response.data);
        const parsedError = JSON.parse(errorText);
        const errorMessage = parsedError.message || "An unknown error occurred";
        showErrorToast(errorMessage);
      }
      // Show error toast
    } finally {
      setExporting(false);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fafafb",
        color: "black",
        boxShadow: "none",
        mb: 1,
        mt: -1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end", // align all children to the right
        paddingX: 2,
        paddingY: 1,
        gap: 2, // spacing between button and export
      }}
    >
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
    </AppBar>
  );
};

export default ExcelExportButton;
