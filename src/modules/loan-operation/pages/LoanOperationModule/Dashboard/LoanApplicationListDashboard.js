import React, { useEffect, useMemo, useState } from "react";

import {
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  Chip,
  Stack,
} from "@mui/material";

import {
  ArrowForward,
  DescriptionOutlined,
  AccountBalanceOutlined,
  AssignmentOutlined,
  ReceiptLongOutlined,
  TrendingUp,
  CheckCircleOutline,
  ScheduleOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// import {
//   getLoanOperaitonApplicationCountBeforeContract,
// } from "../../features/...";

// import {
//   getMobContractsCount,
// } from "../../features/...";

// import {
//   getLoanOperationApplicationCount,
// } from "../../features/...";


/* ============================================================
   HELPERS
============================================================ */

function functionToTitleCase(str) {
  return str
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}


/* ============================================================
   DEMO DATA
   Replace these with API data later
============================================================ */

const demoContractPreparation = [
  {
    name: "Downpayment",
    count: 42,
  },
  {
    name: "To Sign",
    count: 28,
  },
  {
    name: "Sale Invoice",
    count: 18,
  },
  {
    name: "Agreement",
    count: 12,
  },
];

const demoGLData = [
  {
    name: "Jan",
    generated: 32,
    pending: 14,
  },
  {
    name: "Feb",
    generated: 48,
    pending: 18,
  },
  {
    name: "Mar",
    generated: 55,
    pending: 12,
  },
  {
    name: "Apr",
    generated: 67,
    pending: 21,
  },
  {
    name: "May",
    generated: 72,
    pending: 16,
  },
  {
    name: "Jun",
    generated: 84,
    pending: 11,
  },
];

const demoContractData = [
  {
    name: "Auto Loan",
    contracts: 76,
  },
  {
    name: "Motorcycle",
    contracts: 54,
  },
  {
    name: "Consumer",
    contracts: 42,
  },
  {
    name: "Business",
    contracts: 31,
  },
];

const demoStampDutyData = [
  {
    name: "Approved",
    value: 58,
  },
  {
    name: "Pending",
    value: 24,
  },
  {
    name: "Open",
    value: 13,
  },
  {
    name: "Rejected",
    value: 5,
  },
];

const demoPipelineData = [
  {
    name: "Credit Decisioning",
    value: 156,
  },
  {
    name: "Applications",
    value: 118,
  },
  {
    name: "Contracts",
    value: 87,
  },
  {
    name: "Booking & Settlement",
    value: 72,
  },
];


/* ============================================================
   COLORS
============================================================ */

const ORANGE = "var(--color-orange-500)";

const CHART_COLORS = [
  "var(--color-orange-500)",
  "#4F46E5",
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
];


/* ============================================================
   CUSTOM TOOLTIP
============================================================ */

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 2,
        px: 2,
        py: 1.5,
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 700,
          color: "#6b7280",
          mb: 0.5,
        }}
      >
        {label}
      </Typography>

      {payload.map((item, index) => (
        <Typography
          key={index}
          sx={{
            fontSize: 14,
            fontWeight: 700,
            color: "#111827",
          }}
        >
          {item.name}: {item.value}
        </Typography>
      ))}
    </Box>
  );
};


/* ============================================================
   SECTION HEADER
============================================================ */

function SectionHeader({
  icon,
  title,
  subtitle,
  action,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 3,
        gap: 2,
      }}
    >
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
      >
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255,115,0,0.10)",
            color: ORANGE,
          }}
        >
          {icon}
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 800,
              color: "#111827",
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              color: "#9ca3af",
              mt: 0.3,
            }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Stack>

      {action}
    </Box>
  );
}


/* ============================================================
   MAIN COMPONENT
============================================================ */

const LoanApplicationListDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(
    (state) => state.auth
  );

  /*
  ============================================================
  API DATA
  ============================================================

  const {
    applicationCountBeforeContract,
  } = useSelector(
    (state) => state.applicationCountBeforeContract
  );

  const {
    mobContractsCount,
  } = useSelector(
    (state) => state.mobContractsCount
  );

  const {
    loanOperationApplicationCount,
    isSuccess,
    isError,
    message,
  } = useSelector(
    (state) => state.loanOperationApplicationCount
  );

  */

  /* ============================================================
     API CALLS
  ============================================================ */

  /*
  useEffect(() => {

    dispatch(
      getLoanOperaitonApplicationCountBeforeContract({
        params: {
          mob_status: 1,
          user_id: user.id,

          ...(user.user_group === "CMCO" ||
          user.user_group === "CMCE" ||
          user.user_group === "Agent"
            ? {
                created_by: user.id,
              }
            : {}),
        },
      })
    );

    const mobContractParams = {
      user_id: user?.id,
    };

    dispatch(
      getMobContractsCount({
        params:
          user?.user_group === "CMCO"
            ? mobContractParams
            : {},
      })
    );

  }, [dispatch, user]);
  */


  /* ============================================================
     DEMO / API SWITCH
  ============================================================ */

  const useDemoData = true;


  /*
  When API is ready:

  const contractPreparationData =
      applicationCountBeforeContract;

  const glData =
      loanOperationApplicationCount;

  */

  const contractPreparationData =
    useDemoData
      ? demoContractPreparation
      : [];


  /* ============================================================
     NAVIGATION
  ============================================================ */

  const handleClick = (title) => {
    if (title === "To Generated Agreement") {
      navigate(
        "/LoanOperationModule/Contract/mode/mob-contract"
      );
    } else {
      navigate(
        `/LoanOperationModule/loan-operation-application-information/${title}`
      );
    }
  };


  const handleGenerateGL = (item) => {
    navigate(
      `/LoanOperationModule/GLListing/${item.id}`
    );
  };


  const handleContract = (item) => {
    navigate(
      `/LoanOperationModule/Contract/${item.id}`
    );
  };


  const handleStampDuty = (item) => {
    navigate(
      `/LoanOperationModule/StampDutyPayment/${item.id}`
    );
  };

  const ORANGE = "#F97316"; 


  /* ============================================================
     TOTALS
  ============================================================ */

  const totalApplications = useMemo(
    () =>
      demoPipelineData.reduce(
        (sum, item) => sum + item.value,
        0
      ),
    []
  );

  const totalContracts = demoContractData.reduce(
    (sum, item) => sum + item.contracts,
    0
  );

  const totalStampDuty = demoStampDutyData.reduce(
    (sum, item) => sum + item.value,
    0
  );


  return (
    <Box
      sx={{
        width: "100%",
        px: {
          xs: 2,
          sm: 3,
          md: 4,
        },
        py: {
          xs: 2,
          md: 4,
        },
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <Box
        sx={{
          mb: 5,
          display: "flex",
          alignItems: {
            xs: "flex-start",
            md: "center",
          },
          justifyContent: "space-between",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: {
                xs: 26,
                md: 32,
              },
              fontWeight: 900,
              letterSpacing: "-1px",
              color: "#111827",
            }}
          >
            Lending Management
          </Typography>

          <Typography
            sx={{
              mt: 0.7,
              color: "#6b7280",
              fontSize: 14,
            }}
          >
            Monitor applications, contracts,
            GL generation and stamp duty activities.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              backgroundColor: "#10B981",
              boxShadow:
                "0 0 0 5px rgba(16,185,129,0.10)",
            }}
          />

          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              color: "#6b7280",
            }}
          >
            Operations overview
          </Typography>
        </Box>
      </Box>


      {/* =====================================================
          TOP SUMMARY - NOT CARDS
      ====================================================== */}

      <Grid
        container
        spacing={0}
        sx={{
          mb: 5,
          borderTop: "1px solid #e5e7eb",
          borderBottom: "1px solid #e5e7eb",
        }}
      >

        <Grid
          item
          xs={6}
          md={3}
          sx={{
            py: 2.5,
            pr: 3,
            borderRight: {
              xs: "none",
              md: "1px solid #e5e7eb",
            },
            borderBottom: {
              xs: "1px solid #e5e7eb",
              md: "none",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              color: "#9ca3af",
              fontWeight: 600,
            }}
          >
            TOTAL APPLICATIONS
          </Typography>

          <Typography
            sx={{
              fontSize: 32,
              fontWeight: 900,
              color: ORANGE,
              mt: 0.5,
            }}
          >
            156
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              color: "#10B981",
              fontWeight: 700,
            }}
          >
            +12.8% this month
          </Typography>
        </Grid>


        <Grid
          item
          xs={6}
          md={3}
          sx={{
            py: 2.5,
            px: {
              xs: 2,
              md: 3,
            },
            borderRight: {
              xs: "none",
              md: "1px solid #e5e7eb",
            },
            borderBottom: {
              xs: "1px solid #e5e7eb",
              md: "none",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              color: "#9ca3af",
              fontWeight: 600,
            }}
          >
            ACTIVE CONTRACTS
          </Typography>

          <Typography
            sx={{
              fontSize: 32,
              fontWeight: 900,
              color: "#4F46E5",
              mt: 0.5,
            }}
          >
            {totalContracts}
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              color: "#6b7280",
            }}
          >
            Across all products
          </Typography>
        </Grid>


        <Grid
          item
          xs={6}
          md={3}
          sx={{
            py: 2.5,
            px: {
              xs: 0,
              md: 3,
            },
            borderRight: {
              xs: "none",
              md: "1px solid #e5e7eb",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              color: "#9ca3af",
              fontWeight: 600,
            }}
          >
            GL PROCESSED
          </Typography>

          <Typography
            sx={{
              fontSize: 32,
              fontWeight: 900,
              color: "#06B6D4",
              mt: 0.5,
            }}
          >
            72
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              color: "#10B981",
              fontWeight: 700,
            }}
          >
            86% completion
          </Typography>
        </Grid>


        <Grid
          item
          xs={6}
          md={3}
          sx={{
            py: 2.5,
            pl: {
              xs: 2,
              md: 3,
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              color: "#9ca3af",
              fontWeight: 600,
            }}
          >
            STAMP DUTY
          </Typography>

          <Typography
            sx={{
              fontSize: 32,
              fontWeight: 900,
              color: "#10B981",
              mt: 0.5,
            }}
          >
            58
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              color: "#6b7280",
            }}
          >
            Approved applications
          </Typography>
        </Grid>

      </Grid>


      {/* =====================================================
          APPLICATION PIPELINE
      ====================================================== */}

      <Box sx={{ mb: 6 }}>

        <SectionHeader
          icon={<TrendingUp />}
          title="Application pipeline"
          subtitle="Current workload across the loan operation process"
        />

        {/* <Box
          sx={{
            height: 320,
            width: "100%",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={demoPipelineData}
              layout="vertical"
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#e5e7eb"
              />

              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                type="category"
                dataKey="name"
                width={110}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                content={<CustomTooltip />}
              />

              <Bar
                dataKey="value"
                name="Applications"
                fill={ORANGE}
                radius={[0, 8, 8, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box> */}
        <Box
  sx={{
    height: 320,
    width: "100%",
  }}
>
  <ResponsiveContainer width="100%" height="100%">
    <BarChart
      data={demoPipelineData}
      layout="vertical"
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid
        strokeDasharray="3 3"
        horizontal={false}
        stroke="#fed7aa"
      />

      <XAxis
        type="number"
        axisLine={false}
        tickLine={false}
        tick={{ fill: "#9a3412", fontSize: 12 }}
      />

      <YAxis
        type="category"
        dataKey="name"
        width={150}
        axisLine={false}
        tickLine={false}
        tick={{ fill: "#7c2d12", fontSize: 13 }}
      />

      <Tooltip content={<CustomTooltip />} />

      <Bar
        dataKey="value"
        name="Applications"
        fill="#F97316"
        radius={[0, 8, 8, 0]}
        barSize={30}
      />
    </BarChart>
  </ResponsiveContainer>
</Box>

      </Box>


      {/* =====================================================
          CONTRACT PREPARATION
      ====================================================== */}

      <Box sx={{ mb: 6 }}>

        <SectionHeader
          icon={<DescriptionOutlined />}
          title="Contract preparation"
          subtitle="Applications currently waiting for contract-related actions"
          action={
            <Button
              endIcon={<ArrowForward />}
              onClick={() =>
                handleClick("Waiting Downpayment Receipt")
              }
              sx={{
                textTransform: "none",
                color: ORANGE,
                fontWeight: 700,
              }}
            >
              View all
            </Button>
          }
        />

        <Box sx={{ height: 330 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={contractPreparationData}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 20,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
              />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                content={<CustomTooltip />}
              />

              <Bar
                dataKey="count"
                name="Applications"
                fill={ORANGE}
                radius={[8, 8, 0, 0]}
                barSize={48}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>

      </Box>


      {/* =====================================================
          GL + CONTRACT
      ====================================================== */}

      <Grid
        container
        spacing={5}
        sx={{ mb: 6 }}
      >

        {/* GL GENERATION */}

        <Grid item xs={12} lg={7}>

          <SectionHeader
            icon={<AccountBalanceOutlined />}
            title="Account Settlement"
            subtitle="Generated vs pending general ledger records"
          />

          <Box
            sx={{
              height: 330,
            }}
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={demoGLData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 10,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  content={<CustomTooltip />}
                />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="generated"
                  name="Generated"
                  stroke={ORANGE}
                  strokeWidth={4}
                  dot={{
                    r: 5,
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="pending"
                  name="Pending"
                  stroke="#4F46E5"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                  }}
                />

              </LineChart>
            </ResponsiveContainer>
          </Box>

        </Grid>


        {/* CONTRACT DISTRIBUTION */}

        <Grid item xs={12} lg={5}>

          <SectionHeader
            icon={<AssignmentOutlined />}
            title="Contract portfolio"
            subtitle="Contracts by loan product"
          />

          <Box
            sx={{
              height: 330,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={demoContractData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 10,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  fontSize={11}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  content={<CustomTooltip />}
                />

                <Bar
                  dataKey="contracts"
                  name="Contracts"
                  radius={[8, 8, 0, 0]}
                  barSize={40}
                >
                  {demoContractData.map(
                    (_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          CHART_COLORS[index %
                            CHART_COLORS.length]
                        }
                      />
                    )
                  )}
                </Bar>

              </BarChart>
            </ResponsiveContainer>
          </Box>

        </Grid>

      </Grid>


      {/* =====================================================
          STAMP DUTY
      ====================================================== */}

      <Box sx={{ mb: 6 }}>

        <SectionHeader
          icon={<ReceiptLongOutlined />}
          title="Stamp duty status"
          subtitle="Current status of stamp duty processing"
        />

        <Grid
          container
          spacing={4}
          alignItems="center"
        >

          {/* DONUT */}

          <Grid
            item
            xs={12}
            md={6}
          >

            <Box
              sx={{
                height: 320,
                position: "relative",
              }}
            >

              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>

                  <Pie
                    data={demoStampDutyData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={4}
                  >
                    {demoStampDutyData.map(
                      (_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            CHART_COLORS[
                              index %
                                CHART_COLORS.length
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip
                    content={<CustomTooltip />}
                  />

                </PieChart>
              </ResponsiveContainer>

              {/* CENTER VALUE */}

              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  pointerEvents: "none",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 34,
                    fontWeight: 900,
                    color: "#111827",
                  }}
                >
                  {totalStampDuty}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 12,
                    color: "#9ca3af",
                  }}
                >
                  Total
                </Typography>
              </Box>

            </Box>

          </Grid>


          {/* STATUS LIST */}

          <Grid
            item
            xs={12}
            md={6}
          >

            <Stack spacing={2}>

              {demoStampDutyData.map(
                (item, index) => (
                  <Box
                    key={item.name}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent:
                        "space-between",
                      py: 1.5,
                      borderBottom:
                        "1px solid #f0f0f0",
                    }}
                  >

                    <Stack
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                    >

                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          backgroundColor:
                            CHART_COLORS[
                              index %
                                CHART_COLORS.length
                            ],
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: "#374151",
                        }}
                      >
                        {item.name}
                      </Typography>

                    </Stack>

                    <Typography
                      sx={{
                        fontSize: 22,
                        fontWeight: 900,
                        color: "#111827",
                      }}
                    >
                      {item.value}
                    </Typography>

                  </Box>
                )
              )}

            </Stack>

          </Grid>

        </Grid>

      </Box>


      {/* =====================================================
          QUICK OPERATIONS
      ====================================================== */}

      <Box
        sx={{
          pt: 3,
          borderTop: "1px solid #e5e7eb",
        }}
      >

        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 800,
            color: "#111827",
            mb: 2,
          }}
        >
          Quick operations
        </Typography>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={1.5}
        >

          <Button
            variant="outlined"
            startIcon={<DescriptionOutlined />}
            endIcon={<ArrowForward />}
            onClick={() =>
              handleClick(
                "Waiting Downpayment Receipt"
              )
            }
            sx={{
              textTransform: "none",
              borderColor: "#e5e7eb",
              color: "#374151",
              px: 2,
              py: 1.2,
              "&:hover": {
                borderColor: ORANGE,
                color: ORANGE,
              },
            }}
          >
            Downpayment
          </Button>

          <Button
            variant="outlined"
            startIcon={<AssignmentOutlined />}
            endIcon={<ArrowForward />}
            onClick={() =>
              handleClick("To Sign Contracts")
            }
            sx={{
              textTransform: "none",
              borderColor: "#e5e7eb",
              color: "#374151",
              px: 2,
              py: 1.2,
              "&:hover": {
                borderColor: ORANGE,
                color: ORANGE,
              },
            }}
          >
            Contracts
          </Button>

          <Button
            variant="outlined"
            startIcon={<AccountBalanceOutlined />}
            endIcon={<ArrowForward />}
            sx={{
              textTransform: "none",
              borderColor: "#e5e7eb",
              color: "#374151",
              px: 2,
              py: 1.2,
              "&:hover": {
                borderColor: ORANGE,
                color: ORANGE,
              },
            }}
          >
            Generate GL
          </Button>

          <Button
            variant="outlined"
            startIcon={<ReceiptLongOutlined />}
            endIcon={<ArrowForward />}
            sx={{
              textTransform: "none",
              borderColor: "#e5e7eb",
              color: "#374151",
              px: 2,
              py: 1.2,
              "&:hover": {
                borderColor: ORANGE,
                color: ORANGE,
              },
            }}
          >
            Stamp Duty
          </Button>

        </Stack>

      </Box>

    </Box>
  );
};

export default LoanApplicationListDashboard;