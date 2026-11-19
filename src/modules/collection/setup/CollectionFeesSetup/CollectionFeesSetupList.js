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
  Stack,
  Chip,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import CreateCollectionFeesSetupModal from "./CollectionFeesSetupModal";
import { Edit } from "@mui/icons-material";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { showSuccessToast } from "common/ToastMessage";
import useCollectionFeesSetupForm from "./CollectionFeesSetupHook";
import { deleteCollectionFees, getCollectionFees } from "modules/collection/slices/collectionFeesSetupSlice";

const CollectionFeesSetupList = () => {
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
    collectionFees,
    createModalOpen,
    setCreateModalOpen,
    setEditValues,
    reset,
    setValue
  } = useCollectionFeesSetupForm();

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
        accessorKey: "penalty_amount_type",
        header: "Penalty Amount Type",
        size: 200,
      },
      {
        accessorKey: "collection_fee_fixed_amount",
        header: "Collection Fee Fixed Amount",
        size: 200,
      },
      {
        accessorKey: "collection_fee_percentage",
        header: "Collection Fee Percentage",
        size: 200,
      },
      {
        accessorKey: "collection_fee_percentage_type",
        header: "Collection Fee Percentage Type",
        size: 200,
      },
      {
        accessorKey: "collection_fee_max_amount",
        header: "Maximum Amount",
        size: 200,
      },
      {
        accessorKey: "collection_fee_max_days",
        header: "Maximum Days",
        size: 200,
      },
      {
        accessorKey: "collection_fee_calculation_type",
        header: "Calculation Type",
        size: 200,
      },
      {
        accessorKey: "grace_period_days",
        header: "Grace Period Days",
        size: 200,
      },
      {
        accessorKey: "penalty_period_days",
        header: "Penalty Period Days",
        size: 200,
      },
      {
        accessorKey: "grace_period_adjustment",
        header: "Grace Period Adjustment",
        size: 200,
        Cell: ({ cell }) => {
          const row = cell.getValue();
          if (row === 1) {
            return (
              <Stack direction="row" spacing={1}>
                <Chip label="YES" color="success" />
              </Stack>
            );
          } else {
            return (
              <Stack direction="row" spacing={1}>
                <Chip label="NO" color="error" />
              </Stack>
            );
          }
        },
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
        deleteCollectionFees(deleteData.original.uuid)
      ).unwrap();

      showSuccessToast(
        CommonMessage.MFS00002.replace("%s", "Collection Fees Setup")
      );

      await dispatch(getCollectionFees());
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
          Collection Fees Setup List
        </Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={collectionFees ?? []}
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
        <CreateCollectionFeesSetupModal
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          setEditValues={setEditValues}
          editFlag={editFlag}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          reset={reset}
          setValue={setValue}
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

export default CollectionFeesSetupList;
