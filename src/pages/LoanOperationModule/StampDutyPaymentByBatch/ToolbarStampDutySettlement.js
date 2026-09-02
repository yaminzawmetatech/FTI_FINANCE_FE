import React, { useState } from "react";
import Toolbar from "components/Toolbar";
import { useParams } from "react-router";
import IosShareIcon from "@mui/icons-material/IosShare";
import CommonMessage from "common/CommonMessage";
import ConfirmationModal from "common/ConfirmationModal";

const ToolbarStampDutySettlement = ({
  handleSubmit,
  onSubmit,
  stampDutyPayments
}) => {
  const { mode } = useParams();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // for confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for confirm message body

  const toolbarData = [
    {
      title: "HOME",
      children: [
        {
          title: "Post",
          type: "multiple",
          children: [
           {
              icon: <IosShareIcon />,
              title: "Post",
              disabled: mode === "view" || stampDutyPayments?.is_settled === true,
             onClick: () => {
                setIsConfirmModalOpen(true);
                setConfirmMessage(CommonMessage.MFC00005);
              }
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
        onConfirm={() => {
          setIsConfirmModalOpen(false);
          handleSubmit(onSubmit())();
        }}
        message={confirmMessage}
      />
    </>
  );
};

export default React.memo(ToolbarStampDutySettlement);
