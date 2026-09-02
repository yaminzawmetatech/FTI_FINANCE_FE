import React, { useCallback, useState } from "react";
import Toolbar from "../../../../../components/Toolbar";
import PsychologyIcon from "@mui/icons-material/Psychology";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import CancelIcon from "@mui/icons-material/Cancel";
import EditApplicationAssessmentToolbarCancelButton from "./EditApplicationAssessmentToolbarCancelButton";
import {
  APPROVED,
  RECONSIDERATION,
  REJECTED,
} from "../../../../../constants/assessmentStatus";
import AssignUserModal from "./AssignUserModal";

const EditApplicationAssessmentToolbar = ({
  assessment,
  editAbleForm,
  handleStatusChange,
  handleSubmit,
  control,
  getValues,
  reset,
  setValue
}) => {
  const [openStatusChangeModal, setOpenStatusChangeModal] = useState(false);
  const [ status, setStatus ] = useState("");
  const [ openAssignModal, setOpenAssignModal ] = useState(false);

  // const handleOpenCancelModal = useCallback(() => {
  //   setOpenCancelModal(true);
  // }, []);

  const handleCancel = useCallback(() => {
    setOpenStatusChangeModal(true);
    setStatus("Canceled");
  }, []);

  const handleApprove = useCallback(() => {
    setOpenStatusChangeModal(true);
    setStatus("Approved");
  }, []);

  const handleReject = useCallback(() => {
    setOpenStatusChangeModal(true);
    setStatus("Rejected");
  }, []);

  const handleCloseStatusChangeModal = useCallback(() => {
    setOpenStatusChangeModal(false);
  }, []);

  const handleClickApprovedStatus = () => {
    handleStatusChange(APPROVED);
  }

  const handleClickRejectStatus = () => {
    handleStatusChange(APPROVED);
  }

  const handleReconsideration = useCallback(() => {
    setOpenAssignModal(true);
    setStatus("RECONSIDERATION");
  }, []);

  const toolbarData = [
    {
      title: "HOME",
      children: [
        {
          title: "Process",
          type: "single",
          children: [
            {
              icon: <PsychologyIcon fontSize="large" />,
              title: "Reconsideration",
              width: "6rem",
              onClick: handleReconsideration,
              disabled: !editAbleForm,
            },
            {
              icon: <CheckCircleIcon fontSize="large" />,
              title: "Approve",
              width: "4rem",
              //onClick: handleStatusChange(APPROVED),
              onClick: handleApprove,
              disabled: !editAbleForm,
            },
            {
              icon: <UnpublishedIcon fontSize="large" />,
              title: "Reject",
              width: "4rem",
              // onClick: handleStatusChange(REJECTED),
              onClick: handleReject,
              disabled: !editAbleForm,
            },
            {
              icon: <CancelIcon fontSize="large" />,
              title: "Cancel",
              width: "4rem",
              onClick: handleCancel,
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <EditApplicationAssessmentToolbarCancelButton
        open={openStatusChangeModal}
        handleClose={handleCloseStatusChangeModal}
        assessment={assessment}
        status={status}
        handleClickApprovedStatus={handleClickApprovedStatus}
        handleClickRejectStatus={handleClickRejectStatus}
        handleSubmit={handleSubmit}
        control={control}
        getValues={getValues}
        reset={reset}
        setValue={setValue}
      />
      <Toolbar data={toolbarData} />
      <AssignUserModal
        open={openAssignModal}
        onClose={() => setOpenAssignModal(false)}
        //selectedId={selectedId}
        assessment={assessment}
        handleSubmit={handleSubmit}
        control={control}
      />
    </>
  );
};

export default React.memo(EditApplicationAssessmentToolbar);
