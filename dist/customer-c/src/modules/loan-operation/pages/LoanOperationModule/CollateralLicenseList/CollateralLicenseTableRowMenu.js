import * as React from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import openNewWindow from "utils/windowUtils";
import EditIcon from "@mui/icons-material/Edit";
import TableRowMenu from "components/TableRowMenu";
import { checkLocked } from "modules/loan-operation/slices/collateralSlice";
import { showErrorToast } from "common/ToastMessage";
import { useDispatch, useSelector } from "react-redux";
import CommonMessage from "common/CommonMessage";


const CollateralListTableRowMenu = (selectedData) => {


  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.user);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = async () => {
    handleClose();
    if ((auth.user_group !== "CMCO" || auth.user_group === "CMCE")) {
      openNewWindow(
        `/CreditManagement/Applications/${selectedData?.data?.uuid}/${selectedData?.data?.application?.id}/edit/collateral/contract/${selectedData?.data?.contract?.id}`
      );
    } else {
      const response = await dispatch(
        checkLocked({
          data: {
            collateral_id: selectedData?.data?.id,
          },
        })
      );
      if (response?.payload?.data) {
        if (response?.payload?.data?.response === true) {
          openNewWindow(
            `/CreditManagement/Applications/${selectedData?.data?.uuid}/${selectedData?.data?.application?.id}/edit/collateral/contract/${selectedData?.data?.contract?.id}`
          )
        } else {
          showErrorToast(CommonMessage.MFE00020);
        }
      }
    }

    //if (
    //   data?.application_info?.mnet_file_fetched_status === 0 &&
    //   data?.partner_id === 2
    // ) {
    //   console.log("Fetching attachments for mnet");
    //   handleFetchMnetAttachments();
    // }
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
              `/CreditManagement/Applications/${selectedData?.data?.uuid}/${selectedData?.data?.application?.id}/view/collateral/contract/${selectedData?.data?.contract?.id}`
            );
          }}
          disableRipple
        >
          <VisibilityOutlinedIcon />
          View
        </MenuItem>

        {/* {auth.user_group !== "CMCO" && ( */}
          <MenuItem onClick={() => {
            handleClose();
            openNewWindow(
              `/CreditManagement/Applications/${selectedData?.data?.uuid}/${selectedData?.data?.application?.id}/edit/collateral/contract/${selectedData?.data?.contract?.id}`
            )
          }} disableRipple>
            <EditIcon />
            Edit
          </MenuItem>
        {/* )} */}

      </TableRowMenu>
    </>
  );
};

export default React.memo(CollateralListTableRowMenu);
