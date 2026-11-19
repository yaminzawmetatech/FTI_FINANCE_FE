import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Container,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import { Feed } from "@mui/icons-material";
import AppCurrentVisits from "../../sections/app-current-visits";
import Accordion from "components/Accordion";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import AccordionList from "./AccordionList";
import { useSelector } from "react-redux";

const CMCOAccordionList = ({
  mobApplicationsCount,
  mobSurveysCount,
  mobDownPaymentsCount,
  mobContractsCount,
  mobSaleInvoicesCount,
  mobRemindersCount,
  surveyStatusCount,
  type = "dashboard",
}) => {
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

  const [applicationData, setApplicationData] = useState([]);
  const [inHouseSurveyData, setInHouseSurveyData] = useState([]);
  const [fieldSurveyData, setFieldSurveyData] = useState([]);
  const [downPaymentData, setdownPaymentData] = useState([]);
  const [contractData, setContractData] = useState([]);
  const [saleInvoiceData, setSaleInvoiceData] = useState([]);
  const [reminderData, setReminderData] = useState([]);

  const { user } = useSelector((state) => state.auth);

  
  useEffect(() => {
    if (mobApplicationsCount?.application_count) {
      const applicationkeys = Object.keys(
        mobApplicationsCount?.application_count
      );

      const optimizedApplicationArray = applicationkeys?.map((key) => ({
        id: key,
        title: toTitleCase(key),
        label: toTitleCase(key),
        value: mobApplicationsCount?.application_count[key],
      }));

      setApplicationData(optimizedApplicationArray);
    }

    if (mobApplicationsCount?.inhouse_survey_count) {
      const surveyKeys = Object.keys(
        mobApplicationsCount?.inhouse_survey_count
      );
      const optimizedSurveyArray = surveyKeys.map((key) => ({
        id: key,
        title: toTitleCase(key),
        label: toTitleCase(key),
        value: mobApplicationsCount?.inhouse_survey_count[key],
      }));

      setInHouseSurveyData(optimizedSurveyArray);
    }

    if (mobApplicationsCount?.field_survey_count) {
      const fieldSurveyKeys = Object.keys(
        mobApplicationsCount?.field_survey_count
      );
      const optimizedFieldSurveyArray = fieldSurveyKeys.map((key) => ({
        id: key,
        title: toTitleCase(key),
        label: toTitleCase(key),
        value: mobApplicationsCount?.field_survey_count[key],
      }));

      setFieldSurveyData(optimizedFieldSurveyArray);
    }

    const downPaymentKeys = Object.keys(mobDownPaymentsCount);
    const optimizedDownPaymentArray = downPaymentKeys.map((key) => ({
      id: key,
      title: toTitleCase(key),
      label: toTitleCase(key),
      value: mobDownPaymentsCount[key],
    }));
    setdownPaymentData(optimizedDownPaymentArray);

    const saleInvoiceKeys = Object.keys(mobSaleInvoicesCount);
    const optimizedSaleInvoiceArray = saleInvoiceKeys.map((key) => ({
      id: key,
      title: toTitleCase(key),
      label: toTitleCase(key),
      value: mobSaleInvoicesCount[key],
    }));
    setSaleInvoiceData(optimizedSaleInvoiceArray);

    const contractKeys = Object.keys(mobContractsCount);
    const optimizedContractArray = contractKeys.map((key) => ({
      id: key,
      title: toTitleCase(key),
      label: toTitleCase(key),
      value: mobContractsCount[key],
    }));
    setContractData(optimizedContractArray);

    const reminderKeys = Object.keys(mobRemindersCount);
    const optimizedReminderArray = reminderKeys.map((key) => ({
      id: key,
      title: toTitleCase(key),
      label: toTitleCase(key),
      value: mobRemindersCount[key],
    }));
    setReminderData(optimizedReminderArray);
  }, [mobApplicationsCount]);

  const { categoryName, categoryId } = useParams();
  let navigate = useNavigate();
  const handleClick = (title) => {
    let path = `/CreditManagement/Application/${categoryName}/${categoryId}?status=${title}&page=1`;
    navigate(path);
  };

  return (
    <>
      <Accordion title="Application">
        <Grid container rowSpacing={2.5} columnSpacing={2}>
          <Container maxWidth="lg">
            <Box sx={{ flexGrow: 1, py: 5 }}>
              <Grid container spacing={2}>
                <Grid item lg={8} sm={12}>
                  <Grid container spacing={2}>
                    {applicationData &&
                      applicationData.map((item) => (
                        <Grid item lg={3.5} sm={4} md={4} key={item.id}>
                          <Card
                            sx={{
                              // minWidth: 180,
                              // maxWidth:180,
                              // minHeight: 150,
                              // maxHeight: 150,
                              width: "100%",
                              height: "100%",
                              backgroundColor: "#0f6fc6",
                              ...(type === "dashboard"
                                ? null
                                : {
                                    "&:hover": {
                                      backgroundColor: "#008aed", // Change the background color on hover
                                      cursor: "pointer",
                                    },
                                  }),
                            }}
                            onClick={() =>
                              typeof categoryName === "string"
                                ? handleClick(item.title)
                                : null
                            }
                          >
                            <CardContent
                              style={{ textAlign: "center", margin: "auto" }}
                            >
                              <Grid container spacing={2}>
                                <Grid
                                  item
                                  xs={12}
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      minWidth: 70,
                                      maxWidth: 70,
                                      // minHeight: 20,
                                      backgroundColor: "#b9bdba",
                                      borderRadius: 50,
                                      textAlign: "center",
                                      justifyContent: "center",
                                      display: "flex",
                                    }}
                                  >
                                    <Feed
                                      sx={{ fontSize: 30, color: "white" }}
                                    />
                                  </Box>
                                </Grid>
                                <Grid item xs={12}>
                                  <Stack
                                    spacing={2}
                                    direction="row"
                                    alignItems="center"
                                    justifyContent={"center"}
                                  >
                                    <Typography
                                      variant="h3"
                                      sx={{ color: "white" }}
                                    >
                                      {item.value}
                                    </Typography>
                                    <Typography
                                      variant="h6"
                                      fontSize="13px"
                                      sx={{ color: "white" }}
                                    >
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
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Grid>
      </Accordion>
      {(user?.user_group === "administrator" || user?.department_id === 1 || user?.user_group === "CMCO" ||
        user?.user_group === "CMCE" ||
        user?.user_group === "Agent") && (
        <AccordionList
          surveyStatusCount={fieldSurveyData ?? []}
          surveyTitle="Field Survey"
        />
      )}
      <Accordion title="Inhouse Survey" defaultExpanded={false}>
        <Grid container rowSpacing={2.5} columnSpacing={2}>
          <Container maxWidth="lg">
            <Box sx={{ flexGrow: 1, py: 5 }}>
              <Grid container spacing={2}>
                <Grid item lg={8} sm={12}>
                  <Grid container spacing={2}>
                    {inHouseSurveyData &&
                      inHouseSurveyData.map((item) => (
                        <Grid item lg={3.5} sm={4} md={4} key={item.id}>
                          <Card
                            sx={{
                              width: "100%",
                              height: "100%",
                              backgroundColor: "#0f6fc6",
                              ...(type === "dashboard"
                                ? null
                                : {
                                    "&:hover": {
                                      backgroundColor: "#008aed", // Change the background color on hover
                                      cursor: "pointer",
                                    },
                                  }),
                            }}
                            onClick={() =>
                              typeof categoryName === "string"
                                ? handleClick(item.title)
                                : null
                            }
                          >
                            <CardContent
                              style={{ textAlign: "center", margin: "auto" }}
                            >
                              <Grid container spacing={2}>
                                <Grid
                                  item
                                  xs={12}
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      minWidth: 70,
                                      maxWidth: 70,
                                      // minHeight: 20,
                                      backgroundColor: "#b9bdba",
                                      borderRadius: 50,
                                      textAlign: "center",
                                      justifyContent: "center",
                                      display: "flex",
                                    }}
                                  >
                                    <Feed
                                      sx={{ fontSize: 30, color: "white" }}
                                    />
                                  </Box>
                                </Grid>
                                <Grid item xs={12}>
                                  <Stack
                                    spacing={2}
                                    direction="row"
                                    alignItems="center"
                                    justifyContent={"center"}
                                  >
                                    <Typography
                                      variant="h3"
                                      sx={{ color: "white" }}
                                    >
                                      {item.value}
                                    </Typography>
                                    <Typography
                                      variant="h6"
                                      fontSize="13px"
                                      sx={{ color: "white" }}
                                    >
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
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Grid>
      </Accordion>

      <Accordion title="Down Payment Activities" defaultExpanded={false}>
        <Grid container rowSpacing={2.5} columnSpacing={2}>
          <Container maxWidth="lg">
            <Box sx={{ flexGrow: 1, py: 5 }}>
              <Grid container spacing={2}>
                <Grid item lg={8} sm={12}>
                  <Grid container spacing={2}>
                    {downPaymentData &&
                      downPaymentData.map((item) => (
                        <Grid item lg={3.5} sm={4} md={4} key={item.id}>
                          <Card
                            sx={{
                              width: "100%",
                              height: "100%",
                              backgroundColor: "#0f6fc6",
                              ...(type === "dashboard"
                                ? null
                                : {
                                    "&:hover": {
                                      backgroundColor: "#008aed", // Change the background color on hover
                                      cursor: "pointer",
                                    },
                                  }),
                            }}
                            onClick={() =>
                              typeof categoryName === "string"
                                ? handleClick(item.title)
                                : null
                            }
                          >
                            <CardContent
                              style={{ textAlign: "center", margin: "auto" }}
                            >
                              <Grid container spacing={2}>
                                <Grid
                                  item
                                  xs={12}
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      minWidth: 70,
                                      maxWidth: 70,
                                      // minHeight: 20,
                                      backgroundColor: "#b9bdba",
                                      borderRadius: 50,
                                      textAlign: "center",
                                      justifyContent: "center",
                                      display: "flex",
                                    }}
                                  >
                                    <Feed
                                      sx={{ fontSize: 30, color: "white" }}
                                    />
                                  </Box>
                                </Grid>
                                <Grid item xs={12}>
                                  <Stack
                                    spacing={2}
                                    direction="row"
                                    alignItems="center"
                                    justifyContent={"center"}
                                  >
                                    <Typography
                                      variant="h3"
                                      sx={{ color: "white" }}
                                    >
                                      {item.value}
                                    </Typography>
                                    <Typography
                                      variant="h6"
                                      fontSize="13px"
                                      sx={{ color: "white" }}
                                    >
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
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Grid>
      </Accordion>

      <Accordion title="Contract Activities" defaultExpanded={false}>
        <Grid container rowSpacing={2.5} columnSpacing={2}>
          <Container maxWidth="lg">
            <Box sx={{ flexGrow: 1, py: 5 }}>
              <Grid container spacing={2}>
                <Grid item lg={8} sm={12}>
                  <Grid container spacing={2}>
                    {contractData &&
                      contractData.map((item) => (
                        <Grid item lg={3.5} sm={4} md={4} key={item.id}>
                          <Card
                            sx={{
                              width: "100%",
                              height: "100%",
                              backgroundColor: "#0f6fc6",
                              ...(type === "dashboard"
                                ? null
                                : {
                                    "&:hover": {
                                      backgroundColor: "#008aed", // Change the background color on hover
                                      cursor: "pointer",
                                    },
                                  }),
                            }}
                            onClick={() =>
                              typeof categoryName === "string"
                                ? handleClick(item.title)
                                : null
                            }
                          >
                            <CardContent
                              style={{ textAlign: "center", margin: "auto" }}
                            >
                              <Grid container spacing={2}>
                                <Grid
                                  item
                                  xs={12}
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      minWidth: 70,
                                      maxWidth: 70,
                                      // minHeight: 20,
                                      backgroundColor: "#b9bdba",
                                      borderRadius: 50,
                                      textAlign: "center",
                                      justifyContent: "center",
                                      display: "flex",
                                    }}
                                  >
                                    <Feed
                                      sx={{ fontSize: 30, color: "white" }}
                                    />
                                  </Box>
                                </Grid>
                                <Grid item xs={12}>
                                  <Stack
                                    spacing={2}
                                    direction="row"
                                    alignItems="center"
                                    justifyContent={"center"}
                                  >
                                    <Typography
                                      variant="h3"
                                      sx={{ color: "white" }}
                                    >
                                      {item.value}
                                    </Typography>
                                    <Typography
                                      variant="h6"
                                      fontSize="13px"
                                      sx={{ color: "white" }}
                                    >
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
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Grid>
      </Accordion>

      <Accordion title="CMCO Sale Invoice Activities" defaultExpanded={false}>
        <Grid container rowSpacing={2.5} columnSpacing={2}>
          <Container maxWidth="lg">
            <Box sx={{ flexGrow: 1, py: 5 }}>
              <Grid container spacing={2}>
                <Grid item lg={8} sm={12}>
                  <Grid container spacing={2}>
                    {saleInvoiceData &&
                      saleInvoiceData.map((item) => (
                        <Grid item lg={3.5} sm={4} md={4} key={item.id}>
                          <Card
                            sx={{
                              width: "100%",
                              height: "100%",
                              backgroundColor: "#0f6fc6",
                              ...(type === "dashboard"
                                ? null
                                : {
                                    "&:hover": {
                                      backgroundColor: "#008aed", // Change the background color on hover
                                      cursor: "pointer",
                                    },
                                  }),
                            }}
                            onClick={() =>
                              typeof categoryName === "string"
                                ? handleClick(item.title)
                                : null
                            }
                          >
                            <CardContent
                              style={{ textAlign: "center", margin: "auto" }}
                            >
                              <Grid container spacing={2}>
                                <Grid
                                  item
                                  xs={12}
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      minWidth: 70,
                                      maxWidth: 70,
                                      // minHeight: 20,
                                      backgroundColor: "#b9bdba",
                                      borderRadius: 50,
                                      textAlign: "center",
                                      justifyContent: "center",
                                      display: "flex",
                                    }}
                                  >
                                    <Feed
                                      sx={{ fontSize: 30, color: "white" }}
                                    />
                                  </Box>
                                </Grid>
                                <Grid item xs={12}>
                                  <Stack
                                    spacing={2}
                                    direction="row"
                                    alignItems="center"
                                    justifyContent={"center"}
                                  >
                                    <Typography
                                      variant="h3"
                                      sx={{ color: "white" }}
                                    >
                                      {item.value}
                                    </Typography>
                                    <Typography
                                      variant="h6"
                                      fontSize="13px"
                                      sx={{ color: "white" }}
                                    >
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
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Grid>
      </Accordion>

      <Accordion title="Allocation Activities" defaultExpanded={false}>
        <Grid container rowSpacing={2.5} columnSpacing={2}>
          <Container maxWidth="lg">
            <Box sx={{ flexGrow: 1, py: 5 }}>
              <Grid container spacing={2}>
                <Grid item lg={8} sm={12}>
                  <Grid container spacing={2}>
                    {reminderData &&
                      reminderData.map((item) => (
                        <Grid item lg={3.5} sm={4} md={4} key={item.id}>
                          <Card
                            sx={{
                              width: "100%",
                              height: "100%",
                              backgroundColor: "#0f6fc6",
                              ...(type === "dashboard"
                                ? null
                                : {
                                    "&:hover": {
                                      backgroundColor: "#008aed", // Change the background color on hover
                                      cursor: "pointer",
                                    },
                                  }),
                            }}
                            onClick={() =>
                              typeof categoryName === "string"
                                ? handleClick(item.title)
                                : null
                            }
                          >
                            <CardContent
                              style={{ textAlign: "center", margin: "auto" }}
                            >
                              <Grid container spacing={2}>
                                <Grid
                                  item
                                  xs={12}
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      minWidth: 70,
                                      maxWidth: 70,
                                      // minHeight: 20,
                                      backgroundColor: "#b9bdba",
                                      borderRadius: 50,
                                      textAlign: "center",
                                      justifyContent: "center",
                                      display: "flex",
                                    }}
                                  >
                                    <Feed
                                      sx={{ fontSize: 30, color: "white" }}
                                    />
                                  </Box>
                                </Grid>
                                <Grid item xs={12}>
                                  <Stack
                                    spacing={2}
                                    direction="row"
                                    alignItems="center"
                                    justifyContent={"center"}
                                  >
                                    <Typography
                                      variant="h3"
                                      sx={{ color: "white" }}
                                    >
                                      {item.value}
                                    </Typography>
                                    <Typography
                                      variant="h6"
                                      fontSize="13px"
                                      sx={{ color: "white" }}
                                    >
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
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Grid>
      </Accordion>
    </>
  );
};

export default CMCOAccordionList;
