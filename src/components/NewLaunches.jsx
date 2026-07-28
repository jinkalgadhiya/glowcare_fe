import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { getProducts } from "../database/productService";

const NewLaunches = () => {
  const navigate = useNavigate();

  // Get Products
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Only Active New Launch Products
  const newLaunches = products
    .filter(
      (product) =>
        product.status === "Active" && product.badge === "New Launch",
    )
    .slice(0, 4);

  if (newLaunches.length === 0) return null;

  return (
    <Box
      sx={{
        width: "100%",
        py: 10,
        px: { xs: 2, sm: 4, md: 8 },
        backgroundColor: "#fff",
      }}
    >
      {/* Heading */}

      <Box
        sx={{
          textAlign: "center",
          mb: 7,
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            letterSpacing: "4px",
            color: "#9A9A9A",
            textTransform: "uppercase",
            mb: 1,
          }}
        >
          NEW LAUNCHES
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: "36px",
              md: "52px",
            },
            fontWeight: 500,
            color: "#1E2F2B",
          }}
        >
          Fresh Arrivals
        </Typography>

        <Typography
          sx={{
            mt: 2,
            color: "#777",
            fontSize: 16,
            maxWidth: 520,
            mx: "auto",
            lineHeight: 1.8,
          }}
        >
          Discover our newest skincare and haircare essentials carefully
          selected to elevate your daily routine.
        </Typography>
      </Box>

      {/* Cards */}

      <Grid container spacing={4}>
        {newLaunches.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* View All Button */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 7,
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate("/new-launches")}
          sx={{
            px: 5,
            py: 1.7,
            borderRadius: "50px",
            textTransform: "none",
            fontSize: 16,
            fontWeight: 600,
            bgcolor: "#1E2F2B",
            boxShadow: "none",
            transition: ".35s",

            "&:hover": {
              bgcolor: "#B89478",
              boxShadow: "0 10px 25px rgba(184,148,120,.35)",
              transform: "translateY(-3px)",
            },
          }}
        >
          View All New Launches
        </Button>
      </Box>
    </Box>
  );
};

export default NewLaunches;
