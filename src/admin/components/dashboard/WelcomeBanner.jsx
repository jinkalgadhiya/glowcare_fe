import React from "react";
import { Box, Typography } from "@mui/material";
import { useThemeContext } from "../../context/ThemeContext";

const WelcomeBanner = () => {
  const { darkMode } = useThemeContext();

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    }

    if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    }

    if (hour >= 17 && hour < 21) {
      return "Good Evening";
    }

    return "Good Night";
  };

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",

        p: 4.5,
        mb: 3,

        borderRadius: "28px",

        background: darkMode
          ? "linear-gradient(135deg,#23201D 0%,#1A1816 100%)"
          : "linear-gradient(135deg,#F8F4EF 0%,#F2EBE3 100%)",

        border: "1px solid",
        borderColor: darkMode ? "#3A342F" : "#E6DDD2",

        boxShadow: darkMode
          ? "0 10px 40px rgba(0,0,0,.35)"
          : "0 10px 35px rgba(184,148,120,.12)",
      }}
    >
      {/* Decorative Glow */}

      <Box
        sx={{
          position: "absolute",
          top: "-100px",
          right: "-100px",

          width: 250,
          height: 250,

          borderRadius: "50%",

          background:
            "radial-gradient(circle, rgba(184,148,120,.22) 0%, transparent 70%)",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "28px",
              md: "38px",
            },

            fontWeight: 700,

            color: darkMode ? "#FFF" : "#1E2F2B",
          }}
        >
          {getGreeting()}, Jinkal
        </Typography>

        <Typography
          sx={{
            mt: 1.5,

            fontSize: "16px",

            color: darkMode ? "#D6D0CA" : "#5E5E5E",
          }}
        >
          Welcome back to GlowCare Admin Dashboard.
        </Typography>

        <Typography
          sx={{
            mt: 1,

            fontSize: "14px",

            color: darkMode ? "#A8A29C" : "#777",
          }}
        >
          Manage products, orders, categories and monitor store activity.
        </Typography>

        <Box
          sx={{
            mt: 3,

            display: "flex",
            gap: 1.5,
            flexWrap: "wrap",
          }}
        >
        </Box>
      </Box>
    </Box>
  );
};

export default WelcomeBanner;