import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Button,
  Rating,
  IconButton,
} from "@mui/material";

import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

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

// =====================================================
// REVIEW SERVICE
// =====================================================

import { getMyReviews } from "../database/reviewService";

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
    (state) => state.wishlist.items
  );

  // =====================================================
  // PRODUCT REVIEWS
  // =====================================================

  const [productReviews, setProductReviews] = useState([]);

  const firstVariant = product?.variants?.[0];

  const currentPrice =
    firstVariant?.discountPrice ||
    firstVariant?.price ||
    0;

  const originalPrice =
    firstVariant?.price || 0;

  // =====================================================
  // CATEGORY
  // =====================================================

  const categoryName =
    product?.category?.subCategory ||
    product?.category?.mainCategory ||
    "";

  // =====================================================
  // LOAD REAL PRODUCT REVIEWS
  // =====================================================

  useEffect(() => {
    const loadProductReviews = async () => {
      try {
        const reviews = await getMyReviews();

        const currentProductReviews = reviews.filter(
          (review) => {
            const reviewProductId =
              review.productId?._id ||
              review.productId ||
              review.product?._id ||
              review.product;

            return (
              String(reviewProductId) ===
              String(product?._id)
            );
          }
        );

        setProductReviews(currentProductReviews);
      } catch (error) {
        console.error(
          "Failed to load product reviews:",
          error
        );

        setProductReviews([]);
      }
    };

    if (product?._id) {
      loadProductReviews();
    }
  }, [product?._id]);

  // =====================================================
  // REAL REVIEW RATING
  // =====================================================

  const reviewCount = productReviews.length;

  const averageRating =
    reviewCount > 0
      ? productReviews.reduce(
          (total, review) =>
            total + (Number(review.rating) || 0),
          0
        ) / reviewCount
      : 0;

  // =====================================================
  // WISHLIST
  // =====================================================

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product?._id
  );

  // =====================================================
  // OPEN PRODUCT
  // =====================================================

  const handleOpenProduct = () => {
    navigate(`/product/${product._id}`);
  };

  // =====================================================
  // WISHLIST
  // =====================================================

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
        })
      );

      await addToWishlistDB(product._id);
    }
  };

  // =====================================================
  // ADD TO CART
  // =====================================================

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
      })
    );
  };

  // =====================================================
  // DISCOUNT
  // =====================================================

  const discount =
    firstVariant?.discountPrice &&
    originalPrice > 0
      ? Math.round(
          ((originalPrice - currentPrice) /
            originalPrice) *
            100
        )
      : 0;

  return (
    <Box
      onClick={handleOpenProduct}
      sx={{
        display: "flex",

        flexDirection: "column",

        // =================================================
        // DESKTOP - ORIGINAL
        // DO NOT CHANGE
        // =================================================

        width: 320,

        height: "auto",

        borderRadius: 2,

        overflow: "hidden",

        bgcolor: "#fff",

        boxShadow:
          "0 4px 15px rgba(0,0,0,.08)",

        transition: ".35s",

        "&:hover": {
          transform: "translateY(-8px)",

          boxShadow:
            "0 18px 40px rgba(0,0,0,.12)",
        },

        // =================================================
        // SMALL LAPTOP
        // =================================================

        "@media (min-width: 900px) and (max-width: 1199px)":
          {
            width: "100%",
            maxWidth: 320,
            margin: "0 auto",
          },

        // =================================================
        // TABLET
        // =================================================

        "@media (min-width: 600px) and (max-width: 899px)":
          {
            width: "100%",
            maxWidth: "100%",
            margin: 0,
          },

        // =================================================
        // MOBILE
        // =================================================

        "@media (max-width: 599px)": {
          width: "100%",
          maxWidth: "100%",
          margin: 0,

          borderRadius: 2,
        },
      }}
    >
      {/* =================================================
          IMAGE SECTION
      ================================================= */}

      <Box
        sx={{
          position: "relative",

          backgroundColor: "#F6F6F3",

          borderRadius: 2,

          overflow: "hidden",

          // =================================================
          // DESKTOP - ORIGINAL
          // DO NOT CHANGE
          // =================================================

          height: 400,

          display: "flex",

          justifyContent: "center",

          alignItems: "center",

          "&:hover img": {
            transform:
              "translateY(-8px) scale(1.05)",
          },

          // =================================================
          // SMALL LAPTOP
          // =================================================

          "@media (min-width: 900px) and (max-width: 1199px)":
            {
              height: 360,
            },

          // =================================================
          // TABLET
          // =================================================

          "@media (min-width: 600px) and (max-width: 899px)":
            {
              height: "clamp(280px, 42vw, 340px)",
            },

          // =================================================
          // MOBILE
          // =================================================

          "@media (max-width: 599px)": {
            height: "clamp(280px, 90vw, 360px)",
          },
        }}
      >
        {/* =================================================
            BADGE
        ================================================= */}

        {showBadge &&
          product.badge &&
          product.badge !== "None" && (
            <Box
              sx={{
                position: "absolute",

                top: {
                  xs: 10,
                  sm: 12,
                  md: 16,
                },

                right: {
                  xs: 10,
                  sm: 12,
                  md: 16,
                },

                zIndex: 10,

                backgroundColor: "#1E2F2B",

                color: "#fff",

                px: {
                  xs: 1.2,
                  md: 2,
                },

                py: {
                  xs: 0.4,
                  md: 0.6,
                },

                borderRadius: "30px",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: 9,
                    sm: 10,
                    md: 11,
                  },

                  fontWeight: 600,

                  letterSpacing: {
                    xs: 0.7,
                    md: 1,
                  },

                  textTransform: "uppercase",
                }}
              >
                {product.badge}
              </Typography>
            </Box>
          )}

        {/* =================================================
            WISHLIST
        ================================================= */}

        {showWishlist && (
          <IconButton
            onClick={handleWishlist}
            sx={{
              position: "absolute",

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

              // =================================================
              // DESKTOP - ORIGINAL
              // DO NOT CHANGE
              // =================================================

              top: 340,

              left: 20,

              // =================================================
              // SMALL LAPTOP
              // =================================================

              "@media (min-width: 900px) and (max-width: 1199px)":
                {
                  top: "auto",
                  bottom: 16,
                  left: 18,

                  width: 44,
                  height: 44,
                },

              // =================================================
              // TABLET
              // =================================================

              "@media (min-width: 600px) and (max-width: 899px)":
                {
                  top: "auto",
                  bottom: 16,
                  left: 16,

                  width: 44,
                  height: 44,
                },

              // =================================================
              // MOBILE
              // =================================================

              "@media (max-width: 599px)": {
                top: "auto",
                bottom: 14,
                left: 12,

                width: 42,
                height: 42,
              },
            }}
          >
            {isWishlisted ? (
              <FavoriteRoundedIcon
                sx={{
                  color: "#E53935",

                  fontSize: {
                    xs: 21,
                    md: 24,
                  },
                }}
              />
            ) : (
              <FavoriteBorderRoundedIcon
                sx={{
                  color: "#666",

                  fontSize: {
                    xs: 21,
                    md: 24,
                  },
                }}
              />
            )}
          </IconButton>
        )}

        {/* =================================================
            PRODUCT IMAGE
        ================================================= */}

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

            // =================================================
            // TABLET
            // Keep image inside available card width
            // =================================================

            "@media (min-width: 600px) and (max-width: 899px)":
              {
                width: "100%",
              },

            // =================================================
            // MOBILE
            // =================================================

            "@media (max-width: 599px)": {
              width: "100%",
            },
          }}
        />
      </Box>

      {/* =================================================
          PRODUCT INFO
      ================================================= */}

      <Box
        sx={{
          p: {
            xs: 1.5,
            sm: 2,
          },

          display: "flex",

          flexDirection: "column",

          flexGrow: 1,

          // =================================================
          // TABLET
          // =================================================

          "@media (min-width: 600px) and (max-width: 899px)":
            {
              p: 2,
            },
        }}
      >
        {/* =================================================
            CATEGORY
        ================================================= */}

        <Typography
          sx={{
            fontSize: {
              xs: 11,
              sm: 12,
              md: 13,
            },

            color: "#B89478",

            letterSpacing: {
              xs: 0.7,
              md: 1,
            },

            textTransform: "uppercase",

            mb: {
              xs: 0.7,
              md: 1,
            },
          }}
        >
          {categoryName}
        </Typography>

        {/* =================================================
            PRODUCT NAME
        ================================================= */}

        <Typography
          sx={{
            fontSize: {
              xs: 17,
              sm: 18,
              md: 20,
            },

            fontWeight: 600,

            color: "#1E2F2B",

            lineHeight: 1.4,

            height: {
              xs: 48,
              md: 56,
            },

            overflow: "hidden",

            display: "-webkit-box",

            WebkitLineClamp: 2,

            WebkitBoxOrient: "vertical",

            mb: {
              xs: 0.8,
              md: 1,
            },

            // =================================================
            // TABLET
            // =================================================

            "@media (min-width: 600px) and (max-width: 899px)":
              {
                fontSize: 18,
                height: 52,
              },
          }}
        >
          {product.productName}
        </Typography>

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        {showDescription && (
          <Typography
            sx={{
              fontSize: {
                xs: 13,
                sm: 13,
                md: 14,
              },

              color: "#6F6F6F",

              lineHeight: {
                xs: 1.6,
                md: 1.7,
              },

              height: {
                xs: 62,
                md: 72,
              },

              overflow: "hidden",

              display: "-webkit-box",

              WebkitLineClamp: 3,

              WebkitBoxOrient: "vertical",

              mb: {
                xs: 1.5,
                md: 2,
              },

              // =================================================
              // TABLET
              // =================================================

              "@media (min-width: 600px) and (max-width: 899px)":
                {
                  fontSize: 13,
                  lineHeight: 1.6,
                  height: 62,
                },
            }}
          >
            {product.description ||
              "No description available."}
          </Typography>
        )}

        {/* =================================================
            RATING
        ================================================= */}

        {showRating && (
          <Box
            sx={{
              display: "flex",

              alignItems: "center",

              gap: {
                xs: 0.5,
                md: 1,
              },

              mb: 1,

              flexWrap: "wrap",
            }}
          >
            <Rating
              value={averageRating}
              precision={0.5}
              readOnly
              size="small"
            />

            <Typography
              sx={{
                fontSize: {
                  xs: 12,
                  sm: 13,
                  md: 14,
                },

                color: "#666",
              }}
            >
              {reviewCount > 0
                ? averageRating.toFixed(1)
                : "0.0"}{" "}
              ({reviewCount} Reviews)
            </Typography>
          </Box>
        )}

        {/* =================================================
            PRICE
        ================================================= */}

        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            gap: {
              xs: 1,
              md: 2,
            },

            mb: 1,

            flexWrap: "wrap",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 20,
                sm: 22,
                md: 24,
              },

              fontWeight: 700,

              color: "#1E2F2B",
            }}
          >
            ₹{currentPrice}
          </Typography>

          {firstVariant?.discountPrice && (
            <Typography
              sx={{
                fontSize: {
                  xs: 14,
                  md: 16,
                },

                color: "#999",

                textDecoration:
                  "line-through",

                textDecorationColor:
                  "#D32F2F",
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

                fontSize: {
                  xs: 11,
                  md: 13,
                },
              }}
            >
              {discount}% OFF
            </Typography>
          )}
        </Box>

        {/* =================================================
            ADD TO CART
        ================================================= */}

        {showCart && (
          <Button
            onClick={handleAddToCart}
            variant="outlined"
            fullWidth
            sx={{
              mt: "auto",

              height: {
                xs: 44,
                sm: 46,
                md: 48,
              },

              borderRadius: 0,

              textTransform: "none",

              borderColor: "#1E2F2B",

              color: "#1E2F2B",

              fontWeight: 600,

              fontSize: {
                xs: 13,
                md: 14,
              },

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