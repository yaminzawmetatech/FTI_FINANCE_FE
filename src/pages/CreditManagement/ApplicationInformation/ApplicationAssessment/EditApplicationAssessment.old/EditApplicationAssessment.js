import React, { useMemo } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Helmet } from "react-helmet";
import ApplicationAssessmentGeneral from "./ApplicationAssessmentGeneral";
import useApplicationAssessmentForm from "./hooks/useApplicationAssessmentForm";
import EditApplicationAssessmentToolbar from "./EditApplicationAssessmentToolbar";
import ApplicationTitle from "../../../../../components/application/ApplicationTitle";
import {
  APPROVED,
  CANCEL,
  REJECTED,
} from "../../../../../constants/applicationStatus";

const EditApplicationAssessment = () => {
  const {
    control,
    assessment,
    handleOnOk,
    isLoading,
    getValues,
    setValue,
    handleStatusChange,
  } = useApplicationAssessmentForm();

  const editAbleForm = useMemo(() => {
    return ![APPROVED, REJECTED, CANCEL].includes(
      assessment?.application?.status
    );
  }, [assessment?.application?.status]);

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
      <Helmet>
        <title>Edit - Application Assessment</title>
      </Helmet>
      <EditApplicationAssessmentToolbar
        assessment={assessment}
        editAbleForm={editAbleForm}
        handleStatusChange={handleStatusChange}
      />
      <Box
        sx={{
          px: 1,
        }}
      >
        <Typography sx={{ color: "#1890ff" }} variant="h5" gutterBottom>
          <ApplicationTitle
            title={assessment?.assessment_type}
            application={assessment?.application}
          />
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
          <fieldset
            disabled={!editAbleForm}
            style={{
              border: 0,
              padding: 0,
              margin: 0,
              minWidth: 0,
              minHeight: 0,
            }}
          >
            <ApplicationAssessmentGeneral
              control={control}
              getValues={getValues}
              setValue={setValue}
            />
          </fieldset>
        </Box>
      </Box>
      {editAbleForm ? (
        <Box sx={{ display: "flex", px: 1, pb: 2, justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" onClick={handleOnOk}>
            OK
          </Button>
        </Box>
      ) : null}
    </>
  );
};

export default React.memo(EditApplicationAssessment);
