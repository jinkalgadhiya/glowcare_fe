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
          width: "100%",
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
    <Grid
      container
      spacing={4}
      sx={{
        width: "100%",
        px: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >
      {products.map((product) => (
        <Grid
          item
          key={product._id || product.id}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ProductCard product={product} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;