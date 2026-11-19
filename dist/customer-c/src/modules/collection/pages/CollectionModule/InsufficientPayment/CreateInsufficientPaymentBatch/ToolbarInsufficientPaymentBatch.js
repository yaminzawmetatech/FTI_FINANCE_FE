import React, { useState, useEffect } from "react";
import Toolbar from "components/Toolbar";
import { useParams } from "react-router";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import ConfirmationModal from "common/ConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "modules/administration/slices/usersSlice";
import openNewWindow from "utils/windowUtils";
import GradingIcon from '@mui/icons-material/Grading';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ToolbarInsufficientPaymentBatch = ({
  handleChangeStatus,
  insufficientPaymentBatchs,
  selectedRows,
  handlePosted,
  handleChangeRejectStatus
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

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, insufficientPaymentBatchs?.id, auth?.user_group]);

  const handleConfirmation = () => {
    setIsConfirmModalOpen(false);
    if (action === "Approved") {
      handleChangeStatus("Approved");
    } else if (action === "Reject") {
      handleChangeRejectStatus();
    } else if (action === "Apply") {
      handlePosted();
    }
  };

  const showApply =
    auth?.permissions.includes("Insufficient-Apply") ||
    auth.is_super === true;

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
                  disabled: mode === "view" || 
                  insufficientPaymentBatchs?.status !== "open",
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
              disabled: mode === "view" ||
                (auth?.user_group !== insufficientPaymentBatchs?.current_step && auth?.user_group !== "administrator") || 
                insufficientPaymentBatchs?.status === "Rejected" || insufficientPaymentBatchs?.status === "Approved" ,
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
              disabled: mode === "view" ||
                (auth?.user_group !== insufficientPaymentBatchs?.current_step && auth?.user_group !== "administrator")|| 
                insufficientPaymentBatchs?.status === "Rejected" || insufficientPaymentBatchs?.status === "Approved",
              onClick: () => {
                setAction("Reject");
                setConfirmMessage(CommonMessage.MFC00007);
                setIsConfirmModalOpen(true);
              },
            },
          ].filter(Boolean),
        },
        {
          title: "Accounting",
          type: "multiple",
          children: [
            {
              icon: <GradingIcon />,
              title: "Apply",
              disabled: mode === "view" || !showApply || insufficientPaymentBatchs?.is_applied === 1,
              onClick: () => {
                setAction("Apply");
                setIsConfirmModalOpen(true);
                setConfirmMessage(CommonMessage.MFC00015);
              },
            },
            {
              icon: <VisibilityIcon />,
              title: "View Records",
              disabled: mode === "view" ||  insufficientPaymentBatchs?.is_applied === 0,
              onClick: () => {
                openNewWindow(`/collection-module/repayment/${uuid}/applied-settlement-data/insufficient-payments`);
              },
            },
          ],
        },
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

export default React.memo(ToolbarInsufficientPaymentBatch);
