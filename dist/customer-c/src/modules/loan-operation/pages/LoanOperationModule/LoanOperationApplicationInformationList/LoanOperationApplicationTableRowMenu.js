import * as React from "react";
import { useState, useRef, useEffect } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import CommonMessage from "common/CommonMessage";
import { showErrorToast } from "common/ToastMessage";
import openNewWindow from "utils/windowUtils";
import ConfirmationDialog from "components/ConfirmationDialog";
import TableRowMenu from "components/TableRowMenu";
import { checkLocked } from "modules/credit-management/slices/applicationSlice";

const ApplicationTableRowMenu = (props) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { data, deleteData } = props;

  const [openDeleteApplicationDialog, setOpenDeleteApplicationDialog] =
    useState(false);

  const auth = useSelector((state) => state.auth.user);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = async () => {
    handleClose();
   
      openNewWindow(
        `/CreditManagement/ApplicationInformation/loan/${data?.category.name}/${data.category_id}/${data.uuid}/${data.id}`
      );
    

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
              `/CreditManagement/ApplicationInformation/loan/${data?.category.name}/${data.category_id}/${data.uuid}/${data.id}/view`
            );
          }}
          disableRipple
        >
          <VisibilityOutlinedIcon />
          View
        </MenuItem>
      </TableRowMenu>
    </>
  );
};

export default React.memo(ApplicationTableRowMenu);
