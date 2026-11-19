import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Container,
  Card,
  CardContent,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { Feed } from "@mui/icons-material";
import AppCurrentVisits from "../../sections/app-current-visits";
import Accordion from "components/Accordion";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const AllAccordionList = ({ applications, type = "dashboard" }) => {
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

  const { categoryName, categoryId } = useParams();

  const [applicationData, setApplicationData] = useState([]);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md")); // Check for tablet (md and below)

  useEffect(() => {
    const keys = Object.keys(applications);
    const optimizedArray = keys.map((key) => ({
      id: key,
      title: toTitleCase(key),
      label: toTitleCase(key),
      value: applications[key],
    }));

    const filteredSeries = optimizedArray?.filter(
      (item) => !(item.id === 'submitted' && ["1", "2", "3"].includes(categoryId))
    );

    setApplicationData(filteredSeries);
  }, [applications]);


  let navigate = useNavigate();
  const handleClick = (title) => {
    let path = `/CreditManagement/Application/${categoryName}/${categoryId}?status=${title}&page=1`;
    navigate(path);
  };

  return (
    <Accordion title="Applications">
      <Grid container rowSpacing={2.5} columnSpacing={2}>
        <Container maxWidth="lg">
          <Box sx={{ flexGrow: 1, py: 5 }}>
            <Grid container spacing={2}>
              {/* Cards Grid */}
              <Grid item lg={8} sm={12} xs={12}>
                <Grid container spacing={2}>
                  {applicationData.map((item) => (
                    <Grid item lg={3.5} md={4} sm={6} xs={12} key={item.id}>
                      <Card
                        sx={{
                          width: "100%",
                          height: "100%",
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
                          typeof categoryName === "string" ? handleClick(item.title) : null
                        }
                      >
                        <CardContent sx={{ textAlign: "center", margin: "auto" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                              <Box
                                sx={{
                                  minWidth: 70,
                                  maxWidth: 70,
                                  backgroundColor: "#b9bdba",
                                  borderRadius: "50%",
                                  textAlign: "center",
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <Feed sx={{ fontSize: 30, color: "white" }} />
                              </Box>
                            </Grid>
                            <Grid item xs={12}>
                              <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
                                <Typography variant="h3" sx={{ color: "white" }}>
                                  {item.value}
                                </Typography>
                                <Typography variant="h6" fontSize="13px" sx={{ color: "white" }}>
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

              {/* Chart Grid - Full width on tablet */}
              {/* Chart Grid - Hidden on tablet and smaller screens */}
              {!isTablet && (
                <Grid item lg={4}>
                  <AppCurrentVisits
                    title="Chart"
                    chart={{
                      series: applicationData,
                    }}
                  />
                </Grid>
              )}

            </Grid>
          </Box>
        </Container>
      </Grid>
    </Accordion>
  );
};

export default AllAccordionList;
