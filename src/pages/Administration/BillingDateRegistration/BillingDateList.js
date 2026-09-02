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
import CreateEditBillingDateModal from "./CreateEditBillingDateModal";
import { useMemo, useState } from "react";
import {
  getBillingDates,
  deleteBillingDate,
} from "../../../features/billingDateRegistration/billingDateSlice";
import { Edit } from "../../../../node_modules/@mui/icons-material/index";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { showSuccessToast } from "common/ToastMessage";
import useBillingDateForm from "./BillingDateHook";

const BillingDateList = () => {
  const dispatch = useDispatch();
  
  const [editFlag, setEditFlag] = useState(false); // edit flag
  const [initialValues, setInitialValues] = useState(); // for store initial state to give edit modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [deleteData, setDeleteData] = useState([]); // want to delete data
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body

  const {
    control,
    billingDates,
    onSubmit,
    handleSubmit,
    isLoading,
    setValue,
    createModalOpen,
    setCreateModalOpen,
    reset,
    setEditValues,
    editValues
  } = useBillingDateForm();

  const columns = useMemo(
    () => [
      {
        accessorKey: "mnet_township_code",
        header: "MNet Township Code",
        size: 200,
      },
      {
        accessorKey: "mnet_township",
        header: "MNet Township",
        size: 200,
      },
      {
        accessorKey: "township",
        header: "Township",
        size: 200,
      },
      {
        accessorKey: "city",
        header: "City",
        size: 200,
      },
      {
        accessorKey: "ward",
        header: "Ward",
        size: 250,
      },
      {
        accessorKey: "collection_date_range",
        header: "Collection Date Range",
        size: 250,
      },
      {
        accessorKey: "first_due_date",
        header: "First Due Date",
        size: 200,
      },
      {
        accessorKey: "version",
        header: "Version",
        size: 200,
      },
      {
        accessorKey: "version_start_date",
        header: "Version Start Date",
        size: 200,
      },
      {
        accessorKey: "version_end_date",
        header: "Version End Date",
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
      await dispatch(deleteBillingDate(deleteData.original.uuid)).unwrap();
      
      showSuccessToast(
        CommonMessage.MFS00002.replace("%s", "Billing Dates")
      );
       
      await dispatch(getBillingDates());
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
        <Typography color="text.primary">Billing Date List</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={billingDates ?? []}
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
        <CreateEditBillingDateModal
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
          setValue={setValue}
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

export default BillingDateList;
