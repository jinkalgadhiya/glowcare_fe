import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import ProductCard from "../ProductCard";

const ProductGrid = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <Box
        sx={{
          py: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: 22,
            color: "#777",
            fontWeight: 500,
          }}
        >
          No products found.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid
          item
          key={product.id}
          xs={12}
          sm={6}
          md={4}
          lg={3}
        >
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;