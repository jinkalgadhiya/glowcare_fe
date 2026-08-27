import React from "react";
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Button,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { useThemeContext } from "../../context/ThemeContext";

const CategoryHeader = ({
  searchTerm,
  setSearchTerm,
  onOpenFilter,
}) => {
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

        <Link
          underline="hover"
          sx={{
            cursor: "pointer",
            color: darkMode ? "#AFAFAF" : "#777",
            fontSize: 14,
          }}
        >
          Inventory
        </Link>

        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 500,
            color: darkMode ? "#fff" : "#474040",
          }}
        >
          Categories
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
          placeholder="Search categories..."
          size="small"
          sx={{
            width: {
              xs: "100%",
              md: 420,
            },

            "& .MuiOutlinedInput-root": {
              height: 46,
              borderRadius: "12px",
              backgroundColor: darkMode
                ? "#333333"
                : "#F8F5F1",
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

        {/* Buttons */}

        <Stack
          direction="row"
          spacing={2}
        >
          <Button
            variant="contained"
            startIcon={<AddOutlinedIcon />}
            onClick={() =>
              navigate("/admin/categories/create")
            }
            sx={{
              minWidth: 170,
              height: 46,
              bgcolor: "#B89478",
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
            Add Category
          </Button>

          <Button
            variant="outlined"
            startIcon={<FilterListOutlinedIcon />}
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

export default CategoryHeader;