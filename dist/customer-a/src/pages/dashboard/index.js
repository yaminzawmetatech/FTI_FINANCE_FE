import { Grid, Typography, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getApplicationStatusCount } from "modules/credit-management/slices/applicationSlice";
import {
  getInHouseSurveyCount,
  getFieldSurveyCount,
} from "modules/credit-management/slices/surveyResultSlice";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import AccordionList from "./AccordionList";
import AllAccordionList from "./AllAccordionList";
import dayjs from "dayjs";
import FromDateToDate from "./FromDateToDate";
import LoanModuleDashboardIndex from "../../modules/loan-operation/pages/LoanOperationModule/Dashboard";
import {
  getMobApplicationsCount,
  getMobContractsCount,
  getMobDownPaymentsCount,
  getMobRemindersCount,
  getMobSaleInvoicesCount,
  getMobSurveysCount,
} from "modules/credit-management/slices/mobCountSlice";
import CMCOAccordionList from "./CMCOAccordionList";

const DashboardDefault = () => {
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const { applicationsCount } = useSelector((state) => state.applicationsCount);

  const { inHouseSurveyCount } = useSelector(
    (state) => state.getInHouseSurveyCount
  );

  const { fieldSurveyCount } = useSelector(
    (state) => state.getFieldSurveyCount
  );

  const { mobSurveysCount } = useSelector((state) => state.mobSurveysCount);

  const { mobDownPaymentsCount } = useSelector(
    (state) => state.mobDownPaymentsCount
  );

  const { mobContractsCount } = useSelector((state) => state.mobContractsCount);

  const { mobSaleInvoicesCount } = useSelector(
    (state) => state.mobSaleInvoicesCount
  );

  const { mobRemindersCount } = useSelector((state) => state.mobRemindersCount);

  const { categoryId, surveyType } = useParams();
  const dispatch = useDispatch();
  const [params] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const applicationStatusParams = {
      ...Object.fromEntries(params),
      category_id: categoryId,
      from_date: selectedFromDate,
      to_date: selectedToDate,
      ...(user?.user_group === "CMCO" ||
      user?.user_group === "Agent" ||
      user?.user_group === "CMCE"
        ? { created_by: user.id }
        : {}),
    };

    dispatch(
      getApplicationStatusCount({
        params: applicationStatusParams,
      })
    );

    // dispatch(
    //   getInHouseSurveyCount({
    //     params: {
    //       ...applicationStatusParams,
    //       survey_type: "inhouse_survey",
    //     },
    //   })
    // );

    // dispatch(
    //   getFieldSurveyCount({
    //     params: {
    //       ...applicationStatusParams,
    //       survey_type: "field_survey",
    //     },
    //   })
    // );

    //dispatch(getMobDownPaymentsCount());
    const mobContractParams = {user_id: user?.id };
    dispatch(
      getMobContractsCount({
        params: 
          user?.user_group === "CMCO" 
            ? mobContractParams
            : {} 
      })
    );
  }, [dispatch, categoryId, params, selectedFromDate, selectedToDate, user]);

  const handleFromDateChange = (date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD H:mm:ss") : "";
    setSelectedFromDate(formattedDate);
  };

  const handleToDateChange = (date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD H:mm:ss") : "";
    setSelectedToDate(formattedDate);
  };

  const searchData = () => {
    const applicationStatusParams = {
      ...Object.fromEntries(params),
      category_id: categoryId,
      from_date: selectedFromDate,
      to_date: selectedToDate,
      ...(user?.user_group === "CMCO" || user?.user_group === "Agent"
        ? { created_by: user.id }
        : {}),
    };

    dispatch(
      getApplicationStatusCount({
        params: applicationStatusParams,
      })
    );
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} md={7} sx={{ mb: 2.25, marginTop: "30px" }}>
          <Typography variant="h3">Dashboard</Typography>
        </Grid>
        {(user?.user_group === "administrator" ||
          user?.department_id === 1) && (
          <FromDateToDate
            handleFromDateChange={handleFromDateChange}
            handleToDateChange={handleToDateChange}
            searchData={searchData}
          />
        )}
      </Grid>
      {/* {(user?.user_group === "administrator" ||
        user?.department_id === 1 ||
        user?.user_group === "CMCO" ||
        user?.user_group === "CMCE" ||
        user?.user_group === "Agent") && (
        <CMCOAccordionList
          mobApplicationsCount={applicationsCount ?? []}
          //mobSurveysCount={inHouseSurveyCount ?? []}
          mobDownPaymentsCount={mobDownPaymentsCount ?? []}
          mobContractsCount={mobContractsCount ?? []}
          mobSaleInvoicesCount={mobSaleInvoicesCount ?? []}
          mobRemindersCount={mobRemindersCount ?? []}
          //surveyStatusCount={fieldSurveyCount ?? []}
        />
      )}
      {(user?.user_group === "administrator" || user?.department_id === 2) && (
        <LoanModuleDashboardIndex open={true} />
      )} */}
    </Container>
  );
};

export default DashboardDefault;
