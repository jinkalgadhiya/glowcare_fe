import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

import Logo from "../../assets/LogoDark.png";
import { useThemeContext } from "../context/ThemeContext";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useThemeContext();

  const [inventoryOpen, setInventoryOpen] = React.useState(true);

  const textColor = darkMode ? "#F5F5F5" : "#444";
  const secondaryText = darkMode ? "#D8D8D8" : "#555";
  const hoverColor = darkMode ? "#303030" : "#EFE8E1";
  const activeBg = darkMode ? "#C9B19C" : "#E7DDD2";
  const activeText = "#6B4F3B";
  const headingColor = "#B89478";

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <Box
      sx={{
        width: 300,
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: darkMode ? "#1E1E1E" : "#F8F5F1",
        borderRight: "1px solid #E7DDD2",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 3,
        overflowY: "auto",
      }}
    >
      <Box>
        <Box
          sx={{
            textAlign: "center",
            mb: 5,
            mt: "-20px",
          }}
        >
          <Box
            component="img"
            src={Logo}
            alt="GlowCare"
            sx={{
              width: 200,
            }}
          />
        </Box>

        <Typography
          sx={{
            fontSize: 13,
            color: headingColor,
            letterSpacing: 2,
            mb: 2,
            ml: 1,
            mt: "-50px",
            fontWeight: 500,
          }}
        >
          NAVIGATION
        </Typography>

        <Stack spacing={1}>
          {/* Dashboard */}
          <Box
            onClick={() => navigate("/admin/dashboard")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: 2,
              py: 1.3,
              borderRadius: 2,
              cursor: "pointer",
              transition: ".3s",
              backgroundColor:
                location.pathname === "/admin/dashboard"
                  ? activeBg
                  : "transparent",
              color:
                location.pathname === "/admin/dashboard"
                  ? activeText
                  : textColor,
              "&:hover": {
                backgroundColor: hoverColor,
              },
            }}
          >
            <DashboardOutlinedIcon />
            <Typography fontSize={16}>Dashboard</Typography>
          </Box>

          {/* Home Page */}
          <Box
            onClick={() => navigate("/admin/home-page")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: 2,
              py: 1.3,
              borderRadius: 2,
              cursor: "pointer",
              transition: ".3s",
              backgroundColor:
                location.pathname === "/admin/home-page"
                  ? activeBg
                  : "transparent",
              color:
                location.pathname === "/admin/home-page"
                  ? activeText
                  : textColor,
              "&:hover": {
                backgroundColor: hoverColor,
              },
            }}
          >
            <HomeOutlinedIcon />
            <Typography fontSize={16}>Home Page</Typography>
          </Box>

          {/* Inventory */}
          <Box
            onClick={() => setInventoryOpen(!inventoryOpen)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              py: 1.3,
              borderRadius: 2,
              cursor: "pointer",
              color: textColor,
              "&:hover": {
                backgroundColor: hoverColor,
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
              <Inventory2OutlinedIcon />
              <Typography fontSize={16}>Inventory</Typography>
            </Box>

            {inventoryOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Box>

          {/* Inventory Dropdown */}
          {inventoryOpen && (
            <Stack spacing={1} sx={{ ml: 4 }}>
              <Box
                onClick={() => navigate("/admin/categories")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  px: 5,
                  py: 1,
                  borderRadius: 2,
                  cursor: "pointer",
                  backgroundColor:
                    location.pathname === "/admin/categories"
                      ? activeBg
                      : "transparent",
                  color:
                    location.pathname === "/admin/categories"
                      ? activeText
                      : secondaryText,
                  "&:hover": {
                    backgroundColor: hoverColor,
                  },
                }}
              >
                <CategoryOutlinedIcon sx={{ fontSize: 18 }} />
                <Typography fontSize={15}>Categories</Typography>
              </Box>

              <Box
                onClick={() => navigate("/admin/products")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  px: 5,
                  py: 1,
                  borderRadius: 2,
                  cursor: "pointer",
                  backgroundColor:
                    location.pathname === "/admin/products"
                      ? activeBg
                      : "transparent",
                  color:
                    location.pathname === "/admin/products"
                      ? activeText
                      : secondaryText,
                  "&:hover": {
                    backgroundColor: hoverColor,
                  },
                }}
              >
                <ShoppingCartOutlinedIcon sx={{ fontSize: 18 }} />
                <Typography fontSize={15}>Products</Typography>
              </Box>
            </Stack>
          )}

          {/* Customers */}
          <Box
            onClick={() => navigate("/admin/customers")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: 2,
              py: 1.3,
              borderRadius: 2,
              cursor: "pointer",
              backgroundColor:
                location.pathname === "/admin/customers"
                  ? activeBg
                  : "transparent",
              color:
                location.pathname === "/admin/customers"
                  ? activeText
                  : textColor,
              "&:hover": {
                backgroundColor: hoverColor,
              },
            }}
          >
            <PeopleOutlineOutlinedIcon />
            <Typography fontSize={16}>Customers</Typography>
          </Box>

          {/* Orders */}
          <Box
            onClick={() => navigate("/admin/orders")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: 2,
              py: 1.3,
              borderRadius: 2,
              cursor: "pointer",
              backgroundColor:
                location.pathname === "/admin/orders"
                  ? activeBg
                  : "transparent",
              color:
                location.pathname === "/admin/orders" ? activeText : textColor,
              "&:hover": {
                backgroundColor: hoverColor,
              },
            }}
          >
            <ReceiptLongOutlinedIcon />
            <Typography fontSize={16}>Orders</Typography>
          </Box>

          {/* Reviews */}
          <Box
            onClick={() => navigate("/admin/reviews")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: 2,
              py: 1.3,
              borderRadius: 2,
              cursor: "pointer",
              backgroundColor:
                location.pathname === "/admin/reviews"
                  ? activeBg
                  : "transparent",
              color:
                location.pathname === "/admin/reviews" ? activeText : textColor,
              "&:hover": {
                backgroundColor: hoverColor,
              },
            }}
          >
            <ReviewsOutlinedIcon />
            <Typography fontSize={16}>Reviews</Typography>
          </Box>

          {/* Coupons */}
          <Box
            onClick={() => navigate("/admin/coupons")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: 2,
              py: 1.3,
              borderRadius: 2,
              cursor: "pointer",
              transition: ".3s",

              backgroundColor:
                location.pathname === "/admin/coupons"
                  ? activeBg
                  : "transparent",

              color:
                location.pathname === "/admin/coupons" ? activeText : textColor,

              "&:hover": {
                backgroundColor: hoverColor,
              },
            }}
          >
            <LocalOfferOutlinedIcon />

            <Typography fontSize={16}>Coupons</Typography>
          </Box>
        </Stack>
      </Box>

      <Box
        onClick={handleLogout}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: 2,
          py: 1.5,
          borderRadius: 2,
          cursor: "pointer",
          color: "#F44336",
          "&:hover": {
            backgroundColor: hoverColor,
          },
        }}
      >
        <LogoutOutlinedIcon />
        <Typography fontWeight={500}>Logout</Typography>
      </Box>
    </Box>
  );
};

export default AdminSidebar;
