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
import CreateEditEmailSetupModel from "./CreateEditEmailSetupModel";
import { useMemo, useState } from "react";
import { Edit } from "@mui/icons-material";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { showSuccessToast } from "common/ToastMessage";
import useEmailSetupForm from "./EmailSetupHook";
import { deleteEmailSetup, getEmailSetups } from "modules/administration/slices/emailSetupSlice";

const EmailSetupIndex = () => {
  const dispatch = useDispatch();

  const [editFlag, setEditFlag] = useState(false); // edit flag
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [deleteData, setDeleteData] = useState([]); // want to delete data
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body

  const {
    control,
    emailSetups,
    onSubmit,
    handleSubmit,
    isLoading,
    createModalOpen,
    setCreateModalOpen,
    reset,
    setEditValues,
    editValues,
  } = useEmailSetupForm();

  const columns = useMemo(
    () => [
      {
        accessorKey: "user_name",
        header: "User Name",
        size: 200,
      },
      {
        accessorKey: "mail_from_name",
        header: "Mail From Name",
        size: 200,
      },
      {
        accessorKey: "mail_from_address",
        header: "Mail From Address",
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
      await dispatch(deleteEmailSetup(deleteData.original.uuid)).unwrap();
      
      showSuccessToast(CommonMessage.MFS00002.replace("%s", "Email Setup"));

      await dispatch(getEmailSetups());
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
        <Typography color="text.primary">Email Setup List</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={emailSetups ?? []}
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
        <CreateEditEmailSetupModel
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

export default EmailSetupIndex;
