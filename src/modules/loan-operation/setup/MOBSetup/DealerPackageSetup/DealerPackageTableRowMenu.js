import * as React from "react";
import { useState } from "react";
import { IconButton, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TableRowMenu from "components/TableRowMenu";
import CreateEditDealerPackageModal from "./CreateEditDealerPackageModal";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDealerPackage,
  getDealerPackages,
} from "modules/loan-operation/slices/dealerPackageSlice";

const DealerPackageTableRowMenu = (props) => {
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // For delete confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // For delete confirm message body
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleEditClick = () => {
    setOpenEditModal(true); // Directly set true
    setEditFlag(true);
    handleClose();
    setEditValues(data);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
    setConfirmMessage(CommonMessage.MFC00001); // Message for confirmation
    setDeleteId(data?.uuid);
  };

  // Delete modal close
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteId([]);
  };

  const handleDeleteConfirmed = async () => {
    setIsDeleteModalOpen(false);
    try {
      // Call delete API
      await dispatch(deleteDealerPackage(deleteId)).unwrap();

      showSuccessToast(CommonMessage.MFS00002.replace("%s", "Dealer Package"));

      await dispatch(
        getDealerPackages({
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
      </TableRowMenu>

      <CreateEditDealerPackageModal
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
    </>
  );
};

export default React.memo(DealerPackageTableRowMenu);
