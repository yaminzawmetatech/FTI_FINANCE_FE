import * as React from "react";
import {useCallback, useMemo} from "react";
import {useSearchParams} from "react-router-dom";
import Table from "components/Table";
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
import {getFileAttaches} from "modules/administration/slices/fileAttachSlice";
import {useParams} from "react-router";

const ContractAttachmentTable = ({onSelectionChanged}) => {
    const {primaryKey, tableName} = useParams()
    const dispatch = useDispatch();
    const [params, setParams] = useSearchParams();

    const {fileAttaches, next_page_url, isLoading} = useSelector(
        (state) => state.fileAttaches
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
                field: "file_name",
                headerName: "File Name",
                width: 200,
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
                field: "server_upload_status",
                headerName: "Server Upload Status",
                width: 200,
                sortable: true,
                resizable: true,
            },
            {
                field: "server_file_path",
                headerName: "Server File Path",
                width: 200,
                sortable: true,
                resizable: true,
            },
            {
                field: "local_file_path",
                headerName: "Local File Path",
                width: 200,
                sortable: true,
                resizable: true,
            },
            {
                field: "one_drive_file_path",
                headerName: "One Drive File Path",
                width: 200,
                sortable: true,
                resizable: true,
            },
            {
                field: "one_drive_web_url",
                headerName: "One Drive Web URL",
                width: 200,
                sortable: true,
                resizable: true,
            },
            {
                field: "size",
                headerName: "Size",
                width: 200,
                sortable: true,
                resizable: true,
            },
            {
                field: "primary_key",
                headerName: "Primary Key",
                width: 200,
                sortable: true,
                resizable: true,
            },
            {
                field: "table_id",
                headerName: "Table Id",
                width: 200,
                sortable: true,
                resizable: true,
            },
            {
                field: "table_name",
                headerName: "Table Name",
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
                field: "created_user.user_name",
                headerName: "Created By",
                width: 200,
                sortable: true,
                resizable: true,
            },
            {
                field: "updated_at",
                headerName: "Modified Date",
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

    const handleBodyScroll = useCallback(
        async (event) => {
            if (next_page_url) {
                dispatch(
                    getFileAttaches({
                        params: {
                            ...Object.fromEntries(params),
                            table_name: tableName,
                            primary_key: primaryKey,
                        },
                        firstFetch: false,
                        url: next_page_url,
                    })
                );
            }
        },
        [dispatch, next_page_url, params, primaryKey, tableName]
    );

    return (
        <Table
            rowSelection={"single"}
            onSelectionChanged={onSelectionChanged}
            searchParams={params}
            setSearchParams={setParams}
            rowData={fileAttaches ?? []}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            name="ContractAttachmentTable"
            rowKey="id"
            agThemeStyle={{
                height: "calc(100vh - 280px)",
            }}
            onScrollBottomEnd={handleBodyScroll}
            loading={isLoading}
        />
    );
};

export default React.memo(ContractAttachmentTable);
