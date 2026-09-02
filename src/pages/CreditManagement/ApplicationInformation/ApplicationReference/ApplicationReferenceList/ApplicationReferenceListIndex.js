import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Helmet } from "react-helmet";
import TypeToFilterSearch from "../../../../../components/TypeToFilterSearch";
import ApplicationAssessmentListTable from "./ApplicationReferenceListTable";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ApplicationReferenceListToolbar from "./ApplicationReferenceListToolbar";
import { getApplicationByUuid } from "features/application/applicationDetailSlice";
import { getReferences } from "features/reference/referenceSlice";
import ApplicationTitle from "../../../../../components/application/ApplicationTitle";

const ApplicationReferenceListIndex = () => {
  const { applicationId: application_id, uuid: application_uuid } =
    useParams();

  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const [selectedReferences, setSelectedReferences] = useState([]);

  const onSelectionChangedReferences = useCallback((rows) => {
    setSelectedReferences(rows || []);
  }, []);

  const fetchApi = useCallback(() => {
    dispatch(
      getReferences({
        params: {
          ...Object.fromEntries(params),
          application_id,
        },
      })
    );
  }, [application_id, dispatch, params]);

  const { application } = useSelector(
    (state) => state.applicationDetail
  );

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  useEffect(() => {
    dispatch(getApplicationByUuid({ uuid: application_uuid }));
  }, [application_uuid, dispatch]);

  return (
    <>
      <Helmet>
        <title>Application Reference List</title>
      </Helmet>
      <ApplicationReferenceListToolbar
        selectedReferences={selectedReferences}
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
          title="Application Reference List"
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
          onSelectionChangedReferences={onSelectionChangedReferences}
        />
      </Box>
    </>
  );
};

export default React.memo(ApplicationReferenceListIndex);
