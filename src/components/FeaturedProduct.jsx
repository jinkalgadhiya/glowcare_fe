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

import { getCartItems, saveCartItem } from "../database/cartService";

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

import { addToCart, loadCart } from "../redux/cart/cartSlice";

import {
  addToWishlist,
  removeFromWishlist,
  loadWishlist,
} from "../redux/wishlist/wishlistSlice";

const FeaturedProduct = () => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const [products, setProducts] = useState([]);

  const [quantity, setQuantity] = useState(1);

  const [cartLoading, setCartLoading] = useState(false);

  const [wishlistLoading, setWishlistLoading] = useState(false);

  const dispatch = useDispatch();

  // ======================================================
  // REDUX
  // ======================================================

  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  // ======================================================
  // LOAD PRODUCTS
  // ======================================================

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error loading featured products:", error);
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
    (product) => product.status === "Active" && product.featured === true,
  );

  const featuredProduct =
    featuredProducts.length > 0
      ? featuredProducts[featuredProducts.length - 1]
      : null;

  if (!featuredProduct) {
    return null;
  }

  // ======================================================
  // PRODUCT ID
  // ======================================================

  const productId =
    featuredProduct._id || featuredProduct.id || featuredProduct.productId;

  // ======================================================
  // VARIANT
  // ======================================================

  const firstVariant = featuredProduct?.variants?.[0];

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
    Number(firstVariant.discountPrice) || Number(firstVariant.price) || 0;

  const originalPrice = Number(firstVariant.price) || 0;

  // ======================================================
  // WISHLIST CHECK
  // ======================================================

  const isWishlisted = wishlistItems.some(
    (item) => String(item.id || item.productId) === String(productId),
  );

  // ======================================================
  // ADD TO CART
  // ======================================================

  const handleAddToCart = async () => {
    if (!productId || !variantId) {
      console.error("Missing product/variant ID:", {
        productId,
        variantId,
      });

      alert("Unable to add this product to cart.");

      return;
    }

    try {
      setCartLoading(true);

      const cartItem = {
        productId,
        variantId,

        name: featuredProduct.productName || "",

        image: featuredProduct.image || "",

        category:
          featuredProduct.category?.subCategory ||
          featuredProduct.category?.mainCategory ||
          "",

        description: featuredProduct.description || "",

        size: firstVariant.size || "",

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

      console.log("Product successfully added to cart");

      setQuantity(1);
    } catch (error) {
      console.error(
        "Failed to add product to cart:",
        error.response?.data || error.message,
      );

      alert(error.response?.data?.message || "Failed to add product to cart.");
    } finally {
      setCartLoading(false);
    }
  };

  // ======================================================
  // WISHLIST
  // ======================================================

  const handleWishlist = async () => {
    if (!productId) {
      console.error("Missing product ID:", featuredProduct);

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

        dispatch(removeFromWishlist(productId));

        console.log("Product removed from wishlist");

        return;
      }

      // ==================================================
      // ADD TO BACKEND
      // ==================================================

      await addToWishlistDB(productId, variantId);

      // ==================================================
      // ADD TO REDUX
      // ==================================================

      dispatch(
        addToWishlist({
          id: productId,

          productId,

          name: featuredProduct.productName || "",

          image: featuredProduct.image || "",

          category:
            featuredProduct.category?.subCategory ||
            featuredProduct.category?.mainCategory ||
            "",

          description: featuredProduct.description || "",

          badge: featuredProduct.badge || "None",

          variants: featuredProduct.variants || [],

          price: sellingPrice,

          originalPrice,
        }),
      );

      console.log("Product added to wishlist");
    } catch (error) {
      console.error(
        "Wishlist operation failed:",
        error.response?.data || error.message,
      );

      alert(error.response?.data?.message || "Failed to update wishlist.");
    } finally {
      setWishlistLoading(false);
    }
  };

  // ======================================================
  // QUANTITY
  // ======================================================

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    const stock = Number(firstVariant.stock) || 0;

    if (stock > 0) {
      setQuantity((prev) => Math.min(stock, prev + 1));
    }
  };

  // ======================================================
  // UI
  // ======================================================

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#fff",

        // =================================================
        // ORIGINAL DESKTOP — DO NOT CHANGE
        // =================================================

        py: 10,

        px: {
          xs: 3,
          md: 8,
        },

        // =================================================
        // MINI LAPTOP
        // =================================================

        "@media (min-width: 900px) and (max-width: 1199px)": {
          py: 9,
          px: 5,
        },

        // =================================================
        // PHONE
        // =================================================

        "@media (max-width: 599px)": {
          py: 7,
          px: 2,
        },
      }}
    >
      {/* =================================================
          HEADING
      ================================================= */}

      <Box
        sx={{
          textAlign: "center",

          mb: 8,

          "@media (max-width: 899px)": {
            mb: 6,
          },

          "@media (max-width: 599px)": {
            mb: 5,
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "#9B9B9B",

            "@media (max-width: 599px)": {
              fontSize: "10px",
              letterSpacing: "3px",
            },
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

            "@media (min-width: 900px) and (max-width: 1199px)": {
              fontSize: "46px",
            },

            "@media (max-width: 599px)": {
              fontSize: "32px",
              lineHeight: 1.15,
              mt: 0.5,
            },
          }}
        >
          GlowCare's Choice
        </Typography>
      </Box>

      {/* =================================================
          PRODUCT
      ================================================= */}

      <Grid
        container
        spacing={{
          xs: 3,
          sm: 4,
          md: 6,
        }}
        alignItems="center"
        justifyContent="center"
        sx={{
          // =================================================
          // MINI LAPTOP — FORCE 2 COLUMNS
          // =================================================
          "@media (min-width: 900px) and (max-width: 1199px)": {
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            columnGap: 32,
            rowGap: 0,
            width: "100%",
            margin: 0,
          },
        }}
      >
        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <Grid
          item
          xs={12}
          md={6}
          sx={{
  "@media (min-width: 900px) and (max-width: 1199px)": {
    width: "100%",
    maxWidth: "100%",
    flexBasis: "auto",
    flexGrow: 0,
    padding: "0 !important",
  },

  "@media (min-width: 600px) and (max-width: 899px)": {
    width: "100%",
    maxWidth: "100%",
    display: "flex",
    justifyContent: "center",
  },

  "@media (max-width: 599px)": {
    width: "100%",
    maxWidth: "100%",
  },
}}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",

              "@media (max-width: 899px)": {
                width: "100%",
              },
            }}
          >
            <Box
              sx={{
                // =================================================
                // ORIGINAL DESKTOP — UNCHANGED
                // =================================================

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

                // =================================================
                // MINI LAPTOP
                // =================================================

                "@media (min-width: 900px) and (max-width: 1199px)": {
                  width: "100%",
                  maxWidth: "100%",
                  height: "500px",
                  mt: "20px",
                },

                // =================================================
                // TABLET
                // =================================================

                "@media (min-width: 600px) and (max-width: 899px)": {
                  width: "100%",
                  maxWidth: "600px",
                  height: "500px",
                  mt: 0,
                  mx: "auto",
                },

                // =================================================
                // PHONE
                // =================================================

                "@media (max-width: 599px)": {
                  width: "100%",
                  height: "360px",
                  mt: 0,
                },
              }}
            >
              <Box
                component="img"
                src={featuredProduct.image}
                alt={featuredProduct.productName || "Featured Product"}
                sx={{
                  // =================================================
                  // ORIGINAL DESKTOP — UNCHANGED
                  // =================================================

                  width: "650px",
                  maxWidth: "90%",

                  objectFit: "contain",

                  position: "relative",

                  zIndex: 2,

                  transition: ".4s",

                  "&:hover": {
                    transform: "scale(1.04)",
                  },

                  // =================================================
                  // MINI LAPTOP
                  // =================================================

                  "@media (min-width: 900px) and (max-width: 1199px)": {
                    width: "100%",
                    maxWidth: "88%",
                  },

                  // =================================================
                  // TABLET
                  // =================================================

                  "@media (min-width: 600px) and (max-width: 899px)": {
                    width: "500px",
                    maxWidth: "85%",
                  },

                  // =================================================
                  // PHONE
                  // =================================================

                  "@media (max-width: 599px)": {
                    width: "310px",
                    maxWidth: "82%",
                  },
                }}
              />

              {/* =================================================
                  BADGE
              ================================================= */}

              {featuredProduct.badge && featuredProduct.badge !== "None" && (
                <Box
                  sx={{
                    position: "absolute",

                    top: 20,
                    right: 20,

                    backgroundColor:
                      featuredProduct.badge === "Best Seller"
                        ? "#1E2F2B"
                        : featuredProduct.badge === "New Launch"
                          ? "#2E7D32"
                          : featuredProduct.badge === "Trending"
                            ? "#E67E22"
                            : featuredProduct.badge === "Limited Stock"
                              ? "#D97706"
                              : featuredProduct.badge === "Out of Stock"
                                ? "#C62828"
                                : featuredProduct.badge === "Sold Out"
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

                    "@media (max-width: 599px)": {
                      top: 12,
                      right: 12,
                      px: 1.3,
                      py: 0.5,
                      fontSize: 8,
                      letterSpacing: 0.7,
                    },
                  }}
                >
                  {featuredProduct.badge}
                </Box>
              )}
            </Box>
          </Box>
        </Grid>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <Grid
          item
          xs={12}
          md={6}
          sx={{
  display: "flex",
  alignItems: "center",

  "@media (min-width: 900px) and (max-width: 1199px)": {
    width: "100%",
    maxWidth: "100%",
    flexBasis: "auto",
    flexGrow: 0,
    padding: "0 !important",
    justifyContent: "flex-start",
  },

  "@media (min-width: 600px) and (max-width: 899px)": {
    width: "100%",
    maxWidth: "100%",
    justifyContent: "center",
    textAlign: "center",
  },

  "@media (max-width: 599px)": {
    width: "100%",
    maxWidth: "100%",
  },
}}
        >
          <Box
            sx={{
              // =================================================
              // ORIGINAL DESKTOP — UNCHANGED
              // =================================================

              width: "550px",

              pl: {
                xs: 0,
                md: 3,
              },

              pr: {
                xs: 0,
                md: 1,
              },

              // =================================================
              // MINI LAPTOP
              // =================================================

              "@media (min-width: 900px) and (max-width: 1199px)": {
                width: "100%",
                maxWidth: "100%",
                pl: 1,
                pr: 1,
              },

              // =================================================
              // TABLET — CENTER
              // =================================================

              "@media (min-width: 600px) and (max-width: 899px)": {
                width: "100%",
                maxWidth: "600px",
                mx: "auto",
                pl: 0,
                pr: 0,
                textAlign: "center",
              },

              // =================================================
              // PHONE
              // =================================================

              "@media (max-width: 599px)": {
                width: "100%",
                pl: 0,
                pr: 0,
              },
            }}
          >
            {/* =================================================
                PRODUCT NAME
            ================================================= */}

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

                "@media (min-width: 900px) and (max-width: 1199px)": {
                  fontSize: 32,
                },

                "@media (max-width: 899px)": {
                  textAlign: "center",
                },

                "@media (max-width: 599px)": {
                  fontSize: 27,
                  lineHeight: 1.25,
                  textAlign: "left",
                },
              }}
            >
              {featuredProduct.productName}
            </Typography>

            {/* =================================================
                CATEGORY
            ================================================= */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 2,
                flexWrap: "wrap",

                // TABLET CENTER
                "@media (min-width: 600px) and (max-width: 899px)": {
                  justifyContent: "center",
                },

                "@media (max-width: 599px)": {
                  gap: 1.2,
                  mb: 1.7,
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: 15,
                  color: "#666",

                  "@media (max-width: 599px)": {
                    fontSize: 13,
                  },
                }}
              >
                {featuredProduct.category?.subCategory ||
                  featuredProduct.category?.mainCategory ||
                  "Category"}
              </Typography>

              <Typography
                sx={{
                  fontSize: 15,
                  color: "#666",

                  "@media (max-width: 599px)": {
                    fontSize: 13,
                  },
                }}
              >
                Size: <strong>{firstVariant.size || "-"}</strong>
              </Typography>

              <Typography
                sx={{
                  color: "#F6A200",
                  fontSize: 16,

                  "@media (max-width: 599px)": {
                    fontSize: 14,
                  },
                }}
              >
                ★★★★★
              </Typography>

              <Typography
                sx={{
                  fontSize: 15,
                  color: "#666",

                  "@media (max-width: 599px)": {
                    fontSize: 13,
                  },
                }}
              >
                {featuredProduct.rating || "4.8"}
              </Typography>
            </Box>

            {/* =================================================
                PRICE
            ================================================= */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 0.5,

                // TABLET CENTER
                "@media (min-width: 600px) and (max-width: 899px)": {
                  justifyContent: "center",
                },

                "@media (max-width: 599px)": {
                  gap: 1.5,
                },
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

                  "@media (max-width: 599px)": {
                    fontSize: 32,
                  },
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

                    textDecoration: "line-through",

                    textDecorationColor: "#c45252",

                    textDecorationThickness: "2px",

                    "@media (max-width: 599px)": {
                      fontSize: 17,
                    },
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

                "@media (max-width: 599px)": {
                  fontSize: 12,
                  mb: 1.7,
                },
              }}
            >
              Inclusive of all taxes
            </Typography>

            {/* =================================================
                PURCHASED
            ================================================= */}

            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",

                background: "#F5F4F1",

                px: 2,
                py: 1,

                borderRadius: 1,

                mb: 3,

                // TABLET CENTER
                "@media (min-width: 600px) and (max-width: 899px)": {
                  mx: "auto",
                },

                "@media (max-width: 599px)": {
                  px: 1.5,
                  py: 0.8,
                  mb: 2.5,
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: 13,
                  color: "#4A6950",

                  "@media (max-width: 599px)": {
                    fontSize: 11,
                  },
                }}
              >
                ❤ 89 people purchased this product
              </Typography>
            </Box>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 600,
                color: "#1E2F2B",
                mb: 1,

                "@media (max-width: 599px)": {
                  fontSize: 15,
                },
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
                  WebkitLineClamp: showFullDescription ? "unset" : 3,
                  WebkitBoxOrient: "vertical",

                  "@media (max-width: 899px)": {
                    textAlign: "center",
                  },

                  "@media (max-width: 599px)": {
                    fontSize: 13,
                    lineHeight: 1.7,
                    textAlign: "left",
                  },
                }}
              >
                {featuredProduct.description || "No description available."}
              </Typography>

              {featuredProduct.description?.length > 120 && (
                <Typography
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  sx={{
                    mt: 1,
                    display: "inline-block",
                    cursor: "pointer",
                    color: "#B89478",
                    fontWeight: 600,
                    fontSize: 14,

                    "&:hover": {
                      textDecoration: "underline",
                    },

                    "@media (max-width: 599px)": {
                      fontSize: 13,
                    },
                  }}
                >
                  {showFullDescription ? "Read Less" : "Read More"}
                </Typography>
              )}
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* =================================================
                KEY INGREDIENTS
            ================================================= */}

            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 600,
                color: "#1E2F2B",
                mb: 1,

                "@media (max-width: 599px)": {
                  fontSize: 15,
                },
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

                "@media (max-width: 899px)": {
                  textAlign: "center",
                },

                "@media (max-width: 599px)": {
                  fontSize: 13,
                  lineHeight: 1.65,
                  mb: 2.5,
                },
              }}
            >
              {featuredProduct.keyIngredients || "No key ingredients available"}
            </Typography>

            {/* =================================================
                QUANTITY
            ================================================= */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 3,

                // TABLET CENTER
                "@media (min-width: 600px) and (max-width: 899px)": {
                  justifyContent: "center",
                  gap: 4,
                  flexWrap: "wrap",
                },

                "@media (max-width: 599px)": {
                  mb: 2.5,
                },
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
                  sx={{
                    "@media (max-width: 599px)": {
                      p: 0.8,
                    },
                  }}
                >
                  <RemoveOutlinedIcon
                    sx={{
                      "@media (max-width: 599px)": {
                        fontSize: 19,
                      },
                    }}
                  />
                </IconButton>

                <Typography
                  sx={{
                    width: 35,
                    textAlign: "center",

                    "@media (max-width: 599px)": {
                      width: 30,
                      fontSize: 14,
                    },
                  }}
                >
                  {quantity}
                </Typography>

                <IconButton
                  onClick={handleIncrease}
                  disabled={Number(firstVariant.stock) <= 0}
                  sx={{
                    "@media (max-width: 599px)": {
                      p: 0.8,
                    },
                  }}
                >
                  <AddOutlinedIcon
                    sx={{
                      "@media (max-width: 599px)": {
                        fontSize: 19,
                      },
                    }}
                  />
                </IconButton>
              </Box>

              <Typography
                sx={{
                  fontSize: 14,
                  color: "#666",

                  "@media (max-width: 599px)": {
                    fontSize: 12,
                  },
                }}
              >
                Stock: <strong>{firstVariant.stock || 0}</strong>
              </Typography>
            </Box>

            {/* =================================================
                ADD TO CART
            ================================================= */}

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

                "@media (max-width: 599px)": {
                  height: 48,
                  fontSize: 14,
                },
              }}
            >
              {cartLoading ? "Adding..." : "Add To Cart"}
            </Button>

            {/* =================================================
                WISHLIST
            ================================================= */}

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

                "@media (max-width: 599px)": {
                  height: 48,
                  fontSize: 13,
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
