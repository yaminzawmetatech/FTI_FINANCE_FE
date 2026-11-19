import React, { useState } from "react";
import { Button, CircularProgress, Portal, Backdrop } from "@mui/material";
import axiosInstance from "core/services/api/axiosInstance";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { saveAs } from 'file-saver';

const PaymentAfterWOButton = ({contractId }) => {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    try {
      setExporting(true);
      const response = await axiosInstance.get(
        `/download-write-off-recovery-income-with-contract-excel`,
        {
          params: {
            contract_id: contractId
          },
          responseType: "arraybuffer",
        }
      );

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      saveAs(blob, "PaymentAfterWriteOff.xlsx");
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

export default PaymentAfterWOButton;
