import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  IconButton,
} from "@mui/material";

import { getProducts } from "../database/productService";

import {
  getCartItems,
  saveCartItem,
} from "../database/cartService";

import {
  getWishlist,
  addToWishlistDB,
  removeFromWishlistDB,
} from "../database/wishlistService";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  loadCart,
} from "../redux/cart/cartSlice";

import {
  addToWishlist,
  removeFromWishlist,
  loadWishlist,
} from "../redux/wishlist/wishlistSlice";

const FeaturedProduct = () => {
  const [showFullDescription, setShowFullDescription] =
    useState(false);

  const [products, setProducts] = useState([]);

  const [quantity, setQuantity] = useState(1);

  const [cartLoading, setCartLoading] = useState(false);

  const [wishlistLoading, setWishlistLoading] =
    useState(false);

  const dispatch = useDispatch();

  // ======================================================
  // REDUX
  // ======================================================

  const wishlistItems = useSelector(
    (state) => state.wishlist?.items || [],
  );

  // ======================================================
  // LOAD PRODUCTS
  // ======================================================

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(
          Array.isArray(data) ? data : [],
        );
      } catch (error) {
        console.error(
          "Error loading featured products:",
          error,
        );
      }
    };

    loadProducts();
  }, []);

  // ======================================================
  // LOAD CART FROM BACKEND
  // ======================================================

  useEffect(() => {
    const loadBackendCart = async () => {
      try {
        const data = await getCartItems();

        dispatch(loadCart(data));
      } catch (error) {
        console.error(
          "Failed to load cart from backend:",
          error.response?.data || error.message,
        );
      }
    };

    loadBackendCart();
  }, [dispatch]);

  // ======================================================
  // LOAD WISHLIST FROM BACKEND
  // ======================================================

  useEffect(() => {
    const loadBackendWishlist = async () => {
      try {
        const data = await getWishlist();

        if (Array.isArray(data)) {
          dispatch(loadWishlist(data));
        }
      } catch (error) {
        console.error(
          "Failed to load wishlist from backend:",
          error.response?.data || error.message,
        );
      }
    };

    loadBackendWishlist();
  }, [dispatch]);

  // ======================================================
  // FEATURED PRODUCT
  // ======================================================

  const featuredProducts = products.filter(
    (product) =>
      product.status === "Active" &&
      product.featured === true,
  );

  const featuredProduct =
    featuredProducts.length > 0
      ? featuredProducts[
          featuredProducts.length - 1
        ]
      : null;

  if (!featuredProduct) {
    return null;
  }

  // ======================================================
  // PRODUCT ID
  // ======================================================

  const productId =
    featuredProduct._id ||
    featuredProduct.id ||
    featuredProduct.productId;

  // ======================================================
  // VARIANT
  // ======================================================

  const firstVariant =
    featuredProduct?.variants?.[0];

  if (!firstVariant) {
    return null;
  }

  const variantId =
    firstVariant._id ||
    firstVariant.id ||
    firstVariant.variantId ||
    firstVariant.size;

  // ======================================================
  // PRICE
  // ======================================================

  const sellingPrice =
    Number(firstVariant.discountPrice) ||
    Number(firstVariant.price) ||
    0;

  const originalPrice =
    Number(firstVariant.price) || 0;

  // ======================================================
  // WISHLIST CHECK
  // ======================================================

  const isWishlisted = wishlistItems.some(
    (item) =>
      String(item.id || item.productId) ===
      String(productId),
  );

  // ======================================================
  // ADD TO CART
  // ======================================================

  const handleAddToCart = async () => {
    if (!productId || !variantId) {
      console.error(
        "Missing product/variant ID:",
        {
          productId,
          variantId,
        },
      );

      alert(
        "Unable to add this product to cart.",
      );

      return;
    }

    try {
      setCartLoading(true);

      const cartItem = {
        productId,
        variantId,

        name:
          featuredProduct.productName || "",

        image:
          featuredProduct.image || "",

        category:
          featuredProduct.category?.subCategory ||
          featuredProduct.category?.mainCategory ||
          "",

        description:
          featuredProduct.description || "",

        size:
          firstVariant.size || "",

        price: sellingPrice,

        originalPrice,

        quantity,
      };

      // ==================================================
      // UPDATE REDUX
      // ==================================================

      dispatch(addToCart(cartItem));

      // ==================================================
      // SAVE DIRECTLY TO BACKEND
      // ==================================================

      await saveCartItem(cartItem);

      console.log(
        "Product successfully added to cart",
      );

      setQuantity(1);
    } catch (error) {
      console.error(
        "Failed to add product to cart:",
        error.response?.data || error.message,
      );

      alert(
        error.response?.data?.message ||
          "Failed to add product to cart.",
      );
    } finally {
      setCartLoading(false);
    }
  };

  // ======================================================
  // WISHLIST
  // ======================================================

  const handleWishlist = async () => {
    if (!productId) {
      console.error(
        "Missing product ID:",
        featuredProduct,
      );

      alert("Unable to update wishlist.");

      return;
    }

    try {
      setWishlistLoading(true);

      // ==================================================
      // REMOVE
      // ==================================================

      if (isWishlisted) {
        await removeFromWishlistDB(productId);

        dispatch(
          removeFromWishlist(productId),
        );

        console.log(
          "Product removed from wishlist",
        );

        return;
      }

      // ==================================================
      // ADD TO BACKEND
      // ==================================================

      await addToWishlistDB(
        productId,
        variantId,
      );

      // ==================================================
      // ADD TO REDUX
      // ==================================================

      dispatch(
        addToWishlist({
          id: productId,

          productId,

          name:
            featuredProduct.productName || "",

          image:
            featuredProduct.image || "",

          category:
            featuredProduct.category?.subCategory ||
            featuredProduct.category?.mainCategory ||
            "",

          description:
            featuredProduct.description || "",

          badge:
            featuredProduct.badge || "None",

          variants:
            featuredProduct.variants || [],

          price: sellingPrice,

          originalPrice,
        }),
      );

      console.log(
        "Product added to wishlist",
      );
    } catch (error) {
      console.error(
        "Wishlist operation failed:",
        error.response?.data ||
          error.message,
      );

      alert(
        error.response?.data?.message ||
          "Failed to update wishlist.",
      );
    } finally {
      setWishlistLoading(false);
    }
  };

  // ======================================================
  // QUANTITY
  // ======================================================

  const handleDecrease = () => {
    setQuantity((prev) =>
      Math.max(1, prev - 1),
    );
  };

  const handleIncrease = () => {
    const stock =
      Number(firstVariant.stock) || 0;

    if (stock > 0) {
      setQuantity((prev) =>
        Math.min(stock, prev + 1),
      );
    }
  };

  // ======================================================
  // UI
  // ======================================================

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#FCFAF7",
        py: 10,
        px: {
          xs: 3,
          md: 8,
        },
      }}
    >
      {/* HEADING */}

      <Box
        sx={{
          textAlign: "center",
          mb: 8,
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "#9B9B9B",
          }}
        >
          FEATURED PRODUCT
        </Typography>

        <Typography
          sx={{
            fontWeight: 500,
            color: "#1E2F2B",
            fontSize: {
              xs: "42px",
              md: "50px",
            },
          }}
        >
          GlowCare's Choice
        </Typography>
      </Box>

      {/* PRODUCT */}

      <Grid
        container
        spacing={6}
        alignItems="center"
      >
        {/* LEFT SIDE */}

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "700px",
                maxWidth: "720px",
                height: "620px",
                backgroundColor: "#F3F4EE",
                border: "1px solid #E7E3DC",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
                mt: "40px",
              }}
            >
              <Box
                component="img"
                src={featuredProduct.image}
                alt={
                  featuredProduct.productName ||
                  "Featured Product"
                }
                sx={{
                  width: "650px",
                  maxWidth: "90%",
                  objectFit: "contain",
                  position: "relative",
                  zIndex: 2,
                  transition: ".4s",

                  "&:hover": {
                    transform: "scale(1.04)",
                  },
                }}
              />

              {/* BADGE */}

              {featuredProduct.badge &&
                featuredProduct.badge !== "None" && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 20,
                      right: 20,

                      backgroundColor:
                        featuredProduct.badge ===
                        "Best Seller"
                          ? "#1E2F2B"
                          : featuredProduct.badge ===
                              "New Launch"
                            ? "#2E7D32"
                            : featuredProduct.badge ===
                                "Trending"
                              ? "#E67E22"
                              : featuredProduct.badge ===
                                  "Limited Stock"
                                ? "#D97706"
                                : featuredProduct.badge ===
                                    "Out of Stock"
                                  ? "#C62828"
                                  : featuredProduct.badge ===
                                      "Sold Out"
                                    ? "#616161"
                                    : "#1E2F2B",

                      color: "#fff",
                      px: 2,
                      py: 0.7,
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: 1,
                      borderRadius: "4px",
                      textTransform: "uppercase",
                      zIndex: 3,
                    }}
                  >
                    {featuredProduct.badge}
                  </Box>
                )}
            </Box>
          </Box>
        </Grid>

        {/* RIGHT SIDE */}

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "550px",
              pl: {
                xs: 0,
                md: 3,
              },
              pr: {
                xs: 0,
                md: 1,
              },
            }}
          >
            {/* PRODUCT NAME */}

            <Typography
              sx={{
                fontSize: {
                  xs: 30,
                  md: 34,
                },
                fontWeight: 500,
                color: "#1E2F2B",
                lineHeight: 1.2,
                mb: 0.8,
              }}
            >
              {featuredProduct.productName}
            </Typography>

            {/* CATEGORY */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography
                sx={{
                  fontSize: 15,
                  color: "#666",
                }}
              >
                {featuredProduct.category
                  ?.subCategory ||
                  featuredProduct.category
                    ?.mainCategory ||
                  "Category"}
              </Typography>

              <Typography
                sx={{
                  fontSize: 15,
                  color: "#666",
                }}
              >
                Size:{" "}
                <strong>
                  {firstVariant.size || "-"}
                </strong>
              </Typography>

              <Typography
                sx={{
                  color: "#F6A200",
                  fontSize: 16,
                }}
              >
                ★★★★★
              </Typography>

              <Typography
                sx={{
                  fontSize: 15,
                  color: "#666",
                }}
              >
                {featuredProduct.rating ||
                  "4.8"}
              </Typography>
            </Box>

            {/* PRICE */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 0.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: 34,
                    md: 40,
                  },
                  fontWeight: 600,
                  color: "#1E2F2B",
                }}
              >
                ₹{sellingPrice}
              </Typography>

              {firstVariant.discountPrice && (
                <Typography
                  sx={{
                    fontSize: {
                      xs: 18,
                      md: 20,
                    },
                    fontWeight: 500,
                    color: "#9A9A9A",
                    textDecoration:
                      "line-through",
                    textDecorationColor:
                      "#c45252",
                    textDecorationThickness:
                      "2px",
                  }}
                >
                  ₹{originalPrice}
                </Typography>
              )}
            </Box>

            <Typography
              sx={{
                fontSize: 13,
                color: "#888",
                mb: 2,
              }}
            >
              Inclusive of all taxes
            </Typography>

            {/* PURCHASED */}

            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                background: "#F5F4F1",
                px: 2,
                py: 1,
                borderRadius: 1,
                mb: 3,
              }}
            >
              <Typography
                sx={{
                  fontSize: 13,
                  color: "#4A6950",
                }}
              >
                ❤ 89 people purchased this
                product
              </Typography>
            </Box>

            {/* DESCRIPTION */}

            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 600,
                color: "#1E2F2B",
                mb: 1,
              }}
            >
              Description
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  color: "#666",
                  lineHeight: 1.8,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp:
                    showFullDescription
                      ? "unset"
                      : 3,
                  WebkitBoxOrient:
                    "vertical",
                }}
              >
                {featuredProduct.description ||
                  "No description available."}
              </Typography>

              {featuredProduct.description
                ?.length > 120 && (
                <Typography
                  onClick={() =>
                    setShowFullDescription(
                      !showFullDescription,
                    )
                  }
                  sx={{
                    mt: 1,
                    display: "inline-block",
                    cursor: "pointer",
                    color: "#B89478",
                    fontWeight: 600,
                    fontSize: 14,

                    "&:hover": {
                      textDecoration:
                        "underline",
                    },
                  }}
                >
                  {showFullDescription
                    ? "Read Less"
                    : "Read More"}
                </Typography>
              )}
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* KEY INGREDIENTS */}

            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 600,
                color: "#1E2F2B",
                mb: 1,
              }}
            >
              Key Ingredients
            </Typography>

            <Typography
              sx={{
                fontSize: 14,
                color: "#666",
                lineHeight: 1.7,
                mb: 3,
              }}
            >
              {featuredProduct.keyIngredients ||
                "No key ingredients available"}
            </Typography>

            {/* QUANTITY */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "space-between",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #DDD",
                  borderRadius: "30px",
                }}
              >
                <IconButton
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                >
                  <RemoveOutlinedIcon />
                </IconButton>

                <Typography
                  sx={{
                    width: 35,
                    textAlign: "center",
                  }}
                >
                  {quantity}
                </Typography>

                <IconButton
                  onClick={handleIncrease}
                  disabled={
                    Number(
                      firstVariant.stock,
                    ) <= 0
                  }
                >
                  <AddOutlinedIcon />
                </IconButton>
              </Box>

              <Typography
                sx={{
                  fontSize: 14,
                  color: "#666",
                }}
              >
                Stock:{" "}
                <strong>
                  {firstVariant.stock || 0}
                </strong>
              </Typography>
            </Box>

            {/* ADD TO CART */}

            <Button
              onClick={handleAddToCart}
              disabled={cartLoading}
              fullWidth
              variant="contained"
              sx={{
                height: 52,
                background: "#1E2F2B",
                textTransform: "none",
                fontSize: 15,
                boxShadow: "none",
                borderRadius: 0,
                mb: 1.5,

                "&:hover": {
                  background: "#16251F",
                  boxShadow: "none",
                },
              }}
            >
              {cartLoading
                ? "Adding..."
                : "Add To Cart"}
            </Button>

            {/* WISHLIST */}

            <Button
              onClick={handleWishlist}
              disabled={wishlistLoading}
              fullWidth
              variant="outlined"
              startIcon={
                isWishlisted ? (
                  <FavoriteRoundedIcon />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )
              }
              sx={{
                height: 52,
                borderRadius: 0,
                borderColor: "#1E2F2B",
                color: "#1E2F2B",
                textTransform: "none",
                mb: 3,

                "&:hover": {
                  borderColor: "#1E2F2B",
                  backgroundColor: "#F8F6F2",
                },
              }}
            >
              {wishlistLoading
                ? "Updating..."
                : isWishlisted
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeaturedProduct;