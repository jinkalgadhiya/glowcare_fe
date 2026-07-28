import React from "react";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { useThemeContext } from "../context/ThemeContext";

const ProductFilter = ({
  open,
  onClose,

  statusFilter,
  setStatusFilter,

  badgeFilter,
  setBadgeFilter,

  categoryFilter,
  setCategoryFilter,

  stockFilter,
  setStockFilter,

  sortBy,
  setSortBy,

  onReset,
}) => {
  const { darkMode } = useThemeContext();

  const categories = JSON.parse(localStorage.getItem("categories")) || [];

  const badgeOptions = [
    "All",
    "New Launch",
    "Best Seller",
    "Trending",
    "Limited Stock",
    "Out of Stock",
    "Sold Out",
  ];

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 360,
          backgroundColor: darkMode ? "#1E1E1E" : "#fff",
          color: darkMode ? "#fff" : "#222",

          overflow: "hidden",

          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          p: 3,
          height: "100vh",
          overflowY: "auto",

          backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",

          display: "flex",
          flexDirection: "column",

          "&::-webkit-scrollbar": {
            width: "8px",
          },

          "&::-webkit-scrollbar-track": {
            background: darkMode ? "#1E1E1E" : "#F5F5F5",
          },

          "&::-webkit-scrollbar-thumb": {
            background: darkMode ? "#4A4A4A" : "#C5C5C5",
            borderRadius: "10px",
          },
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
              fontSize: 24,
              fontWeight: 700,
              color: darkMode ? "#fff" : "#1E2F2B",
            }}
          >
            Filter Products
          </Typography>

          <IconButton
            onClick={onClose}
            sx={{
              color: darkMode ? "#fff" : "#222",
            }}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </Box>

        <Divider
          sx={{
            borderColor: darkMode ? "#3A3A3A" : "#E7DDD2",
            my: 3,
          }}
        />

        {/* Product Status */}

        <Typography
          sx={{
            fontWeight: 600,
            mb: 2,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Product Status
        </Typography>

        <RadioGroup
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {["All", "Active", "Inactive"].map((item) => (
            <FormControlLabel
              key={item}
              value={item}
              control={
                <Radio
                  sx={{
                    color: "#B89478",

                    "&.Mui-checked": {
                      color: "#B89478",
                    },
                  }}
                />
              }
              label={item}
              sx={{
                color: darkMode ? "#E5E5E5" : "#555",
              }}
            />
          ))}
        </RadioGroup>

        <Divider
          sx={{
            borderColor: darkMode ? "#3A3A3A" : "#E7DDD2",
            my: 3,
          }}
        />

        {/* Product Badge */}

        <Typography
          sx={{
            fontWeight: 600,
            mb: 2,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Product Badge
        </Typography>

        <RadioGroup
          value={badgeFilter}
          onChange={(e) => setBadgeFilter(e.target.value)}
        >
          {badgeOptions.map((item) => (
            <FormControlLabel
              key={item}
              value={item}
              control={
                <Radio
                  sx={{
                    color: "#B89478",

                    "&.Mui-checked": {
                      color: "#B89478",
                    },
                  }}
                />
              }
              label={item}
              sx={{
                color: darkMode ? "#E5E5E5" : "#555",
              }}
            />
          ))}
        </RadioGroup>

        <Divider
          sx={{
            borderColor: darkMode ? "#3A3A3A" : "#E7DDD2",
            my: 3,
          }}
        />
        {/* Category */}

        <Typography
          sx={{
            fontWeight: 600,
            mb: 2,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Category
        </Typography>

        <RadioGroup
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <FormControlLabel
            value="All"
            control={
              <Radio
                sx={{
                  color: "#B89478",

                  "&.Mui-checked": {
                    color: "#B89478",
                  },
                }}
              />
            }
            label="All Categories"
            sx={{
              color: darkMode ? "#E5E5E5" : "#555",
            }}
          />

          {categories.map((category) => (
            <FormControlLabel
              key={category.id}
              value={category.name}
              control={
                <Radio
                  sx={{
                    color: "#B89478",

                    "&.Mui-checked": {
                      color: "#B89478",
                    },
                  }}
                />
              }
              label={category.name}
              sx={{
                color: darkMode ? "#E5E5E5" : "#555",
              }}
            />
          ))}
        </RadioGroup>

        <Divider
          sx={{
            borderColor: darkMode ? "#3A3A3A" : "#E7DDD2",
            my: 3,
          }}
        />

        {/* Stock */}

        <Typography
          sx={{
            fontWeight: 600,
            mb: 2,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Stock
        </Typography>

        <RadioGroup
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
        >
          {["All", "In Stock", "Low Stock", "Out of Stock"].map((item) => (
            <FormControlLabel
              key={item}
              value={item}
              control={
                <Radio
                  sx={{
                    color: "#B89478",

                    "&.Mui-checked": {
                      color: "#B89478",
                    },
                  }}
                />
              }
              label={item}
              sx={{
                color: darkMode ? "#E5E5E5" : "#555",
              }}
            />
          ))}
        </RadioGroup>

        <Divider
          sx={{
            borderColor: darkMode ? "#3A3A3A" : "#E7DDD2",
            my: 3,
          }}
        />

        {/* Sort By */}

        <Typography
          sx={{
            fontWeight: 600,
            mb: 2,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Sort By
        </Typography>

        <RadioGroup value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          {[
            "Newest",
            "Oldest",
            "A-Z",
            "Z-A",
            "Price Low → High",
            "Price High → Low",
          ].map((item) => (
            <FormControlLabel
              key={item}
              value={item}
              control={
                <Radio
                  sx={{
                    color: "#B89478",

                    "&.Mui-checked": {
                      color: "#B89478",
                    },
                  }}
                />
              }
              label={item}
              sx={{
                color: darkMode ? "#E5E5E5" : "#555",
              }}
            />
          ))}
        </RadioGroup>

        <Box sx={{ flexGrow: 1 }} />

        <Divider
          sx={{
            borderColor: darkMode ? "#3A3A3A" : "#E7DDD2",
            my: 3,
          }}
        />
        {/* Bottom Buttons */}

        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            onClick={onReset}
            sx={{
              height: 48,
              borderColor: "#B89478",
              color: "#B89478",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,

              "&:hover": {
                borderColor: "#A88366",
                bgcolor: "rgba(184,148,120,.08)",
              },
            }}
          >
            Reset
          </Button>

          <Button
            fullWidth
            variant="contained"
            onClick={onClose}
            sx={{
              height: 48,
              bgcolor: "#B89478",
              color: "#fff",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              boxShadow: "none",

              "&:hover": {
                bgcolor: "#A88366",
                boxShadow: "none",
              },
            }}
          >
            Apply
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ProductFilter;
