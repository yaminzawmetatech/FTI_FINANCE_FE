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
  getAddressDistricts,
  deleteAddressDistrict,
  batchDeleteAddressDistricts,
} from "../../../../features/address/District/addressDistrictSlice";
import { showSuccessToast, showErrorToast } from "common/ToastMessage";
import { Edit } from "../../../../../node_modules/@mui/icons-material/index";
import DistrictListBarExcelImportButton from "./DistrictListBarExcelImportButton";
import useAddressDistrictForm from "./AddressDistrictHook";
import CommonMessage from "common/CommonMessage";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import CreateEditAddressDistrictModal from "../District/CreateEditAddressDistrictModal";
import AssignCMCOModal from "../Township/AssignCMCOModal";
import CMCOListModal from "../Township/CMCOList";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssignCMCEModal from "./AssignCMCEModal";
import CMCEListModal from "./CMCEList";

const AddressDistrictIndex = () => {
  const dispatch = useDispatch();
  const [editFlag, setEditFlag] = useState(false); // edit flag
  const [batchDeleteFlag, setBatchDeleteFlag] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState();
  const [districtId, setDistrictId] = useState();
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [cmcoListModalOpen, setCmcoListModalOpen] = useState(false);
  const [assignModalsOpen, setAssignModalsOpen] = useState(false);
  const [cmcoListModalsOpen, setCmcoListModalsOpen] = useState(false);

  const {
    isLoading,
    onSubmit,
    handleSubmit,
    control,
    addressStates,
    addressDistricts,
    createModalOpen,
    setCreateModalOpen,
    setEditValues,
    reset,
  } = useAddressDistrictForm();

  const columns = useMemo(
    () => [
      {
        accessorKey: "district_code",
        header: "District Code",
        size: 200,
      },
      {
        accessorKey: "name",
        header: "District Name",
        size: 200,
      },
      {
        accessorKey: "district_mya_mm3",
        header: "District Myanmar",
        size: 200,
      },
      {
        accessorKey: "address_state",
        header: "State",
        size: 200,
        //Edit: ({ cell, column, table }) => <Autocomplete />,
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

      // {
      //   accessorKey: "address_state_name",
      //   header: "State Name",
      //   size: 200,
      // },
    ],
    []
  );

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = useCallback(() => {
    dispatch(getAddressDistricts());
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
        await dispatch(deleteAddressDistrict(deleteData.id)).unwrap();
      } else {
        await dispatch(batchDeleteAddressDistricts(deleteData)).unwrap();
      }

      showSuccessToast(
        CommonMessage.MFS00002.replace("%s", "Address District")
      );
      await dispatch(getAddressDistricts());
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
    setDistrictId(row.original.id);
    setCmcoListModalOpen(true);
  };

  const assignCMCEClick = (row) => {
    setData(row.original);
    setAssignModalsOpen(true);
  };

  const viewCMCEClick = (row) => {
    setDistrictId(row.original.id);
    setCmcoListModalsOpen(true);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 1 }}
        className="margin-top-8"
      >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">Address / District</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={addressDistricts ?? []}
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
            <MenuItem key="variation" onClick={() => assignCMCOClick(row)}>
              <ListItemIcon>
                <AssignmentIndIcon />
              </ListItemIcon>
              Asign Application CMCO
            </MenuItem>,
            <MenuItem key="list" onClick={() => viewCMCOClick(row)}>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              CMCO Application List
            </MenuItem>,
            <MenuItem key="variation" onClick={() => assignCMCEClick(row)}>
              <ListItemIcon>
                <AssignmentIndIcon />
              </ListItemIcon>
              Asign Collateral CMCE
            </MenuItem>,
            <MenuItem key="list" onClick={() => viewCMCEClick(row)}>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              CMCE Collateral List
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
                    <DistrictListBarExcelImportButton fetchApi={fetchApi} />
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

        <CreateEditAddressDistrictModal
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
          townshipId={districtId}
        />
        <AssignCMCEModal
          open={assignModalsOpen}
          onClose={() => setAssignModalsOpen(false)}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          reset={reset}
          data={data}
          control={control}
        />
        <CMCEListModal
          open={cmcoListModalsOpen}
          onClose={() => setCmcoListModalsOpen(false)}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          reset={reset}
          townshipId={districtId}
        />
      </Paper>
    </Box>
  );
};

export default AddressDistrictIndex;
