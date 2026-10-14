import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import ReviewCard from "./ReviewCard";

import { getHomePageSettings } from "../database/homePageService";
import {
  getDefaultHomePageSettings,
  mergeHomePageSettings,
} from "../data/homePageDefaults";

const CustomerReviews = () => {
  const [reviewsData, setReviewsData] = useState(
    getDefaultHomePageSettings().reviews,
  );

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const settings = await getHomePageSettings();

        const mergedSettings = mergeHomePageSettings(settings);

        setReviewsData(mergedSettings.reviews);
      } catch (error) {
        console.error("Failed to load reviews:", error);
      }
    };

    loadReviews();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#fff",

        // ORIGINAL DESKTOP
        py: 10,

        px: {
          xs: 2,
          md: 8,
        },

        // =============================================
        // MINI LAPTOP
        // =============================================

        "@media (min-width: 900px) and (max-width: 1199px)": {
          py: 9,
          px: 5,
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
          textAlign: "center",

          // ORIGINAL
          mb: 7,

          // TABLET
          "@media (max-width: 899px)": {
            mb: 5.5,
          },

          // PHONE
          "@media (max-width: 599px)": {
            mb: 4.5,
          },
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#999",
            mb: 1,

            "@media (max-width: 599px)": {
              fontSize: 10,
              letterSpacing: 3,
              mb: 0.8,
            },
          }}
        >
          {reviewsData.eyebrow}
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: 36,
              md: 52,
            },

            fontWeight: 500,

            color: "#1E2F2B",

            mb: 2,

            // MINI LAPTOP
            "@media (min-width: 900px) and (max-width: 1199px)": {
              fontSize: 48,
            },

            // TABLET
            "@media (min-width: 600px) and (max-width: 899px)": {
              fontSize: 44,
            },

            // PHONE
            "@media (max-width: 599px)": {
              fontSize: 32,
              lineHeight: 1.2,
              mb: 1.5,
            },
          }}
        >
          {reviewsData.heading}
        </Typography>

        <Typography
          sx={{
            color: "#777",

            maxWidth: 650,

            mx: "auto",

            lineHeight: 1.8,

            fontSize: 16,

            // TABLET
            "@media (max-width: 899px)": {
              fontSize: 15,
              maxWidth: 580,
              lineHeight: 1.7,
            },

            // PHONE
            "@media (max-width: 599px)": {
              fontSize: 13,
              maxWidth: "95%",
              lineHeight: 1.65,
            },
          }}
        >
          {reviewsData.description}
        </Typography>
      </Box>

      {/* =================================================
          REVIEWS
      ================================================= */}

      <Box
        sx={{
          display: "flex",

          gap: 3,

          overflowX: "auto",

          pb: 2,

          scrollSnapType: "x mandatory",

          // ORIGINAL DESKTOP SCROLLBAR
          "&::-webkit-scrollbar": {
            height: 8,
          },

          "&::-webkit-scrollbar-track": {
            background: "#ECECEC",
            borderRadius: 20,
          },

          "&::-webkit-scrollbar-thumb": {
            background: "#B89478",
            borderRadius: 20,
          },

          // =============================================
          // TABLET
          // =============================================

          "@media (max-width: 899px)": {
            gap: 2.5,
          },

          // =============================================
          // PHONE
          // =============================================

          "@media (max-width: 599px)": {
            gap: 2,

            pb: 1.5,

            "&::-webkit-scrollbar": {
              height: 6,
            },
          },
        }}
      >
        {reviewsData.items?.map((review) => (
          <Box
            key={review.id}
            sx={{
              // ORIGINAL DESKTOP
              flex: "0 0 calc((100% - 36px) / 4)",

              scrollSnapAlign: "start",

              // =========================================
              // MINI LAPTOP
              // 3 CARDS
              // =========================================

              "@media (min-width: 900px) and (max-width: 1199px)": {
                flex: "0 0 calc((100% - 24px) / 3)",
              },

              // =========================================
              // TABLET
              // 2 CARDS
              // =========================================

              "@media (min-width: 600px) and (max-width: 899px)": {
                flex: "0 0 calc((100% - 16px) / 2)",
              },

              // =========================================
              // PHONE
              // 1 CARD
              // =========================================

              "@media (max-width: 599px)": {
                flex: "0 0 88%",
              },
            }}
          >
            <ReviewCard review={review} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CustomerReviews;