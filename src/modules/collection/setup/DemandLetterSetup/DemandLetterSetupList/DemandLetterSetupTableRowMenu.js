import * as React from "react";
import { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton, MenuItem } from "@mui/material";
import { Delete, MoreVert } from "@mui/icons-material";
import openNewWindow from "utils/windowUtils";
import EditIcon from "@mui/icons-material/Edit";
import TableRowMenu from "components/TableRowMenu";
import { dispatch } from "store";

import CommonMessage from "common/CommonMessage";
import { showSuccessToast, showErrorToast } from "common/ToastMessage";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import { deleteDemandLetterSetups, getAllDemandLetterSetups } from "modules/collection/slices/demandLetterSetupSlice";

const DemandLetterSetupTableRowMenu = (props) => {
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
        deleteDemandLetterSetups({ uuid: data.uuid })
      ).unwrap();

      showSuccessToast(
        CommonMessage.MFS00002.replace("%s", "Contract Agreement Setup")
      );

      await dispatch(getAllDemandLetterSetups());
      setConfirmMessage("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
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
              `/administration/demand-letter-setup/view/${data.uuid}`
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
              `/administration/demand-letter-setup/edit/${data.uuid}`
            );
          }}
          disableRipple
        >
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem
          // onClick={() => {
          //     dispatch(deleteDemandLetterSetups({uuid :data.uuid}))
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

export default React.memo(DemandLetterSetupTableRowMenu);
