import * as React from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import openNewWindow from "utils/windowUtils";
import EditIcon from "@mui/icons-material/Edit";
import TableRowMenu from "components/TableRowMenu";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useParams } from "react-router-dom";

const EOMLogEntryRowMenu = (selectedData) => {
  const { mode } = useParams();
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
              mode === "kpay" ? `/finance/eom-bom/${selectedData?.data?.uuid}/kpay/view` : `/finance/eom-bom/${selectedData?.data?.uuid}/all/view`
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
              mode === "kpay" ? `/finance/eom-bom-sync/${selectedData?.data?.id}/kpay` : `/finance/eom-bom-sync/${selectedData?.data?.id}/all`
            );
          }}
          disableRipple
        >
          <ArrowForwardIcon />
          Sync
        </MenuItem>
      </TableRowMenu>
    </>
  );
};

export default React.memo(EOMLogEntryRowMenu);
