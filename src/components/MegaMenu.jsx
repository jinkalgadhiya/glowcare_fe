import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import SkincareImg from "../assets/SkinMenuImg.webp";
import HaircareImg from "../assets/HairMenuImg.webp";
import MoreImg from "../assets/MoreMenuImg.webp";

import { getCategories } from "../database/categoryService";

const MegaMenu = ({ type }) => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = (await getCategories()) || [];

        const activeCategories = data.filter(
          (item) =>
            item.status === "Active" &&
            item.menuType?.trim().toLowerCase() ===
              type?.trim().toLowerCase(),
        );

        setCategories(activeCategories);
      } catch (error) {
        console.error("Error loading categories:", error);
        setCategories([]);
      }
    };

    loadCategories();
  }, [type]);

  // ===============================
  // Main Categories
  // ===============================

  const mainCategories = categories.filter(
    (item) => item.categoryType === "main",
  );

  // ===============================
  // Sub Categories
  // ===============================

  const subCategories = categories.filter(
    (item) => item.categoryType === "sub",
  );

  // ===============================
  // Group Sub Categories
  // ===============================

  const groupedCategories = mainCategories.reduce((acc, main) => {
    const mainName = main.mainCategory;

    acc[mainName] = subCategories.filter(
      (sub) =>
        sub.mainCategory?.trim().toLowerCase() ===
        mainName?.trim().toLowerCase(),
    );

    return acc;
  }, {});

  // ===============================
  // Menu Images
  // ===============================

  let menuImage = SkincareImg;
  let bannerTitle =
    type?.charAt(0).toUpperCase() + type?.slice(1);

  if (type === "haircare") {
    menuImage = HaircareImg;
    bannerTitle = "Shop Haircare";
  }

  if (type === "more") {
    menuImage = MoreImg;
    bannerTitle = "Shop More";
  }

  return (
    <Box
      sx={{
        position: "absolute",

        // ===============================
        // DESKTOP - ORIGINAL
        // ===============================

        top: "100%",
        left: "60px",
        width: "85vw",

        // ===============================
        // RESPONSIVE POSITION
        // ===============================

        "@media (max-width: 1199px)": {
          left: "20px",
          width: "calc(100vw - 40px)",
        },

        "@media (max-width: 899px)": {
          left: "10px",
          width: "calc(100vw - 20px)",
          maxHeight: "calc(100vh - 90px)",
          overflowY: "auto",
        },

        "@media (max-width: 599px)": {
          left: "0",
          width: "100vw",
          maxHeight: "calc(100vh - 70px)",
          borderRadius: "0 0 16px 16px",
        },

        backgroundColor: "#fff",
        color: "#222",
        borderRadius: 4,

        // ===============================
        // DESKTOP - ORIGINAL
        // ===============================

        px: 8,
        py: 4,

        // ===============================
        // TABLET / MOBILE PADDING
        // ===============================

        "@media (max-width: 899px)": {
          px: 4,
          py: 3,
        },

        "@media (max-width: 599px)": {
          px: 2.5,
          py: 3,
        },

        boxShadow: "0 10px 30px rgba(0,0,0,.12)",
        zIndex: 1000,
      }}
    >
      <Grid
        container
        spacing={{
          xs: 3,
          sm: 3,
          md: 4,
        }}
      >
        {/* =========================================
            DYNAMIC CATEGORIES
        ========================================= */}

        {Object.entries(groupedCategories)
          .filter(([_, items]) => items.length > 0)
          .map(([mainCategory, items]) => (
            <Grid
              item
              key={mainCategory}
              xs={12}
              sm={6}
              md={2}
              sx={{
                // ORIGINAL DESKTOP
                pr: {
                  md: 12,
                },

                // TABLET
                "@media (max-width: 899px)": {
                  pr: 2,
                },

                // PHONE
                "@media (max-width: 599px)": {
                  pr: 0,
                },
              }}
            >
              <Typography
                sx={{
                  mb: 3,
                  fontWeight: 600,
                  letterSpacing: 2,
                  fontSize: "14px",
                  color: "#1E2F2B",
                  textTransform: "uppercase",

                  "@media (max-width: 599px)": {
                    mb: 1.5,
                    fontSize: "13px",
                    letterSpacing: 1.5,
                  },
                }}
              >
                {mainCategory}
              </Typography>

              <Stack
                spacing={{
                  xs: 1.2,
                  sm: 1.5,
                  md: 2,
                }}
              >
                {items.map((item) => (
                  <Typography
                    key={item._id}
                    onClick={() =>
                      navigate(
                        `/shop/${encodeURIComponent(
                          item.subCategory
                            .toLowerCase()
                            .replaceAll(" ", "-"),
                        )}`,
                      )
                    }
                    sx={{
                      cursor: "pointer",
                      transition: "all .3s ease",

                      fontSize: {
                        xs: "13px",
                        sm: "14px",
                        md: "inherit",
                      },

                      "&:hover": {
                        color: "#1E2F2B",
                        pl: 1,
                        fontWeight: 500,
                      },
                    }}
                  >
                    {item.subCategory}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          ))}

        {/* =========================================
            BANNER
        ========================================= */}

        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          sx={{
            // ORIGINAL DESKTOP
            ml: "50px",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            // TABLET
            "@media (max-width: 899px)": {
              ml: 0,
              mt: 2,
              borderTop: "1px solid #EEEAE4",
              pt: 3,
            },

            // PHONE
            "@media (max-width: 599px)": {
              ml: 0,
              mt: 1,
              pt: 3,
            },
          }}
        >
          <Box
            component="img"
            src={menuImage}
            alt={bannerTitle}
            onClick={() => navigate(`/shop/${type}`)}
            sx={{
              // ORIGINAL DESKTOP
              width: 260,
              height: 260,

              // TABLET
              "@media (max-width: 899px)": {
                width: 220,
                height: 220,
              },

              // PHONE
              "@media (max-width: 599px)": {
                width: "min(220px, 75vw)",
                height: "min(220px, 75vw)",
              },

              objectFit: "cover",
              borderRadius: 3,
              mb: 3,
              cursor: "pointer",
            }}
          />

          <Typography
            sx={{
              mb: 2,
              fontWeight: 600,
              fontSize: "28px",
              color: "#1E2F2B",

              "@media (max-width: 899px)": {
                fontSize: "24px",
              },

              "@media (max-width: 599px)": {
                fontSize: "22px",
                textAlign: "center",
              },
            }}
          >
            {bannerTitle}
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate(`/shop/${type}`)}
            sx={{
              // ORIGINAL DESKTOP
              backgroundColor: "#1E2F2B",
              borderRadius: "30px",
              px: 5,
              py: 1.3,
              fontSize: "14px",
              letterSpacing: 1.5,

              // TABLET
              "@media (max-width: 899px)": {
                px: 4,
                py: 1.2,
              },

              // PHONE
              "@media (max-width: 599px)": {
                px: 4,
                py: 1.1,
                fontSize: "13px",
              },

              "&:hover": {
                backgroundColor: "#2D463F",
              },
            }}
          >
            SHOP NOW
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MegaMenu;