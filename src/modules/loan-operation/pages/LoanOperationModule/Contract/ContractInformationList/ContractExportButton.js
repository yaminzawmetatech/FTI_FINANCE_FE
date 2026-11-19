import React, {useState} from "react";
import {Button, CircularProgress, Portal, Backdrop} from "@mui/material";
import axiosInstance from "core/services/api/axiosInstance";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {saveAs} from 'file-saver';

const ExcelExportButton = ({transformedSearchData}) => {
    const [exporting, setExporting] = useState(false);
    const handleExport = async () => {
        try {
            setExporting(true);
            const response = await axiosInstance.post(
                "/contracts/export",
                {
                    ...transformedSearchData,
                    ...(transformedSearchData?.customer_loan_ids && {
                        customer_loan_ids: transformedSearchData?.customer_loan_ids.split(',')
                    }),
                    ...(transformedSearchData?.mnet_application_id && {
                        mnet_application_id: transformedSearchData?.mnet_application_id.split(',')
                    }),
                    ...(transformedSearchData?.kpay_ids && {
                        kpay_ids: transformedSearchData?.kpay_ids.split(',')
                    }),
                    is_generated_gl : 1
                },
                {
                    responseType: 'arraybuffer', // Set response type to array buffer
                }
            );
            const blob = new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

            saveAs(blob, "Contract.xlsx");
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
                    sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={exporting}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
            </Portal>
            <Button
                color="inherit"
                sx={{borderRadius: 0}}
                onClick={handleExport}
                disabled={exporting}
                startIcon={<FileDownloadIcon/>}
            >
                Excel Export
            </Button>
        </>
    );
};

export default ExcelExportButton;
