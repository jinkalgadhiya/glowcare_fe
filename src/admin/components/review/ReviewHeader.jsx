import React from "react";
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { useThemeContext } from "../../context/ThemeContext";

const ReviewHeader = ({
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
        separator={
          <NavigateNextIcon sx={{ fontSize: 16 }} />
        }
        sx={{ mb: 3 }}
      >
        <Link
          underline="hover"
          onClick={() =>
            navigate("/admin/dashboard")
          }
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
          Reviews
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
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          placeholder="Search reviews..."
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
                borderColor: darkMode
                  ? "#444"
                  : "#DDD",
              },

              "&:hover fieldset": {
                borderColor: "#B89478",
              },

              "&.Mui-focused fieldset": {
                borderColor: "#B89478",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon
                  sx={{
                    color: darkMode
                      ? "#BDBDBD"
                      : "#888",
                  }}
                />
              </InputAdornment>
            ),
          }}
        />

        {/* Filter */}

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
              bgcolor:
                "rgba(184,148,120,.08)",
            },
          }}
        >
          Filter
        </Button>
      </Box>
    </Box>
  );
};

export default ReviewHeader;