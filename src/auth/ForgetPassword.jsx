import React, { useState } from "react";
import {
  Dialog,
  TextField,
  Button,
  Grid,
  Box,
  Stack,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Logo from "../assets/logoDark.png";
import OtpVerification from "./OTPVerification";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Users } from "../data/Users";
import { getUsers, updateUser } from "../database/userService";

const ForgetPassword = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isVerified, setIsVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleVerifyEmail = async () => {
    setEmailNotFound("");

    setErrors((prev) => ({
      ...prev,
      email: "",
    }));

    if (!formData.email.trim()) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter your email address",
      }));
      return;
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      return;
    }

    const registeredUsers = await getUsers();

    // Check Static User
    const staticUser = Users.find(
      (user) =>
        user.email.toLowerCase() === formData.email.trim().toLowerCase(),
    );

    // Check Registered User
    const registeredUser = registeredUsers.find(
      (user) =>
        user.email.toLowerCase() === formData.email.trim().toLowerCase(),
    );

    if (!staticUser && !registeredUser) {
      setEmailNotFound("Email not found");
      return;
    }

    setOpenOtp(true);
  };

  const handleResetPassword = async () => {
    setErrors({
      ...errors,
      newPassword: "",
      confirmPassword: "",
    });

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&]).{8,}$/;

    if (!formData.newPassword.trim()) {
      setErrors({
        ...errors,
        newPassword: "Please enter your password",
      });
      return;
    }

    if (!passwordRegex.test(formData.newPassword)) {
      setErrors({
        ...errors,
        newPassword:
          "Password must contain uppercase, number and special character",
      });
      return;
    }

    if (!formData.confirmPassword.trim()) {
      setErrors({
        ...errors,
        confirmPassword: "Please confirm your password",
      });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: "Passwords do not match",
      });
      return;
    }

    // Registered Users
    const users = await getUsers();

    const registeredUser = users.find(
      (user) =>
        user.email.toLowerCase() === formData.email.trim().toLowerCase(),
    );

    if (registeredUser) {
      await updateUser({
        ...registeredUser,
        password: formData.newPassword,
      });
    }

    setOpenSuccess(true);
  };

  const resetDialog = () => {
    setFormData({
      email: "",
      newPassword: "",
      confirmPassword: "",
    });

    setErrors({
      email: "",
      newPassword: "",
      confirmPassword: "",
    });

    setIsVerified(false);

    handleClose();
  };

  const handleSuccessClose = () => {
    setOpenSuccess(false);
    resetDialog();
  };

  return (
    <>
      <Dialog open={open} onClose={resetDialog} fullWidth maxWidth="md">
        <Grid container sx={{ minHeight: "500px" }}>
          <Grid
            size={5}
            sx={{
              backgroundColor: "#f7f4ef",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box textAlign="center">
              <Box
                component="img"
                src={Logo}
                sx={{
                  width: 250,
                }}
              />
              <Typography variant="h4" fontWeight="bold">
                Welcome Back
              </Typography>
              <Typography color="text.secondary">Beauty Begins Here</Typography>
            </Box>
          </Grid>

          <Grid
            size={7}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!isVerified ? (
              <Stack
                spacing={4}
                sx={{
                  width: "80%",
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  Forgot Password
                </Typography>
                <Typography color="text.secondary">
                  Enter your registered email address and we'll help you reset
                  your password.
                </Typography>
                <TextField
                  variant="standard"
                  label="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  error={errors.email !== ""}
                  helperText={errors.email}
                />

                {emailNotFound && (
                  <Alert severity="error">{emailNotFound}</Alert>
                )}
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleVerifyEmail}
                >
                  Verify Email
                </Button>
                <Typography
                  variant="body2"
                  textAlign="center"
                  sx={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "text.secondary",
                  }}
                  onClick={handleClose}
                >
                  Back to Login
                </Typography>
              </Stack>
            ) : (
              <Stack
                spacing={4}
                sx={{
                  width: "80%",
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  Reset Password
                </Typography>

                <Typography color="text.secondary">
                  Enter your new password.
                </Typography>

                <TextField
                  variant="standard"
                  label="New Password"
                  type={showPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      newPassword: e.target.value,
                    })
                  }
                  error={errors.newPassword !== ""}
                  helperText={errors.newPassword}
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

                <TextField
                  variant="standard"
                  label="Confirm Password"
                  type={showConPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  error={errors.confirmPassword !== ""}
                  helperText={errors.confirmPassword}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConPassword(!showConPassword)}
                          >
                            {showConPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <Button
                  variant="contained"
                  size="large"
                  onClick={handleResetPassword}
                >
                  Change Password
                </Button>

                <Typography
                  variant="body2"
                  textAlign="center"
                  sx={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "text.secondary",
                  }}
                  onClick={resetDialog}
                >
                  Back to Login
                </Typography>
              </Stack>
            )}
          </Grid>
        </Grid>
      </Dialog>
      <OtpVerification
        open={openOtp}
        handleClose={() => setOpenOtp(false)}
        onOtpVerified={() => {
          setIsVerified(true);
          setOpenOtp(false);
        }}
      />
      <Dialog
        open={openSuccess}
        onClose={handleSuccessClose}
        maxWidth="xs"
        fullWidth
      >
        <Stack
          spacing={3}
          sx={{
            p: 4,
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <CheckCircleIcon
            color="primary"
            sx={{
              fontSize: 80,
            }}
          />

          <Typography variant="h5" fontWeight="bold">
            Password Changed!
          </Typography>

          <Typography color="text.secondary">
            Your password has been changed successfully. Please sign in with
            your new password.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSuccessClose}
            sx={{
              width: "100%",
            }}
          >
            Back to Login
          </Button>
        </Stack>
      </Dialog>
    </>
  );
};

export default ForgetPassword;
