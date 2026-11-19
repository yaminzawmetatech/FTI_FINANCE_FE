import * as React from "react";
import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { MaterialReactTable } from "material-react-table";
import { useDispatch } from "react-redux";
import {
  Breadcrumbs,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import {
  getNumberSeries,
  deleteNumberSeries,
} from "modules/administration/slices/numberSeriesSlice";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { showSuccessToast } from "common/ToastMessage";
import CreateEditNumberSeriesModal from "./CreateEditNumberSeriesModal";
import useNumberSeriesForm from "./NumberSeriesHook";

const NumberSeriesList = () => {
  const dispatch = useDispatch();

  const {
    control,
    numberSeries,
    onSubmit,
    handleSubmit,
    isLoading,
    createModalOpen,
    setCreateModalOpen,
    reset,
    setEditValues,
    editValues,
  } = useNumberSeriesForm();

  const [editFlag, setEditFlag] = useState(false); // edit flag
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [deleteData, setDeleteData] = useState([]); // want to delete data
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body

  // define columns
  const columns = useMemo(() => {
    return [
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
        accessorKey: "alphabet",
        header: "Alphabet",
        size: 200,
      },
      {
        accessorKey: "start_id",
        header: "Start ID",
        size: 200,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 200,
      },
    ];
  }, []);

  const handleDeleteRow = (row) => {
    setIsDeleteModalOpen(true);
    setConfirmMessage(CommonMessage.MFC00001);
    setDeleteData(row);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteData([]);
  };

  // confirm to delete
  const handleDeleteConfirmed = async () => {
    setIsDeleteModalOpen(false);
    try {
      // call create down payment api
      await dispatch(deleteNumberSeries(deleteData.original.uuid)).unwrap();

      showSuccessToast(CommonMessage.MFS00002.replace("%s", "Number Series"));

      await dispatch(getNumberSeries());
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
        <Typography color="text.primary">Number Series List</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={numberSeries ?? []}
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
          state={{ isLoading: isLoading }} //pass our managed row selection state to the table to use
          enablePinning
          initialState={{
            columnPinning: {
              left: ["CategoryCode"],
              right: ["mrt-row-actions"],
            },
          }}
          renderRowActionMenuItems={({ row, table }) => [
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
        <CreateEditNumberSeriesModal
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          editValues={editValues}
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

export default NumberSeriesList;
