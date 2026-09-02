import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { AppBar } from "@mui/material";
import CommonMessage from "common/CommonMessage";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import {
  batchDeleteGuaranteeData,
  getGuaranteeData,
} from "features/dealer/dealerGuaranteeSlice";
import { showSuccessToast } from "common/ToastMessage";
import CreateEditDealerModal from "./CreateEditDealerModal";
import GuaranteeDataExcelExport from "./GuaranteeDataExportButton";

const GuaranteeDataModalAppBar = ({ selectedRows, selectedIdState, ids }) => {
  const dispatch = useDispatch();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [upgradeFlag, setUpgradeFlag] = useState(false);
  const [selectedId, setSelectedId] = useState();

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
      await dispatch(batchDeleteGuaranteeData(uuidArray)).unwrap();

      showSuccessToast(
        CommonMessage.MFS00002.replace("%s", "Dealer Guarantee Data")
      );

      await dispatch(
        getGuaranteeData({
          params: {
            dealer_id: selectedIdState,
          },
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

  const handleAddGuarantee = () => {
    setOpenEditModal(true);
    setEditFlag(false);
    setUpgradeFlag(true);
    setSelectedId(selectedIdState);
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
          <div style={{ alignContent: "center" }}>
            No. Selected Row(s) : {selectedRows.length}
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Button
              variant="contained"
              style={{ marginRight: "3px" }}
              onClick={handleAddGuarantee}
            >
              Add Guarantee Data
            </Button>
            <Button
              variant="outlined"
              style={{ borderColor: "red", color: "red", marginRight: "3px" }}
              onClick={batchDelete}
            >
              Delete
            </Button>
            <GuaranteeDataExcelExport ids={ids}  />
          </div>
        </div>
      </AppBar>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onDelete={handleDeleteConfirmed}
        message={confirmMessage}
      />

      <CreateEditDealerModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        editFlag={editFlag}
        upgradeFlag={upgradeFlag}
        selectedId={selectedId}
      />
    </>
  );
};

export default React.memo(GuaranteeDataModalAppBar);
