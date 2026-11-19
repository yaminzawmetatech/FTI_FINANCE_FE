import React, { useEffect, useState, useRef } from "react";
import { Grid, Typography, Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getApplicationStatusCount } from "modules/credit-management/slices/applicationSlice";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import AllAccordionList from "pages/dashboard/AllAccordionList";
import AccordionList from "shared/components/AccordionList";
import {
  getInHouseSurveyCount,
  getFieldSurveyCount,
} from "modules/credit-management/slices/surveyResultSlice";
import dayjs, { Dayjs } from "dayjs";
import FromDateToDate from "shared/components/FromDateToDate";
import { getMobApplicationsCount } from "modules/credit-management/slices/mobCountSlice";

const ProjectFDashboardIndex = () => {
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [dateError, setDateError] = useState("");
  const { applicationsCount } = useSelector((state) => state.applicationsCount);

  const auth = useSelector((state) => state.auth?.user ?? {});

  const mobApplicationsCount = useSelector(
    (state) => state.mobApplicationsCount?.mobApplicationsCount ?? []
  );

  const inHouseSurveyCount = useSelector(
    (state) => state.getInHouseSurveyCount?.inHouseSurveyCount ?? []
  );
  const fieldSurveyCount = useSelector(
    (state) => state.getFieldSurveyCount?.fieldSurveyCount ?? []
  );

  const [inHouseSurveyData, setInHouseSurveyData] = useState([]);
  const [fieldSurveyData, setFieldSurveyData] = useState([]);

  const { categoryName, categoryId, fromDate, toDate, surveyType } =
    useParams();
  const dispatch = useDispatch();
  const [params] = useSearchParams();

  const applicationStatusParams = {
    ...Object.fromEntries(params),
    category_id: categoryId,
    from_date: fromDate,
    to_date: toDate,
    ...(auth.user_group === "CMCO" ||
    auth.user_group === "Agent" ||
    auth.user_group === "CMCE"
      ? { created_by: auth.id }
      : {}),
  };

  useEffect(() => {
    const surveyInHouseParams = {
      ...Object.fromEntries(params),
      category_id: categoryId,
      survey_type: "inhouse_survey",
    };

    const surveyFieldParams = {
      ...Object.fromEntries(params),
      category_id: categoryId,
      survey_type: "field_survey",
    };

    let applicationStatusAction = {};

    applicationStatusAction = getApplicationStatusCount({
      params: applicationStatusParams,
    });

    // const surveyInHouseAction = getInHouseSurveyCount({
    //   params: surveyInHouseParams,
    // });
    // const surveyFieldAction = getFieldSurveyCount({
    //   params: surveyFieldParams,
    // });
    dispatch(applicationStatusAction);
    // dispatch(surveyInHouseAction);
    // dispatch(surveyFieldAction);

  }, [dispatch, categoryId, params, fromDate, toDate, surveyType]);

  const handleFromDateChange = (date) => {
    // Format the date using dayjs
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD H:mm:ss") : "";
    setSelectedFromDate(formattedDate);
    validateDates(date, toDate);
  };

  const handleToDateChange = (date) => {
    // Format the date using dayjs
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD H:mm:ss") : "";
    setSelectedToDate(formattedDate);
    validateDates(date, toDate);
  };

  const validateDates = (from, to) => {
    if (from && to && dayjs(from).isAfter(to)) {
      setDateError("From date cannot be greater than To date");
    } else {
      setDateError("");
    }
  };

  useEffect(() => {
    if (applicationsCount?.field_survey_count) {
      const fieldSurveyKeys = Object.keys(
        applicationsCount?.field_survey_count
      );
      const optimizedFieldSurveyArray = fieldSurveyKeys.map((key) => ({
        id: key,
        title: toTitleCase(key),
        label: toTitleCase(key),
        value: applicationsCount?.field_survey_count[key],
      }));

      setFieldSurveyData(optimizedFieldSurveyArray);
    }

    if (applicationsCount?.inhouse_survey_count) {
      const fieldSurveyKeys = Object.keys(
        applicationsCount?.inhouse_survey_count
      );
      const optimizedSurveyArray = fieldSurveyKeys.map((key) => ({
        id: key,
        title: toTitleCase(key),
        label: toTitleCase(key),
        value: applicationsCount?.inhouse_survey_count[key],
      }));

      setInHouseSurveyData(optimizedSurveyArray);
    }
  },[applicationsCount])

  const searchData = () => {
    const applicationStatusAction = getApplicationStatusCount({
      params: applicationStatusParams,
    });

    dispatch(applicationStatusAction);
  };

  function toTitleCase(str) {
    str = str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    if (str === "Cancel") {
      str = "Application " + str;
    }
    return str;
  }

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} md={7} sx={{ mb: 2.25, marginTop: "30px" }}>
          <Typography variant="h3">{categoryName} List</Typography>
        </Grid>
        <FromDateToDate
          handleFromDateChange={handleFromDateChange}
          handleToDateChange={handleToDateChange}
          searchData={searchData}
        />
      </Grid>

      <AllAccordionList
        applications={applicationsCount?.application_count ?? []}
        type="Credit Management"
      />

      <AccordionList
        surveyStatusCount={inHouseSurveyCount ?? []}
        surveyTitle="Credit Criteria Information Alert"
      />
      <AccordionList
        surveyStatusCount={inHouseSurveyData  ?? []}
        surveyTitle="InHouse Survey"
      />
      <AccordionList
        surveyStatusCount={fieldSurveyData  ?? []}
        surveyTitle="Field Survey"
      />
    </Container>
  );
};

export default ProjectFDashboardIndex;
