import * as React from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton, MenuItem, Modal, Typography, Box, Grid, Button } from "@mui/material";
import openNewWindow from "utils/windowUtils";
import EditIcon from "@mui/icons-material/Edit";
import TableRowMenu from "components/TableRowMenu";
import {
  VisibilityOutlined,
  MoreVert,
  Edit,
  Close
} from "@mui/icons-material";
import GeneralLedgerEnteriesSyncPost from "./GeneralLedgerEnteriesSyncPost";


const InsurancePaymentTableRowMenu = (selectedData) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isGLModalOpen, setIsGLModalOpen] = React.useState(false);
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
              `/Insurance/${selectedData.data.uuid}/view`
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
              `/Insurance/${selectedData.data.uuid}/edit`
            );
          }}
          disableRipple
        >
          <EditIcon />
          Edit
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
            {/* <Grid item xs={12}>
              <Typography variant="h6" component="h2" gutterBottom>
                General Ledger Entries
              </Typography>
            </Grid> */}

            <Grid item xs={12}>
              <GeneralLedgerEnteriesSyncPost id={selectedData?.data?.id} />
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

export default React.memo(InsurancePaymentTableRowMenu);
