import ConfirmationDialog from 'components/ConfirmationDialog'
import React, { useState } from 'react'
import openNewWindow from 'utils/windowUtils';
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";

function JobQueueLogEntryNewButton() {

    const [open, setOpen] = useState(false);
    const { mode  } = useParams();

    const handleClose = () => {
        setOpen(false);
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleOk = () => {
        if(mode === "kpay"){
            openNewWindow("/finance/eom-bom-index/kpay");
        }else {
            openNewWindow("/finance/eom-bom-index/all");
        }
        
    }
    return (
        <>
            <ConfirmationDialog
                open={open}
                onClose={handleClose}
                onOk={handleOk}
                title="Create New EOM/BOM"
                content="Are you sure you want to create new EOM/BOM ?"
            ></ConfirmationDialog>
            <Button
                color="inherit"
                sx={{ borderRadius: 0 }}
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
            >
                New
            </Button>
        </>
    )
}

export default React.memo(JobQueueLogEntryNewButton)