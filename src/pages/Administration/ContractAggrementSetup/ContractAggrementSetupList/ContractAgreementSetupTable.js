import * as React from "react";
import {useCallback, useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
import Table from "../../../../components/Table";
import { getAllContractAgreements} from "../../../../features/contractAggrementSetup/contractAggrementSetupSlice";
import ContractAgreementSetupTableRowMenu from "./ContractAgreementSetupTableRowMenu";

const ContractAgreementListTable = () => {

    const dispatch = useDispatch();

    const {contractAgreementSetups, isLoading} = useSelector(
        (state) => state.contractAgreementSetup
    );

    const fetchApi = useCallback(() => {
        dispatch(getAllContractAgreements())
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
                cellRenderer: ContractAgreementSetupTableRowMenu,
                lockPinned: true,
            },
            {
                field: "name",
                headerName: "Contract Agreement Setup Name",
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
            rowData={contractAgreementSetups ?? []}
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

export default React.memo(ContractAgreementListTable);
