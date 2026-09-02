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
  batchDeleteNRCTownships,
  deleteNRCTownship,
  getNRCTownships,
} from "features/nrc/NRCTownship/nrcTownshipSlice";
import CreateEditNRCTownshipModal from "./CreateEditNRCTownshipModal";
import { getNRCStates } from "../../../../features/nrc/NRCState/nrcStateSlice";
import NRCTownshipImportButton from "./NRCTownshipImportButton";
import { Edit } from "../../../../../node_modules/@mui/icons-material/index";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { showSuccessToast, showErrorToast } from "common/ToastMessage";
import useNRCTownshipForm from "./NRCTownshipHook";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import NRCVariationModal from "./NRCVariationModal";
import ListAltIcon from "@mui/icons-material/ListAlt";
import NRCVariationListModal from "./NRCVariationList";

const NRCTownshipIndex = () => {
  const dispatch = useDispatch();

  const [editFlag, setEditFlag] = useState(false); // edit flag
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [batchDeleteFlag, setBatchDeleteFlag] = useState(false);
  const [deleteData, setDeleteData] = useState([]); // want to delete data
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body
  const [nrcTownshipId, setNrcTownshipId] = useState("");
  const [nrcStateId, setNrcStateId] = useState("");

  const {
    control,
    nrcStates,
    nrcTownships,
    onSubmit,
    handleSubmit,
    isLoading,
    createModalOpen,
    setCreateModalOpen,
    reset,
    setEditValues,
    editValues,
    variationModalOpen,
    setVariationModalOpen,
    variationListModalOpen,
    setVariationListModalOpen,
  } = useNRCTownshipForm();

  const columns = useMemo(
    () => [
      {
        accessorKey: "township_nrc_code",
        header: "NRC Township Code",
        size: 300,
      },
      {
        accessorKey: "name",
        header: "Township Name",
        size: 250,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 200,
      },
      {
        accessorKey: "n_r_c_state_code",
        header: "NRC State Code",
        size: 250,
      },
      {
        accessorKey: "n_r_c_state_name",
        header: "NRC State Name",
        size: 300,
      },
    ],
    []
  );

  useEffect(() => {
    fetchApi();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getNRCStates());
  }, []);

  const fetchApi = useCallback(() => {
    dispatch(getNRCTownships());
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
        await dispatch(deleteNRCTownship(deleteData.original.uuid)).unwrap();
      } else {
        await dispatch(batchDeleteNRCTownships(deleteData)).unwrap();
      }
      showSuccessToast(CommonMessage.MFS00002.replace("%s", "NRC Township"));

      await dispatch(getNRCTownships());
      setBatchDeleteFlag(false);
      setConfirmMessage("");
    } catch (error) {
      setBatchDeleteFlag(false);
      console.error("Error:", error);
    }
  };

  const [rowSelection, setRowSelection] = useState({});

  // click edit button
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

  const variationClick = (row) => {
    setNrcStateId(row.original.n_r_c_state_id);
    setNrcTownshipId(row.original.id);
    setVariationModalOpen(true);
  };

  const variationListClick = (row) => {
    setNrcTownshipId(row.original.id);
    setVariationListModalOpen(true);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 1 }}
        className="margin-top-8"
      >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">NRC / Township</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={nrcTownships ?? []}
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
            <MenuItem key="variation" onClick={() => variationClick(row)}>
              <ListItemIcon>
                <ChangeHistoryIcon />
              </ListItemIcon>
              Add Variation
            </MenuItem>,
            <MenuItem key="list" onClick={() => variationListClick(row)}>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              Variation List
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

                    <NRCTownshipImportButton fetchApi={fetchApi} />
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
        <CreateEditNRCTownshipModal
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
          nrcStates={nrcStates}
        />
        <NRCVariationModal
          open={variationModalOpen}
          onClose={() => setVariationModalOpen(false)}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          reset={reset}
          nrcStates={nrcStates}
          nrcTownshipId={nrcTownshipId}
          control={control}
          nrcStateId={nrcStateId}
        />
        <NRCVariationListModal
          open={variationListModalOpen}
          onClose={() => setVariationListModalOpen(false)}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          reset={reset}
          nrcTownships={nrcTownships}
          nrcTownshipId={nrcTownshipId}
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

export default NRCTownshipIndex;
