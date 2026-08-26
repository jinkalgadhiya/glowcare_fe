import React, { useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Button,
  Link,
  Stack,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import loginImg from "../assets/loginImg.png";
import { useNavigate } from "react-router-dom";

import ForgetPassword from "./ForgetPassword";
import Logo from "../assets/LogoDark.png";

import { login } from "./AuthService";
import api from "../api/axios";

// Common TextField
import CustomTextField from "../components/common/CustomTextField";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [loginError, setLoginError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [openForgotPassword, setOpenForgotPassword] = useState(false);

  const navigate = useNavigate();

  // LOGIN

  const handleLogin = async () => {
    setEmailError("");
    setPassError("");
    setLoginError("");

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&]).{8,}$/;

    // Email Validation
    if (!email.trim()) {
      setEmailError("Please enter your email address");
      return;
    } else if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Password Validation
    if (!password.trim()) {
      setPassError("Please enter your password");
      return;
    } else if (!passwordRegex.test(password)) {
      setPassError(
        "Password must be at least 8 characters long and include uppercase letter, number, special character",
      );
      return;
    }

    try {
      const response = await api.post("/login", {
        email: email.trim(),
        password,
      });

      if (response.data.status === "success") {
        const loggedInUser = response.data.data;
        const token = response.data.token;

        login(loggedInUser, token);

        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response?.status === 401) {
        setLoginError("Invalid email or password");
      } else if (error.response?.status === 403) {
        setLoginError(
          error.response?.data?.message || "Your account is inactive",
        );
      } else {
        setLoginError(
          error.response?.data?.message ||
            "Something went wrong. Please try again.",
        );
      }
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Grid
          container
          sx={{
            height: "100%",
          }}
        >
          {/* LEFT SIDE IMAGE */}

          <Grid size={7}>
            <Box
              component="img"
              src={loginImg}
              alt="Login Image"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Grid>

          {/* RIGHT SIDE LOGIN FORM */}

          <Grid
            size={5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack
              spacing={3}
              sx={{
                width: "70%",
              }}
            >
              {/* Logo + Welcome */}

              <Box textAlign="center">
                <Box
                  component="img"
                  src={Logo}
                  alt="GlowCare Logo"
                  sx={{
                    width: 290,
                    objectFit: "contain",
                    ml: "90px",
                  }}
                />

                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{
                    mt: -2,
                  }}
                >
                  Welcome Back!
                </Typography>
              </Box>

              <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
              >
                Sign in to continue shopping with GlowCare.
              </Typography>

              {/* EMAIL */}

              <CustomTextField
                label="Email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError !== ""}
                helperText={emailError}
              />

              {/* PASSWORD */}

              <CustomTextField
                label="Password"
                placeholder="Enter Your Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passError !== ""}
                helperText={passError}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {/* FORGOT PASSWORD */}

              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  alignSelf: "flex-end",
                }}
              >
                Forgot your password?{" "}
                <Link
                  component="button"
                  underline="none"
                  onClick={() => setOpenForgotPassword(true)}
                >
                  Reset it
                </Link>
              </Typography>

              {/* LOGIN ERROR */}

              {loginError && <Alert severity="error">{loginError}</Alert>}

              {/* SIGN IN BUTTON */}

              <Button variant="contained" size="large" onClick={handleLogin}>
                Sign In
              </Button>

              {/* REGISTER */}

              <Typography textAlign="center">
                Don't have an account?{" "}
                <Link
                  component="button"
                  underline="none"
                  onClick={() => navigate("/Register")}
                >
                  Sign Up
                </Link>
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* FORGOT PASSWORD */}

      <ForgetPassword
        open={openForgotPassword}
        handleClose={() => setOpenForgotPassword(false)}
        type="user"
      />
    </Box>
  );
}

export default Login;
