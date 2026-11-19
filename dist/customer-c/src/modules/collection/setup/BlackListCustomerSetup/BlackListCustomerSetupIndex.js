import * as React from "react";
import { useCallback, useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Paper,
  Breadcrumbs,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link,} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  batchDeleteBlacklistCustomers,
  deleteBlacklistCustomer,
  getBlacklistCustomers,
} from "modules/administration/slices/blacklistCustomerSlice";
import openNewWindow from "utils/windowUtils";
import DeleteIcon from "@mui/icons-material/Delete";
import BlackListCustomerExcelImportButton from "./BlackListCustomerExcelImportButton";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";

const BlackListCustomerSetupIndex = () => {
  const { blacklistCustomers, isLoading, isSuccess, isError, message } =
    useSelector((state) => state.blacklistCustomers);

  const [batchDeleteFlag, setBatchDeleteFlag] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [rowSelection, setRowSelection] = useState({});

  // create table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "black_list_customer_code",
        header: "Code",
        size: 200,
      },
      {
        accessorKey: "black_list_customer_name",
        header: "Name",
        size: 200,
      },
      {
        accessorKey: "full_nrc",
        header: "NRC",
        size: 250,
      },
      {
        accessorKey: "father_name",
        header: "Father Name",
        size: 250,
      },
      {
        accessorKey: "passport_no",
        header: "Passport No",
        size: 250,
      },
      {
        accessorKey: "full_address",
        header: "Address",
        size: 250,
      },
      {
        accessorKey: "nationality",
        header: "Nationality",
        size: 250,
      },
      {
        accessorKey: "entity_and_other_groups",
        header: "Entity & Other Groups",
        size: 250,
      },
      {
        accessorKey: "source",
        header: "Source",
        size: 250,
      },
      {
        accessorKey: "removal_type",
        header: "Removal Type",
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

  const dispatch = useDispatch();

  useEffect(() => {
    fetchApi();
  }, [dispatch]);

  const fetchApi = useCallback(() => {
    dispatch(getBlacklistCustomers());
  }, [dispatch]);

  // for Excel Import

  // // create blacklist customer function
  // const handleCreateNewRow = (values) => {
  //   dispatch(createBlacklistCustomer(values))
  //   dispatch(getBlacklistCustomers())
  // };

  // // update blacklist customer function
  // const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
  //   let id = row.original.uuid;
  //   dispatch(updateBlacklistCustomer({ id, newData:values }))
  //   dispatch(getBlacklistCustomers())

  //   exitEditingMode();
  // };

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
        await dispatch(deleteBlacklistCustomer(deleteData.id)).unwrap();
      } else {
        await dispatch(batchDeleteBlacklistCustomers(deleteData)).unwrap();
      }
      showSuccessToast(
        CommonMessage.MFS00002.replace("%s", "Black List Customer")
      );

      await dispatch(getBlacklistCustomers());
      setBatchDeleteFlag(false);
      setConfirmMessage("");
    } catch (error) {
      setBatchDeleteFlag(false);
      console.error("Error", error);
    }
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ mb: 1 }}
          className="margin-top-8"
        >
          <Typography color="text.primary">Administration</Typography>
          <Typography color="text.primary">BlackList Customer List</Typography>
        </Breadcrumbs>

        <Paper sx={{ width: "100%" }}>
          <MaterialReactTable
            columns={columns}
            data={blacklistCustomers ?? []}
            muiTableContainerProps={{
              sx: { maxHeight: "calc(100vh - 220px)" },
            }}
            enableStickyHeader
            editingMode="modal" //default
            enableColumnOrdering
            //enableEditing
            enableRowActions
            enableColumnResizing
            debugTable={isError}
            columnResizeMode="onChange"
            //onEditingRowSave={handleSaveRowEdits}
            //onEditingRowCancel={handleCancelRowEdits}
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
              <MenuItem
                onClick={() =>
                  openNewWindow(
                    `/administration/edit-black-list-customer/${row.original.uuid}/edit`
                  )
                }
                component={Link}
                key="edit"
              >
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
                        variant="contained"
                        onClick={() =>
                          openNewWindow(
                            "/administration/create-black-list-customer/create"
                          )
                        }
                      >
                        Create New
                      </Button>

                      <BlackListCustomerExcelImportButton fetchApi={fetchApi} />
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
          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={handleDeleteModalClose}
            onDelete={handleDeleteConfirmed}
            message={confirmMessage}
          />
        </Paper>
      </Box>
    </>
  );
};

export default BlackListCustomerSetupIndex;
