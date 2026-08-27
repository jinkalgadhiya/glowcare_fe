import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StatsCard = ({
  title,
  value,
  icon,
  growth,
  darkMode,
  path,
}) => {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(path)}
      sx={{
        p: 3,
        height: 155,

        borderRadius: "24px",

        backgroundColor: darkMode
          ? "#242424"
          : "#FFFFFF",

        border: darkMode
          ? "1px solid #343434"
          : "1px solid #E8E1D8",

        boxShadow:
          "0 10px 30px rgba(30,47,43,.06)",

        cursor: "pointer",

        transition: ".3s ease",

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow:
            "0 18px 40px rgba(184,148,120,.18)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 500,
            color: darkMode
              ? "#BDBDBD"
              : "#6D6D6D",
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            width: 50,
            height: 50,

            borderRadius: "14px",

            backgroundColor: darkMode
              ? "#312821"
              : "#F5F1EA",

            color: "#B89478",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            "& svg": {
              fontSize: 26,
            },
          }}
        >
          {icon}
        </Box>
      </Box>

      <Box>
        <Typography
          sx={{
            fontSize: 34,
            fontWeight: 700,
            color: darkMode
              ? "#FFFFFF"
              : "#1E2F2B",

            lineHeight: 1,
            mb: 1,
          }}
        >
          {value}
        </Typography>

        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 600,
            color: "#22C55E",
          }}
        >
          ↗ {growth}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatsCard;