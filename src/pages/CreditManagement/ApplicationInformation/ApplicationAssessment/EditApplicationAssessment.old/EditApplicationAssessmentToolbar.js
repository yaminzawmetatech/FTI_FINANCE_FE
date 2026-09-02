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

const EditApplicationAssessmentToolbar = ({
  assessment,
  editAbleForm,
  handleStatusChange,
}) => {
  const [openCancelModal, setOpenCancelModal] = useState(false);

  const handleOpenCancelModal = useCallback(() => {
    setOpenCancelModal(true);
  }, []);

  const handleCloseCancelModal = useCallback(() => {
    setOpenCancelModal(false);
  }, []);

  const toolbarData = [
    {
      title: "HOME",
      children: [
        // {
        //   title: "Manage",
        //   type: "single",
        //   children: [
        //     {
        //       icon: <ContentPasteSearchIcon fontSize="large" />,
        //       title: "View",
        //     },
        //     {
        //       icon: <EditIcon fontSize="large" />,
        //       title: "Edit",
        //     },
        //   ],
        // },
        {
          title: "Process",
          type: "single",
          children: [
            // {
            //   icon: <ContentPasteSearchIcon fontSize="large" />,
            //   title: "Further Investigation",
            //   width: "5rem",
            // },
            {
              icon: <PsychologyIcon fontSize="large" />,
              title: "Reconsideration",
              width: "6rem",
              onClick: handleStatusChange(RECONSIDERATION),
              disabled: !editAbleForm,
            },
            {
              icon: <CheckCircleIcon fontSize="large" />,
              title: "Approve",
              width: "4rem",
              onClick: handleStatusChange(APPROVED),
              disabled: !editAbleForm,
            },
            {
              icon: <UnpublishedIcon fontSize="large" />,
              title: "Reject",
              width: "4rem",
              onClick: handleStatusChange(REJECTED),
              disabled: !editAbleForm,
            },
            {
              icon: <CancelIcon fontSize="large" />,
              title: "Cancel",
              width: "4rem",
              onClick: handleOpenCancelModal,
            },
          ],
        },

        // {
        //   title: "Application",
        //   type: "single",
        //   children: [
        //     {
        //       icon: <PersonIcon fontSize="large" />,
        //       title: "Application",
        //       url: assessment ? `/CreditManagement/CreateApplicationInformation/${assessment.category.name}/${assessment.category.id}/${assessment.application_uuid}/${assessment.application_id}` : "",
        //     },
        //   ],
        // },
        // {
        //   title: "In House Survey",
        //   type: "single",
        //   children: [
        //     {
        //       icon: <DescriptionIcon fontSize="large" />,
        //       title: "In House Survey",
        //       url: "/CreditManagement/InHouseSurvey",
        //     },
        //   ],
        // },
        // {
        //   title: "PMT Calculator",
        //   type: "single",
        //   children: [
        //     {
        //       icon: <CalculateIcon fontSize="large" />,
        //       title: "PMT Calculator",
        //     },
        //   ],
        // },
        // {
        //   title: "Page",
        //   type: "single",
        //   children: [
        //     {
        //       icon: <CachedIcon fontSize="large" />,
        //       title: "Refresh",
        //       width: "4rem",
        //     },
        //     {
        //       icon: <FilterAltOffIcon fontSize="large" />,
        //       width: "4rem",
        //       title: "Clear Filter",
        //     },
        //   ],
        // },
      ],
    },
  ];

  return (
    <>
      <EditApplicationAssessmentToolbarCancelButton
        open={openCancelModal}
        handleClose={handleCloseCancelModal}
        assessment={assessment}
      />
      <Toolbar data={toolbarData} />
    </>
  );
};

export default React.memo(EditApplicationAssessmentToolbar);
