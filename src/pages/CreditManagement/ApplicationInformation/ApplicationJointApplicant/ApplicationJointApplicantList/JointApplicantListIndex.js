import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Helmet } from "react-helmet";
import TypeToFilterSearch from "../../../../../components/TypeToFilterSearch";
import ApplicationAssessmentListTable from "./JointApplicantListTable";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import JointApplicantListToolbar from "./JointApplicantListToolbar";
import { getJointApplicants } from "features/jointApplicant/jointApplicantSlice";
import { getApplicationByUuid } from "features/application/applicationDetailSlice";
import ApplicationTitle from "../../../../../components/application/ApplicationTitle";

const JointApplicantListIndex = () => {
  const { applicationId: application_id, applicationUUId: application_uuid } =
    useParams();
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const [selectedJointApplicants, setselectedJointApplicants] = useState([]);

  const onSelectionChangedGuarantors = useCallback((rows) => {
    setselectedJointApplicants(rows || []);
  }, []);

  const { application } = useSelector(
    (state) => state.applicationDetail
  );

  const fetchApi = useCallback(() => {
    dispatch(
      getJointApplicants({
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

  useEffect(() => {
    dispatch(getApplicationByUuid({ uuid: application_uuid }));
  }, [application_uuid, dispatch]);

  return (
    <>
      <Helmet>
        <title>Application Joint Applicant List</title>
      </Helmet>
      <JointApplicantListToolbar
        selectedJointApplicants={selectedJointApplicants}
        applicationId={application_id}
        applicationUUId={application_uuid}
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
          title="Application Joint Applicant List"
          application={application}
        />

        <TypeToFilterSearch
          selectProps={{
            options: [],
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
          onSelectionChangedGuarantors={onSelectionChangedGuarantors}
        />
      </Box>
    </>
  );
};

export default React.memo(JointApplicantListIndex);
