import * as React from "react";
import { useState } from "react";
import { IconButton, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import TableRowMenu from "components/TableRowMenu";
import HistoryIcon from "@mui/icons-material/History";
import ReminderAllocationHistoryModal from "../AllocatedReminder/ReminderAllocationHistoryModal";

const ReminderAllocationTableRowMenu = (props) => {
  const { data } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [
    openReminderAllocationHistoryModal,
    setOpenReminderAllocationHistoryModal,
  ] = useState(false);
  const [selectedContractId, setSelectedContractId] = useState();
  const [selectedPartnerId, setSelectedPartnerId] = useState();
  const [selectedApplicantName, setSelectedApplicantName] = useState();

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
            setSelectedContractId(data?.id);
            handleClose();
            setOpenReminderAllocationHistoryModal(open);
            setSelectedPartnerId(data?.partner_application_id);
            setSelectedApplicantName(data?.customer_name);
          }}
          disableRipple
        >
          <HistoryIcon />
          View Previous History
        </MenuItem>
      </TableRowMenu>
      <ReminderAllocationHistoryModal
        selectedContractId={selectedContractId}
        open={openReminderAllocationHistoryModal}
        handleClose={() => setOpenReminderAllocationHistoryModal(false)}
        selectedApplicantName={selectedApplicantName}
        selectedPartnerId={selectedPartnerId}
      />
    </>
  );
};

export default React.memo(ReminderAllocationTableRowMenu);
