import React from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
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
import { useState } from "react";
import { Users } from "../data/Users";
import { useNavigate } from "react-router-dom";
import ForgetPassword from "./ForgetPassword";
import Logo from "../assets/LogoDark.png";
import { getUsers } from "../database/userService";
import { login } from "./AuthService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setEmailError("");
    setPassError("");
    setLoginError("");

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&]).{8,}$/;

    if (!email.trim()) {
      setEmailError("Please enter your email address");
      return;
    } else if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!password.trim()) {
      setPassError("Please enter your password");
      return;
    } else if (!passwordRegex.test(password)) {
      setPassError(
        "Password must be at least 8 characters long and include uppercase letter, number, special character",
      );
      return;
    }

    const users = await getUsers();

    const foundUser = Users.find(
      (user) =>
        user.email.toLowerCase() === email.trim().toLowerCase() &&
        user.password === password,
    );

    const registeredUser = users.find(
      (user) =>
        user.email.toLowerCase() === email.trim().toLowerCase() &&
        user.password === password,
    );

    if (!foundUser && !registeredUser) {
      setLoginError("Invalid email or password");
      return;
    }

    const loggedInUser = foundUser || registeredUser;

    login(loggedInUser);
    navigate("/");
  };

  const [openForgotPassword, setOpenForgotPassword] = useState(false);

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
        <Grid container sx={{ height: "100%" }}>
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
                    mt: -2, // adjust between -1 and -3 if needed
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

              <TextField
                variant="standard"
                label="Email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError !== ""}
                helperText={emailError}
              />

              <TextField
                variant="standard"
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

              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ alignSelf: "flex-end" }}
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

              {loginError && <Alert severity="error">{loginError}</Alert>}

              <Button variant="contained" size="large" onClick={handleLogin}>
                Sign In
              </Button>

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
      <ForgetPassword
        open={openForgotPassword}
        handleClose={() => setOpenForgotPassword(false)}
        type="user"
      />
    </Box>
  );
}

export default Login;
