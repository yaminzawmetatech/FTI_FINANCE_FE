import * as React from "react";
import { useCallback, useMemo, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { MaterialReactTable } from "material-react-table";
import { useSelector, useDispatch } from "react-redux";
import {
  Breadcrumbs,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  getDocumentTypes,
  deleteDocumentType,
} from "modules/administration/slices/documentTypeSlice";
import CreateNewDocumentTypeSetupModal from "./CreateNewDocumentTypeSetupModal";
import { Delete } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { showSuccessToast, showErrorToast } from "common/ToastMessage";
import useDocumentTypeForm from "./DocumentTypeSetupHook";

const DocumentTypeSetupIndex = () => {
  const dispatch = useDispatch();
  const [editFlag, setEditFlag] = useState(false); // edit flag
  const [initialValues, setInitialValues] = useState(); // for store initial state to give edit modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [deleteData, setDeleteData] = useState([]); // want to delete data
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body

  const {
    control,
    documentTypes,
    onSubmit,
    handleSubmit,
    isLoading,
    createModalOpen,
    setCreateModalOpen,
    reset,
    setEditValues,
    editValues,
  } = useDocumentTypeForm();

  const columns = useMemo(
    () => [
      {
        accessorKey: "code",
        header: "Code",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "description",
        header: "Description",
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
      await dispatch(deleteDocumentType(deleteData.original.uuid)).unwrap();

      showSuccessToast(CommonMessage.MFS00002.replace("%s", "Document Type"));

      await dispatch(getDocumentTypes());
      setConfirmMessage("");
    } catch (error) {
      console.error("Error:", error);
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
        <Typography color="text.primary">Document Type List</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={documentTypes ?? []}
          muiTableContainerProps={{ sx: { maxHeight: "calc(100vh - 220px)" } }}
          enableStickyHeader
          enableColumnOrdering
          enableRowActions
          enableColumnResizing
          columnResizeMode="onChange"
          positionActionsColumn="last"
          state={{ isLoading: isLoading }}
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
        <CreateNewDocumentTypeSetupModal
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          editValues={editValues}
          setEditValues={setEditValues}
          editFlag={editFlag}
          initialValues={initialValues}
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

export default DocumentTypeSetupIndex;
