import React from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import { useNavigate } from "react-router-dom";

const OrderSummary = ({ subtotal }) => {
  const shipping = 0;
  const total = subtotal + shipping;

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#FFFFFF",
        border: "1px solid #E7DED2",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 8px 30px rgba(30,47,43,0.05)",
      }}
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <Box
        sx={{
          px: 3.5,
          py: 2.5,
          background:
            "linear-gradient(135deg, #F5EFE7 0%, #EEE7DC 100%)",
          borderBottom: "1px solid #E5DDD2",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: "12px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2D8CA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ReceiptLongOutlinedIcon
            sx={{
              fontSize: 22,
              color: "#1E2F2B",
            }}
          />
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 700,
              color: "#1E2F2B",
              lineHeight: 1.2,
            }}
          >
            Order Summary
          </Typography>

          <Typography
            sx={{
              mt: 0.4,
              fontSize: 12,
              color: "#81796F",
            }}
          >
            Review your order details
          </Typography>
        </Box>
      </Box>

      {/* =====================================================
          SUMMARY CONTENT
      ===================================================== */}

      <Box
        sx={{
          px: 3.5,
          py: 3,
        }}
      >
        {/* SUBTOTAL */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2.5,
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              color: "#716A62",
            }}
          >
            Subtotal
          </Typography>

          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 600,
              color: "#1E2F2B",
            }}
          >
            ₹{Number(subtotal).toLocaleString("en-IN")}
          </Typography>
        </Box>

        {/* SHIPPING */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2.5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <LocalShippingOutlinedIcon
              sx={{
                fontSize: 18,
                color: "#8A8178",
              }}
            />

            <Typography
              sx={{
                fontSize: 14,
                color: "#716A62",
              }}
            >
              Shipping
            </Typography>
          </Box>

          <Box
            sx={{
              px: 1.3,
              py: 0.45,
              borderRadius: "20px",
              backgroundColor: "#EAF3EC",
              border: "1px solid #CFE2D4",
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
                color: "#2F5D45",
              }}
            >
              FREE
            </Typography>
          </Box>
        </Box>

        <Divider
          sx={{
            borderColor: "#E9E2D8",
            mb: 2.5,
          }}
        />

        {/* TOTAL */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 17,
                fontWeight: 700,
                color: "#1E2F2B",
              }}
            >
              Total
            </Typography>

            <Typography
              sx={{
                mt: 0.3,
                fontSize: 12,
                color: "#8A8178",
              }}
            >
              Inclusive of shipping
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 700,
              color: "#1E2F2B",
            }}
          >
            ₹{Number(total).toLocaleString("en-IN")}
          </Typography>
        </Box>

        {/* =====================================================
            CHECKOUT BUTTON
        ===================================================== */}

        <Button
          fullWidth
          variant="contained"
          onClick={() => navigate("/checkout")}
          sx={{
            height: 52,
            borderRadius: "14px",
            backgroundColor: "#1E2F2B",
            color: "#FFFFFF",
            textTransform: "none",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: 0.3,
            boxShadow:
              "0 6px 18px rgba(30,47,43,0.18)",

            "&:hover": {
              backgroundColor: "#29453E",
              boxShadow:
                "0 8px 22px rgba(30,47,43,0.22)",
            },
          }}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default OrderSummary;