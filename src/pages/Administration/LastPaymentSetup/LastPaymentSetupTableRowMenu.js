import * as React from "react";
import { useState } from "react";
import { IconButton, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import CreateLastPaymentSetupModal from "./LastPaymentSetupModal";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import TableRowMenu from "components/TableRowMenu";
import { deleteLastPayment, getLastPayments } from "features/lastPaymentSetup/lastPaymentSlice";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LastPaymentHistoryModal from "./LastPaymentHistoryModal";

const LastPaymentSetupTableRowMenu = (props) => {
  const { data } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch();
  
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
  const [deleteId, setDeleteId] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openHistoryModal, setOpenHistoryModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);


  const handleEditClick = () => {
    setOpenEditModal(true); // directly set true
    setEditFlag(true);
    handleClose();
    setEditValues(data);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
    setConfirmMessage(CommonMessage.MFC00001);
    setDeleteId(data?.uuid);
  };

  const handleVersionHistoryClick = () => {
    setOpenHistoryModal(true);
    setEditValues(data);
  };

  // delete modal close
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteId([]);
  };

  const handleDeleteConfirmed = async () => {
    setIsDeleteModalOpen(false);
    try {
      //call delete api

      await dispatch(deleteLastPayment(deleteId)).unwrap();

      showSuccessToast(CommonMessage.MFS00002.replace("%s", "Last Payment Setup"));

      await dispatch(
        getLastPayments({
          firstFetch: true,
        })
      );
      setConfirmMessage("");
    } catch (error) {
      console.error("Error", error);
    }
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
        <MenuItem onClick={handleEditClick} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteClick} disableRipple>
          <DeleteIcon />
          Delete
        </MenuItem>
        <MenuItem onClick={handleVersionHistoryClick} disableRipple>
          <AccessTimeIcon />
          Version History
        </MenuItem>
      </TableRowMenu>

      <CreateLastPaymentSetupModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        editFlag={editFlag}
        editValues={editValues}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onDelete={handleDeleteConfirmed}
        message={confirmMessage}
      />
      <LastPaymentHistoryModal
        open={openHistoryModal}
        onClose={() => setOpenHistoryModal(false)}
        editValues={editValues}
      />
    </>
  );
};

export default React.memo(LastPaymentSetupTableRowMenu);
