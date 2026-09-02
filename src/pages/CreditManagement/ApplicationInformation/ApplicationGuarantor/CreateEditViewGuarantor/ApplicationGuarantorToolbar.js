import React from "react";
import Toolbar from "../../../../../components/Toolbar";
import { useDispatch } from "react-redux";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const ApplicationGuarantorToolbar = ({ id, uuid }) => {
  const dispatch = useDispatch();

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
              url: `/CreditManagement/ApplicationAttachment/${uuid}/Guarantor Information/${id}`,
            },
          ],
        },
      ],
    },
  ];

  return <Toolbar data={toolbarData} />;
};

export default React.memo(ApplicationGuarantorToolbar);
