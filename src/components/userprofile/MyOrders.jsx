import React, { useEffect, useState } from "react";

import {
  Box,
  Card,
  Chip,
  Stack,
  Typography,
  Button,
  Divider,
} from "@mui/material";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import { getMyOrders } from "../../database/orderService";

// =====================================================
// ORDER DETAILS PAGE
// =====================================================

import OrderDetails from "./OrderDetails";

// =====================================================
// MY ORDERS
// =====================================================

const MyOrders = () => {
  // =====================================================
  // ORDERS
  // =====================================================

  const [orders, setOrders] = useState([]);

  // =====================================================
  // SELECTED ORDER
  // =====================================================

  const [selectedOrder, setSelectedOrder] = useState(null);

  // =====================================================
  // LOAD ORDERS
  // =====================================================

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getMyOrders();

        console.log("🔥 CUSTOMER ORDERS RESPONSE:", data);

        // Latest orders first
        const sortedOrders = [...(data || [])].sort(
          (a, b) =>
            new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0),
        );

        setOrders(sortedOrders);
      } catch (error) {
        console.error(
          "Failed to load orders:",
          error,
        );
      }
    };

    loadOrders();
  }, []);

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    const normalizedStatus = String(
      status || "Processing",
    ).toLowerCase();

    if (normalizedStatus === "delivered") {
      return {
        color: "#2F5D45",
        backgroundColor: "#EAF3EC",
        borderColor: "#CFE2D4",
      };
    }

    if (normalizedStatus === "shipped") {
      return {
        color: "#6B5630",
        backgroundColor: "#F5EEDF",
        borderColor: "#E5D8B8",
      };
    }

    if (
      normalizedStatus === "cancelled" ||
      normalizedStatus === "canceled"
    ) {
      return {
        color: "#7A4038",
        backgroundColor: "#F7E9E6",
        borderColor: "#E8CFC9",
      };
    }

    if (
      normalizedStatus ===
      "out for delivery"
    ) {
      return {
        color: "#365A4E",
        backgroundColor: "#E8F0EC",
        borderColor: "#CEDFD6",
      };
    }

    return {
      color: "#655842",
      backgroundColor: "#F5F1E9",
      borderColor: "#E5DED0",
    };
  };

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "Date unavailable";
    }

    const parsedDate = new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime(),
      )
    ) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    );
  };

  // =====================================================
  // ORDER TOTAL
  // =====================================================

  const getOrderTotal = (order) => {
    if (
      order?.pricing?.total !==
      undefined
    ) {
      return (
        Number(
          order.pricing.total,
        ) || 0
      );
    }

    if (
      order?.totalAmount !==
      undefined
    ) {
      return (
        Number(
          order.totalAmount,
        ) || 0
      );
    }

    if (
      order?.total !== undefined
    ) {
      return (
        Number(order.total) || 0
      );
    }

    if (order?.items?.length) {
      return order.items.reduce(
        (total, item) => {
          const itemTotal =
            item.total !== undefined
              ? Number(item.total) || 0
              : Number(
                  item.price || 0,
                ) *
                Number(
                  item.quantity || 1,
                );

          return total + itemTotal;
        },
        0,
      );
    }

    return 0;
  };

  // =====================================================
  // PRODUCT IMAGE
  // =====================================================

  const getProductImage = (item) => {
    return (
      item?.thumbnail ||
      item?.image ||
      item?.images?.[0] ||
      ""
    );
  };

  // =====================================================
  // PRODUCT TOTAL
  // SAME AS ORDER SUMMARY
  // =====================================================

  const getItemTotal = (item) => {
    if (
      item?.total !== undefined &&
      item?.total !== null
    ) {
      return (
        Number(item.total) || 0
      );
    }

    return (
      Number(item?.price || 0) *
      Number(item?.quantity || 1)
    );
  };

  // =====================================================
  // OPEN ORDER DETAILS
  // =====================================================

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  // =====================================================
  // BACK TO MY ORDERS
  // =====================================================

  const handleBackToOrders = () => {
    setSelectedOrder(null);
  };

  // =====================================================
  // REVIEW SUBMITTED
  // =====================================================

  const handleReviewSubmitted = async (
    review,
  ) => {
    console.log(
      "⭐ REVIEW SUBMITTED:",
      review,
    );

    console.log(
      "⭐ Review data ready for database:",
      review,
    );
  };

  // =====================================================
  // SHOW ORDER DETAILS
  // =====================================================

  if (selectedOrder) {
    return (
      <OrderDetails
        order={selectedOrder}
        onBack={handleBackToOrders}
        onReviewSubmitted={
          handleReviewSubmitted
        }
      />
    );
  }

  // =====================================================
  // EMPTY STATE
  // =====================================================

  if (orders.length === 0) {
    return (
      <Card
        elevation={0}
        sx={{
          width: "100%",
          minHeight: 620,
          borderRadius: "24px",
          border:
            "1px solid #E8E1D8",
          backgroundColor:
            "#FFFFFF",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            px: {
              xs: 3,
              md: 4,
            },
            py: 3,
            background:
              "linear-gradient(135deg, #F4EEE5 0%, #EEE7DC 100%)",
            borderBottom:
              "1px solid #E5DDD1",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 24,
                md: 28,
              },
              fontWeight: 700,
              color: "#1E2F2B",
            }}
          >
            My Orders
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 14,
              color: "#777168",
            }}
          >
            Track and manage your GlowCare
            orders
          </Typography>
        </Box>

        <Box
          sx={{
            minHeight: 480,
            display: "flex",
            flexDirection: "column",
            justifyContent:
              "center",
            alignItems: "center",
            textAlign: "center",
            px: 3,
          }}
        >
          <Box
            sx={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              backgroundColor:
                "#F1F5F1",
              display: "flex",
              alignItems: "center",
              justifyContent:
                "center",
              mb: 3,
            }}
          >
            <ShoppingBagOutlinedIcon
              sx={{
                fontSize: 46,
                color: "#1E2F2B",
              }}
            />
          </Box>

          <Typography
            sx={{
              fontSize: 25,
              fontWeight: 700,
              color: "#1E2F2B",
            }}
          >
            No Orders Yet
          </Typography>

          <Typography
            sx={{
              mt: 1,
              maxWidth: 430,
              fontSize: 14,
              lineHeight: 1.8,
              color: "#777168",
            }}
          >
            You haven't placed any orders
            yet. Explore our skincare
            collection and find something
            you'll love.
          </Typography>
        </Box>
      </Card>
    );
  }

  // =====================================================
  // ORDERS UI
  // =====================================================

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        borderRadius: "24px",
        border:
          "1px solid #E8E1D8",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* HEADER */}

      <Box
        sx={{
          px: {
            xs: 3,
            md: 4,
          },
          py: 3,
          background:
            "linear-gradient(135deg, #F4EEE5 0%, #EEE7DC 100%)",
          borderBottom:
            "1px solid #E5DDD1",
        }}
      >
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          justifyContent="space-between"
          alignItems={{
            xs: "flex-start",
            sm: "center",
          }}
          sx={{
            width: "100%",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: {
                  xs: 24,
                  md: 28,
                },
                fontWeight: 700,
                color: "#1E2F2B",
              }}
            >
              My Orders
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: 14,
                color: "#777168",
              }}
            >
              Track and manage your GlowCare
              orders
            </Typography>
          </Box>

          <Box
            sx={{
              minWidth: 110,
              height: 42,
              px: 2,
              mt: "10px",
              borderRadius: "14px",
              backgroundColor:
                "#FFFFFF",
              border:
                "1px solid #DDD5C9",
              display: "flex",
              alignItems: "center",
              justifyContent:
                "center",
              flexShrink: 0,
              ml: "auto",
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 600,
                color: "#1E2F2B",
                whiteSpace: "nowrap",
              }}
            >
              {orders.length}{" "}
              {orders.length === 1
                ? "Order"
                : "Orders"}
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* ORDER LIST */}

      <Box
        sx={{
          p: {
            xs: 2,
            md: 3,
          },
          backgroundColor: "#FCFAF7",
        }}
      >
        <Stack spacing={2.5}>
          {orders.map((order) => {
            const statusStyle =
              getStatusStyle(
                order.status,
              );

            const items =
              order.items || [];

            return (
              <Box
                key={
                  order._id ||
                  order.id ||
                  order.orderId
                }
                sx={{
                  width: "100%",
                  backgroundColor:
                    "#FFFFFF",
                  border:
                    "1px solid #E9E2D8",
                  borderRadius: "18px",
                  overflow: "hidden",
                  transition:
                    "all .25s ease",

                  "&:hover": {
                    borderColor:
                      "#D6CBBE",
                    boxShadow:
                      "0 8px 25px rgba(30,47,43,0.06)",
                  },
                }}
              >
                {/* ORDER HEADER */}

                <Box
                  sx={{
                    px: {
                      xs: 2,
                      md: 3,
                    },
                    py: 2,
                    backgroundColor:
                      "#FBF9F5",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "space-between",
                      gap: 3,
                    }}
                  >
                    <Box
                      sx={{
                        minWidth: 0,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 12,
                          color:
                            "#8A8178",
                          mb: 0.5,
                          letterSpacing:
                            0.5,
                        }}
                      >
                        ORDER ID
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 700,
                          color:
                            "#1E2F2B",
                        }}
                      >
                        #
                        {order.orderNumber ||
                          order._id ||
                          order.id ||
                          "N/A"}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "flex-end",
                        gap: 2,
                        ml: "auto",
                        flexShrink: 0,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 13,
                          color:
                            "#777168",
                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        {formatDate(
                          order.createdAt,
                        )}
                      </Typography>

                      <Chip
                        label={
                          order.status ||
                          "Processing"
                        }
                        size="small"
                        sx={{
                          height: 30,
                          px: 0.5,
                          fontSize: 12,
                          fontWeight: 600,
                          color:
                            statusStyle.color,
                          backgroundColor:
                            statusStyle.backgroundColor,
                          border: `1px solid ${statusStyle.borderColor}`,
                          borderRadius:
                            "20px",
                          whiteSpace:
                            "nowrap",
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                <Divider />

                {/* PRODUCTS */}

                <Box
                  sx={{
                    px: {
                      xs: 2,
                      md: 3,
                    },
                    py: 2.5,
                  }}
                >
                  <Stack spacing={2}>
                    {items.length > 0 ? (
                      items.map(
                        (
                          item,
                          index,
                        ) => (
                          <React.Fragment
                            key={
                              item.id ||
                              item.productId ||
                              index
                            }
                          >
                            <Box
                              sx={{
                                width:
                                  "100%",
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                justifyContent:
                                  "space-between",
                                gap: 3,
                              }}
                            >
                              {/* LEFT */}

                              <Box
                                sx={{
                                  display:
                                    "flex",
                                  alignItems:
                                    "center",
                                  gap: 2,
                                  minWidth: 0,
                                  flex: 1,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 76,
                                    height: 76,
                                    flexShrink: 0,
                                    borderRadius:
                                      "12px",
                                    backgroundColor:
                                      "#F5F2ED",
                                    border:
                                      "1px solid #ECE5DB",
                                    display:
                                      "flex",
                                    alignItems:
                                      "center",
                                    justifyContent:
                                      "center",
                                    overflow:
                                      "hidden",
                                  }}
                                >
                                  {getProductImage(
                                    item,
                                  ) ? (
                                    <Box
                                      component="img"
                                      src={getProductImage(
                                        item,
                                      )}
                                      alt={
                                        item.productName ||
                                        item.name ||
                                        "Product"
                                      }
                                      sx={{
                                        width:
                                          "100%",
                                        height:
                                          "100%",
                                        objectFit:
                                          "cover",
                                      }}
                                    />
                                  ) : (
                                    <ShoppingBagOutlinedIcon
                                      sx={{
                                        color:
                                          "#B8B0A6",
                                        fontSize:
                                          30,
                                      }}
                                    />
                                  )}
                                </Box>

                                <Box
                                  sx={{
                                    minWidth: 0,
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontSize:
                                        15,
                                      fontWeight:
                                        650,
                                      color:
                                        "#1E2F2B",
                                      lineHeight:
                                        1.4,
                                      overflow:
                                        "hidden",
                                      textOverflow:
                                        "ellipsis",
                                      whiteSpace:
                                        "nowrap",
                                    }}
                                  >
                                    {item.productName ||
                                      item.name ||
                                      "GlowCare Product"}
                                  </Typography>

                                  {item.size && (
                                    <Typography
                                      sx={{
                                        mt: 0.5,
                                        fontSize:
                                          13,
                                        color:
                                          "#777168",
                                      }}
                                    >
                                      Size:{" "}
                                      {item.size}
                                    </Typography>
                                  )}

                                  <Typography
                                    sx={{
                                      mt: 0.5,
                                      fontSize:
                                        13,
                                      color:
                                        "#777168",
                                    }}
                                  >
                                    Qty:{" "}
                                    {item.quantity ||
                                      1}
                                  </Typography>
                                </Box>
                              </Box>

                              {/* PRODUCT TOTAL */}

                              <Box
                                sx={{
                                  ml: "auto",
                                  flexShrink: 0,
                                  textAlign:
                                    "right",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: 15,
                                    fontWeight: 700,
                                    color:
                                      "#1E2F2B",
                                    whiteSpace:
                                      "nowrap",
                                  }}
                                >
                                  ₹
                                  {Number(
                                    getItemTotal(
                                      item,
                                    ),
                                  ).toLocaleString(
                                    "en-IN",
                                  )}
                                </Typography>
                              </Box>
                            </Box>

                            {index <
                              items.length -
                                1 && (
                              <Divider
                                sx={{
                                  borderColor:
                                    "#EEE8DF",
                                }}
                              />
                            )}
                          </React.Fragment>
                        ),
                      )
                    ) : (
                      <Typography
                        sx={{
                          color:
                            "#777168",
                          fontSize: 14,
                        }}
                      >
                        No product details
                        available.
                      </Typography>
                    )}
                  </Stack>
                </Box>

                <Divider />

                {/* ORDER FOOTER */}

                <Box
                  sx={{
                    px: {
                      xs: 2,
                      md: 3,
                    },
                    py: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "space-between",
                      gap: 3,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems:
                          "center",
                        gap: 1,
                        minWidth: 0,
                      }}
                    >
                      <Box
                        sx={{
                          width: 34,
                          height: 34,
                          flexShrink: 0,
                          borderRadius:
                            "50%",
                          backgroundColor:
                            "#EDF3EF",
                          display: "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "center",
                        }}
                      >
                        <LocalShippingOutlinedIcon
                          sx={{
                            fontSize: 19,
                            color:
                              "#1E2F2B",
                          }}
                        />
                      </Box>

                      <Typography
                        sx={{
                          fontSize: 13,
                          color:
                            "#6F6961",
                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        GlowCare order
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "flex-end",
                        gap: 2.5,
                        ml: "auto",
                        flexShrink: 0,
                      }}
                    >
                      {/* TOTAL */}

                      <Box
                        sx={{
                          textAlign:
                            "right",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 11,
                            color:
                              "#8A8178",
                            textTransform:
                              "uppercase",
                            letterSpacing:
                              0.5,
                          }}
                        >
                          Total
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: 18,
                            fontWeight: 700,
                            color:
                              "#1E2F2B",
                            whiteSpace:
                              "nowrap",
                          }}
                        >
                          ₹
                          {Number(
                            getOrderTotal(
                              order,
                            ),
                          ).toLocaleString(
                            "en-IN",
                          )}
                        </Typography>
                      </Box>

                      {/* VIEW DETAILS */}

                      <Button
                        variant="outlined"
                        endIcon={
                          <ArrowForwardIosRoundedIcon
                            sx={{
                              fontSize:
                                "13px !important",
                            }}
                          />
                        }
                        onClick={() =>
                          handleViewDetails(
                            order,
                          )
                        }
                        sx={{
                          minWidth: 135,
                          height: 42,
                          borderRadius:
                            "12px",
                          textTransform:
                            "none",
                          fontSize: 13,
                          fontWeight: 600,
                          color:
                            "#1E2F2B",
                          borderColor:
                            "#1E2F2B",
                          whiteSpace:
                            "nowrap",

                          "&:hover": {
                            backgroundColor:
                              "#1E2F2B",
                            color:
                              "#FFFFFF",
                            borderColor:
                              "#1E2F2B",
                          },
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Card>
  );
};

export default MyOrders;