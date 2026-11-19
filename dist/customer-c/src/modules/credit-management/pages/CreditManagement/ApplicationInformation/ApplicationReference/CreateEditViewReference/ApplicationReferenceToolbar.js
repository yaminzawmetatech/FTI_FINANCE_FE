import React from "react";
import Toolbar from "components/Toolbar";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const ApplicationReferenceToolbar = ({ id, uuid }) => {

  const toolbarData = [
    {
      title: "HOME",
      children: [
        {
          title: "Process",
          type: "single",
          children: [
            {
              icon: <AttachFileIcon fontSize="large" />,
              title: "Attachment",
              width: "5rem",
              url: `/CreditManagement/ApplicationAttachment/${uuid}/Reference Information/${id}`,
            },
          ],
        },
      ],
    },
  ];

  return <Toolbar data={toolbarData} />;
};

export default React.memo(ApplicationReferenceToolbar);
