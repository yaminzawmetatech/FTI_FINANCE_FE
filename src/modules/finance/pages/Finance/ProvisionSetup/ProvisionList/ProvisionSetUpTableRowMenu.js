import * as React from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import openNewWindow from "utils/windowUtils";
import EditIcon from "@mui/icons-material/Edit";
import TableRowMenu from "components/TableRowMenu";
import ProvisionSetupForm from "./ProvisionSetupForm";
import CreateEditModel from "./CreateEditModel";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ConfirmationDialog from "components/ConfirmationDialog";
import { useDispatch } from "react-redux";
import { deleteProvisionSetupByUuid, getProvisionSetups } from "modules/finance/slices/provisionSetupSlice";

const ProvisionSetUpTableRowMenu = ({ node }) => {
  const { setCreateEditFormOpen,
    createEditFormOpen,
    control,
    onSubmit,
    handleSubmit,
    getValues,
    isLoading,
    close,
    reset
  } = ProvisionSetupForm();

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setCreateEditFormOpen(true)
  }

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false)
  }

  const handleOKDeleteDialog = async () => {
    const uuid = node?.data?.uuid;
    await dispatch(deleteProvisionSetupByUuid(uuid));
    dispatch(getProvisionSetups({}))
    setAnchorEl(null);
  }

  return (
    <>
      <CreateEditModel
        createEditFormOpen={createEditFormOpen}
        setCreateEditFormOpen={setCreateEditFormOpen}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        reset={reset}
        control={control}
        isLoading={isLoading}
        getValues={getValues}
        editFlag={true}
        selectedData={node}
      ></CreateEditModel>

      <ConfirmationDialog
        title="Delete Confirm."
        content="Are you sure to delete this provision?"
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onOk={handleOKDeleteDialog}
      ></ConfirmationDialog>
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
            handleClickOpen();
          }}
          disableRipple
        >
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setDeleteDialogOpen(true);
          }}
          disableRipple
        >
          <DeleteForeverIcon />
          Delete
        </MenuItem>
      </TableRowMenu>
    </>
  );
};

export default React.memo(ProvisionSetUpTableRowMenu);
