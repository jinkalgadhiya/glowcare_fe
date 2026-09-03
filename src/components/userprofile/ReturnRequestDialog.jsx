import React, { useState, useEffect } from "react";

import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  TextField,
  MenuItem,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import { createReturnRequest } from "../../database/returnService";

const returnReasons = [
  "Received a damaged product",
  "Received the wrong product",
  "Product is defective",
  "Product is not as expected",
  "Changed my mind",
  "Other",
];

const ReturnRequestDialog = ({ open, onClose, product, order, onSubmit }) => {
  // =====================================================
  // FORM DATA
  // =====================================================

  const [reason, setReason] = useState("");

  const [details, setDetails] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // =====================================================
  // RESET FORM
  // =====================================================

  useEffect(() => {
    if (open) {
      setReason("");
      setDetails("");
      setError("");
      setLoading(false);
    }
  }, [open]);

  // =====================================================
  // PRODUCT IMAGE
  // =====================================================

  const getProductImage = () => {
    return product?.thumbnail || product?.image || product?.images?.[0] || "";
  };

  // =====================================================
  // PRODUCT NAME
  // =====================================================

  const productName =
    product?.productName || product?.name || "GlowCare Product";

  // =====================================================
  // PRODUCT QUANTITY
  // =====================================================

  const productQuantity = Number(product?.quantity || 1);

  // =====================================================
  // PRODUCT UNIT PRICE
  // =====================================================

  const productPrice = Number(product?.price || 0);

  // =====================================================
  // SELECTED PRODUCT ORIGINAL TOTAL
  // =====================================================

  const productOriginalTotal =
    product?.total !== undefined && product?.total !== null
      ? Number(product.total)
      : productPrice * productQuantity;

  // =====================================================
  // ALL ORDER ITEMS
  // =====================================================

  const orderItems = order?.items || [];

  // =====================================================
  // GET ITEM ORIGINAL TOTAL
  // =====================================================

  const getItemOriginalTotal = (item) => {
    if (item?.total !== undefined && item?.total !== null) {
      return Number(item.total) || 0;
    }

    const itemPrice = Number(item?.price || 0);

    const itemQuantity = Number(item?.quantity || 1);

    return itemPrice * itemQuantity;
  };

  // =====================================================
  // ORDER ORIGINAL PRODUCT TOTAL
  //
  // This is the total before discount/shipping/etc.
  // =====================================================

  const orderProductsTotal = orderItems.reduce((total, item) => {
    return total + getItemOriginalTotal(item);
  }, 0);

  // =====================================================
  // GET FINAL AMOUNT PAID BY CUSTOMER
  // =====================================================

  const getOrderPaidAmount = () => {
    // FIRST PRIORITY:
    // pricing.total

    if (order?.pricing?.total !== undefined && order?.pricing?.total !== null) {
      return Number(order.pricing.total) || 0;
    }

    // SECOND PRIORITY:
    // totalAmount

    if (order?.totalAmount !== undefined && order?.totalAmount !== null) {
      return Number(order.totalAmount) || 0;
    }

    // THIRD PRIORITY:
    // total

    if (order?.total !== undefined && order?.total !== null) {
      return Number(order.total) || 0;
    }

    // FALLBACK:
    // Calculate from pricing

    const subtotal = Number(
      order?.pricing?.subtotal || orderProductsTotal || 0,
    );

    const discount = Number(order?.pricing?.discount || 0);

    const gst = Number(order?.pricing?.gst || 0);

    const shipping = Number(order?.pricing?.shipping || 0);

    return subtotal - discount + gst + shipping;
  };

  // =====================================================
  // ACTUAL TOTAL PAID BY CUSTOMER
  // =====================================================

  const orderPaidAmount = getOrderPaidAmount();

  // =====================================================
  // PRODUCT SHARE OF ORDER
  //
  // Example:
  //
  // Product A = ₹500
  // Product B = ₹500
  //
  // Product A share = 50%
  // =====================================================

  const productShare =
    orderProductsTotal > 0 ? productOriginalTotal / orderProductsTotal : 1;

  // =====================================================
  // ESTIMATED PRODUCT AMOUNT ACTUALLY PAID
  //
  // This includes proportional effects of:
  //
  // Discount
  // GST
  // Shipping
  // Express Delivery
  // Other pricing adjustments
  // =====================================================

  const refundAmount = Math.round(orderPaidAmount * productShare);

  // =====================================================
  // CHECK IF SINGLE PRODUCT ORDER
  // =====================================================

  const isSingleProductOrder = orderItems.length === 1;

  // =====================================================
  // SUBMIT RETURN
  // =====================================================

  const handleSubmit = async () => {
    if (!reason) {
      setError("Please select a reason for your return.");

      return;
    }

    try {
      setLoading(true);

      setError("");

      // ==================================================
      // GET ORDER ID
      // ==================================================

      const orderId = order?._id || order?.id || order?.orderId;

      if (!orderId) {
        throw new Error("Order information not found.");
      }

      // ==================================================
      // GET PRODUCT ID
      // ==================================================

      const productId = product?.productId || product?._id || product?.id;

      if (!productId) {
        throw new Error("Product information not found.");
      }

      // ==================================================
      // GET CUSTOMER INFORMATION
      // ==================================================

      const shippingAddress = order?.shippingAddress || {};

      const customerName =
        shippingAddress?.fullName ||
        order?.customerName ||
        order?.userName ||
        order?.name ||
        "";

      const customerEmail =
        shippingAddress?.email ||
        order?.customerEmail ||
        order?.userEmail ||
        order?.email ||
        "";

      const customerPhone =
        shippingAddress?.contactNumber ||
        shippingAddress?.phone ||
        order?.customerPhone ||
        order?.userPhone ||
        order?.phone ||
        "";

      // ==================================================
      // GET ORDER NUMBER
      // ==================================================

      const orderNumber =
        order?.orderNumber || order?.orderId || order?._id || order?.id || "";

      // ==================================================
      // VALIDATE CUSTOMER NAME
      // ==================================================

      if (!customerName) {
        throw new Error("Customer name is missing from the order.");
      }

      // ==================================================
      // CREATE RETURN DATA
      // ==================================================

      const returnData = {
        // ORDER

        orderId,
        orderNumber,

        // PRODUCT

        productId,

        productName,

        productImage: getProductImage(),

        productSize: product?.size || "",

        quantity: productQuantity,

        // CUSTOMER

        customerName,

        customerEmail,

        customerPhone,

        // RETURN

        reason,

        details: details.trim(),

        // PAYMENT

        productPrice,

        paidAmount: refundAmount,

        refundAmount,

        // STATUS

        status: "Pending",

        refundStatus: "Pending",
      };

      // ==================================================
      // DEBUG
      // ==================================================

      console.log("RETURN DATA:", returnData);

      // ==================================================
      // SEND TO BACKEND
      // ==================================================

      const response = await createReturnRequest(returnData);

      // ==================================================
      // OPTIONAL PARENT CALLBACK
      // ==================================================

      if (onSubmit) {
        await onSubmit(response);
      }

      // ==================================================
      // CLOSE DIALOG
      // ==================================================

      onClose();
    } catch (error) {
      console.error("Failed to submit return request:", error);

      setError(
        error?.message ||
          error?.data?.message ||
          "Unable to submit your return request. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // RETURN UI
  // =====================================================

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "22px",
          overflow: "hidden",
        },
      }}
    >
      {/* HEADER */}

      <DialogTitle
        sx={{
          px: {
            xs: 2.5,
            sm: 3,
          },
          py: 2.2,

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          background: "linear-gradient(135deg, #F8F3EC 0%, #EFE7DC 100%)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,

              borderRadius: "12px",

              backgroundColor: "#1E2F2B",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AssignmentReturnOutlinedIcon
              sx={{
                color: "#FFFFFF",
                fontSize: 23,
              }}
            />
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 19,
                fontWeight: 700,
                color: "#1E2F2B",
              }}
            >
              Request a Return
            </Typography>

            <Typography
              sx={{
                mt: 0.2,
                fontSize: 12,
                color: "#777168",
              }}
            >
              Submit your return request
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={onClose}
          disabled={loading}
          sx={{
            color: "#6F6961",

            "&:hover": {
              backgroundColor: "rgba(30,47,43,0.06)",
            },
          }}
        >
          <CloseOutlinedIcon />
        </IconButton>
      </DialogTitle>

      {/* CONTENT */}

      <DialogContent
        sx={{
          px: {
            xs: 2.5,
            sm: 3,
          },

          py: 3,

          backgroundColor: "#FCFAF7",
        }}
      >
        {/* PRODUCT INFORMATION */}

        <Box
          sx={{
            p: 2,

            borderRadius: "14px",

            backgroundColor: "#FFFFFF",

            border: "1px solid #E8E1D8",

            display: "flex",
            alignItems: "center",

            gap: 1.8,
          }}
        >
          {/* PRODUCT IMAGE */}

          <Box
            sx={{
              width: 70,
              height: 70,

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
            {getProductImage() ? (
              <Box
                component="img"
                src={getProductImage()}
                alt={productName}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <ShoppingBagOutlinedIcon
                sx={{
                  fontSize: 28,
                  color: "#B8B0A6",
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
                fontWeight: 700,
                color: "#1E2F2B",
              }}
            >
              {productName}
            </Typography>

            {product?.size && (
              <Typography
                sx={{
                  mt: 0.4,
                  fontSize: 13,
                  color: "#777168",
                }}
              >
                Size: {product.size}
              </Typography>
            )}

            <Typography
              sx={{
                mt: 0.3,
                fontSize: 13,
                color: "#777168",
              }}
            >
              Quantity: {productQuantity}
            </Typography>

            {/* ORIGINAL PRODUCT PRICE */}

            <Typography
              sx={{
                mt: 0.6,
                fontSize: 12,
                color: "#777168",
              }}
            >
              Product price: ₹{productOriginalTotal.toLocaleString("en-IN")}
            </Typography>

            {/* ESTIMATED PAID AMOUNT */}

            <Typography
              sx={{
                mt: 0.3,
                fontSize: 15,
                fontWeight: 700,
                color: "#1E2F2B",
              }}
            >
              Estimated paid amount: ₹{refundAmount.toLocaleString("en-IN")}
            </Typography>
          </Box>
        </Box>

        {/* DIVIDER */}

        <Divider
          sx={{
            my: 2.5,
            borderColor: "#E8E1D8",
          }}
        />

        {/* RETURN REASON */}

        <Typography
          sx={{
            mb: 1,
            fontSize: 13,
            fontWeight: 700,
            color: "#1E2F2B",
          }}
        >
          Reason for Return *
        </Typography>

        <TextField
          select
          fullWidth
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
            setError("");
          }}
          disabled={loading}
          SelectProps={{
            displayEmpty: true,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "#FFFFFF",
            },
          }}
        >
          <MenuItem value="" disabled>
            <em>Select a reason</em>
          </MenuItem>

          {returnReasons.map((returnReason) => (
            <MenuItem key={returnReason} value={returnReason}>
              {returnReason}
            </MenuItem>
          ))}
        </TextField>

        {/* ADDITIONAL DETAILS */}

        <Typography
          sx={{
            mt: 2.5,
            mb: 1,
            fontSize: 13,
            fontWeight: 700,
            color: "#1E2F2B",
          }}
        >
          Additional Details
        </Typography>

        <TextField
          fullWidth
          multiline
          minRows={4}
          value={details}
          disabled={loading}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Tell us more about why you want to return this product..."
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "#FFFFFF",
            },
          }}
        />

        {/* ERROR */}

        {error && (
          <Typography
            sx={{
              mt: 1.5,
              fontSize: 13,
              color: "#B0473C",
            }}
          >
            {error}
          </Typography>
        )}

        {/* REFUND SUMMARY */}

        <Box
          sx={{
            mt: 2.5,

            p: 2,

            borderRadius: "14px",

            backgroundColor: "#F4F7F4",

            border: "1px solid #DDE8DF",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#1E2F2B",
                }}
              >
                Estimated Refund
              </Typography>

              <Typography
                sx={{
                  mt: 0.3,
                  fontSize: 12,
                  color: "#777168",
                }}
              >
                Final refund amount will be confirmed after review.
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: 19,
                fontWeight: 700,
                color: "#2F5D45",
                whiteSpace: "nowrap",
                ml: "180px",
              }}
            >
              ₹{refundAmount.toLocaleString("en-IN")}
            </Typography>
          </Stack>
        </Box>
      </DialogContent>

      {/* ACTIONS */}

      <DialogActions
        sx={{
          px: {
            xs: 2.5,
            sm: 3,
          },

          py: 2,

          backgroundColor: "#FFFFFF",

          borderTop: "1px solid #E8E1D8",
        }}
      >
        <Button
          onClick={onClose}
          disabled={loading}
          sx={{
            textTransform: "none",
            color: "#777168",
            fontWeight: 600,
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          variant="contained"
          sx={{
            minWidth: 170,
            height: 42,

            borderRadius: "12px",

            textTransform: "none",

            fontSize: 13,
            fontWeight: 600,

            backgroundColor: "#1E2F2B",

            boxShadow: "0 8px 18px rgba(30,47,43,0.12)",

            "&:hover": {
              backgroundColor: "#294039",
            },
          }}
        >
          {loading ? "Submitting..." : "Submit Return Request"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReturnRequestDialog;
