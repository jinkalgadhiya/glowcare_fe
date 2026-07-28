import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../auth/AuthService";

import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const CartDrawer = ({ open, onClose }) => {
  const cartItems = useSelector((state) => state.cart.items);

  // Replace this with your actual auth state
  const loggedIn = isLoggedIn();
  const navigate = useNavigate();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 420,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Header */}

      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 600,
            color: "#1E2F2B",
          }}
        >
          Shopping Bag ({cartItems.length})
        </Typography>

        <IconButton onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </Box>

      <Divider />

      {/* Body */}

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
        }}
      >
        {!loggedIn && cartItems.length > 0 && (
          <Box
            sx={{
              border: "1px solid #E5E5E5",
              borderRadius: "10px",
              p: 2,
              mb: 2,
              backgroundColor: "#fff",
              width: 350,
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 500,
                mb: 1.5,
                color: "#333",
              }}
            >
              Login to save your cart, wishlist and enjoy a faster checkout.
            </Typography>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                onClose();
                navigate("/login");
              }}
              sx={{
                textTransform: "none",
                color: "#1E2F2B",
                borderColor: "#D8CBB8",
                backgroundColor: "#F8F6F2",
                borderRadius: "8px",
                fontWeight: 600,
                py: 1.2,

                "&:hover": {
                  backgroundColor: "#EFE8DD",
                  borderColor: "#CDBCA5",
                },
              }}
            >
              Login / Register
            </Button>
          </Box>
        )}

        {cartItems.length === 0 ? (
          <EmptyCart onClose={onClose} />
        ) : (
          cartItems.map((item) => (
            <CartItem key={`${item.productId}-${item.variantId}`} item={item} />
          ))
        )}
      </Box>

      <Divider />

      {/* Footer */}

      {cartItems.length > 0 && (
        <CartSummary onClose={onClose} loggedIn={loggedIn} />
      )}
    </Drawer>
  );
};

export default CartDrawer;
