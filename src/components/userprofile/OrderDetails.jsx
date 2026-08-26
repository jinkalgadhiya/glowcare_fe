import React, { useState } from "react";

import {
  Box,
  Card,
  Chip,
  Stack,
  Typography,
  Button,
  Divider,
  Paper,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import ReviewDialog from "./ReviewDialog";

// =====================================================
// REVIEW API SERVICE
// =====================================================

import { createReview } from "../../database/reviewService";

// =====================================================
// ORDER DETAILS
// =====================================================

const OrderDetails = ({ order, onBack, onReviewSubmitted }) => {
  const [reviewOpen, setReviewOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  // =====================================================
  // NO ORDER
  // =====================================================

  if (!order) {
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

  const items = order.items || [];

  const shippingAddress = order.shippingAddress || {};

  const pricing = order.pricing || {};

  const orderNumber =
    order.orderNumber || order.orderId || order._id || order.id || "-";

  const orderDate = order.createdAt || order.orderDate || order.date;

  const status = order.status || "Processing";

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

  const paymentMethod = order.paymentMethod || order.payment || "Online";

  const formattedPayment =
    String(paymentMethod).toLowerCase() === "cod"
      ? "Cash on Delivery"
      : paymentMethod;

  // =====================================================
  // DELIVERY
  // =====================================================

  const deliveryMethod = order.deliveryMethod || order.delivery || "Standard";

  // =====================================================
  // CUSTOMER / SHIPPING ADDRESS
  // =====================================================

  const fullName =
    shippingAddress.fullName ||
    order.customerName ||
    order.userName ||
    order.name ||
    "";

  const phone =
    shippingAddress.contactNumber ||
    shippingAddress.phone ||
    order.customerPhone ||
    order.userPhone ||
    order.phone ||
    "";

  const email =
    shippingAddress.email ||
    order.customerEmail ||
    order.userEmail ||
    order.email ||
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

    if (normalizedStatus === "out for delivery") {
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

    if (order.totalAmount !== undefined && order.totalAmount !== null) {
      return Number(order.totalAmount) || 0;
    }

    if (order.total !== undefined && order.total !== null) {
      return Number(order.total) || 0;
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
  // WRITE REVIEW
  // =====================================================

  const handleWriteReview = (item) => {
    setSelectedProduct(item);
    setReviewOpen(true);
  };

  // =====================================================
  // CLOSE REVIEW
  // =====================================================

  const handleCloseReview = () => {
    setReviewOpen(false);
    setSelectedProduct(null);
  };

  // =====================================================
  // SUBMIT REVIEW
  // =====================================================

  const handleSubmitReview = async (reviewData) => {
    if (!selectedProduct) {
      throw new Error("No product selected for review.");
    }

    try {
      // =================================================
      // GET ORDER ID
      // =================================================

      const orderId = order?._id || order?.id || order?.orderId || "";

      // =================================================
      // GET PRODUCT ID
      // =================================================

      const productId =
        selectedProduct?.productId ||
        selectedProduct?._id ||
        selectedProduct?.id ||
        "";

      // =================================================
      // VALIDATION
      // =================================================

      if (!orderId) {
        throw new Error("Order ID is missing.");
      }

      if (!productId) {
        throw new Error("Product ID is missing.");
      }

      if (!shippingAddress.fullName) {
        throw new Error("Customer name is missing.");
      }

      // =================================================
      // COMPLETE REVIEW DATA
      // =================================================

      const review = {
        // ==============================
        // ORDER
        // ==============================

        orderId,

        orderNumber,

        // ==============================
        // PRODUCT
        // ==============================

        productId,

        productName:
          selectedProduct?.productName || selectedProduct?.name || "",

        productImage:
          selectedProduct?.thumbnail ||
          selectedProduct?.image ||
          selectedProduct?.images?.[0] ||
          "",

        productSize: selectedProduct?.size || "",

        // ==============================
        // CUSTOMER
        // ==============================

        customerName: shippingAddress?.fullName || "",

        // EMAIL IS OPTIONAL
        customerEmail: shippingAddress?.email || "",

        customerPhone:
          shippingAddress?.contactNumber || shippingAddress?.phone || "",

        // ==============================
        // REVIEW
        // ==============================

        rating: Number(reviewData?.rating),

        comment: reviewData?.comment?.trim() || "",
      };

      // =================================================
      // DEBUG
      // =================================================

      console.log("=================================");

      console.log("⭐ REVIEW DATA BEING SENT:");

      console.log(review);

      console.log("=================================");

      // =================================================
      // SEND TO BACKEND
      // =================================================

      const savedReview = await createReview(review);

      // =================================================
      // SUCCESS
      // =================================================

      console.log("=================================");

      console.log("✅ REVIEW SAVED SUCCESSFULLY:");

      console.log(savedReview);

      console.log("=================================");

      // =================================================
      // OPTIONAL PARENT CALLBACK
      // =================================================

      if (onReviewSubmitted) {
        await onReviewSubmitted(savedReview);
      }

      // =================================================
      // CLOSE DIALOG
      // =================================================

      handleCloseReview();

      return savedReview;
    } catch (error) {
      console.error("❌ FAILED TO SUBMIT REVIEW:", error);

      throw error;
    }
  };

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
        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

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
                Order #{orderNumber}
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
                ml: "auto",
                mt: "20px",
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

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <Box
          sx={{
            p: {
              xs: 2,
              md: 3,
            },
            backgroundColor: "#FCFAF7",
          }}
        >
          {/* =====================================================
              ORDER ITEMS
          ===================================================== */}

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

                    return (
                      <React.Fragment
                        key={item.productId || item._id || item.id || index}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            py: 2,
                          }}
                        >
                          {/* IMAGE */}

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
                          </Box>

                          {/* PRICE */}

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

          {/* =====================================================
              SHIPPING / DELIVERY / PAYMENT
          ===================================================== */}

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
              {/* DELIVERY */}

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

              {/* PAYMENT */}

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

          {/* =====================================================
              PRICE DETAILS
          ===================================================== */}

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

          {/* =====================================================
              BOTTOM BACK BUTTON
          ===================================================== */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
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
        order={order}
        onSubmit={handleSubmitReview}
      />
    </>
  );
};

export default OrderDetails;
