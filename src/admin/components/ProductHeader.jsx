import React from "react";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Button,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";

const ProductHeader = ({ searchTerm, setSearchTerm, onOpenFilter }) => {
  const { darkMode } = useThemeContext();

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        pt: "60px",
        mb: 4,
        mt: "-60px",
      }}
    >
      {/* Breadcrumb */}

      <Breadcrumbs
        separator={<NavigateNextIcon sx={{ fontSize: 16 }} />}
        sx={{ mb: 3 }}
      >
        <Link
          underline="hover"
          onClick={() => navigate("/admin/dashboard")}
          sx={{
            cursor: "pointer",
            color: darkMode ? "#AFAFAF" : "#777",
            fontSize: 14,

            "&:hover": {
              color: "#B89478",
            },
          }}
        >
          Dashboard
        </Link>

        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 500,
            color: darkMode ? "#fff" : "#474040",
          }}
        >
          Products
        </Typography>
      </Breadcrumbs>

      {/* Header */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 3,
          flexWrap: "wrap",
        }}
      >
        {/* Search */}

        <TextField
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          size="small"
          sx={{
            width: {
              xs: "100%",
              md: 420,
            },

            "& .MuiOutlinedInput-root": {
              height: 46,
              borderRadius: "12px",

              backgroundColor: darkMode ? "#333333" : "#F8F5F1",

              color: darkMode ? "#fff" : "#222",

              "& fieldset": {
                borderColor: darkMode ? "#444" : "#DDD",
              },

              "&:hover fieldset": {
                borderColor: "#B89478",
              },

              "&.Mui-focused fieldset": {
                borderColor: "#B89478",
              },
            },

            "& input::placeholder": {
              color: darkMode ? "#BDBDBD" : "#888",
              opacity: 1,
            },
          }}
          inputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon
                  sx={{
                    color: darkMode ? "#BDBDBD" : "#888",
                  }}
                />
              </InputAdornment>
            ),
          }}
        />

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => navigate("/admin/products/create")}
            sx={{
              minWidth: 170,
              height: 46,
              bgcolor: "#B89478",
              color: "#fff",
              textTransform: "none",
              fontSize: 15,
              fontWeight: 600,
              borderRadius: 2,
              boxShadow: "none",

              "&:hover": {
                bgcolor: "#A88366",
                boxShadow: "none",
              },
            }}
          >
            Add Product
          </Button>

          <Button
            variant="outlined"
            startIcon={<FilterListRoundedIcon />}
            onClick={onOpenFilter}
            sx={{
              minWidth: 120,
              height: 46,

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
            Filter
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductHeader;
