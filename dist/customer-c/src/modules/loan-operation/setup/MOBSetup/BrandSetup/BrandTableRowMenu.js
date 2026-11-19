import * as React from "react";
import { useState } from "react";
import { IconButton, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import TableRowMenu from "components/TableRowMenu";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteBrand, getBrands } from "modules/loan-operation/slices/BrandSlice";
import CreateEditBrandModal from "./CreateEditBrandModal";

const BrandTableRowMenu = (props) => {
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

  // delete modal close
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteId([]);
  };

  const handleDeleteConfirmed = async () => {
    setIsDeleteModalOpen(false);
    try {
      await dispatch(deleteBrand({uuid :deleteId})).unwrap();

      showSuccessToast(CommonMessage.MFS00002.replace("%s", "Brand"));

      await dispatch(
        getBrands({
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

      <CreateEditBrandModal
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

export default React.memo(BrandTableRowMenu);
