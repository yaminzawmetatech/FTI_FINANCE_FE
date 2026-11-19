import React, { useState } from "react";
import Toolbar from "components/Toolbar";
import { useParams } from "react-router";
import IosShareIcon from "@mui/icons-material/IosShare";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import ConfirmationModal from "common/ConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { useDispatch } from "react-redux";
import { updateContractByUuid } from "modules/loan-operation/slices/contractSlice";
import { showSuccessToast } from "common/ToastMessage";
import openNewWindow from "utils/windowUtils";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";


const ToolbarBookingProcess = ({
  isDisable,
  handleSubmit,
  onSubmit,
  selectedBooking
}) => {
  const dispatch = useDispatch();
  const { mode, contract } = useParams();


  const handleChangeStatus = async () => { 
    try {
      await dispatch(
        updateContractByUuid({
          id: contract,
          newData: {
            request_for_disbursement: 1,
          },
        })
      );

      showSuccessToast(CommonMessage.MFS00008);
      setTimeout(() => {
        window.close();
      }, 5000);
    } catch (error) {
      console.error("Failed to update contract:", error);
    }
};

  const toolbarData = [
    {
      title: "HOME",
      children: [
        {
          title: "Request For Disbursement",
          type: "multiple",
          children: [
            (mode === "edit" || mode === "view") && {
              icon: <CheckCircleIcon />,
              title: "Request For Disbursement",
              disabled: mode === "view",
              onClick:handleChangeStatus,
            },
          ],
        },
        {
          title: "Application",
          type: "multiple",
          children: [
            (mode === "edit" || mode === "view") && {
              icon: <PeopleAltIcon />,
              title: "View Contract",
              disabled: mode === "view",
              onClick: () => {
                openNewWindow(
                  `/contracts/${selectedBooking?.data?.contract?.uuid}/view/contract`
                );
              },
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

export default React.memo(ToolbarBookingProcess);
