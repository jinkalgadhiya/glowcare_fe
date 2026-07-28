import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";

const CouponBox = () => {
  const [coupon, setCoupon] = useState("");
  const [message, setMessage] = useState("");

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();

    if (code === "WELCOME10") {
      setMessage("✅ Coupon applied successfully!");
    } else if (code === "") {
      setMessage("Please enter a coupon code.");
    } else {
      setMessage("❌ Invalid coupon code.");
    }
  };

  return (
    <Box>
      <Typography
        sx={{
          fontSize: 22,
          fontWeight: 600,
          color: "#1E2F2B",
          mb: 2,
        }}
      >
        Coupon
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Enter coupon code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={applyCoupon}
          sx={{
            px: 3,
            background: "#1E2F2B",
            textTransform: "none",
            borderRadius: 2,
            "&:hover": {
              background: "#16251F",
            },
          }}
        >
          Apply
        </Button>
      </Box>

      {message && (
        <Typography
          sx={{
            mt: 2,
            fontSize: 14,
            color: message.startsWith("✅") ? "green" : "red",
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default CouponBox;