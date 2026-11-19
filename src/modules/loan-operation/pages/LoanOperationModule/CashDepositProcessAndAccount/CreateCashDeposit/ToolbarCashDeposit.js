import React, { useState } from "react";
import Toolbar from "components/Toolbar";
import { useParams } from "react-router";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import ConfirmationModal from "common/ConfirmationModal";
import CommonMessage from "common/CommonMessage";
import IosShareIcon from "@mui/icons-material/IosShare";

const ToolbarCashDeposit = ({ isDisable, handleChangeStatus, handlePostCashDeposit }) => {
  const { mode } = useParams();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [action, setAction] = useState("");

  const handleConfirmation = () => {
    setIsConfirmModalOpen(false);
    if (action === "Approved") {
      handleChangeStatus("Approved");
    } else if (action === "Reject") {
      handleChangeStatus("Reject");
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
              onClick: () => handleChangeStatus("Request For Approval"),
            },
          ],
        },
        {
          title: "Approve",
          type: "multiple",
          children: [
            (mode === "edit" || mode === "view") && {
              icon: <CheckCircleIcon />,
              title: "Approved",
              disabled: mode === "view",
              onClick: () => {
                setAction("Approved");
                setIsConfirmModalOpen(true);
                setConfirmMessage(CommonMessage.MFC00006);
              },
            }
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

            (mode === "edit" || mode === "view") && {
              icon: <IosShareIcon />,
              title: "Post",
              onClick: () => handlePostCashDeposit(),
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

export default React.memo(ToolbarCashDeposit);
