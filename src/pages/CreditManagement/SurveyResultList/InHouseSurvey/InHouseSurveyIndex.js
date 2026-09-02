import React from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Helmet } from "react-helmet";
import useInHouseSurveyForm from "./hooks/useInHouseSurveyForm";
import InHouseSurveyGeneral from "./InHouseSurveyGeneral";
import { useParams } from "react-router-dom";
import InHouseSurveyToolbar from "./InHouseSurveyToolbar";

const InHouseSurveyIndex = () => {
  const { applicationId: application_id } = useParams();
  const { control, onSubmit, handleSubmit, isLoading, surveyResult } =
    useInHouseSurveyForm();

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
      <InHouseSurveyToolbar surveyResult={surveyResult} />
      <Box
        sx={{
          px: 1,
        }}
      >
        <Typography sx={{ color: "#1890ff" }} variant="h5" gutterBottom>
          {application_id} . In House Survey
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
          <InHouseSurveyGeneral control={control} />
        </Box>
      </Box>
      <Box sx={{ display: "flex", px: 1, mb: 2, justifyContent: "flex-end" }}>
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

export default React.memo(InHouseSurveyIndex);
