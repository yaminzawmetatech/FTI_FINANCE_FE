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
import DeleteIcon from "@mui/icons-material/Delete";
import { MaterialReactTable } from "material-react-table";
import { useDispatch } from "react-redux";
import { useCallback, useMemo, useState, useEffect } from "react";
import {
  getNRCStates,
  batchDeleteNRCStates,
  deleteNRCState,
} from "features/nrc/NRCState/nrcStateSlice";
import CreateEditNRCStateModal from "./CreateEditNRCStateModal";
import NRCStateImportButton from "./NRCStateImportButton";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../../common/ToastMessage";
import { Edit } from "../../../../../node_modules/@mui/icons-material/index";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import CommonMessage from "common/CommonMessage";
import useNRCStateForm from "./NRCStateHook";

const NRCStateIndex = () => {
  const dispatch = useDispatch();
  const [rowSelection, setRowSelection] = useState({});
  const [editFlag, setEditFlag] = useState(false); // edit flag
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [batchDeleteFlag, setBatchDeleteFlag] = useState(false);
  const [deleteData, setDeleteData] = useState([]); // want to delete data
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body

  const {
    control,
    nrcStates,
    onSubmit,
    handleSubmit,
    isLoading,
    createModalOpen,
    setCreateModalOpen,
    reset,
    setEditValues,
    editValues,
  } = useNRCStateForm();

  const columns = useMemo(
    () => [
      {
        accessorKey: "state_code",
        header: "NRC State Code",
        size: 250,
      },
      {
        accessorKey: "name",
        header: "State",
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
  }, [dispatch]);

  const fetchApi = useCallback(() => {
    dispatch(getNRCStates());
  }, [dispatch]);

  // click delete button to delete multiple data
  const batchDelete = () => {
    if (Object.keys(rowSelection).length === 0) {
      showErrorToast(CommonMessage.MFE00014);
    } else {
      setIsDeleteModalOpen(true);
      setDeleteData(Object.keys(rowSelection));
      setConfirmMessage(CommonMessage.MFC00002);
      setBatchDeleteFlag(true);
    }
  };

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
    setBatchDeleteFlag(false);
  };

  // confirm to delete
  const handleDeleteConfirmed = async () => {
    setIsDeleteModalOpen(false);
    try {
      // call delete api
      if (batchDeleteFlag === false) {
        await dispatch(deleteNRCState(deleteData.original.uuid)).unwrap();
      } else {
        await dispatch(batchDeleteNRCStates(deleteData)).unwrap();
      }

      showSuccessToast(CommonMessage.MFS00002.replace("%s", "NRC State"));
      await dispatch(getNRCStates());
      setBatchDeleteFlag(false);
      setConfirmMessage("");
    } catch (error) {
      setBatchDeleteFlag(false);
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
        <Typography color="text.primary">NRC / State</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={nrcStates ?? []}
          muiTableContainerProps={{ sx: { maxHeight: "calc(100vh - 220px)" } }}
          enableStickyHeader
          enableColumnOrdering
          enableRowActions
          enableColumnResizing
          //debugTable={isError}
          columnResizeMode="onChange"
          positionActionsColumn="last"
          enablePinning
          enableRowSelection
          getRowId={(row) => row.uuid} //give each row a more useful id
          onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
          state={{ rowSelection, isLoading: isLoading }} //pass our managed row selection state to the table to use
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
                  <Box
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

                    <NRCStateImportButton fetchApi={fetchApi} />
                  </Box>

                  <Button
                    startIcon={<DeleteIcon />}
                    onClick={() => batchDelete()}
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button>
                </div>
              </>
            );
          }}
        />
        <CreateEditNRCStateModal
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

export default NRCStateIndex;
