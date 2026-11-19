import React, { useMemo, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Toolbar from "components/Toolbar";
import openNewWindow from "utils/windowUtils";
import ApplicationAssessmentListToolbarDeleteAssessment from "./ApplicationGuarantorListToolbarDelete";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import EditIcon from "@mui/icons-material/Edit";

const ApplicationAssessmentListToolbar = ({
  selectedGuarantors,
  applicationId,
  applicationUUId,
}) => {
  const selectedGuarantor = useMemo(
    () => selectedGuarantors && selectedGuarantors[0],
    [selectedGuarantors]
  );

  const [openDeleteGuarantor, setOpenDeleteGuarantor] = useState(false);

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
              title: "View Guarantor",
              width: "5rem",
              onClick: (e) => {
                if (selectedGuarantor) {
                  openNewWindow(
                    `/CreditManagement/Applications/${applicationUUId}/${applicationId}/ViewApplicationGuarantor/${selectedGuarantor?.uuid}`
                  );
                }
              },
            },
            {
              icon: <NoteAddOutlinedIcon fontSize="large" />,
              title: "Create Guarantor",
              width: "5rem",
              onClick: (e) => {
                openNewWindow(
                  `/CreditManagement/Applications/${applicationUUId}/${applicationId}/CreateApplicationGuarantor`
                );
              },
            },
            {
              icon: <EditIcon fontSize="large" />,
              title: "Edit Guarantor",
              width: "5rem",
              onClick: (e) => {
                if (selectedGuarantor) {
                  openNewWindow(
                    `/CreditManagement/Applications/${applicationUUId}/${applicationId}/EditApplicationGuarantor/${selectedGuarantor?.uuid}`
                  );
                }
              },
            },
            {
              icon: <ClearIcon fontSize="large" />,
              title: "Delete Guarantor",
              width: "5rem",
              onClick: (e) => {
                setOpenDeleteGuarantor(true);
              },
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <ApplicationAssessmentListToolbarDeleteAssessment
        open={openDeleteGuarantor}
        onClose={() => {
          setOpenDeleteGuarantor(false);
        }}
        selectedGuarantor={selectedGuarantor}
        applicationId={applicationId}
      />
      <Toolbar data={toolbarData} />
    </>
  );
};

export default React.memo(ApplicationAssessmentListToolbar);
