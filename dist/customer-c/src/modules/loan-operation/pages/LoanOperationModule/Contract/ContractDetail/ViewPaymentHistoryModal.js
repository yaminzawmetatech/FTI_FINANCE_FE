import React, {useEffect, useMemo} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import Table from "components/Table";
import {getPaymentLinesHistory} from "modules/collection/slices/actualPaymentLinesSlice";
import {CurrencyFormatter} from "common/CurrencyFormatter";

const ToolbarIncompleteFieldsHistoryModal = ({uuid, open, handleClose}) => {

    const dispatch = useDispatch();

    const {contract} = useSelector((state) => state.contractDetail);

    const {paymentHistory} = useSelector((state) => state.paymentHistory);

    const defaultColDef = useMemo(
        () => ({
            valueSetter: (params) => {
            },
        }),
        []
    );

    useEffect(() => {
        if (uuid && open) {
            dispatch(getPaymentLinesHistory({uuid}));
        }
    }, [dispatch, uuid, open])

    const columnDefs = useMemo(
        () => [
            {
                field: "repayment_date",
                headerName: "Repayment Date",
                width: 110,
                sortable: true,
                resizable: true,
            },
            {
                field: "repayment_amount",
                headerName: "Repayment Amount",
                width: 110,
                sortable: true,
                resizable: true,
                valueFormatter: CurrencyFormatter
            },
            {
                field: "received_principal_amount",
                headerName: "Received Principal Amount",
                width: 200,
                sortable: true,
                resizable: true,
                valueFormatter: CurrencyFormatter
            },
            {
                field: "received_interest_amount",
                headerName: "Received Interest Amount",
                width: 200,
                sortable: true,
                resizable: true,
                valueFormatter: CurrencyFormatter
            },
            {
                field: "received_collection_fee_amount",
                headerName: "Received Collection Fee Amount",
                width: 200,
                sortable: true,
                resizable: true,
                valueFormatter: CurrencyFormatter
            },
            {
                field: "received_stamp_duty_fee_amount",
                headerName: "Received Stamp Duty Fee Amount",
                width: 200,
                sortable: true,
                resizable: true,
                valueFormatter: CurrencyFormatter
            },
            {
                field: "received_processing_fee_amount",
                headerName: "Received Processing Fee Amount",
                width: 200,
                sortable: true,
                resizable: true,
                valueFormatter: CurrencyFormatter
            },
            {
                field: "received_insurance_amount",
                headerName: "Received Insurance Amount",
                width: 200,
                sortable: true,
                resizable: true,
                valueFormatter: CurrencyFormatter
            },
            {
                field: "remaining_amount",
                headerName: "Remaining Amount",
                width: 200,
                sortable: true,
                resizable: true,
                valueFormatter: CurrencyFormatter
            },
            {
                field: "exceed_amount",
                headerName: "Exceed Amount",
                width: 200,
                sortable: true,
                resizable: true,
                valueFormatter: CurrencyFormatter
            },
            {
                field: "remaining_amount_type",
                headerName: "Remaining Amount Type",
                width: 200,
                sortable: true,
                resizable: true,
            },
            {
                field: "status",
                headerName: "Status",
                width: 100,
                sortable: true,
                resizable: true,
            },
        ],
        []
    );

    return (
        <Dialog
            sx={{"& .MuiDialog-paper": {width: "100%"}}}
            maxWidth="md"
            open={open}
        >
            <DialogTitle
                id="scroll-dialog-title"
                variant="h5"
                sx={{color: "#1890ff"}}
            >
                Payment History
            </DialogTitle>
            <DialogContent dividers>
                <Table
                    //searchParams={params}
                    rowData={paymentHistory ?? []}
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
            <DialogActions sx={{marginBottom: "10px", marginTop: "10px"}}>
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

export default React.memo(ToolbarIncompleteFieldsHistoryModal);
