import * as React from "react";
import { useState } from "react";
import { AppBar } from "@mui/material";
import { Button } from "@mui/material";
import { showSuccessToast } from "common/ToastMessage";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { useDispatch } from "react-redux";
import ExcelExportButton from "./ExcludeBlackListExcelExportButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { batchDeleteExcludeBlackList, getExcludeBlackListAreaList } from "features/address/ExcludeBlackListArea/excludeBlackListAreaSlice";

const VillageAppBar = ({ fetchApi, selectedRows, selectedIds }) => {
  const dispatch = useDispatch();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body

  const handleBatchDelete = () => {
    setIsDeleteModalOpen(true);
    setConfirmMessage(CommonMessage.MFC00002);
  };

  const handleDeleteConfirmed = async () => {
    setIsDeleteModalOpen(false);
    try {
      //call delete api
      const idArray = selectedRows
        ?.map((row) => row.id)
        .filter((id) => id);
      await dispatch(batchDeleteExcludeBlackList({ids: idArray})).unwrap();

      showSuccessToast(CommonMessage.MFS00002.replace("%s", "Excluded Black List Area"));

      await dispatch(
        getExcludeBlackListAreaList({
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
              sx={{
                color: "red",
                borderColor: "red",
              }}
              onClick={handleBatchDelete}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            <ExcelExportButton selectedIds={selectedIds} />
          </div>
        </div>
      </AppBar>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onDelete={handleDeleteConfirmed}
        message={confirmMessage}
      />
    </>
  );
};

export default React.memo(VillageAppBar);
