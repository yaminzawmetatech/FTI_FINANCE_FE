import * as React from "react";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
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
import CreateEarlyTerminationFeesSetupModal from "./EarlyTerminationFeesSetupModal";
import { Edit } from "@mui/icons-material";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { showSuccessToast } from "common/ToastMessage";
import useEarlyTerminationFeesSetupForm from "./EarlyTerminationFeesSetupHook";
import {
  deleteEarlyTerminationFees,
  getEarlyTerminationFees,
} from "modules/collection/slices/earlyTerminationFeesSetupSlice";

const EarlyTerminationFeesSetupList = () => {
  const dispatch = useDispatch();
  const [editFlag, setEditFlag] = useState(false); // edit flag
  const [deleteData, setDeleteData] = useState([]);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag

  const {
    isLoading,
    onSubmit,
    handleSubmit,
    control,
    earlyTerminationFees,
    createModalOpen,
    setCreateModalOpen,
    setEditValues,
    reset,
  } = useEarlyTerminationFeesSetupForm();

  const columns = useMemo(
    () => [
      {
        accessorKey: "category",
        header: "Category",
        size: 200,
      },
      {
        accessorKey: "sub_category",
        header: "Sub Category",
        size: 200,
      },
      {
        accessorKey: "grace_period",
        header: "Grace Period",
        size: 200,
      },
      {
        accessorKey: "et_fees",
        header: "ET Fees %",
        size: 200,
      },
      {
        accessorKey: "min_month",
        header: "Minimum Month",
        size: 200,
      },
      {
        accessorKey: "description",
        header: "Description",
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
        deleteEarlyTerminationFees(deleteData.original.uuid)
      ).unwrap();

      showSuccessToast(
        CommonMessage.MFS00002.replace("%s", "Early Termination Fees Setup")
      );

      await dispatch(getEarlyTerminationFees());
      setConfirmMessage("");
    } catch (error) {
      console.error("Error", error);
    }
  };

  // click edit button
  const editClick = (row) => {
    setCreateModalOpen(true);
    setEditFlag(true);

    const updatedValues = { ...row.original };

    for (const key in updatedValues) {
      if (updatedValues[key] === "---") {
        updatedValues[key] = "";
      }
    }
    setEditValues(updatedValues);
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
          Early Termination Fees Setup List
        </Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={earlyTerminationFees ?? []}
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
            <MenuItem key="edit" onClick={() => editClick(row)}>
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
                    setCreateModalOpen(true);
                    setEditFlag(false);
                  }}
                  variant="contained"
                >
                  Create New
                </Button>
              </div>
            );
          }}
        />
        <CreateEarlyTerminationFeesSetupModal
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          setEditValues={setEditValues}
          editFlag={editFlag}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          reset={reset}
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

export default EarlyTerminationFeesSetupList;
