import React, { useEffect, useState } from "react";

import {
  Box,
  Card,
  Chip,
  Stack,
  Typography,
  Button,
  Divider,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import ReviewDialog from "./ReviewDialog";
import ReturnDialog from "./ReturnRequestDialog";

import { createReview } from "../../database/reviewService";

import {
  createReturnRequest,
  getReturnRequests,
} from "../../database/returnService";

import { updateOrderStatus } from "../../database/orderService";

// =====================================================
// ORDER DETAILS
// =====================================================

const OrderDetails = ({ order, onBack, onReviewSubmitted, onOrderUpdated }) => {
  // =====================================================
  // REVIEW STATES
  // =====================================================

  const [reviewOpen, setReviewOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  // =====================================================
  // RETURN STATES
  // =====================================================

  const [returnOpen, setReturnOpen] = useState(false);

  const [selectedReturnProduct, setSelectedReturnProduct] = useState(null);

  const [returnRequests, setReturnRequests] = useState([]);

  // =====================================================
  // CANCEL ORDER STATES
  // =====================================================

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const [cancelling, setCancelling] = useState(false);

  const [currentOrder, setCurrentOrder] = useState(order);

  // =====================================================
  // UPDATE LOCAL ORDER
  // =====================================================

  useEffect(() => {
    setCurrentOrder(order);
  }, [order]);

  // =====================================================
  // NO ORDER
  // =====================================================

  if (!currentOrder) {
    return (
      <Card
        elevation={0}
        sx={{
          width: "100%",
          minHeight: 620,
          borderRadius: "24px",
          border: "1px solid #E8E1D8",
          backgroundColor: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            color: "#777168",
            fontSize: 15,
          }}
        >
          Order details not available.
        </Typography>
      </Card>
    );
  }

  // =====================================================
  // ORDER DATA
  // =====================================================

  const items = currentOrder.items || [];

  const shippingAddress = currentOrder.shippingAddress || {};

  const pricing = currentOrder.pricing || {};

  const orderId =
    currentOrder._id || currentOrder.id || currentOrder.orderId || "";

  const orderNumber =
    currentOrder.orderNumber ||
    currentOrder.orderId ||
    currentOrder._id ||
    currentOrder.id ||
    "-";

  const orderDate =
    currentOrder.createdAt || currentOrder.orderDate || currentOrder.date;

  const status = currentOrder.status || "Processing";

  // =====================================================
  // LOAD RETURN REQUESTS
  // =====================================================

  const loadReturnRequests = async () => {
    try {
      const data = await getReturnRequests();

      const allReturns = Array.isArray(data) ? data : [];

      // Filter only this order's returns

      const orderReturns = allReturns.filter((returnRequest) => {
        const returnOrderId =
          returnRequest.orderId ||
          returnRequest.order?._id ||
          returnRequest.order?.id ||
          "";

        const returnOrderNumber = returnRequest.orderNumber || "";

        return (
          String(returnOrderId) === String(orderId) ||
          String(returnOrderNumber) === String(orderNumber)
        );
      });

      setReturnRequests(orderReturns);
    } catch (error) {
      console.error("Failed to load return requests:", error);

      setReturnRequests([]);
    }
  };

  useEffect(() => {
    if (orderId) {
      loadReturnRequests();
    }
  }, [orderId, orderNumber]);

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formattedDate = orderDate
    ? new Date(orderDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Date unavailable";

  // =====================================================
  // PAYMENT
  // =====================================================

  const paymentMethod =
    currentOrder.paymentMethod || currentOrder.payment || "Online";

  const formattedPayment =
    String(paymentMethod).toLowerCase() === "cod"
      ? "Cash on Delivery"
      : paymentMethod;

  const paymentStatus =
    currentOrder.paymentStatus || currentOrder.payment?.status || "Pending";

  // =====================================================
  // DELIVERY
  // =====================================================

  const deliveryMethod =
    currentOrder.deliveryMethod || currentOrder.delivery || "Standard";

  // =====================================================
  // CUSTOMER / SHIPPING ADDRESS
  // =====================================================

  const fullName =
    shippingAddress.fullName ||
    currentOrder.customerName ||
    currentOrder.userName ||
    currentOrder.name ||
    "";

  const phone =
    shippingAddress.contactNumber ||
    shippingAddress.phone ||
    currentOrder.customerPhone ||
    currentOrder.userPhone ||
    currentOrder.phone ||
    "";

  const email =
    shippingAddress.email ||
    currentOrder.customerEmail ||
    currentOrder.userEmail ||
    currentOrder.email ||
    "";

  const addressLine =
    shippingAddress.addressLine || shippingAddress.address || "";

  const city = shippingAddress.city || "";

  const state = shippingAddress.state || "";

  const pincode = shippingAddress.pincode || "";

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (statusValue) => {
    const normalizedStatus = String(statusValue || "Processing").toLowerCase();

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

    if (normalizedStatus === "cancelled" || normalizedStatus === "canceled") {
      return {
        color: "#7A4038",
        backgroundColor: "#F7E9E6",
        borderColor: "#E8CFC9",
      };
    }

    if (normalizedStatus === "approved") {
      return {
        color: "#35618D",
        backgroundColor: "#EAF2FA",
        borderColor: "#C9DCEC",
      };
    }

    if (normalizedStatus === "refunded") {
      return {
        color: "#2F5D45",
        backgroundColor: "#EAF3EC",
        borderColor: "#CFE2D4",
      };
    }

    return {
      color: "#655842",
      backgroundColor: "#F5F1E9",
      borderColor: "#E5DED0",
    };
  };

  const statusStyle = getStatusStyle(status);

  // =====================================================
  // ITEM TOTAL
  // =====================================================

  const getItemTotal = (item) => {
    if (item.total !== undefined && item.total !== null) {
      return Number(item.total) || 0;
    }

    return (Number(item.price) || 0) * (Number(item.quantity) || 1);
  };

  // =====================================================
  // ORDER TOTAL
  // =====================================================

  const getOrderTotal = () => {
    if (pricing.total !== undefined && pricing.total !== null) {
      return Number(pricing.total) || 0;
    }

    if (
      currentOrder.totalAmount !== undefined &&
      currentOrder.totalAmount !== null
    ) {
      return Number(currentOrder.totalAmount) || 0;
    }

    if (currentOrder.total !== undefined && currentOrder.total !== null) {
      return Number(currentOrder.total) || 0;
    }

    return items.reduce((total, item) => total + getItemTotal(item), 0);
  };

  // =====================================================
  // PRODUCT IMAGE
  // =====================================================

  const getProductImage = (item) => {
    return item?.thumbnail || item?.image || item?.images?.[0] || "";
  };

  // =====================================================
  // GET PRODUCT ID
  // =====================================================

  const getProductId = (item) => {
    return item?.productId || item?._id || item?.id || "";
  };

  // =====================================================
  // GET RETURN FOR PRODUCT
  // =====================================================

  const getProductReturn = (item) => {
    const productId = getProductId(item);

    return (
      returnRequests.find((returnRequest) => {
        const returnProductId =
          returnRequest.productId ||
          returnRequest.product?._id ||
          returnRequest.product?.id ||
          "";

        return String(returnProductId) === String(productId);
      }) || null
    );
  };

  // =====================================================
  // RETURN STATUS COLOR
  // =====================================================

  const getReturnStatusColor = (returnStatus) => {
    const normalized = String(returnStatus || "Pending").toLowerCase();

    if (normalized === "pending") {
      return {
        color: "#8A641D",
        backgroundColor: "#FFF6DD",
        borderColor: "#F0DFA8",
      };
    }

    if (normalized === "approved") {
      return {
        color: "#35618D",
        backgroundColor: "#EAF2FA",
        borderColor: "#C9DCEC",
      };
    }

    if (normalized === "rejected") {
      return {
        color: "#8A3E36",
        backgroundColor: "#FBEAE7",
        borderColor: "#EFCFC9",
      };
    }

    if (normalized === "refunded" || normalized === "refund completed") {
      return {
        color: "#2F5D45",
        backgroundColor: "#EAF3EC",
        borderColor: "#CFE2D4",
      };
    }

    return {
      color: "#655842",
      backgroundColor: "#F5F1E9",
      borderColor: "#E5DED0",
    };
  };

  // =====================================================
  // WRITE REVIEW
  // =====================================================

  const handleWriteReview = (item) => {
    setSelectedProduct(item);

    setReviewOpen(true);
  };

  const handleCloseReview = () => {
    setReviewOpen(false);

    setSelectedProduct(null);
  };

  // =====================================================
  // REQUEST RETURN
  // =====================================================

  const handleRequestReturn = (item) => {
    setSelectedReturnProduct(item);

    setReturnOpen(true);
  };

  const handleCloseReturn = () => {
    setReturnOpen(false);

    setSelectedReturnProduct(null);
  };

  // =====================================================
  // SUBMIT RETURN REQUEST
  // =====================================================

  const handleSubmitReturn = async (returnData) => {
    try {
      if (!selectedReturnProduct) {
        throw new Error("No product selected for return.");
      }

      const productId = getProductId(selectedReturnProduct);

      const completeReturnData = {
        // ORDER

        orderId,

        orderNumber,

        // PRODUCT

        productId,

        productName:
          selectedReturnProduct?.productName ||
          selectedReturnProduct?.name ||
          "",

        productImage: getProductImage(selectedReturnProduct),

        productSize: selectedReturnProduct?.size || "",

        quantity: selectedReturnProduct?.quantity || 1,

        // CUSTOMER

        customerName: fullName,

        customerEmail: email,

        customerPhone: phone,

        // REFUND

        refundAmount: getItemTotal(selectedReturnProduct),

        // RETURN DATA

        ...returnData,

        // DEFAULT STATUS

        status: "Pending",
      };

      // ===============================================
      // SAVE RETURN REQUEST
      // ===============================================

      const savedReturn = await createReturnRequest(completeReturnData);

      // Update UI immediately

      setReturnRequests((prev) => [...prev, savedReturn]);

      handleCloseReturn();

      return savedReturn;
    } catch (error) {
      console.error("FAILED TO SUBMIT RETURN:", error);

      throw error;
    }
  };

  // =====================================================
  // SUBMIT REVIEW
  // =====================================================

  const handleSubmitReview = async (reviewData) => {
    if (!selectedProduct) {
      throw new Error("No product selected for review.");
    }

    try {
      const productId = getProductId(selectedProduct);

      if (!orderId) {
        throw new Error("Order ID is missing.");
      }

      if (!productId) {
        throw new Error("Product ID is missing.");
      }

      if (!fullName) {
        throw new Error("Customer name is missing.");
      }

      const review = {
        orderId,

        orderNumber,

        productId,

        productName:
          selectedProduct?.productName || selectedProduct?.name || "",

        productImage: getProductImage(selectedProduct),

        productSize: selectedProduct?.size || "",

        customerName: fullName,

        customerEmail: email,

        customerPhone: phone,

        rating: Number(reviewData?.rating),

        comment: reviewData?.comment?.trim() || "",
      };

      const savedReview = await createReview(review);

      if (onReviewSubmitted) {
        await onReviewSubmitted(savedReview);
      }

      handleCloseReview();

      return savedReview;
    } catch (error) {
      console.error("FAILED TO SUBMIT REVIEW:", error);

      throw error;
    }
  };

  // =====================================================
  // CANCEL ORDER
  // =====================================================

  const handleCancelOrder = async () => {
    try {
      if (!orderId) {
        throw new Error("Order ID is missing.");
      }

      setCancelling(true);

      // ===============================================
      // UPDATE ORDER STATUS IN DATABASE
      // ===============================================

      const updatedOrder = await updateOrderStatus(
        orderId,
        "Cancelled",
        paymentStatus,
      );

      // ===============================================
      // UPDATE UI
      // ===============================================

      setCurrentOrder(updatedOrder);

      // ===============================================
      // UPDATE PARENT PAGE / MY ORDERS
      // ===============================================

      if (onOrderUpdated) {
        await onOrderUpdated(updatedOrder);
      }

      setCancelDialogOpen(false);
    } catch (error) {
      console.error("Failed to cancel order:", error);
    } finally {
      setCancelling(false);
    }
  };

  // =====================================================
  // ORDER ACTION CHECKS
  // =====================================================

  const normalizedOrderStatus = String(status || "")
    .toLowerCase()
    .trim();

  const isCancelled =
    normalizedOrderStatus === "cancelled" ||
    normalizedOrderStatus === "canceled";

  const isDelivered = normalizedOrderStatus === "delivered";

  // =====================================================
  // CANCEL ORDER
  //
  // Customer can cancel only before
  // the order is delivered.
  // =====================================================

  const canCancelOrder = !isCancelled && !isDelivered;

  // =====================================================
  // REQUEST RETURN
  //
  // Customer can request a return only
  // after the order is delivered.
  // =====================================================

  const canRequestReturn = isDelivered;

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <>
      <Card
        elevation={0}
        sx={{
          width: "100%",
          borderRadius: "24px",
          border: "1px solid #E8E1D8",
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
        }}
      >
        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <Box
          sx={{
            px: {
              xs: 2.5,
              sm: 3,
              md: 4,
            },

            py: 2.5,

            background: "linear-gradient(135deg, #F4EEE5 0%, #EEE7DC 100%)",

            borderBottom: "1px solid #E5DDD1",
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
                Order Details
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,

                  fontSize: 13,

                  color: "#777168",
                }}
              >
                Order #{String(orderNumber).slice(-6)}
              </Typography>

              <Typography
                sx={{
                  mt: 0.4,

                  fontSize: 13,

                  color: "#777168",
                }}
              >
                Placed on {formattedDate}
              </Typography>
            </Box>

            <Chip
              label={status}
              size="small"
              sx={{
                height: 40,

                px: 0.8,

                ml: {
                  xs: 0,
                  sm: "auto",
                },

                mt: {
                  xs: 2,
                  sm: 0,
                },

                fontSize: 14,

                fontWeight: 600,

                color: statusStyle.color,

                backgroundColor: statusStyle.backgroundColor,

                border: `1px solid ${statusStyle.borderColor}`,

                borderRadius: "20px",

                textTransform: "capitalize",
              }}
            />
          </Stack>
        </Box>

        {/* =================================================
            CONTENT
        ================================================= */}

        <Box
          sx={{
            p: {
              xs: 2,
              md: 3,
            },

            backgroundColor: "#FCFAF7",
          }}
        >
          {/* =================================================
              ORDER ITEMS
          ================================================= */}

          <Paper
            elevation={0}
            sx={{
              width: "100%",

              backgroundColor: "#FFFFFF",

              border: "1px solid #E9E2D8",

              borderRadius: "18px",

              overflow: "hidden",

              mb: 2.5,
            }}
          >
            <Box
              sx={{
                px: {
                  xs: 2,
                  md: 3,
                },

                py: 2,

                backgroundColor: "#FBF9F5",
              }}
            >
              <Box
                sx={{
                  display: "flex",

                  alignItems: "center",

                  gap: 1,
                }}
              >
                <ReceiptLongOutlinedIcon
                  sx={{
                    fontSize: 20,

                    color: "#1E2F2B",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 16,

                    fontWeight: 700,

                    color: "#1E2F2B",
                  }}
                >
                  Order Items
                </Typography>
              </Box>
            </Box>

            <Divider />

            <Box
              sx={{
                px: {
                  xs: 2,
                  md: 3,
                },

                py: 1,
              }}
            >
              <Stack spacing={0}>
                {items.length > 0 ? (
                  items.map((item, index) => {
                    const itemTotal = getItemTotal(item);

                    const productReturn = getProductReturn(item);

                    const returnStatus = productReturn?.status || "Pending";

                    const returnStatusStyle =
                      getReturnStatusColor(returnStatus);

                    return (
                      <React.Fragment key={getProductId(item) || index}>
                        <Box
                          sx={{
                            width: "100%",

                            display: "flex",

                            alignItems: "center",

                            gap: 2,

                            py: 2,
                          }}
                        >
                          {/* PRODUCT IMAGE */}

                          <Box
                            sx={{
                              width: 76,

                              height: 76,

                              flexShrink: 0,

                              borderRadius: "12px",

                              backgroundColor: "#F5F2ED",

                              border: "1px solid #ECE5DB",

                              display: "flex",

                              alignItems: "center",

                              justifyContent: "center",

                              overflow: "hidden",
                            }}
                          >
                            {getProductImage(item) ? (
                              <Box
                                component="img"
                                src={getProductImage(item)}
                                alt={item.productName || item.name || "Product"}
                                sx={{
                                  width: "100%",

                                  height: "100%",

                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <ShoppingBagOutlinedIcon
                                sx={{
                                  color: "#B8B0A6",

                                  fontSize: 30,
                                }}
                              />
                            )}
                          </Box>

                          {/* PRODUCT DETAILS */}

                          <Box
                            sx={{
                              minWidth: 0,

                              flex: 1,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 15,

                                fontWeight: 650,

                                color: "#1E2F2B",

                                lineHeight: 1.4,
                              }}
                            >
                              {item.productName ||
                                item.name ||
                                "GlowCare Product"}
                            </Typography>

                            {item.size && (
                              <Typography
                                sx={{
                                  mt: 0.4,

                                  fontSize: 13,

                                  color: "#777168",
                                }}
                              >
                                Size: {item.size}
                              </Typography>
                            )}

                            <Typography
                              sx={{
                                mt: 0.4,

                                fontSize: 13,

                                color: "#777168",
                              }}
                            >
                              Qty: {item.quantity || 1}
                            </Typography>

                            <Typography
                              sx={{
                                mt: 0.4,

                                fontSize: 13,

                                color: "#777168",
                              }}
                            >
                              ₹{Number(item.price || 0).toLocaleString("en-IN")}{" "}
                              each
                            </Typography>

                            {/* =================================
                                  RETURN STATUS
                              ================================= */}

                            {productReturn && (
                              <Box
                                sx={{
                                  mt: 1.2,
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: 11,

                                    color: "#777168",

                                    mb: 0.5,
                                  }}
                                >
                                  Return Request
                                </Typography>

                                <Chip
                                  size="small"
                                  label={`Return: ${returnStatus}`}
                                  sx={{
                                    height: 25,

                                    fontSize: 11,

                                    fontWeight: 600,

                                    color: returnStatusStyle.color,

                                    backgroundColor:
                                      returnStatusStyle.backgroundColor,

                                    border: `1px solid ${returnStatusStyle.borderColor}`,
                                  }}
                                />

                                {productReturn.refundStatus && (
                                  <Chip
                                    size="small"
                                    label={`Refund: ${productReturn.refundStatus}`}
                                    sx={{
                                      height: 25,

                                      ml: 0.7,

                                      mt: {
                                        xs: 0.7,
                                        sm: 0,
                                      },

                                      fontSize: 11,

                                      fontWeight: 600,

                                      color: "#2F5D45",

                                      backgroundColor: "#EAF3EC",

                                      border: "1px solid #CFE2D4",
                                    }}
                                  />
                                )}
                              </Box>
                            )}
                          </Box>

                          {/* PRICE + ACTIONS */}

                          <Box
                            sx={{
                              textAlign: "right",

                              flexShrink: 0,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 15,

                                fontWeight: 700,

                                color: "#1E2F2B",

                                mb: 0.8,

                                whiteSpace: "nowrap",
                              }}
                            >
                              ₹{itemTotal.toLocaleString("en-IN")}
                            </Typography>

                            <Stack
                              direction="column"
                              spacing={0.5}
                              alignItems="flex-end"
                            >
                              {/* WRITE REVIEW */}

                              <Button
                                size="small"
                                startIcon={
                                  <RateReviewOutlinedIcon
                                    sx={{
                                      fontSize: "16px !important",
                                    }}
                                  />
                                }
                                onClick={() => handleWriteReview(item)}
                                sx={{
                                  textTransform: "none",

                                  color: "#1E2F2B",

                                  fontSize: 12,

                                  fontWeight: 600,

                                  borderRadius: "9px",

                                  px: 1,

                                  "&:hover": {
                                    backgroundColor: "#F2EEE8",
                                  },
                                }}
                              >
                                Write a Review
                              </Button>

                              {/* ================================================
    REQUEST RETURN
================================================ */}

                              {canRequestReturn &&
                                (!productReturn ? (
                                  <Button
                                    size="small"
                                    startIcon={
                                      <AssignmentReturnOutlinedIcon
                                        sx={{
                                          fontSize: "16px !important",
                                        }}
                                      />
                                    }
                                    onClick={() => handleRequestReturn(item)}
                                    sx={{
                                      textTransform: "none",

                                      color: "#8A5C55",

                                      fontSize: 12,

                                      fontWeight: 600,

                                      borderRadius: "9px",

                                      px: 1,

                                      "&:hover": {
                                        backgroundColor: "#F8EEEC",

                                        color: "#7A4038",
                                      },
                                    }}
                                  >
                                    Request Return
                                  </Button>
                                ) : (
                                  <Box
                                    sx={{
                                      mt: 0.5,
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        fontSize: 11,

                                        fontWeight: 600,

                                        color: returnStatusStyle.color,
                                      }}
                                    >
                                      Return Status: {returnStatus}
                                    </Typography>

                                    {productReturn?.refundAmount !==
                                      undefined &&
                                      productReturn?.refundAmount !== null && (
                                        <Typography
                                          sx={{
                                            mt: 0.3,

                                            fontSize: 11,

                                            color: "#777168",
                                          }}
                                        >
                                          Refund: ₹
                                          {Number(
                                            productReturn.refundAmount,
                                          ).toLocaleString("en-IN")}
                                        </Typography>
                                      )}
                                  </Box>
                                ))}
                            </Stack>
                          </Box>
                        </Box>

                        {index < items.length - 1 && (
                          <Divider
                            sx={{
                              borderColor: "#EEE8DF",
                            }}
                          />
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <Box
                    sx={{
                      py: 4,

                      textAlign: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#777168",

                        fontSize: 14,
                      }}
                    >
                      No product details available.
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Box>
          </Paper>

          {/* =================================================
              SHIPPING / DELIVERY / PAYMENT
          ================================================= */}

          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                md: "1.3fr 1fr",
              },

              gap: 2.5,

              mb: 2.5,
            }}
          >
            {/* SHIPPING */}

            <Paper
              elevation={0}
              sx={{
                p: {
                  xs: 2,
                  md: 2.5,
                },

                borderRadius: "18px",

                border: "1px solid #E9E2D8",

                backgroundColor: "#FFFFFF",
              }}
            >
              <Box
                sx={{
                  display: "flex",

                  alignItems: "center",

                  gap: 1,

                  mb: 1.8,
                }}
              >
                <LocationOnOutlinedIcon
                  sx={{
                    fontSize: 20,

                    color: "#1E2F2B",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 16,

                    fontWeight: 700,

                    color: "#1E2F2B",
                  }}
                >
                  Shipping Address
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 2,

                  borderRadius: "12px",

                  backgroundColor: "#F8F6F2",

                  border: "1px solid #E8E0D6",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 14,

                    fontWeight: 700,

                    color: "#333",
                  }}
                >
                  {fullName || "-"}
                </Typography>

                {phone && (
                  <Typography
                    sx={{
                      mt: 0.5,

                      fontSize: 13,

                      color: "#666",
                    }}
                  >
                    {phone}
                  </Typography>
                )}

                {email && (
                  <Typography
                    sx={{
                      mt: 0.4,

                      fontSize: 13,

                      color: "#666",

                      wordBreak: "break-word",
                    }}
                  >
                    {email}
                  </Typography>
                )}

                {addressLine && (
                  <Typography
                    sx={{
                      mt: 1,

                      fontSize: 13,

                      color: "#555",

                      lineHeight: 1.6,
                    }}
                  >
                    {addressLine}
                  </Typography>
                )}

                {(city || state || pincode) && (
                  <Typography
                    sx={{
                      mt: 0.3,

                      fontSize: 13,

                      color: "#555",
                    }}
                  >
                    {city}
                    {city && state ? ", " : ""}
                    {state}
                    {pincode ? ` - ${pincode}` : ""}
                  </Typography>
                )}

                <Typography
                  sx={{
                    mt: 0.3,

                    fontSize: 13,

                    color: "#555",
                  }}
                >
                  India
                </Typography>
              </Box>
            </Paper>

            {/* DELIVERY + PAYMENT */}

            <Stack spacing={2.5}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,

                  borderRadius: "18px",

                  border: "1px solid #E9E2D8",

                  backgroundColor: "#FFFFFF",
                }}
              >
                <Box
                  sx={{
                    display: "flex",

                    alignItems: "center",

                    gap: 1,

                    mb: 1,
                  }}
                >
                  <LocalShippingOutlinedIcon
                    sx={{
                      fontSize: 20,

                      color: "#1E2F2B",
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 15,

                      fontWeight: 700,

                      color: "#1E2F2B",
                    }}
                  >
                    Delivery Method
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontSize: 13,

                    color: "#777168",

                    textTransform: "capitalize",
                  }}
                >
                  {deliveryMethod}
                </Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 2.5,

                  borderRadius: "18px",

                  border: "1px solid #E9E2D8",

                  backgroundColor: "#FFFFFF",
                }}
              >
                <Box
                  sx={{
                    display: "flex",

                    alignItems: "center",

                    gap: 1,

                    mb: 1,
                  }}
                >
                  <PaymentOutlinedIcon
                    sx={{
                      fontSize: 20,

                      color: "#1E2F2B",
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 15,

                      fontWeight: 700,

                      color: "#1E2F2B",
                    }}
                  >
                    Payment Method
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontSize: 13,

                    color: "#777168",
                  }}
                >
                  {formattedPayment}
                </Typography>
              </Paper>
            </Stack>
          </Box>

          {/* =================================================
              PRICE DETAILS
          ================================================= */}

          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 2,
                md: 2.5,
              },

              borderRadius: "18px",

              border: "1px solid #E9E2D8",

              backgroundColor: "#F8F6F2",

              mb: 2.5,
            }}
          >
            <Typography
              sx={{
                fontSize: 17,

                fontWeight: 700,

                color: "#1E2F2B",

                mb: 2,
              }}
            >
              Price Details
            </Typography>

            <Stack spacing={1.2}>
              <Box
                sx={{
                  display: "flex",

                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    color: "#666",

                    fontSize: 13,
                  }}
                >
                  Subtotal
                </Typography>

                <Typography
                  sx={{
                    color: "#333",

                    fontSize: 13,
                  }}
                >
                  ₹{Number(pricing.subtotal || 0).toLocaleString("en-IN")}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",

                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    color: "#666",

                    fontSize: 13,
                  }}
                >
                  Discount
                </Typography>

                <Typography
                  sx={{
                    color: "#2E7D32",

                    fontSize: 13,
                  }}
                >
                  - ₹{Number(pricing.discount || 0).toLocaleString("en-IN")}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",

                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    color: "#666",

                    fontSize: 13,
                  }}
                >
                  GST
                </Typography>

                <Typography
                  sx={{
                    color: "#333",

                    fontSize: 13,
                  }}
                >
                  ₹{Number(pricing.gst || 0).toLocaleString("en-IN")}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",

                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    color: "#666",

                    fontSize: 13,
                  }}
                >
                  Shipping
                </Typography>

                <Typography
                  sx={{
                    color: "#333",

                    fontSize: 13,
                  }}
                >
                  {Number(pricing.shipping || 0) === 0
                    ? "Free"
                    : `₹${Number(pricing.shipping || 0).toLocaleString(
                        "en-IN",
                      )}`}
                </Typography>
              </Box>
            </Stack>

            <Divider
              sx={{
                my: 2,
              }}
            />

            <Box
              sx={{
                display: "flex",

                justifyContent: "space-between",

                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: 15,

                  fontWeight: 700,

                  color: "#1E2F2B",
                }}
              >
                Total
              </Typography>

              <Typography
                sx={{
                  fontSize: 20,

                  fontWeight: 700,

                  color: "#1E2F2B",
                }}
              >
                ₹{getOrderTotal().toLocaleString("en-IN")}
              </Typography>
            </Box>
          </Paper>

          {/* =================================================
              BOTTOM BUTTONS
          ================================================= */}

          <Box
            sx={{
              display: "flex",

              justifyContent: "space-between",

              alignItems: "center",

              gap: 2,

              flexWrap: "wrap",
            }}
          >
            {/* BACK BUTTON */}

            <Button
              startIcon={<ArrowBackRoundedIcon />}
              onClick={onBack}
              variant="outlined"
              sx={{
                minWidth: 160,

                height: 42,

                borderRadius: "12px",

                textTransform: "none",

                fontSize: 13,

                fontWeight: 600,

                color: "#1E2F2B",

                borderColor: "#1E2F2B",

                "&:hover": {
                  borderColor: "#1E2F2B",

                  backgroundColor: "#F2EEE8",
                },
              }}
            >
              Back to My Orders
            </Button>

            {/* CANCEL ORDER */}

            {canCancelOrder && (
              <Button
                startIcon={<CancelOutlinedIcon />}
                onClick={() => setCancelDialogOpen(true)}
                variant="outlined"
                sx={{
                  minWidth: 145,

                  height: 42,

                  borderRadius: "12px",

                  textTransform: "none",

                  fontSize: 13,

                  fontWeight: 600,

                  color: "#B64035",

                  borderColor: "#D8A29B",

                  "&:hover": {
                    borderColor: "#B64035",

                    backgroundColor: "#FBEAE7",
                  },
                }}
              >
                Cancel Order
              </Button>
            )}
          </Box>
        </Box>
      </Card>

      {/* =====================================================
          REVIEW DIALOG
      ===================================================== */}

      <ReviewDialog
        open={reviewOpen}
        onClose={handleCloseReview}
        product={selectedProduct}
        order={currentOrder}
        onSubmit={handleSubmitReview}
      />

      {/* =====================================================
          RETURN DIALOG
      ===================================================== */}

      <ReturnDialog
        open={returnOpen}
        onClose={handleCloseReturn}
        product={selectedReturnProduct}
        order={currentOrder}
        onSubmit={handleSubmitReturn}
      />

      {/* =====================================================
          CANCEL ORDER CONFIRMATION
      ===================================================== */}

      <Dialog
        open={cancelDialogOpen}
        onClose={cancelling ? undefined : () => setCancelDialogOpen(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: "20px",

            p: 1,
          },
        }}
      >
        <DialogTitle>
          <Typography
            sx={{
              fontSize: 20,

              fontWeight: 700,

              color: "#1E2F2B",
            }}
          >
            Cancel Order?
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Typography
            sx={{
              fontSize: 14,

              color: "#777168",

              lineHeight: 1.7,
            }}
          >
            Are you sure you want to cancel this order? This action will update
            the order status to Cancelled.
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,

            pb: 2,

            gap: 1,
          }}
        >
          <Button
            onClick={() => setCancelDialogOpen(false)}
            disabled={cancelling}
            sx={{
              textTransform: "none",

              color: "#777168",
            }}
          >
            No, Keep Order
          </Button>

          <Button
            variant="contained"
            onClick={handleCancelOrder}
            disabled={cancelling}
            sx={{
              textTransform: "none",

              borderRadius: "10px",

              backgroundColor: "#B64035",

              boxShadow: "none",

              "&:hover": {
                backgroundColor: "#963229",

                boxShadow: "none",
              },
            }}
          >
            {cancelling ? "Cancelling..." : "Yes, Cancel"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrderDetails;
