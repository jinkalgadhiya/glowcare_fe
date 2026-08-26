import React, {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Stack,
  IconButton,
  Badge,
} from "@mui/material";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import DarkLogo from "../assets/LogoDark.png";
import WhiteLogo from "../assets/LogoWhite.png";

import MegaMenu from "./MegaMenu";
import SearchBar from "./SearchBar";
import CartDrawer from "./cart/CartDrawer";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import { useSelector } from "react-redux";

import { isLoggedIn } from "../auth/AuthService";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const closeTimer = useRef(null);

  // =====================================================
  // PAGE / NAVBAR STATE
  // =====================================================

  const isHome = location.pathname === "/";

  const [scrolled, setScrolled] =
    useState(false);

  const [activeMenu, setActiveMenu] =
    useState(null);

  // =====================================================
  // CART STATE
  // =====================================================

  const [cartOpen, setCartOpen] =
    useState(false);

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  // =====================================================
  // AUTH STATE
  // =====================================================

  const [loggedIn, setLoggedIn] =
    useState(isLoggedIn());

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, [location.pathname]);

  // =====================================================
  // NAVBAR COLOR
  // =====================================================

  const isDarkNavbar =
    !isHome || scrolled;

  // =====================================================
  // MEGA MENU
  // =====================================================

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

  // =====================================================
  // CART COUNT
  // =====================================================

  const totalItems = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  // =====================================================
  // SCROLL
  // =====================================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 50
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  // =====================================================
  // CART CLICK
  // =====================================================

  // IMPORTANT:
  // Cart should open for BOTH guest and logged-in users.
  const handleCartClick = () => {
    setCartOpen(true);
  };

  // =====================================================
  // PROFILE CLICK
  // =====================================================

  const handleProfileClick = () => {
    if (!loggedIn) {
      navigate("/login");
      return;
    }

    navigate("/user/profile");
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: isHome
          ? "transparent"
          : "#F8F6F2",

        boxShadow: isHome
          ? "none"
          : "0 2px 10px rgba(0,0,0,.05)",

        backdropFilter: scrolled
          ? "blur(12px)"
          : "none",

        transition: "all .4s ease",
      }}
    >
      <Toolbar
        sx={{
          display: "grid",
          gridTemplateColumns:
            "1fr auto 1fr",

          alignItems: "center",

          minHeight: "70px",

          px: 4,
          py: 0,
        }}
      >
        {/* =================================================
            LEFT - NAVIGATION
        ================================================= */}

        <Box
          sx={{
            position: "relative",
          }}
          onMouseLeave={closeMenu}
          onMouseEnter={() => {
            if (closeTimer.current) {
              clearTimeout(
                closeTimer.current
              );
            }
          }}
        >
          <Stack
            direction="row"
            spacing={6}
          >
            {/* SKINCARE */}

            <Box position="relative">
              <Typography
                onMouseEnter={() =>
                  openMenu("skincare")
                }
                sx={{
                  color: isDarkNavbar
                    ? "#222"
                    : "#fff",

                  fontSize: "13px",

                  letterSpacing:
                    "2px",

                  cursor: "pointer",
                }}
              >
                SKINCARE
              </Typography>
            </Box>

            {/* HAIRCARE */}

            <Typography
              onMouseEnter={() =>
                openMenu("haircare")
              }
              sx={{
                color: isDarkNavbar
                  ? "#222"
                  : "#fff",

                fontSize: "13px",

                letterSpacing:
                  "2px",

                cursor: "pointer",
              }}
            >
              HAIRCARE
            </Typography>

            {/* MORE */}

            <Typography
              onMouseEnter={() =>
                openMenu("more")
              }
              sx={{
                color: isDarkNavbar
                  ? "#222"
                  : "#fff",

                fontSize: "13px",

                letterSpacing:
                  "2px",

                cursor: "pointer",
              }}
            >
              MORE
            </Typography>
          </Stack>

          {/* MEGA MENU */}

          {activeMenu && (
            <Box
              onMouseEnter={() => {
                if (
                  closeTimer.current
                ) {
                  clearTimeout(
                    closeTimer.current
                  );
                }
              }}
              onMouseLeave={closeMenu}
            >
              <MegaMenu
                type={activeMenu}
              />
            </Box>
          )}
        </Box>

        {/* =================================================
            CENTER - LOGO
        ================================================= */}

        <Box
          component="img"
          onClick={() =>
            navigate("/")
          }
          src={
            isDarkNavbar
              ? DarkLogo
              : WhiteLogo
          }
          alt="GlowCare"
          sx={{
            width: 140,

            justifySelf:
              "center",

            transition:
              "0.35s ease",

            cursor: "pointer",
          }}
        />

        {/* =================================================
            RIGHT - ACTIONS
        ================================================= */}

        <Box
          sx={{
            display: "flex",
            justifyContent:
              "flex-end",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
          >
            {/* SEARCH */}

            <SearchBar
              scrolled={
                isDarkNavbar
              }
            />

            {/* =================================================
                CART
            ================================================= */}

            <IconButton
              onClick={
                handleCartClick
              }
              sx={{
                color:
                  isDarkNavbar
                    ? "#222"
                    : "#fff",
              }}
            >
              <Badge
                badgeContent={
                  totalItems
                }
                overlap="circular"
                invisible={
                  totalItems === 0
                }
                sx={{
                  "& .MuiBadge-badge":
                    {
                      backgroundColor:
                        "#3A3A3A",

                      color: "#fff",

                      fontSize:
                        "11px",

                      fontWeight: 600,

                      border:
                        "2px solid #fff",
                    },
                }}
              >
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>

            {/* =================================================
                WISHLIST
                Only logged-in users
            ================================================= */}

            {loggedIn && (
              <IconButton
                onClick={() =>
                  navigate(
                    "/wishlist"
                  )
                }
                sx={{
                  color:
                    isDarkNavbar
                      ? "#222"
                      : "#fff",
                }}
              >
                <FavoriteBorderOutlinedIcon />
              </IconButton>
            )}

            {/* =================================================
                PROFILE / SIGN IN
            ================================================= */}

            {loggedIn ? (
              <IconButton
                sx={{
                  color:
                    isDarkNavbar
                      ? "#222"
                      : "#fff",
                }}
                onClick={
                  handleProfileClick
                }
              >
                <PersonOutlineOutlinedIcon />
              </IconButton>
            ) : (
              <Typography
                onClick={() =>
                  navigate("/login")
                }
                sx={{
                  color:
                    isDarkNavbar
                      ? "#222"
                      : "#fff",

                  cursor: "pointer",

                  fontSize: "14px",

                  display: "flex",

                  alignItems:
                    "center",

                  px: 1,

                  "&:hover": {
                    opacity: 0.7,
                  },
                }}
              >
                Sign In
              </Typography>
            )}
          </Stack>

          {/* =================================================
              CART DRAWER
              IMPORTANT: OUTSIDE THE STACK
          ================================================= */}

          <CartDrawer
            open={cartOpen}
            onClose={() =>
              setCartOpen(false)
            }
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;