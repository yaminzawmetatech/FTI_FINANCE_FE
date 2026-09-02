import * as React from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { AppBar } from "@mui/material";
import useCreditCriteriaSetupForm from "./CreditCriteriaHook";
import CreateEditCreditCriteriaModal from "./CreateEditCreditCriteriaKeyModal";
import { Button} from "@mui/material";

const CreditCriteriaAppBar = ({ editFlag }) => {
  const { categoryName } = useParams();

  const [params] = useSearchParams();
  const selectedStatus = params.get("status");

  const {
    control,
    applicationResponses,
    onSubmit,
    handleSubmit,
    isLoading,
    createModalOpen,
    setCreateModalOpen,
    reset,
    setEditValues,
    editValues,
    setValue
  } = useCreditCriteriaSetupForm();

  const handleClick = () => {
    setCreateModalOpen(true);
  }

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
        variant="contained"
        onClick={handleClick}
      >
        Create New
      </Button>
        </div>
      </div>

    </AppBar>
    <CreateEditCreditCriteriaModal
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
  /></>
 
  );
};

export default React.memo(CreditCriteriaAppBar);
