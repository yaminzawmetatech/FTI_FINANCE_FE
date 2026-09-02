import * as React from "react";
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
import { MaterialReactTable } from "material-react-table";
import { useDispatch } from "react-redux";
import { useCallback, useMemo, useState, useEffect } from "react";
import { showSuccessToast } from "common/ToastMessage";
import { Edit } from "../../../../node_modules/@mui/icons-material/index";
import useFollowUpResultForm from "./FollowUpResultHook";
import CommonMessage from "common/CommonMessage";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import CreateEditFollowUpResultModal from "./CreateEditFollowUpResultModal";
import { deleteFollowUpResult, getFollowUpResults } from "features/FollowUpResult/followUpResultSlice";

const FollowUpResultIndex = () => {
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
    followUpResults,
    createModalOpen,
    setCreateModalOpen,
    setEditValues,
    reset,
  } = useFollowUpResultForm();

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
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

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = useCallback(() => {
    dispatch(getFollowUpResults());
  }, [dispatch]);

  // click delete button
  const handleDeleteRow = (row) => {
    setIsDeleteModalOpen(true);
    setConfirmMessage(CommonMessage.MFC00001);
    setDeleteData(row);
  };

  //delete modal close
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteData([]);
  };

  //confirm to delete
  const handleDeleteConfirmed = async () => {
    setIsDeleteModalOpen(false);
    try {
      //call delete api
      await dispatch(deleteFollowUpResult(deleteData.original.uuid)).unwrap();

      showSuccessToast(CommonMessage.MFS00002.replace("%s", "Follow Up Result"));

      await dispatch(getFollowUpResults());
      setConfirmMessage("");
    } catch (error) {
      console.error("Error", error);
    }
  };

  //click edit button
  const editClick = (row) => {
    setCreateModalOpen(true);
    setEditValues(row);
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
        <Typography color="text.primary">Follow Up Result Setup</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
      <MaterialReactTable
          columns={columns}
          data={followUpResults ?? []}
          muiTableContainerProps={{ sx: { maxHeight: "calc(100vh - 220px)" } }}
          enableStickyHeader
          enableColumnOrdering
          enableRowActions
          enableColumnResizing
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

        <CreateEditFollowUpResultModal
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

export default FollowUpResultIndex;
