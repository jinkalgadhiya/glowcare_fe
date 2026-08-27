import React from "react";
import { Box, Breadcrumbs, Container, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";

const ShopHero = ({ title, subtitle, bannerImage, category = "Shop" }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        mt: "70px",
        height: { xs: 420, md: 520 },
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f8f5ee",

        backgroundImage: `
          linear-gradient(
  90deg,
  #f8f5ee 0%,
  rgba(248,246,242,0.95) 20%,
  rgba(248,246,242,0.40) 35%,
  rgba(248,246,242,0.10) 45%,
  rgba(248,246,242,0) 55%
),
          url(${bannerImage})
        `,

        backgroundRepeat: "no-repeat",
        backgroundPosition: "right center",
        backgroundSize: {
          xs: "cover",
          md: "58%",
        },
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            maxWidth: 560,
            pl:12,
          }}
        >
          <Breadcrumbs
            separator={<NavigateNextIcon sx={{ fontSize: 16 }} />}
            sx={{
              mb: 3,
              "& .MuiBreadcrumbs-separator": {
                color: "#A5A5A5",
              },
            }}
          >
            <Link
              underline="hover"
              color="#7C7C7C"
              sx={{
                cursor: "pointer",
                fontSize: 14,
              }}
              onClick={() => navigate("/")}
            >
              Home
            </Link>

            <Typography
              sx={{
                color: "#2F2F2F",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              {category}
            </Typography>
          </Breadcrumbs>

          <Typography
            sx={{
              fontWeight: 600,
              color: "#1E1E1E",
              lineHeight: 1.1,
              mb: 3,
              letterSpacing: "-2px",
              fontSize: {
                xs: "3rem",
                sm: "3.8rem",
                md: "4rem",
              },
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              color: "#666",
              fontSize: {
                xs: "17px",
                md: "19px",
              },
              lineHeight: 1.8,
              maxWidth: 470,
            }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ShopHero;
