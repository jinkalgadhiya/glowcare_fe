import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Grid,
  Chip,
} from "@mui/material";

import { getHomePageSettings } from "../database/homePageService";

import {
  getDefaultHomePageSettings,
  mergeHomePageSettings,
} from "../data/homePageDefaults";

const WhyChooseUs = () => {
  const [whyChoose, setWhyChoose] = useState(
    getDefaultHomePageSettings().whyChoose,
  );

  // =====================================================
  // LOAD SETTINGS
  // =====================================================

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings =
          await getHomePageSettings();

        if (savedSettings) {
          const mergedSettings =
            mergeHomePageSettings(savedSettings);

          setWhyChoose(
            mergedSettings.whyChoose,
          );
        }
      } catch (error) {
        console.error(
          "Error loading Why Choose settings:",
          error,
        );
      }
    };

    loadSettings();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#FCFAF7",

        // =================================================
        // ORIGINAL DESKTOP — KEEP
        // =================================================

        py: 12,

        px: {
          xs: 3,
          md: 8,
        },

        // =================================================
        // MINI LAPTOP
        // =================================================

        "@media (min-width: 900px) and (max-width: 1199px)":
          {
            py: 10,
            px: 5,
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
      <Grid
        container
        spacing={{
          xs: 4,
          sm: 5,
          md: 12,
        }}
        alignItems="center"
        justifyContent="center"
      >
        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <Grid
          item
          xs={12}
          md={5}
          sx={{
            // =================================================
            // ORIGINAL DESKTOP
            // =================================================

            ml: "50px",

            // =================================================
            // MINI LAPTOP
            // Keep left + right side-by-side
            // =================================================

            "@media (min-width: 900px) and (max-width: 1199px)":
              {
                width: "45%",
                maxWidth: "45%",
                flexBasis: "45%",
                flexGrow: 0,
                ml: 0,
                padding: "0 !important",
              },

            // =================================================
            // TABLET
            // =================================================

            "@media (min-width: 600px) and (max-width: 899px)":
              {
                width: "100%",
                maxWidth: "100%",
                flexBasis: "100%",
                ml: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "0 !important",
              },

            // =================================================
            // PHONE
            // =================================================

            "@media (max-width: 599px)": {
              width: "100%",
              maxWidth: "100%",
              flexBasis: "100%",
              ml: 0,
              textAlign: "left",
              padding: "0 !important",
            },
          }}
        >
          {/* =================================================
              SMALL BADGE
          ================================================= */}

          <Chip
            label={whyChoose.eyebrow}
            sx={{
              backgroundColor: "#FFFFFF",
              color: "#1E2F2B",
              border: "1px solid #D9D5CF",
              borderRadius: "30px",
              px: 1,
              mb: 4,
              fontWeight: 500,
              letterSpacing: 1,

              // TABLET
              "@media (min-width: 600px) and (max-width: 899px)":
                {
                  alignSelf: "center",
                },

              // PHONE
              "@media (max-width: 599px)": {
                mb: 2.5,
                fontSize: 11,
                height: 32,
              },
            }}
          />

          {/* =================================================
              HEADING
          ================================================= */}

          <Typography
            sx={{
              fontSize: {
                xs: "38px",
                md: "54px",
              },

              fontWeight: 500,

              color: "#1E2F2B",

              lineHeight: 1.1,

              mb: 3,

              whiteSpace: "pre-line",

              // =================================================
              // MINI LAPTOP
              // =================================================

              "@media (min-width: 900px) and (max-width: 1199px)":
                {
                  fontSize: "46px",
                },

              // =================================================
              // TABLET
              // =================================================

              "@media (min-width: 600px) and (max-width: 899px)":
                {
                  fontSize: "46px",
                  maxWidth: "650px",
                },

              // =================================================
              // PHONE
              // =================================================

              "@media (max-width: 599px)": {
                fontSize: "34px",
                lineHeight: 1.15,
                mb: 2,
              },
            }}
          >
            {whyChoose.title}
          </Typography>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <Typography
            sx={{
              color: "#6B6B6B",

              fontSize: 16,

              lineHeight: 1.9,

              maxWidth: 520,

              mb: 7,

              // =================================================
              // TABLET
              // =================================================

              "@media (min-width: 600px) and (max-width: 899px)":
                {
                  maxWidth: "650px",
                  mb: 5,
                },

              // =================================================
              // PHONE
              // =================================================

              "@media (max-width: 599px)": {
                fontSize: 13,
                lineHeight: 1.7,
                mb: 4,
              },
            }}
          >
            {whyChoose.description}
          </Typography>

          {/* =================================================
              FEATURES
          ================================================= */}

          {whyChoose.features?.map(
            (item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",

                  gap: 3,

                  mb: 5,

                  // =================================================
                  // MINI LAPTOP
                  // =================================================

                  "@media (min-width: 900px) and (max-width: 1199px)":
                    {
                      gap: 2,
                      mb: 4,
                    },

                  // =================================================
                  // TABLET
                  // =================================================

                  "@media (min-width: 600px) and (max-width: 899px)":
                    {
                      width: "100%",
                      maxWidth: "650px",
                      gap: 2.5,
                      mb: 4,
                      textAlign: "left",
                    },

                  // =================================================
                  // PHONE
                  // =================================================

                  "@media (max-width: 599px)": {
                    gap: 1.8,
                    mb: 3.5,
                  },
                }}
              >
                {/* =================================================
                    NUMBER
                ================================================= */}

                <Typography
                  sx={{
                    fontSize: 34,

                    color: "#CFC8BF",

                    minWidth: 45,

                    fontWeight: 300,

                    // MINI LAPTOP
                    "@media (min-width: 900px) and (max-width: 1199px)":
                      {
                        fontSize: 30,
                        minWidth: 40,
                      },

                    // PHONE
                    "@media (max-width: 599px)": {
                      fontSize: 27,
                      minWidth: 35,
                    },
                  }}
                >
                  {item.id}
                </Typography>

                {/* =================================================
                    TEXT
                ================================================= */}

                <Box>
                  <Typography
                    sx={{
                      fontSize: 28,

                      fontWeight: 500,

                      color: "#1E2F2B",

                      mb: 1,

                      // MINI LAPTOP
                      "@media (min-width: 900px) and (max-width: 1199px)":
                        {
                          fontSize: 24,
                        },

                      // TABLET
                      "@media (min-width: 600px) and (max-width: 899px)":
                        {
                          fontSize: 25,
                        },

                      // PHONE
                      "@media (max-width: 599px)": {
                        fontSize: 21,
                        mb: 0.7,
                      },
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#6B6B6B",

                      lineHeight: 1.8,

                      fontSize: 15,

                      maxWidth: 420,

                      // MINI LAPTOP
                      "@media (min-width: 900px) and (max-width: 1199px)":
                        {
                          maxWidth: 360,
                          fontSize: 14,
                        },

                      // TABLET
                      "@media (min-width: 600px) and (max-width: 899px)":
                        {
                          maxWidth: 560,
                        },

                      // PHONE
                      "@media (max-width: 599px)": {
                        fontSize: 12.5,
                        lineHeight: 1.7,
                      },
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Box>
            ),
          )}
        </Grid>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <Grid
          item
          xs={12}
          md={10}
          sx={{
            // =================================================
            // ORIGINAL DESKTOP
            // =================================================

            // =================================================
            // MINI LAPTOP
            // =================================================

            "@media (min-width: 900px) and (max-width: 1199px)":
              {
                width: "55%",
                maxWidth: "55%",
                flexBasis: "55%",
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
                width: "100%",
                maxWidth: "100%",
                flexBasis: "100%",
                display: "flex",
                justifyContent: "center",
                padding: "0 !important",
              },

            // =================================================
            // PHONE
            // =================================================

            "@media (max-width: 599px)": {
              width: "100%",
              maxWidth: "100%",
              flexBasis: "100%",
              padding: "0 !important",
            },
          }}
        >
          <Box
            sx={{
              position: "relative",

              borderRadius: 5,

              overflow: "hidden",

              height: {
                xs: 500,
                md: 720,
              },

              // =================================================
              // ORIGINAL DESKTOP — KEEP
              // =================================================

              ml: "100px",

              width: "110%",

              mt: "20px",

              // =================================================
              // MINI LAPTOP
              // =================================================

              "@media (min-width: 900px) and (max-width: 1199px)":
                {
                  ml: 0,
                  width: "100%",
                  maxWidth: "100%",
                  height: 560,
                  mt: 0,
                  borderRadius: 4,
                },

              // =================================================
              // TABLET
              // =================================================

              "@media (min-width: 600px) and (max-width: 899px)":
                {
                  ml: 0,
                  width: "100%",
                  maxWidth: "650px",
                  height: 520,
                  mt: 0,
                  borderRadius: 4,
                },

              // =================================================
              // PHONE
              // =================================================

              "@media (max-width: 599px)": {
                ml: 0,
                width: "100%",
                height: 380,
                mt: 0,
                borderRadius: 3,
              },
            }}
          >
            {/* =================================================
                MAIN IMAGE
            ================================================= */}

            <Box
              component="img"
              src={whyChoose.image}
              alt="Why Choose GlowCare"
              sx={{
                width: "100%",

                height: "100%",

                objectFit: "cover",

                borderRadius: 5,

                // PHONE
                "@media (max-width: 599px)": {
                  borderRadius: 3,
                },
              }}
            />

            {/* =================================================
                FLOATING TRUST CARD
            ================================================= */}

            <Box
              sx={{
                position: "absolute",

                left: 35,

                bottom: 35,

                display: "flex",

                alignItems: "center",

                gap: 1,

                backgroundColor: "#FFFFFF",

                px: 2,

                py: 0.8,

                borderRadius: "60px",

                boxShadow:
                  "0 15px 40px rgba(0,0,0,.12)",

                // TABLET
                "@media (max-width: 899px)": {
                  left: 25,
                  bottom: 25,
                },

                // PHONE
                "@media (max-width: 599px)": {
                  left: 15,
                  bottom: 15,
                  gap: 0.7,
                  px: 1.2,
                  py: 0.6,
                },
              }}
            >
              <Box
                sx={{
                  width: 48,

                  height: 48,

                  borderRadius: "50%",

                  backgroundColor: "#1E2F2B",

                  display: "flex",

                  justifyContent: "center",

                  alignItems: "center",

                  color: "#fff",

                  fontSize: 25,

                  flexShrink: 0,

                  // PHONE
                  "@media (max-width: 599px)": {
                    width: 38,
                    height: 38,
                    fontSize: 19,
                  },
                }}
              >
                ★
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,

                    color: "#1E2F2B",

                    fontSize: 16,

                    whiteSpace: "nowrap",

                    // PHONE
                    "@media (max-width: 599px)": {
                      fontSize: 11,
                    },
                  }}
                >
                  {whyChoose.trustTitle}
                </Typography>

                <Typography
                  sx={{
                    color: "#777",

                    fontSize: 14,

                    // PHONE
                    "@media (max-width: 599px)": {
                      fontSize: 10,
                    },
                  }}
                >
                  {whyChoose.trustSubtitle}
                </Typography>
              </Box>
            </Box>

            {/* =================================================
                BOTTOM LABELS
            ================================================= */}

            <Box
              sx={{
                position: "absolute",

                left: 35,

                right: 35,

                bottom: -45,

                display: "flex",

                justifyContent: "space-between",

                color: "#666",

                fontSize: 14,

                letterSpacing: 1,

                // TABLET
                "@media (max-width: 899px)": {
                  left: 20,
                  right: 20,
                  bottom: -35,
                  fontSize: 12,
                },

                // PHONE
                "@media (max-width: 599px)": {
                  left: 10,
                  right: 10,
                  bottom: -30,
                  fontSize: 10,
                  letterSpacing: 0.7,
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "inherit",
                  color: "inherit",
                  letterSpacing: "inherit",
                }}
              >
                EST. 2026
              </Typography>

              <Typography
                sx={{
                  cursor: "pointer",

                  fontSize: "inherit",

                  color: "inherit",

                  letterSpacing: "inherit",

                  "&:hover": {
                    color: "#B89478",
                  },
                }}
              >
                LEARN MORE →
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WhyChooseUs;