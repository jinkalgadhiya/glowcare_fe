import React from "react";
import {
  Box,
  Typography,
  Grid,
  Chip,
} from "@mui/material";

import WhyImage from "../assets/why-choose-us.jpg";

const features = [
  {
    id: "01",
    title: "Clean Ingredients",
    description:
      "Made with carefully selected ingredients that nourish and protect your skin without harsh chemicals.",
  },
  {
    id: "02",
    title: "Dermatologist Tested",
    description:
      "Every formula is tested for safety and designed to suit all skin types for everyday use.",
  },
  {
    id: "03",
    title: "Cruelty Free",
    description:
      "We never test on animals and believe skincare should be kind to both people and nature.",
  },
];

const WhyChooseUs = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#FCFAF7",
        py: 12,
        px: {
          xs: 3,
          md: 8,
        },
      }}
    >
      <Grid
        container
        spacing={12}
        alignItems="center"
      >        {/* Left Side */}

        <Grid
          item
          xs={12}
          md={5}
          sx={{
            ml: "50px",
          }}
        >
          {/* Small Badge */}

          <Chip
            label="WHY GLOWCARE"
            sx={{
              backgroundColor: "#FFFFFF",
              color: "#1E2F2B",
              border: "1px solid #D9D5CF",
              borderRadius: "30px",
              px: 1,
              mb: 4,
              fontWeight: 500,
              letterSpacing: 1,
            }}
          />

          {/* Heading */}

          <Typography
            sx={{
              fontSize: {
                xs: "38px",
                md: "54px",
              },
              fontWeight: 500,
              color: "#1E2F2B",
              lineHeight: 1.1,
              mb: 3,
            }}
          >
            Your Skin Deserves
            <br />
            The Best Care.
          </Typography>

          {/* Description */}

          <Typography
            sx={{
              color: "#6B6B6B",
              fontSize: 16,
              lineHeight: 1.9,
              maxWidth: 520,
              mb: 7,
            }}
          >
            Discover premium skincare crafted with carefully selected
            ingredients, backed by science, and designed to bring healthy,
            radiant skin every day.
          </Typography>

          {/* Features */}

          {features.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 3,
                mb: 5,
              }}
            >
              {/* Number */}

              <Typography
                sx={{
                  fontSize: 34,
                  color: "#CFC8BF",
                  minWidth: 45,
                  fontWeight: 300,
                }}
              >
                {item.id}
              </Typography>

              {/* Text */}

              <Box>
                <Typography
                  sx={{
                    fontSize: 28,
                    fontWeight: 500,
                    color: "#1E2F2B",
                    mb: 1,
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    color: "#6B6B6B",
                    lineHeight: 1.8,
                    fontSize: 15,
                    maxWidth: 420,
                  }}
                >
                  {item.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Grid>
                {/* Right Side */}

        <Grid
          item
          xs={12}
          md={10}
        >
          <Box
            sx={{
              position: "relative",
              borderRadius: 5,
              overflow: "hidden",
              height: {
                xs: 500,
                md: 720,
              },
              ml: "100px",
              width: "110%",
              mt: "20px",
            }}
          >
            {/* Main Image */}

            <Box
              component="img"
              src={WhyImage}
              alt="Why Choose GlowCare"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 5,
              }}
            />

            {/* Floating Card */}

            <Box
              sx={{
                position: "absolute",
                left: 35,
                bottom: 35,

                display: "flex",
                alignItems: "center",
                gap: 1,

                backgroundColor: "#FFFFFF",
                px: 2,
                py: 0.8,

                borderRadius: "60px",

                boxShadow: "0 15px 40px rgba(0,0,0,.12)",
              }}
            >
              {/* Icon */}

              <Box
                sx={{
                  width: 48,
                  height: 48,

                  borderRadius: "50%",

                  backgroundColor: "#1E2F2B",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",

                  color: "#fff",
                  fontSize: 25,
                }}
              >
                ★
              </Box>

              {/* Text */}

              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#1E2F2B",
                    fontSize: 16,
                  }}
                >
                  Trusted By 10,000+
                </Typography>

                <Typography
                  sx={{
                    color: "#777",
                    fontSize: 14,
                  }}
                >
                  Happy GlowCare Customers
                </Typography>
              </Box>
            </Box>

            {/* Bottom Labels */}

            <Box
              sx={{
                position: "absolute",
                left: 35,
                right: 35,
                bottom: -45,

                display: "flex",
                justifyContent: "space-between",

                color: "#666",
                fontSize: 14,
                letterSpacing: 1,
              }}
            >
              <Typography>EST. 2026</Typography>

              <Typography
                sx={{
                  cursor: "pointer",

                  "&:hover": {
                    color: "#B89478",
                  },
                }}
              >
                LEARN MORE →
              </Typography>
            </Box>

          </Box>
        </Grid>

      </Grid>
    </Box>
  );
};

export default WhyChooseUs;