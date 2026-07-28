import React from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import { useSelector } from "react-redux";

import CouponBox from "./CouponBox";
import PriceDetails from "./PriceDetails";

const OrderSummary = () => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        border: "1px solid #ECE6DE",
        position: "sticky",
        top: 100,
        background: "#fff",
        width: 480,
      }}
    >
      {/* Heading */}

      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 600,
          color: "#1E2F2B",
          mb: 3,
        }}
      >
        Order Summary
      </Typography>

      {/* Products */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
        }}
      >
        {cartItems.map((item) => (
          <Box
            key={`${item.productId}-${item.variantId}`}
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
          >
            {/* Product Image */}

            <Avatar
              src={item.image}
              variant="rounded"
              sx={{
                width: 75,
                height: 75,
                bgcolor: "#F7F5F2",
                borderRadius: 3,
              }}
            />

            {/* Product Details */}

            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "#1E2F2B",
                  fontSize: 15,
                }}
              >
                {item.name}
              </Typography>

              <Typography
                sx={{
                  color: "#777",
                  fontSize: 13,
                  mt: .5,
                }}
              >
                {item.size}
              </Typography>

              <Typography
                sx={{
                  color: "#777",
                  fontSize: 13,
                  mt: .5,
                }}
              >
                Qty : {item.quantity}
              </Typography>
            </Box>

            {/* Price */}

            <Typography
              sx={{
                fontWeight: 600,
                color: "#1E2F2B",
                fontSize: 16,
              }}
            >
              ₹{item.price * item.quantity}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Coupon */}

      <CouponBox />

      <Divider sx={{ my: 4 }} />

      {/* Price */}

      <PriceDetails />

      <Divider sx={{ my: 4 }} />

      {/* Delivery */}

      <Typography
        sx={{
          fontWeight: 600,
          color: "#1E2F2B",
          mb: 1,
        }}
      >
        Estimated Delivery
      </Typography>

      <Typography
        sx={{
          color: "#777",
          mb: 4,
        }}
      >
        3–5 Business Days
      </Typography>

      {/* Secure */}

      <Box
        sx={{
          background: "#F8F6F3",
          p: 2,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            color: "#1E2F2B",
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          🔒 Secure Checkout
        </Typography>

        <Typography
          sx={{
            mt: .5,
            color: "#777",
            fontSize: 13,
          }}
        >
          Your payment information is encrypted and secure.
        </Typography>
      </Box>
    </Paper>
  );
};

export default OrderSummary;