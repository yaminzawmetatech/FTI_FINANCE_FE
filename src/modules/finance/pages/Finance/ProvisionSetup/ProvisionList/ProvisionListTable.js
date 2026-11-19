import Table from 'components/Table';
import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ProvisionListAppBar from './ProvisionListAppBar';
import { getProvisionSetups } from 'modules/finance/slices/provisionSetupSlice';
import dayjs from "dayjs";
import ProvisionSetUpTableRowMenu from './ProvisionSetUpTableRowMenu';

const ProvisionListTable = () => {
    const dispatch = useDispatch();
    const { provisionSetups, isLoading,next_page_param } = useSelector((state) => state.provisionSetup)

    useEffect(() => {
        dispatch(getProvisionSetups({}));
    }, [])

    const defaultColDef = useMemo(
        () => ({
            valueSetter: (params) => { },
        }),
        []
    );

    const handleBodyScroll = useCallback(
        async (event) => {
            if (next_page_param) {
                dispatch(
                    getProvisionSetups({
                        params: next_page_param,
                        firstFetch: false,
                    })
                );
            }
        },
        [dispatch]
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
                field: "classification",
                headerName: "Classification",
                width: 200,
                sortable: true,
                resizable: true,
                valueFormatter: (params) => `Overdue ${params.value}`,
            },
            {
                field: "reverse_ratio",
                headerName: "Reverse Ratio Proposed",
                width: 200,
                sortable: true,
                resizable: true,
                valueFormatter: (params) => `${params.value} %`,
            },
            {
                field: "remark",
                headerName: "Remark",
                width: 200,
                sortable: true,
                resizable: true,
            },
            {
                headerName: "Overdue From Days",
                field: "overdue_from_days",
                width: 150,
                sortable: true,
                resizable: true,
            },
            {
                headerName: "Overdue To Days",
                field: "overdue_to_days",
                width: 150,
                sortable: true,
                resizable: true,
            },
            {
                field: "version",
                headerName: "Version",
                width: 200,
                sortable: true,
                resizable: true,
            },
            {
                headerName: "",
                field: "menu",
                width: 50,
                cellRenderer: ProvisionSetUpTableRowMenu
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
    return (
        <div>
            <ProvisionListAppBar></ProvisionListAppBar>
            <Table
                // searchParams={params}
                // setSearchParams={setParams}
                rowData={provisionSetups ?? []}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                name="Provision Setup List"
                rowKey="id"
                agThemeStyle={{
                    height: "calc(100vh - 190px)",
                }}
                onScrollBottomEnd={handleBodyScroll}
                loading={isLoading}
            />
        </div>

    )
}

export default React.memo(ProvisionListTable);
