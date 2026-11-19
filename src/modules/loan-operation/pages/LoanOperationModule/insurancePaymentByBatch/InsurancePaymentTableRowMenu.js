import * as React from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import openNewWindow from "utils/windowUtils";
import EditIcon from "@mui/icons-material/Edit";
import TableRowMenu from "components/TableRowMenu";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useParams, useSearchParams } from "react-router-dom";

const InsurancePaymentTableRowMenu = (selectedData) => {
 

  const { uuid, mode, route, category } = useParams();
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
              mode === "edit"
                ? `/contracts/${selectedData?.data?.contract?.uuid}/view/contract`
                : `/contracts/${selectedData?.data?.uuid}/view/contract`
            );
          }}
          disableRipple
        >
          <VisibilityOutlinedIcon />
          View Contract
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            openNewWindow(
              mode === "edit"
                ? `/CreditManagement/ApplicationAttachment/${selectedData?.data?.contract?.application?.uuid}/Insurance Information/${selectedData?.data?.contract?.application_id}`
                : `/CreditManagement/ApplicationAttachment/${selectedData?.data?.application?.uuid}/Insurance Information/${selectedData?.data?.application_id}`
            );
          }}
          disableRipple
        >
          <AttachFileIcon />
          Insurance Attachment
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            openNewWindow(
              mode === "edit"
                ? `/CreditManagement/ApplicationAttachment/${selectedData?.data?.contract?.application?.uuid}/Sale Invoice/${selectedData?.data?.contract?.application_id}`
                : `/CreditManagement/ApplicationAttachment/${selectedData?.data?.application?.uuid}/Sale Invoice/${selectedData?.data?.application_id}`
            );
          }}
          disableRipple
        >
          <AttachFileIcon />
          Sale Invoice Attachment
        </MenuItem>
      </TableRowMenu>
    </>
  );
};

export default React.memo(InsurancePaymentTableRowMenu);
