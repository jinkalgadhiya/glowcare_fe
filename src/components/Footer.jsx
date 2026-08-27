import React from "react";
import { Box, Grid, Typography, IconButton, Link } from "@mui/material";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import PinterestIcon from "@mui/icons-material/Pinterest";
import XIcon from "@mui/icons-material/X";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#B89478",
        color: "#fff",
        pt: 8,
        pb: 4,
        px: { xs: 3, md: 8 },
      }}
    >
      <Grid
        container
        spacing={6}
        justifyContent="center"
        sx={{
          maxWidth: "1300px",
          mx: "auto",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        {/* Brand */}

        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: {
              xs: "center",
              md: "flex-start",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 48,
              fontWeight: 700,
              letterSpacing: 1,
              mb: 3,
            }}
          >
            GlowCare
          </Typography>

          <Typography
            sx={{
              color: "#F8F5F1",
              lineHeight: 2,
              fontSize: 16,
              maxWidth: 320,
              mb: 5,
            }}
          >
            Discover premium skincare crafted with clean ingredients,
            dermatologist-tested formulas, and luxurious textures for healthy,
            glowing skin every day.
          </Typography>

          <Typography
            sx={{
              color: "#FFF8F2",
              letterSpacing: 3,
              fontSize: 13,
              textTransform: "uppercase",
              mb: 2.5,
            }}
          >
            Follow Us
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            {[InstagramIcon, FacebookOutlinedIcon, PinterestIcon, XIcon].map(
              (Icon, index) => (
                <IconButton
                  key={index}
                  sx={{
                    width: 44,
                    height: 44,

                    color: "#fff",

                    border: "1px solid rgba(255,255,255,.35)",

                    transition: ".35s",

                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#B89478",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ),
            )}
          </Box>
        </Grid>

        {/* Shop */}

        <Grid
          item
          xs={6}
          sm={4}
          md={2.5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: {
              xs: "center",
              md: "flex-start",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 600,
              mb: 3,
            }}
          >
            Shop
          </Typography>

          {[
            "Shop All",
            "Skin Care",
            "Hair Care",
            "New Launches",
            "Featured Products",
          ].map((item) => (
            <Link
              key={item}
              href="#"
              underline="none"
              sx={{
                display: "block",
                mb: 2,
                color: "#fff",
                fontSize: 15,

                transition: ".3s",

                "&:hover": {
                  color: "#F7ECE2",
                  pl: 1,
                },
              }}
            >
              {item}
            </Link>
          ))}
        </Grid>

        {/* Support */}

        <Grid
          item
          xs={6}
          sm={4}
          md={2.5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: {
              xs: "center",
              md: "flex-start",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 600,
              mb: 3,
            }}
          >
            Support
          </Typography>

          {["Contact Us", "FAQs", "Shipping", "Returns", "Privacy Policy"].map(
            (item) => (
              <Link
                key={item}
                href="#"
                underline="none"
                sx={{
                  display: "block",
                  mb: 2,
                  color: "#fff",
                  fontSize: 15,

                  transition: ".3s",

                  "&:hover": {
                    color: "#F7ECE2",
                    pl: 1,
                  },
                }}
              >
                {item}
              </Link>
            ),
          )}
        </Grid>
        {/* Company */}

        <Grid
          item
          xs={6}
          sm={4}
          md={2.5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: {
              xs: "center",
              md: "flex-start",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 600,
              mb: 3,
            }}
          >
            Company
          </Typography>

          {[
            "About Us",
            "Our Story",
            "Blog",
            "Careers",
            "Terms & Conditions",
          ].map((item) => (
            <Link
              key={item}
              href="#"
              underline="none"
              sx={{
                display: "block",
                mb: 2,
                color: "#fff",
                fontSize: 15,
                transition: ".3s",

                "&:hover": {
                  color: "#F7ECE2",
                  pl: 1,
                },
              }}
            >
              {item}
            </Link>
          ))}
        </Grid>
      </Grid>

      {/* Divider */}

      <Box
        sx={{
          mt: 7,
          mb: 4,
          borderTop: "1px solid rgba(255,255,255,.25)",
        }}
      />

      {/* Bottom Footer */}

      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",

          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          flexDirection: {
            xs: "column",
            md: "row",
          },

          gap: 2,
        }}
      >
        <Typography
          sx={{
            color: "#F8F5F1",
            fontSize: 14,
          }}
        >
          © 2026 GlowCare. All Rights Reserved.
        </Typography>

        <Typography
          sx={{
            color: "#F8F5F1",
            fontSize: 14,
            letterSpacing: 1,
            textAlign: "center",
          }}
        >
          Crafted with care. Backed by science. Made for you.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
