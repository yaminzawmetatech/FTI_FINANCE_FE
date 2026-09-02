import * as React from "react";
import { useState } from "react";
import { AppBar } from "@mui/material";
import { Button } from "@mui/material";
import { showSuccessToast } from "common/ToastMessage";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { useDispatch } from "react-redux";
import { batchDeleteAddressWards, getAddressWardList } from "features/address/Ward/addressWardSlice";
import CreateEditAddressWardModal from "./CreateEditAddressWardModal";
import WardListBarExcelImportButton from "./WardListBarExcelImportButton";
import useAddressWardForm from "./AddressWardHook";

const WardAppBar = ({ fetchApi, selectedRows }) => {
  const dispatch = useDispatch();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body

  const { onSubmit, handleSubmit, control, reset } =
    useAddressWardForm();

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
      await dispatch(batchDeleteAddressWards(uuidArray)).unwrap();

      showSuccessToast(CommonMessage.MFS00002.replace("%s", "Address Wards"));

      await dispatch(
        getAddressWardList({
          firstFetch: true,
        })
      );
      setConfirmMessage("");
    } catch (error) {
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
            <Button
              variant="outlined"
              style={{ borderColor: "red", color: "red", marginRight: "3px" }}
              onClick={batchDelete}
            >
              Delete
            </Button>
            <Button variant="contained" onClick={handleCreateEdit}>
              Create New
            </Button>
            <WardListBarExcelImportButton fetchApi={fetchApi} />
          </div>
        </div>
      </AppBar>
      <CreateEditAddressWardModal
        open={open}
        onClose={() => setOpen(false)}
        editFlag={false}
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
    </>
  );
};

export default React.memo(WardAppBar);
