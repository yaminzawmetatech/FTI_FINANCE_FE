import * as React from "react";
import { useCallback, useMemo, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { MaterialReactTable } from "material-react-table";
import {
  Breadcrumbs,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Delete } from "@mui/icons-material";
import CreateNewDocumentModal from "../DocumentAttachTable/CreateNewDocumentModal";
import {
  deleteDocumentAccess,
  getDocumentAccesses
} from '../../../features/documentAccess/documentAccessSlice'
import { Edit } from "../../../../node_modules/@mui/icons-material/index";
import {
  showSuccessToast,
} from "common/ToastMessage";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import CommonMessage from "common/CommonMessage";
import useDocumentAttachForm from "./DocumentAttachHook";

const DocumentAttachIndex = () => {

  const dispatch = useDispatch();
  const [editFlag, setEditFlag] = useState(false); // edit flag
  const [initialValues, setInitialValues] = useState(); // for store initial state to give edit modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [deleteData, setDeleteData] = useState([]); // want to delete data
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body

  const {
    control,
    documentAccesses,
    onSubmit,
    handleSubmit,
    isLoading,
    createModalOpen,
    setCreateModalOpen,
    reset,
    setEditValues,
    editValues,
  } = useDocumentAttachForm();

  const columns = useMemo(
    () => [
      {
        accessorKey: "table",
        header: "Table",
        size: 200,
      },
      {
        accessorKey: "document_type_id",
        header: "DocumentType",
        size: 200,
      },
      {
        accessorKey: "category",
        header: "Category",
        size: 200,
      },
      {
        accessorKey: "subCategory",
        header: "Sub Category",
        size: 200,
      },
      {
        accessorKey: "Description",
        header: "Description",
        size: 200,
      },
    ],
    []
  );

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
      await dispatch(deleteDocumentAccess(deleteData.original.uuid)).unwrap();

      showSuccessToast(
        CommonMessage.MFS00002.replace("%s", "Document Access")
      );
    
      await dispatch(getDocumentAccesses());
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
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }} className = "margin-top-8" >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">Document Access List</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={documentAccesses ?? []}
          muiTableContainerProps={{ sx: { maxHeight: "calc(100vh - 220px)" } }}
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
            // <MenuItem key="edit" onClick={() => editClick(row)}>
            //   <ListItemIcon>
            //     <Edit />
            //   </ListItemIcon>
            //   Edit
            // </MenuItem>,
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
        <CreateNewDocumentModal
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

export default DocumentAttachIndex;
