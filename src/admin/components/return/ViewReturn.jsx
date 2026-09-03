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

const ViewReturn = ({ returnRequest, onClose }) => {
  const { darkMode } = useThemeContext();

  if (!returnRequest) return null;

  // ======================================================
  // BACKEND DATA
  // ======================================================

  const returnId =
    returnRequest._id ||
    returnRequest.id ||
    "N/A";

  const createdDate =
    returnRequest.createdAt ||
    null;

  // ======================================================
  // STATUS COLOR
  // ======================================================

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "warning";

      case "Approved":
        return "info";

      case "Rejected":
        return "error";

      case "Pickup Scheduled":
        return "secondary";

      case "Picked Up":
        return "info";

      case "Received":
        return "primary";

      case "Refunded":
        return "success";

      case "Cancelled":
        return "error";

      default:
        return "default";
    }
  };

  // ======================================================
  // REFUND STATUS COLOR
  // ======================================================

  const getRefundStatusColor = (status) => {
    switch (status) {
      case "Not Initiated":
        return "default";

      case "Pending":
        return "warning";

      case "Processed":
        return "info";

      case "Completed":
        return "success";

      default:
        return "default";
    }
  };

  return (
    <Box
      sx={{
        width: 400,
        height: "100vh",
        backgroundColor: darkMode
          ? "#252525"
          : "#fff",

        overflowY: "auto",

        "&::-webkit-scrollbar": {
          width: "7px",
        },

        "&::-webkit-scrollbar-track": {
          background: darkMode
            ? "#252525"
            : "#F5F5F5",
        },

        "&::-webkit-scrollbar-thumb": {
          background: darkMode
            ? "#555"
            : "#C5C5C5",

          borderRadius: "10px",
        },
      }}
    >
      {/* ==================================================
          HEADER
      ================================================== */}

      <Box
        sx={{
          p: 3,

          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center",

          borderBottom: "1px solid",

          borderColor: darkMode
            ? "#444"
            : "#eee",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,

            color: darkMode
              ? "#fff"
              : "#222",
          }}
        >
          Return Details
        </Typography>

        <IconButton
          onClick={onClose}
          sx={{
            color: darkMode
              ? "#fff"
              : "#222",
          }}
        >
          <CloseOutlinedIcon />
        </IconButton>
      </Box>

      {/* ==================================================
          CONTENT
      ================================================== */}

      <Box sx={{ p: 3 }}>

        {/* ==================================================
            RETURN INFORMATION
        ================================================== */}

        <Typography
          variant="h6"
          sx={{
            mb: 3,

            fontWeight: 700,

            color: darkMode
              ? "#fff"
              : "#222",
          }}
        >
          Return Information
        </Typography>

        {/* Return ID */}

        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontSize: 13,

              color: darkMode
                ? "#AFAFAF"
                : "#777",
            }}
          >
            Return ID
          </Typography>

          <Typography
            sx={{
              mt: 1,

              fontWeight: 600,

              color: darkMode
                ? "#fff"
                : "#222",

              wordBreak:
                "break-all",
            }}
          >
            {returnId}
          </Typography>
        </Box>

        {/* Return Date */}

        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontSize: 13,

              color: darkMode
                ? "#AFAFAF"
                : "#777",
            }}
          >
            Request Date
          </Typography>

          <Typography
            sx={{
              mt: 1,

              color: darkMode
                ? "#fff"
                : "#222",
            }}
          >
            {createdDate
              ? new Date(
                  createdDate,
                ).toLocaleString(
                  "en-IN",
                )
              : "N/A"}
          </Typography>
        </Box>

        {/* Return Status */}

        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontSize: 13,

              color: darkMode
                ? "#AFAFAF"
                : "#777",

              mb: 1,
            }}
          >
            Return Status
          </Typography>

          <Chip
            label={
              returnRequest.status ||
              "Pending"
            }
            color={getStatusColor(
              returnRequest.status,
            )}
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* ==================================================
            ORDER INFORMATION
        ================================================== */}

        <Typography
          variant="h6"
          sx={{
            mb: 3,

            fontWeight: 700,

            color: darkMode
              ? "#fff"
              : "#222",
          }}
        >
          Order Information
        </Typography>

        <Stack spacing={3}>

          {/* Order Number */}

          <Box>
            <Typography
              sx={{
                fontSize: 13,

                color: darkMode
                  ? "#AFAFAF"
                  : "#777",
              }}
            >
              Order Number
            </Typography>

            <Typography
              sx={{
                mt: 1,

                fontWeight: 600,

                color: darkMode
                  ? "#fff"
                  : "#222",
              }}
            >
              {returnRequest.orderNumber ||
                "N/A"}
            </Typography>
          </Box>

          {/* Order ID */}

          <Box>
            <Typography
              sx={{
                fontSize: 13,

                color: darkMode
                  ? "#AFAFAF"
                  : "#777",
              }}
            >
              Order ID
            </Typography>

            <Typography
              sx={{
                mt: 1,

                color: darkMode
                  ? "#fff"
                  : "#222",

                wordBreak:
                  "break-all",
              }}
            >
              {returnRequest.orderId ||
                "N/A"}
            </Typography>
          </Box>

        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* ==================================================
            PRODUCT INFORMATION
        ================================================== */}

        <Typography
          variant="h6"
          sx={{
            mb: 3,

            fontWeight: 700,

            color: darkMode
              ? "#fff"
              : "#222",
          }}
        >
          Product Information
        </Typography>

        <Box
          sx={{
            display: "flex",

            gap: 2,

            alignItems: "center",

            mb: 3,
          }}
        >
          <Avatar
            src={
              returnRequest.productImage ||
              ""
            }
            variant="rounded"
            sx={{
              width: 80,

              height: 80,

              borderRadius: 2,

              backgroundColor: darkMode
                ? "#333"
                : "#F5F2ED",
            }}
          />

          <Box flex={1}>

            {/* Product Name */}

            <Typography
              sx={{
                fontWeight: 700,

                color: darkMode
                  ? "#fff"
                  : "#222",
              }}
            >
              {returnRequest.productName ||
                "Product"}
            </Typography>

            {/* Size */}

            <Typography
              sx={{
                mt: 0.8,

                fontSize: 13,

                color: darkMode
                  ? "#AFAFAF"
                  : "#777",
              }}
            >
              Size :{" "}
              {returnRequest.productSize ||
                "N/A"}
            </Typography>

            {/* Quantity */}

            <Typography
              sx={{
                mt: 0.5,

                fontSize: 13,

                color: darkMode
                  ? "#AFAFAF"
                  : "#777",
              }}
            >
              Quantity :{" "}
              {returnRequest.quantity ||
                1}
            </Typography>

          </Box>
        </Box>

        {/* Product Price */}

        <Box>
          <Typography
            sx={{
              fontSize: 13,

              color: darkMode
                ? "#AFAFAF"
                : "#777",
            }}
          >
            Product Price
          </Typography>

          <Typography
            sx={{
              mt: 1,

              fontWeight: 600,

              color: darkMode
                ? "#fff"
                : "#222",
            }}
          >
            ₹
            {Number(
              returnRequest.productPrice ||
                0,
            ).toLocaleString(
              "en-IN",
            )}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* ==================================================
            CUSTOMER INFORMATION
        ================================================== */}

        <Typography
          variant="h6"
          sx={{
            mb: 3,

            fontWeight: 700,

            color: darkMode
              ? "#fff"
              : "#222",
          }}
        >
          Customer Information
        </Typography>

        <Stack spacing={3}>

          {/* Customer Name */}

          <Box>
            <Typography
              sx={{
                fontSize: 13,

                color: darkMode
                  ? "#AFAFAF"
                  : "#777",
              }}
            >
              Name
            </Typography>

            <Typography
              sx={{
                mt: 1,

                fontWeight: 600,

                color: darkMode
                  ? "#fff"
                  : "#222",
              }}
            >
              {returnRequest.customerName ||
                "N/A"}
            </Typography>
          </Box>

          {/* Email */}

          <Box>
            <Typography
              sx={{
                fontSize: 13,

                color: darkMode
                  ? "#AFAFAF"
                  : "#777",
              }}
            >
              Email
            </Typography>

            <Typography
              sx={{
                mt: 1,

                color: darkMode
                  ? "#fff"
                  : "#222",
              }}
            >
              {returnRequest.customerEmail ||
                "N/A"}
            </Typography>
          </Box>

          {/* Phone */}

          <Box>
            <Typography
              sx={{
                fontSize: 13,

                color: darkMode
                  ? "#AFAFAF"
                  : "#777",
              }}
            >
              Phone
            </Typography>

            <Typography
              sx={{
                mt: 1,

                color: darkMode
                  ? "#fff"
                  : "#222",
              }}
            >
              {returnRequest.customerPhone ||
                "N/A"}
            </Typography>
          </Box>

        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* ==================================================
            RETURN REASON
        ================================================== */}

        <Typography
          variant="h6"
          sx={{
            mb: 3,

            fontWeight: 700,

            color: darkMode
              ? "#fff"
              : "#222",
          }}
        >
          Return Reason
        </Typography>

        {/* Reason */}

        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontSize: 13,

              color: darkMode
                ? "#AFAFAF"
                : "#777",
            }}
          >
            Reason
          </Typography>

          <Typography
            sx={{
              mt: 1,

              fontWeight: 600,

              color: darkMode
                ? "#fff"
                : "#222",
            }}
          >
            {returnRequest.reason ||
              "N/A"}
          </Typography>
        </Box>

        {/* Details */}

        <Box>
          <Typography
            sx={{
              fontSize: 13,

              color: darkMode
                ? "#AFAFAF"
                : "#777",
            }}
          >
            Additional Details
          </Typography>

          <Typography
            sx={{
              mt: 1,

              color: darkMode
                ? "#fff"
                : "#222",

              lineHeight: 1.7,

              whiteSpace:
                "pre-wrap",
            }}
          >
            {returnRequest.details ||
              "No additional details provided."}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* ==================================================
            REFUND INFORMATION
        ================================================== */}

        <Typography
          variant="h6"
          sx={{
            mb: 3,

            fontWeight: 700,

            color: darkMode
              ? "#fff"
              : "#222",
          }}
        >
          Refund Information
        </Typography>

        <Stack spacing={3}>

          {/* Paid Amount */}

          <Box>
            <Typography
              sx={{
                fontSize: 13,

                color: darkMode
                  ? "#AFAFAF"
                  : "#777",
              }}
            >
              Amount Paid
            </Typography>

            <Typography
              sx={{
                mt: 1,

                color: darkMode
                  ? "#fff"
                  : "#222",
              }}
            >
              ₹
              {Number(
                returnRequest.paidAmount ||
                  0,
              ).toLocaleString(
                "en-IN",
              )}
            </Typography>
          </Box>

          {/* Refund Amount */}

          <Box>
            <Typography
              sx={{
                fontSize: 13,

                color: darkMode
                  ? "#AFAFAF"
                  : "#777",
              }}
            >
              Refund Amount
            </Typography>

            <Typography
              sx={{
                mt: 1,

                fontWeight: 700,

                fontSize: 18,

                color: "#2E7D32",
              }}
            >
              ₹
              {Number(
                returnRequest.refundAmount ||
                  0,
              ).toLocaleString(
                "en-IN",
              )}
            </Typography>
          </Box>

          {/* Refund Status */}

          <Box>
            <Typography
              sx={{
                fontSize: 13,

                color: darkMode
                  ? "#AFAFAF"
                  : "#777",

                mb: 1,
              }}
            >
              Refund Status
            </Typography>

            <Chip
              label={
                returnRequest.refundStatus ||
                "Not Initiated"
              }
              color={getRefundStatusColor(
                returnRequest.refundStatus,
              )}
            />
          </Box>

        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* ==================================================
            ADMIN INFORMATION
        ================================================== */}

        <Typography
          variant="h6"
          sx={{
            mb: 3,

            fontWeight: 700,

            color: darkMode
              ? "#fff"
              : "#222",
          }}
        >
          Admin Information
        </Typography>

        <Box>
          <Typography
            sx={{
              fontSize: 13,

              color: darkMode
                ? "#AFAFAF"
                : "#777",
            }}
          >
            Admin Note
          </Typography>

          <Typography
            sx={{
              mt: 1,

              color: darkMode
                ? "#fff"
                : "#222",

              lineHeight: 1.7,

              whiteSpace:
                "pre-wrap",
            }}
          >
            {returnRequest.adminNote ||
              "No admin note available."}
          </Typography>
        </Box>

        {/* ==================================================
            BACK BUTTON
        ================================================== */}

        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          sx={{
            mt: 5,

            mb: 2,

            bgcolor: "#B89478",

            textTransform:
              "none",

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

export default ViewReturn;