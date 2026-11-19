import * as React from "react";
import {
  useState,
} from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import openNewWindow from "utils/windowUtils";
import EditIcon from "@mui/icons-material/Edit";
import TableRowMenu from "components/TableRowMenu";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { deleteEarlyTerminationProcess, getAllEarlyTerminationProcesses } from "modules/collection/slices/earlyTerminationProcessSlice";
import { showSuccessToast } from "common/ToastMessage";
import { useDispatch, useSelector } from "react-redux";

const EarlyTerminationTableRowMenu = (selectedData) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body
  const [deleteData, setDeleteData] = useState([]); // want to delete data

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleButtonClick = (row) => {
    setIsDeleteModalOpen(true);
    setConfirmMessage(CommonMessage.MFC00001);
    setDeleteData(row);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setConfirmMessage(CommonMessage.MFC00001);
  };

  const handleDeleteConfirmed = async () => {
    setIsDeleteModalOpen(false);
    try {
      await dispatch(deleteEarlyTerminationProcess({uuid: deleteData.uuid})).unwrap();
      showSuccessToast(
        CommonMessage.MFS00002.replace("%s", "Early Termination Process")
      );
      await dispatch( getAllEarlyTerminationProcesses({
        firstFetch: true,
      }));
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
        <MenuItem
          onClick={() => {
            handleClose();
            openNewWindow(
              `/collection-module/early-termination-process/${selectedData.data.uuid}/view`
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
              `/collection-module/early-termination-process/${selectedData.data.uuid}/edit`
            );
          }}
          disableRipple
        >
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleButtonClick(selectedData.data);
          }}
          disableRipple
        >
          <DeleteIcon />
          Delete
        </MenuItem>
      </TableRowMenu>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onDelete={handleDeleteConfirmed}
        message={confirmMessage}
      />
    </>
  );
};

export default React.memo(EarlyTerminationTableRowMenu);
