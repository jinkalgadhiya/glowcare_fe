import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Rating,
} from "@mui/material";

const ReviewCard = ({ review }) => {
  return (
    <Box
      sx={{
        position: "relative",
        height: 460,
        borderRadius: 4,
        overflow: "hidden",
        backgroundColor: "#fff",
        cursor: "pointer",
        transition: ".45s",
        boxShadow: "0 8px 25px rgba(0,0,0,.06)",

        "&:hover": {
          transform: "translateY(-10px)",
        },

        "&:hover .review-image": {
          width: "100%",
          height: "100%",
          borderRadius: 0,
          top: 0,
          left: 0,
          transform: "translate(0,0)",
        },

        "&:hover .overlay": {
          opacity: 1,
        },

        "&:hover .content": {
          color: "#fff",
        },

        "&:hover .designation": {
          color: "#E5E5E5",
        },
      }}
    >
      {/* Background Image */}

      <Avatar
        src={review.image}
        className="review-image"
        sx={{
          width: 90,
          height: 90,
          position: "absolute",
          top: 30,
          left: "50%",
          transform: "translateX(-50%)",
          transition: ".6s ease",
          zIndex: 1,
        }}
      />

      {/* Dark Overlay */}

      <Box
        className="overlay"
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,.75), rgba(0,0,0,.25))",
          opacity: 0,
          transition: ".45s",
          zIndex: 2,
        }}
      />

      {/* Content */}

      <Box
        className="content"
        sx={{
          position: "relative",
          zIndex: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: 4,
          transition: ".4s",
          color: "#1E2F2B",
          textAlign: "center",
        }}
      >
        <Rating
          value={review.rating}
          readOnly
          size="small"
          sx={{
            mb: 2,
          }}
        />

        <Typography
          sx={{
            fontSize: 15,
            lineHeight: 1.8,
            fontStyle: "italic",
            mb: 3,

            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          "{review.review}"
        </Typography>

        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          {review.name}
        </Typography>

        <Typography
          className="designation"
          sx={{
            mt: 0.5,
            fontSize: 14,
            color: "#777",
            transition: ".4s",
          }}
        >
          {review.designation}
        </Typography>
      </Box>
    </Box>
  );
};

export default ReviewCard;