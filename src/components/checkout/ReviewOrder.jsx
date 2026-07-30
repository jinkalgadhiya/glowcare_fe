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

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { useSelector, useDispatch } from "react-redux";

import PriceDetails from "./PriceDetails";
import { getUsers, updateUser } from "../../database/userService";
import { createOrder } from "../../database/orderService";
import { clearCartItems } from "../../database/cartService";
import { clearCart } from "../../redux/cart/cartSlice";

const ReviewOrder = ({ checkoutData, backStep }) => {
  const cartItems = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false);
  const [placedOrder, setPlacedOrder] = React.useState(null);
  // Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping = subtotal >= 999 ? 0 : 50;
  const discount = subtotal >= 1500 ? 100 : 0;
  const gst = Math.round(subtotal * 0.05);

  const total = subtotal + shipping + gst - discount;

  // Place Order
  const handlePlaceOrder = async () => {
    try {
      // Get all users
      const users = await getUsers();

      // Find logged-in customer
      const customer = users.find(
        (user) =>
          user.email.toLowerCase() ===
          checkoutData.shipping.email.toLowerCase(),
      );

      if (!customer) {
        alert("Customer not found");
        return;
      }

      // Create Order
      const orderData = {
        customer: {
          id: customer.id,
          fullName: customer.fullName,
          email: customer.email,
          phone: customer.phone,
        },

        shipping: {
          fullName: checkoutData.shipping.fullName,
          email: checkoutData.shipping.email,
          phone: checkoutData.shipping.phone,
          address: checkoutData.shipping.address,
          city: checkoutData.shipping.city,
          state: checkoutData.shipping.state,
          pincode: checkoutData.shipping.pincode,
        },

        deliveryMethod: checkoutData.delivery,

        paymentMethod: checkoutData.payment,

        items: cartItems,

        pricing: {
          subtotal,
          shipping,
          discount,
          gst,
          total,
        },
      };

      // Save Order
      const order = await createOrder(orderData);

      // Update Customer Details
      customer.totalOrders = (customer.totalOrders || 0) + 1;
      customer.totalSpent = (customer.totalSpent || 0) + total;

      customer.address = {
        fullName: checkoutData.shipping.fullName,
        phone: checkoutData.shipping.phone,
        street: checkoutData.shipping.address,
        city: checkoutData.shipping.city,
        state: checkoutData.shipping.state,
        pincode: checkoutData.shipping.pincode,
        landmark: checkoutData.shipping.landmark || "",
      };

      // Optional (keep customer's main phone updated)
      customer.phone = checkoutData.shipping.phone;

      await updateUser(customer);

      // Clear Cart
      dispatch(clearCart());
      await clearCartItems();

      // Success Dialog
      setPlacedOrder(order);
      setOpenSuccessDialog(true);
    } catch (error) {
      console.error("Order Failed:", error);
    }
  };

  return (
    <Box sx={{ width: 520 }}>
      {/* Heading */}

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
        }}
      >
        Please review your order before placing it.
      </Typography>

      {/* Shipping */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          border: "1px solid #ECE6DE",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 20,
            mb: 2,
          }}
        >
          📍 Shipping Address
        </Typography>

        <Typography>{checkoutData.shipping.fullName}</Typography>
        <Typography>{checkoutData.shipping.email}</Typography>
        <Typography>{checkoutData.shipping.phone}</Typography>
        <Typography>{checkoutData.shipping.address}</Typography>

        <Typography>
          {checkoutData.shipping.city}, {checkoutData.shipping.state}
        </Typography>

        <Typography>{checkoutData.shipping.pincode}</Typography>
      </Paper>

      {/* Delivery */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          border: "1px solid #ECE6DE",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 20,
            mb: 2,
          }}
        >
          🚚 Delivery Method
        </Typography>

        <Typography sx={{ textTransform: "capitalize" }}>
          {checkoutData.delivery}
        </Typography>
      </Paper>

      {/* Payment */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          border: "1px solid #ECE6DE",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 20,
            mb: 2,
          }}
        >
          💳 Payment Method
        </Typography>

        <Typography sx={{ textTransform: "capitalize" }}>
          {checkoutData.payment}
        </Typography>
      </Paper>

      {/* Order Items */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          border: "1px solid #ECE6DE",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 20,
            mb: 3,
          }}
        >
          🛍 Order Items
        </Typography>

        {cartItems.map((item) => (
          <Box
            key={`${item.productId}-${item.variantId}`}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 3,
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

            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 600 }}>{item.name}</Typography>

              <Typography
                sx={{
                  color: "#777",
                  fontSize: 14,
                }}
              >
                {item.size}
              </Typography>

              <Typography
                sx={{
                  color: "#777",
                  fontSize: 14,
                }}
              >
                Qty : {item.quantity}
              </Typography>
            </Box>

            <Typography sx={{ fontWeight: 600 }}>
              ₹{item.price * item.quantity}
            </Typography>
          </Box>
        ))}
      </Paper>

      {/* Price Details */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          border: "1px solid #ECE6DE",
        }}
      >
        <PriceDetails />
      </Paper>

      {/* Buttons */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="outlined"
          onClick={backStep}
          sx={{
            px: 5,
            height: 52,
            borderRadius: 2,
            textTransform: "none",
            borderColor: "#1E2F2B",
            color: "#1E2F2B",
          }}
        >
          ← Back
        </Button>

        <Button
          variant="contained"
          onClick={handlePlaceOrder}
          sx={{
            px: 5,
            height: 52,
            background: "#1E2F2B",
            borderRadius: 2,
            textTransform: "none",
            boxShadow: "none",

            "&:hover": {
              background: "#16251F",
              boxShadow: "none",
            },
          }}
        >
          Place Order
        </Button>
      </Box>
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
          {/* Success Icon */}

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

              animation: "pop .4s ease",

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

          <Typography
            sx={{
              fontSize: 30,
              fontWeight: 700,
              color: "#1E2F2B",
            }}
          >
            Order Placed Successfully
          </Typography>

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
            Your order has been confirmed and is now being prepared.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography
            sx={{
              color: "#888",
              fontSize: 14,
            }}
          >
            ORDER ID
          </Typography>

          <Typography
            sx={{
              fontWeight: 700,
              color: "#1E2F2B",
              mb: 3,
            }}
          >
            {placedOrder?.id}
          </Typography>

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

          <Button
            fullWidth
            variant="contained"
            startIcon={<ShoppingBagOutlinedIcon />}
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
            }}
          >
            Continue Shopping
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<Inventory2OutlinedIcon />}
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
          >
            View My Orders
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ReviewOrder;
