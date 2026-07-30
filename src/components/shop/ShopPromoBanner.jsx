import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const ShopPromoBanner = ({
  title,
  description,
  image,
  buttonText = "Shop Now",
  buttonLink = "/shop/all",
}) => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Box
        sx={{
          background: "linear-gradient(135deg, #F8F6F2 0%, #F1EBDD 100%)",
          borderRadius: "28px",
          overflow: "hidden",
          px: { xs: 4, md: 8 },
          py: { xs: 6, md: 8 },
          display: "flex",
          flexDirection: {
            xs: "column-reverse",
            md: "row",
          },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 6,
        }}
      >
        {/* Left */}
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 34,
                md: 48,
              },
              fontWeight: 700,
              color: "#222",
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              color: "#666",
              fontSize: 17,
              lineHeight: 1.8,
              maxWidth: 520,
              mb: 5,
            }}
          >
            {description}
          </Typography>

          <Button
            variant="contained"
            endIcon={<ArrowForwardRoundedIcon />}
            onClick={() => navigate(buttonLink)}
            sx={{
              backgroundColor: "#1F3B2D",
              px: 4,
              py: 1.5,
              borderRadius: "50px",
              textTransform: "none",
              fontWeight: 600,
              fontSize: 15,

              "&:hover": {
                backgroundColor: "#16291F",
              },
            }}
          >
            {buttonText}
          </Button>
        </Box>

        {/* Right */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={image}
            alt={title}
            sx={{
              width: "100%",
              maxWidth: 420,
              objectFit: "contain",
              transition: ".4s",

              "&:hover": {
                transform: "scale(1.04)",
              },
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default ShopPromoBanner;