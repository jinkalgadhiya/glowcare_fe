import React from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";

import SkincareImg from "../assets/Category-Skincare.jfif";
import HaircareImg from "../assets/Category-Haircare.jfif";
import FragranceImg from "../assets/Category-Fragrance.jfif";
import AccessoriesImg from "../assets/Category-Accessories.jfif";

const categories = [
  {
    title: "Skin Care",
    image: SkincareImg,
  },
  {
    title: "Hair Care",
    image: HaircareImg,
  },
  {
    title: "Fragrances",
    image: FragranceImg,
  },
  {
    title: "Accessories",
    image: AccessoriesImg,
  },
];

const ShopByCategory = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#fff",
        py: 10,
        px: { xs: 3, md: 8 },
      }}
    >
      {/* Heading */}
      {/* Heading */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          mb: 8,
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            letterSpacing: "4px",
            color: "#9a9a9a",
            textTransform: "uppercase",
            mb: 1,
          }}
        >
          SHOP BY CATEGORIES
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 500,
            color: "#1e2f2b",
          }}
        >
          Popular Categories
        </Typography>
      </Box>

      {/* Categories */}
      <Grid container spacing={4} justifyContent="center">
        {categories.map((category) => (
          <Grid
            key={category.title}
            size={{ xs: 12, sm: 6, md: 3 }}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              {/* Image */}
              <Box
                sx={{
                  width: 220,
                  height: 300,
                  borderRadius: "120px",
                  overflow: "hidden",
                  mx: "auto",
                }}
              >
                <Box
                  component="img"
                  src={category.image}
                  alt={category.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "0.5s",

                    "&:hover": {
                      transform: "scale(1.08)",
                    },
                  }}
                />
              </Box>

              {/* Title */}
              <Typography
                sx={{
                  mt: 3,
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#1e2f2b",
                }}
              >
                {category.title}
              </Typography>

              {/* Explore */}
              <Typography
                sx={{
                  mt: 1,
                  fontSize: "13px",
                  letterSpacing: "2px",
                  color: "#777",
                  transition: ".3s",

                  "&:hover": {
                    color: "#1e2f2b",
                  },
                }}
              >
                EXPLORE → 
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ShopByCategory;
