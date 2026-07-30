import React from "react";
import {
  Box,
  Typography,
  Divider,
  Avatar,
  Chip,
  IconButton,
  Stack,
  Button,
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { useThemeContext } from "../context/ThemeContext";

const ViewOrder = ({ order, onClose }) => {
  const { darkMode } = useThemeContext();

  if (!order) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Processing":
        return "info";
      case "Shipped":
        return "secondary";
      case "Delivered":
        return "success";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box
      sx={{
        width: 380,
        height: "100vh",
        backgroundColor: darkMode ? "#252525" : "#fff",
        overflowY: "auto",
      }}
    >
      {/* Header */}

      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid",
          borderColor: darkMode ? "#444" : "#eee",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Order Details
        </Typography>

        <IconButton
          onClick={onClose}
          sx={{
            color: darkMode ? "#fff" : "#222",
          }}
        >
          <CloseOutlinedIcon />
        </IconButton>
      </Box>

      {/* Content */}

      <Box
        sx={{
          p: 3,
        }}
      >
        {/* Order Information */}

        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontSize: 13,
              color: darkMode ? "#AFAFAF" : "#777",
            }}
          >
            Order ID
          </Typography>

          <Typography
            sx={{
              mt: 1,
              fontWeight: 600,
              color: darkMode ? "#fff" : "#222",
            }}
          >
            {order.id}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontSize: 13,
              color: darkMode ? "#AFAFAF" : "#777",
            }}
          >
            Order Date
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: darkMode ? "#fff" : "#222",
            }}
          >
            {new Date(order.orderDate).toLocaleString()}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontSize: 13,
              color: darkMode ? "#AFAFAF" : "#777",
              mb: 1,
            }}
          >
            Status
          </Typography>

          <Chip label={order.status} color={getStatusColor(order.status)} />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Customer */}

        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 700,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Customer Details
        </Typography>

        <Stack spacing={3}>
          <Box>
            <Typography
              sx={{
                fontSize: 13,
                color: darkMode ? "#AFAFAF" : "#777",
              }}
            >
              Name
            </Typography>

            <Typography
              sx={{
                mt: 1,
                fontWeight: 600,
                color: darkMode ? "#fff" : "#222",
              }}
            >
              {order.customer.fullName}
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 13,
                color: darkMode ? "#AFAFAF" : "#777",
              }}
            >
              Email
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: darkMode ? "#fff" : "#222",
              }}
            >
              {order.customer.email}
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 13,
                color: darkMode ? "#AFAFAF" : "#777",
              }}
            >
              Phone
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: darkMode ? "#fff" : "#222",
              }}
            >
              {order.customer.phone}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Shipping */}

        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 700,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Shipping Address
        </Typography>

        <Typography
          sx={{
            color: darkMode ? "#fff" : "#222",
            lineHeight: 1.8,
          }}
        >
          {order.shipping.address}
          <br />
          {order.shipping.city}, {order.shipping.state}
          <br />
          {order.shipping.pincode}
          {order.shipping.landmark && (
            <>
              <br />
              {order.shipping.landmark}
            </>
          )}
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Ordered Products */}

        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 700,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Ordered Products
        </Typography>

        <Stack spacing={3}>
          {order.items.map((item) => (
            <Box
              key={`${item.productId}-${item.variantId}`}
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Avatar
                src={item.image}
                variant="rounded"
                sx={{
                  width: 70,
                  height: 70,
                  borderRadius: 2,
                }}
              />

              <Box flex={1}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: darkMode ? "#fff" : "#222",
                  }}
                >
                  {item.name}
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    fontSize: 13,
                    color: darkMode ? "#AFAFAF" : "#777",
                  }}
                >
                  Size : {item.size}
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    fontSize: 13,
                    color: darkMode ? "#AFAFAF" : "#777",
                  }}
                >
                  Qty : {item.quantity}
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontWeight: 700,
                  color: "#2E7D32",
                }}
              >
                ₹{item.price * item.quantity}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Price Summary */}

        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 700,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Price Summary
        </Typography>

        <Stack spacing={2}>
          <Typography sx={{ color: darkMode ? "#fff" : "#222" }}>
            Subtotal : ₹{order.pricing.subtotal}
          </Typography>

          <Typography sx={{ color: darkMode ? "#fff" : "#222" }}>
            Shipping : ₹{order.pricing.shipping}
          </Typography>

          <Typography sx={{ color: darkMode ? "#fff" : "#222" }}>
            GST : ₹{order.pricing.gst}
          </Typography>

          <Typography sx={{ color: darkMode ? "#fff" : "#222" }}>
            Discount : ₹{order.pricing.discount}
          </Typography>

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 18,
              color: "#2E7D32",
            }}
          >
            Total : ₹{order.pricing.total}
          </Typography>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Payment */}

        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 700,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Payment Details
        </Typography>

        <Stack spacing={3}>
          <Box>
            <Typography
              sx={{
                fontSize: 13,
                color: darkMode ? "#AFAFAF" : "#777",
              }}
            >
              Payment Method
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: darkMode ? "#fff" : "#222",
              }}
            >
              {order.paymentMethod}
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 13,
                color: darkMode ? "#AFAFAF" : "#777",
              }}
            >
              Delivery Method
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: darkMode ? "#fff" : "#222",
              }}
            >
              {order.deliveryMethod}
            </Typography>
          </Box>
        </Stack>

        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          sx={{
            mt: 5,
            bgcolor: "#B89478",
            textTransform: "none",
            borderRadius: 2,
            boxShadow: "none",

            "&:hover": {
              bgcolor: "#A88366",
              boxShadow: "none",
            },
          }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default ViewOrder;
