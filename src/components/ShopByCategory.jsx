import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";

import { getHomePageSettings } from "../database/homePageService";
import {
  getDefaultHomePageSettings,
  mergeHomePageSettings,
} from "../data/homePageDefaults";

const ShopByCategory = () => {
  const [categorySettings, setCategorySettings] = useState(
    getDefaultHomePageSettings().categories,
  );

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await getHomePageSettings();

        if (savedSettings) {
          const mergedSettings =
            mergeHomePageSettings(savedSettings);

          setCategorySettings(mergedSettings.categories);
        }
      } catch (error) {
        console.error(
          "Error loading category settings:",
          error,
        );
      }
    };

    loadSettings();
  }, []);

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
          {categorySettings.eyebrow}
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 500,
            color: "#1e2f2b",
          }}
        >
          {categorySettings.heading}
        </Typography>
      </Box>

      {/* Categories */}
      <Grid container spacing={4} justifyContent="center">
        {categorySettings.items?.map((category) => (
          <Grid
            key={category.id}
            size={{ xs: 12, sm: 6, md: 3 }}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link
              to={category.link || "/shop"}
              style={{
                textDecoration: "none",
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

                {/* Category Title */}
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
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ShopByCategory;