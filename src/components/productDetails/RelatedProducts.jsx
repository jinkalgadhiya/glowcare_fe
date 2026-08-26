import { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";

import ProductCard from "../ProductCard";

import { getProducts } from "../../database/productService";

const RelatedProducts = ({ product }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (!product?._id) return;

    loadProducts();
  }, [product]);

  const loadProducts = async () => {
    try {
      const allProducts = await getProducts();

      if (!product) return;

      const currentProductId = product._id || product.id;

      const currentMainCategory =
        product.category?.mainCategory || "";

      const currentSubCategory =
        product.category?.subCategory || "";

      const related = (allProducts || [])
        .filter((item) => {
          const itemId = item._id || item.id;

          // Don't show the current product
          if (itemId === currentProductId) {
            return false;
          }

          // Only show active products
          if (item.status && item.status !== "Active") {
            return false;
          }

          const itemMainCategory =
            item.category?.mainCategory || "";

          const itemSubCategory =
            item.category?.subCategory || "";

          // Prefer matching sub-category
          if (
            currentSubCategory &&
            itemSubCategory &&
            itemSubCategory === currentSubCategory
          ) {
            return true;
          }

          // Otherwise match main category
          if (
            currentMainCategory &&
            itemMainCategory &&
            itemMainCategory === currentMainCategory
          ) {
            return true;
          }

          return false;
        })
        .slice(0, 4);

      setRelatedProducts(related);
    } catch (error) {
      console.error("Error loading related products:", error);
      setRelatedProducts([]);
    }
  };

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        mt: 10,
        mb: 8,
      }}
    >
      {/* Heading */}

      <Box
        sx={{
          textAlign: "center",
          mb: 6,
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#B89478",
            mb: 1.5,
          }}
        >
          You May Also Like
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: 30,
              md: 40,
            },
            fontWeight: 600,
            color: "#1E2F2B",
            lineHeight: 1.2,
          }}
        >
          Complete Your Skincare Routine
        </Typography>

        <Typography
          sx={{
            mt: 1.5,
            color: "#777",
            fontSize: 15,
            maxWidth: 600,
            mx: "auto",
            lineHeight: 1.7,
          }}
        >
          Discover more GlowCare essentials carefully selected
          based on this product.
        </Typography>
      </Box>

      {/* Products */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },

          gap: {
            xs: 3,
            md: 4,
          },

          alignItems: "stretch",
          justifyItems: "center",
        }}
      >
        {relatedProducts.map((item) => (
          <Box
            key={item._id || item.id}
            sx={{
              width: "100%",
              maxWidth: 320,
            }}
          >
            <ProductCard
              product={item}
              showBadge={true}
              showWishlist={true}
              showDescription={true}
              showRating={true}
              showCart={true}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RelatedProducts;