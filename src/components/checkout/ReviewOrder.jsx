import React from "react";

import {
  Box,
  Typography,
  Button,
  Paper,
  Avatar,
  Dialog,
  DialogContent,
  Divider,
} from "@mui/material";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import { useSelector, useDispatch } from "react-redux";

import { createOrder } from "../../database/orderService";

import { clearWholeCart } from "../../redux/cart/cartActions";

const ReviewOrder = ({ checkoutData, backStep }) => {
  const cartItems = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  const [openSuccessDialog, setOpenSuccessDialog] =
    React.useState(false);

  const [placedOrder, setPlacedOrder] = React.useState(null);

  const [placingOrder, setPlacingOrder] =
    React.useState(false);

  // =====================================================
  // SHIPPING DATA
  // =====================================================

  const shippingData = checkoutData?.shipping || {};

  // =====================================================
  // CALCULATE TOTALS
  // =====================================================

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0,
  );

  const shipping = subtotal >= 999 ? 0 : 50;

  const discount = subtotal >= 1500 ? 100 : 0;

  const gst = Math.round(subtotal * 0.05);

  const total =
    subtotal +
    shipping +
    gst -
    discount;

  // =====================================================
  // FORMAT PRICE
  // =====================================================

  const formatPrice = (value) => {
    return Number(value || 0).toLocaleString(
      "en-IN",
    );
  };

  // =====================================================
  // FULL SHIPPING ADDRESS
  // =====================================================
  //
  // Supports different names that may already exist
  // in your saved-address structure.
  // =====================================================

  const addressLine =
    shippingData.addressLine ||
    shippingData.address ||
    "";

  const city =
    shippingData.city || "";

  const state =
    shippingData.state || "";

  const pincode =
    shippingData.pincode || "";

  // =====================================================
  // CREATE DISPLAY ADDRESS
  // =====================================================

  const addressParts = [
    addressLine,
    city,
    state,
    pincode,
  ].filter(Boolean);

  // =====================================================
  // PLACE ORDER
  // =====================================================

  const handlePlaceOrder = async () => {
    if (
      placingOrder ||
      cartItems.length === 0
    ) {
      return;
    }

    try {
      setPlacingOrder(true);

      // =================================================
      // PREPARE ORDER ITEMS
      // =================================================

      const items = cartItems.map((item) => ({
        productId:
          item.productId || item._id,

        variantId:
          item.variantId || "",

        name: item.name,

        image: item.image || "",

        category: item.category || "",

        size: item.size || "",

        price: Number(item.price || 0),

        quantity:
          Number(item.quantity || 1),

        total:
          Number(item.price || 0) *
          Number(item.quantity || 1),
      }));

      // =================================================
      // PREPARE SHIPPING ADDRESS
      // =================================================

      const shippingAddress = {
        fullName:
          shippingData.fullName || "",

        email:
          shippingData.email || "",

        contactNumber:
          shippingData.phone || "",

        address:
          addressLine,

        city,

        state,

        pincode,
      };

      // =================================================
      // PAYMENT METHOD
      // =================================================

      const paymentMethod =
        checkoutData.payment === "cod"
          ? "COD"
          : "Online";

      // =================================================
      // DELIVERY METHOD
      // =================================================

      const deliveryMethod =
        checkoutData.delivery === "express"
          ? "Express"
          : "Standard";

      // =================================================
      // ORDER DATA
      // =================================================

      const orderData = {
        items,

        shippingAddress,

        pricing: {
          subtotal,
          discount,
          gst,
          shipping,
          total,
        },

        deliveryMethod,

        paymentMethod,
      };

      console.log(
        "Sending order to backend:",
        orderData,
      );

      // =================================================
      // CREATE ORDER
      // =================================================

      const order =
        await createOrder(orderData);

      console.log(
        "Order created successfully:",
        order,
      );

      // =================================================
      // CLEAR CART
      // =================================================

      await dispatch(
        clearWholeCart(),
      );

      // =================================================
      // SHOW SUCCESS
      // =================================================

      setPlacedOrder(order);

      setOpenSuccessDialog(true);
    } catch (error) {
      console.error(
        "Order Failed:",
        error,
      );

      const message =
        error?.response?.data?.message ||
        "Unable to place order. Please try again.";

      alert(message);
    } finally {
      setPlacingOrder(false);
    }
  };

  // =====================================================
  // SECTION TITLE
  // =====================================================

  const SectionTitle = ({
    icon,
    children,
  }) => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.2,
          mb: 2.5,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "10px",
            backgroundColor: "#F3F0EA",
            color: "#1E2F2B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>

        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 18,
            color: "#1E2F2B",
          }}
        >
          {children}
        </Typography>
      </Box>
    );
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <Box
      sx={{
        width: "520px",
      }}
    >
      {/* =================================================
          HEADING
      ================================================= */}

      <Typography
        sx={{
          fontSize: 32,
          fontWeight: 600,
          color: "#1E2F2B",
          mb: 1,
        }}
      >
        Review Order
      </Typography>

      <Typography
        sx={{
          color: "#777",
          mb: 5,
          fontSize: 14,
        }}
      >
        Please review your order details before
        placing your order.
      </Typography>

      {/* =================================================
          SHIPPING ADDRESS
      ================================================= */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: "16px",
          border: "1px solid #E8E2D9",
          backgroundColor: "#FFFFFF",
        }}
      >
        <SectionTitle
          icon={
            <LocationOnOutlinedIcon
              sx={{ fontSize: 21 }}
            />
          }
        >
          Shipping Address
        </SectionTitle>

        {/* NAME */}

        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 600,
            color: "#292D2B",
            mb: 0.6,
          }}
        >
          {shippingData.fullName || "-"}
        </Typography>

        {/* EMAIL */}

        <Typography
          sx={{
            fontSize: 14,
            color: "#666",
            mb: 0.4,
          }}
        >
          {shippingData.email || "-"}
        </Typography>

        {/* PHONE */}

        <Typography
          sx={{
            fontSize: 14,
            color: "#666",
            mb: addressParts.length
              ? 1.5
              : 0,
          }}
        >
          {shippingData.phone || "-"}
        </Typography>

        {/* FULL ADDRESS */}

        {addressParts.length > 0 && (
          <Box
            sx={{
              pt: 1.5,
              borderTop:
                "1px solid #EEE9E2",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: 1.7,
                color: "#555",
              }}
            >
              {addressLine}
            </Typography>

            {(city ||
              state ||
              pincode) && (
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "#555",
                }}
              >
                {[city, state]
                  .filter(Boolean)
                  .join(", ")}
                {pincode
                  ? ` - ${pincode}`
                  : ""}
              </Typography>
            )}
          </Box>
        )}

        {/* FALLBACK */}

        {addressParts.length === 0 && (
          <Typography
            sx={{
              fontSize: 13,
              color: "#999",
              fontStyle: "italic",
              mt: 1,
            }}
          >
            Address details are not available.
          </Typography>
        )}
      </Paper>

      {/* =================================================
          DELIVERY METHOD
      ================================================= */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: "16px",
          border: "1px solid #E8E2D9",
          backgroundColor: "#FFFFFF",
        }}
      >
        <SectionTitle
          icon={
            <LocalShippingOutlinedIcon
              sx={{ fontSize: 21 }}
            />
          }
        >
          Delivery Method
        </SectionTitle>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            px: 1.5,
            py: 1.5,
            borderRadius: "10px",
            backgroundColor: "#F8F6F2",
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              color: "#555",
            }}
          >
            Delivery
          </Typography>

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: "#1E2F2B",
              textTransform:
                "capitalize",
            }}
          >
            {checkoutData.delivery ||
              "Standard"}
          </Typography>
        </Box>
      </Paper>

      {/* =================================================
          PAYMENT METHOD
      ================================================= */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: "16px",
          border: "1px solid #E8E2D9",
          backgroundColor: "#FFFFFF",
        }}
      >
        <SectionTitle
          icon={
            <CreditCardOutlinedIcon
              sx={{ fontSize: 21 }}
            />
          }
        >
          Payment Method
        </SectionTitle>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            px: 1.5,
            py: 1.5,
            borderRadius: "10px",
            backgroundColor: "#F8F6F2",
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              color: "#555",
            }}
          >
            Payment
          </Typography>

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: "#1E2F2B",
            }}
          >
            {checkoutData.payment ===
            "cod"
              ? "Cash on Delivery"
              : checkoutData.payment ||
                "Online"}
          </Typography>
        </Box>
      </Paper>

      {/* =================================================
          ORDER ITEMS
      ================================================= */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: "16px",
          border: "1px solid #E8E2D9",
          backgroundColor: "#FFFFFF",
        }}
      >
        <SectionTitle
          icon={
            <ShoppingBagOutlinedIcon
              sx={{ fontSize: 21 }}
            />
          }
        >
          Order Items
        </SectionTitle>

        {cartItems.map((item, index) => (
          <Box
            key={`${item.productId || item._id}-${item.variantId || index}`}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb:
                index ===
                cartItems.length - 1
                  ? 0
                  : 2.5,
              pb:
                index ===
                cartItems.length - 1
                  ? 0
                  : 2.5,
              borderBottom:
                index ===
                cartItems.length - 1
                  ? "none"
                  : "1px solid #F0ECE6",
            }}
          >
            {/* PRODUCT IMAGE */}

            <Avatar
              src={item.image}
              variant="rounded"
              sx={{
                width: 68,
                height: 68,
                borderRadius: "10px",
                backgroundColor: "#F7F4EF",
              }}
            />

            {/* PRODUCT DETAILS */}

            <Box
              sx={{
                flex: 1,
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#292D2B",
                  mb: 0.4,
                }}
              >
                {item.name}
              </Typography>

              {item.size && (
                <Typography
                  sx={{
                    color: "#888",
                    fontSize: 12,
                    mb: 0.3,
                  }}
                >
                  {item.size}
                </Typography>
              )}

              <Typography
                sx={{
                  color: "#888",
                  fontSize: 12,
                }}
              >
                Quantity: {item.quantity}
              </Typography>
            </Box>

            {/* ITEM TOTAL */}

            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 14,
                color: "#1E2F2B",
                whiteSpace: "nowrap",
              }}
            >
              ₹
              {formatPrice(
                Number(item.price || 0) *
                  Number(
                    item.quantity || 1,
                  ),
              )}
            </Typography>
          </Box>
        ))}
      </Paper>

      {/* =================================================
          PRICE DETAILS
      ================================================= */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: "16px",
          border: "1px solid #E8E2D9",
          backgroundColor: "#FFFFFF",
        }}
      >
        <SectionTitle
          icon={
            <CreditCardOutlinedIcon
              sx={{ fontSize: 21 }}
            />
          }
        >
          Price Details
        </SectionTitle>

        {/* SUBTOTAL */}

        <Box
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            mb: 1.5,
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              color: "#666",
            }}
          >
            Subtotal
          </Typography>

          <Typography
            sx={{
              fontSize: 14,
              color: "#333",
              fontWeight: 500,
            }}
          >
            ₹{formatPrice(subtotal)}
          </Typography>
        </Box>

        {/* DISCOUNT */}

        <Box
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            mb: 1.5,
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              color: "#666",
            }}
          >
            Discount
          </Typography>

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color:
                discount > 0
                  ? "#2E7D32"
                  : "#666",
            }}
          >
            {discount > 0
              ? `- ₹${formatPrice(
                  discount,
                )}`
              : "₹0"}
          </Typography>
        </Box>

        {/* GST */}

        <Box
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            mb: 1.5,
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              color: "#666",
            }}
          >
            GST (5%)
          </Typography>

          <Typography
            sx={{
              fontSize: 14,
              color: "#333",
              fontWeight: 500,
            }}
          >
            ₹{formatPrice(gst)}
          </Typography>
        </Box>

        {/* SHIPPING */}

        <Box
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            mb: 2.5,
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              color: "#666",
            }}
          >
            Shipping
          </Typography>

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color:
                shipping === 0
                  ? "#2E7D32"
                  : "#333",
            }}
          >
            {shipping === 0
              ? "FREE"
              : `₹${formatPrice(
                  shipping,
                )}`}
          </Typography>
        </Box>

        <Divider
          sx={{
            borderColor: "#EAE5DE",
            mb: 2,
          }}
        />

        {/* TOTAL */}

        <Box
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 600,
                color: "#1E2F2B",
              }}
            >
              Total Amount
            </Typography>

            <Typography
              sx={{
                fontSize: 12,
                color: "#999",
                mt: 0.3,
              }}
            >
              Inclusive of applicable taxes
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 700,
              color: "#1E2F2B",
            }}
          >
            ₹{formatPrice(total)}
          </Typography>
        </Box>
      </Paper>

      {/* =================================================
          BUTTONS
      ================================================= */}

      <Box
        sx={{
          display: "flex",
          justifyContent:
            "space-between",
          gap: 2,
        }}
      >
        {/* BACK */}

        <Button
          variant="outlined"
          onClick={backStep}
          disabled={placingOrder}
          sx={{
            px: 5,
            height: 52,
            borderRadius: "10px",
            textTransform: "none",
            borderColor: "#1E2F2B",
            color: "#1E2F2B",
            fontSize: 14,
            fontWeight: 600,

            "&:hover": {
              borderColor: "#1E2F2B",
              backgroundColor: "#F5F3EF",
            },
          }}
        >
          ← Back
        </Button>

        {/* PLACE ORDER */}

        <Button
          variant="contained"
          onClick={handlePlaceOrder}
          disabled={
            placingOrder ||
            cartItems.length === 0
          }
          sx={{
            px: 5,
            height: 52,
            background: "#1E2F2B",
            borderRadius: "10px",
            textTransform: "none",
            boxShadow: "none",
            fontSize: 14,
            fontWeight: 600,

            "&:hover": {
              background: "#16251F",
              boxShadow: "none",
            },
          }}
        >
          {placingOrder
            ? "Placing Order..."
            : "Place Order"}
        </Button>
      </Box>

      {/* =================================================
          SUCCESS DIALOG
      ================================================= */}

      <Dialog
        open={openSuccessDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 5,
            overflow: "hidden",
          },
        }}
      >
        <DialogContent
          sx={{
            p: 5,
            textAlign: "center",
          }}
        >
          {/* SUCCESS ICON */}

          <Box
            sx={{
              width: 90,
              height: 90,
              mx: "auto",
              borderRadius: "50%",
              bgcolor: "#E8F5E9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,

              animation:
                "pop .4s ease",

              "@keyframes pop": {
                "0%": {
                  transform: "scale(.5)",
                  opacity: 0,
                },

                "100%": {
                  transform: "scale(1)",
                  opacity: 1,
                },
              },
            }}
          >
            <CheckCircleRoundedIcon
              sx={{
                fontSize: 55,
                color: "#2E7D32",
              }}
            />
          </Box>

          {/* TITLE */}

          <Typography
            sx={{
              fontSize: 30,
              fontWeight: 700,
              color: "#1E2F2B",
            }}
          >
            Order Placed Successfully
          </Typography>

          {/* MESSAGE */}

          <Typography
            sx={{
              mt: 2,
              color: "#666",
              fontSize: 15,
              lineHeight: 1.8,
            }}
          >
            Thank you for choosing GlowCare.
            <br />
            Your order has been confirmed and
            is now being prepared.
          </Typography>

          <Divider sx={{ my: 4 }} />

          {/* ORDER NUMBER */}

          <Typography
            sx={{
              color: "#888",
              fontSize: 14,
            }}
          >
            ORDER NUMBER
          </Typography>

          <Typography
            sx={{
              fontWeight: 700,
              color: "#1E2F2B",
              mb: 3,
            }}
          >
            {placedOrder?.orderNumber ||
              "-"}
          </Typography>

          {/* ESTIMATED DELIVERY */}

          <Typography
            sx={{
              color: "#888",
              fontSize: 14,
            }}
          >
            Estimated Delivery
          </Typography>

          <Typography
            sx={{
              color: "#2E7D32",
              fontWeight: 600,
              mb: 5,
            }}
          >
            3 - 5 Business Days
          </Typography>

          {/* CONTINUE SHOPPING */}

          <Button
            fullWidth
            variant="contained"
            startIcon={
              <ShoppingBagOutlinedIcon />
            }
            sx={{
              height: 52,
              borderRadius: 3,
              textTransform: "none",
              fontSize: 16,
              background: "#1E2F2B",
              mb: 2,

              "&:hover": {
                background: "#16251F",
              },
            }}
            onClick={() => {
              setOpenSuccessDialog(false);
              window.location.href = "/";
            }}
          >
            Continue Shopping
          </Button>

          {/* VIEW ORDERS */}

          <Button
            fullWidth
            variant="outlined"
            startIcon={
              <Inventory2OutlinedIcon />
            }
            sx={{
              height: 52,
              borderRadius: 3,
              textTransform: "none",
              fontSize: 16,
              borderColor: "#1E2F2B",
              color: "#1E2F2B",

              "&:hover": {
                borderColor: "#1E2F2B",
                bgcolor: "#F8F8F8",
              },
            }}
            onClick={() => {
              setOpenSuccessDialog(false);
              window.location.href =
                "/user/orders";
            }}
          >
            View My Orders
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ReviewOrder;