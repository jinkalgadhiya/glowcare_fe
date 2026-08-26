import React from "react";
import { Box, Typography, Button, Rating } from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/wishlist/wishlistSlice";

import {
  addToWishlistDB,
  removeFromWishlistDB,
} from "../database/wishlistService";

import { addProductToCart } from "../redux/cart/cartActions";

const ProductCard = ({
  product,
  showBadge = true,
  showWishlist = true,
  showDescription = true,
  showRating = true,
  showCart = true,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlistItems = useSelector(
    (state) => state.wishlist.items,
  );

  const firstVariant = product?.variants?.[0];

  const currentPrice =
    firstVariant?.discountPrice ||
    firstVariant?.price ||
    0;

  const originalPrice =
    firstVariant?.price || 0;

  /* ===============================
     CATEGORY
  =============================== */

  const categoryName =
    product?.category?.subCategory ||
    product?.category?.mainCategory ||
    "";

  /* ===============================
     WISHLIST
  =============================== */

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product?._id,
  );

  /* ===============================
     OPEN PRODUCT
  =============================== */

  const handleOpenProduct = () => {
    navigate(`/product/${product._id}`);
  };

  /* ===============================
     WISHLIST
  =============================== */

  const handleWishlist = async (e) => {
    e.stopPropagation();

    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));

      await removeFromWishlistDB(product._id);
    } else {
      dispatch(
        addToWishlist({
          ...product,

          id: product._id,

          name: product.productName,

          category: categoryName,
        }),
      );

      await addToWishlistDB(product._id);
    }
  };

  /* ===============================
     ADD TO CART
  =============================== */

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (!firstVariant) return;

    dispatch(
      addProductToCart({
        productId: product._id,

        variantId: firstVariant._id,

        name: product.productName,

        image: product.image,

        category: categoryName,

        description: product.description,

        size: firstVariant.size,

        price: currentPrice,

        originalPrice: originalPrice,

        quantity: 1,
      }),
    );
  };

  /* ===============================
     DISCOUNT
  =============================== */

  const discount =
    firstVariant?.discountPrice && originalPrice > 0
      ? Math.round(
          ((originalPrice - currentPrice) /
            originalPrice) *
            100,
        )
      : 0;

  return (
    <Box
      onClick={handleOpenProduct}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 320,
        height: "auto",
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "#fff",
        boxShadow: "0 4px 15px rgba(0,0,0,.08)",
        transition: ".35s",

        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 18px 40px rgba(0,0,0,.12)",
        },
      }}
    >
      {/* ===============================
          IMAGE SECTION
      =============================== */}

      <Box
        sx={{
          position: "relative",
          backgroundColor: "#F6F6F3",
          borderRadius: 2,
          overflow: "hidden",
          height: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          "&:hover img": {
            transform: "translateY(-8px) scale(1.05)",
          },
        }}
      >
        {/* Badge */}

        {showBadge &&
          product.badge &&
          product.badge !== "None" && (
            <Box
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                zIndex: 10,

                backgroundColor: "#1E2F2B",
                color: "#fff",

                px: 2,
                py: 0.6,

                borderRadius: "30px",
              }}
            >
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                {product.badge}
              </Typography>
            </Box>
          )}

        {/* Wishlist */}

        {showWishlist && (
          <IconButton
            onClick={handleWishlist}
            sx={{
              position: "absolute",
              top: 340,
              left: 20,

              zIndex: 10,

              width: 46,
              height: 46,

              bgcolor: "#fff",

              boxShadow:
                "0 6px 20px rgba(0,0,0,.12)",

              transition: ".3s",

              "&:hover": {
                bgcolor: "#fff",
                transform: "scale(1.08)",
              },
            }}
          >
            {isWishlisted ? (
              <FavoriteRoundedIcon
                sx={{
                  color: "#E53935",
                  fontSize: 24,
                }}
              />
            ) : (
              <FavoriteBorderRoundedIcon
                sx={{
                  color: "#666",
                  fontSize: 24,
                }}
              />
            )}
          </IconButton>
        )}

        {/* Product Image */}

        <Box
          component="img"
          src={product.image}
          alt={product.productName}
          sx={{
            width: "95%",
            height: "100%",
            objectFit: "cover",
            position: "relative",
            zIndex: 1,

            transition: ".4s",
          }}
        />
      </Box>

      {/* ===============================
          PRODUCT INFO
      =============================== */}

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
          {categoryName}
        </Typography>

        {/* Product Name */}

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
          {product.productName}
        </Typography>

        {/* Description */}

        {showDescription && (
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
            {product.description ||
              "No description available."}
          </Typography>
        )}

        {/* Rating */}

        {showRating && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1,
            }}
          >
            <Rating
              value={product.rating || 4.8}
              precision={0.5}
              readOnly
              size="small"
            />

            <Typography
              sx={{
                fontSize: 14,
                color: "#666",
              }}
            >
              {product.rating || 4.8} (
              {product.reviewCount || 0} Reviews)
            </Typography>
          </Box>
        )}

        {/* Price */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 700,
              color: "#1E2F2B",
            }}
          >
            ₹{currentPrice}
          </Typography>

          {firstVariant?.discountPrice && (
            <Typography
              sx={{
                fontSize: 16,
                color: "#999",
                textDecoration: "line-through",
                textDecorationColor: "#D32F2F",
              }}
            >
              ₹{originalPrice}
            </Typography>
          )}

          {firstVariant?.discountPrice && (
            <Typography
              sx={{
                color: "#2E7D32",
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              {discount}% OFF
            </Typography>
          )}
        </Box>

        {/* Add To Cart */}

        {showCart && (
          <Button
            onClick={handleAddToCart}
            variant="outlined"
            fullWidth
            sx={{
              mt: "auto",
              height: 48,

              borderRadius: 0,
              textTransform: "none",

              borderColor: "#1E2F2B",
              color: "#1E2F2B",
              fontWeight: 600,

              transition: ".3s",

              "&:hover": {
                bgcolor: "#1E2F2B",
                color: "#fff",
                borderColor: "#1E2F2B",
              },
            }}
          >
            Add To Cart
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProductCard;