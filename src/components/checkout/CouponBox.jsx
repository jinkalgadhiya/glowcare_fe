import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";

const CouponBox = ({
  appliedCoupon,
  couponError,
  loading,
  onApply,
  onRemove,
}) => {
  const [coupon, setCoupon] = useState("");

  // =====================================================
  // KEEP INPUT UPDATED AFTER COUPON IS APPLIED
  // =====================================================

  useEffect(() => {
    if (appliedCoupon?.code) {
      setCoupon(appliedCoupon.code);
    }
  }, [appliedCoupon]);

  // =====================================================
  // APPLY
  // =====================================================

  const handleApply = () => {
    onApply(coupon);
  };

  // =====================================================
  // ENTER KEY
  // =====================================================

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!loading && coupon.trim()) {
        handleApply();
      }
    }
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <Box>
      {/* =================================================
          TITLE
      ================================================= */}

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

      {/* =================================================
          APPLIED COUPON
      ================================================= */}

      {appliedCoupon ? (
        <Box
          sx={{
            border: "1px solid #D6E5DA",
            backgroundColor: "#F4F8F5",
            borderRadius: 2.5,
            p: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 14,
                  color: "#2F5D45",
                  fontWeight: 600,
                }}
              >
                ✓ Coupon Applied
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#1E2F2B",
                  letterSpacing: 1,
                }}
              >
                {appliedCoupon.code}
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 13,
                  color: "#777",
                }}
              >
                You saved ₹
                {Number(
                  appliedCoupon.discountAmount || 0
                ).toLocaleString("en-IN")}
              </Typography>
            </Box>

            <Button
              size="small"
              onClick={onRemove}
              sx={{
                textTransform: "none",
                color: "#7A4038",
                fontWeight: 600,

                "&:hover": {
                  backgroundColor: "#F7E9E6",
                },
              }}
            >
              Remove
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          {/* =================================================
              INPUT + APPLY
          ================================================= */}

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
              onChange={(e) =>
                setCoupon(e.target.value)
              }
              onKeyDown={handleKeyDown}
              disabled={loading}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,

                  "& fieldset": {
                    borderColor: "#D6D0C8",
                  },

                  "&:hover fieldset": {
                    borderColor: "#B8AEA2",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "#1E2F2B",
                  },
                },
              }}
            />

            <Button
              variant="contained"
              onClick={handleApply}
              disabled={
                loading || !coupon.trim()
              }
              sx={{
                minWidth: 95,
                px: 3,

                backgroundColor: "#1E2F2B",

                textTransform: "none",

                borderRadius: 2,

                fontWeight: 600,

                "&:hover": {
                  backgroundColor: "#16251F",
                },

                "&.Mui-disabled": {
                  backgroundColor: "#D6D6D6",
                  color: "#888",
                },
              }}
            >
              {loading
                ? "Checking..."
                : "Apply"}
            </Button>
          </Box>

          {/* =================================================
              ERROR
          ================================================= */}

          {couponError && (
            <Typography
              sx={{
                mt: 1.5,
                fontSize: 14,
                color: "#D32F2F",
              }}
            >
              ✕ {couponError}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default CouponBox;