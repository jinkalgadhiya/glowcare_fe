import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../auth/AuthService";
import LoginRequiredDialog from "../../auth/LoginRequiredDialog";

const CartSummary = ({ onClose }) => {
  const navigate = useNavigate();
  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const loggedIn = isLoggedIn();

  const handleCheckout = () => {
    if (!loggedIn) {
      setOpenLoginDialog(true);
      return;
    }

    onClose();
    navigate("/checkout");
  };

  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleViewCart = () => {
    onClose();
    navigate("/cart");
  };

  return (
    <Box
      sx={{
        p: 3,
        borderTop: "1px solid #E5E5E5",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 13,
              color: "#777",
            }}
          >
            Order Total
          </Typography>

          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 600,
              color: "#1E2F2B",
            }}
          >
            ₹{subtotal}
          </Typography>
        </Box>

          <Button
            variant="contained"
            onClick={handleViewCart}
            sx={{
              px: 4,
              py: 1.2,
              borderRadius: "30px",
              textTransform: "none",
              fontWeight: 600,
              backgroundColor: "#1E2F2B",
              color: "#fff",

              "&:hover": {
                backgroundColor: "#1E2F2B",
              },
            }}
          >
            View Cart
          </Button>
        
        <LoginRequiredDialog
          open={openLoginDialog}
          onClose={() => setOpenLoginDialog(false)}
        />
      </Box>
    </Box>
  );
};

export default CartSummary;
