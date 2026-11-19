import React, { useState } from "react";
import { IconButton, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import TableRowMenu from "components/TableRowMenu";
import RepaymentMIModal from "./RepaymentMIModal";
import { useParams } from "react-router-dom";

const RepaymentMIRowMenu = (props) => {
  const { data } = props;
  const { uuid, mode } = useParams();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openRepaymentMIModal, setOpenRepaymentMIModal] = useState(false);

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
            setOpenRepaymentMIModal(true);
          }}
          disableRipple
        >
          <EditIcon />
          Waived Collection Fees
        </MenuItem>
      </TableRowMenu>
      <RepaymentMIModal
        open={openRepaymentMIModal}
        handleClose={() => setOpenRepaymentMIModal(false)}
        contractId={data?.contract_id}
        // applicationId={data?.application_id}
        settlementId={data?.id}
        repaymentUuid={uuid}
        generatedApplicationId={data?.contract?.generated_application_id}
      />
    </>
  );
};

export default React.memo(RepaymentMIRowMenu);
