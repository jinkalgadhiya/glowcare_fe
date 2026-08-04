import React from "react";
import { Box, Stack, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SkincareImg from "../assets/SkinMenuImg.webp";
import HaircareImg from "../assets/HairMenuImg.webp";
import MoreImg from "../assets/MoreMenuImg.webp";

const MegaMenu = ({ type }) => {
  const navigate = useNavigate();

  let menuData = {};
  let menuImage = SkincareImg;

  if (type === "skincare") {
    menuImage = SkincareImg;

    menuData = {
      title1: "CLEANSERS",

      items1: [
        {
          label: "Face Wash",
          path: "/shop/face-wash",
        },
        {
          label: "Micellar Water",
          path: "/shop/micellar-water",
        },
        {
          label: "Cleansing Oil & Balm",
          path: "/shop/cleansing-oil-balm",
        },
        {
          label: "Scrubs & Exfoliators",
          path: "/shop/scrubs-exfoliators",
        },
      ],

      title2: "TREATMENTS",

      items2: [
        {
          label: "Serum",
          path: "/shop/serum",
        },
        {
          label: "Toner",
          path: "/shop/toner",
        },
        {
          label: "Essence",
          path: "/shop/essence",
        },
        {
          label: "Face Mask",
          path: "/shop/face-mask",
        },
      ],

      title3: "PROTECTION",

      items3: [
        {
          label: "Sunscreen",
          path: "/shop/sunscreen",
        },
        {
          label: "Lip Balm",
          path: "/shop/lip-balm",
        },
        {
          label: "Eye Cream",
          path: "/shop/eye-cream",
        },
        {
          label: "Moisturizer",
          path: "/shop/moisturizer",
        },
      ],

      bannerTitle: "Healthy Skin",
    };
  }

  if (type === "haircare") {
    menuImage = HaircareImg;

    menuData = {
      title1: "SHAMPOOS",

      items1: [
        {
          label: "Liquid Shampoo",
          path: "/shop/liquid-shampoo",
        },
        {
          label: "Dry Shampoo",
          path: "/shop/dry-shampoo",
        },
        {
          label: "Shampoo Bar",
          path: "/shop/bar-shampoo",
        },
        {
          label: "Powder Shampoo",
          path: "/shop/powder-shampoo",
        },
      ],

      title2: "CONDITIONERS",

      items2: [
        {
          label: "Liquid Conditioner",
          path: "/shop/liquid-conditioner",
        },
        {
          label: "Leave-In Conditioner",
          path: "/shop/leave-in-conditioner",
        },
        {
          label: "Bar Conditioner",
          path: "/shop/bar-conditioner",
        },
        {
          label: "Powder Conditioner",
          path: "/shop/powder-conditioner",
        },
      ],

      title3: "TREATMENTS",

      items3: [
        {
          label: "Hair Serum",
          path: "/shop/hair-serum",
        },
        {
          label: "Hair Oil",
          path: "/shop/hair-oil",
        },
        {
          label: "Hair Mask",
          path: "/shop/hair-mask",
        },
        {
          label: "Scalp Treatment",
          path: "/shop/scalp-treatment",
        },
      ],

      bannerTitle: "Healthy Hair",
    };
  }

  if (type === "more") {
    menuImage = MoreImg;

    menuData = {
      title1: "BODY CARE",

      items1: [
        {
          label: "Body Wash",
          path: "/shop/body-wash",
        },
        {
          label: "Body Lotion",
          path: "/shop/body-lotion",
        },
        {
          label: "Body Scrub",
          path: "/shop/body-scrub",
        },
        {
          label: "Hand Cream",
          path: "/shop/hand-cream",
        },
      ],

      title2: "FRAGRANCES",

      items2: [
        {
          label: "Perfumes",
          path: "/shop/perfumes",
        },
        {
          label: "Body Mist",
          path: "/shop/body-mist",
        },
        {
          label: "Deodorants",
          path: "/shop/deodorants",
        },
        {
          label: "Gift Sets",
          path: "/shop/gift-sets",
        },
      ],

      title3: "ACCESSORIES",

      items3: [
        {
          label: "Beauty Tools",
          path: "/shop/beauty-tools",
        },
        {
          label: "Travel Kits",
          path: "/shop/travel-kits",
        },
        {
          label: "Gift Cards",
          path: "/shop/gift-cards",
        },
        {
          label: "Makeup Bags",
          path: "/shop/makeup-bags",
        },
      ],

      bannerTitle: "Luxury Essentials",
    };
  }

  return (
    <Box
      sx={{
        position: "absolute",
        top: "100%",
        left: "60px",
        width: "92vw",
        backgroundColor: "white",
        color: "black",
        borderRadius: 4,
        px: 8,
        py: 4,
        boxShadow: "0 10px 30px rgba(0,0,0,.12)",
        zIndex: 1000,
      }}
    >
      <Grid container spacing={8}>
        {/* Column 1 */}
        <Grid size={2}>
          <Typography
            sx={{
              mb: 3,
              fontWeight: 600,
              letterSpacing: 2,
              fontSize: "14px",
              color: "#1e2f2b",
            }}
          >
            {menuData.title1}
          </Typography>

          <Stack spacing={2}>
            {menuData.items1?.map((item) => (
              <Typography
                key={item.label}
                onClick={() => navigate(item.path)}
                sx={{
                  cursor: "pointer",
                  transition: "all .3s ease",

                  "&:hover": {
                    color: "#1e2f2b",
                    pl: 1,
                    fontWeight: 500,
                  },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Stack>
        </Grid>

        {/* Column 2 */}
        <Grid size={2}>
          <Typography
            sx={{
              mb: 3,
              fontWeight: 600,
              letterSpacing: 2,
              fontSize: "14px",
              color: "#1e2f2b",
            }}
          >
            {menuData.title2}
          </Typography>

          <Stack spacing={2}>
            {menuData.items2?.map((item) => (
              <Typography
                key={item.label}
                onClick={() => navigate(item.path)}
                sx={{
                  cursor: "pointer",
                  transition: "all .3s ease",

                  "&:hover": {
                    color: "#1e2f2b",
                    pl: 1,
                    fontWeight: 500,
                  },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Stack>
        </Grid>

        {/* Column 3 */}
        <Grid size={2}>
          <Typography
            sx={{
              mb: 3,
              fontWeight: 600,
              letterSpacing: 2,
              fontSize: "14px",
              color: "#1e2f2b",
            }}
          >
            {menuData.title3}
          </Typography>

          <Stack spacing={2}>
            {menuData.items3?.map((item) => (
              <Typography
                key={item.label}
                onClick={() => navigate(item.path)}
                sx={{
                  cursor: "pointer",
                  transition: "all .3s ease",

                  "&:hover": {
                    color: "#1e2f2b",
                    pl: 1,
                    fontWeight: 500,
                  },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Stack>
        </Grid>

        {/* Image Section */}
        <Grid
          size={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={menuImage}
            alt={menuData.bannerTitle}
            sx={{
              width: 260,
              height: 260,
              objectFit: "cover",
              borderRadius: 3,
              mb: 3,
            }}
          />

          <Typography
            sx={{
              mb: 2,
              fontWeight: 600,
              fontSize: "28px",
              color: "#1e2f2b",
            }}
          >
            {menuData.bannerTitle}
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1e2f2b",
              borderRadius: "30px",
              px: 5,
              py: 1.3,
              fontSize: "14px",
              letterSpacing: 1.5,

              "&:hover": {
                backgroundColor: "#2d463f",
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
