import * as React from "react";
import { useState } from "react";
import { AppBar } from "@mui/material";
import CreateEditAddressVillageTractModal from "./BlackListExcludeModal";
import useAddressVillageTractForm from "./BlackListAreaHook";
import { Button } from "@mui/material";
import { showSuccessToast } from "common/ToastMessage";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import CommonMessage from "common/CommonMessage";
import {
  batchDeleteAddressVillages,
  getAddressVillageList,
} from "features/address/Village/addressVillageSlice";
import { useDispatch } from "react-redux";
import BlackListAreaExcludeModal from "./BlackListExcludeCategoryModal";
import ExcelExportButton from "./BlackListExcelExportButton";

const BlackListAreaAppBar = ({ fetchApi, selectedRows, transformedSearchData }) => {
  const dispatch = useDispatch();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body

  const { onSubmit, handleSubmit, control, reset } =
    useAddressVillageTractForm();

  const [open, setOpen] = useState(false);

  const handleCreateEdit = () => {
    setOpen(true);
  };

  const batchDelete = () => {
    setIsDeleteModalOpen(true);
    setConfirmMessage(CommonMessage.MFC00002);
  };

  const handleDeleteConfirmed = async () => {
    setIsDeleteModalOpen(false);
    try {
      //call delete api
      const uuidArray = selectedRows
        ?.map((row) => row.uuid)
        .filter((uuid) => uuid);
      await dispatch(batchDeleteAddressVillages(uuidArray)).unwrap();

      showSuccessToast(CommonMessage.MFS00002.replace("%s", "Address Village"));

      await dispatch(
        getAddressVillageList({
          firstFetch: true,
        })
      );
      setConfirmMessage("");
    } catch (error) {
      console.log(error);
      console.error("Error", error);
    }
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fafafb",
          color: "black",
          boxShadow: "none",
          mb: 1,
          mt: -1,
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ marginLeft: "auto" }}>
            {/* <Button
              variant="outlined"
              style={{ borderColor: "red", color: "red", marginRight: "3px" }}
              onClick={batchDelete}
            >
              Delete
            </Button> */}
            <Button variant="contained" onClick={handleCreateEdit}>
              Exclude By Category
            </Button>
            <ExcelExportButton transformedSearchData={transformedSearchData} />
          </div>
        </div>
      </AppBar>
      <BlackListAreaExcludeModal
        open={open}
        onClose={() => setOpen(false)}
        editFlag={false}
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        reset={reset}
        selectedRows={selectedRows}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onDelete={handleDeleteConfirmed}
        message={confirmMessage}
      />
    </>
  );
};

export default React.memo(BlackListAreaAppBar);
