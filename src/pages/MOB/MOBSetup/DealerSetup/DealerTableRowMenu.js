import * as React from "react";
import { useState } from "react";
import { IconButton, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import TableRowMenu from "../../../../components/TableRowMenu";
import CreateEditDealerModal from "./CreateEditDealerModal";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDealer, getDealerByUuid, getDealers } from "features/dealer/dealerSlice";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CreateDealerContactPersonModal from "../DealerContactPersonSetup/CreateDealerContactPersonModal";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DealerContactPeopleModal from "./DealerContactPeopleModal";
import CreateDealerBankModal from "../DealerBankSetup/CreateDealerBankModal";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import useDealerBankForm from "../DealerBankSetup/DealerBankHook";
import { useSelector } from "react-redux";
import UpgradeIcon from '@mui/icons-material/Upgrade';
import HistoryIcon from '@mui/icons-material/History';
import GuaranteeDataModal from "./GuaranteeDataModal";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AssignUserModal from "./AssignUserModal";
import AgentModal from "./AgentModal";

const DealerTableRowMenu = (props) => {
  const { data } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isDealerGpOpen, setIsDealerGpOpen] = useState(false);

  const { openBankAccountModal, setOpenBankAccountModal } = useDealerBankForm();

  const auth = useSelector((state) => state.auth.user);

  const bankCreateFlag =
  auth?.permissions.includes("Treasury-CreateDealerBank") ||
  auth.is_super === true;

  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [editFlag, setEditFlag] = useState(false);
  const [editValues, setEditValues] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body
  const [openContactPersonModal, setOpenContactPersonModal] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [copyFlag, setCopyFlag] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openContactPeopleModal, setOpenContactPeopleModal] = useState(false);
  const [upgradeFlag, setUpgradeFlag] = useState(false);
  const [openGuaranteeDataModal, setOpenGuaranteeDataModal] = useState(false);
  const [openAssignUserModal, setOpenAssignUserModal] = useState(false);
  const [openAgentModal, setOpenAgentModal] = useState(false);

  const handleEditClick = () => {
    setOpenEditModal(true); // directly set true
    setEditFlag(true);
    handleClose();
    setEditValues(data);
    setCopyFlag(false);
    setUpgradeFlag(false);
  };

  const handleUpgradeClick = () => {
    setOpenEditModal(true);
    setEditFlag(false);
    setUpgradeFlag(true);
    handleClose();
    setEditValues(data);
    setCopyFlag(false);
    setSelectedId(data.id)
  };

  const handleCopyClick = async () => {
    const response = await dispatch(getDealerByUuid({uuid : data?.uuid}));
    if (response.payload.success === true) {
      setOpenEditModal(true);
      setCopyFlag(true);
      handleClose();
      setEditFlag(false);
      setEditValues(response.payload.data);
      setUpgradeFlag(false);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
    setConfirmMessage(CommonMessage.MFC00001);
    setDeleteId(data?.uuid);
  };

  // delete modal close
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteId([]);
  };

  const handleDeleteConfirmed = async () => {
    setIsDeleteModalOpen(false);
    try {
      //call delete api

      await dispatch(deleteDealer(deleteId)).unwrap();

      showSuccessToast(CommonMessage.MFS00002.replace("%s", "Dealer"));

      await dispatch(
        getDealers({
          firstFetch: true,
        })
      );
      setConfirmMessage("");
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleAddContactPerson = () => {
    setOpenContactPersonModal(open);
    setSelectedId(data?.id);
  };

  const handleViewContactPerson = () => {
    setOpenContactPeopleModal(open);
    setSelectedId(data?.id);
  };

  const handleViewAgentPerson = () => {
    setOpenAgentModal(open);
    setSelectedId(data?.id);
  };


  const handleAddBankAccountClick = () => {
    setOpenBankAccountModal(true);
    setEditFlag(false);
    handleClose();
    setEditValues(data);
    setIsDealerGpOpen(true);
  };

  const handleViewGuaranteData = () => {
    setOpenGuaranteeDataModal(open);
    setSelectedId(data?.id);
  };

  const handleAssignAgent = () => {
    setOpenAssignUserModal(true);
    setSelectedId(data?.id);
  }

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
        {/* <MenuItem onClick={handleCopyClick} disableRipple>
          <ContentCopyIcon />
          Copy Dealer
        </MenuItem>
        <MenuItem onClick={handleEditClick} disableRipple>
          <EditIcon />
          Edit Dealer
        </MenuItem> */}
        <MenuItem onClick={handleViewGuaranteData} disableRipple>
          <HistoryIcon />
          View Guarantee Data History
        </MenuItem>
        <MenuItem onClick={handleAddContactPerson} disableRipple>
          <AddIcon />
          Add Contact Person
        </MenuItem>
        <MenuItem onClick={handleViewContactPerson} disableRipple>
          <RemoveRedEyeIcon />
          View Contact Person
        </MenuItem>
        <MenuItem onClick={handleAssignAgent} disableRipple>
          <AssignmentIndIcon />
          Assign Agent
        </MenuItem>
        <MenuItem onClick={handleViewAgentPerson} disableRipple>
          <RemoveRedEyeIcon />
          View Agents
        </MenuItem>
        {bankCreateFlag &&
          <MenuItem onClick={handleAddBankAccountClick} disableRipple>
            <AccountBalanceIcon />
            Add Bank Account
          </MenuItem>
        }
      </TableRowMenu>
      <CreateEditDealerModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        editFlag={editFlag}
        editValues={editValues}
        copyFlag={copyFlag}
        upgradeFlag={upgradeFlag}
        selectedId={selectedId}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onDelete={handleDeleteConfirmed}
        message={confirmMessage}
      />
      <CreateDealerContactPersonModal
        open={openContactPersonModal}
        onClose={() => setOpenContactPersonModal(false)}
        editFlag={false}
        selectedId={selectedId}
      />
      <DealerContactPeopleModal
        open={openContactPeopleModal}
        onClose={() => setOpenContactPeopleModal(false)}
        selectedId={selectedId}
      />
      <CreateDealerBankModal
        open={openBankAccountModal}
        onClose={() => setOpenBankAccountModal(false)}
        editFlag={editFlag}
        editValues={editValues}
        isDealerGpOpen={isDealerGpOpen}
      />
       <GuaranteeDataModal
        open={openGuaranteeDataModal}
        onClose={() => setOpenGuaranteeDataModal(false)}
        selectedId={data?.id}
      />
      <AssignUserModal
        open={openAssignUserModal}
        onClose={() => setOpenAssignUserModal(false)}
        selectedId={selectedId}
      />
      <AgentModal
        open={openAgentModal}
        onClose={() => setOpenAgentModal(false)}
        editFlag={false}
        selectedId={selectedId}
      />
    </>
  );
};

export default React.memo(DealerTableRowMenu);
