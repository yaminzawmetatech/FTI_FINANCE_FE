import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ChangeDibursementDateModal from "./ChangeDisbursementDateModal";
import { AppBar } from "@mui/material";
import ConfirmationModal from "common/ConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { createContracts } from "modules/loan-operation/slices/contractSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "common/ToastMessage";
import ExcelExportButton from "./PrepareForContractExportButton";

const ApprovedApplicationAppBar = ({ selectedRows, ids }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // for confirmation modal open flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for confirm message body
  const [createModalOpen, setCreateModalOpen] = useState(false); // for create confirm modal open
  const [values, setValues] = useState();

  useEffect(() => {
    const uuidArray = selectedRows.map((row) => {
      return row.application.uuid;
    });

    const idArray = selectedRows.map((row) => {
      return row.id;
    });

    setValues({
      ...values,
      uuids: uuidArray,
      disbursed_for_contracts_ids: idArray,
    });
  }, [selectedRows]);

  const handleSubmit = async () => {
    setIsConfirmModalOpen(false);
    if (selectedRows.length > 20) {
      toast.warning("At most 20 records can be disbursed at one time!");
      setIsConfirmModalOpen(false);
    } else {
      try {
        const responseData = await dispatch(createContracts(values));

        if (responseData) {
          if (responseData.payload.success === true) {
            setIsConfirmModalOpen(false);
            let path = `/LoanOperationModule/GLListing?${responseData.payload.data
              .map((uuid) => `uuids=${uuid}`)
              .join("&")}`;
            navigate(path);
          } else {
            setIsConfirmModalOpen(false);
            toast.error(responseData.payload, {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
      } catch (error) {
        console.error("error", error);
        showErrorToast(
          CommonMessage.MFE00009.replace("%s", "setting Disbursement Date")
        );
      }
    }
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
        <div style={{ display : "flex" }}>
          <div style={{ alignContent : "center"}}>
            No. Selected Row(s) : {selectedRows.length}
          </div>
        <div style={{ marginLeft: "auto", display: "flex" }}>
          <div style={{ marginRight: "10px" }}>
            <Button
              variant="contained"
              onClick={() => setCreateModalOpen(true)}
              disabled={selectedRows.length === 0}
            >
              Change Disbursed Date
            </Button>
          </div>
          <div>
            <Button
              variant="outlined"
              onClick={() => {
                setIsConfirmModalOpen(true);
                setConfirmMessage(CommonMessage.MFC00009);
              }}
              disabled={selectedRows.length === 0}
            >
              Submit
            </Button>
          </div>
          <ExcelExportButton ids={ids} />
        </div>
        </div>
      </AppBar>
      <ChangeDibursementDateModal
        selectedRows={selectedRows}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleSubmit}
        message={confirmMessage}
      />
    </>
  );
};

export default React.memo(ApprovedApplicationAppBar);
