import React from "react";
import Toolbar from "../../../../../components/Toolbar";
import { useDispatch } from "react-redux";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import openNewWindow from "utils/windowUtils";
import EditIcon from "@mui/icons-material/Edit";
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { getCollateralByUuid, updateCollateralStatusChange } from "features/collateral/collateralSlice";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useParams } from "react-router-dom";

const ApplicationCollateralToolbar = ({ id, uuid, status, applicationUUId, contract, application, mode, auth }) => {

  const dispatch = useDispatch();
  const handleClickCOR = () => {
    openNewWindow(
      `/loan-module/sign-collateral/${uuid}/${id}/COR`
    );
  };

  const handleClickBothSign = () => {
    if (!status) {
      // Handle case where status does not have work or is invalid
      console.error("Status is invalid or missing");
      return; // Exit early if status is not provided
    }

    const url =
      status === "Uncollected"
        ? `/loan-module/sign-collateral/${uuid}/${id}/UncollectedLC`
        : `/loan-module/sign-collateral/${uuid}/${id}/CollectedLC`;

    openNewWindow(url);
  };

  const handleCollectedClick = async () => {
    try {
      await dispatch(updateCollateralStatusChange({
        data: { status: "Collected" },
        uuid: uuid
      })).unwrap();

      showSuccessToast(CommonMessage.MFS00006);
    } catch (error) {
      console.error("Error updating change status collateral:", error);
    } finally {
      // Always call, even if success or error
      await dispatch(getCollateralByUuid({ uuid })).unwrap();
    }
  };


  const handleReceivedClick = async () => {
    try {
      await dispatch(updateCollateralStatusChange({
        data: {
          status: "Received"
        },
        uuid: uuid
      })).unwrap();
      showSuccessToast(CommonMessage.MFS00007);
    } catch (error) {
      console.error("Error updating change status collateral:", error);
    } finally {
      await dispatch(getCollateralByUuid({ uuid })).unwrap();
    }
  };


  const handleClickViewContract = () => {
    const url = `/contracts/${contract?.uuid}/view/contract`;
    openNewWindow(url);
  };

  const isDisabled = mode === "view" || ["Collected", "Received"].includes(status);



  const toolbarData = [
    {
      title: "HOME",
      children: [
        {
          title: "Process",
          type: "multiple",
          children: [
            {
              icon: <AttachFileIcon fontSize="large" />,
              title: "Collateral Attachment",
              width: "5rem",
              url: `/CreditManagement/ApplicationAttachment/${applicationUUId}/Collateral Information/${id}`,
              disabled: mode === "view",
            },
          ],
        },
        ...(auth.user_group === "Loan Operation Manager" || auth.is_super === true) ? [
          {
            title: "Collection",
            type: "multiple",
            children: [
              {
                icon: <LibraryAddCheckIcon />,
                title: "Received",
                onClick: handleReceivedClick,
                disabled: mode === "view" || status === "Received",
              },
            ],
          }] : [
          {
            title: "Collection",
            type: "multiple",
            children: [
              {
                icon: <LibraryAddCheckIcon />,
                title: "Collected",
                onClick: handleCollectedClick,
                disabled: mode === "view" || status === "Collected" || status === "Received",
              },
            ],
          }
        ],
        {
          title: "Signature",
          type: "multiple",
          children: [
            {
              icon: <EditIcon />,
              title: "COR Sign",
              onClick: handleClickCOR,
              disabled: mode === "view",
            },
            {
              icon: <EditIcon />,
              title: "LC Sign",
              onClick: handleClickBothSign,
              disabled: mode === "view",
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
              url: `/CreditManagement/CreateApplicationInformation/${contract?.category.name}/${contract?.category_id}/${applicationUUId}/${contract?.application_id}/view`,
            },
            {
              icon: <PeopleAltIcon />,
              title: "Contract",
              onClick: handleClickViewContract,
            },
          ],
        },

      ],
    },
  ];

  return <Toolbar data={toolbarData} />;
};

export default React.memo(ApplicationCollateralToolbar);
