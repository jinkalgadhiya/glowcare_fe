import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../database/productService";
import ProductCard from "./ProductCard";

const BestSeller = () => {
  const navigate = useNavigate();

  /* Get Products */

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    loadProducts();
  }, []);

  /* Best Seller Products */

  const bestSellers = products
    .filter(
      (product) =>
        product.status === "Active" &&
        product.badge === "Best Seller",
    )
    .slice(0, 4);

  if (bestSellers.length === 0) return null;

  return (
    <Box
      sx={{
        width: "100%",

        // =================================================
        // ORIGINAL DESKTOP / LAPTOP
        // =================================================

        py: 10,

        px: {
          xs: 2,
          sm: 4,
          md: 8,
        },

        backgroundColor: "#fff",

        // =================================================
        // MINI LAPTOP
        // 900px - 1199px
        // =================================================

        "@media (min-width: 900px) and (max-width: 1199px)": {
          py: 9,
          px: 6,
        },

        // =================================================
        // TABLET
        // 600px - 899px
        // =================================================

        "@media (min-width: 600px) and (max-width: 899px)": {
          py: 7,
          px: 3,
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

          // =================================================
          // ORIGINAL DESKTOP
          // =================================================

          mb: 7,

          // =================================================
          // TABLET
          // =================================================

          "@media (min-width: 600px) and (max-width: 899px)": {
            mb: 5,
          },

          // =================================================
          // PHONE
          // =================================================

          "@media (max-width: 599px)": {
            mb: 4.5,
          },
        }}
      >
        {/* Small Heading */}

        <Typography
          sx={{
            fontSize: "12px",

            letterSpacing: "4px",

            color: "#9A9A9A",

            textTransform: "uppercase",

            // PHONE ONLY

            "@media (max-width: 599px)": {
              fontSize: "10px",
              letterSpacing: "3px",
            },
          }}
        >
          BEST SELLERS
        </Typography>

        {/* Main Heading */}

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

            "@media (min-width: 900px) and (max-width: 1199px)": {
              fontSize: "48px",
            },

            // =================================================
            // TABLET
            // =================================================

            "@media (min-width: 600px) and (max-width: 899px)": {
              fontSize: "42px",
              lineHeight: 1.2,
            },

            // =================================================
            // PHONE
            // =================================================

            "@media (max-width: 599px)": {
              fontSize: "32px",
              lineHeight: 1.15,
              mt: 0.5,
            },
          }}
        >
          Customer Favorites
        </Typography>

        {/* Description */}

        <Typography
          sx={{
            mt: 2,

            color: "#777",

            fontSize: 16,

            maxWidth: 620,

            mx: "auto",

            lineHeight: 1.8,

            // =================================================
            // TABLET
            // =================================================

            "@media (min-width: 600px) and (max-width: 899px)": {
              fontSize: 15,
              maxWidth: 600,
              lineHeight: 1.7,
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
          Our most loved skincare essentials trusted by thousands for
          healthier, radiant, and glowing skin.
        </Typography>
      </Box>

      {/* =================================================
          CARDS
      ================================================= */}

      <Grid
        container
        spacing={4}
        sx={{
          // =================================================
          // DESKTOP / LAPTOP
          //
          // NO CHANGE HERE
          // =================================================

          // =================================================
          // TABLET
          // =================================================

          "@media (min-width: 600px) and (max-width: 899px)": {
            display: "grid",

            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",

            columnGap: 3,

            rowGap: 3,

            width: "100%",

            margin: 0,

            // Remove Grid's default spacing behavior
            padding: 0,

            "& > .MuiGrid-item": {
              width: "100%",

              maxWidth: "100%",

              padding: 0,
            },
          },

          // =================================================
          // PHONE
          // =================================================

          "@media (max-width: 599px)": {
            display: "grid",

            gridTemplateColumns: "1fr",

            rowGap: 2.5,

            width: "100%",

            margin: 0,

            padding: 0,

            "& > .MuiGrid-item": {
              width: "100%",

              maxWidth: "100%",

              padding: 0,
            },
          },
        }}
      >
        {bestSellers.map((product) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            key={product.id}
            sx={{
              // =================================================
              // TABLET
              // =================================================

              "@media (min-width: 600px) and (max-width: 899px)": {
                width: "100%",
                maxWidth: "100%",
                padding: "0 !important",
              },

              // =================================================
              // PHONE
              // =================================================

              "@media (max-width: 599px)": {
                width: "100%",
                maxWidth: "100%",
                padding: "0 !important",
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

          // =================================================
          // ORIGINAL DESKTOP
          // =================================================

          mt: 7,

          // =================================================
          // TABLET
          // =================================================

          "@media (min-width: 600px) and (max-width: 899px)": {
            mt: 5,
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
          onClick={() => navigate("/best-sellers")}
          sx={{
            // =================================================
            // ORIGINAL DESKTOP
            // DO NOT CHANGE
            // =================================================

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

            "@media (min-width: 600px) and (max-width: 899px)": {
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
          View All Best Sellers
        </Button>
      </Box>
    </Box>
  );
};

export default BestSeller;