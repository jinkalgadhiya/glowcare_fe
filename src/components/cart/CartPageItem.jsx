import React from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../redux/cart/cartSlice";

const CartPageItem = ({ item, product }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(
      increaseQuantity({
        productId: item.productId,
        variantId: item.variantId,
      }),
    );
  };

  const handleDecrease = () => {
    dispatch(
      decreaseQuantity({
        productId: item.productId,
        variantId: item.variantId,
      }),
    );
  };

  const handleRemove = () => {
    dispatch(
      removeFromCart({
        productId: item.productId,
        variantId: item.variantId,
      }),
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 320,
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "#fff",
        boxShadow: "0 4px 15px rgba(0,0,0,.08)",
      }}
    >
      {/* Product Image */}

      <Box
        sx={{
          backgroundColor: "#F6F6F3",
          borderRadius: 2,
          overflow: "hidden",
          height: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          "&:hover img": {
            transform: "scale(1.08)",
          },
        }}
      >
        <Box
          component="img"
          src={item.image}
          alt={item.name}
          sx={{
            width: "95%",
            height: "100%",
            objectFit: "cover",
            transition: ".4s",
          }}
        />
      </Box>

      {/* Product Info */}

      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        {/* Category */}

        <Typography
          sx={{
            fontSize: 13,
            color: "#B89478",
            letterSpacing: 1,
            textTransform: "uppercase",
            mb: 1,
          }}
        >
          {product?.category}
        </Typography>

        {/* Name */}

        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 600,
            color: "#1E2F2B",
            lineHeight: 1.4,
            height: 56,
            overflow: "hidden",

            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",

            mb: 1,
          }}
        >
          {item.name}
        </Typography>

        {/* Description */}

        <Typography
          sx={{
            fontSize: 14,
            color: "#6F6F6F",
            lineHeight: 1.7,
            height: 72,
            overflow: "hidden",

            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",

            mb: 2,
          }}
        >
          {product?.description}
        </Typography>

        {/* Price */}

        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 700,
            color: "#1E2F2B",
            mb: 3,
          }}
        >
          ₹{item.price}
        </Typography>

        {/* Quantity */}

        <Stack
  direction="row"
  alignItems="center"
  sx={{
    width: "fit-content",
    border: "1px solid #E5DED4",
    borderRadius: "30px",
    overflow: "hidden",
    mb: 3,
  }}
>
  <IconButton
    onClick={handleDecrease}
    sx={{
      width: 44,
      height: 44,
      borderRadius: 0,
      color: "#666",

      "&:hover": {
        bgcolor: "#F6F6F3",
      },
    }}
  >
    <RemoveIcon fontSize="small" />
  </IconButton>

  <Typography
    sx={{
      width: 40,
      textAlign: "center",
      fontWeight: 600,
      fontSize: 18,
      pt: 1,
      color: "#1E2F2B",
    }}
  >
    {item.quantity}
  </Typography>

  <IconButton
    onClick={handleIncrease}
    sx={{
      width: 44,
      height: 44,
      borderRadius: 0,
      color: "#666",

      "&:hover": {
        bgcolor: "#F6F6F3",
      },
    }}
  >
    <AddIcon fontSize="small" />
  </IconButton>
</Stack>

        {/* Remove Button */}

        <Button
          fullWidth
          variant="outlined"
          startIcon={<DeleteOutlineOutlinedIcon />}
          onClick={handleRemove}
          sx={{
            mt: "auto",
            height: 48,

            borderRadius: 0,

            textTransform: "none",

            borderColor: "#1E2F2B",
            color: "#1E2F2B",

            fontWeight: 600,

            "&:hover": {
              bgcolor: "#1E2F2B",
              color: "#fff",
              borderColor: "#1E2F2B",
            },
          }}
        >
          Remove Item
        </Button>
      </Box>
    </Box>
  );
};

export default CartPageItem;
