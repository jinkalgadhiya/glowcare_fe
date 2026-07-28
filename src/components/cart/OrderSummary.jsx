import React from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrderSummary = ({ subtotal }) => {
  const shipping = 0;
  const total = subtotal + shipping;
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        border: "1px solid #E9E3D8",
        borderRadius: "20px",
        p: 4,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: "#18312C",
          mb: 4,
        }}
      >
        Order Summary
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        mb={2.5}
      >
        <Typography color="text.secondary">
          Subtotal
        </Typography>

        <Typography fontWeight={600}>
          ₹{subtotal}
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        mb={3}
      >
        <Typography color="text.secondary">
          Shipping
        </Typography>

        <Typography
          sx={{
            color: "#2E7D32",
            fontWeight: 600,
          }}
        >
          Free
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box
        display="flex"
        justifyContent="space-between"
        mb={4}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          Total
        </Typography>

        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 18,
            color: "#18312C",
          }}
        >
          ₹{total}
        </Typography>
      </Box>

      <Button
        fullWidth
        variant="contained"
        onClick={() => navigate("/checkout")}
        sx={{
          py: 1.8,
          borderRadius: "40px",
          backgroundColor: "#18312C",
          textTransform: "uppercase",
          fontWeight: 600,

          "&:hover": {
            backgroundColor: "#24443D",
          },
        }}
      >
        Proceed to Checkout
      </Button>
    </Box>
  );
};

export default OrderSummary;