import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Chip,
  Divider,
  Rating,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";

import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/wishlist/wishlistSlice";

import {
  addToWishlistDB,
  removeFromWishlistDB,
} from "../../database/wishlistService";

// =====================================================
// REVIEW SERVICE
// =====================================================

import { getMyReviews } from "../../database/reviewService";

// =====================================================
// CART
// =====================================================

import { addToCart } from "../../redux/cart/cartSlice";

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const productId = product?._id || product?.id;

  const isWishlisted = wishlistItems.some(
    (item) => item.id === productId
  );

  const [selectedVariant, setSelectedVariant] =
    useState(product?.variants?.[0]);

  const [quantity, setQuantity] = useState(1);

  // =====================================================
  // PRODUCT REVIEWS
  // =====================================================

  const [productReviews, setProductReviews] = useState([]);

  // =====================================================
  // RESET PRODUCT DATA
  // =====================================================

  useEffect(() => {
    setSelectedVariant(product?.variants?.[0]);
    setQuantity(1);
  }, [product]);

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
              String(productId)
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

    if (productId) {
      loadProductReviews();
    }
  }, [productId]);

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

  if (!selectedVariant) return null;

  const currentPrice =
    selectedVariant.discountPrice ||
    selectedVariant.price;

  const originalPrice = selectedVariant.price;

  const discount = selectedVariant.discountPrice
    ? Math.round(
        ((originalPrice - currentPrice) /
          originalPrice) *
          100
      )
    : 0;

  const handleWishlist = async () => {
    if (!productId) {
      console.error(
        "Product ID not found:",
        product
      );

      return;
    }

    try {
      // ==========================================
      // REMOVE FROM WISHLIST
      // ==========================================

      if (isWishlisted) {
        await removeFromWishlistDB(productId);

        dispatch(removeFromWishlist(productId));

        console.log(
          "❤️ Product removed from wishlist"
        );

        return;
      }

      // ==========================================
      // ADD TO WISHLIST
      // ==========================================

      const wishlistProduct = {
        ...product,
        id: productId,
        name: product.productName,
      };

      // Save to MongoDB first

      await addToWishlistDB(productId);

      // Then update Redux

      dispatch(addToWishlist(wishlistProduct));

      console.log(
        "❤️ Product added to wishlist"
      );
    } catch (error) {
      console.error(
        "Wishlist operation failed:",
        error.response?.data || error.message
      );
    }
  };

  // =====================================================
  // CREATE CART PRODUCT
  // =====================================================

  const getCartProduct = () => {
    return {
      productId: productId,

      variantId:
        selectedVariant?._id ||
        selectedVariant?.id,

      name: product.productName,

      image:
        selectedVariant?.image ||
        product?.image ||
        product?.images?.[0] ||
        "",

      size: selectedVariant.size,

      price: currentPrice,

      quantity: quantity,

      stock: selectedVariant.stock,
    };
  };

  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = () => {
    const cartProduct = getCartProduct();

    dispatch(addToCart(cartProduct));
  };

  // =====================================================
  // BUY NOW
  // =====================================================

  const handleBuyNow = () => {
    const cartProduct = getCartProduct();

    dispatch(addToCart(cartProduct));

    navigate("/checkout");
  };

  return (
    <Box
      sx={{
        pl: {
          xs: 0,
          lg: 2,
          width: 600,
        },
      }}
    >
      {/* Product Name */}

      <Typography
        sx={{
          fontSize: {
            xs: 28,
            md: 34,
            lg: 40,
          },
          fontWeight: 500,
          color: "#1E2F2B",
          lineHeight: 1.15,
          mb: 3,
        }}
      >
        {product.productName}
      </Typography>

      {/* Rating */}

      <Stack
        direction="row"
        alignItems="center"
        spacing={1.2}
      >
        <Rating
          value={averageRating}
          precision={0.5}
          readOnly
          size="small"
        />

        <Typography
          sx={{
            color: "#6F6F6F",
            fontSize: 15,
            fontWeight: 500,
          }}
        >
          {reviewCount > 0
            ? averageRating.toFixed(1)
            : "0.0"}
        </Typography>

        <Typography
          sx={{
            color: "#B5B5B5",
          }}
        >
          |
        </Typography>

        <Typography
          sx={{
            color: "#6F6F6F",
            fontSize: 15,
          }}
        >
          {reviewCount} Reviews
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton
          onClick={handleWishlist}
          sx={{
            width: 48,
            height: 48,
            border: "1px solid #ECE6DD",
            borderRadius: "50%",
            bgcolor: "#fff",

            "&:hover": {
              bgcolor: "#FAF7F2",
            },
          }}
        >
          {isWishlisted ? (
            <FavoriteRoundedIcon
              sx={{
                color: "#E53935",
              }}
            />
          ) : (
            <FavoriteBorderRoundedIcon
              sx={{
                color: "#444",
              }}
            />
          )}
        </IconButton>
      </Stack>

      {/* Description */}

      <Box
        sx={{
          maxWidth: 460,
          mb: 4,
          mt: -1,
        }}
      >
        <Typography
          sx={{
            color: "#6E6E6E",
            fontSize: 16,
            lineHeight: 1.7,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          <Box
            component="span"
            sx={{
              color: "#1E2F2B",
              fontWeight: 600,
            }}
          >
            Description:
          </Box>{" "}
          {product.description}
        </Typography>

        <Typography
          component="span"
          onClick={() => setShowDescription(true)}
          sx={{
            color: "#A86C45",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",

            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          ...More
        </Typography>
      </Box>

      {/* Price */}

      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        mb={4}
      >
        <Typography
          sx={{
            fontSize: {
              xs: 28,
              md: 32,
            },
            fontWeight: 700,
            color: "#5A3B28",
          }}
        >
          ₹{currentPrice}
        </Typography>

        {selectedVariant.discountPrice && (
          <>
            <Typography
              sx={{
                fontSize: 22,
                color: "#999",
                textDecoration: "line-through",
                pt: 1,
              }}
            >
              ₹{originalPrice}
            </Typography>

            <Chip
              label={`${discount}% OFF`}
              sx={{
                bgcolor: "#F5EBDD",
                color: "#A86C45",
                fontWeight: 700,
                borderRadius: "30px",
              }}
            />
          </>
        )}
      </Stack>

      {/* Feature Pills */}

      <Stack
        direction="row"
        spacing={1.5}
        flexWrap="wrap"
        useFlexGap
        mb={3}
        sx={{
          mt: "20px",
        }}
      >
        <Chip
          label="Hydrating"
          sx={{
            bgcolor: "#FAF7F2",
            color: "#5A3B28",
            borderRadius: "30px",
          }}
        />

        <Chip
          label="Sulfate Free"
          sx={{
            bgcolor: "#FAF7F2",
            color: "#5A3B28",
            borderRadius: "30px",
          }}
        />

        <Chip
          label="Paraben Free"
          sx={{
            bgcolor: "#FAF7F2",
            color: "#5A3B28",
            borderRadius: "30px",
          }}
        />

        <Chip
          label="Cruelty Free"
          sx={{
            bgcolor: "#FAF7F2",
            color: "#5A3B28",
            borderRadius: "30px",
          }}
        />
      </Stack>

      <Divider sx={{ mt: 4, mb: 3 }} />

      {/* Select Size */}

      <Typography
        sx={{
          fontSize: 17,
          fontWeight: 600,
          color: "#1E2F2B",
          mb: 2.5,
        }}
      >
        Select Size
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        mb={5}
      >
        {product.variants.map((variant) => (
          <Box
            key={variant._id}
            onClick={() =>
              setSelectedVariant(variant)
            }
            sx={{
              width: 92,
              height: 44,
              borderRadius: 5,
              cursor: "pointer",

              border:
                selectedVariant?._id ===
                variant._id
                  ? "2px solid #C79A72"
                  : "1px solid #ECE6DD",

              bgcolor:
                selectedVariant?._id ===
                variant._id
                  ? "#FBF5EF"
                  : "#fff",

              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",

              transition: ".3s",

              "&:hover": {
                borderColor: "#C79A72",
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                color: "#5A3B28",
              }}
            >
              {variant.size}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Divider sx={{ mt: 4, mb: 4 }} />

      {/* Quantity */}

      <Typography
        sx={{
          fontSize: 17,
          fontWeight: 600,
          color: "#1E2F2B",
          mb: 2.5,
        }}
      >
        Quantity
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        spacing={3}
        mb={5}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#FAF7F2",
            border: "1px solid #ECE6DD",
            borderRadius: "50px",
            overflow: "hidden",
          }}
        >
          <IconButton
            onClick={() =>
              setQuantity((prev) =>
                prev > 1 ? prev - 1 : 1
              )
            }
            sx={{
              width: 48,
              height: 48,
            }}
          >
            <RemoveRoundedIcon />
          </IconButton>

          <Typography
            sx={{
              width: 45,
              textAlign: "center",
              fontWeight: 700,
              color: "#5A3B28",
            }}
          >
            {quantity}
          </Typography>

          <IconButton
            onClick={() =>
              setQuantity((prev) => prev + 1)
            }
            sx={{
              width: 48,
              height: 48,
            }}
          >
            <AddRoundedIcon />
          </IconButton>
        </Box>

        <Typography
          sx={{
            color:
              selectedVariant.stock > 5
                ? "#2E7D32"
                : "#D32F2F",

            fontWeight: 600,
            pt: 2,
          }}
        >
          {selectedVariant.stock > 5
            ? "In Stock"
            : `Only ${selectedVariant.stock} Left`}
        </Typography>
      </Stack>

      {/* Buttons */}

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={2}
        mb={5}
        sx={{
          mt: "20px",
        }}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={handleAddToCart}
          sx={{
            height: 58,
            borderRadius: "50px",
            bgcolor: "#A86C45",
            textTransform: "none",
            fontSize: 16,
            fontWeight: 600,
            boxShadow: "none",

            "&:hover": {
              bgcolor: "#8D5C3A",
              boxShadow: "none",
            },
          }}
        >
          Add To Cart
        </Button>

        <Button
          fullWidth
          variant="outlined"
          onClick={handleBuyNow}
          sx={{
            height: 58,
            borderRadius: "50px",
            textTransform: "none",
            borderWidth: 2,
            borderColor: "#A86C45",
            color: "#A86C45",
            fontWeight: 600,
            fontSize: 16,

            "&:hover": {
              borderWidth: 2,
              borderColor: "#A86C45",
              bgcolor: "#FBF5EF",
            },
          }}
        >
          Buy Now
        </Button>
      </Stack>

      {/* Delivery Card */}

      <Box
        sx={{
          p: 3,
          borderRadius: 4,
          bgcolor: "#FBF8F4",
          border: "1px solid #ECE6DD",
          mb: 4,
          mt: "30px",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="flex-start"
        >
          <LocalShippingOutlinedIcon
            sx={{
              color: "#A86C45",
              mt: 0.3,
            }}
          />

          <Box>
            <Typography
              sx={{
                fontWeight: 600,
                color: "#1E2F2B",
                mb: 0.5,
              }}
            >
              Estimated Delivery
            </Typography>

            <Typography
              sx={{
                color: "#666",
                fontSize: 15,
                mb: 0.5,
              }}
            >
              Get it within 2–4 business days.
            </Typography>

            <Typography
              sx={{
                color: "#A86C45",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              Free Shipping on orders above ₹499
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Trust Badges */}

      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        useFlexGap
      >
        <Chip
          icon={<VerifiedOutlinedIcon />}
          label="100% Authentic"
          sx={{
            bgcolor: "#F8F4EE",
            color: "#5A3B28",
            borderRadius: "30px",

            "& .MuiChip-icon": {
              color: "#A86C45",
            },
          }}
        />

        <Chip
          icon={<AutorenewRoundedIcon />}
          label="Easy Returns"
          sx={{
            bgcolor: "#F8F4EE",
            color: "#5A3B28",
            borderRadius: "30px",

            "& .MuiChip-icon": {
              color: "#A86C45",
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default ProductInfo;