import * as React from "react";
import {useState} from "react";
import { MoreVert } from "@mui/icons-material";
import TableRowMenu from "components/TableRowMenu";
import { IconButton, MenuItem } from "@mui/material";
import PenaltyLogInfoModal from "./PenaltyLogInfoModal";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const PenaltyLogTableRowMenu = (selectedData) => {
    const [ openLogInfoModal, setOpenLogInfoModal ] = useState(false);
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
                      setOpenLogInfoModal(open)
                  }}
                  disableRipple
              >
                  <VisibilityOutlinedIcon />
                  View Full Log
              </MenuItem>
          </TableRowMenu>
          <PenaltyLogInfoModal
              open={openLogInfoModal}
              handleClose={()=>setOpenLogInfoModal(false)}
              file_name={selectedData.data.file_name}
          />
      </>
  );
};

export default React.memo(PenaltyLogTableRowMenu);
