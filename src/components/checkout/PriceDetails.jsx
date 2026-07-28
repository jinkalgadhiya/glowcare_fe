import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const PriceDetails = () => {
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Static values (we'll make these dynamic later)
  const shipping = subtotal >= 999 ? 0 : 50;
  const discount = subtotal >= 1500 ? 100 : 0;
  const gst = Math.round(subtotal * 0.05);

  const total = subtotal + shipping + gst - discount;

  const Row = ({ label, value, color = "#1E2F2B", bold = false }) => (
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
          fontSize: 15,
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

      <Row label="Subtotal" value={`₹${subtotal}`} />

      <Row
        label="Shipping"
        value={shipping === 0 ? "FREE" : `₹${shipping}`}
        color={shipping === 0 ? "#2E7D32" : "#1E2F2B"}
      />

      <Row
        label="Discount"
        value={`-₹${discount}`}
        color="#2E7D32"
      />

      <Row
        label="GST (5%)"
        value={`₹${gst}`}
      />

      <Divider sx={{ my: 2 }} />

      <Row
        label="Total"
        value={`₹${total}`}
        bold
      />
    </>
  );
};

export default PriceDetails;