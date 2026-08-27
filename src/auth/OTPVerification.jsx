import React, { useState } from "react";
import { Dialog, Typography, Stack, Button } from "@mui/material";

import api from "../api/axios";
import CustomTextField from "../components/common/CustomTextField";

const OtpVerification = ({ open, handleClose, onOtpVerified, email, type }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [otpError, setOtpError] = useState("");
  const [loading, setLoading] = useState(false);

  // ======================================================
  // OTP CHANGE
  // ======================================================

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);
  };

  // ======================================================
  // VERIFY OTP
  // ======================================================

  const handleVerifyOtp = async () => {
    setOtpError("");

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setOtpError("Please enter the 6-digit OTP");
      return;
    }

    if (!email) {
      setOtpError("Email is missing. Please try again.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/verify-otp", {
        email: email.trim(),
        otp: enteredOtp,
        accountType: type,
      });

      if (response.data.status === "success") {
        setOtp(["", "", "", "", "", ""]);

        onOtpVerified();
      }
    } catch (error) {
      console.error("OTP verification error:", error);

      setOtpError(
        error.response?.data?.message || "Invalid OTP. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Stack
        spacing={4}
        sx={{
          p: 5,
        }}
      >
        {/* ======================================================
            TITLE
        ====================================================== */}

        <Typography variant="h4" fontWeight="bold" textAlign="center">
          Verify OTP
        </Typography>

        <Typography color="text.secondary" textAlign="center">
          Enter the 6-digit OTP
        </Typography>

        {/* ======================================================
            OTP INPUTS
        ====================================================== */}

        <Stack direction="row" spacing={2} justifyContent="center">
          {otp.map((digit, index) => (
            <CustomTextField
              key={index}
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, index)}
              inputProps={{
                maxLength: 1,
                inputMode: "numeric",
              }}
              sx={{
                width: 70,

                "& .MuiOutlinedInput-root": {
                  height: 70,
                  borderRadius: 2,
                },

                "& .MuiOutlinedInput-input": {
                  textAlign: "center",
                  fontSize: 28,
                  fontWeight: 500,
                  padding: 0,
                  height: "70px",
                  boxSizing: "border-box",
                },

                "& .MuiInputLabel-root": {
                  display: "none",
                },

                "& .MuiFormHelperText-root": {
                  display: "none",
                },
              }}
            />
          ))}
        </Stack>

        {/* ======================================================
            ERROR
        ====================================================== */}

        {otpError && (
          <Typography color="error" textAlign="center">
            {otpError}
          </Typography>
        )}

        {/* ======================================================
            VERIFY BUTTON
        ====================================================== */}

        <Button
          variant="contained"
          size="large"
          onClick={handleVerifyOtp}
          disabled={loading}
          sx={{
            backgroundColor: "#b18044",

            "&:hover": {
              backgroundColor: "#966b38",
            },
          }}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>

        {/* ======================================================
            BACK BUTTON
        ====================================================== */}

        <Button
          onClick={handleClose}
          sx={{
            color: "#b18044",
          }}
        >
          Back
        </Button>
      </Stack>
    </Dialog>
  );
};

export default OtpVerification;
