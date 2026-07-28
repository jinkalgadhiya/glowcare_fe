import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { getProducts } from "../database/productService";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/wishlist/wishlistSlice";
import { addToCart } from "../redux/cart/cartSlice";

const FeaturedProduct = () => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading featured products:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const featuredProducts = products.filter(
    (product) => product.status === "Active" && product.featured,
  );

  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.items);

  const featuredProduct =
    featuredProducts.length > 0
      ? featuredProducts[featuredProducts.length - 1]
      : null;

  if (!featuredProduct) return null;

  const firstVariant = featuredProduct?.variants?.[0];

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: featuredProduct.id,
        variantId: firstVariant.id,
        name: featuredProduct.name,
        image: featuredProduct.image,
        size: firstVariant.size,
        price: firstVariant.discountPrice || firstVariant.price,
        quantity: 1,
      }),
    );
  };

  const isWishlisted = wishlistItems.some(
    (item) => item.id === featuredProduct.id,
  );

  const handleWishlist = () => {
    if (!featuredProduct || !firstVariant) return;

    if (isWishlisted) {
      dispatch(removeFromWishlist(featuredProduct.id));
    } else {
      dispatch(
        addToWishlist({
          id: featuredProduct.id,
          name: featuredProduct.name,
          image: featuredProduct.image,
          category: featuredProduct.category,
          description: featuredProduct.description,
          badge: featuredProduct.badge,

          variants: featuredProduct.variants,

          price: firstVariant.discountPrice || firstVariant.price,
        }),
      );
    }
  };

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
      {/* Heading */}

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

      {/* Product Section */}

      <Grid container spacing={6} alignItems="center">
        {/* Left Side */}

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* Product Card */}

            <Box
              sx={{
                width: "700px",
                maxWidth: 720,
                height: 620,
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
              {/* Soft Background Circle */}

              {/* <Box
                sx={{
                  position: "absolute",
                  width: 600,
                  height: 560,
                  borderRadius: "50%",
                  backgroundColor: "#ECEEE7",
                }}
              /> */}

              {/* Product Image */}

              <Box
                component="img"
                src={featuredProduct.image}
                alt={featuredProduct.name}
                sx={{
                  width: "650px",
                  // maxHeight: 500,
                  objectFit: "contain",
                  position: "relative",
                  zIndex: 2,
                  transition: ".4s",

                  "&:hover": {
                    transform: "scale(1.04)",
                  },
                }}
              />

              {/* Best Seller Badge */}

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
                  }}
                >
                  {featuredProduct.badge}
                </Box>
              )}
            </Box>
          </Box>
        </Grid>

        {/* Right Side */}

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
              pl: { xs: 0, md: 3 },
              pr: { xs: 0, md: 1 },
            }}
          >
            {/* Product Name */}

            <Typography
              sx={{
                fontSize: { xs: 30, md: 34 },
                fontWeight: 500,
                color: "#1E2F2B",
                lineHeight: 1.2,
                mb: 0.8,
              }}
            >
              {featuredProduct.name}
            </Typography>

            {/* Category */}

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
                {featuredProduct.category}
              </Typography>

              <Typography
                sx={{
                  fontSize: 15,
                  color: "#666",
                }}
              >
                Size :{" "}
                <strong>{featuredProduct.variants?.[0]?.size || 0}</strong>
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
                4.8
              </Typography>
            </Box>

            {/* Price */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 0.5,
              }}
            >
              {/* Discount Price / Selling Price */}

              <Typography
                sx={{
                  fontSize: { xs: 34, md: 40 },
                  fontWeight: 600,
                  color: "#1E2F2B",
                }}
              >
                ₹
                {featuredProduct.variants?.[0]?.discountPrice ||
                  featuredProduct.variants?.[0]?.price ||
                  0}
              </Typography>

              {/* Original Price */}

              {featuredProduct.variants?.[0]?.discountPrice && (
                <Typography
                  sx={{
                    fontSize: { xs: 18, md: 20 },
                    fontWeight: 500,
                    color: "#9A9A9A",
                    textDecoration: "line-through",
                    textDecorationColor: "#c45252",
                    textDecorationThickness: "2px",
                  }}
                >
                  ₹{featuredProduct.variants?.[0]?.price}
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

            {/* Purchased */}

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
                ❤ 89 people purchased this product
              </Typography>
            </Box>

            {/* Description */}

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

                  WebkitLineClamp: showFullDescription ? "unset" : 3,

                  WebkitBoxOrient: "vertical",
                }}
              >
                {featuredProduct.description}
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
                  }}
                >
                  {showFullDescription ? "Read Less" : "Read More"}
                </Typography>
              )}
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Ingredients */}

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
              {featuredProduct.keyIngredients || "No key ingredients available"}
            </Typography>

            {/* Quantity */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
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
                <IconButton>
                  <RemoveOutlinedIcon />
                </IconButton>

                <Typography
                  sx={{
                    width: 35,
                    textAlign: "center",
                  }}
                >
                  1
                </Typography>

                <IconButton>
                  <AddOutlinedIcon />
                </IconButton>
              </Box>

              <Typography
                sx={{
                  fontSize: 14,
                  color: "#666",
                }}
              >
                Stock :{" "}
                <strong>{featuredProduct.variants?.[0]?.stock || 0}</strong>
              </Typography>
            </Box>

            {/* Buttons */}

            <Button
              onClick={handleAddToCart}
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
              Add To Cart
            </Button>

            <Button
              onClick={handleWishlist}
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
                },
              }}
            >
              {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeaturedProduct;
