import * as React from "react";
import { useState } from "react";
import { IconButton, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import TableRowMenu from "components/TableRowMenu";
import CreateEditCreditCriteriaModal from "./CreateEditCreditCriteriaModal";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteCreditCriteria,
  deleteCreditCriteriaValue,
} from "modules/credit-management/slices/creditCriteriaSlice";
import { getCreditCriteria } from "modules/credit-management/slices/creditCriteriaKeySlice";
import { showSuccessToast } from "common/ToastMessage";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateEditCreditCriteriaKeyModal from "../CreditCriteriaKeySetup/CreateEditCreditCriteriaKeyModal";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import HistoryIcon from '@mui/icons-material/History';
import VersionHistoryModal from "./VersionHistoryModal";

const CreditCriteriaTableRowMenu = (props) => {
  const { data } = props;

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.user);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openVersionHistoryModal, setOpenVersionHistoryModal] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [editValues, setEditValues] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body
  const [openEditKeyModal, setOpenEditKeyModal] = useState(false);
  const [deleteKeyFlag, setDeleteKeyFlag] = useState(false);
  const [selectedValue, setSelectedValueId] = useState();
  const [versionData, setVersionData] = useState();
  
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
    setOpenEditModal(true);
    setEditFlag(true);
    handleClose();
    setEditValues(data);
  };

  const handleEditKeyClick = () => {
    setSelectedId(data?.id);
    setOpenEditKeyModal(true);
    setEditFlag(true);
    handleClose();
    setEditValues(data);
  };

  const handleCreateClick = () => {
    setSelectedId(data?.id);
    setOpenEditModal(true);
    setEditFlag(false);
    handleClose();
    setEditValues(data);
  };

  const handleViewHistoryClick = () => {
    let value_history_id = data?.history_id ? data?.history_id : data?.value_id;
    setSelectedValueId(value_history_id);
    setOpenVersionHistoryModal(true);
    setVersionData(data);
    handleClose();
  };

  // const handleDeleteClick = () => {
  //   setIsDeleteModalOpen(true);
  //   setConfirmMessage(CommonMessage.MFC00001);
  //   setDeleteId(data?.id);
  //   setDeleteKeyFlag(false);
  // };

  const handleDeleteKeyClick = () => {
    setIsDeleteModalOpen(true);
    setConfirmMessage(CommonMessage.MFC00001);
    setDeleteId(data?.uuid);
    setDeleteKeyFlag(true);
  };

  // delete modal close
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteId([]);
  };

  const handleDeleteConfirmed = async () => {
    setIsDeleteModalOpen(false);
    try {
      if (deleteKeyFlag) {
        await dispatch(deleteCreditCriteria(deleteId)).unwrap();

        showSuccessToast(
          CommonMessage.MFS00002.replace("%s", "Credit Criteria Key")
        );
      } else {
        await dispatch(deleteCreditCriteriaValue(deleteId)).unwrap();
        showSuccessToast(
          CommonMessage.MFS00002.replace("%s", "Credit Criteria Value")
        );
      }

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
        {(auth?.permissions.includes("CreditManagement-CreditCriteriaCreate") ||
          auth.is_super === true) && (
          <MenuItem onClick={handleCreateClick} disableRipple>
            <AddCircleOutlineIcon />
            Add Value
          </MenuItem>
        )}
        {(auth?.permissions.includes("CreditManagement-CreditCriteriaUpdate") ||
          auth.is_super === true) && (
          <MenuItem onClick={handleEditClick} disableRipple>
            <EditIcon />
            Edit Value
          </MenuItem>
        )}
        {(auth?.permissions.includes("CreditManagement-CreditCriteriaSetup") ||
          auth.is_super === true) && (
          <MenuItem onClick={handleViewHistoryClick} disableRipple>
            <HistoryIcon />
            View Records
          </MenuItem>
        )}
        {(auth?.permissions.includes("CreditManagement-CreditCriteriaUpdate") ||
          auth.is_super === true) && (
          <MenuItem onClick={handleEditKeyClick} disableRipple>
            <EditNoteIcon />
            Edit Key
          </MenuItem>
        )}
        {(auth?.permissions.includes("CreditManagement-CreditCriteriaDelete") ||
          auth.is_super === true) && (
          <MenuItem onClick={handleDeleteKeyClick} disableRipple>
            <DeleteOutlineIcon />
            Delete Key
          </MenuItem>
        )}
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
      <CreateEditCreditCriteriaKeyModal
        selectedId={selectedId}
        open={openEditKeyModal}
        onClose={() => setOpenEditKeyModal(false)}
        editFlag={editFlag}
        editValues={editValues}
      />
      <VersionHistoryModal
        selectedId={selectedValue}
        open={openVersionHistoryModal}
        handleClose={() => setOpenVersionHistoryModal(false)}
        data={versionData}
      />
    </>
  );
};

export default React.memo(CreditCriteriaTableRowMenu);
