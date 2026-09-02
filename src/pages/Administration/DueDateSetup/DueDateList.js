import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
  Breadcrumbs,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { MaterialReactTable } from "material-react-table";
import CreateDueDateModal from "./CreateDueDateModal";
import { useMemo, useState } from "react";
import { getSigners, deleteSigner } from "../../../features/signer/signerSlice";
import { Edit } from "../../../../node_modules/@mui/icons-material/index";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { showSuccessToast, showErrorToast } from "common/ToastMessage";
import useDueDateForm from "./DueDateHook";

const DueDateList = () => {
  const dispatch = useDispatch();

  const [editFlag, setEditFlag] = useState(false); // edit flag
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [deleteData, setDeleteData] = useState([]); // want to delete data
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body

  const {
    control,
    dueDates,
    onSubmit,
    handleSubmit,
    isLoading,
    createModalOpen,
    setCreateModalOpen,
    reset,
    setEditValues,
    editValues,
  } = useDueDateForm();

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
        accessorKey: "due_month",
        header: "Due Month",
        size: 200,
      },
      {
        accessorKey: "due_date_type",
        header: "Due Date Type",
        size: 250,
      },
      {
        accessorKey: "static_day",
        header: "Static Date",
        size: 250,
      },
      {
        accessorKey: "dynamic_day",
        header: "Dynamic Date",
        size: 200,
      },
      {
        accessorKey: "same_as_commencement_date",
        header: "Same as commencement Date",
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
      const responseData = await dispatch(
        deleteSigner(deleteData.original.uuid)
      );
      if (responseData) {
        if (responseData.payload && responseData.payload.success === true) {
          showSuccessToast(CommonMessage.MFS00002.replace("%s", "Signer"));
        } else if (
          responseData.error &&
          responseData.error.message === "Rejected"
        ) {
          if (typeof responseData.payload === "string") {
            showErrorToast(responseData.payload);
          }
        }
      }
      await dispatch(getSigners());
      setConfirmMessage("");
    } catch (error) {
      showErrorToast(CommonMessage.MFE00009.replace("%s", "deleting Signer"));
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
        <Typography color="text.primary">Due Date List</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={dueDates ?? []}
          muiTableContainerProps={{ sx: { maxHeight: "calc(100vh - 220px)" } }}
          enableStickyHeader
          enableColumnOrdering
          enableRowActions
          enableColumnResizing
          //debugTable={isError}
          state={{ isLoading: isLoading }}
          columnResizeMode="onChange"
          projectcategoryActionsColumn="last"
          enablePinning
          getRowId={(row) => row.uuid} //give each row a more useful id
          initialState={{
            columnPinning: {
              left: ["Name"],
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
              <>
                <div
                  style={{
                    width: "90%",
                    padding: "0.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    // gap: "0.5rem",
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
              </>
            );
          }}
        />
        <CreateDueDateModal
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

export default DueDateList;
