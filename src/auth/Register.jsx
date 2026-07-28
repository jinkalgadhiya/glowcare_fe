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
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import registerImg from "../assets/registerImg.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, addUser } from "../database/userService";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      setNameError("name should be contain 15 latters");
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

    const users = await getUsers();

    const existingUser = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );

    if (existingUser) {
      setEmailError("Email already exists. Please use a different email.");
      return;
    }

    await addUser({
      id: crypto.randomUUID(),
      name,
      email,
      contact,
      password,
    });

    navigate("/login");
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

              <TextField
                variant="standard"
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError !== ""}
                helperText={nameError}
              />

              <TextField
                variant="standard"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError !== ""}
                helperText={emailError}
              />

              <TextField
                variant="standard"
                label="Contact Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                error={contactError !== ""}
                helperText={contactError}
              />

              <TextField
                variant="standard"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError !== ""}
                helperText={passwordError}
              />

              <TextField
                variant="standard"
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
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
