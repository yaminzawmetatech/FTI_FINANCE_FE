import React, { useState } from "react";
import Toolbar from "components/Toolbar";
import { useParams } from "react-router";
import IosShareIcon from "@mui/icons-material/IosShare";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import ConfirmationModal from "common/ConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { useDispatch, useSelector } from "react-redux";
import openNewWindow from "utils/windowUtils";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AttachFileIcon from "@mui/icons-material/AttachFile";


const ToolbarBookingProcess = ({
  isDisable,
  handleChangeStatus,
  stampDutyPayments,
  handlePosted,
  selectedBooking
}) => {
  const { mode, route } = useParams();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [action, setAction] = useState("");
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);



  const handleConfirmation = () => {
    setIsConfirmModalOpen(false);
    if (action === "Approved") {
      handleChangeStatus("approved");
    } else if (action === "Reject") {
      handleChangeStatus("reject");
    } else if (action === "Post") {
      handlePosted();
    }
  };

  const isApproveDisabled =
  mode === "view" ||
  !user || // Ensure user is loaded
  user?.user_group !== selectedBooking?.data?.current_step; // Disable if user role doesn't match step


  const toolbarData = [
    {
      title: "HOME",
      children: [
        {
          title: "Approve",
          type: "multiple",
          children: [
            (mode === "edit" || mode === "view") && {
              icon: <CheckCircleIcon />,
              title: "Approve",
              // disabled: isApproveDisabled,
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
          title: "Application",
          type: "multiple",
          children: [
            (mode === "edit" || mode === "view") && {
              icon: <PeopleAltIcon />,
              title: "View Contract",
              // disabled: mode === "view",
              onClick: () => {
                openNewWindow(
                  `/contracts/${selectedBooking?.data?.contract?.uuid}/view/contract`
                );
              },
            },
            {
              icon: <PeopleAltIcon />,
              title: "Application",
              // disabled: mode === "view",
              onClick: () => {
                openNewWindow(
                  `/CreditManagement/CreateApplicationInformation/${selectedBooking?.data?.category.name}/${selectedBooking?.data?.contract?.category_id}/${selectedBooking?.data?.contract?.application.uuid}/${selectedBooking?.data?.contract?.application_id}/view`,
                );
              },
            },
          ],
        },
        // {
        //   title: "Post",
        //   type: "multiple",
        //   children: [
        //     {
        //       icon: <IosShareIcon />,
        //       title: "Post",
        //       disabled: mode === "view" || stampDutyPayments?.stamp_duty_status !== "approved",
        //       onClick: () => {
        //         setAction("Post");
        //         setIsConfirmModalOpen(true);
        //         setConfirmMessage(CommonMessage.MFC00008);
        //       },
        //     },
        //   ],
        // },

        {
          title: "Attachment",
          type: "multiple",
          children: [
            {
              icon: <AttachFileIcon />,
              title: "Sale Invoice",
              url: `/CreditManagement/ApplicationAttachment/${selectedBooking?.data?.contract?.application?.uuid}/Sale Invoice/${selectedBooking?.data?.contract?.application_id}`,
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

export default React.memo(ToolbarBookingProcess);
