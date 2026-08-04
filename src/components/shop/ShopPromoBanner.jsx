import React from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

const ShopPromoBanner = ({
  title,
  description,
  buttonText = "Explore Collection",
  buttonLink = "/shop/all",
}) => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box
        sx={{
          background:
            "linear-gradient(135deg,#F8F6F2 0%,#F3EBDD 50%,#F8F6F2 100%)",
          borderRadius: "28px",
          px: { xs: 4, md: 10 },
          py: { xs: 6, md: 8 },
          textAlign: "center",
          border: "1px solid #EEE6DB",
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "2.2rem",
              md: "3.2rem",
            },
            fontWeight: 700,
            color: "#1E2F2B",
            mb: 3,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            maxWidth: 760,
            mx: "auto",
            color: "#666",
            fontSize: 18,
            lineHeight: 1.9,
            mb: 5,
          }}
        >
          {description}
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          spacing={5}
          sx={{ mb: 5, ml: "340px", }}
        >
          <Stack
            direction="row"
            spacing={1.2}
            alignItems="center"
          >
            <VerifiedUserOutlinedIcon sx={{ color: "#1E2F2B" }} />

            <Typography fontWeight={500}>
              Dermatologist Tested
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={1.2}
            alignItems="center"
          >
            <SpaOutlinedIcon sx={{ color: "#1E2F2B" }} />

            <Typography fontWeight={500}>
              Clean Ingredients
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={1.2}
            alignItems="center"
          >
            <LocalShippingOutlinedIcon
              sx={{ color: "#1E2F2B" }}
            />

            <Typography fontWeight={500}>
              Free Shipping Available
            </Typography>
          </Stack>
        </Stack>

        <Button
          variant="contained"
          endIcon={<ArrowForwardRoundedIcon />}
          onClick={() => navigate(buttonLink)}
          sx={{
            bgcolor: "#1E2F2B",
            color: "#fff",
            px: 5,
            py: 1.6,
            borderRadius: "40px",
            fontSize: "15px",
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 10px 24px rgba(30,47,43,.18)",

            "&:hover": {
              bgcolor: "#162520",
            },
          }}
        >
          {buttonText}
        </Button>
      </Box>
    </Container>
  );
};

export default ShopPromoBanner;