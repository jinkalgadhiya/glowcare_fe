import React from "react";

import {
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const CouponBox = ({
  couponCode,
  setCouponCode,
  appliedCoupon,
  couponError,
  loading,
  onApply,
  onRemove,
}) => {
  // =====================================================
  // REMOVE COUPON
  // =====================================================

  const handleRemove = () => {
    // Remove applied coupon
    onRemove();

    // Clear input field
    setCouponCode("");
  };

  // =====================================================
  // COUPON APPLIED VIEW
  // =====================================================

  if (appliedCoupon) {
    return (
      <Box>
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 600,
            color: "#1E2F2B",
            mb: 2,
          }}
        >
          Coupon
        </Typography>

        <Box
          sx={{
            p: 2.5,
            borderRadius: 3,
            border: "1px solid #C7D8CC",
            backgroundColor: "#F3F8F4",
          }}
        >
          {/* TOP */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#2F5D45",
                }}
              >
                ✓ Coupon Applied
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: 1,
                  color: "#1E2F2B",
                }}
              >
                {appliedCoupon.code}
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  fontSize: 14,
                  color: "#777168",
                }}
              >
                You saved ₹
                {Number(
                  appliedCoupon.discountAmount || 0
                ).toLocaleString("en-IN")}
              </Typography>
            </Box>

            <Button
              onClick={handleRemove}
              sx={{
                minWidth: "auto",
                textTransform: "none",
                fontSize: 14,
                fontWeight: 600,
                color: "#8A5C55",

                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#7A4038",
                },
              }}
            >
              Remove
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  // =====================================================
  // COUPON INPUT VIEW
  // =====================================================

  return (
    <Box>
      <Typography
        sx={{
          fontSize: 24,
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
          alignItems: "flex-start",
        }}
      >
        <TextField
          fullWidth
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => {
            setCouponCode(
              e.target.value.toUpperCase()
            );
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onApply(couponCode);
            }
          }}
          error={!!couponError}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 52,
              borderRadius: "12px",
            },
          }}
        />

        <Button
          onClick={() =>
            onApply(couponCode)
          }
          disabled={loading}
          variant="contained"
          sx={{
            minWidth: 115,
            height: 52,
            borderRadius: "12px",
            textTransform: "none",
            fontSize: 15,
            fontWeight: 600,

            backgroundColor: "#1E2F2B",

            "&:hover": {
              backgroundColor: "#294039",
            },

            "&.Mui-disabled": {
              backgroundColor: "#AAB5B0",
              color: "#FFFFFF",
            },
          }}
        >
          {loading
            ? "Applying..."
            : "Apply"}
        </Button>
      </Box>

      {/* ERROR */}

      {couponError && (
        <Typography
          sx={{
            mt: 1,
            fontSize: 13,
            color: "#C62828",
          }}
        >
          {couponError}
        </Typography>
      )}
    </Box>
  );
};

export default CouponBox;