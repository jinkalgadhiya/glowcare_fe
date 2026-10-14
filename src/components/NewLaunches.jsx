import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { getProducts } from "../database/productService";

const NewLaunches = () => {
  const navigate = useNavigate();

  // =====================================================
  // PRODUCTS
  // =====================================================

  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(
        "Error loading products:",
        error,
      );
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // =====================================================
  // NEW LAUNCH PRODUCTS
  // =====================================================

  const newLaunches = products
    .filter(
      (product) =>
        product.status === "Active" &&
        product.badge === "New Launch",
    )
    .slice(0, 4);

  if (newLaunches.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
        py: 10,
        px: {
          xs: 2,
          sm: 4,
          md: 8,
        },
        backgroundColor: "#fff",

        // =================================================
        // MINI LAPTOP
        // =================================================

        "@media (min-width: 900px) and (max-width: 1199px)":
          {
            py: 9,
            px: 6,
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
          mb: 7,

          // =================================================
          // TABLET
          // =================================================

          "@media (max-width: 899px)": {
            mb: 5.5,
          },

          // =================================================
          // PHONE
          // =================================================

          "@media (max-width: 599px)": {
            mb: 4.5,
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            letterSpacing: "4px",
            color: "#9A9A9A",
            textTransform: "uppercase",
            mb: 1,

            "@media (max-width: 599px)": {
              fontSize: "10px",
              letterSpacing: "3px",
              mb: 0.8,
            },
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

            // =================================================
            // MINI LAPTOP
            // =================================================

            "@media (min-width: 900px) and (max-width: 1199px)":
              {
                fontSize: "48px",
              },

            // =================================================
            // TABLET
            // =================================================

            "@media (min-width: 600px) and (max-width: 899px)":
              {
                fontSize: "44px",
              },

            // =================================================
            // PHONE
            // =================================================

            "@media (max-width: 599px)": {
              fontSize: "32px",
              lineHeight: 1.15,
            },
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

            // =================================================
            // TABLET
            // =================================================

            "@media (max-width: 899px)": {
              fontSize: 15,
              maxWidth: 500,
            },

            // =================================================
            // PHONE
            // =================================================

            "@media (max-width: 599px)": {
              mt: 1.5,
              fontSize: 13,
              lineHeight: 1.65,
              maxWidth: "95%",
            },
          }}
        >
          Discover our newest skincare and haircare essentials carefully
          selected to elevate your daily routine.
        </Typography>
      </Box>

      {/* =================================================
          CARDS
      ================================================= */}

      <Grid
        container
        spacing={{
          xs: 2.5,
          sm: 3,
          md: 4,
        }}
        justifyContent="center"
        sx={{
          width: "100%",
          margin: 0,

          // =================================================
          // MINI LAPTOP
          // 2 CARDS PER ROW
          // =================================================

          "@media (min-width: 900px) and (max-width: 1199px)":
            {
              display: "grid",
              gridTemplateColumns:
                "repeat(2, minmax(0, 1fr))",
              columnGap: 3,
              rowGap: 4,
              width: "100%",
              margin: 0,
            },

          // =================================================
          // TABLET
          // 2 CARDS PER ROW + CENTERED
          // =================================================

          "@media (min-width: 600px) and (max-width: 899px)":
            {
              width: "100%",
              margin: 0,
              justifyContent: "center",
            },

          // =================================================
          // PHONE
          // 1 CARD PER ROW
          // =================================================

          "@media (max-width: 599px)": {
            width: "100%",
            margin: 0,
          },
        }}
      >
        {newLaunches.map((product) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={
              product._id ||
              product.id ||
              product.productId
            }
            sx={{
              // =================================================
              // MINI LAPTOP
              // =================================================

              "@media (min-width: 900px) and (max-width: 1199px)":
                {
                  width: "100%",
                  maxWidth: "100%",
                  flexBasis: "auto",
                  flexGrow: 0,
                  padding: "0 !important",
                  display: "flex",
                  justifyContent: "center",
                },

              // =================================================
              // TABLET
              // =================================================

              "@media (min-width: 600px) and (max-width: 899px)":
                {
                  width: "50%",
                  maxWidth: "50%",
                  flexBasis: "50%",
                  display: "flex",
                  justifyContent: "center",
                },

              // =================================================
              // PHONE
              // =================================================

              "@media (max-width: 599px)": {
                width: "100%",
                maxWidth: "100%",
                flexBasis: "100%",
                display: "flex",
                justifyContent: "center",
              },
            }}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* =================================================
          VIEW ALL BUTTON
      ================================================= */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 7,

          // =================================================
          // TABLET
          // =================================================

          "@media (max-width: 899px)": {
            mt: 5.5,
          },

          // =================================================
          // PHONE
          // =================================================

          "@media (max-width: 599px)": {
            mt: 4.5,
          },
        }}
      >
        <Button
          variant="contained"
          onClick={() =>
            navigate("/new-launches")
          }
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
              boxShadow:
                "0 10px 25px rgba(184,148,120,.35)",
              transform: "translateY(-3px)",
            },

            // =================================================
            // TABLET
            // =================================================

            "@media (max-width: 899px)": {
              px: 4.5,
              py: 1.5,
              fontSize: 15,
            },

            // =================================================
            // PHONE
            // =================================================

            "@media (max-width: 599px)": {
              px: 3.5,
              py: 1.3,
              fontSize: 13,
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