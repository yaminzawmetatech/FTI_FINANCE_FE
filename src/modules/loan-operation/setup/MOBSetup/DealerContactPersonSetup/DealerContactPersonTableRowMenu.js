import * as React from "react";
import { useState } from "react";
import { IconButton, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import TableRowMenu from "components/TableRowMenu";
import EditDealerContactPersonModal from "./EditDealerContactPersonModal";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteDealerContactPerson,
  getDealerContactPeople,
} from "modules/loan-operation/slices/dealerContactPersonSlice";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreateDealerBankModal from "../DealerBankSetup/CreateDealerBankModal";
import { useSelector } from "react-redux";

const DealerContactPersonTableRowMenu = (props) => {
  const { data, selectedDealerId, rowMenuFlag } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const auth = useSelector((state) => state.auth.user);

  const bankCreateFlag =
    auth?.permissions.includes("Treasury-CreateDealerBank") ||
    auth.is_super === true;

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
  const [openBankAccountModal, setOpenBankAccountModal] = useState(false);
  const [dealerMenuFlag, setDealerMenuFlag] = useState();

  const handleEditClick = () => {
    setOpenEditModal(true); // directly set true
    setEditFlag(true);
    handleClose();
    setEditValues(data);
    setDealerMenuFlag(rowMenuFlag);
  };

  const handleAddBankAccountClick = () => {
    setOpenBankAccountModal(true);
    setEditFlag(false);
    handleClose();
    setEditValues(data);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
    setConfirmMessage(CommonMessage.MFC00001);
    setDeleteId(data?.uuid);
    setDealerMenuFlag(rowMenuFlag);
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

      await dispatch(deleteDealerContactPerson(deleteId)).unwrap();

      showSuccessToast(
        CommonMessage.MFS00002.replace("%s", "Dealer Contact Person")
      );

      if (dealerMenuFlag) {
        dispatch(
          getDealerContactPeople({
            params: {
              dealer_id: selectedDealerId,
            },
            firstFetch: true,
          })
        );
      } else {
        await dispatch(
          getDealerContactPeople({
            firstFetch: true,
          })
        );
      }

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
        {bankCreateFlag && !rowMenuFlag && (
          <MenuItem onClick={handleAddBankAccountClick} disableRipple>
            <AccountBalanceIcon />
            Add Bank Account
          </MenuItem>
        )}
      </TableRowMenu>
      <EditDealerContactPersonModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        editFlag={editFlag}
        editValues={editValues}
        selectedDealer={selectedDealerId}
        dealerMenuFlag={dealerMenuFlag}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onDelete={handleDeleteConfirmed}
        message={confirmMessage}
      />
      <CreateDealerBankModal
        open={openBankAccountModal}
        onClose={() => setOpenBankAccountModal(false)}
        editFlag={editFlag}
        editValues={editValues}
      />
    </>
  );
};

export default React.memo(DealerContactPersonTableRowMenu);
