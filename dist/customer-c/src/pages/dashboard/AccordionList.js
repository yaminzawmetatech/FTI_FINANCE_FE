import React, { useEffect, useState, Fragment } from "react";
import { Grid, Typography, Box, Card, CardContent, Stack } from "@mui/material";
import Accordion from "components/Accordion";
import { Feed } from "@mui/icons-material";
import {
  getAllCreditCriteria,
  getLatestCreditCriteria,
} from "modules/credit-management/slices/creditCriteriaSlice";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AccordionList = ({
  surveyStatusCount,
  type = "dashboard",
  surveyTitle,
}) => {
  const { categoryName, categoryId } = useParams();

  const dispatch = useDispatch();
  function toTitleCase(str) {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const [surveyData, setSurveyData] = useState([]);

  // useEffect(() => {
  //   const keys = Object.keys(surveyStatusCount);
  //   const optimizedArray = keys.map((key) => ({
  //     id: key,
  //     title: toTitleCase(key),
  //     value: surveyStatusCount[key],
  //   }));
  //   setSurveyData(optimizedArray);
  // }, [surveyStatusCount.completed, surveyStatusCount]);

  const { latestCreditCriteria } = useSelector(
    (state) => state.latestCreditCriteria
  );

  useEffect(() => {
    if (categoryId) {
      dispatch(getLatestCreditCriteria({ category_id: categoryId }));
    }
  }, [dispatch, categoryId]);

  // Group by type
  const groupedCriteria = latestCreditCriteria.reduce((acc, item) => {
    const type = item.credit_criteria_key?.type || "Unknown Type";
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item);
    return acc;
  }, {});

  let navigate = useNavigate();
  const handleClick = (title) => {
    let path = `/CreditManagement/Application/${categoryName}/${categoryId}/field_survey/${title}`;
    navigate(path);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {surveyTitle === "Credit Criteria Information Alert" && groupedCriteria && Object.keys(groupedCriteria).length > 0 ? (
        <Accordion title={<span style={{ color: "red" }}>{surveyTitle}</span>} defaultExpanded={false}>
          <Grid container sx={{ width: "100%" }}>
            <Grid item xs={12}>
              <Card
                variant="outlined"
                sx={{
                  backgroundColor: "#f9f9f9",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  width: "100%",
                }}
              >
                {Object.entries(groupedCriteria).map(([type, items]) => (
                  <CardContent key={type}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1890ff" }}>
                      {type}
                    </Typography>
                    {items.map((criteria) => (
                      <Fragment key={criteria.id}>
                        <Grid container spacing={1} sx={{ mt: 1, width: "100%" }}>
                          <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                              {criteria?.credit_criteria_key?.parent?.required_category
                                ? `${criteria?.credit_criteria_key?.parent?.required_category} - `
                                : ""}
                              {criteria.credit_criteria_key.required_category}:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            {criteria.value || "---"}
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            {criteria.start_date
                              ? new Date(criteria.start_date).toLocaleDateString("en-CA")
                              : "---"}
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            {criteria.modified_user ? criteria?.modified_user?.user_name : "---"}
                          </Grid>
                        </Grid>
                      </Fragment>
                    ))}
                  </CardContent>
                ))}
              </Card>
            </Grid>
          </Grid>
        </Accordion>
      ) : (
        surveyTitle !== "Credit Criteria Information Alert" && (
          <Accordion title={surveyTitle} defaultExpanded={false}>
            <Box sx={{ width: "100%", py: 3 }}>
              <Grid container spacing={2} sx={{ width: "100%" }}>
                {surveyStatusCount &&
                  surveyStatusCount.map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                      <Card
                        sx={{
                          width: "100%",
                          minHeight: 150,
                          backgroundColor: "#0f6fc6",
                          ...(type === "dashboard"
                            ? null
                            : {
                              "&:hover": {
                                backgroundColor: "#008aed",
                                cursor: "pointer",
                              },
                            }),
                        }}
                        onClick={() =>
                          typeof categoryName === "string" && surveyTitle === "Field Survey"
                            ? handleClick(item.title)
                            : null
                        }
                      >
                        <CardContent sx={{ textAlign: "center", pt: 3 }}>
                          <Grid container spacing={2} alignItems="center" justifyContent="center">
                            <Grid item>
                              <Box
                                sx={{
                                  width: 50,
                                  height: 50,
                                  backgroundColor: "#b9bdba",
                                  borderRadius: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Feed sx={{ fontSize: 30, color: "white" }} />
                              </Box>
                            </Grid>
                            <Grid item>
                              <Stack spacing={1} alignItems="center">
                                <Typography variant="h4" sx={{ color: "white" }}>
                                  {item.value}
                                </Typography>
                                <Typography variant="h6" sx={{ color: "white" }}>
                                  {item.title}
                                </Typography>
                              </Stack>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          </Accordion>
        )
      )}
    </Box>
  );
};

export default AccordionList;
