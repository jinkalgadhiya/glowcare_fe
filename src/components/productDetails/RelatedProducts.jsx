import { useEffect, useState } from "react";

import {
  Box,
  Typography,
} from "@mui/material";

import ProductCard from "../ProductCard";

import { getProducts } from "../../database/productService";

const RelatedProducts = ({ product }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, [product]);

  const loadProducts = async () => {
    const allProducts = await getProducts();

    const related = allProducts
      .filter(
        (item) =>
          item.category === product.category &&
          item.id !== product.id
      )
      .slice(0, 4);

    setRelatedProducts(related);
  };

  if (relatedProducts.length === 0) return null;

  return (
    <Box
      sx={{
        mt: 10,
      }}
    >
      <Typography
        sx={{
          fontSize: {
            xs: 30,
            md: 40,
          },
          fontWeight: 700,
          color: "#1E2F2B",
          textAlign: "center",
          mb: 1,
        }}
      >
        You May Also Like
      </Typography>

      <Typography
        sx={{
          color: "#7A7A7A",
          textAlign: "center",
          mb: 6,
        }}
      >
        Discover more GlowCare essentials carefully selected for you.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2,1fr)",
            lg: "repeat(4,1fr)",
          },
          gap: 1,
          justifyItems: "center",
        }}
      >
        {relatedProducts.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
          />
        ))}
      </Box>
    </Box>
  );
};

export default RelatedProducts;