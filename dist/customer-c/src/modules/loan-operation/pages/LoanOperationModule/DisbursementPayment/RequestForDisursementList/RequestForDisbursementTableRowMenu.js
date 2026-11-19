import * as React from "react";
import { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import TableRowMenu from "components/TableRowMenu";
import openNewWindow from "utils/windowUtils";
import KpayNotificationModal from "./KpayNotificationModal";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const RequestForDisbursementTableRowMenu = (props) => {
  const { data } = props;

 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openKpayNotificationModal, setOpenKpayNotificationModal] =
    useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
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
             `/RequestForDisbursement/disbursement/${data?.uuid}/view/${data?.contract?.uuid}`
            );
          }}
          disableRipple
        >
          <VisibilityOutlinedIcon />
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            openNewWindow(
          
              `/RequestForDisbursement/disbursement/${data?.uuid}/edit/${data?.contract?.uuid}`
            );
          }}
          disableRipple
        >
          <EditIcon />
          Edit
        </MenuItem>
        {data.category_id === 3 && 
          <MenuItem
            onClick={() => {
              setSelectedApplicationId(data.application_id);
              setOpenKpayNotificationModal(open);
              handleClose();
            }}
            disableRipple
          >
            <NotificationsActiveIcon />
            View Kpay Notification
          </MenuItem>
        }
      </TableRowMenu>
      <KpayNotificationModal
        selectedApplicationId={selectedApplicationId}
        open={openKpayNotificationModal}
        handleClose={() => setOpenKpayNotificationModal(false)}
      />
    </>
  );
};

export default React.memo(RequestForDisbursementTableRowMenu);
