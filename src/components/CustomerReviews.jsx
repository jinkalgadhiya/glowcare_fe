import React from "react";
import { Box, Typography } from "@mui/material";

import reviews from "../data/Reviews";
import ReviewCard from "./ReviewCard";

const CustomerReviews = () => {
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
          CUSTOMER REVIEWS
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
          Loved By Thousands
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
          Hear what our customers have to say about their GlowCare experience
          and discover why thousands trust our skincare products every day.
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
        {reviews.map((review) => (
          <Box
            key={review.id}
            sx={{
              flex: "0 0 calc((100% - 36px) / 4)", // 4 cards per view
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
