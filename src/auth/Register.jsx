import React from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Button,
  Link,
  Stack,
} from "@mui/material";

import registerImg from "../assets/registerImg.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

// Common TextField
import CustomTextField from "../components/common/CustomTextField";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactError, setContactError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    setNameError("");
    setEmailError("");
    setContactError("");
    setPasswordError("");
    setConfirmPasswordError("");

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&]).{8,}$/;

    if (!name.trim()) {
      setNameError("Please enter your name");
      return;
    } else if (name.length > 15) {
      setNameError("Name should contain maximum 15 letters");
      return;
    }

    if (!email.trim()) {
      setEmailError("Please enter your email address");
      return;
    } else if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!contact.trim()) {
      setContactError("Please enter your contact number");
      return;
    } else if (contact.length !== 10) {
      setContactError("Contact number must be 10 digits");
      return;
    }

    if (!password.trim()) {
      setPasswordError("Please enter your password");
      return;
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and include uppercase letter, number, special character",
      );
      return;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Please confirm your password");
      return;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    try {
      const response = await api.post("/users/add", {
        fullName: name.trim(),
        email: email.trim(),
        contactNumber: contact.trim(),
        password,
      });

      if (response.data.status === "success") {
        navigate("/login");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setEmailError("Email or contact number already exists.");
      } else {
        console.error("Registration error:", error);

        setEmailError(
          error.response?.data?.message ||
            "Registration failed. Please try again.",
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
        <Grid container sx={{ height: "100%" }}>
          {/* LEFT IMAGE */}
          <Grid size={7}>
            <Box
              component="img"
              src={registerImg}
              alt="Register Image"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Grid>

          {/* RIGHT FORM */}
          <Grid
            size={5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack
              spacing={2}
              sx={{
                width: "70%",
              }}
            >
              <Typography variant="h4" fontWeight="bold" textAlign="center">
                GlowCare
              </Typography>

              <Typography variant="h4" fontWeight="bold" textAlign="center">
                Create Account
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
              >
                Join GlowCare and discover your beauty essentials.
              </Typography>

              {/* Full Name */}
              <CustomTextField
                variant="standard"
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError !== ""}
                helperText={nameError}
              />

              {/* Email */}
              <CustomTextField
                variant="standard"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError !== ""}
                helperText={emailError}
              />

              {/* Contact */}
              <CustomTextField
                variant="standard"
                label="Contact Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                error={contactError !== ""}
                helperText={contactError}
              />

              {/* Password */}
              <CustomTextField
                variant="standard"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError !== ""}
                helperText={passwordError}
              />

              {/* Confirm Password */}
              <CustomTextField
                variant="standard"
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={confirmPasswordError !== ""}
                helperText={confirmPasswordError}
              />

              <Button variant="contained" size="large" onClick={handleRegister}>
                Create Account
              </Button>

              <Typography textAlign="center">
                Already have an account?{" "}
                <Link
                  component="button"
                  underline="none"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </Link>
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Register;
