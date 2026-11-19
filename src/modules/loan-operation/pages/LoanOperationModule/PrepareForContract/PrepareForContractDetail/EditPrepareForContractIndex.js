import React from "react";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import useContractForm from "./hooks/usePrepareForContractForm";
import ApplicationInformation from "./ApplicationInformation";
import ToolbarContract from "./ToolbarPrepareContract";
import LoanInformation from "./LoanInformation";
import ApplicantInformation from "./ApplicantInformation";

const EditContractIndex = () => {
  const {
    control,
    handleSubmit,
    isLoading,
    isSubmitting,
    onSubmit,
    prepareForContracts,
    editAbleForm,
  } = useContractForm();

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSubmitting || isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Helmet>
        <title>Preparation For Contract</title>
      </Helmet>
      <ToolbarContract
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        editAbleForm={editAbleForm}
        prepareForContracts={prepareForContracts}
      />
      <Box
        sx={{
          px: 1,
          pb: 1,
          display: "flex",
          gap: 2,
          "@media (max-width: 600px)": {
            flexDirection: "column",
          },
        }}
      >
        <Box sx={{ width: "100%", flex: 1 }}>
          <ApplicationInformation control={control} />
          <ApplicantInformation control={control} />
          <LoanInformation
            prepareForContracts={prepareForContracts}
            control={control}
          />
        </Box>
      </Box>
      {editAbleForm ? (
        <Box sx={{ display: "flex", px: 1, pb: 1, justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary">
            OK
          </Button>
        </Box>
      ) : null}
    </>
  );
};

export default EditContractIndex;
