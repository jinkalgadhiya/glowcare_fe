import React from "react";
import {
  Box,
  Typography,
  Button,
} from "@mui/material";

import floatingProducts from "../data/FloatingProducts";
import "../styles/FloatingShowcase.css";

const FloatingShowcase = () => {
  return (
    <Box
      className="bloom-section"
    >
      {/* Background Glow */}

      <Box className="background-glow" />

      {/* Center Content */}

      <Box className="center-content">
        <Typography className="small-title">
          GLOWCARE COLLECTION
        </Typography>

        <Typography className="main-title">
          Healthy Skin
          <br />
          Starts Here
        </Typography>

        <Typography className="description">
          Discover premium skincare crafted with
          clean ingredients, dermatologist-tested
          formulas, and luxurious textures that
          transform your daily routine.
        </Typography>

        <Button
          variant="contained"
          className="explore-btn"
        >
          Explore Collection
        </Button>
      </Box>

      {/* Floating Products */}

      {floatingProducts.map((product) => (
        <Box
          key={product.id}
          className="product-card"
          sx={{
            top: product.top,
            bottom: product.bottom,
            left: product.left,
            right: product.right,
            transform: `rotate(${product.rotate})`,
          }}
        >
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            className="product-image"
          />

          <Typography className="product-name">
            {product.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default FloatingShowcase;