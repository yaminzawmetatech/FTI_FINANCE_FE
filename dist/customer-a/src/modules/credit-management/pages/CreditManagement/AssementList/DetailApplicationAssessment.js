import React from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Helmet } from "react-helmet";
import dayjs from "dayjs";
import ApplicationAssessmentGeneral from "./DetailApplicationAssessmentGeneral";
import useApplicationAssessmentForm from "./hooks/useApplicationAssessmentForm";


const EditApplicationAssessment = () => {
  const { control, assessment, onSubmit, handleSubmit, isLoading } =
    useApplicationAssessmentForm();

  if (isLoading) {
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
      <Box
        sx={{
          px: 1,
        }}
      >
        <Typography sx={{ color: "#1890ff" }} variant="h5" gutterBottom>
          {assessment?.application_id} . {assessment?.assessment_type}
        </Typography>
      </Box>

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
          <ApplicationAssessmentGeneral control={control} />
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

export default React.memo(EditApplicationAssessment);
