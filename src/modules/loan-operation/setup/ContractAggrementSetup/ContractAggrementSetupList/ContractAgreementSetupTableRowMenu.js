import * as React from "react";
import { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton, MenuItem } from "@mui/material";
import { Delete, MoreVert } from "@mui/icons-material";
import openNewWindow from "utils/windowUtils";
import EditIcon from "@mui/icons-material/Edit";
import TableRowMenu from "components/TableRowMenu";
import { dispatch } from "store";
import {
  deleteContractAgreementSetup,
  getAllContractAgreements,
} from "modules/loan-operation/slices/contractAggrementSetupSlice";
import CommonMessage from "common/CommonMessage";
import { showSuccessToast, showErrorToast } from "common/ToastMessage";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";

const ContractAgreementSetupTableRowMenu = (props) => {
  const { data } = props;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteRow = () => {
    setIsDeleteModalOpen(true);
    setConfirmMessage(CommonMessage.MFC00001);
  };

  // delete modal close
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  // confirm to delete
  const handleDeleteConfirmed = async () => {
    setIsDeleteModalOpen(false);
    try {
      // call delete api
      await dispatch(
        deleteContractAgreementSetup({ uuid: data.uuid })
      ).unwrap();

      showSuccessToast(
        CommonMessage.MFS00002.replace("%s", "Contract Agreement Setup")
      );

      await dispatch(getAllContractAgreements());
      setConfirmMessage("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {/* <ConfirmationDialog
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
            /> */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onDelete={handleDeleteConfirmed}
        message={confirmMessage}
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
              `/Administration/CreateContractAgreementTemplateSetup/ViewContractAgreementSetup/${data.uuid}`
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
              `/Administration/CreateContractAgreementTemplateSetup/EditContractAgreementSetup/${data.uuid}`
            );
          }}
          disableRipple
        >
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem
          // onClick={() => {
          //     dispatch(deleteContractAgreementSetup({uuid :data.uuid}))
          //     dispatch(getAllContractAgreements())
          // }}
          onClick={handleDeleteRow}
          disableRipple
        >
          <Delete />
          Delete
        </MenuItem>
      </TableRowMenu>
    </>
  );
};

export default React.memo(ContractAgreementSetupTableRowMenu);
