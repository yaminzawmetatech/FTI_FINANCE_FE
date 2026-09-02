import React, { useCallback, useState, useMemo } from "react";
import Toolbar from "components/Toolbar";
import PsychologyIcon from "@mui/icons-material/Psychology";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AttachFileIcon from '@mui/icons-material/AttachFile';

const EditApplicationDownPaymentToolbar = ({
  editAbleForm,
  handleStatusChange,
  downPayment
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

  const toolbarData = useMemo(
    () => [
      {
        title: "HOME",
        children: [
          {
            title: "Status",
            type: "single",
            children: [
              {
                icon: <CheckCircleIcon />,
                title: "Completed",
                onClick: handleStatusChange("completed"),
                disabled: !editAbleForm
              },
            ],
          },
          // {
          //   title: "Process",
          //   type: "Multiple",
          //   children: [
          //     {
          //       icon: <AttachFileIcon />,
          //       title: "Attachment",
          //       url: `/loan-module/attachment/${downPayment?.application?.uuid}/Application Downpayment/${downPayment?.application?.id}`,
          //     },
          //   ],
          // },
        ],
      },
    ],
    [handleStatusChange]
  );

  return (
    <>
      <Toolbar data={toolbarData} />
    </>
  );
};

export default React.memo(EditApplicationDownPaymentToolbar);
