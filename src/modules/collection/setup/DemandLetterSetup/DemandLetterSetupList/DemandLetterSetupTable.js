import * as React from "react";
import {useCallback, useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
import Table from "components/Table";
import DemandLetterSetupTableRowMenu from "./DemandLetterSetupTableRowMenu";
import { getAllDemandLetterSetups } from "modules/collection/slices/demandLetterSetupSlice";

const DemandLetterSetupTable = () => {

    const dispatch = useDispatch();

    const {demandLetterSetups, isLoading} = useSelector(
        (state) => state.demandLetterSetup
    );

    const fetchApi = useCallback(() => {
        dispatch(getAllDemandLetterSetups())
    }, [dispatch]);

    useEffect(() => {
        fetchApi();
    }, [fetchApi]);

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
                headerName: "Action",
                field: "menu",
                width: 75,
                lockPosition: "right",
                pinned: "right",
                cellRenderer: DemandLetterSetupTableRowMenu,
                lockPinned: true,
            },
            {
                field: "type",
                headerName: "Deman Letter Type",
                width: 200,
                sortable: true,
                resizable: true,
            },
            {
                field: "category",
                headerName: "Category",
                width: 200,
                sortable: true,
                resizable: true,
            },
            {
                field: "sub_category",
                headerName: "Sub Category",
                width: 200,
                sortable: true,
                resizable: true,
            },
            {
                field: "description",
                headerName: "Description",
                width: 200,
                sortable: true,
                resizable: true,
            },
            {
                field: "created_at",
                headerName: "Created Date",
                width: 200,
                sortable: true,
                valueFormatter: (params) =>
                    params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
                resizable: true,
            },
            {
                field: "created_by",
                headerName: "Created By",
                width: 200,
                sortable: true,
                resizable: true,
            },
            {
                field: "last_modified",
                headerName: "Modified Date",
                width: 200,
                sortable: true,
                resizable: true,
                valueFormatter: (params) =>
                    params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
            },
            {
                field: "modified_by",
                headerName: "Modified By",
                width: 200,
                sortable: true,
                resizable: true,
            },
        ],
        []
    );

    return (
        <Table
            rowSelection={"single"}
            rowData={demandLetterSetups ?? []}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            name="Contract Agreement Setup Table"
            rowKey="id"
            // pagination = true
            agThemeStyle={{
                height: "calc(100vh - 180px)",
            }}
            pagination={true}
            paginationPageSize={25}
            // onScrollBottomEnd={handleBodyScroll}
            loading={isLoading}
        />
    );
};

export default React.memo(DemandLetterSetupTable);
