import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toolbar from "components/Toolbar";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import { createBooking } from "modules/loan-operation/slices/bookingProcessSlice";
import { getContracts } from "modules/loan-operation/slices/contractSlice";
import { useParams } from "react-router-dom";
import { getContractByUuid } from "modules/loan-operation/slices/contractDetailSlice";

const ToolBarRequestBooking = ({ contract, isLoading }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { application } = useSelector((state) => state.applicationDetail);
  const { subCategories } = useSelector((state) => state.subCategories);
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const { uuid } = useParams();

  // Handle Create Booking
  const checkConfirm = async () => {
    setLoading(true);
    try {
      await dispatch(
        createBooking({
          body: {
            contract_ids: [contract?.id],
          },
        })
      ).unwrap();
      showSuccessToast(CommonMessage.MFS00001.replace("%s", "Booking Process"));
      await dispatch(getContractByUuid({ uuid }));
      setLoading(false);
      setTimeout(() => {
        window.close();
      }, 5000);
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking.");
      setLoading(false);
    }
  };

  const toolbarData = [
    {
      title: "HOME",
      children: [
        ...(user?.user_group === "CMCO" ||
        user?.user_group === "CMCE" ||
        user?.user_group === "Agent"
          ? [
              {
                title: "Send Request",
                type: "multiple",
                children: [
                  {
                    icon: loading ? (
                      <CircularProgress size={20} />
                    ) : (
                      <SendIcon />
                    ),
                    title: "Send Request",
                    onClick: checkConfirm,
                    disabled: loading || contract?.is_booking === 1 || isLoading,
                  },
                ],
              },

              {
                title: "Attachment",
                type: "multiple",
                children: [
                  {
                    icon: <AttachFileIcon />,
                    title: "Sale Invoice",
                    url: `/CreditManagement/ApplicationAttachment/${contract?.application?.uuid}/Sale Invoice/${contract?.application?.id}`,
                    disabled: isLoading,
                  },
                ],
              },
              {
                title: "Application",
                type: "multiple",
                children: [
                  {
                    icon: <PeopleAltIcon />,
                    title: "Application",
                    url: `/CreditManagement/CreateApplicationInformation/${contract?.category.name}/${contract?.category_id}/${contract?.application.uuid}/${contract?.application_id}/view`,
                    disabled: isLoading,
                  },
                  // {
                  //   icon: <PeopleAltIcon />,
                  //   title: "Collaterals",
                  //   disabled: !(
                  //     contract?.application?.category_id &&
                  //     contract?.application?.sub_category_id &&
                  //     contract?.application?.application_id
                  //   ),
                  //   url: `/CreditManagement/Applications/${contract?.application?.uuid}/${contract?.application?.id}/Collaterals/${contract?.id}/contract`,
                  // },
                ],
              },
            ]
          : [
              {
                title: "Send Request",
                type: "multiple",
                children: [
                  {
                    icon: loading ? (
                      <CircularProgress size={20} />
                    ) : (
                      <SendIcon />
                    ),
                    title: "Send Request",
                    onClick: checkConfirm,
                    disabled: loading || contract?.is_booking === 1 || isLoading,
                  },
                ],
              },
              {
                title: "Attachment",
                type: "multiple",
                children: [
                  {
                    icon: <AttachFileIcon />,
                    title: "Sale Invoice",
                    url: `/CreditManagement/ApplicationAttachment/${contract?.application?.uuid}/Sale Invoice/${contract?.application?.id}`,
                    disabled: isLoading,
                  },
                ],
              },

              {
                title: "Application",
                type: "multiple",
                children: [
                  {
                    icon: <PeopleAltIcon />,
                    title: "Application",
                    url: `/CreditManagement/CreateApplicationInformation/${contract?.category.name}/${contract?.category_id}/${contract?.application.uuid}/${contract?.application_id}/view`,
                    disabled: isLoading,
                  },
                ],
              },
            ]),
      ],
    },
  ];

  return (
    <>
      {/* <ToolbarApplicationCancelButton
        open={openCancelModal}
        handleClose={handleCloseCancelModal}
        applicationResponses={applicationResponses}
      /> */}
      <Toolbar data={toolbarData} />
    </>
  );
};

export default React.memo(ToolBarRequestBooking);
