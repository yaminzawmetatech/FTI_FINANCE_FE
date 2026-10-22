import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Portal, Backdrop } from "@mui/material";
import axiosInstance from "features/api/axiosInstance";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { saveAs } from 'file-saver';

const ExcelExportButton = ({ activeTab, transformedSearchData }) => {
    const [exporting, setExporting] = useState(false);
    const [status, setStatus] = useState(null);


    useEffect(() => {
        if (activeTab === '1') {
            setStatus('miscellaneous');
        } else if (activeTab === '2') {
            setStatus('due_retain_period');
        } else if (activeTab === '3') {
            setStatus('after_retain_period');
        } else if (activeTab === '4') {
            setStatus('refund');
        } else {
            setStatus(null);
        }
    }, [activeTab]);

    const handleExport = async () => {
        try {
            setExporting(true);
            const response = await axiosInstance.post(
                "/exceed-payment-export",
                {
                    ...transformedSearchData,
                    exceed_status: status, // Use the active tab to filter the data
                },
                {
                    responseType: 'arraybuffer', // Set response type to array buffer
                }
            );
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            saveAs(blob, `ExceedPayment ${status} List.xlsx`);
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
