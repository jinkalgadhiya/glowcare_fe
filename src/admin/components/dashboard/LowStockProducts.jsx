import React from "react";
import {
  Paper,
  Typography,
  Box,
  Avatar,
  Chip,
} from "@mui/material";
import { useThemeContext } from "../../context/ThemeContext";

const LowStockProducts = ({ products = [] }) => {
  const { darkMode } = useThemeContext();

  const lowStockProducts = products
    .filter((item) => {
      const stock = item.variants?.[0]?.stock || 0;
      return Number(stock) <= 5;
    })
    .slice(0, 5);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: "100%",
        borderRadius: "24px",

        backgroundColor: darkMode ? "#23201D" : "#FFFFFF",

        border: "1px solid",
        borderColor: darkMode ? "#39342F" : "#E8E0D7",

        boxShadow: darkMode
          ? "0 10px 30px rgba(0,0,0,.25)"
          : "0 10px 30px rgba(184,148,120,.08)",
      }}
    >
      {/* Header */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 700,
            color: darkMode ? "#FFF" : "#1E2F2B",
          }}
        >
          Low Stock Products
        </Typography>

        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            color: "#B89478",
          }}
        >
          View All
        </Typography>
      </Box>

      {/* Products */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {lowStockProducts.length === 0 ? (
          <Typography
            sx={{
              py: 4,
              textAlign: "center",
              color: darkMode ? "#AAA" : "#777",
            }}
          >
            No low stock products
          </Typography>
        ) : (
          lowStockProducts.map((item) => {
            const stock = Number(item.variants?.[0]?.stock || 0);

            return (
              <Box
                key={item._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",

                  p: 2,

                  borderRadius: "18px",

                  backgroundColor: darkMode
                    ? "#2C2825"
                    : "#FAF7F4",

                  transition: ".25s",

                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Avatar
                    src={item.image}
                    variant="rounded"
                    sx={{
                      width: 58,
                      height: 58,
                      borderRadius: "16px",
                    }}
                  />

                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: darkMode ? "#FFF" : "#1E2F2B",
                      }}
                    >
                      {item.productName}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 13,
                        color: darkMode ? "#AAA" : "#777",
                        mt: 0.3,
                      }}
                    >
                      Reorder Soon
                    </Typography>
                  </Box>
                </Box>

                <Chip
                  label={`${stock} Left`}
                  sx={{
                    fontWeight: 700,

                    backgroundColor:
                      stock <= 2
                        ? "rgba(220,38,38,.12)"
                        : "rgba(184,148,120,.15)",

                    color:
                      stock <= 2
                        ? "#DC2626"
                        : "#B89478",

                    border:
                      stock <= 2
                        ? "1px solid rgba(220,38,38,.25)"
                        : "1px solid rgba(184,148,120,.25)",
                  }}
                />
              </Box>
            );
          })
        )}
      </Box>
    </Paper>
  );
};

export default LowStockProducts;