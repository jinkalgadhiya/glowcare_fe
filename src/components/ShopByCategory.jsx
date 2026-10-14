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
          const mergedSettings = mergeHomePageSettings(savedSettings);

          setCategorySettings(mergedSettings.categories);
        }
      } catch (error) {
        console.error("Error loading category settings:", error);
      }
    };

    loadSettings();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#FCFAF7",

        // ORIGINAL DESKTOP
        py: 10,
        px: { xs: 3, md: 8 },

        // =============================================
        // MINI LAPTOP
        // =============================================

        "@media (min-width: 900px) and (max-width: 1199px)": {
          py: 9,
          px: 6,
        },

        // =============================================
        // PHONE
        // =============================================

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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",

          // ORIGINAL
          mb: 8,

          // =============================================
          // TABLET
          // =============================================

          "@media (max-width: 899px)": {
            mb: 6,
          },

          // =============================================
          // PHONE
          // =============================================

          "@media (max-width: 599px)": {
            mb: 5,
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            letterSpacing: "4px",
            color: "#9a9a9a",
            textTransform: "uppercase",
            mb: 1,

            "@media (max-width: 599px)": {
              fontSize: "10px",
              letterSpacing: "3px",
              mb: 0.8,
            },
          }}
        >
          {categorySettings.eyebrow}
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 500,
            color: "#1e2f2b",

            // =========================================
            // MINI LAPTOP
            // =========================================

            "@media (min-width: 900px) and (max-width: 1199px)": {
              fontSize: "2.8rem",
            },

            // =========================================
            // TABLET
            // =========================================

            "@media (max-width: 899px)": {
              fontSize: "2.5rem",
            },

            // =========================================
            // PHONE
            // =========================================

            "@media (max-width: 599px)": {
              fontSize: "2rem",
              lineHeight: 1.2,
            },
          }}
        >
          {categorySettings.heading}
        </Typography>
      </Box>

      {/* =================================================
          CATEGORIES
      ================================================= */}

      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{
          // =============================================
          // TABLET
          // =============================================

          "@media (max-width: 899px)": {
            spacing: 3,
          },

          // =============================================
          // PHONE
          // =============================================

          "@media (max-width: 599px)": {
            spacing: 3,
          },
        }}
      >
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

                  // =======================================
                  // PHONE
                  // =======================================

                  "@media (max-width: 599px)": {
                    width: "100%",
                  },
                }}
              >
                {/* =================================================
                    IMAGE
                ================================================= */}

                <Box
                  sx={{
                    // ORIGINAL DESKTOP
                    width: 220,
                    height: 300,

                    borderRadius: "120px",

                    overflow: "hidden",

                    mx: "auto",

                    // =============================================
                    // MINI LAPTOP
                    // =============================================

                    "@media (min-width: 900px) and (max-width: 1199px)": {
                      width: 200,
                      height: 280,
                    },

                    // =============================================
                    // TABLET
                    // =============================================

                    "@media (min-width: 600px) and (max-width: 899px)": {
                      width: 200,
                      height: 280,
                    },

                    // =============================================
                    // PHONE
                    // =============================================

                    "@media (max-width: 599px)": {
                      width: 190,
                      height: 260,
                      borderRadius: "100px",
                    },
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

                {/* =================================================
                    CATEGORY TITLE
                ================================================= */}

                <Typography
                  sx={{
                    // ORIGINAL
                    mt: 3,
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#1e2f2b",

                    // =============================================
                    // TABLET
                    // =============================================

                    "@media (max-width: 899px)": {
                      mt: 2.5,
                      fontSize: "19px",
                    },

                    // =============================================
                    // PHONE
                    // =============================================

                    "@media (max-width: 599px)": {
                      mt: 2,
                      fontSize: "18px",
                    },
                  }}
                >
                  {category.title}
                </Typography>

                {/* =================================================
                    EXPLORE
                ================================================= */}

                <Typography
                  sx={{
                    // ORIGINAL
                    mt: 1,
                    fontSize: "13px",
                    letterSpacing: "2px",
                    color: "#777",
                    transition: ".3s",

                    "&:hover": {
                      color: "#1e2f2b",
                    },

                    // =============================================
                    // PHONE
                    // =============================================

                    "@media (max-width: 599px)": {
                      mt: 0.8,
                      fontSize: "11px",
                      letterSpacing: "1.5px",
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