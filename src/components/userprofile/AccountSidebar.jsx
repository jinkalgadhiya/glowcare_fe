import React from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { useLocation, useNavigate } from "react-router-dom";

import { logout } from "../../auth/AuthService";

const menuItems = [
  {
    label: "My Profile",
    icon: <PersonOutlineOutlinedIcon />,
    path: "/user/profile",
  },
  {
    label: "My Orders",
    icon: <ShoppingBagOutlinedIcon />,
    path: "/user/orders",
  },
  {
    label: "My Addresses",
    icon: <LocationOnOutlinedIcon />,
    path: "/user/address",
  },
  {
    label: "Coupons",
    icon: <LocalOfferOutlinedIcon />,
    path: "/user/coupons",
  },
  {
    label: "Help Center",
    icon: <SupportAgentOutlinedIcon />,
    path: "/user/help-center",
  },
];

const AccountSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ================================
  // LOGOUT
  // ================================
  const handleLogout = () => {
    // Remove currentUser and token
    logout();

    // Redirect customer to login page
    navigate("/login", { replace: true });
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 290,
        backgroundColor: "#FAF7F2",
        borderRadius: "24px",
        p: 3,
        border: "1px solid #EEE6DB",
        boxShadow: "0 10px 30px rgba(30,47,43,0.05)",
        boxSizing: "border-box",
      }}
    >
      {/* ================================
          HEADER
      ================================ */}

      <Typography
        sx={{
          fontSize: 24,
          fontWeight: 700,
          color: "#1E2F2B",
          mb: 0.5,
        }}
      >
        My Account
      </Typography>

      <Typography
        sx={{
          fontSize: 13,
          color: "#8A8178",
          mb: 3,
        }}
      >
        Manage your GlowCare account
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {/* ================================
          MENU
      ================================ */}

      <List sx={{ p: 0 }}>
        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: "16px",
                py: 1.4,

                backgroundColor: active
                  ? "#EAF1EC"
                  : "transparent",

                border: active
                  ? "1px solid #D6E5DA"
                  : "1px solid transparent",

                transition: "all .25s ease",

                "&:hover": {
                  backgroundColor: "#F4F0EA",
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 42,
                  color: active
                    ? "#1E2F2B"
                    : "#7A746C",
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: active ? 600 : 500,
                  color: active
                    ? "#1E2F2B"
                    : "#4F4B46",
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      {/* ================================
          LOGOUT
      ================================ */}

      <Divider
        sx={{
          my: 2,
          borderColor: "#E5DDD3",
        }}
      />

      <List sx={{ p: 0 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: "16px",
            py: 1.4,

            color: "#A34B40",

            transition: "all .25s ease",

            "&:hover": {
              backgroundColor: "#F8EEEC",
              transform: "translateX(4px)",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 42,
              color: "#A34B40",
            }}
          >
            <LogoutOutlinedIcon />
          </ListItemIcon>

          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontSize: 15,
              fontWeight: 600,
              color: "#A34B40",
            }}
          />
        </ListItemButton>
      </List>

      {/* ================================
          BOTTOM PREMIUM CARD
      ================================ */}

      <Box
        sx={{
          mt: 4,
          p: 2.5,
          borderRadius: "18px",
          background:
            "linear-gradient(135deg, #1E2F2B 0%, #30463F 100%)",
          color: "#fff",
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 600,
            mb: 1,
          }}
        >
          Glow Naturally ✨
        </Typography>

        <Typography
          sx={{
            fontSize: 13,
            opacity: 0.85,
            lineHeight: 1.7,
          }}
        >
          Discover skincare essentials crafted for healthy,
          glowing skin every day.
        </Typography>
      </Box>
    </Box>
  );
};

export default AccountSidebar;