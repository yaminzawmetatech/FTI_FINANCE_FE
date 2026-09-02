import React, { useState } from "react";
import { Button, CircularProgress, Portal, Backdrop } from "@mui/material";
import axiosInstance from "features/api/axiosInstance";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { saveAs } from "file-saver";

const ExcelExportButton = ({ ids, categoryId, fromDate, toDate, applicationIds }) => {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);

    try {
      const response = await axiosInstance.get(
        `/export-contract-disbursement-payment`,
        {
          params: {
            contract_id: JSON.stringify(applicationIds)
            // ids: ids,
            // is_generated_gl: true,
            // category_id: categoryId,
            // from_date: fromDate,
            // to_date: toDate,
            // stamp_duty_status:'open'
          },
          responseType: "arraybuffer",
        }
      );

      const blob = new Blob([response.data], {
        type: "ContractDisbursementPayment/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, "ContractDisbursementPaymentReport.xlsx");
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
