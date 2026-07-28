import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Stack,
} from "@mui/material";

import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

import { useThemeContext } from "../context/ThemeContext";
import { useLocation } from "react-router-dom";

const AdminNavbar = () => {
  const { darkMode, toggleTheme } = useThemeContext();

  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/admin":
        return "Dashboard";

      case "/admin/products":
        return "Products";

      case "/admin/add-product":
        return "Add Product";

      case "/admin/categories":
        return "Categories";

      case "/admin/orders":
        return "Orders";

      case "/admin/users":
        return "Users";

      case "/admin/settings":
        return "Settings";

      default:
        return "Dashboard";
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        ml: "300px",
        width: "calc(100% - 300px)",

        backgroundColor: darkMode ? "#2F2E2E" : "#fff",

        color: darkMode ? "#fff" : "#222",

        boxShadow: "0 2px 8px rgba(0,0,0,.08)",

        borderBottom: darkMode
          ? "1px solid #3D3D3D"
          : "1px solid #E7DDD2",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          px: 4,
          py: 1.5,
        }}
      >
        {/* Page Title */}

        <Typography
          sx={{
            fontSize: 28,
            fontWeight: 600,
            color: darkMode ? "#fff" : "#1E2F2B",
            letterSpacing: .5,
          }}
        >
          {getPageTitle()}
        </Typography>

        {/* Right Side */}

        <Stack
          direction="row"
          spacing={2}
        >
          <IconButton
            onClick={toggleTheme}
            sx={{
              color: darkMode ? "#FFD54F" : "#555",

              backgroundColor: darkMode
                ? "#333"
                : "#F8F5F1",

              "&:hover": {
                backgroundColor: darkMode
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

          <IconButton
            sx={{
              color: darkMode ? "#fff" : "#555",

              backgroundColor: darkMode
                ? "#333"
                : "#F8F5F1",

              "&:hover": {
                backgroundColor: darkMode
                  ? "#444"
                  : "#EFE8E1",
              },
            }}
          >
            <NotificationsNoneOutlinedIcon />
          </IconButton>

          <Avatar
            sx={{
              width: 42,
              height: 42,

              bgcolor: "#B89478",

              fontWeight: 600,

              cursor: "pointer",
            }}
          >
            A
          </Avatar>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;