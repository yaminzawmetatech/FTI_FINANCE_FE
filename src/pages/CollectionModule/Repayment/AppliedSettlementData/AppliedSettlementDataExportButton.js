import React, { useState } from "react";
import { Button, CircularProgress, Portal, Backdrop } from "@mui/material";
import axiosInstance from "features/api/axiosInstance";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { saveAs } from "file-saver";
import { useParams } from "react-router-dom";

const AppliedSettementDataExportButton = ({ appliedSettlementData }) => {
  const [exporting, setExporting] = useState(false);
  const { uuid, mode } = useParams();

  const handleExport = async () => {
    try {
      setExporting(true);
      if (!mode) {
        const response = await axiosInstance.get(
          `/applied-records-export/${uuid}`,
          {
            responseType: "arraybuffer",
          }
        );

        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        saveAs(blob, "AppliedSettlementData.xlsx");
      } else if (mode === "et") {
        const response = await axiosInstance.get(
          `/applied-records-export/${uuid}`,
          {
            params: {
              is_et: true,
            },
            responseType: "arraybuffer",
          }
        );

        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        saveAs(blob, "AppliedETSettlementData.xlsx");
      }
      else if (mode === "insufficient-payments") {
        const response = await axiosInstance.get(
          `/applied-records-export/${uuid}`,
          {
            params: {
              is_insufficient_payment: 1,
              batch_id: appliedSettlementData[0]?.batch_id
            },
            responseType: "arraybuffer",
          }
        );

        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        saveAs(blob, "AppliedSettlementData.xlsx");
      }
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

export default AppliedSettementDataExportButton;
