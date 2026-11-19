import React from "react";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import ApplicationReferenceGeneral from "./ApplicationReferenceGeneral";
import useApplicationReferenceForm from "./hooks/useApplicationReferenceForm";
import ApplicationReferenceToolbar from "./ApplicationReferenceToolbar";
import { useParams } from "react-router";

const CreateApplicationReference = () => {

  const { applicationId, applicationUUId, mode } = useParams();

  const { control, onSubmit, handleSubmit, isLoading, isSubmitting } =
    useApplicationReferenceForm(applicationId);

  if (isLoading || isSubmitting) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <>
      <Helmet>
        {mode === "ViewApplicationReference" && (
          <title>View - Application Reference</title>
        )}
        {mode === "CreateApplicationReference" && (
          <title>Create - Application Reference</title>
        )}
        {mode === "EditApplicationReference" && (
          <title>Edit - Application Reference</title>
        )}
      </Helmet>
      <ApplicationReferenceToolbar id={applicationId} uuid={applicationUUId} />
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
          <ApplicationReferenceGeneral control={control} />
        </Box>
      </Box>
      <Box sx={{ display: "flex", px: 1, pb: 2, justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          OK
        </Button>
      </Box>
    </>
  );
};

export default React.memo(CreateApplicationReference);
