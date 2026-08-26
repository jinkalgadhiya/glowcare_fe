import React from "react";

import { Box, Typography, Chip } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useThemeContext } from "../../context/ThemeContext";

const RecentOrders = ({ orders = [] }) => {
  const { darkMode } = useThemeContext();
  const navigate = useNavigate();

  // =====================================================
  // RECENT ORDERS
  // =====================================================

  const recentOrders = [...orders]
    .sort((a, b) => {
      const dateA = new Date(a?.orderDate || a?.createdAt || 0).getTime();

      const dateB = new Date(b?.orderDate || b?.createdAt || 0).getTime();

      return dateB - dateA;
    })
    .slice(0, 5);

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    switch (String(status || "").toLowerCase()) {
      case "delivered":
        return {
          bgcolor: darkMode ? "#314236" : "#EEF6F0",
          color: darkMode ? "#9BE0AD" : "#4F8A5B",
        };

      case "pending":
        return {
          bgcolor: darkMode ? "#4A3A26" : "#FFF5E8",
          color: darkMode ? "#F0B85C" : "#D38B22",
        };

      case "shipped":
        return {
          bgcolor: darkMode ? "#2F3F57" : "#EEF5FF",
          color: darkMode ? "#9CB9F5" : "#4C79D3",
        };

      case "processing":
        return {
          bgcolor: darkMode ? "#3D3328" : "#F7F0E8",
          color: darkMode ? "#D7B58D" : "#A87545",
        };

      case "cancelled":
      case "canceled":
        return {
          bgcolor: darkMode ? "#432E2C" : "#FBEDED",
          color: darkMode ? "#FF9D94" : "#B84A40",
        };

      default:
        return {
          bgcolor: darkMode ? "#333333" : "#EEEEEE",
          color: darkMode ? "#FFFFFF" : "#555555",
        };
    }
  };

  // =====================================================
  // FORMAT ORDER ID
  // =====================================================

  const formatOrderId = (order) => {
    const orderId =
      order?.orderNumber || order?.orderId || order?.id || order?._id;

    if (!orderId) {
      return "----";
    }

    return String(orderId).slice(-4).padStart(4, "0");
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // FORMAT TOTAL
  // =====================================================

  const formatAmount = (amount) => {
    const numericAmount = Number(amount || 0);

    return numericAmount.toLocaleString("en-IN");
  };

  // =====================================================
  // CUSTOMER NAME
  // =====================================================

  const getCustomerName = (order) => {
    return (
      order?.customer?.fullName ||
      order?.customer?.name ||
      order?.customerName ||
      order?.user?.name ||
      "Guest Customer"
    );
  };

  // =====================================================
  // ORDER TOTAL
  // =====================================================

  const getOrderTotal = (order) => {
    return (
      order?.pricing?.total ??
      order?.pricing?.grandTotal ??
      order?.total ??
      order?.totalAmount ??
      0
    );
  };

  // =====================================================
  // VIEW ALL
  // =====================================================

  const handleViewAll = () => {
    navigate("/admin/orders");
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <Box
      sx={{
        p: {
          xs: 2.5,
          sm: 3,
        },

        borderRadius: "24px",

        backgroundColor: darkMode ? "#23201D" : "#FFFFFF",

        border: "1px solid",

        borderColor: darkMode ? "#39342F" : "#E8E0D7",

        boxShadow: darkMode
          ? "0 10px 30px rgba(0,0,0,.25)"
          : "0 10px 30px rgba(184,148,120,.08)",

        overflow: "hidden",
      }}
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <Box
        sx={{
          display: "flex",

          justifyContent: "space-between",

          alignItems: {
            xs: "flex-start",
            sm: "center",
          },

          gap: 2,

          mb: 3,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: {
                xs: 18,
                sm: 20,
              },

              fontWeight: 700,

              color: darkMode ? "#FFFFFF" : "#1E2F2B",
            }}
          >
            Recent Orders
          </Typography>

          <Typography
            sx={{
              mt: 0.5,

              fontSize: 13,

              color: darkMode ? "#9F9F9F" : "#888",
            }}
          >
            Latest customer orders
          </Typography>
        </Box>

        <Typography
          component="button"
          onClick={handleViewAll}
          sx={{
            border: "none",

            background: "transparent",

            p: 0,

            fontSize: 14,

            fontWeight: 600,

            color: "#B89478",

            cursor: "pointer",

            whiteSpace: "nowrap",

            "&:hover": {
              color: "#A88366",

              textDecoration: "underline",
            },
          }}
        >
          View All
        </Typography>
      </Box>

      {/* =====================================================
          TABLE HEADER
      ===================================================== */}

      {recentOrders.length > 0 && (
        <Box
          sx={{
            display: {
              xs: "none",
              md: "grid",
            },

            gridTemplateColumns: "110px minmax(160px, 1.5fr) 120px 120px 130px",

            alignItems: "center",

            px: 2,

            py: 1.2,

            borderRadius: "12px",

            backgroundColor: darkMode ? "#2C2825" : "#FAF7F4",

            mb: 1,
          }}
        >
          {["Order", "Customer", "Amount", "Status", "Date"].map((heading) => (
            <Typography
              key={heading}
              sx={{
                fontSize: 12,

                fontWeight: 700,

                textTransform: "uppercase",

                letterSpacing: "0.04em",

                color: darkMode ? "#AFAFAF" : "#888",
              }}
            >
              {heading}
            </Typography>
          ))}
        </Box>
      )}

      {/* =====================================================
          ORDERS
      ===================================================== */}

      {recentOrders.length > 0 ? (
        <Box
          sx={{
            display: "flex",

            flexDirection: "column",
          }}
        >
          {recentOrders.map((order, index) => {
            const orderDate = order?.orderDate || order?.createdAt;

            const total = getOrderTotal(order);

            const customerName = getCustomerName(order);

            const status = order?.status || "Pending";

            return (
              <Box
                key={order?.id || order?._id || index}
                sx={{
                  display: {
                    xs: "flex",
                    md: "grid",
                  },

                  gridTemplateColumns:
                    "110px minmax(160px, 1.5fr) 120px 120px 130px",

                  flexDirection: "column",

                  gap: {
                    xs: 1.5,
                    md: 0,
                  },

                  alignItems: {
                    md: "center",
                  },

                  px: {
                    xs: 1,
                    md: 2,
                  },

                  py: 2,

                  borderBottom:
                    index !== recentOrders.length - 1
                      ? `1px solid ${darkMode ? "#39342F" : "#E8E0D7"}`
                      : "none",

                  transition: "background-color .2s ease",

                  "&:hover": {
                    backgroundColor: darkMode ? "#2A2724" : "#FCFAF8",
                  },
                }}
              >
                {/* =========================================
                    ORDER ID
                ========================================= */}

                <Box>
                  <Typography
                    sx={{
                      fontSize: 14,

                      fontWeight: 700,

                      color: darkMode ? "#FFFFFF" : "#1E2F2B",
                    }}
                  >
                    #{formatOrderId(order)}
                  </Typography>

                  {/* Mobile date */}
                  <Typography
                    sx={{
                      display: {
                        xs: "block",
                        md: "none",
                      },

                      mt: 0.3,

                      fontSize: 11,

                      color: darkMode ? "#888" : "#999",
                    }}
                  >
                    {formatDate(orderDate)}
                  </Typography>
                </Box>

                {/* =========================================
                    CUSTOMER
                ========================================= */}

                <Box
                  sx={{
                    minWidth: 0,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 14,

                      fontWeight: 600,

                      color: darkMode ? "#E5E5E5" : "#444",

                      overflow: "hidden",

                      textOverflow: "ellipsis",

                      whiteSpace: "nowrap",

                      maxWidth: {
                        xs: "100%",
                        md: 240,
                      },
                    }}
                  >
                    {customerName}
                  </Typography>
                </Box>

                {/* =========================================
                    AMOUNT
                ========================================= */}

                <Typography
                  sx={{
                    fontSize: 14,

                    fontWeight: 700,

                    color: darkMode ? "#FFFFFF" : "#222",
                  }}
                >
                  ₹{formatAmount(total)}
                </Typography>

                {/* =========================================
                    STATUS
                ========================================= */}

                <Box>
                  <Chip
                    label={status}
                    size="small"
                    sx={{
                      width: {
                        xs: "auto",
                        md: 100,
                      },

                      minWidth: 90,

                      height: 30,

                      fontWeight: 600,

                      fontSize: 12,

                      borderRadius: "20px",

                      ...getStatusStyle(status),
                    }}
                  />
                </Box>

                {/* =========================================
                    DATE
                ========================================= */}

                <Typography
                  sx={{
                    display: {
                      xs: "none",
                      md: "block",
                    },

                    fontSize: 13,

                    color: darkMode ? "#B5B5B5" : "#888",
                  }}
                >
                  {formatDate(orderDate)}
                </Typography>
              </Box>
            );
          })}
        </Box>
      ) : (
        /* =================================================
           EMPTY STATE
        ================================================= */

        <Box
          sx={{
            minHeight: 250,

            display: "flex",

            flexDirection: "column",

            justifyContent: "center",

            alignItems: "center",

            textAlign: "center",

            px: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: 16,

              fontWeight: 600,

              color: darkMode ? "#FFFFFF" : "#555",
            }}
          >
            No Orders Found
          </Typography>

          <Typography
            sx={{
              mt: 0.7,

              fontSize: 13,

              color: darkMode ? "#999" : "#888",
            }}
          >
            Recent customer orders will appear here.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default RecentOrders;
