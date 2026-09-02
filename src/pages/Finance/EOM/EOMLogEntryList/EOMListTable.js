import Table from 'components/Table';
import React, { useCallback, useEffect, useMemo } from 'react'
import dayjs from "dayjs"
import { useDispatch, useSelector } from 'react-redux';
import { getEOMLogEntries } from 'features/EOM/EOMSlice';
import EOMLogEntryRowMenu from './EOMLogEntryRowMenu';

function JobQueueListTable() {

    const dispatch = useDispatch();
    const { jobQueueLogEntries, next_page_param, isLoading } = useSelector(state => state.EOM)
    useEffect(() => {
        dispatch(getEOMLogEntries({ params: {} }));
    }, [])


    const handleBodyScroll = useCallback(
        async (event) => {
            if (next_page_param) {
                dispatch(
                    getEOMLogEntries({
                        params: next_page_param,
                        firstFetch: false,
                    })
                );
            }
        },
        [dispatch, next_page_param]
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
                field: "eom_date",
                headerName: "EOM Date",
                width: 200,
                sortable: true,
                resizable: true,
                pinned: "left",
                lockPosition: "left",
                lockPinned: true,
            },
            {
                field: "status",
                headerName: "Status",
                width: 200,
                sortable: true,
                resizable: true,
                pinned: "left",
                lockPosition: "left",
                lockPinned: true,
            },
            {
                field: "",
                headerName: "",
                width: 50,
                sortable: true,
                resizable: true,
                cellRenderer: EOMLogEntryRowMenu,
                pinned: "left",
                lockPosition: "left",
                lockPinned: true,
            },
            {
                field: "start_date_time",
                headerName: "Start Date Time",
                width: 200,
                sortable: true,
                resizable: true,
                valueFormatter: (params) =>
                    params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
            },
            {
                field: "end_date_time",
                headerName: "End Date Time",
                width: 200,
                sortable: true,
                resizable: true,
                valueFormatter: (params) =>
                    params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
            },
            {
                field: "created_at",
                headerName: "Created At",
                width: 200,
                sortable: true,
                resizable: true,
                valueFormatter: (params) =>
                    params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
            },
            {
                field: "created_user.user_name",
                headerName: "Created By",
                width: 200,
                sortable: true,
                resizable: true,
            },
            {
                field: "updated_at",
                headerName: "Modified At",
                width: 200,
                sortable: true,
                resizable: true,
                valueFormatter: (params) =>
                    params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
            },
            {
                field: "modified_user.user_name",
                headerName: "Modified By",
                width: 200,
                sortable: true,
                resizable: true,
            },


        ],
        []
    );

    let rowDatas = jobQueueLogEntries;
    return (
        <>
            <Table
                rowData={rowDatas || []}
                columnDefs={columnDefs}
                name="Job Queue Log Entry List"
                rowKey="id"
                agThemeStyle={{
                    height: "calc(100vh - 190px)",
                }}
                onScrollBottomEnd={handleBodyScroll}
                loading={isLoading}
            />
        </>
    )
}

export default React.memo(JobQueueListTable) 