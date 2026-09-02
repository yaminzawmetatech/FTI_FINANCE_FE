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
import { Delete } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { MaterialReactTable } from "material-react-table";
import { useDispatch } from "react-redux";
import { useCallback, useMemo, useState, useEffect } from "react";
import {
  getAddressTownships,
  deleteAddressTownship,
  batchDeleteAddressTownships,
} from "features/address/Township/addressTownshipSlice";
import { showSuccessToast, showErrorToast } from "common/ToastMessage";
import { Edit } from "../../../../../node_modules/@mui/icons-material/index";
import TownshipListBarExcelImportButton from "./TownshipListBarExcelImportButton";
import useAddressTownshipForm from "./AddressTownshipHook";
import CommonMessage from "common/CommonMessage";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import CreateEditAddressTownshipModal from "../Township/CreateEditAddressTownshipModal";
import AssignCMCOModal from "./AssignCMCOModal";
import CMCOListModal from "./CMCOList";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ListAltIcon from "@mui/icons-material/ListAlt";


const AddressTownshipIndex = () => {
  const dispatch = useDispatch();
  const [editFlag, setEditFlag] = useState(false); // edit flag
  const [batchDeleteFlag, setBatchDeleteFlag] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [rowSelection, setRowSelection] = useState({});
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [cmcoListModalOpen, setCmcoListModalOpen] = useState(false);
  const [data, setData] = useState();
  const [townshipId, setTownshipId] = useState();

  const {
    isLoading,
    onSubmit,
    handleSubmit,
    control,
    addressStates,
    addressDistricts,
    addressTownships,
    createModalOpen,
    setCreateModalOpen,
    setEditValues,
    reset,
  } = useAddressTownshipForm();

  const columns = useMemo(
    () => [
      {
        accessorKey: "ts_pcode",
        header: "Township Code",
        size: 200,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 200,
      },
      {
        accessorKey: "township_mya_mm3",
        header: "Township Myanmar",
        size: 200,
      },
      {
        accessorKey: "address_state",
        header: "State",
        size: 200,
      },
      {
        accessorKey: "address_district",
        header: "District",
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

  const fetchApi = useCallback(() => {
    dispatch(getAddressTownships());
  }, [dispatch]);

  useEffect(() => {
    fetchApi();
  }, []);

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

  //delete modal close
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteData([]);
    setBatchDeleteFlag(false);
  };

  //confirm to delete
  const handleDeleteConfirmed = async () => {
    setIsDeleteModalOpen(false);
    try {
      //call delete api
      if (batchDeleteFlag === false) {
        await dispatch(deleteAddressTownship(deleteData.id)).unwrap();
      } else {
        await dispatch(batchDeleteAddressTownships(deleteData)).unwrap();
      }

      showSuccessToast(
        CommonMessage.MFS00002.replace("%s", "Address Township")
      );

      await dispatch(getAddressTownships());
      setBatchDeleteFlag(false);
      setConfirmMessage("");
    } catch (error) {
      setBatchDeleteFlag(false);
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

  const assignCMCOClick = (row) => {
    setData(row.original);
    setAssignModalOpen(true);
  };

  const viewCMCOClick = (row) => {
    setTownshipId(row.original.id);
    setCmcoListModalOpen(true);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 1 }}
        className="margin-top-8"
      >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">Address / Township</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={addressTownships ?? []}
          muiTableContainerProps={{ sx: { maxHeight: "calc(100vh - 220px)" } }}
          enableStickyHeader
          enableColumnOrdering
          enableRowActions
          enableColumnResizing
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
            // <MenuItem key="variation" onClick={() => assignCMCOClick(row)}>
            //   <ListItemIcon>
            //     <AssignmentIndIcon />
            //   </ListItemIcon>
            //   Asign CMCO
            // </MenuItem>,
            // <MenuItem key="list" onClick={() => viewCMCOClick(row)}>
            //   <ListItemIcon>
            //     <ListAltIcon />
            //   </ListItemIcon>
            //   CMCO List
            // </MenuItem>,
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
                    <TownshipListBarExcelImportButton fetchApi={fetchApi} />
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

        <CreateEditAddressTownshipModal
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          setEditValues={setEditValues}
          editFlag={editFlag}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          reset={reset}
          addressStates={addressStates}
          addressDistricts={addressDistricts}
        />
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={handleDeleteModalClose}
          onDelete={handleDeleteConfirmed}
          message={confirmMessage}
        />
        <AssignCMCOModal
          open={assignModalOpen}
          onClose={() => setAssignModalOpen(false)}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          reset={reset}
          data={data}
          control={control}
        />
        <CMCOListModal
          open={cmcoListModalOpen}
          onClose={() => setCmcoListModalOpen(false)}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          reset={reset}
          townshipId={townshipId}
        />
      </Paper>
    </Box>
  );
};

export default AddressTownshipIndex;
