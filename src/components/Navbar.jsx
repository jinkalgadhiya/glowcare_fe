import React, { useState, useEffect } from "react";
import { useRef } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DarkLogo from "../assets/LogoDark.png";
import WhiteLogo from "../assets/LogoWhite.png";
import MegaMenu from "./MegaMenu";
import SearchBar from "./SearchBar";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CartDrawer from "./cart/CartDrawer";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import { isLoggedIn, logout } from "../auth/AuthService";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const closeTimer = useRef(null);

  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const isDarkNavbar = !isHome || scrolled;

  const openMenu = (menu) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }

    setActiveMenu(menu);
  };

  const closeMenu = () => {
    closeTimer.current = setTimeout(() => {
      setActiveMenu(null);
    }, 250);
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  console.log(activeMenu);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: isHome ? "transparent" : "#F8F6F2",
        boxShadow: isHome ? "none" : "0 2px 10px rgba(0,0,0,.05)",

        backdropFilter: scrolled ? "blur(12px)" : "none",

        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",

        transition: "all .4s ease",
      }}
    >
      <Toolbar
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          minHeight: "70px",
          px: 4,
          py: 0,
        }}
      >
        {/* Left */}
        <Box
          sx={{ position: "relative" }}
          onMouseLeave={closeMenu}
          onMouseEnter={() => {
            if (closeTimer.current) {
              clearTimeout(closeTimer.current);
            }
          }}
        >
          <Stack direction="row" spacing={6}>
            <Box position="relative">
              <Typography
                onMouseEnter={() => openMenu("skincare")}
                sx={{
                  color: isDarkNavbar ? "#222" : "#fff",
                  fontSize: "13px",
                  letterSpacing: "2px",
                  cursor: "pointer",
                }}
              >
                SKINCARE
              </Typography>
            </Box>

            <Typography
              onMouseEnter={() => setActiveMenu("haircare")}
              sx={{
                color: isDarkNavbar ? "#222" : "#fff",
                fontSize: "13px",
                letterSpacing: "2px",
                cursor: "pointer",
              }}
            >
              HAIRCARE
            </Typography>

            <Typography
              onMouseEnter={() => setActiveMenu("more")}
              sx={{
                color: isDarkNavbar ? "#222" : "#fff",
                fontSize: "13px",
                letterSpacing: "2px",
                cursor: "pointer",
              }}
            >
              MORE
            </Typography>
          </Stack>
          {activeMenu && (
            <Box
              onMouseEnter={() => {
                if (closeTimer.current) {
                  clearTimeout(closeTimer.current);
                }
              }}
              onMouseLeave={closeMenu}
            >
              <MegaMenu type={activeMenu} />
            </Box>
          )}
        </Box>

        {/* Center Logo */}
        <Box
          component="img"
          onClick={() => navigate("/")}
          src={isDarkNavbar ? DarkLogo : WhiteLogo}
          alt="GlowCare"
          sx={{
            width: 140,
            justifySelf: "center",
            transition: "0.35s ease",
            cursor: "pointer",
          }}
        />

        {/* Right */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Stack direction="row" spacing={1}>
            <SearchBar scrolled={isDarkNavbar} />

            <IconButton
              onClick={() => setCartOpen(true)}
              sx={{ color: isDarkNavbar ? "#222" : "#fff" }}
            >
              <Badge
                badgeContent={totalItems}
                overlap="circular"
                invisible={totalItems === 0}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#3A3A3A", // Dark Gray
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: 600,
                    border: "2px solid #fff",
                  },
                }}
              >
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>

            {loggedIn && (
              <IconButton
                onClick={() => navigate("/wishlist")}
                sx={{ color: isDarkNavbar ? "#222" : "#fff" }}
              >
                <FavoriteBorderOutlinedIcon />
              </IconButton>
            )}

            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

            {loggedIn ? (
              <IconButton
                sx={{ color: isDarkNavbar ? "#222" : "#fff" }}
                onClick={() => navigate("/profile")}
              >
                <PersonOutlineOutlinedIcon />
              </IconButton>
            ) : (
              <Typography
                onClick={() => navigate("/login")}
                sx={{
                  color: isDarkNavbar ? "#222" : "#fff",
                  cursor: "pointer",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  px: 1,
                }}
              >
                Sign In
              </Typography>
            )}
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
