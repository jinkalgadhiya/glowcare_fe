import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeProductFromCart } from "../../redux/cart/cartActions";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

const CartItem = ({ item }) => {

  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 2,
        mb: 2,
        width: "350px",
        backgroundColor: "#F8F6F2", // Cream shade
        borderRadius: 2,
      }}
    >
      {/* Product Image */}

      <Box
        component="img"
        src={item.image}
        alt={item.name}
        sx={{
          width: 80,
          height: 80,
          borderRadius: 2,
          objectFit: "cover",
          backgroundColor: "#fff",
          flexShrink: 0,
        }}
      />

      {/* Product Details */}

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <Typography
          noWrap
          sx={{
            fontSize: 15,
            fontWeight: 600,
            color: "#1E2F2B",
            mb: 0.5,
          }}
        >
          {item.name}
        </Typography>

        <Typography
          sx={{
            fontSize: 13,
            color: "#777",
            mb: 0.5,
          }}
        >
          Qty : {item.quantity}
        </Typography>

        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 600,
            color: "#1E2F2B",
          }}
        >
          ₹{item.price}
        </Typography>
      </Box>

      {/* Delete Button */}

      <IconButton
  onClick={() =>
  dispatch(
    removeProductFromCart({
      productId: item.productId,
      variantId: item.variantId,
    })
  )
}
  sx={{
    alignSelf: "flex-start",
    color: "#777",

    "&:hover": {
      color: "#C62828",
      backgroundColor: "transparent",
    },
  }}
>
  <DeleteOutlineRoundedIcon fontSize="small" />
</IconButton>
    </Box>
  );
};

export default CartItem;