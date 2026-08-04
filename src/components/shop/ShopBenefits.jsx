import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const benefits = [
  {
    icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 42 }} />,
    title: "Dermatologist Tested",
    text: "Every formula is clinically tested for safety and effectiveness.",
  },
  {
    icon: <SpaOutlinedIcon sx={{ fontSize: 42 }} />,
    title: "Clean Ingredients",
    text: "Crafted using skin-loving natural ingredients without harsh chemicals.",
  },
  {
    icon: <LocalShippingOutlinedIcon sx={{ fontSize: 42 }} />,
    title: "Free Shipping",
    text: "Free shipping on orders above ₹999 across India.",
  },
  {
    icon: <LockOutlinedIcon sx={{ fontSize: 42 }} />,
    title: "Secure Payments",
    text: "Safe checkout with trusted payment gateways.",
  },
];

const ShopBenefits = () => {
  return (
    <Box
      sx={{
        background: "#fff",
        pt: 5,
        pb: 9,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {benefits.map((item) => (
            <Grid
              key={item.title}
              size={{
                xs: 12,
                sm: 6,
                lg: 3,
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  background: "#FBF8F3",
                  border: "1px solid #EFE8DE",
                  borderRadius: "22px",
                  px: 4,
                  py: 5,
                  textAlign: "center",
                  transition: ".35s",

                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",

                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 18px 35px rgba(0,0,0,.08)",
                  },
                }}
              >
                <Box
                  sx={{
                    color: "#1E2F2B",
                    mb: 3,
                  }}
                >
                  {item.icon}
                </Box>

                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 24,
                    color: "#222",
                    mb: 2,
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    color: "#666",
                    fontSize: 16,
                    lineHeight: 1.8,
                  }}
                >
                  {item.text}
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