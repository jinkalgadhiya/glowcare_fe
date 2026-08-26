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
    getDefaultHomePageSettings().reviews
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
        py: 10,
        px: {
          xs: 2,
          md: 8,
        },
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
            fontSize: 12,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#999",
            mb: 1,
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
          }}
        >
          {reviewsData.description}
        </Typography>
      </Box>

      {/* Reviews */}

      <Box
        sx={{
          display: "flex",
          gap: 3,
          overflowX: "auto",
          pb: 2,
          scrollSnapType: "x mandatory",

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
        }}
      >
        {reviewsData.items?.map((review) => (
          <Box
            key={review.id}
            sx={{
              flex: "0 0 calc((100% - 36px) / 4)",
              scrollSnapAlign: "start",
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