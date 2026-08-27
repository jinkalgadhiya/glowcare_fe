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

import { useThemeContext } from "../../context/ThemeContext";

const ViewOrder = ({ order, onClose }) => {
  const { darkMode } = useThemeContext();

  if (!order) return null;

  // ==============================
  // Backend-compatible data
  // ==============================

  const orderId = order._id || order.id || "N/A";

  const orderDate =
    order.orderDate ||
    order.createdAt ||
    null;

  const customer = order.customer || {};

  const shipping = order.shipping || {};

  const items = order.items || [];

  const pricing = order.pricing || {};

  const paymentMethod =
    order.paymentMethod ||
    order.payment?.method ||
    "N/A";

  const deliveryMethod =
    order.deliveryMethod ||
    order.delivery?.method ||
    "N/A";

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
      {/* ================= HEADER ================= */}

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

      {/* ================= CONTENT ================= */}

      <Box sx={{ p: 3 }}>
        {/* ================= ORDER INFORMATION ================= */}

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
              wordBreak: "break-all",
            }}
          >
            {orderId}
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
            {orderDate
              ? new Date(orderDate).toLocaleString()
              : "N/A"}
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

          <Chip
            label={order.status || "Pending"}
            color={getStatusColor(order.status)}
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* ================= CUSTOMER ================= */}

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
          {/* Name */}

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
              {customer.fullName || "N/A"}
            </Typography>
          </Box>

          {/* Email */}

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
              {customer.email || "N/A"}
            </Typography>
          </Box>

          {/* Phone */}

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
              {customer.phone ||
                customer.contactNumber ||
                "N/A"}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* ================= SHIPPING ================= */}

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
          {shipping.address || "N/A"}

          <br />

          {shipping.city || ""}
          {shipping.city && shipping.state ? ", " : ""}
          {shipping.state || ""}

          <br />

          {shipping.pincode || ""}

          {shipping.landmark && (
            <>
              <br />
              {shipping.landmark}
            </>
          )}
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* ================= PRODUCTS ================= */}

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
          {items.length === 0 ? (
            <Typography
              sx={{
                color: darkMode ? "#aaa" : "#777",
              }}
            >
              No products found.
            </Typography>
          ) : (
            items.map((item, index) => (
              <Box
                key={
                  item._id ||
                  `${item.productId}-${item.variantId}-${index}`
                }
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={item.image || ""}
                  variant="rounded"
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: 2,
                    backgroundColor: darkMode
                      ? "#333"
                      : "#F5F2ED",
                  }}
                />

                <Box flex={1}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: darkMode ? "#fff" : "#222",
                    }}
                  >
                    {item.name || "Product"}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.5,
                      fontSize: 13,
                      color: darkMode ? "#AFAFAF" : "#777",
                    }}
                  >
                    Size : {item.size || "N/A"}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.5,
                      fontSize: 13,
                      color: darkMode ? "#AFAFAF" : "#777",
                    }}
                  >
                    Qty : {item.quantity || 0}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#2E7D32",
                    whiteSpace: "nowrap",
                  }}
                >
                  ₹
                  {(
                    Number(item.price || 0) *
                    Number(item.quantity || 0)
                  ).toLocaleString("en-IN")}
                </Typography>
              </Box>
            ))
          )}
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* ================= PRICE SUMMARY ================= */}

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
          <Typography
            sx={{
              color: darkMode ? "#fff" : "#222",
            }}
          >
            Subtotal : ₹{pricing.subtotal || 0}
          </Typography>

          <Typography
            sx={{
              color: darkMode ? "#fff" : "#222",
            }}
          >
            Shipping : ₹{pricing.shipping || 0}
          </Typography>

          <Typography
            sx={{
              color: darkMode ? "#fff" : "#222",
            }}
          >
            GST : ₹{pricing.gst || 0}
          </Typography>

          <Typography
            sx={{
              color: darkMode ? "#fff" : "#222",
            }}
          >
            Discount : ₹{pricing.discount || 0}
          </Typography>

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 18,
              color: "#2E7D32",
            }}
          >
            Total : ₹{pricing.total || 0}
          </Typography>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* ================= PAYMENT ================= */}

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
          {/* Payment Method */}

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
              {paymentMethod}
            </Typography>
          </Box>

          {/* Payment Status */}

          <Box>
            <Typography
              sx={{
                fontSize: 13,
                color: darkMode ? "#AFAFAF" : "#777",
              }}
            >
              Payment Status
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: darkMode ? "#fff" : "#222",
              }}
            >
              {order.paymentStatus ||
                order.payment?.status ||
                "Pending"}
            </Typography>
          </Box>

          {/* Delivery Method */}

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
              {deliveryMethod}
            </Typography>
          </Box>
        </Stack>

        {/* Back */}

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