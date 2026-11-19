import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLoanOperaitonApplicationCount } from "modules/credit-management/slices/applicationSlice";
import { useEffect } from "react";
import Accordion from "components/Accordion";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

const LoanModuleDashboardIndex = (open) => {
  const dispatch = useDispatch();
  const { loanOperationApplicationCount, isSuccess, isError, message } =
    useSelector((state) => state.loanOperationApplicationCount);
  useEffect(() => {
    dispatch(getLoanOperaitonApplicationCount());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleDisbursementCardClick = (loanOperationValue) => {
    navigate(
      `/LoanOperationModule/SetDisbursementDate/${loanOperationValue.id}`
    );
  };

  const handleGenerateGLCardClick = (loanOperationValue) => {
    navigate(
      `/LoanOperationModule/GLListing/${loanOperationValue.id}`
    );
  };

  const handleContractCardClick = (loanOperationValue) => {
    navigate(`/LoanOperationModule/Contract/${loanOperationValue.id}`);
  }

  const handleStampDutyPaymentCardClick = (loanOperationValue) => {
    navigate(`/LoanOperationModule/StampDutyPayment/${loanOperationValue.id}`);
  }

  return (
    <>
      <Box>
        <Accordion defaultExpanded={true} title="Loan Operations">
          <div
            style={{ marginTop: 7, display: "flex", justifyContent: "center" }}
          >
            <h3>Disbursement</h3>
          </div>
          <Grid container spacing={3}>
            {loanOperationApplicationCount.map(
              (loanOperationValue, loanOperationKey) => (
                <Grid
                  item
                  xs={3}
                  lg={3} 
                  sm={3} 
                  md={3} 
                  sx={{ marginTop: "3px", marginBottom: "8px" }}
                  key={loanOperationKey}
                >
                  <Card
                    sx={{
                      //minWidth: 300,
                      minHeight: 170,
                      background: "#0f6fc6",
                      display: "flex",
                    }}
                    // onClick={() =>
                    //   handleDisbursementCardClick(loanOperationValue)
                    // }
                  >
                    <CardActionArea>
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h3"
                          component="div"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            color: "white",
                          }}
                        >
                          {loanOperationValue.name}
                        </Typography>
                        {loanOperationValue.applications.map(
                          (applicationValue, applicationIndex) => (
                            <Grid container spacing={2} sx={{ color: "white" }}>
                              <Grid item xs={2} />
                              <Grid item xs={3} offset={2}>
                                <Typography
                                  variant="h3"
                                  component="h3"
                                  key={applicationIndex}
                                >
                                  {applicationValue.count}
                                </Typography>
                              </Grid>
                              <Grid item xs={3}>
                                <Typography
                                  variant="body2"
                                  key={applicationIndex}
                                  sx={{
                                    fontSize: "16px",
                                    textAlign: "center",
                                  }}
                                >
                                  {applicationValue.is_disbursed === 1
                                    ? "Finished"
                                    : "Unfinished"}
                                </Typography>
                              </Grid>
                              <Grid item xs={1} />
                            </Grid>
                          )
                        )}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              )
            )}
          </Grid>
          <div
            style={{ marginTop: 7, display: "flex", justifyContent: "center" }}
          >
            <h3>Generate GL</h3>
          </div>
          <Grid container spacing={3}>
            {loanOperationApplicationCount.map(
              (loanOperationValue, loanOperationKey) => (
                <Grid
                  item
                  xs={3}
                  lg={3} 
                  sm={3} 
                  md={3} 
                  sx={{ marginTop: "3px", marginBottom: "8px" }}
                  key={loanOperationKey}
                >
                  <Card
                    sx={{
                      //minWidth: 300,
                      minHeight: 170,
                      background: "#0f6fc6",
                      display: "flex",
                    }}
                    onClick={() =>
                      handleGenerateGLCardClick(loanOperationValue)
                    }
                  >
                    <CardActionArea>
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h3"
                          component="div"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            color: "white",
                          }}
                        >
                          {loanOperationValue.name}
                        </Typography>

                        {loanOperationValue.contracts.map(
                          (contractValue, contractIndex) => (
                            <Grid container spacing={2} sx={{ color: "white" }}>
                              <Grid item xs={2} />
                              <Grid item xs={3} offset={2}>
                                <Typography
                                  variant="h3"
                                  component="h3"
                                  key={contractIndex}
                                >
                                  {contractValue.count}
                                </Typography>
                              </Grid>
                              <Grid item xs={3}>
                                <Typography
                                  variant="body2"
                                  key={contractIndex}
                                  sx={{
                                    fontSize: "16px",
                                    textAlign: "center",
                                  }}
                                >
                                  {contractValue.is_generated_gl === 1
                                    ? "Finished"
                                    : "Unfinished"}
                                </Typography>
                              </Grid>
                              <Grid item xs={1} />
                            </Grid>
                          )
                        )}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              )
            )}
          </Grid>
          <div
            style={{ marginTop: 7, display: "flex", justifyContent: "center" }}
          >
            <h3>Contract</h3>
          </div>
          <Grid container spacing={3}>
            {loanOperationApplicationCount.map(
              (loanOperationValue, loanOperationKey) => (
                <Grid
                  item
                  xs={3}
                  lg={3} 
                  sm={3} 
                  md={3} 
                  sx={{ marginTop: "3px", marginBottom: "8px" }}
                  key={loanOperationKey}
                >
                  <Card
                    sx={{
                      //minWidth: 300,
                      minHeight: 170,
                      background: "#0f6fc6",
                      display: "flex",
                    }}
                    onClick={() => handleContractCardClick(loanOperationValue)}
                  >
                    <CardActionArea>
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h3"
                          component="div"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            color: "white",
                          }}
                        >
                          {loanOperationValue.name}
                        </Typography>
                        <Typography
                          variant="h3"
                          component="h3"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            color: "white",
                          }}
                        >
                          {loanOperationValue.contract_count}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              )
            )}
          </Grid>
          <div
            style={{ marginTop: 7, display: "flex", justifyContent: "center" }}
          >
            <h3>Stamp Duty</h3>
          </div>
          <Grid container spacing={3}>
            {loanOperationApplicationCount.map(
              (loanOperationValue, loanOperationKey) => (
                <Grid
                  item
                  xs={3}
                  lg={3} 
                  sm={3} 
                  md={3} 
                  sx={{ marginTop: "3px", marginBottom: "8px" }}
                  key={loanOperationKey}
                >
                  <Card
                    sx={{
                      //minWidth: 300,
                      minHeight: 170,
                      background: "#0f6fc6",
                      display: "flex",
                    }}
                    onClick={() =>
                      handleStampDutyPaymentCardClick(loanOperationValue)
                    }
                  >
                    <CardActionArea>
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h3"
                          component="div"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            color: "white",
                          }}
                        >
                          {loanOperationValue.name}
                        </Typography>
                        {loanOperationValue.stamp_duty_contracts.map(
                          (stampDutyContractValue, stampDutyContractIndex) => (
                            <Grid container spacing={2} sx={{ color: "white" }}>
                              <Grid item xs={2} />
                              <Grid item xs={3} offset={2}>
                                <Typography
                                  variant="h3"
                                  component="h3"
                                  key={stampDutyContractIndex}
                                >
                                  {stampDutyContractValue.count}
                                </Typography>
                              </Grid>
                              <Grid item xs={3}>
                                <Typography
                                  variant="body2"
                                  key={stampDutyContractIndex}
                                  sx={{ fontSize: "16px" }}
                                >
                                  {
                                    stampDutyContractValue.stamp_duty_status ===
                                    "open"
                                      ? "Open"
                                      : stampDutyContractValue.stamp_duty_status ===
                                        "pending"
                                      ? "Pending"
                                      : stampDutyContractValue.stamp_duty_status ===
                                        "rejected"
                                      ? "Rejected"
                                      : stampDutyContractValue.stamp_duty_status ===
                                        "approved"
                                      ? "Approved"
                                      : null // or a default value
                                  }
                                </Typography>
                              </Grid>
                              <Grid item xs={1} />
                            </Grid>
                          )
                        )}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              )
            )}
          </Grid>
        </Accordion>
      </Box>
    </>
  );
};

export default LoanModuleDashboardIndex;
