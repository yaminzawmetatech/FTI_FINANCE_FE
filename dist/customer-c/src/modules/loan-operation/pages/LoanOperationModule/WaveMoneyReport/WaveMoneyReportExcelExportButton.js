import React, { useState } from "react";
import { Button, CircularProgress, Portal, Backdrop } from "@mui/material";
import axiosInstance from "core/services/api/axiosInstance";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { saveAs } from 'file-saver';
import { showErrorToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";

const ExcelExportButton = ({ applicationIds, categoryId }) => {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {

    if (categoryId?.length > 1) {
      showErrorToast(CommonMessage.MFE00015);
      return;
    } else {
      setExporting(true);
  
      try {
        const response = await axiosInstance.get(
          "/applications/export/application-guarantor",
          {
            params: {
              application_id: JSON.stringify(applicationIds),
              extra : 1
            },
            responseType: 'arraybuffer',
          }
        );
    
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
  
        const formattedDate = `${day}.${month}.${year}`;
  
        const fileName = `waveMoneyLoanReport(${formattedDate}).xlsx`;
        saveAs(blob, fileName);
    
        //saveAs(blob, "waveMoneyLoanReport.xlsx");
      } catch (error) {
        console.error("Error exporting data:", error);
      } finally {
        setExporting(false);
      }
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
