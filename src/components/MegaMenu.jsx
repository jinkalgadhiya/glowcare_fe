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
      const data = (await getCategories()) || [];

      const activeCategories = data.filter(
        (item) => item.status === "Active" && item.menuType === type,
      );

      setCategories(activeCategories);
    };

    loadCategories();
  }, [type]);

  const mainCategories = categories.filter(
    (item) => item.categoryType === "main",
  );

  const subCategories = categories.filter(
    (item) => item.categoryType === "sub",
  );

  const groupedCategories = mainCategories.reduce((acc, main) => {
    acc[main.mainCategory] = subCategories.filter(
      (sub) => sub.mainCategory === main.mainCategory,
    );

    return acc;
  }, {});

  let menuImage = SkincareImg;
  const bannerTitle = type.charAt(0).toUpperCase() + type.slice(1);

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
        top: "100%",
        left: "60px",
        width: "85vw",
        backgroundColor: "#fff",
        color: "#222",
        borderRadius: 4,
        px: 8,
        py: 4,
        boxShadow: "0 10px 30px rgba(0,0,0,.12)",
        zIndex: 1000,
      }}
    >
      <Grid container spacing={4}>
        {/* Dynamic Categories */}

        {Object.entries(groupedCategories)
          .filter(([_, items]) => items.length > 0)
          .map(([mainCategory, items]) => (
            <Grid item xs={2} key={mainCategory} sx={{ pr: 12 }}>
              <Typography
                sx={{
                  mb: 3,
                  fontWeight: 600,
                  letterSpacing: 2,
                  fontSize: "14px",
                  color: "#1E2F2B",
                  textTransform: "uppercase",
                }}
              >
                {mainCategory}
              </Typography>

              <Stack spacing={2}>
                {items.map((item) => (
                  <Typography
                    key={item.id}
                    onClick={() =>
                      navigate(
                        `/shop/${encodeURIComponent(
                          item.subCategory.toLowerCase().replaceAll(" ", "-"),
                        )}`,
                      )
                    }
                    sx={{
                      cursor: "pointer",
                      transition: "all .3s ease",

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

        {/* Banner */}

        <Grid
          item
          xs={4}
          sx={{
            ml: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={menuImage}
            alt={bannerTitle}
            onClick={() => navigate(`/shop/${type}`)}
            sx={{
              width: 260,
              height: 260,
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
            }}
          >
            {bannerTitle}
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate(`/shop/${type}`)}
            sx={{
              backgroundColor: "#1E2F2B",
              borderRadius: "30px",
              px: 5,
              py: 1.3,
              fontSize: "14px",
              letterSpacing: 1.5,

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
