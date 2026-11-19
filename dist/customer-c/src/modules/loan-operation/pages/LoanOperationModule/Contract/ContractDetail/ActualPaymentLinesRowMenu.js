import * as React from "react";
import { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import TableRowMenu from "components/TableRowMenu";
import openNewWindow from "utils/windowUtils";
import ViewPaymentHistoryModal from "./ViewPaymentHistoryModal";

const ActualPaymentLinesRowMenu = (props) => {
  const { data } = props;
  const [ openPaymentHistoryModal, setOpenPaymentHistoryModal ] = useState(false);
 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [ selectedUuid, setSelectedUuid ] = useState();

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
            setOpenPaymentHistoryModal(open)
            // openNewWindow(
            //   `/contracts/${data.uuid}/view`
            // );
            setSelectedUuid(data.uuid)
          }}
          disableRipple
        >
          <VisibilityOutlinedIcon />
          View History
        </MenuItem>
      </TableRowMenu>
      <ViewPaymentHistoryModal 
          uuid={selectedUuid}
          open={openPaymentHistoryModal}
          handleClose={()=>setOpenPaymentHistoryModal(false)} 
      />
    </>
  );
};

export default React.memo(ActualPaymentLinesRowMenu);
