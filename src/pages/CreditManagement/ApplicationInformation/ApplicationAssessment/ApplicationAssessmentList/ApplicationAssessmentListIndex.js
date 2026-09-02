import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Helmet } from "react-helmet";
import TypeToFilterSearch from "../../../../../components/TypeToFilterSearch";
import ApplicationAssessmentListTable from "./ApplicationAssessmentListTable";
import { getAssessments } from "../../../../../features/assessment/assessmentSlice";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ApplicationAssessmentListToolbar from "./ApplicationAssessmentListToolbar";
import { getApplicationByUuid } from "../../../../../features/application/applicationDetailSlice";
import ApplicationTitle from "../../../../../components/application/ApplicationTitle";

const ApplicationAssessmentListIndex = () => {
  const { applicationId: application_id, applicationUUId } = useParams();
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const [selectedAssessments, setSelectedAssessments] = useState([]);
  const { application } = useSelector((state) => state.applicationDetail);

  useEffect(() => {
    dispatch(getApplicationByUuid({ uuid: applicationUUId }));
  }, [applicationUUId, dispatch]);

  const onSelectionChangedAssessments = useCallback((rows) => {
    setSelectedAssessments(rows);
  }, []);

  const fetchApi = useCallback(() => {
    dispatch(
      getAssessments({
        params: {
          ...Object.fromEntries(params),
          application_id,
        },
      })
    );
  }, [application_id, dispatch, params]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return (
    <>
      <Helmet>
        <title>View - Application Assessment List</title>
      </Helmet>
      <ApplicationAssessmentListToolbar
        selectedAssessments={selectedAssessments}
      />
      <Box
        sx={{
          px: 1,
          display: "flex",
          mb: 1,
          alignItems: "center",
        }}
      >
        <ApplicationTitle
          sx={{ flex: 1, px: 0 }}
          sxTypography={{ m: 0 }}
          title="Application Assessment List"
          application={application}
        />

        <TypeToFilterSearch
          selectProps={{
            options: ["New", "Pending"],
            defaultValue: [],
          }}
        />
      </Box>

      <Box
        sx={{
          px: 1,
          pb: 1,
        }}
      >
        <ApplicationAssessmentListTable
          onSelectionChangedAssessments={onSelectionChangedAssessments}
        />
      </Box>
    </>
  );
};

export default React.memo(ApplicationAssessmentListIndex);
