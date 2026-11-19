import * as React from "react";
import { AppBar } from "@mui/material";
import useCreditCriteriaSetupForm from "./CreditCriteriaHook";
import { Button } from "@mui/material";
import CreateEditCreditCriteriaKeyModal from "../CreditCriteriaKeySetup/CreateEditCreditCriteriaKeyModal";
import CreditCriteriaExportExcel from "./CreditCriteriaExcelExportButton";
import { useSelector } from "react-redux";

const CreditCriteriaAppBar = ({ editFlag, ids }) => {
  const auth = useSelector((state) => state.auth.user);

  const {
    control,
    onSubmit,
    handleSubmit,
    createModalOpen,
    setCreateModalOpen,
    reset,
    setEditValues,
    editValues,
    setValue,
  } = useCreditCriteriaSetupForm();

  const handleClick = () => {
    setCreateModalOpen(true);
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
            {auth?.permissions.includes(
              "CreditManagement-CreditCriteriaCreate"
            ) || auth.is_super === true ? (
              <Button variant="contained" onClick={handleClick}>
                Create New Key
              </Button>
            ) : null}
            <CreditCriteriaExportExcel ids={ids} />
          </div>
        </div>
      </AppBar>
      <CreateEditCreditCriteriaKeyModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        editValues={editValues}
        setEditValues={setEditValues}
        editFlag={editFlag}
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        reset={reset}
        setValue={setValue}
      />
    </>
  );
};

export default React.memo(CreditCriteriaAppBar);
