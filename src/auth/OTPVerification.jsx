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
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
        >
          Verify OTP
        </Typography>

        <Typography
          color="text.secondary"
          textAlign="center"
        >
          Enter the 6-digit OTP
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
        >
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
                  fontSize: "20px",
                },
              }}
              sx={{
                width: 55,
              }}
            />
          ))}
        </Stack>

        {otpError && (
          <Typography
            color="error"
            textAlign="center"
          >
            {otpError}
          </Typography>
        )}

        <Button
          variant="contained"
          size="large"
          onClick={handleVerifyOtp}
        >
          Verify OTP
        </Button>

        <Button onClick={handleClose}>
          Back
        </Button>
      </Stack>
    </Dialog>
  );
};

export default OtpVerification;