import React, { useCallback, useMemo, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Toolbar from "../../../../../components/Toolbar";
import openNewWindow from "../../../../../utils/windowUtils";
import JointApplicantListToolbarDeleteAssessment from "./JointApplicantListToolbarDelete";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import EditIcon from "@mui/icons-material/Edit";

const JointApplicantListToolbar = ({ selectedJointApplicants, applicationId, applicationUUId }) => {
  const selectedJointApplicant = useMemo(
    () => selectedJointApplicants && selectedJointApplicants[0],
    [selectedJointApplicants]
  );

  const [ openDeleteJointAppliant, setOpenDeleteJointAppliant] = useState(false);

  const toolbarData = [
    {
      title: "HOME",
      children: [
        {
          title: "Process",
          type: "single",
          children: [
            {
              icon: <PeopleAltIcon fontSize="large" />,
              title: "View Joint Applicant",
              width: "5rem",
              onClick: (e) => {
                if (selectedJointApplicant) {
                  openNewWindow(
                    `/CreditManagement/Applications/JointApplicant/${applicationUUId}/${applicationId}/ViewApplicationJointApplicant/${selectedJointApplicant?.uuid}`
                  );
                }
              },
            },
            {
              icon: <NoteAddOutlinedIcon fontSize="large" />,
              title: "Create Joint Applicant",
              width: "5rem",
              onClick: (e) => {
                  openNewWindow(
                    `/CreditManagement/Applications/JointApplicant/${applicationUUId}/${applicationId}/CreateApplicationJointApplicant`
                  );
              },
            },
            {
              icon: <EditIcon fontSize="large" />,
              title: "Edit Joint Applicant",
              width: "5rem",
              onClick: (e) => {
                if (selectedJointApplicant) {
                  openNewWindow(
                    `/CreditManagement/Applications/JointApplicant/${applicationUUId}/${applicationId}/EditApplicationJointApplicant/${selectedJointApplicant?.uuid}`
                  );
                }
              },
            },
            {
              icon: <ClearIcon fontSize="large" />,
              title: "Delete Joint Applicant",
              width: "5rem",
              onClick: (e) => {
                setOpenDeleteJointAppliant(true);
              },
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <JointApplicantListToolbarDeleteAssessment
        open={openDeleteJointAppliant}
        onClose={() => {
          setOpenDeleteJointAppliant(false);
        }}
        selectedJointApplicant={selectedJointApplicant}
        applicationId={applicationId}
      />
      <Toolbar data={toolbarData} />
    </>
  );
};

export default React.memo(JointApplicantListToolbar);
