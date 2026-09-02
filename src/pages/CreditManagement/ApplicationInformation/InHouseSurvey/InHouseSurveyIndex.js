import React, { useEffect } from "react";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import useInHouseSurveyForm from "./hooks/useInHouseSurveyForm";
import InHouseSurveyGeneral from "./InHouseSurveyGeneral";
import { useParams } from "react-router-dom";
import InHouseSurveyToolbar from "./InHouseSurveyToolbar";
import BlackListCustomerStatistics from "../CreateApplicationInformation/BlackListCustomerStatistics";
import { getApplicationByUuid } from "../../../../features/application/applicationDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import ApplicationTitle from "../../../../components/application/ApplicationTitle";

const InHouseSurveyIndex = () => {
  const { applicationId: application_id, applicationUUId, surveyType } = useParams();
  const {
    control,
    getValues,
    onSubmit,
    handleSubmit,
    isLoading,
    surveyResult,
  } = useInHouseSurveyForm();

  const dispatch = useDispatch();

  const { application, isLoading: applicationIsLoading } = useSelector(
    (state) => state.applicationDetail
  );

  useEffect(() => {
    dispatch(getApplicationByUuid({ uuid: applicationUUId }));
  }, [applicationUUId, dispatch]);

  if (isLoading || applicationIsLoading) {
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
        <title>{surveyType === "field_survey" ? "Edit - Field Survey" : "Edit - In House Survey" }</title>
      </Helmet>
      <InHouseSurveyToolbar
        surveyResult={surveyResult}
        formValues={getValues}
        application={application}
      />
      <ApplicationTitle application={application} title={surveyType === "field_survey" ? "Field Survey" : "In House Survey" } />
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
        <Box
          sx={{
            width: "20rem",
            "@media (max-width: 600px)": {
              // Adjust the max-width as needed for your mobile breakpoint
              width: "100%",
              flex: 1,
            },
          }}
        >
          <BlackListCustomerStatistics />
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
