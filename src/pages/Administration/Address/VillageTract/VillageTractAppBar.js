import * as React from "react";
import { useState } from "react";
import { AppBar } from "@mui/material";
import CreateEditAddressVillageTractModal from "./CreateEditAddressVillageTractModal";
import useAddressVillageTractForm from "./AddressVillageTractHook";
import { Button } from "@mui/material";
import { showSuccessToast } from "common/ToastMessage";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { useDispatch } from "react-redux";
import { batchDeleteAddressVillageTracts, getAddressVillageTractList } from "features/address/VillageTract/addressVillageTractSlice";
import VillageTractListBarExcelImportButton from "./VillageTractListBarExcelImportButton";

const VillageTractAppBar = ({ fetchApi, selectedRows }) => {
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
      await dispatch(batchDeleteAddressVillageTracts(uuidArray)).unwrap();

      showSuccessToast(CommonMessage.MFS00002.replace("%s", "Address Village Tact"));

      await dispatch(
        getAddressVillageTractList({
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
            <VillageTractListBarExcelImportButton fetchApi={fetchApi} />
          </div>
        </div>
      </AppBar>
      <CreateEditAddressVillageTractModal
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

export default React.memo(VillageTractAppBar);
