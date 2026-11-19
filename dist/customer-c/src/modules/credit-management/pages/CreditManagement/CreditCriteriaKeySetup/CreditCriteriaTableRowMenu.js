import * as React from "react";
import { useState } from "react";
import { IconButton, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import TableRowMenu from "components/TableRowMenu";
import CreateEditCreditCriteriaModal from "./CreateEditCreditCriteriaKeyModal";
import DeleteIcon from "@mui/icons-material/Delete";
import CommonMessage from "common/CommonMessage";
import { deleteCreditCriteria } from "modules/credit-management/slices/creditCriteriaSlice";
import { showSuccessToast } from "common/ToastMessage";
import { getCreditCriteria } from "modules/credit-management/slices/creditCriteriaKeySlice";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import { useDispatch } from "react-redux";

const CreditCriteriaTableRowMenu = (props) => {
  const { data } = props;

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [editValues, setEditValues] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setSelectedId(data?.id);
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
      // call delete api
      await dispatch(deleteCreditCriteria(deleteId)).unwrap();

      showSuccessToast(
        CommonMessage.MFS00002.replace("%s", "Credit Criteria Key")
      );

      await dispatch(
        getCreditCriteria({
          firstFetch: true,
        })
      );
      setConfirmMessage("");
    } catch (error) {
      console.error("Error:", error);
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
      <CreateEditCreditCriteriaModal
        selectedId={selectedId}
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

export default React.memo(CreditCriteriaTableRowMenu);
