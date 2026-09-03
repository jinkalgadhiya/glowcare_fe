import React from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import PinterestIcon from "@mui/icons-material/Pinterest";
import XIcon from "@mui/icons-material/X";

const Footer = () => {
  const navigate = useNavigate();

  const shopLinks = [
    "Shop All",
    "Skin Care",
    "Hair Care",
    "New Launches",
    "Featured Products",
  ];

  const supportLinks = [
    "Contact Us",
    "FAQs",
    "Shipping",
    "Returns",
    "Privacy Policy",
  ];

  const companyLinks = [
    "About Us",
    "Our Story",
    "Blog",
    "Careers",
    "Terms & Conditions",
  ];

  const linkStyle = {
    display: "block",
    mb: 2,
    color: "#fff",
    fontSize: 15,
    transition: "all .3s ease",
    cursor: "pointer",

    "&:hover": {
      color: "#F7ECE2",
      transform: "translateX(6px)",
    },
  };

  const handleSupportClick = (item) => {
    if (item === "FAQs") {
      navigate("/user/help-center");
    }

    if (item === "Contact Us") {
      navigate("/user/help-center");
    }

    if (item === "Privacy Policy") {
      navigate("/user/privacy-policy");
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#B89478",
        color: "#fff",
        pt: 8,
        pb: 4,
        px: { xs: 3, md: 5 },
      }}
    >
      {/* CENTERED FOOTER CONTENT CONTAINER */}

      <Box
        sx={{
          maxWidth: "1250px",
          mx: "auto",
        }}
      >
        <Grid
          container
          spacing={{
            xs: 5,
            md: 7,
          }}
          justifyContent="center"
        >
          {/* BRAND */}

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              textAlign: "left",
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: 42,
                  md: 48,
                },
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
                maxWidth: 330,
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
              {[
                InstagramIcon,
                FacebookOutlinedIcon,
                PinterestIcon,
                XIcon,
              ].map((Icon, index) => (
                <IconButton
                  key={index}
                  sx={{
                    width: 44,
                    height: 44,
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,.35)",
                    transition: "all .35s ease",

                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#B89478",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* SHOP */}

          <Grid
            item
            xs={6}
            sm={4}
            md={2}
            lg={2}
            sx={{
              textAlign: "left",
              ml: "100px",
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

            {shopLinks.map((item) => (
              <Link
                key={item}
                href="#"
                underline="none"
                sx={linkStyle}
              >
                {item}
              </Link>
            ))}
          </Grid>

          {/* SUPPORT */}

          <Grid
            item
            xs={6}
            sm={4}
            md={2}
            lg={2}
            sx={{
              textAlign: "left",
              ml: "100px",
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

            {supportLinks.map((item) => (
              <Link
                key={item}
                component="button"
                type="button"
                underline="none"
                onClick={() => handleSupportClick(item)}
                sx={{
                  ...linkStyle,
                  border: "none",
                  background: "transparent",
                  padding: 0,
                  fontFamily: "inherit",
                  textAlign: "left",
                }}
              >
                {item}
              </Link>
            ))}
          </Grid>

          {/* COMPANY */}

          <Grid
            item
            xs={6}
            sm={4}
            md={2}
            lg={2}
            sx={{
              textAlign: "left",
              ml: "100px",
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

            {companyLinks.map((item) => (
              <Link
                key={item}
                href="#"
                underline="none"
                sx={linkStyle}
              >
                {item}
              </Link>
            ))}
          </Grid>
        </Grid>

        {/* DIVIDER */}

        <Box
          sx={{
            mt: 7,
            mb: 4,
            borderTop: "1px solid rgba(255,255,255,.25)",
          }}
        />

        {/* BOTTOM FOOTER */}

        <Box
          sx={{
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
    </Box>
  );
};

export default Footer;