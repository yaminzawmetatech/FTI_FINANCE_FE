

// // material-ui
// import {
//   Box,
//   Grid,
//   Backdrop,
//   CircularProgress,
// } from "@mui/material";
// import Logo from "components/Logo";
// import AuthBackground from "assets/images/auth/AuthBackground";
// import React from "react";
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { login } from "../../features/auth/authSlice";
// import Paper from "@mui/material/Paper";

// function Login() {
//   const [formData, setFormData] = useState({
//     personal_email: "",
//     password: "",
//   });

//   const { personal_email, password } = formData;

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user, isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.auth
//   );

//   useEffect(() => {
//     // if (isError) {
//     //   toast.error(message);
//     // }

//     if (isSuccess || user) {
//       navigate("/");
//     }

//     // dispatch(reset())
//   }, [user, isError, isSuccess, message, navigate, dispatch]);

//   const onChange = (e) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();

//     const userData = {
//       personal_email,
//       password,
//     };

//     dispatch(login(userData));
//   };

//   if (isLoading) {
//     return (
//         <Backdrop
//             sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
//             open={true}
//         >
//           <CircularProgress color="inherit" />
//         </Backdrop>
//     );
//   }

//   return (
//     <Box sx={{ minHeight: "100vh" }}>
//       <AuthBackground />
//       <Grid
//         container
//         direction="column"
//         justifyContent="flex-end"
//         sx={{
//           minHeight: "100vh",
//         }}
//       >
//         <Grid item xs={12} sx={{ ml: 3 }}>
//           <Logo />
//         </Grid>
//         <Grid item xs={12}>
//           <Grid
//             item
//             xs={12}
//             container
//             justifyContent="center"
//             alignItems="start"
//             padding= "30px"
//             sx={{
//               mt: 5,
//               py: 5,
//               minHeight: {
//                 xs: "calc(100vh - 134px)",
//                 md: "calc(100vh - 112px)",
//               },
//             }}
//           >
//             <Grid item>
//               <Paper sx={{ p: 3, boxShadow: 15 }}>
//                 {/* <AuthCard>{children}</AuthCard> */}
//                 <div className="container">
//                   <section className="heading">
//                     <h1>Login To Your Account</h1>
//                   </section>
//                   <section className="form">
//                     <form onSubmit={onSubmit}>
//                       <div className="form-group">
//                         <input
//                           type="email"
//                           className="form-control"
//                           id="email"
//                           name="personal_email"
//                           value={personal_email}
//                           placeholder="Enter your email"
//                           onChange={onChange}
//                           required
//                         />
//                       </div>
//                       <div className="form-group">
//                         <input
//                           type="password"
//                           className="form-control"
//                           id="password"
//                           name="password"
//                           value={password}
//                           placeholder="Enter password"
//                           onChange={onChange}
//                           required
//                         />
//                       </div>

//                       {isError ? <span> {message}</span> : ""}

//                       <div className="form-group">
//                         <button type="submit" className="btn btn-block">
//                           Submit
//                         </button>
//                       </div>
//                     </form>
//                   </section>
//                 </div>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// export default Login;

import React, { useEffect, useState } from "react";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  LockOutlined,
  EmailOutlined,
  ArrowForward,
} from "@mui/icons-material";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Logo from "components/Logo";
import AuthBackground from "assets/images/auth/AuthBackground";
import { login } from "../../features/auth/authSlice";

// ============================================================
// THEME COLORS
// ============================================================

const ORANGE = "#f97316";
const ORANGE_DARK = "#ea580c";
const ORANGE_LIGHT = "#fb923c";

function Login() {
  const [formData, setFormData] = useState({
    personal_email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { personal_email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    user,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.auth);

  // ============================================================
  // REDIRECT AFTER LOGIN
  // ============================================================

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/");
    }
  }, [user, isSuccess, navigate]);

  // ============================================================
  // INPUT CHANGE
  // ============================================================

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // ============================================================
  // LOGIN
  // ============================================================

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(
      login({
        personal_email,
        password,
      })
    );
  };

  return (
    <>
      <CssBaseline />

      {/* ======================================================
          LOADING
      ======================================================= */}

      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 9999,
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(0, 0, 0, 0.45)",
        }}
        open={isLoading}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CircularProgress
            size={34}
            thickness={4}
            sx={{
              color: ORANGE,
            }}
          />

          <Typography
            sx={{
              color: "#fff",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Signing you in...
          </Typography>
        </Box>
      </Backdrop>

      {/* ======================================================
          PAGE
      ======================================================= */}

      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#f8fafc",

          // Subtle orange glow
          "&::before": {
            content: '""',
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: ORANGE,
            opacity: 0.04,
            filter: "blur(80px)",
            top: -200,
            right: -150,
          },

          "&::after": {
            content: '""',
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: ORANGE,
            opacity: 0.035,
            filter: "blur(80px)",
            bottom: -200,
            left: -150,
          },
        }}
      >
        {/* Existing Auth Background */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            opacity: 0.12,
            pointerEvents: "none",
          }}
        >
          <AuthBackground />
        </Box>

        <Container
          maxWidth={false}
          disableGutters
          sx={{
            position: "relative",
            zIndex: 1,

            minHeight: "100vh",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            px: {
              xs: 2,
              sm: 3,
              md: 5,
            },

            py: {
              xs: 3,
              md: 5,
            },
          }}
        >
          {/* ==================================================
              LOGIN CARD
          =================================================== */}

          <Paper
            elevation={0}
            sx={{
              width: "100%",
              maxWidth: 1100,

              overflow: "hidden",

              borderRadius: {
                xs: 3,
                md: 4,
              },

              border: "1px solid rgba(15, 23, 42, 0.06)",

              boxShadow:
                "0 25px 70px rgba(15, 23, 42, 0.12)",

              backgroundColor: "#fff",
            }}
          >
            <Grid
              container
              sx={{
                minHeight: {
                  xs: "auto",
                  md: 620,
                },
              }}
            >
              {/* ==================================================
                  LEFT SIDE
              =================================================== */}

              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: {
                    xs: "none",
                    md: "flex",
                  },

                  position: "relative",

                  overflow: "hidden",

                  color: "#fff",

                  background: `linear-gradient(
                    145deg,
                    ${ORANGE_DARK} 0%,
                    ${ORANGE} 55%,
                    ${ORANGE_LIGHT} 100%
                  )`,
                }}
              >
                {/* Decorative circle 1 */}

                <Box
                  sx={{
                    position: "absolute",

                    width: 420,
                    height: 420,

                    borderRadius: "50%",

                    backgroundColor:
                      "rgba(255,255,255,0.08)",

                    top: -190,
                    right: -170,
                  }}
                />

                {/* Decorative circle 2 */}

                <Box
                  sx={{
                    position: "absolute",

                    width: 300,
                    height: 300,

                    borderRadius: "50%",

                    border:
                      "1px solid rgba(255,255,255,0.12)",

                    bottom: -150,
                    left: -130,
                  }}
                />

                {/* Decorative circle 3 */}

                <Box
                  sx={{
                    position: "absolute",

                    width: 160,
                    height: 160,

                    borderRadius: "50%",

                    backgroundColor:
                      "rgba(255,255,255,0.06)",

                    bottom: 80,
                    right: 80,
                  }}
                />

                {/* Content */}

                <Box
                  sx={{
                    position: "relative",

                    zIndex: 2,

                    width: "100%",

                    p: {
                      md: 5,
                      lg: 6,
                    },

                    display: "flex",

                    flexDirection: "column",

                    justifyContent: "space-between",
                  }}
                >
                  {/* Logo */}

                  <Box
                    sx={{
                      width: "fit-content",

                      // If your logo is dark,
                      // make it white.
                      filter: "brightness(0) invert(1)",
                    }}
                  >
                    <Logo />
                  </Box>

                  {/* Main Content */}

                  <Box
                    sx={{
                      maxWidth: 430,

                      mt: {
                        md: 8,
                        lg: 10,
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 13,

                        fontWeight: 700,

                        letterSpacing: 1.8,

                        textTransform: "uppercase",

                        color:
                          "rgba(255,255,255,0.80)",

                        mb: 2,
                      }}
                    >
                      Welcome Back
                    </Typography>

                    <Typography
                      component="h1"
                      sx={{
                        fontSize: {
                          md: 36,
                          lg: 44,
                        },

                        lineHeight: 1.15,

                        fontWeight: 800,

                        letterSpacing: "-1px",

                        mb: 3,
                      }}
                    >
                      Manage your work.
                      <br />

                      <Box
                        component="span"
                        sx={{
                          color:
                            "rgba(255,255,255,0.80)",
                        }}
                      >
                        Make an impact.
                      </Box>
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 15,

                        lineHeight: 1.8,

                        color:
                          "rgba(255,255,255,0.78)",

                        maxWidth: 390,
                      }}
                    >
                      Sign in to access your dashboard,
                      manage your tasks and continue
                      where you left off.
                    </Typography>
                  </Box>

                  {/* Bottom */}

                  <Box
                    sx={{
                      mt: 6,

                      display: "flex",

                      alignItems: "center",

                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        backgroundColor:
                          "rgba(255,255,255,0.8)",
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: 12,

                        color:
                          "rgba(255,255,255,0.65)",
                      }}
                    >
                      Secure access • Your account is protected
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* ==================================================
                  RIGHT SIDE
              =================================================== */}

              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

                  backgroundColor: "#fff",
                }}
              >
                <Box
                  sx={{
                    width: "100%",

                    maxWidth: 430,

                    px: {
                      xs: 3,
                      sm: 5,
                      md: 6,
                    },

                    py: {
                      xs: 5,
                      md: 6,
                    },
                  }}
                >
                  {/* ==================================================
                      MOBILE LOGO
                  =================================================== */}

                  <Box
                    sx={{
                      display: {
                        xs: "block",
                        md: "none",
                      },

                      mb: 5,
                    }}
                  >
                    <Logo />
                  </Box>

                  {/* ==================================================
                      HEADER
                  =================================================== */}

                  <Box sx={{ mb: 4 }}>
                    <Typography
                      component="h2"
                      sx={{
                        fontSize: {
                          xs: 28,
                          md: 32,
                        },

                        fontWeight: 800,

                        color: "#0f172a",

                        letterSpacing: "-0.7px",

                        mb: 1,
                      }}
                    >
                      Welcome back
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 14,

                        color: "#64748b",

                        lineHeight: 1.7,
                      }}
                    >
                      Enter your credentials to access
                      your account.
                    </Typography>
                  </Box>

                  {/* ==================================================
                      ERROR
                  =================================================== */}

                  {isError && (
                    <Alert
                      severity="error"
                      sx={{
                        mb: 3,

                        borderRadius: 2,

                        fontSize: 13,
                      }}
                    >
                      {message ||
                        "Unable to sign in. Please try again."}
                    </Alert>
                  )}

                  {/* ==================================================
                      FORM
                  =================================================== */}

                  <Box
                    component="form"
                    onSubmit={onSubmit}
                    noValidate
                  >
                    {/* EMAIL */}

                    <TextField
                      fullWidth
                      label="Email address"
                      type="email"
                      name="personal_email"
                      value={personal_email}
                      onChange={onChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailOutlined
                              sx={{
                                color: "#94a3b8",
                                fontSize: 20,
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        mb: 2.5,

                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2.5,

                          backgroundColor: "#f8fafc",

                          transition:
                            "all 0.2s ease",

                          "&:hover": {
                            backgroundColor: "#fff",

                            "& .MuiOutlinedInput-notchedOutline":
                              {
                                borderColor:
                                  "#cbd5e1",
                              },
                          },

                          "&.Mui-focused": {
                            backgroundColor: "#fff",

                            boxShadow: `0 0 0 4px ${ORANGE}1A`,
                          },

                          "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: ORANGE,
                              borderWidth: 1.5,
                            },
                        },

                        "& .MuiInputLabel-root.Mui-focused":
                          {
                            color: ORANGE,
                          },
                      }}
                    />

                    {/* PASSWORD */}

                    <TextField
                      fullWidth
                      label="Password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      value={password}
                      onChange={onChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlined
                              sx={{
                                color: "#94a3b8",
                                fontSize: 20,
                              }}
                            />
                          </InputAdornment>
                        ),

                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowPassword(
                                  (prev) => !prev
                                )
                              }
                              edge="end"
                              aria-label={
                                showPassword
                                  ? "Hide password"
                                  : "Show password"
                              }
                              sx={{
                                color: "#64748b",

                                "&:hover": {
                                  color: ORANGE,
                                  backgroundColor:
                                    `${ORANGE}0D`,
                                },
                              }}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        mb: 1.5,

                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2.5,

                          backgroundColor: "#f8fafc",

                          transition:
                            "all 0.2s ease",

                          "&:hover": {
                            backgroundColor: "#fff",

                            "& .MuiOutlinedInput-notchedOutline":
                              {
                                borderColor:
                                  "#cbd5e1",
                              },
                          },

                          "&.Mui-focused": {
                            backgroundColor: "#fff",

                            boxShadow: `0 0 0 4px ${ORANGE}1A`,
                          },

                          "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: ORANGE,
                              borderWidth: 1.5,
                            },
                        },

                        "& .MuiInputLabel-root.Mui-focused":
                          {
                            color: ORANGE,
                          },
                      }}
                    />

                    {/* ==================================================
                        FORGOT PASSWORD
                    =================================================== */}

                    <Box
                      sx={{
                        display: "flex",

                        justifyContent: "flex-end",

                        mb: 3,
                      }}
                    >
                      <Button
                        type="button"
                        variant="text"
                        sx={{
                          textTransform: "none",

                          fontSize: 13,

                          fontWeight: 600,

                          color: ORANGE,

                          minWidth: "auto",

                          p: 0,

                          "&:hover": {
                            backgroundColor:
                              `${ORANGE}0D`,
                          },
                        }}
                      >
                        Forgot password?
                      </Button>
                    </Box>

                    {/* ==================================================
                        LOGIN BUTTON
                    =================================================== */}

                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      disabled={isLoading}
                      endIcon={<ArrowForward />}
                      sx={{
                        height: 54,

                        borderRadius: 2.5,

                        textTransform: "none",

                        fontSize: 15,

                        fontWeight: 700,

                        color: "#fff",

                        background: `linear-gradient(
                          135deg,
                          ${ORANGE_DARK},
                          ${ORANGE}
                        )`,

                        boxShadow: `0 10px 25px ${ORANGE}40`,

                        transition:
                          "all 0.2s ease",

                        "&:hover": {
                          background: `linear-gradient(
                            135deg,
                            #c2410c,
                            ${ORANGE_DARK}
                          )`,

                          boxShadow: `0 14px 30px ${ORANGE}50`,

                          transform:
                            "translateY(-1px)",
                        },

                        "&:active": {
                          transform:
                            "translateY(0)",
                        },

                        "&.Mui-disabled": {
                          background:
                            ORANGE,

                          color: "#fff",

                          opacity: 0.65,
                        },
                      }}
                    >
                      Sign in
                    </Button>
                  </Box>

                  {/* ==================================================
                      FOOTER
                  =================================================== */}

                  <Typography
                    sx={{
                      mt: 5,

                      textAlign: "center",

                      fontSize: 12,

                      color: "#94a3b8",
                    }}
                  >
                    © {new Date().getFullYear()} Fotinos IT Solutions
                    Company. All rights reserved.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default Login;