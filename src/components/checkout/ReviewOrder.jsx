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

import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  createOrder,
} from "../../database/orderService";

import {
  clearWholeCart,
} from "../../redux/cart/cartActions";

const ReviewOrder = ({
  checkoutData,
  backStep,
  pricing,
}) => {
  const cartItems = useSelector(
    (state) => state.cart.items,
  );

  const dispatch = useDispatch();

  const [
    openSuccessDialog,
    setOpenSuccessDialog,
  ] = React.useState(false);

  const [
    placedOrder,
    setPlacedOrder,
  ] = React.useState(null);

  const [
    placingOrder,
    setPlacingOrder,
  ] = React.useState(false);

  // =====================================================
  // SHIPPING DATA
  // =====================================================

  const shippingData =
    checkoutData?.shipping || {};

  // =====================================================
  // USE PRICING FROM ORDER SUMMARY
  // DO NOT CALCULATE PRICES AGAIN HERE
  // =====================================================

  const subtotal =
    Number(
      pricing?.subtotal,
    ) || 0;

  const discount =
    Number(
      pricing?.discount,
    ) || 0;

  const gst =
    Number(
      pricing?.gst,
    ) || 0;

  const shipping =
    Number(
      pricing?.shipping,
    ) || 0;

  const total =
    Number(
      pricing?.total,
    ) || 0;

  const appliedCoupon =
    pricing?.appliedCoupon || null;

  // =====================================================
  // FORMAT PRICE
  // =====================================================

  const formatPrice = (value) => {
    return Number(
      value || 0,
    ).toLocaleString("en-IN");
  };

  // =====================================================
  // FULL SHIPPING ADDRESS
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

  const addressParts = [
    addressLine,
    city,
    state,
    pincode,
  ].filter(Boolean);

  // =====================================================
  // PLACE ORDER
  // =====================================================

  const handlePlaceOrder =
    async () => {
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

        const items =
          cartItems.map(
            (item) => ({
              productId:
                item.productId ||
                item._id,

              variantId:
                item.variantId ||
                "",

              name:
                item.name,

              image:
                item.image ||
                "",

              category:
                item.category ||
                "",

              size:
                item.size ||
                "",

              price:
                Number(
                  item.price ||
                    0,
                ),

              quantity:
                Number(
                  item.quantity ||
                    1,
                ),

              total:
                Number(
                  item.price ||
                    0,
                ) *
                Number(
                  item.quantity ||
                    1,
                ),
            }),
          );

        // =================================================
        // SHIPPING ADDRESS
        // =================================================

        const shippingAddress = {
          fullName:
            shippingData.fullName ||
            "",

          email:
            shippingData.email ||
            "",

          contactNumber:
            shippingData.phone ||
            "",

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
          checkoutData.payment ===
          "cod"
            ? "COD"
            : "Online";

        // =================================================
        // DELIVERY METHOD
        // =================================================

        const deliveryMethod =
          checkoutData.delivery ===
          "express"
            ? "Express"
            : "Standard";

        // =================================================
        // ORDER DATA
        // SAME PRICING AS ORDER SUMMARY
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

            couponCode:
              appliedCoupon?.code ||
              "",
          },

          deliveryMethod,

          paymentMethod,
        };

        console.log(
          "ORDER DATA:",
          orderData,
        );

        // =================================================
        // CREATE ORDER
        // =================================================

        const order =
          await createOrder(
            orderData,
          );

        console.log(
          "ORDER CREATED:",
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

        setPlacedOrder(
          order,
        );

        setOpenSuccessDialog(
          true,
        );
      } catch (error) {
        console.error(
          "Order Failed:",
          error,
        );

        const message =
          error?.response?.data
            ?.message ||
          "Unable to place order. Please try again.";

        alert(message);
      } finally {
        setPlacingOrder(
          false,
        );
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
            borderRadius:
              "10px",
            backgroundColor:
              "#F3F0EA",
            color:
              "#1E2F2B",
            display:
              "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>

        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 18,
            color:
              "#1E2F2B",
          }}
        >
          {children}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        width: "520px",
      }}
    >
      {/* HEADING */}

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
        Please review your order details
        before placing your order.
      </Typography>

      {/* SHIPPING ADDRESS */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius:
            "16px",
          border:
            "1px solid #E8E2D9",
          backgroundColor:
            "#FFFFFF",
        }}
      >
        <SectionTitle
          icon={
            <LocationOnOutlinedIcon
              sx={{
                fontSize: 21,
              }}
            />
          }
        >
          Shipping Address
        </SectionTitle>

        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 600,
            color:
              "#292D2B",
            mb: 0.6,
          }}
        >
          {shippingData.fullName ||
            "-"}
        </Typography>

        <Typography
          sx={{
            fontSize: 14,
            color: "#666",
            mb: 0.4,
          }}
        >
          {shippingData.email ||
            "-"}
        </Typography>

        <Typography
          sx={{
            fontSize: 14,
            color: "#666",
            mb:
              addressParts.length
                ? 1.5
                : 0,
          }}
        >
          {shippingData.phone ||
            "-"}
        </Typography>

        {addressParts.length >
          0 && (
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
                color:
                  "#555",
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
                  color:
                    "#555",
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
      </Paper>

      {/* DELIVERY METHOD */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius:
            "16px",
          border:
            "1px solid #E8E2D9",
        }}
      >
        <SectionTitle
          icon={
            <LocalShippingOutlinedIcon
              sx={{
                fontSize: 21,
              }}
            />
          }
        >
          Delivery Method
        </SectionTitle>

        <Box
          sx={{
            display:
              "flex",
            alignItems:
              "center",
            justifyContent:
              "space-between",
            px: 1.5,
            py: 1.5,
            borderRadius:
              "10px",
            backgroundColor:
              "#F8F6F2",
          }}
        >
          <Typography>
            Delivery
          </Typography>

          <Typography
            sx={{
              fontWeight: 600,
              textTransform:
                "capitalize",
            }}
          >
            {checkoutData.delivery ||
              "Standard"}
          </Typography>
        </Box>
      </Paper>

      {/* PAYMENT METHOD */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius:
            "16px",
          border:
            "1px solid #E8E2D9",
        }}
      >
        <SectionTitle
          icon={
            <CreditCardOutlinedIcon
              sx={{
                fontSize: 21,
              }}
            />
          }
        >
          Payment Method
        </SectionTitle>

        <Box
          sx={{
            display:
              "flex",
            justifyContent:
              "space-between",
            px: 1.5,
            py: 1.5,
            borderRadius:
              "10px",
            backgroundColor:
              "#F8F6F2",
          }}
        >
          <Typography>
            Payment
          </Typography>

          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            {checkoutData.payment ===
            "cod"
              ? "Cash on Delivery"
              : "Online"}
          </Typography>
        </Box>
      </Paper>

      {/* ORDER ITEMS */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius:
            "16px",
          border:
            "1px solid #E8E2D9",
        }}
      >
        <SectionTitle
          icon={
            <ShoppingBagOutlinedIcon
              sx={{
                fontSize: 21,
              }}
            />
          }
        >
          Order Items
        </SectionTitle>

        {cartItems.map(
          (item, index) => (
            <Box
              key={`${item.productId || item._id}-${item.variantId || index}`}
              sx={{
                display:
                  "flex",
                alignItems:
                  "center",
                gap: 2,
                mb:
                  index ===
                  cartItems.length -
                    1
                    ? 0
                    : 2.5,
              }}
            >
              <Avatar
                src={item.image}
                variant="rounded"
                sx={{
                  width: 68,
                  height: 68,
                  borderRadius:
                    "10px",
                }}
              />

              <Box
                sx={{
                  flex: 1,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  {item.name}
                </Typography>

                <Typography
                  sx={{
                    color:
                      "#888",
                    fontSize: 12,
                  }}
                >
                  Quantity:{" "}
                  {item.quantity}
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                ₹
                {formatPrice(
                  Number(
                    item.price ||
                      0,
                  ) *
                    Number(
                      item.quantity ||
                        1,
                    ),
                )}
              </Typography>
            </Box>
          ),
        )}
      </Paper>

      {/* BUTTONS */}

      <Box
        sx={{
          display:
            "flex",
          justifyContent:
            "space-between",
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={backStep}
          disabled={placingOrder}
        >
          ← Back
        </Button>

        <Button
          variant="contained"
          onClick={
            handlePlaceOrder
          }
          disabled={
            placingOrder ||
            cartItems.length === 0
          }
          sx={{
            background:
              "#1E2F2B",

            "&:hover": {
              background:
                "#16251F",
            },
          }}
        >
          {placingOrder
            ? "Placing Order..."
            : "Place Order"}
        </Button>
      </Box>

      {/* SUCCESS DIALOG */}

      <Dialog
        open={
          openSuccessDialog
        }
        maxWidth="sm"
        fullWidth
      >
        <DialogContent
          sx={{
            p: 5,
            textAlign:
              "center",
          }}
        >
          <CheckCircleRoundedIcon
            sx={{
              fontSize: 60,
              color:
                "#2E7D32",
            }}
          />

          <Typography
            sx={{
              fontSize: 28,
              fontWeight: 700,
              mt: 2,
            }}
          >
            Order Placed Successfully
          </Typography>

          <Typography
            sx={{
              mt: 2,
              color:
                "#666",
            }}
          >
            Thank you for choosing
            GlowCare.
          </Typography>

          <Divider
            sx={{
              my: 4,
            }}
          />

          <Typography>
            ORDER NUMBER
          </Typography>

          <Typography
            sx={{
              fontWeight: 700,
              mb: 3,
            }}
          >
            {placedOrder?.orderNumber ||
              "-"}
          </Typography>

          <Typography>
            Total Paid
          </Typography>

          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 700,
              color:
                "#1E2F2B",
              mb: 4,
            }}
          >
            ₹{formatPrice(total)}
          </Typography>

          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              window.location.href =
                "/";
            }}
            sx={{
              background:
                "#1E2F2B",
              mb: 2,
            }}
          >
            Continue Shopping
          </Button>

          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
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