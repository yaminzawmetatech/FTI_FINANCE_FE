import * as React from "react";
import { useState } from "react";
import { IconButton, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import TableRowMenu from "components/TableRowMenu";
import AddResponseModal from "./AddResponseModal";
import ReminderAllocationHistoryModal from "./ReminderAllocationHistoryModal";
import HistoryIcon from "@mui/icons-material/History";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AssignUserModal from "./AssignUserModal";
import { useDispatch } from "react-redux";
import {
  deleteReminderAllocationByUuid,
  getAllocatedReminderCounts,
  getReminderAllocationByUuid,
  getReminderAllocations,
} from "modules/collection/slices/reminderAllocationSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import CommonMessage from "common/CommonMessage";
import { showSuccessToast } from "common/ToastMessage";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import { useSelector } from "react-redux";

const AllocatedreminderTableRowMenu = (props) => {
  const { data, transformedSearchDataResponse, searchValueDate } = props;
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openAddResponseModal, setOpenAddResponseModal] = useState(false);
  const [
    openReminderAllocationHistoryModal,
    setOpenReminderAllocationHistoryModal,
  ] = useState(false);
  const [selectedUuid, setSelectedUuid] = useState();
  const [userModalOpen, setUserModalOpen] = useState(false); // for create confirm modal open
  const [mode, setMode] = useState("");
  const [selectedContractId, setSelectedContractId] = useState();
  const [selectedReminderAllocationId, setSelectedReminderAllocationId] =
    useState();
  const [selectedPartnerId, setSelectedPartnerId] = useState();
  const [selectedApplicantName, setSelectedApplicantName] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body

  const reminderParam = {
    reminder_status: ["success", "pending"],
  };

  const auth = useSelector((state) => state.auth.user);

  const open = Boolean(anchorEl);

  const showEditBtn =
    auth?.permissions.includes("CollectionManagement-AllocatedReminderUpdate") ||
    auth.is_super === true;
  const showDeleteBtn =
    auth?.permissions.includes("CollectionManagement-AllocatedReminderDelete") ||
    auth.is_super === true;

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditAllocation = (uuid) => {
    handleClose();
    dispatch(getReminderAllocationByUuid(uuid));
    setUserModalOpen(true);
    setSelectedUuid(uuid);
    setMode("edit");
  };

  const handleDeleteRow = (id) => {
    setIsDeleteModalOpen(true);
    setConfirmMessage(CommonMessage.MFC00001);
    setSelectedContractId(id);
  };

  // delete modal close
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  // confirm to delete
  const handleDeleteConfirmed = async () => {
    setIsDeleteModalOpen(false);
    try {
      // call delete api
      await dispatch(
        deleteReminderAllocationByUuid(selectedContractId)
      ).unwrap();
      showSuccessToast(CommonMessage.MFS00002.replace("%s", "Activity"));

      await dispatch(
        getReminderAllocations({
          firstFetch: true,
          params: {
            is_terminated_assign: 0,
            ...transformedSearchDataResponse,
            ...reminderParam,
            due_month: searchValueDate ? searchValueDate.format("YYYY-MM") : "",
          },
        })
      );

      await dispatch(
        getAllocatedReminderCounts({
          params: {
            ...reminderParam,
          },
        })
      );
      setConfirmMessage("");
    } catch (error) {
      console.error("Error:", error);
    }
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
        {(data.is_terminated_assign === 0 && showEditBtn ) && (
          <MenuItem
            onClick={() => handleEditAllocation(data.uuid)}
            disableRipple
          >
            <EditIcon />
            Edit Allocation
          </MenuItem>
        )}
        {data.is_terminated_assign === 0 && (
          <MenuItem
            onClick={() => {
              setSelectedContractId(data.contract_id);
              setSelectedReminderAllocationId(data.id);
              handleClose();
              setOpenAddResponseModal(open);
            }}
            disableRipple
          >
            <AddCircleIcon />
            Add Response
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            setSelectedContractId(data.contract_id);
            handleClose();
            setOpenReminderAllocationHistoryModal(open);
            setSelectedPartnerId(data.contract.partner_application_id);
            setSelectedApplicantName(data.contract.customer_name);
          }}
          disableRipple
        >
          <HistoryIcon />
          View Previous History
        </MenuItem>
        {(data.is_terminated_assign === 0 && showDeleteBtn) && (
        <MenuItem onClick={() => handleDeleteRow(data.uuid)} disableRipple>
          <DeleteIcon />
          Delete
        </MenuItem>
        )}
      </TableRowMenu>
      <AddResponseModal
        selectedContractId={selectedContractId}
        selectedReminderAllocationId={selectedReminderAllocationId}
        open={openAddResponseModal}
        onClose={() => setOpenAddResponseModal(false)}
        transformedSearchDataResponse={transformedSearchDataResponse}
        searchValueDate={searchValueDate}
      />
      <ReminderAllocationHistoryModal
        selectedContractId={selectedContractId}
        open={openReminderAllocationHistoryModal}
        handleClose={() => setOpenReminderAllocationHistoryModal(false)}
        selectedApplicantName={selectedApplicantName}
        selectedPartnerId={selectedPartnerId}
      />
      <AssignUserModal
        uuid={selectedUuid}
        open={userModalOpen}
        onClose={() => setUserModalOpen(false)}
        mode={mode}
        transformedSearchDataResponse={transformedSearchDataResponse}
        searchValueDate={searchValueDate}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onDelete={handleDeleteConfirmed}
        message={confirmMessage}
      />
    </>
  );
};

export default React.memo(AllocatedreminderTableRowMenu);
