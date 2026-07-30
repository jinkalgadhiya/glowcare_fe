import React from "react";
import { Box, Paper, Typography, Chip } from "@mui/material";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import { useThemeContext } from "../context/ThemeContext";

const ReviewsComingSoon = () => {
  const { darkMode } = useThemeContext();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 700,
          p: 6,
          borderRadius: 4,
          textAlign: "center",
          bgcolor: darkMode ? "#1F1F1F" : "#fff",
          border: `1px solid ${
            darkMode ? "rgba(255,255,255,0.08)" : "#E5E7EB"
          }`,
        }}
      >
        <RateReviewOutlinedIcon
          sx={{
            fontSize: 80,
            color: "#B89478",
            mb: 3,
          }}
        />

        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            mb: 2,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Reviews Module
        </Typography>

        <Typography
          sx={{
            maxWidth: 500,
            mx: "auto",
            fontSize: 16,
            lineHeight: 1.8,
            color: darkMode ? "#BDBDBD" : "#666",
            mb: 4,
          }}
        >
          Customer reviews and ratings will appear here once the review
          management feature is implemented.
        </Typography>

        <Chip
          label="Coming Soon"
          sx={{
            bgcolor: "#B89478",
            color: "#fff",
            fontWeight: 600,
            fontSize: 14,
            px: 2,
            py: 2.5,
            borderRadius: "20px",
          }}
        />
      </Paper>
    </Box>
  );
};

export default ReviewsComingSoon;
