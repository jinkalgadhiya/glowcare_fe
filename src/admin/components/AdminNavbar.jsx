import React, { useEffect, useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Stack,
} from "@mui/material";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

import { useThemeContext } from "../context/ThemeContext";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

const AdminNavbar = () => {
  // =====================================================
  // THEME
  // =====================================================

  const {
    darkMode,
    toggleTheme,
  } = useThemeContext();

  // =====================================================
  // ROUTER
  // =====================================================

  const location = useLocation();

  const navigate = useNavigate();

  // =====================================================
  // ADMIN DATA
  // =====================================================

  const [admin, setAdmin] =
    useState(null);

  useEffect(() => {
    const storedAdmin = JSON.parse(
      localStorage.getItem("admin"),
    );

    setAdmin(storedAdmin);
  }, []);

  // =====================================================
  // PAGE TITLE
  // =====================================================

  const getPageTitle = () => {
    switch (location.pathname) {
      // =================================================
      // DASHBOARD
      // =================================================

      case "/admin":
      case "/admin/dashboard":
        return "Dashboard";

      // =================================================
      // HOME PAGE
      // =================================================

      case "/admin/home-page":
        return "Home Page Manager";

      // =================================================
      // PRODUCTS
      // =================================================

      case "/admin/products":
        return "Products";

      case "/admin/products/create":
        return "Add Product";

      case "/admin/products/edit":
        return "Edit Product";

      // =================================================
      // CATEGORIES
      // =================================================

      case "/admin/categories":
        return "Categories";

      case "/admin/categories/create":
        return "Add Category";

      case "/admin/categories/edit":
        return "Edit Category";

      // =================================================
      // ORDERS
      // =================================================

      case "/admin/orders":
        return "Orders";

      // =================================================
      // RETURNS
      // =================================================

      case "/admin/returns":
        return "Return Requests";

      // =================================================
      // CUSTOMERS
      // =================================================

      case "/admin/customers":
        return "Customers";

      // =================================================
      // REVIEWS
      // =================================================

      case "/admin/reviews":
        return "Reviews";

      // =================================================
      // COUPONS
      // =================================================

      case "/admin/coupons":
        return "Coupons";

      // =================================================
      // PROFILE
      // =================================================

      case "/admin/profile":
        return "Profile";

      // =================================================
      // DEFAULT
      // =================================================

      default:
        return "Dashboard";
    }
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        ml: "300px",

        width:
          "calc(100% - 300px)",

        height: 70,

        justifyContent:
          "center",

        backgroundColor:
          darkMode
            ? "#2F2E2E"
            : "#FFFFFF",

        color:
          darkMode
            ? "#FFFFFF"
            : "#222",

        boxShadow:
          "0 2px 8px rgba(0,0,0,.08)",

        borderBottom:
          darkMode
            ? "1px solid #3D3D3D"
            : "1px solid #E7DDD2",

        zIndex: 1200,
      }}
    >
      <Toolbar
        sx={{
          minHeight:
            "84px !important",

          display: "flex",

          justifyContent:
            "space-between",

          alignItems:
            "center",

          px: 4,
        }}
      >
        {/* =================================================
            PAGE TITLE
        ================================================= */}

        <Typography
          sx={{
            fontSize: 28,

            fontWeight: 600,

            color:
              darkMode
                ? "#FFFFFF"
                : "#1E2F2B",

            letterSpacing: 0.5,
          }}
        >
          {getPageTitle()}
        </Typography>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >
          {/* =============================================
              DARK / LIGHT MODE
          ============================================= */}

          <IconButton
            onClick={toggleTheme}
            sx={{
              color:
                darkMode
                  ? "#FFD54F"
                  : "#555",

              backgroundColor:
                darkMode
                  ? "#333"
                  : "#F8F5F1",

              "&:hover": {
                backgroundColor:
                  darkMode
                    ? "#444"
                    : "#EFE8E1",
              },
            }}
          >
            {darkMode ? (
              <LightModeOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon />
            )}
          </IconButton>

          {/* =============================================
              ADMIN PROFILE
          ============================================= */}

          <Avatar
            onClick={() =>
              navigate("/admin/profile")
            }
            sx={{
              width: 42,

              height: 42,

              bgcolor: "#B89478",

              fontWeight: 600,

              cursor: "pointer",

              transition:
                "0.3s",

              "&:hover": {
                transform:
                  "scale(1.08)",

                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.2)",
              },
            }}
          >
            {admin?.fullName
              ?.charAt(0)
              ?.toUpperCase() || "A"}
          </Avatar>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;