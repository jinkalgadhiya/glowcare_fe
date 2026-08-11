import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Logo from "../assets/LogoDark.png";
import ForgetPassword from "./ForgetPassword";
import { useNavigate } from "react-router-dom";
import { getAdmin } from "../database/adminService";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [loginError, setLoginError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [openForgotPassword, setOpenForgotPassword] = useState(false);

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
        "Password must be at least 8 characters long and include uppercase letter, number and special character",
      );
      return;
    }

    // Find Admin
    const admin = await getAdmin();

    console.log("===========");
    console.log("Admin From DB:", admin);
    console.log("DB Email:", admin?.email);
    console.log("DB Password:", admin?.password);
    console.log("Entered Email:", email);
    console.log("Entered Password:", password);
    console.log(
      "Email Match:",
      admin?.email?.toLowerCase() === email.trim().toLowerCase(),
    );
    console.log("Password Match:", admin?.password === password);
    console.log("===========");

    if (
      !admin ||
      admin.email.toLowerCase() !== email.trim().toLowerCase() ||
      admin.password !== password
    ) {
      setLoginError("Invalid admin email or password");
      return;
    }

    localStorage.setItem("admin", JSON.stringify(admin));

    navigate("/admin/dashboard");
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f2ed",
        p: 3,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "900px",
          height: "560px",
          display: "flex",
          overflow: "hidden",
          borderRadius: 4,
        }}
      >
        {/* Left Side */}
        <Box
          sx={{
            width: "42%",
            background: "linear-gradient(180deg, #C9B19C, #B89478)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            px: 5,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              mb: 3,
            }}
          >
            Welcome
          </Typography>

          <Typography
            sx={{
              lineHeight: 1.8,
              opacity: 0.9,
            }}
          >
            Manage products, categories,
            <br />
            customers and orders from
            <br />
            your GlowCare Admin Panel.
          </Typography>
        </Box>

        {/* Right Side */}
        <Box
          sx={{
            width: "58%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 5,
          }}
        >
          <Stack spacing={3} width="100%">
            <Box textAlign="center">
              <Box
                component="img"
                src={Logo}
                alt="GlowCare"
                sx={{
                  width: 150,
                  mb: 2,
                  ml: "70px",
                }}
              />

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  color: "#22352F",
                }}
              >
                Admin Login
              </Typography>
            </Box>

            <TextField
              label="Email"
              placeholder="Enter your email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError !== ""}
              helperText={emailError}
            />

            <TextField
              label="Password"
              placeholder="Enter your password"
              fullWidth
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

            <Box display="flex" justifyContent="flex-end">
              <Link
                component="button"
                underline="hover"
                onClick={() => setOpenForgotPassword(true)}
                sx={{ color: "#d29c5a"}}
              >
                Forgot Password?
              </Link>
            </Box>

            {loginError && <Alert severity="error">{loginError}</Alert>}

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleLogin}
              sx={{
                py: 1.5,
                borderRadius: 2,
                backgroundColor: "#9a6b32",

                "&:hover": {
                  backgroundColor: "#915e10",
                },
              }}
            >
              Login
            </Button>
          </Stack>
        </Box>
      </Paper>

      <ForgetPassword
        open={openForgotPassword}
        handleClose={() => setOpenForgotPassword(false)}
        type="admin"
      />
    </Box>
  );
}

export default AdminLogin;
