import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Stack,
  IconButton,
  Badge,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";

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

  const [scrolled, setScrolled] = useState(false);

  const [activeMenu, setActiveMenu] = useState(null);

  // =====================================================
  // CART STATE
  // =====================================================

  const [cartOpen, setCartOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);

  // =====================================================
  // AUTH STATE
  // =====================================================

  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, [location.pathname]);

  // =====================================================
  // NAVBAR COLOR
  // =====================================================

  const isDarkNavbar = !isHome || scrolled;

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
    (total, item) => total + item.quantity,
    0,
  );

  // =====================================================
  // SCROLL
  // =====================================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =====================================================
  // CART CLICK
  // =====================================================

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
        bgcolor: isHome && !scrolled ? "transparent" : "#F8F6F2",

        boxShadow: isHome && !scrolled ? "none" : "0 2px 10px rgba(0,0,0,.05)",

        backdropFilter: "none",

        transition: "all .4s ease",

        // ===============================================
        // MOBILE
        // ===============================================

        "@media (max-width: 599px)": {
          boxShadow:
            isHome && !scrolled ? "none" : "0 2px 10px rgba(0,0,0,.06)",
        },
      }}
    >
      <Toolbar
        sx={{
          display: "grid",

          // =============================================
          // DESKTOP - ORIGINAL
          // =============================================

          gridTemplateColumns: "1fr auto 1fr",

          alignItems: "center",

          minHeight: "70px",

          px: 4,
          py: 0,

          // =============================================
          // TABLET
          // =============================================

          "@media (max-width: 899px)": {
            minHeight: "66px",
            px: 2.5,
          },

          // =============================================
          // PHONE
          // =============================================

          "@media (max-width: 599px)": {
            minHeight: "62px",
            px: 1.5,

            gridTemplateColumns: "auto 1fr auto",
          },
        }}
      >
        {/* =================================================
            LEFT - NAVIGATION
        ================================================= */}

        <Box
          sx={{
            position: "relative",

            // Hide desktop navigation on phone
            "@media (max-width: 599px)": {
              display: "none",
            },
          }}
          onMouseLeave={closeMenu}
          onMouseEnter={() => {
            if (closeTimer.current) {
              clearTimeout(closeTimer.current);
            }
          }}
        >
          <Stack
            direction="row"
            spacing={0}
            sx={{
              // BIG LAPTOP / DESKTOP
              "@media (min-width: 1200px)": {
                gap: 6,
              },

              // SMALL LAPTOP
              "@media (min-width: 900px) and (max-width: 1199px)": {
                gap: 2,
              },

              // TABLET
              "@media (min-width: 600px) and (max-width: 899px)": {
                gap: 1.5,
              },
            }}
          >
            {/* =================================================
                SKINCARE
            ================================================= */}

            <Box position="relative">
              <Typography
                onMouseEnter={() => openMenu("skincare")}
                sx={{
                  color: isDarkNavbar ? "#222" : "#fff",

                  fontSize: "13px",

                  letterSpacing: "2px",

                  cursor: "pointer",

                  whiteSpace: "nowrap",

                  "@media (max-width: 899px)": {
                    fontSize: "12px",
                    letterSpacing: "1.5px",
                  },
                }}
              >
                SKINCARE
              </Typography>
            </Box>

            {/* =================================================
                HAIRCARE
            ================================================= */}

            <Typography
              onMouseEnter={() => openMenu("haircare")}
              sx={{
                color: isDarkNavbar ? "#222" : "#fff",

                fontSize: "13px",

                letterSpacing: "2px",

                cursor: "pointer",

                whiteSpace: "nowrap",

                "@media (max-width: 899px)": {
                  fontSize: "12px",
                  letterSpacing: "1.5px",
                },
              }}
            >
              HAIRCARE
            </Typography>

            {/* =================================================
                MORE
            ================================================= */}

            <Typography
              onMouseEnter={() => openMenu("more")}
              sx={{
                color: isDarkNavbar ? "#222" : "#fff",

                fontSize: "13px",

                letterSpacing: "2px",

                cursor: "pointer",

                whiteSpace: "nowrap",

                "@media (max-width: 899px)": {
                  fontSize: "12px",
                  letterSpacing: "1.5px",
                },
              }}
            >
              MORE
            </Typography>
          </Stack>

          {/* =================================================
              MEGA MENU
          ================================================= */}

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

        {/* =================================================
            CENTER - LOGO
        ================================================= */}

        <Box
          component="img"
          onClick={() => navigate("/")}
          src={isDarkNavbar ? DarkLogo : WhiteLogo}
          alt="GlowCare"
          sx={{
            // ORIGINAL DESKTOP
            width: 140,

            justifySelf: "center",

            transition: "0.35s ease",

            cursor: "pointer",

            // TABLET
            "@media (max-width: 899px)": {
              width: 125,
            },

            // PHONE
            "@media (max-width: 599px)": {
              width: 110,
            },
          }}
        />

        {/* =================================================
            RIGHT - ACTIONS
        ================================================= */}

        <Box
          sx={{
            display: "flex",

            justifyContent: "flex-end",

            minWidth: 0,
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              // Tablet
              "@media (max-width: 899px)": {
                gap: 0.3,
              },

              // Phone
              "@media (max-width: 599px)": {
                gap: 0,
              },
            }}
          >
            {/* =================================================
                SEARCH
            ================================================= */}

            <Box
              sx={{
                // Keep desktop SearchBar unchanged

                // Tablet
                "@media (max-width: 899px)": {
                  transform: "scale(0.9)",
                  transformOrigin: "right center",
                },

                // Phone
                "@media (max-width: 599px)": {
                  transform: "scale(0.82)",
                  transformOrigin: "right center",
                  width: 38,
                  overflow: "hidden",
                },
              }}
            >
              <SearchBar scrolled={isDarkNavbar} />
            </Box>

            {/* =================================================
                CART
            ================================================= */}

            <IconButton
              onClick={handleCartClick}
              sx={{
                color: isDarkNavbar ? "#222" : "#fff",

                // Tablet
                "@media (max-width: 899px)": {
                  p: 0.8,
                },

                // Phone
                "@media (max-width: 599px)": {
                  p: 0.7,
                },
              }}
            >
              <Badge
                badgeContent={totalItems}
                overlap="circular"
                invisible={totalItems === 0}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#3A3A3A",

                    color: "#fff",

                    fontSize: "11px",

                    fontWeight: 600,

                    border: "2px solid #fff",

                    "@media (max-width: 599px)": {
                      fontSize: "9px",
                      minWidth: 16,
                      height: 16,
                    },
                  },
                }}
              >
                <ShoppingCartOutlinedIcon
                  sx={{
                    "@media (max-width: 899px)": {
                      fontSize: 22,
                    },

                    "@media (max-width: 599px)": {
                      fontSize: 20,
                    },
                  }}
                />
              </Badge>
            </IconButton>

            {/* =================================================
                WISHLIST
                Only logged-in users
            ================================================= */}

            {loggedIn && (
              <IconButton
                onClick={() => navigate("/wishlist")}
                sx={{
                  color: isDarkNavbar ? "#222" : "#fff",

                  "@media (max-width: 899px)": {
                    p: 0.8,
                  },

                  "@media (max-width: 599px)": {
                    p: 0.7,
                  },
                }}
              >
                <FavoriteBorderOutlinedIcon
                  sx={{
                    "@media (max-width: 899px)": {
                      fontSize: 22,
                    },

                    "@media (max-width: 599px)": {
                      fontSize: 20,
                    },
                  }}
                />
              </IconButton>
            )}

            {/* =================================================
                PROFILE / SIGN IN
            ================================================= */}

            {loggedIn ? (
              <IconButton
                sx={{
                  color: isDarkNavbar ? "#222" : "#fff",

                  "@media (max-width: 899px)": {
                    p: 0.8,
                  },

                  "@media (max-width: 599px)": {
                    p: 0.7,
                  },
                }}
                onClick={handleProfileClick}
              >
                <PersonOutlineOutlinedIcon
                  sx={{
                    "@media (max-width: 899px)": {
                      fontSize: 22,
                    },

                    "@media (max-width: 599px)": {
                      fontSize: 20,
                    },
                  }}
                />
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

                  whiteSpace: "nowrap",

                  "&:hover": {
                    opacity: 0.7,
                  },

                  "@media (max-width: 899px)": {
                    fontSize: "13px",
                    px: 0.7,
                  },

                  "@media (max-width: 599px)": {
                    fontSize: "12px",
                    px: 0.5,
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

          <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
