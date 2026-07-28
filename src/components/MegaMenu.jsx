import React from "react";
import { Box, Stack, Typography, Button, Grid } from "@mui/material";

import SkincareImg from "../assets/SkinMenuImg.webp";
import HaircareImg from "../assets/HairMenuImg.webp";
import MoreImg from "../assets/MoreMenuImg.webp";

const MegaMenu = ({ type }) => {
  let menuData = {};
  let menuImage = SkincareImg;

  if (type === "skincare") {
    menuImage = SkincareImg;

    menuData = {
      title1: "CLEANSERS",
      items1: [
        "Face Wash",
        "Cleansing Oil",
        "Cleansing Balm",
        "Micellar Water",
      ],

      title2: "TREATMENTS",
      items2: ["Serum", "Toner", "Essence", "Face Mask"],

      title3: "PROTECTION",
      items3: ["Sunscreen", "Lip Balm", "Eye Cream", "Moisturizer"],

      bannerTitle: "Healthy Skin",
    };
  }

  if (type === "haircare") {
    menuImage = HaircareImg;

    menuData = {
      title1: "SHAMPOOS",
      items1: [
        "Anti-Dandruff Shampoo",
        "Repair Shampoo",
        "Volumizing Shampoo",
        "Hydrating Shampoo",
      ],

      title2: "CONDITIONERS",
      items2: [
        "Deep Conditioner",
        "Leave-In Conditioner",
        "Keratin Conditioner",
        "Curl Conditioner",
      ],

      title3: "TREATMENTS",
      items3: ["Hair Serum", "Hair Oil", "Hair Mask", "Scalp Treatment"],

      bannerTitle: "Healthy Hair",
    };
  }

  if (type === "more") {
    menuImage = MoreImg;

    menuData = {
      title1: "BODY CARE",
      items1: ["Body Wash", "Body Lotion", "Body Scrub", "Hand Cream"],

      title2: "FRAGRANCES",
      items2: ["Perfumes", "Body Mist", "Deodorants", "Gift Sets"],

      title3: "ACCESSORIES",
      items3: ["Beauty Tools", "Travel Kits", "Gift Cards", "Makeup Bags"],

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
                key={item}
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
                {item}
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
                key={item}
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
                {item}
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
                key={item}
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
                {item}
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
