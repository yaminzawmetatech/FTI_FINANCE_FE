import * as React from "react";
import { useState } from "react";
import { IconButton, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import CreateEditCustomerInquiriesModal from "./CreateEditCustomerInquiriesModal";
import useCustomerInquiriesForm from "./CustomerInquiriesHook";
import TableRowMenu from "components/TableRowMenu";
import { useSelector } from "react-redux";
import EditNoteIcon from '@mui/icons-material/EditNote';

const CustomerInquiriesTableRowMenu = (props) => {
  const { data } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { openEditModal, setOpenEditModal } = useCustomerInquiriesForm();
  
  const auth = useSelector((state) => state.auth.user);

  const formEditFlag =
  auth?.permissions.includes("EditCustomerInquiryForm") ||
  auth.is_super === true;

  const formActionFlag =
  auth?.permissions.includes("EditActionCustomerInquiryForm") ||
  auth.is_super === true;
  
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [editFlag, setEditFlag] = useState(false);
  const [editValues, setEditValues] = useState([]);
  const [actionFlag, setActionFlag] = useState(false);

  const handleEditClick = () => {
    setOpenEditModal(true); // directly set true
    setEditFlag(true);
    handleClose();
    setEditValues(data);
    setActionFlag(false);
  };

  const handleActionClick = () => {
    setOpenEditModal(true); // directly set true
    setEditFlag(true);
    handleClose();
    setEditValues(data);
    setActionFlag(true);
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
        {formActionFlag && 
          <MenuItem onClick={handleActionClick} disableRipple>
            <EditIcon />
            Take Action
          </MenuItem>
        }
         {formEditFlag && 
          <MenuItem onClick={handleEditClick} disableRipple>
            <EditNoteIcon />
            Edit
          </MenuItem>
        }
      </TableRowMenu>
      <CreateEditCustomerInquiriesModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        editFlag={editFlag}
        editValues={editValues}
        actionFlag={actionFlag}
      />
    </>
  );
};

export default React.memo(CustomerInquiriesTableRowMenu);
