import React, { useState } from "react";
import { Dialog, Typography, Stack, TextField, Button } from "@mui/material";

const OTP = "123456";

const OtpVerification = ({ open, handleClose, onOtpVerified }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerifyOtp = () => {
    setOtpError("");

    const enteredOtp = otp.join("");

    if (enteredOtp !== OTP) {
      setOtpError("Invalid OTP");
      return;
    }

    setOtp(["", "", "", "", "", ""]);
    onOtpVerified();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Stack spacing={4} sx={{ p: 5 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          Verify OTP
        </Typography>

        <Typography color="text.secondary" textAlign="center">
          Enter the 6-digit OTP
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center">
          {otp.map((digit, index) => (
            <TextField
              key={index}
              value={digit}
              onChange={(e) =>
                handleOtpChange(e.target.value, index)
              }
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: "center",
                  fontSize: "28px",
                  fontWeight: 500,
                  padding: 0,
                  height: "100%",
                },
              }}
              sx={{
                width: 70,
                height: 70,

                "& .MuiOutlinedInput-root": {
                  height: "70px",
                },

                "& .MuiOutlinedInput-input": {
                  textAlign: "center",
                  padding: 0,
                  height: "70px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxSizing: "border-box",
                },
              }}
            />
          ))}
        </Stack>

        {otpError && (
          <Typography color="error" textAlign="center">
            {otpError}
          </Typography>
        )}

        <Button
          variant="contained"
          size="large"
          onClick={handleVerifyOtp}
          sx={{ backgroundColor: "#b18044" }}
        >
          Verify OTP
        </Button>

        <Button onClick={handleClose} sx={{ color: "#b18044" }}>
          Back
        </Button>
      </Stack>
    </Dialog>
  );
};

export default OtpVerification;
