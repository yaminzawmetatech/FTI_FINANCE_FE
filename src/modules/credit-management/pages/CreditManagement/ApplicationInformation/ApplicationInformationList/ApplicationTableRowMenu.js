import * as React from "react";
import { useState, useRef, useEffect } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import openNewWindow from "utils/windowUtils";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmationDialog from "components/ConfirmationDialog";
import TableRowMenu from "components/TableRowMenu";
import KpayNotificationModal from "./KpayNotificationModal";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { fetchMnetAttachments } from "modules/credit-management/slices/applicationDetailSlice";
import { checkLocked } from "modules/credit-management/slices/applicationSlice";
import { showErrorToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { useDispatch, useSelector } from "react-redux";

const ApplicationTableRowMenu = (props) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
 
  const { data, deleteData, categoryName, category, categoryId } = props;

  const [openDeleteApplicationDialog, setOpenDeleteApplicationDialog] =
    useState(false);

  const [openKpayNotificationModal, setOpenKpayNotificationModal] =
    useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState();

  const auth = useSelector((state) => state.auth.user);

  const handleFetchMnetAttachments = async () => {
    try {
      const response = await dispatch(
        fetchMnetAttachments({
          uuid: data.uuid,
          verbose: 0,
        })
      );

      // Check if the action was successful
      if (response.payload.success === true) {
        console.log(
          "Mnet Fetched Done. See log for details (storage/logs/mnetLog/mnet-oauth.log)."
        );
      }
    } catch (e) {
      console.error("Error", e);
    } finally {
    }
  };

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = async () => {
    handleClose();
    if (
      auth.user_group === "CMCO" ||
      auth.user_group === "Agent" ||
      auth.user_group === "CMCE" ||
      (data.status !== "New" &&
        data.status !== "Submitted" &&
        data.status !== "Pending")
    ) {
      openNewWindow(
        `/CreditManagement/CreateApplicationInformation/${categoryName}/${categoryId}/${data.uuid}/${data.id}`
      );
    } else {
      const response = await dispatch(
        checkLocked({
          data: {
            application_id: data.id,
          },
        })
      );
      if (response?.payload?.data) {
        if (response?.payload?.data?.response === true) {
          openNewWindow(
            `/CreditManagement/CreateApplicationInformation/${categoryName}/${categoryId}/${data.uuid}/${data.id}`
          );
        } else {
          showErrorToast(CommonMessage.MFE00020);
        }
      }
    }

    //if (
    //   data?.application_info?.mnet_file_fetched_status === 0 &&
    //   data?.partner_id === 2
    // ) {
    //   console.log("Fetching attachments for mnet");
    //   handleFetchMnetAttachments();
    // }
  };

  return (
    <>
      <ConfirmationDialog
        open={openDeleteApplicationDialog}
        onClose={() => {
          setOpenDeleteApplicationDialog(false);
        }}
        onOk={async () => {
          await deleteData(data);
          setOpenDeleteApplicationDialog(false);
        }}
        title="Confirm Delete Application Information"
        content="Are you sure you want to delete this Application Information?"
      />
      <IconButton
        size="small"
        id="basic-button"
        aria-controls={open ? "basic-menuItem" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: "1rem",
          },
        }}
      >
        <MoreVert />
      </IconButton>
      <TableRowMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            openNewWindow(
              `/CreditManagement/CreateApplicationInformation/${categoryName}/${categoryId}/${data.uuid}/${data.id}/view`
            );
          }}
          disableRipple
        >
          <VisibilityOutlinedIcon />
          View
        </MenuItem>
        {(category?.mob_status !== 1 ||
          (category?.mob_status === 1 &&
            (((auth.user_group === "CMCO" ||
              auth.user_group === "CMCE" ||
              auth.user_group === "Agent" ||
              auth.user_group === "administrator") &&
              data.status === "New") ||
              (auth.user_group !== "CMCO" &&
                auth.user_group !== "CMCE" &&
                auth.user_group !== "Agent" &&
                data.status !== "New")))) && (
          <MenuItem onClick={handleEditClick} disableRipple>
            <EditIcon />
            Edit
          </MenuItem>
        )}
        {data.category_id === 3 && (
          <MenuItem
            onClick={() => {
              setSelectedApplicationId(data.id);
              setOpenKpayNotificationModal(open);
              handleClose();
            }}
            disableRipple
          >
            <NotificationsActiveIcon />
            View Kpay Notification
          </MenuItem>
        )}
      </TableRowMenu>
      <KpayNotificationModal
        selectedApplicationId={selectedApplicationId}
        open={openKpayNotificationModal}
        handleClose={() => setOpenKpayNotificationModal(false)}
      />
    </>
  );
};

export default React.memo(ApplicationTableRowMenu);
