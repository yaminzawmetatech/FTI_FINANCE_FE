import * as React from "react";
import { useState, useRef, useEffect } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import TableRowMenu from "components/TableRowMenu";
import openNewWindow from "utils/windowUtils";

const AssessmentTableRowMenu = (props) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { data } = props;


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
              `/CreditManagement/CreateApplicationInformation/${data.category.name}/${data.category_id}/${data.application.uuid}/${data.application.id}/view`
            );
          }}
          disableRipple
        >
          <VisibilityOutlinedIcon />
          View Application
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            openNewWindow(
              `/CreditManagement/ApplicationAssessment/EditApplicationAssessment/${data.id}`
            );
          }}
          disableRipple
        >
          <VisibilityOutlinedIcon />
          View Assessment
        </MenuItem>
      </TableRowMenu>
    </>
  );
};

export default React.memo(AssessmentTableRowMenu);
