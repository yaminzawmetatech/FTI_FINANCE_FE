import * as React from "react";
import { useCallback, useMemo, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { MaterialReactTable } from "material-react-table";
import { useDispatch } from "react-redux";
import {
  Breadcrumbs,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { getUsers, deleteUsers } from "features/users/usersSlice";
import CreateEditUserModal from "./CreateEditUserModal";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import useUserListForm from "./UserListHook";
import { Edit } from "../../../../node_modules/@mui/icons-material/index";

const UsersList = () => {
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirm modal open
  const [deleteData, setDeleteData] = useState([]); // for store delete data
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body
  const [editFlag, setEditFlag] = useState(false); // edit flag

  const {
    isLoading,
    onSubmit,
    handleSubmit,
    control,
    users,
    watch,
    reset,
    userGroups,
    nrcStates,
    nrcTownships,
    nrcRemarks,
    departments,
    positions,
    createModalOpen,
    setCreateModalOpen,
    setEditValues,
  } = useUserListForm();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // define columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "user_name",
        header: "User Name",
        size: 200,
      },
      {
        accessorKey: "password",
        header: "Password",
        size: 200,
        show: false,
      },
      {
        accessorKey: "password_confirmation",
        header: "Confirm Password",
        size: 200,
        show: false,
      },
      {
        accessorKey: "father_name",
        header: "Father Name",
        size: 200,
      },
      {
        accessorKey: "dob",
        header: "Date of Birth",
        size: 200,
      },
      {
        accessorKey: "nrc_state",
        header: "NRC State",
        size: 200,
      },
      {
        accessorKey: "nrc_township",
        header: "NRC Township",
        size: 200,
      },
      {
        accessorKey: "nrc_remark",
        header: "NRC Remark",
        size: 200,
      },
      {
        accessorKey: "nrc_number",
        header: "NRC number",
        size: 200,
      },
      {
        accessorKey: "nrc",
        header: "Full NRC",
        size: 200,
      },
      {
        accessorKey: "csc",
        header: "CSC",
        size: 200,
      },
      {
        accessorKey: "userGroup",
        header: "User Group",
        size: 200,
      },
      {
        accessorKey: "department",
        header: "Department",
        size: 200,
      },
      {
        accessorKey: "position",
        header: "Position",
        size: 200,
      },
      // {
      //   accessorKey: "customer_web_role_name",
      //   header: "Customer Web Role Name",
      //   size: 200,
      // },
      {
        accessorKey: "level",
        header: "Level",
        size: 200,
      },
      {
        accessorKey: "personal_email",
        header: "Personal Email",
        size: 200,
      },
      {
        accessorKey: "office_email",
        header: "Office Email",
        size: 200,
      },
      {
        accessorKey: "personal_phone",
        header: "Personal Phone",
        size: 200,
      },
      {
        accessorKey: "company_phone",
        header: "Company Phone",
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
    dispatch(getUsers());
  }, [dispatch]);

  const handleDeleteRow = (row) => {
    setIsDeleteModalOpen(true);
    setConfirmMessage(CommonMessage.MFC00001);
    setDeleteData(row);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteData([]);
  };

  const initialState = {
    columnVisibility: {
      password: false,
      password_confirmation: false,
      nrc_state_id: false,
      nrc_township_id: false,
      nrc_remark: false,
      nrc_number: false,
    },
    // ... other initial state properties
  };

  const handleDeleteConfirmed = async () => {
    setIsDeleteModalOpen(false);
    try {
      // call delete api
      const responseData = await dispatch(
        deleteUsers(deleteData.original.uuid)
      );
      if (responseData) {
        if (responseData.payload && responseData.payload.success === true) {
          showSuccessToast(CommonMessage.MFS00002.replace("%s", "User"));
        } else if (
          responseData.error &&
          responseData.error.message === "Rejected"
        ) {
          if (typeof responseData.payload === "string") {
            showErrorToast(responseData.payload);
          }
        }
      }
      await dispatch(getUsers());
      setConfirmMessage("");
    } catch (error) {
      showErrorToast(CommonMessage.MFE00009.replace("%s", "deleting User"));
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
        <Typography color="text.primary">User List</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={users ?? []}
          initialState={initialState}
          muiTableContainerProps={{ sx: { maxHeight: "calc(100vh - 220px)" } }}
          muiTableBodyCellEditTextFieldProps={{
            variant: "outlined",
          }}
          enableStickyHeader
          enableColumnOrdering
          enableRowActions
          enableColumnResizing
          columnResizeMode="onChange"
          positionActionsColumn="last"
          state={{ isLoading: isLoading }} //pass our managed row selection state to the table to use
          enablePinning
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "0.5rem",
                }}
              >
                <Button
                  onClick={() => setCreateModalOpen(true)}
                  variant="contained"
                >
                  Create New
                </Button>
              </div>
            );
          }}
        />
        <CreateEditUserModal
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          setEditValues={setEditValues}
          editFlag={editFlag}
          setEditFlag={setEditFlag}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          watch={watch}
          reset={reset}
          userGroups={userGroups}
          nrcStates={nrcStates}
          nrcTownships={nrcTownships}
          nrcRemarks={nrcRemarks}
          departments={departments}
          positions={positions}
        />
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={handleDeleteModalClose}
          onDelete={handleDeleteConfirmed}
          message={confirmMessage}
          watch={watch}
          userGroups={userGroups}
          nrcStates={nrcStates}
          nrcTownships={nrcTownships}
          nrcRemarks={nrcRemarks}
          departments={departments}
          positions={positions}
        />
      </Paper>
    </Box>
  );
};

export default UsersList;
