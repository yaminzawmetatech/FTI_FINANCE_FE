import React, { useState, useEffect } from "react";
import Toolbar from "components/Toolbar";
import { useParams } from "react-router";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Box,
} from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import ConfirmationModal from "common/ConfirmationModal";
import CommonMessage from "common/CommonMessage";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  getWriteOffSignature
} from "features/writeOffSignature/writeOffSignatureSlice";
import { getUsers } from "features/users/usersSlice";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import { saveAs } from "file-saver";
import axiosInstance from "features/api/axiosInstance";
import openNewWindow from "utils/windowUtils";

const ToolbarWriteOffBatch = ({
  handleChangeStatus,
  writeOffBatchs,
  writeOffPrepareContracts,
  selectedRows,
  handlePosted,
}) => {
  const { uuid, mode } = useParams();
  const dispatch = useDispatch();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [action, setAction] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedloading, setSelectedLoading] = useState(false);

  const contractIds = selectedRows.map(row => row?.contract_id);
  const auth = useSelector((state) => state.auth.user);

  function fetchSignatureData() {
    if (writeOffBatchs?.id && auth?.user_group) {
      return dispatch(getWriteOffSignature({
        params: {
          write_off_id: writeOffBatchs.id,
          signature_type: auth.user_group,
        }
      }));
    }
    return Promise.resolve();
  }

  useEffect(() => {
    dispatch(getUsers());
    fetchSignatureData();
  }, [dispatch, writeOffBatchs?.id, auth?.user_group]);

  const handleConfirmation = () => {
    setIsConfirmModalOpen(false);
    if (action === "Approved") {
      handleChangeStatus("Approved");
    } else if (action === "Reject") {
      handleChangeStatus("Reject");
    } else if (action === "Post") {
      handlePosted();
    }
  };

  const handleClickWOF = async () => {
    if (!uuid) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(`/write-off-pdf/${uuid}`, {
        responseType: "arraybuffer",
      });

      const blob = new Blob([response.data], { type: "application/zip" });
      saveAs(blob, "write_off_" + Date.now() + ".zip");
    } catch (error) {
      console.error("Error exporting Write Off PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickSelectContractWOF = async () => {
    if (!uuid || !contractIds?.length) return;

    setSelectedLoading(true);
    try {
      const response = await axiosInstance.get(
        `/write-off-selected-contract-pdf`,
        {
          params: {
            uuid,
            contractIds: contractIds,
          },
          responseType: "arraybuffer",
        }
      );

      const blob = new Blob([response.data], { type: "application/zip" });
      saveAs(blob, "write_off_contract_" + Date.now() + ".zip");
    } catch (error) {
      console.error("Error exporting Write Off Contract PDF:", error);
    } finally {
      setSelectedLoading(false);
    }
  };

  const toolbarData = [
    {
      title: "HOME",
      children: [
        ...(auth?.user_group === "Collection-Officer" || auth?.user_group === "administrator"
          ? [
            {
              title: "Request",
              type: "multiple",
              children: [
                {
                  icon: <MarkEmailReadIcon />,
                  title: "Request For Approval",
                  disabled: mode === "view" || writeOffBatchs?.is_posted === 1,
                  onClick: () => handleChangeStatus("Request For Approval"),
                },
              ],
            },
          ] : []),
        {
          title: "Approve",
          type: "multiple",
          children: [
            (mode === "edit" || mode === "view") && {
              icon: <CheckCircleIcon />,
              title: "Approve",
              disabled: mode === "view" || writeOffBatchs?.is_posted === 1 ||
                (auth?.user_group !== writeOffBatchs?.current_step && auth?.user_group !== "administrator"),
              onClick: () => {
                setAction("Approved");
                setConfirmMessage(CommonMessage.MFC00006);
                setIsConfirmModalOpen(true);
              },
            },
          ].filter(Boolean),
        },
        {
          title: "Reject",
          type: "multiple",
          children: [
            (mode === "edit" || mode === "view") && {
              icon: <CancelIcon />,
              title: "Reject",
              disabled: mode === "view" || writeOffBatchs?.is_posted === 1 ||
                (auth?.user_group !== writeOffBatchs?.current_step && auth?.user_group !== "administrator"),
              onClick: () => {
                setAction("Reject");
                setConfirmMessage(CommonMessage.MFC00007);
                setIsConfirmModalOpen(true);
              },
            },
          ].filter(Boolean),
        },
        {
          title: "Post",
          type: "multiple",
          children: [
            {
              icon: <IosShareIcon />,
              title: "Post",
              disabled: mode === "view" || writeOffBatchs?.status !== "approved",
              onClick: () => {
                setAction("Post");
                setIsConfirmModalOpen(true);
                setConfirmMessage(CommonMessage.MFC00008);
              },
            },
          ],
        },
        ...(auth?.user_group === writeOffBatchs?.current_step || auth?.user_group === "administrator"
          ? [
            {
              title: "Signature",
              type: "multiple",
              children: [
                {
                  icon: <EditIcon />,
                  title: "Signature",
                  onClick: () => {
                    openNewWindow(`/write-off-preparation/write-off-signature/${uuid}/${writeOffBatchs?.id}`);
                  },
                  disabled: mode === "view",
                },
              ],
            },
          ]
          : []),
        ...(writeOffBatchs?.status === "approved"
          ? [
            {
              title: "Document",
              type: "multiple",
              children: [
                {
                  icon: <DocumentScannerIcon />,
                  title: loading ? "Exporting..." : "Export Write Off",
                  onClick: loading ? undefined : handleClickWOF,
                  disabled: loading || writeOffBatchs?.is_posted === 0,
                },
                {
                  icon: <DocumentScannerIcon />,
                  title: selectedloading ? "Exporting..." : "Export Write Off Contract",
                  onClick: selectedloading ? undefined : handleClickSelectContractWOF,
                  disabled: selectedloading || writeOffBatchs?.is_posted === 0,
                },
              ],
            },
          ]
          : []),
      ],
    },
  ];

  return (
    <>
      <Toolbar data={toolbarData} />

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmation}
        message={confirmMessage}
      />
    </>
  );
};

export default React.memo(ToolbarWriteOffBatch);
