import React, { useEffect, useState } from "react";
import { Grid, Typography, Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getApplicationStatusCount } from "../../../features/application/applicationSlice";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import AllAccordionList from "pages/dashboard/AllAccordionList";
import AccordionList from "../../dashboard/AccordionList";
import {
  getInHouseSurveyCount,
  getFieldSurveyCount,
} from "../../../features/surveryResult/surveyResultSlice";
import dayjs, { Dayjs } from "dayjs";
import FromDateToDate from "../../dashboard/FromDateToDate";

const ProjectFDashboardIndex = () => {
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [dateError, setDateError] = useState("");
  const { applicationsCount } = useSelector((state) => state.applicationsCount);
  const { inHouseSurveyCount } = useSelector(
    (state) => state.getInHouseSurveyCount
  );
  const { fieldSurveyCount } = useSelector(
    (state) => state.getInHouseSurveyCount
  );
  const { categoryName, categoryId, fromDate, toDate, surveyType } =
    useParams();
  const dispatch = useDispatch();
  const [params] = useSearchParams();

  useEffect(() => {
    const applicationStatusParams = {
      ...Object.fromEntries(params),
      category_id: categoryId,
      from_date: fromDate,
      to_date: toDate,
    };

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

    const applicationStatusAction = getApplicationStatusCount({
      params: applicationStatusParams,
    });
    const surveyInHouseAction = getInHouseSurveyCount({
      params: surveyInHouseParams,
    });
    const surveyFieldAction = getFieldSurveyCount({
      params: surveyFieldParams,
    });
    dispatch(applicationStatusAction);
    dispatch(surveyInHouseAction);
    dispatch(surveyFieldAction);
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

  const searchData = () => {
    const applicationStatusParams = {
      ...Object.fromEntries(params),
      category_id: categoryId,
      from_date: selectedFromDate,
      to_date: selectedToDate,
    };
    const applicationStatusAction = getApplicationStatusCount({
      params: applicationStatusParams,
    });
    dispatch(applicationStatusAction);
  };

  return (
    <Container maxWidth="xl">
      {/* row 1 */}
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
        applications={applicationsCount ?? []}
        type="Credit Management"
      />
      <AccordionList
        surveyStatusCount={inHouseSurveyCount ?? []}
        surveyTitle="Credit Criteria Information Alert"
      />
      <AccordionList
        surveyStatusCount={inHouseSurveyCount ?? []}
        surveyTitle="InHouse Survey"
      />
      <AccordionList
        surveyStatusCount={fieldSurveyCount ?? []}
        surveyTitle="Field Survey"
      />
    </Container>
  );
};

export default ProjectFDashboardIndex;
