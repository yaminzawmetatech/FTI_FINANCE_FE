import React, {useCallback, useState} from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CachedIcon from "@mui/icons-material/Cached";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import Toolbar from "../../../../components/Toolbar";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import {useParams} from "react-router";
import {useSearchParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import ContractAttachmentToolbarUploadFile from "./ContractAttachmentToolbarUploadFile";
import {saveAs} from "file-saver";
import ClearIcon from '@mui/icons-material/Clear';
import {deleteFileAttach, getFileAttaches} from "../../../../features/fileAttach/fileAttachSlice";
import {toast} from "react-toastify";

const ContractAttachmentToolbar = ({selectedAttachments, fetchApi}) => {
    const {primaryKey, tableName} = useParams();
    const [params] = useSearchParams();
    const dispatch = useDispatch();

    const [openDeleteFileConfirmDialog, setOpenDeleteFileConfirmDialog] =
        useState(false);
    const [openSelectDocumentTypeDialog, setOpenSelectDocumentTypeDialog] =
        useState(false);

    const downloadHandleOnClick = useCallback(() => {
        if (
            selectedAttachments &&
            selectedAttachments.length &&
            selectedAttachments[0]?.server_url
        ) {
            const urlObject = new URL(selectedAttachments[0]?.server_url);
            urlObject.search = "";
            saveAs(
                selectedAttachments[0].server_url,
                urlObject.toString().split("/").pop()
            );
        }
    }, [selectedAttachments]);

    const handleOk = useCallback(async () => {
        if (selectedAttachments.length < 1) {
            toast.warn('select attachment to delete')
        } else {
            const res = await dispatch(deleteFileAttach({id: selectedAttachments[0].id}))
            if (res.type.endsWith("fulfilled")) {
                toast.success("Deleted Successfully", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            fetchApi()
        }
    }, [selectedAttachments])

    const refreshHandleOnClick = useCallback(() => {
        window.location.reload();
    }, []);

    // const handleOk = async (e) => {
    //   console.log(e)
    // const res = await dispatch(deleteFileAttach({id:}))
    // const res = await dispatch(
    //   createApplication({
    //     body: {
    //       category_id: categoryId,
    //     },
    //   })
    // );
    // if (res.type.endsWith("fulfilled")) {
    //   toast.success("Create Success", {
    //     position: "top-right",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    //   openNewWindow(
    //     `/CreditManagement/CreateApplicationInformation/${categoryName}/${categoryId}/${res.payload.data.uuid}/${res.payload.data.id}`
    //   );
    // }
    // };

    const toolbarData = [
        {
            title: "HOME",
            children: [
                {
                    title: "Process",
                    type: "single",
                    children: [
                        {
                            icon: <AttachFileIcon fontSize="large"/>,
                            title: "Upload File",
                            width: "4rem",
                            onClick: (e) => {
                                setOpenSelectDocumentTypeDialog(true);
                            },
                        },
                        {
                            icon: <SimCardDownloadIcon fontSize="large"/>,
                            title: "Download File",
                            width: "4rem",
                            onClick: downloadHandleOnClick,
                        },
                        {
                            icon: <ClearIcon fontSize="large"/>,
                            title: "Delete File",
                            width: "4rem",
                            onClick: (e) => {
                                setOpenDeleteFileConfirmDialog(true);
                            },
                        },
                    ],
                },
                {
                    title: "Page",
                    type: "single",
                    children: [
                        {
                            icon: <CachedIcon fontSize="large"/>,
                            title: "Refresh",
                            width: "4rem",
                            onClick: refreshHandleOnClick,
                        },
                    ],
                },
            ],
        },
    ];

    const [selectedRows, setSelectedRows] = useState([]);

    const [imageCurrent, setImageCurrent] = useState(0);
    const onChangeImagePreview = (current, prevCurrent) => {
    };
    const onCellClicked = ({rowIndex}) => {
        setImageCurrent(rowIndex);
    };

    const onSelectionChanged = useCallback((params) => {
        setSelectedRows(params.api.getSelectedRows());
    }, []);

    return (
        <>
            <ContractAttachmentToolbarUploadFile
                open={openSelectDocumentTypeDialog}
                onClose={() => {
                    setOpenSelectDocumentTypeDialog(false);
                }}
            />
            <ConfirmationDialog
                open={openDeleteFileConfirmDialog}
                onClose={() => {
                    setOpenDeleteFileConfirmDialog(false);
                }}
                onOk={handleOk}
                title="Confirm Delete File"
                content="Are you sure you want to delete this file?"
            />
            <Toolbar data={toolbarData}/>
        </>
    );
};

export default React.memo(ContractAttachmentToolbar);
