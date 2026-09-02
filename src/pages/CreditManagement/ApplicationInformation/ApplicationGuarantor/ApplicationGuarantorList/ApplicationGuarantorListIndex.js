import React, { useCallback, useEffect, useState } from "react";
import { Box, Backdrop, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import TypeToFilterSearch from "../../../../../components/TypeToFilterSearch";
import ApplicationAssessmentListTable from "./ApplicationGuarantorListTable";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ApplicationGuarantorListToolbar from "./ApplicationGuarantorListToolbar";
import { getGuarantors } from "features/guarantor/guarantorSlice";
import { getApplicationByUuid } from "features/application/applicationDetailSlice";
import ApplicationTitle from "../../../../../components/application/ApplicationTitle";

const ApplicationGuarantorListIndex = () => {
  const { applicationId: application_id, applicationUUId: application_uuid } =
    useParams();
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const [selectedGuarantors, setSelectedGuarantors] = useState([]);

  const onSelectionChangedGuarantors = useCallback((rows) => {
    setSelectedGuarantors(rows || []);
  }, []);

  const { application, isLoading } = useSelector(
    (state) => state.applicationDetail
  );

  const fetchApi = useCallback(() => {
    dispatch(
      getGuarantors({
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
        <title>Application Guarantor List</title>
      </Helmet>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ApplicationGuarantorListToolbar
        selectedGuarantors={selectedGuarantors}
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
          title="Application Guarantor List"
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

export default React.memo(ApplicationGuarantorListIndex);
