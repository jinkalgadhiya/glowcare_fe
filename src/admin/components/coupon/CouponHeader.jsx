import React from "react";

import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Button,
  Stack,
  InputAdornment,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { useThemeContext } from "../../context/ThemeContext";
import CustomTextField from "../../../components/common/CustomTextField";

const CouponHeader = ({
  search,
  setSearch,
  onAdd,
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
      {/* =====================================================
          BREADCRUMBS
      ===================================================== */}

      <Breadcrumbs
        separator={
          <NavigateNextIcon
            sx={{
              fontSize: 16,
              color: darkMode ? "#888" : "#999",
            }}
          />
        }
        sx={{
          mb: 3,
        }}
      >
        {/* Dashboard */}

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

        {/* Marketing */}

        <Link
          underline="hover"
          sx={{
            cursor: "pointer",
            color: darkMode ? "#AFAFAF" : "#777",
            fontSize: 14,

            "&:hover": {
              color: "#B89478",
            },
          }}
        >
          Marketing
        </Link>

        {/* Current Page */}

        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 500,
            color: darkMode ? "#FFFFFF" : "#474040",
          }}
        >
          Coupons
        </Typography>
      </Breadcrumbs>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 3,
          flexWrap: "wrap",
        }}
      >
        {/* =================================================
            SEARCH
        ================================================= */}

        <CustomTextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search coupons..."
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

              color: darkMode
                ? "#FFFFFF"
                : "#222",

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

            "& .MuiInputBase-input::placeholder": {
              color: darkMode
                ? "#AFAFAF"
                : "#888",

              opacity: 1,
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

        {/* =================================================
            ACTION BUTTONS
        ================================================= */}

        <Stack
          direction="row"
          spacing={2}
          sx={{
            width: {
              xs: "100%",
              md: "auto",
            },
          }}
        >
          {/* FILTER */}

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

                backgroundColor:
                  "rgba(184,148,120,.08)",
              },
            }}
          >
            Filter
          </Button>

          {/* ADD COUPON */}

          <Button
            variant="contained"
            startIcon={<AddOutlinedIcon />}
            onClick={onAdd}
            sx={{
              minWidth: 150,
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
            Add Coupon
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default CouponHeader;