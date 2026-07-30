import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const benefits = [
  {
    icon: <VerifiedOutlinedIcon sx={{ fontSize: 42 }} />,
    title: "Dermatologist Tested",
    description:
      "Every formula is carefully tested for safety and effectiveness.",
  },
  {
    icon: <SpaOutlinedIcon sx={{ fontSize: 42 }} />,
    title: "Clean Ingredients",
    description:
      "Free from harsh chemicals with skin-loving natural ingredients.",
  },
  {
    icon: <LocalShippingOutlinedIcon sx={{ fontSize: 42 }} />,
    title: "Free Shipping",
    description:
      "Enjoy free shipping on orders above ₹999 anywhere in India.",
  },
  {
    icon: <LockOutlinedIcon sx={{ fontSize: 42 }} />,
    title: "Secure Payments",
    description:
      "Fast and secure checkout with trusted payment gateways.",
  },
];

const ShopBenefits = () => {
  return (
    <Box
      sx={{
        py: 10,
        backgroundColor: "#FAF8F4",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {benefits.map((item) => (
            <Grid
              item
              xs={12}
              sm={6}
              lg={3}
              key={item.title}
            >
              <Box
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 4,
                  p: 4,
                  height: "100%",
                  textAlign: "center",
                  transition: ".35s",

                  border: "1px solid #ECECEC",

                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 50px rgba(0,0,0,.08)",
                  },
                }}
              >
                <Box
                  sx={{
                    color: "#1F3B2D",
                    mb: 3,
                  }}
                >
                  {item.icon}
                </Box>

                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 20,
                    color: "#222",
                    mb: 2,
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    color: "#666",
                    lineHeight: 1.8,
                    fontSize: 15,
                  }}
                >
                  {item.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ShopBenefits;