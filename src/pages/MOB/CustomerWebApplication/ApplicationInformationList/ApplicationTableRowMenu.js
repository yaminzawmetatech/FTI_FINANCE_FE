import * as React from "react";
import { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import openNewWindow from "../../../../utils/windowUtils";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import TableRowMenu from "../../../../components/TableRowMenu";
import KpayNotificationModal from "./KpayNotificationModal";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { fetchMnetAttachments } from "features/application/applicationDetailSlice";
import { useDispatch, useSelector } from "react-redux";

const ApplicationTableRowMenu = (props) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { data, deleteData } = props;

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
      if (response.payload.success === true) {
        console.log(
          "Mnet Fetched Done. See log for details (storage/logs/mnetLog/mnet-oauth.log)."
        );
      }
    } catch (e) {
      console.error("Error", e);
    }
  };

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // ✅ Removed lock logic (no checkLocked dispatch anymore)
  const handleEditClick = () => {
    handleClose();
    openNewWindow(
      `/CreditManagement/CustomerWebApplicationInformation/${data.uuid}/${data.id}`
    );

    // Optional: uncomment if you still want to auto-fetch mnet attachments
    // if (
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
        onClose={() => setOpenDeleteApplicationDialog(false)}
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
        {/* View */}
        {/* <MenuItem
          onClick={() => {
            handleClose();
            openNewWindow(
              `/CreditManagement/CustomerWebApplicationInformation/${data.uuid}/${data.id}/view`
            );
          }}
          disableRipple
        >
          <VisibilityOutlinedIcon />
          View
        </MenuItem> */}

        {/* Edit */}
        <MenuItem onClick={handleEditClick} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>

      </TableRowMenu>
    </>
  );
};

export default React.memo(ApplicationTableRowMenu);
