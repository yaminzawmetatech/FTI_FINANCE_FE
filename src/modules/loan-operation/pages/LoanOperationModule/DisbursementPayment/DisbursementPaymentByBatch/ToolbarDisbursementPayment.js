import React, { useState } from "react";
import Toolbar from "components/Toolbar";
import { useParams } from "react-router";
import IosShareIcon from "@mui/icons-material/IosShare";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import ConfirmationModal from "common/ConfirmationModal";
import CommonMessage from "common/CommonMessage";

const ToolbarDisbursementPayment = ({
  isDisable,
  handleChangeStatus,
  stampDutyPayments,
  handlePosted,
  disbursementPayments,
}) => {
  const { mode, route } = useParams();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [action, setAction] = useState("");

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

  const toolbarData = [
    {
      title: "HOME",
      children: [
        {
          title: "Request",
          type: "multiple",
          children: [
            {
              icon: <MarkEmailReadIcon />,
              title: "Request For Approval",
              disabled: !isDisable || mode === "view",
              onClick: () => handleChangeStatus("Request For Approval")
            },
          ],
        },
        {
          title: "Approve",
          type: "multiple",
          children: [
            (mode === "edit" || mode === "view") && {
              icon: <CheckCircleIcon />,
              title: "Approve",
              disabled: mode === "view",
              onClick: () => {
                setAction("Approved");
                setIsConfirmModalOpen(true);
                setConfirmMessage(CommonMessage.MFC00006);
              },
            },
          ],
        },
        {
          title: "Reject",
          type: "multiple",
          children: [
            (mode === "edit" || mode === "view") && {
              icon: <CancelIcon />,
              title: "Reject",
              disabled: mode === "view",
              onClick: () => {
                setAction("Reject");
                setIsConfirmModalOpen(true);
                setConfirmMessage(CommonMessage.MFC00007);
              },
            },
          ],
        },
        {
          title: "Post",
          type: "multiple",
          children: [
            {
              icon: <IosShareIcon />,
              title: "Post",
              disabled: mode === "view" || disbursementPayments?.disbursement_status !== "approved",
              onClick: () => {
                setAction("Post");
                setIsConfirmModalOpen(true);
                setConfirmMessage(CommonMessage.MFC00008);
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

export default React.memo(ToolbarDisbursementPayment);
