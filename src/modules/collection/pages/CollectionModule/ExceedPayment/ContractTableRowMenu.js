import * as React from "react";
import { useState } from "react";
import {
  IconButton,
  MenuItem,
  Modal,
  Box,
  Grid,
  Button,
  Typography
} from "@mui/material";
import {
  VisibilityOutlined,
  MoreVert,
  Edit,
  Close
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import TableRowMenu from "components/TableRowMenu";
import openNewWindow from "utils/windowUtils";
import KpayNotificationModal from "./KpayNotificationModal";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useSelector } from "react-redux";
import ExceedBankStatement from "./ExceedBankStatement";

const ContractTableRowMenu = ({data, activeTab}) => {

  const auth = useSelector((state) => state.auth.user);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openKpayNotificationModal, setOpenKpayNotificationModal] =
    useState(false);
  const [isGLModalOpen, setIsGLModalOpen] = React.useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGLViewClick = () => {
    handleClose();
    setIsGLModalOpen(true);
  };

  const handleCloseGLModal = () => {
    setIsGLModalOpen(false);
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
              `/contracts/${data.uuid}/view/contract`
            );
          }}
          disableRipple
        >
          <VisibilityOutlined />
          View
        </MenuItem>
        {auth.user_group !== "CMCO" && (
          <MenuItem
            onClick={() => {
              handleClose();
              openNewWindow(`/contracts/${data.uuid}/edit/contract`);
            }}
            disableRipple
          >
            <EditIcon />
            Edit
          </MenuItem>
        )}

        {data.category_id === 3 &&
          <MenuItem
            onClick={() => {
              setSelectedApplicationId(data.application_id);
              setOpenKpayNotificationModal(open);
              handleClose();
            }}
            disableRipple
          >
            <NotificationsActiveIcon />
            View Kpay Notification
          </MenuItem>

        }
        {
          activeTab === "3" && (<MenuItem onClick={handleGLViewClick} disableRipple>
            <VisibilityOutlined sx={{ mr: 1, fontSize: "1rem" }} />
            <Typography variant="body2">View Exceed Bank Statement</Typography>
          </MenuItem>)
        }
      </TableRowMenu>
      <KpayNotificationModal
        selectedApplicationId={selectedApplicationId}
        open={openKpayNotificationModal}
        handleClose={() => setOpenKpayNotificationModal(false)}
      />
      <Modal
        open={isGLModalOpen}
        onClose={handleCloseGLModal}
        aria-labelledby="general-ledger-modal"
        aria-describedby="general-ledger-details"
      >
        <Box
          sx={{
            width: { xs: "90%", sm: 900 },
            maxWidth: "100%",
            maxHeight: "90vh",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            mx: "auto",
            my: "5vh",
            overflowY: "auto",
            "&:focus": { outline: "none" }
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" component="h2" gutterBottom>
                General Ledger Entries
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <ExceedBankStatement id={data?.id} />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "right", mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCloseGLModal}
                startIcon={<Close />}
                sx={{ minWidth: 120 }}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default React.memo(ContractTableRowMenu);
