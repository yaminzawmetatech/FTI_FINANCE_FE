import React, { useCallback, useMemo, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ClearIcon from "@mui/icons-material/Clear";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import Toolbar from "components/Toolbar";
import openNewWindow from "utils/windowUtils";
import ApplicationAssessmentListToolbarMakeAssessment from "./ApplicationAssessmentListToolbarMakeAssessment";
import ApplicationAssessmentListToolbarDeleteAssessment from "./ApplicationAssessmentListToolbarDeleteAssessment";

const ApplicationAssessmentListToolbar = ({ selectedAssessments }) => {
  const selectedAssessment = useMemo(
    () => selectedAssessments && selectedAssessments[0],
    [selectedAssessments]
  );
  const [openMakeAssessment, setOpenMakeAssessment] = useState(false);
  const [
    openDeleteAssessmentConfirmDialog,
    setOpenDeleteAssessmentConfirmDialog,
  ] = useState(false);

  const toolbarData = [
    {
      title: "HOME",
      children: [
        {
          title: "New",
          type: "single",
          children: [
            {
              icon: <AttachFileIcon fontSize="large" />,
              title: "Make Assessment",
              width: "5rem",
              onClick: (e) => {
                setOpenMakeAssessment(true);
              },
            },
            {
              icon: <SimCardDownloadIcon fontSize="large" />,
              title: "Check Assessment",
              width: "5rem",
              onClick: (e) => {
                if (selectedAssessment) {
                  openNewWindow(
                    `/CreditManagement/ApplicationAssessment/EditApplicationAssessment/${selectedAssessment?.id}`
                  );
                }
              },
            },
            {
              icon: <ClearIcon fontSize="large" />,
              title: "Delete Assessment",
              width: "5rem",
              onClick: (e) => {
                setOpenDeleteAssessmentConfirmDialog(true);
              },
            },
          ],
        },
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

  const onCloseMakeAssessment = useCallback(() => {
    setOpenMakeAssessment(false);
  }, []);

  return (
    <>
      <ApplicationAssessmentListToolbarMakeAssessment
        open={openMakeAssessment}
        onClose={onCloseMakeAssessment}
      />
      <ApplicationAssessmentListToolbarDeleteAssessment
        open={openDeleteAssessmentConfirmDialog}
        onClose={() => {
          setOpenDeleteAssessmentConfirmDialog(false);
        }}
        selectedAssessment={selectedAssessment}
      />
      <Toolbar data={toolbarData} />
    </>
  );
};

export default React.memo(ApplicationAssessmentListToolbar);
