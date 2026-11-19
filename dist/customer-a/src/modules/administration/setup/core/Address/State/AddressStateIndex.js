import * as React from "react";
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
import { Delete, Edit } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { MaterialReactTable } from "material-react-table";
import { useDispatch } from "react-redux";
import { useCallback, useMemo, useState, useEffect } from "react";
import {
  getAddressStates,
  deleteAddressState,
  batchDeleteAddressStates,
} from "modules/administration/slices/addressStateSlice";
import StateListBarExcelImportButton from "./StateListBarExcelImportButton";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import CommonMessage from "common/CommonMessage";
import {
  showSuccessToast,
  showErrorToast,
} from "common/ToastMessage";
import useStateForm from "./StateHook";
import { reset } from "modules/credit-management/slices/applicationInformationSetupListSlice";
import CreateEditAddressStateModal from "./CreateEditAddressStateModal";

const AddressStateIndex = () => {
  const {
    control,
    onSubmit,
    handleSubmit,
    addressStates,
    createModalOpen,
    setCreateModalOpen,
    setEditValues,
    isError,
    isLoading,
  } = useStateForm();

  const [editFlag, setEditFlag] = useState(false); // edit flag
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [deleteData, setDeleteData] = useState([]); // want to delete data
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body
  const [rowSelection, setRowSelection] = useState({});
  const [batchDeleteFlag, setBatchDeleteFlag] = useState(false);

  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        accessorKey: "sr_pcode",
        header: "Code",
        size: 200,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 200,
      },
      {
        accessorKey: "state_mya_mm3",
        header: "State Myanmar",
        size: 200,
      },
      {
        accessorKey: "is_blacklisted",
        header: "Is BlackList",
        size: 200,
        Cell: ({ cell }) => {
          const row = cell.getValue();
          if (row === true) {
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

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = useCallback(() => {
    dispatch(getAddressStates());
  }, [dispatch]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

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

  // click edit button
  const editClick = (row) => {
    setCreateModalOpen(true);
    setEditFlag(true);

    const updatedValues = { ...row.original };

    //Loop through the keys and replace "---" with ""
    for (const key in updatedValues) {
      if (updatedValues[key] === "---") {
        updatedValues[key] = "";
      }
    }

    // set intitial value (validation in edit modal)
    setEditValues(updatedValues);
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
        await dispatch(deleteAddressState(deleteData.original.uuid)).unwrap();
      } else {
        await dispatch(batchDeleteAddressStates(deleteData)).unwrap();
      }

      showSuccessToast(CommonMessage.MFS00002.replace("%s", "Address State"));
      await dispatch(getAddressStates());
      setBatchDeleteFlag(false);
      setConfirmMessage("");
    } catch (error) {
      setBatchDeleteFlag(false);
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
        <Typography color="text.primary">Address / State</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={addressStates ?? []}
          muiTableContainerProps={{ sx: { maxHeight: "calc(100vh - 220px)" } }}
          enableStickyHeader
          editingMode="modal" //default
          enableColumnOrdering
          //enableEditing // close the default edit
          enableRowActions
          enableColumnResizing
          debugTable={isError}
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
                        setEditValues([]);
                        setCreateModalOpen(true);
                        setEditFlag(false);
                      }}
                      variant="contained"
                    >
                      Create New
                    </Button>

                    <StateListBarExcelImportButton fetchApi={fetchApi} />
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
        <CreateEditAddressStateModal
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

export default AddressStateIndex;
