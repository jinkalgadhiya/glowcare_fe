import React, { useState } from "react";
import {
  Dialog,
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

import api from "../api/axios";

// Custom common input component
import CustomTextField from "../components/common/CustomTextField";

const ForgetPassword = ({ open, handleClose, type = "user" }) => {
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

  // ======================================================
  // VERIFY EMAIL
  // ======================================================

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

    try {
      const response = await api.post("/send-otp", {
        email: formData.email.trim(),
        accountType: type,
      });

      if (response.data.status === "success") {
        setOpenOtp(true);
      }
    } catch (error) {
      console.error("Send OTP error:", error);

      setEmailNotFound(
        error.response?.data?.message ||
          "Unable to send OTP. Please try again.",
      );
    }
  };

  // ======================================================
  // RESET PASSWORD
  // ======================================================

  const handleResetPassword = async () => {
    setErrors((prev) => ({
      ...prev,
      newPassword: "",
      confirmPassword: "",
    }));

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&]).{8,}$/;

    if (!formData.newPassword.trim()) {
      setErrors((prev) => ({
        ...prev,
        newPassword: "Please enter your password",
      }));

      return;
    }

    if (!passwordRegex.test(formData.newPassword)) {
      setErrors((prev) => ({
        ...prev,
        newPassword:
          "Password must contain uppercase, number and special character",
      }));

      return;
    }

    if (!formData.confirmPassword.trim()) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Please confirm your password",
      }));

      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));

      return;
    }

    try {
      const response = await api.post("/reset-password", {
        email: formData.email.trim(),
        newPassword: formData.newPassword,
        accountType: type,
      });

      if (response.data.status === "success") {
        setOpenSuccess(true);
      }
    } catch (error) {
      console.error("Reset password error:", error);

      setErrors((prev) => ({
        ...prev,
        newPassword:
          error.response?.data?.message ||
          "Failed to reset password. Please try again.",
      }));
    }
  };

  // ======================================================
  // RESET DIALOG
  // ======================================================

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
    setOpenOtp(false);
    setEmailNotFound("");

    handleClose();
  };

  // ======================================================
  // SUCCESS CLOSE
  // ======================================================

  const handleSuccessClose = () => {
    setOpenSuccess(false);
    resetDialog();
  };

  return (
    <>
      {/* ======================================================
          FORGOT PASSWORD DIALOG
      ====================================================== */}

      <Dialog open={open} onClose={resetDialog} fullWidth maxWidth="md">
        <Grid container sx={{ minHeight: "500px" }}>
          {/* ======================================================
              LEFT SIDE
          ====================================================== */}

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

          {/* ======================================================
              RIGHT SIDE
          ====================================================== */}

          <Grid
            size={7}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!isVerified ? (
              /* ======================================================
                  VERIFY EMAIL
              ====================================================== */

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

                {/* EMAIL - CUSTOM TEXT FIELD */}

                <CustomTextField
                  label="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
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
                  sx={{
                    backgroundColor: "#ae7f45",

                    "&:hover": {
                      backgroundColor: "#966b38",
                    },
                  }}
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
              /* ======================================================
                  RESET PASSWORD
              ====================================================== */

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

                {/* NEW PASSWORD - CUSTOM TEXT FIELD */}

                <CustomTextField
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

                {/* CONFIRM PASSWORD - CUSTOM TEXT FIELD */}

                <CustomTextField
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
                  sx={{
                    backgroundColor: "#ae7f45",

                    "&:hover": {
                      backgroundColor: "#966b38",
                    },
                  }}
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

      {/* ======================================================
          OTP VERIFICATION
      ====================================================== */}

      <OtpVerification
        open={openOtp}
        handleClose={() => setOpenOtp(false)}
        email={formData.email}
        type={type}
        onOtpVerified={() => {
          setIsVerified(true);
          setOpenOtp(false);
        }}
      />

      {/* ======================================================
          SUCCESS DIALOG
      ====================================================== */}

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
            sx={{
              fontSize: 80,
              color: "#ae7f45",
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
              backgroundColor: "#ae7f45",

              "&:hover": {
                backgroundColor: "#966b38",
              },
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
