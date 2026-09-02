import React from "react";
import Toolbar from "../../../../components/Toolbar";
import { useSelector } from "react-redux";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const ToolbarContract = ({ prepareForContracts }) => {
  const { user } = useSelector((state) => state.auth);

  const toolbarData = [
    {
      title: "HOME",
      children: [
        {
          title: "Application",
          type: "multiple",
          children: [
            {
              icon: <PeopleAltIcon />,
              title: "View Application",
              url: `/CreditManagement/CreateApplicationInformation/${prepareForContracts?.application?.category?.name}/${prepareForContracts?.application?.category_id}/${prepareForContracts?.application?.uuid}/${prepareForContracts?.application_id}/view`,
            },
            user?.is_super === true && {
              icon: <PeopleAltIcon />,
              title: "Edit Application",
              url: `/CreditManagement/CreateApplicationInformation/${prepareForContracts?.application?.category?.name}/${prepareForContracts?.application?.category_id}/${prepareForContracts?.application?.uuid}/${prepareForContracts?.application_id}`,
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <Toolbar data={toolbarData} />
    </>
  );
};

export default React.memo(ToolbarContract);
