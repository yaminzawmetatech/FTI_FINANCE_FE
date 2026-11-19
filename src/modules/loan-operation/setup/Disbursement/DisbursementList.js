import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
  Breadcrumbs,
  Button,
  Checkbox,
  ListItemIcon,
  MenuItem,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { MaterialReactTable } from "material-react-table";
import CreateEditDisbursementModal from "./CreateEditDisbursementModal";
import { useMemo, useState } from "react";
import {
  getDisbursements,
  deleteDisbursement,
} from "modules/loan-operation/slices/disbursementSlice";
import { Edit } from "@mui/icons-material";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { showSuccessToast } from "common/ToastMessage";
import useDisbursementForm from "./DisbursementHook";

const DisbursementList = () => {
  const dispatch = useDispatch();
  const [editFlag, setEditFlag] = useState(false); // edit flag
  const [initialValues, setInitialValues] = useState(); // for store initial state to give edit modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [deleteData, setDeleteData] = useState([]); // want to delete data
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body

  const {
    control,
    disbursements,
    onSubmit,
    handleSubmit,
    isLoading,
    createModalOpen,
    setCreateModalOpen,
    reset,
    setEditValues,
    editValues,
  } = useDisbursementForm();

  const columns = useMemo(
    () => [
      {
        accessorKey: "category",
        header: "Product Category",
        size: 200,
      },
      {
        accessorKey: "disbursement_to",
        header: "Disbursement To",
        size: 200,
      },
      {
        accessorKey: "disbursement_type",
        header: "Disbursement Type",
        size: 250,
      },
      {
        accessorKey: "way_to_calculate",
        header: "Ways To Calculate",
        size: 250,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 250,
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
      await dispatch(
        deleteDisbursement(deleteData.original.uuid)
      ).unwrap();
  
      showSuccessToast(
        CommonMessage.MFS00002.replace("%s", "Disbursement")
      );

      await dispatch(getDisbursements());
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

    // Loop through the keys and replace "---" with ""
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
        <Typography color="text.primary">Disbursement List</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={disbursements ?? []}
          muiTableContainerProps={{ sx: { maxHeight: "calc(100vh - 220px)" } }}
          enableStickyHeader
          enableColumnOrdering
          enableRowActions
          enableColumnResizing
          //debugTable={isError}
          columnResizeMode="onChange"
          state={{ isLoading: isLoading }}
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
        <CreateEditDisbursementModal
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

export default DisbursementList;
