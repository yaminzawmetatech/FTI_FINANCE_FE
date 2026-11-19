import React, { useCallback, useMemo, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Toolbar from "components/Toolbar";
import openNewWindow from "utils/windowUtils";
import ApplicationReferenceDeleteToolbar from "./ApplicationReferenceListToolbarDelete";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import EditIcon from "@mui/icons-material/Edit";

const ApplicationReferenceListToolbar = ({ selectedReferences, applicationId, applicationUUId }) => {
  const selectedReference = useMemo(
    () => selectedReferences && selectedReferences[0],
    [selectedReferences]
  );

  const [ openDeleteReference, setOpenDeleteReference] = useState(false);

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
              title: "View Reference",
              width: "5rem",
              onClick: (e) => {
                if (selectedReference) {
                  openNewWindow(
                    `/CreditManagement/Applications/Reference/${applicationUUId}/${applicationId}/ViewApplicationReference/${selectedReference?.uuid}`
                  );
                }
              },
            },
            {
              icon: <NoteAddOutlinedIcon fontSize="large" />,
              title: "Create Reference",
              width: "5rem",
              onClick: (e) => {
                  openNewWindow(
                    `/CreditManagement/Applications/Reference/${applicationUUId}/${applicationId}/CreateApplicationReference`
                  );
              },
            },
            {
              icon: <EditIcon fontSize="large" />,
              title: "Edit Reference",
              width: "5rem",
              onClick: (e) => {
                if (selectedReference) {
                  openNewWindow(
                    `/CreditManagement/Applications/Reference/${applicationUUId}/${applicationId}/EditApplicationReference/${selectedReference?.uuid}`
                  );
                }
              },
            },
            {
              icon: <ClearIcon fontSize="large" />,
              title: "Delete Reference",
              width: "5rem",
              onClick: (e) => {
                setOpenDeleteReference(true);
              },
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <ApplicationReferenceDeleteToolbar
        open={openDeleteReference}
        onClose={() => {
          setOpenDeleteReference(false);
        }}
        selectedReference={selectedReference}
        applicationId={applicationId}
      />
      <Toolbar data={toolbarData} />
    </>
  );
};

export default React.memo(ApplicationReferenceListToolbar);
