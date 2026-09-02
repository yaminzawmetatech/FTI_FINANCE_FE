import React, { useEffect, useMemo } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Table from "components/Table";
import {readPenaltyLog} from "../../../features/penaltyLogs/penaltyLogSlice";

const PenaltyLogInfoModal = ({ file_name, open, handleClose }) => {

    const dispatch = useDispatch();

    const { log } = useSelector((state) => state.log);

    const defaultColDef = useMemo(
        () => ({
            valueSetter: (params) => {},
        }),
        []
    );

    useEffect(()=>{
        if(file_name){
            dispatch(readPenaltyLog({file_name}));
        }
    }, [dispatch, file_name])

    const columnDefs = useMemo(
        () => [
            {
                field: "record",
                headerName: "Record",
                width: 2000,
                sortable: true,
                resizable: true,
            },
        ],
        []
    );

    return (
        <Dialog
            sx={{ "& .MuiDialog-paper": { width: "100%" } }}
            maxWidth="md"
            open={open}
        >
            <DialogTitle
                id="scroll-dialog-title"
                variant="h5"
                sx={{ color: "#1890ff" }}
            >
                Payment History
            </DialogTitle>
            <DialogContent dividers>
                <Table
                    //searchParams={params}
                    rowData={log ?? []}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    name="IncompleteFieldsHistoryList"
                    rowKey="id"
                    agThemeStyle={{
                        height: "calc(100vh - 300px)",
                    }}
                    //onScrollBottomEnd={handleBodyScroll}
                    // loading={isLoading}
                />
            </DialogContent>
            <DialogActions sx={{ marginBottom: "10px", marginTop: "10px" }}>
                <Button variant="outlined"

                        sx={{
                            color: "red",
                            borderColor: "red",
                            "&:hover": {
                                backgroundColor: "rgba(255, 0, 0, 0.04)",
                                borderColor: "red",
                            },
                        }}
                        onClick={handleClose}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default React.memo(PenaltyLogInfoModal);
