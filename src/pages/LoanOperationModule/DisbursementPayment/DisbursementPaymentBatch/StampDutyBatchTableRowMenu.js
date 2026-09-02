import * as React from "react";
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
import openNewWindow from "utils/windowUtils";
import TableRowMenu from "components/TableRowMenu";
import GeneralLedgerEnteriesSyncPost from "./GeneralLedgerEnteriesSyncPost";
import PropTypes from "prop-types";

const StampDutyPaymentTableRowMenu = ({ data }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isGLModalOpen, setIsGLModalOpen] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewClick = () => {
    handleMenuClose();
    openNewWindow(`/Disbursement-Payment/${data.uuid}/view`);
  };

  const handleEditClick = () => {
    handleMenuClose();
    openNewWindow(`/Disbursement-Payment/${data.uuid}/edit`);
  };

  const handleGLViewClick = () => {
    handleMenuClose();
    setIsGLModalOpen(true);
  };

  const handleCloseGLModal = () => {
    setIsGLModalOpen(false);
  };

  return (
    <>
      {/* Menu Trigger Button */}
      <IconButton
        size="small"
        aria-label="row actions"
        aria-controls={open ? "row-actions-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleMenuClick}
        sx={{
          "& .MuiSvgIcon-root": { fontSize: "1rem" },
          "&:hover": { backgroundColor: "action.hover" }
        }}
      >
        <MoreVert />
      </IconButton>

      {/* Row Action Menu */}
      <TableRowMenu
        id="row-actions-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{ "aria-labelledby": "row-actions-button" }}
        sx={{
          "& .MuiPaper-root": {
            minWidth: "180px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)"
          }
        }}
      >
        <MenuItem onClick={handleViewClick} disableRipple>
          <VisibilityOutlined sx={{ mr: 1, fontSize: "1rem" }} />
          <Typography variant="body2">View</Typography>
        </MenuItem>

        <MenuItem onClick={handleEditClick} disableRipple>
          <Edit sx={{ mr: 1, fontSize: "1rem" }} />
          <Typography variant="body2">Edit</Typography>
        </MenuItem>

        <MenuItem onClick={handleGLViewClick} disableRipple>
          <VisibilityOutlined sx={{ mr: 1, fontSize: "1rem" }} />
          <Typography variant="body2">View General Ledger</Typography>
        </MenuItem>
      </TableRowMenu>

      {/* General Ledger Modal */}
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
              <GeneralLedgerEnteriesSyncPost id={data?.id} />
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

StampDutyPaymentTableRowMenu.propTypes = {
  data: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired
};

export default StampDutyPaymentTableRowMenu;
