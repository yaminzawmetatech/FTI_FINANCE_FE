import * as React from "react";
import { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Paper,
  Breadcrumbs,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { showSuccessToast } from "common/ToastMessage";
import { deleteGeneralLedgerEntrySetup, getGeneralLedgerEntrySetup } from "modules/finance/slices/generalLedgerEntrySetupSlice";
import openNewWindow from "utils/windowUtils";

const GeneralLedgerEntrySetupListIndex = () => {
  const dispatch = useDispatch();
  const [editFlag, setEditFlag] = useState(false); // edit flag
  const [deleteData, setDeleteData] = useState([]);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag

  const { generalLedgerEntrySetups, isLoading, isSuccess, isError, message } =
    useSelector((state) => state.generalLedgerEntrySetups);



  useEffect(() => {
    dispatch(getGeneralLedgerEntrySetup());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 200,
      },
      {
        accessorKey: "category.name",
        header: "Category",
        size: 200,
      },
      {
        accessorKey: "sub_category.name",
        header: "Sub Category",
        size: 200,
      },
      {
        accessorKey: "account_type",
        header: "Account Type",
        size: 200,
      },
    ],
    []
  );

  // click delete button
  const handleDeleteRow = (row) => {
    setIsDeleteModalOpen(true);
    setConfirmMessage(CommonMessage.MFC00001);
    setDeleteData(row);
  };

  // delete modal close
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteData([]);
  };

  // confirm to delete
  const handleDeleteConfirmed = async () => {
    setIsDeleteModalOpen(false);
    try {
      // call delete api
      await dispatch(
        deleteGeneralLedgerEntrySetup(deleteData.original.uuid)
      ).unwrap();

      showSuccessToast(
        CommonMessage.MFS00002.replace("%s", "SMS Setup")
      );

      await dispatch(getGeneralLedgerEntrySetup());
      setConfirmMessage("");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 1 }}
        className="margin-top-8"
      >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">
          General Ledger Entry Setup List
        </Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={generalLedgerEntrySetups ?? []}
          muiTableContainerProps={{ sx: { maxHeight: "calc(100vh - 220px)" } }}
          muiTableBodyCellEditTextFieldProps={{
            variant: "outlined",
          }}
          enableStickyHeader
          enableColumnOrdering
          enableRowActions
          enableColumnResizing
          columnResizeMode="onChange"
          positionActionsColumn="last"
          enablePinning
          state={{ isLoading: isLoading }}
          initialState={{
            columnPinning: {
              left: ["CategoryCode"],
              right: ["mrt-row-actions"],
            },
          }}
          renderRowActionMenuItems={({ row, table }) => [
            <MenuItem key="edit" onClick={() => openNewWindow(`/general-ledger-entry-setups/${row.original.uuid}/edit`)}>
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
              Edit
            </MenuItem>,
            <MenuItem key="delete" onClick={() => handleDeleteRow(row)}>
              <ListItemIcon>
                <Delete />
              </ListItemIcon>
              Delete
            </MenuItem>,
          ]}
          renderTopToolbarCustomActions={({ table }) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "0.5rem",
                }}
              >
                <Button
                  onClick={() => {
                    // setCreateModalOpen(true);
                    //setEditFlag(false);
                    openNewWindow(`/general-ledger-entry-setups/create`)
                  }}
                  variant="contained"
                >
                  Create New
                </Button>
              </div>
            );
          }}
        />
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={handleDeleteModalClose}
          onDelete={handleDeleteConfirmed}
          message={confirmMessage}
        />
      </Paper>
    </Box>
  );
};

export default GeneralLedgerEntrySetupListIndex;
