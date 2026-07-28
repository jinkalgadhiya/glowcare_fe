import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

const EmptyCart = ({ onClose }) => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: 4,
        textAlign: "center",
      }}
    >
      <ShoppingBagOutlinedIcon
        sx={{
          fontSize: 70,
          color: "#B8B8B8",
          mb: 3,
        }}
      />

      <Typography
        sx={{
          fontSize: 24,
          fontWeight: 600,
          color: "#1E2F2B",
          mb: 1,
        }}
      >
        Your cart is empty
      </Typography>

      <Typography
        sx={{
          fontSize: 15,
          color: "#777",
          lineHeight: 1.8,
          mb: 4,
          maxWidth: 280,
        }}
      >
        Looks like you haven't added any products yet.
        Start exploring our skincare collection.
      </Typography>

      <Button
        variant="contained"
        onClick={onClose}
        sx={{
          backgroundColor: "#1E2F2B",
          color: "#fff",
          px: 5,
          py: 1.5,
          textTransform: "none",
          borderRadius: 0,

          "&:hover": {
            backgroundColor: "#15231F",
          },
        }}
      >
        Continue Shopping
      </Button>
    </Box>
  );
};

export default EmptyCart;