import React from "react";
import { Box, Divider, Typography } from "@mui/material";

const PriceDetails = ({
  subtotal = 0,
  discount = 0,
  appliedCoupon = null,
  delivery = "standard",
}) => {
  // =====================================================
  // SHIPPING BASED ON DELIVERY METHOD
  // =====================================================

  const shipping = delivery === "express" ? 99 : 0;

  // =====================================================
  // COUPON DISCOUNT
  // =====================================================

  const couponDiscount = Number(discount) || 0;

  // =====================================================
  // TAXABLE AMOUNT
  // =====================================================

  const taxableAmount = Math.max(
    subtotal - couponDiscount,
    0
  );

  // =====================================================
  // GST
  // =====================================================

  const gst = Math.round(taxableAmount * 0.05);

  // =====================================================
  // FINAL TOTAL
  // =====================================================

  const total =
    taxableAmount +
    shipping +
    gst;

  // =====================================================
  // ROW
  // =====================================================

  const Row = ({
    label,
    value,
    color = "#1E2F2B",
    bold = false,
  }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography
        sx={{
          color: "#666",
          fontSize: 15,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontWeight: bold ? 700 : 600,
          color,
          fontSize: bold ? 18 : 15,
        }}
      >
        {value}
      </Typography>
    </Box>
  );

  return (
    <>
      <Typography
        sx={{
          fontSize: 22,
          fontWeight: 600,
          color: "#1E2F2B",
          mb: 3,
        }}
      >
        Price Details
      </Typography>

      {/* SUBTOTAL */}

      <Row
        label="Subtotal"
        value={`₹${subtotal.toLocaleString("en-IN")}`}
      />

      {/* SHIPPING */}

      <Row
        label={
          delivery === "express"
            ? "Express Delivery"
            : "Standard Delivery"
        }
        value={
          shipping === 0
            ? "FREE"
            : `₹${shipping.toLocaleString("en-IN")}`
        }
        color={
          shipping === 0
            ? "#2E7D32"
            : "#1E2F2B"
        }
      />

      {/* DISCOUNT */}

      <Row
        label={
          appliedCoupon
            ? `Discount (${appliedCoupon.code})`
            : "Discount"
        }
        value={`-₹${couponDiscount.toLocaleString(
          "en-IN"
        )}`}
        color="#2E7D32"
      />

      {/* GST */}

      <Row
        label="GST (5%)"
        value={`₹${gst.toLocaleString("en-IN")}`}
      />

      <Divider
        sx={{
          my: 2,
          borderColor: "#E5DED5",
        }}
      />

      {/* TOTAL */}

      <Row
        label="Total"
        value={`₹${total.toLocaleString("en-IN")}`}
        bold
      />
    </>
  );
};

export default PriceDetails;