import React, {useEffect} from "react";
import {useCallback, useMemo} from "react";
import Table from "components/Table";
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
import {Breadcrumbs, Typography, Box, Paper} from "@mui/material";
import {getAllPenaltyLogs} from "../../../features/penaltyLogs/penaltyLogSlice";
import RepaymentTableRowMenu from "../Repayment/RepaymentList/RepaymentTableRowMenu";
import PenaltyLogTableRowMenu from "./PenaltyLogTableRowMenu";

const ReportTable = () => {
    const dispatch = useDispatch();

    const {penaltyLogs, next_page_param, isLoading} = useSelector(
        (state) => state.penaltyLogs
    );

    const rowData = penaltyLogs || [];

    useEffect(() => {

        dispatch(
            getAllPenaltyLogs({
                firstFetch: true,
            })
        );

    }, [dispatch]);

    const handleBodyScroll = useCallback(
        async (event) => {
            if (next_page_param) {
                dispatch(
                    getAllPenaltyLogs({
                        params: next_page_param,
                        firstFetch: false,
                    })
                );
            }
        },
        [dispatch, next_page_param]
    );

    const defaultColDef = useMemo(
        () => ({
            valueSetter: (params) => {
            },
        }),
        []
    );

    const columnDefs = useMemo(
        () => [
            {
                field: "row",
                headerName: "No",
                valueGetter: "node.rowIndex + 1",
                width: 50,
                sortable: true,
                resizable: true,
                pinned: "left",
                lockPosition: "left",
                lockPinned: true,
            },
            {
                headerName: "",
                field: "menu",
                width: 50,
                lockPosition: "left",
                pinned: "left",
                cellRenderer: PenaltyLogTableRowMenu,
                cellRendererParams: {
                    selectedData: (data) => {},
                },
                lockPinned: true,
            },
            {
                field: "created_at",
                headerName: "File Created At",
                width: 150,
                sortable: true,
                resizable: true,
                pinned: "left",
                lockPosition: "left",
                lockPinned: true,
            },
            {
                field: "file_name",
                headerName: "File Name",
                // width: 150,
                sortable: true,
                resizable: true,
                pinned: "left",
                lockPosition: "left",
                lockPinned: true,
            },
            {
                field: "content",
                headerName: "File Content",
                width: 1100,
                sortable: true,
                resizable: true,
                pinned: "left",
                lockPosition: "left",
                lockPinned: true,
            },
        ],
        []
    );


    return (
        <Box sx={{width: "100%"}}>
            <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
                <Typography color="text.primary">Collection Module</Typography>
                <Typography color="text.primary">
                    Penalty Log Records
                </Typography>
            </Breadcrumbs>

            <Paper sx={{width: "100%"}}>
                <Table
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    name="PenaltyLogTable"
                    rowKey="file_name"
                    agThemeStyle={{
                        height: "calc(100vh - 210px)",
                    }}
                    onScrollBottomEnd={handleBodyScroll}
                    loading={isLoading}
                />
            </Paper>
        </Box>
    );
};

export default React.memo(ReportTable);
