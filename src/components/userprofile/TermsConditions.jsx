import React from "react";

import {
  Box,
  Paper,
  Typography,
  Stack,
  Divider,
} from "@mui/material";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

const TermsConditions = () => {
  const terms = [
    {
      number: "01",
      title: "Acceptance of Terms",
      icon: <GavelOutlinedIcon />,
      content:
        "By accessing or using the GlowCare website, creating an account, or placing an order, you agree to follow these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website or services.",
    },
    {
      number: "02",
      title: "Products and Information",
      icon: <ShoppingBagOutlinedIcon />,
      content:
        "We aim to provide accurate information, images, descriptions, and pricing for all GlowCare products. However, product packaging, colours, ingredients, and appearance may vary slightly from the images displayed on the website.",
    },
    {
      number: "03",
      title: "Orders and Payments",
      icon: <ShoppingBagOutlinedIcon />,
      content:
        "When you place an order, you agree to provide accurate and complete information. GlowCare reserves the right to accept, refuse, or cancel an order when necessary, including in cases of incorrect pricing, unavailable products, or suspected fraudulent activity.",
    },
    {
      number: "04",
      title: "Shipping and Delivery",
      icon: <LocalShippingOutlinedIcon />,
      content:
        "Delivery timelines may vary depending on your location, product availability, and delivery partner. Estimated delivery dates are provided for convenience and are not guaranteed in situations beyond our reasonable control.",
    },
    {
      number: "05",
      title: "Returns and Refunds",
      icon: <ReplayOutlinedIcon />,
      content:
        "Return and refund requests are subject to the GlowCare Return Policy. Products must meet the applicable eligibility requirements before a return or refund can be approved.",
    },
    {
      number: "06",
      title: "User Accounts",
      icon: <PersonOutlineOutlinedIcon />,
      content:
        "You are responsible for maintaining the confidentiality of your account information. Please ensure that the details provided in your account are accurate and up to date. Any activity performed through your account may be considered your responsibility.",
    },
    {
      number: "07",
      title: "Website Usage",
      icon: <GavelOutlinedIcon />,
      content:
        "You agree not to misuse the GlowCare website, interfere with its functionality, attempt unauthorized access, or use the website for any unlawful or harmful activity.",
    },
    {
      number: "08",
      title: "Changes to These Terms",
      icon: <DescriptionOutlinedIcon />,
      content:
        "GlowCare may update these Terms and Conditions from time to time. Any changes will become effective when they are published on this website. We encourage you to review this page periodically.",
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid #E8E1D8",
        backgroundColor: "#fff",
      }}
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <Box
        sx={{
          px: {
            xs: 3,
            md: 5,
          },
          py: {
            xs: 4,
            md: 5,
          },
          background:
            "linear-gradient(135deg, #F8F3EC 0%, #EFE7DC 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Circles */}

        <Box
          sx={{
            position: "absolute",
            width: 180,
            height: 180,
            borderRadius: "50%",
            backgroundColor: "rgba(184,148,120,0.10)",
            right: -60,
            top: -70,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: "rgba(184,148,120,0.08)",
            right: 80,
            bottom: -60,
          }}
        />

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={3}
          alignItems={{
            xs: "flex-start",
            sm: "center",
          }}
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Icon */}

          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 3,
              backgroundColor: "#1E2F2B",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              boxShadow: "0 10px 25px rgba(30,47,43,0.15)",
            }}
          >
            <DescriptionOutlinedIcon
              sx={{
                color: "#fff",
                fontSize: 32,
              }}
            />
          </Box>

          {/* Heading */}

          <Box>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#B89478",
                mb: 1,
              }}
            >
              GlowCare Policies
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: 28,
                  md: 34,
                },
                fontWeight: 600,
                color: "#1E2F2B",
                lineHeight: 1.2,
              }}
            >
              Terms & Conditions
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: "#777168",
                fontSize: 15,
                lineHeight: 1.7,
                maxWidth: 650,
              }}
            >
              Please read these Terms and Conditions carefully before using
              GlowCare or placing an order with us.
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <Box
        sx={{
          p: {
            xs: 3,
            md: 5,
          },
        }}
      >
        {/* INTRODUCTION */}

        <Box
          sx={{
            mb: 4,
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: "#B89478",
              mb: 0.8,
            }}
          >
            Legal Information
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: 22,
                md: 26,
              },
              fontWeight: 600,
              color: "#1E2F2B",
            }}
          >
            Using GlowCare
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#777168",
              fontSize: 14,
              lineHeight: 1.8,
              maxWidth: 850,
            }}
          >
            These Terms and Conditions explain the rules, responsibilities,
            and guidelines that apply when you browse our website, create an
            account, purchase products, or use GlowCare services.
          </Typography>
        </Box>

        {/* =====================================================
            TERMS LIST
        ===================================================== */}

        <Stack spacing={2}>
          {terms.map((term) => (
            <Box
              key={term.number}
              sx={{
                border: "1px solid #ECE6DD",
                borderRadius: "16px",
                p: {
                  xs: 2.5,
                  md: 3,
                },
                backgroundColor: "#fff",
                transition: "all .25s ease",

                "&:hover": {
                  borderColor: "#D8C3AD",
                  backgroundColor: "#FCFAF7",
                  boxShadow: "0 8px 20px rgba(30,47,43,0.04)",
                },
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="flex-start"
              >
                {/* Number */}

                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    minWidth: 38,
                    borderRadius: "50%",
                    backgroundColor: "#F5EDE4",
                    color: "#A86C45",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {term.number}
                </Box>

                {/* Content */}

                <Box
                  sx={{
                    flex: 1,
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        color: "#B89478",
                        display: "flex",
                        alignItems: "center",

                        "& svg": {
                          fontSize: 20,
                        },
                      }}
                    >
                      {term.icon}
                    </Box>

                    <Typography
                      sx={{
                        fontSize: 17,
                        fontWeight: 600,
                        color: "#1E2F2B",
                      }}
                    >
                      {term.title}
                    </Typography>
                  </Stack>

                  <Typography
                    sx={{
                      color: "#6F6F6F",
                      fontSize: 14,
                      lineHeight: 1.8,
                    }}
                  >
                    {term.content}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          ))}
        </Stack>

        {/* =====================================================
            IMPORTANT NOTICE
        ===================================================== */}

        <Box
          sx={{
            mt: 5,
            borderRadius: 4,
            background:
              "linear-gradient(135deg, #1E2F2B 0%, #29433C 100%)",
            p: {
              xs: 3,
              md: 4,
            },
            color: "#fff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative Circle */}

          <Box
            sx={{
              position: "absolute",
              width: 180,
              height: 180,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.04)",
              right: -70,
              top: -80,
            }}
          />

          <Box
            sx={{
              position: "relative",
              zIndex: 1,
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="flex-start"
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  minWidth: 48,
                  borderRadius: 2,
                  backgroundColor: "rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <WarningAmberRoundedIcon
                  sx={{
                    color: "#D8B99A",
                    fontSize: 25,
                  }}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  Important Notice
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.70)",
                    fontSize: 14,
                    lineHeight: 1.8,
                    maxWidth: 700,
                  }}
                >
                  By continuing to use GlowCare, you acknowledge that you have
                  read and understood these Terms and Conditions. If you have
                  any questions regarding these terms, please contact our
                  support team through the Help Center.
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>

        {/* LAST UPDATED */}

        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: "1px solid #EEE8DF",
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              color: "#8A8178",
            }}
          >
            Last updated: September 2026
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default TermsConditions;