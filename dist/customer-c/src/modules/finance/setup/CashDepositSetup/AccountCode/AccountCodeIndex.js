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
import CreateEditAccountCodeModel from "./CreateEditAccountCodeModal";
import { useMemo, useState } from "react";
import {
  getAccountCodes,
  deleteAccountCode,
} from "modules/finance/slices/accountCodeSlice";
import { Edit } from "@mui/icons-material";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import CommonMessage from "common/CommonMessage";
import {
  showSuccessToast,
  showErrorToast,
} from "common/ToastMessage";
import useAccountCodeForm from "./AccountCodeHook";
import AccountCodeImportButton from "./AccountCodeImportButton";
import { useEffect } from "react";

const AccountCodeIndex = () => {
  const dispatch = useDispatch();

  const [editFlag, setEditFlag] = useState(false); // edit flag
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [deleteData, setDeleteData] = useState([]); // want to delete data
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body

  const [categoriesOverride, setCategoriesOverride] = useState([]); // for delete confirm message body
  const [subCategoriesOverride, setSubCategoriesOverride] = useState([]); // for delete confirm message body

  const {
    control,
    handleSubmit,
    isLoading,
    onSubmit,
    accountCodes,
    projectCategories,
    subCategories,
    banks,
    createModalOpen,
    setCreateModalOpen,
    reset,
    setEditValues,
    setValue,
  } = useAccountCodeForm();

  const columns = useMemo(
    () => [
      {
        accessorKey: "category",
        header: "Product Category",
        size: 200,
      },
      {
        accessorKey: "sub_category",
        header: "Sub Category",
        size: 200,
      },
      {
        accessorKey: "bank",
        header: "Bank",
        size: 200,
      },
      {
        accessorKey: "account_no",
        header: "Account No.",
        size: 200,
      },
      {
        accessorKey: "name",
        header: "Account Name",
        size: 200,
      },
      {
        accessorKey: "type",
        header: "Balance Sheet",
        size: 200,
      },
      {
        accessorKey: "description", //access nested data with dot notation
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
      await dispatch(deleteAccountCode(deleteData.original.uuid)).unwrap();

      showSuccessToast(CommonMessage.MFS00002.replace("%s", "Account Code"));

      await dispatch(getAccountCodes({params:{}}));
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

    for (const key in updatedValues) {
      if (updatedValues[key] === "---") {
        updatedValues[key] = "";
      }
    }
    setEditValues(updatedValues);
  };

  const handleCategorySelect = (value) => {
    if (value) {
      const filteredSubCategory = subCategories.filter(
        (option) => option.category_id === value?.id
      );
      setSubCategoriesOverride(filteredSubCategory);
      setValue("sub_category_id", null);
    } else {
      setSubCategoriesOverride([]);
      setValue("sub_category_id", null);
    }
  };

  useEffect(() => {
    setCategoriesOverride(projectCategories);
    setSubCategoriesOverride(subCategories);
  }, [projectCategories, subCategories]);

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 1 }}
        className="margin-top-8"
      >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">Bank List</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={accountCodes ?? []}
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
                  }}
                >
                  <Button
                    onClick={() => {
                      setCreateModalOpen(true);
                      setEditFlag(false);
                    }}
                    variant="contained"
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    Create New
                  </Button>
                  {/* <BlackListCustomerExcelImportButton fetchApi={fetchApi} /> */}
                  <AccountCodeImportButton
                    fetchApi={getAccountCodes}
                  ></AccountCodeImportButton>
                </div>
              </>
            );
          }}
        />
        <CreateEditAccountCodeModel
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          projectCategories={categoriesOverride}
          subCategories={subCategoriesOverride}
          banks={banks}
          setEditValues={setEditValues}
          editFlag={editFlag}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          reset={reset}
          handleCategorySelect={handleCategorySelect}
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

export default AccountCodeIndex;
