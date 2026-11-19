import React, { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import TableRowMenu from "components/TableRowMenu";
import openNewWindow from "utils/windowUtils";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import CommonMessage from "common/CommonMessage";
import { showSuccessToast } from "common/ToastMessage";
import { deletePrepareForContract, getPrepareForContracts } from "modules/loan-operation/slices/prepareForContractSlice";
import { useSearchParams } from "react-router-dom";

const PrepareForContractTableRowMenu = (props) => {
  const { data } = props;
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState([]);

  const auth = useSelector((state) => state.auth.user);

  const [params, setParams] = useSearchParams();
  const uuids = params.getAll("uuids");

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = (row) => {
    handleClose();
    setIsDeleteModalOpen(true);
    setConfirmMessage(CommonMessage.MFC00001);
    setDeleteData(row);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteData([]);
  };

  const handleDeleteConfirmed = async () => {
    setIsDeleteModalOpen(false);
    try {

      await dispatch(deletePrepareForContract(deleteData.uuid)).unwrap();
     
      showSuccessToast(
        CommonMessage.MFS00002.replace("%s", "Data")
      );
       
      setConfirmMessage("");
      if (uuids.length > 0) {
      dispatch(
        getPrepareForContracts({
          firstFetch: true,
          params: {
            uuids: JSON.stringify(uuids),
            is_submitted: 0,
          },
        })
      );
    } else {
      dispatch(
        getPrepareForContracts({
          firstFetch: true,
          params: {
            is_submitted: 0,
          },
        })
      );
    }
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
        <MenuItem
          onClick={() => {
            handleClose();
            openNewWindow(`/preparation-for-contracts/${data.uuid}/view`);
          }}
          disableRipple
        >
          <VisibilityOutlinedIcon />
          View Preparation For Contract
        </MenuItem>
        {(data?.application?.category?.mob_status === 1) && (
          <MenuItem
            onClick={() => {
              handleClose();
              openNewWindow(
                `/CreditManagement/ApplicationInformation/loan/${data?.application?.category?.name}/${data?.application?.category?.id}/${data?.application?.uuid}/${data?.application?.id}/view`
              );
            }}
            disableRipple
          >
            <VisibilityOutlinedIcon />
            View Initial Payment Calculation
          </MenuItem>
        )}
        {(data?.application?.category?.mob_status === 1 && auth?.is_super) && (
          <MenuItem
          onClick={() => handleDeleteClick(data)} 
            disableRipple
          >
            <DeleteIcon />
            Delete
          </MenuItem>
        )}
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

export default React.memo(PrepareForContractTableRowMenu);
