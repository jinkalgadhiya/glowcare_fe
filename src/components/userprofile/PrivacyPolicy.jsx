import React from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Divider,
} from "@mui/material";

import PrivacyTipOutlinedIcon from "@mui/icons-material/PrivacyTipOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import CookieOutlinedIcon from "@mui/icons-material/CookieOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <PersonOutlineOutlinedIcon />,
      title: "1. Information We Collect",
      content:
        "We collect information that you provide when creating an account, placing an order, contacting our support team, or using GlowCare services. This may include your name, email address, phone number, shipping address, and order information.",
    },
    {
      icon: <StorageOutlinedIcon />,
      title: "2. How We Use Your Information",
      content:
        "Your information is used to process and deliver orders, manage your account, provide customer support, improve our services, and communicate important updates related to your purchases and GlowCare account.",
    },
    {
      icon: <SecurityOutlinedIcon />,
      title: "3. How We Protect Your Information",
      content:
        "We take reasonable measures to protect your personal information from unauthorized access, misuse, loss, or disclosure. However, no method of electronic storage or internet transmission can be guaranteed to be completely secure.",
    },
    {
      icon: <ShareOutlinedIcon />,
      title: "4. Sharing Your Information",
      content:
        "GlowCare does not sell your personal information. Your information may only be shared with trusted service providers when necessary to process payments, deliver orders, provide customer support, or operate our services.",
    },
    {
      icon: <CookieOutlinedIcon />,
      title: "5. Cookies and Website Data",
      content:
        "GlowCare may use cookies and similar technologies to improve your browsing experience, remember preferences, understand website usage, and help us improve the performance of our website.",
    },
    {
      icon: <PrivacyTipOutlinedIcon />,
      title: "6. Your Privacy Choices",
      content:
        "You may review or update your account information through your GlowCare account. You can also contact us if you would like assistance regarding your personal information or privacy-related questions.",
    },
    {
      icon: <ContactSupportOutlinedIcon />,
      title: "7. Contact Us",
      content:
        "If you have any questions or concerns regarding this Privacy Policy or how your information is handled, please contact the GlowCare support team.",
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
            <PrivacyTipOutlinedIcon
              sx={{
                color: "#fff",
                fontSize: 32,
              }}
            />
          </Box>

          {/* Header Text */}

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
              Your Privacy Matters
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
              Privacy Policy
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
              Learn how GlowCare collects, uses, and protects your personal
              information when you use our website and services.
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
        {/* Introduction */}

        <Box sx={{ mb: 4 }}>
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
            GlowCare Policy
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: 22,
                md: 26,
              },
              fontWeight: 600,
              color: "#1E2F2B",
              mb: 1,
            }}
          >
            Your information, handled with care.
          </Typography>

          <Typography
            sx={{
              color: "#777",
              fontSize: 14,
              lineHeight: 1.8,
              maxWidth: 800,
            }}
          >
            At GlowCare, we value your trust. This Privacy Policy explains what
            information we collect and how we use and protect it while you use
            our website and services.
          </Typography>
        </Box>

        {/* Policy Sections */}

        <Stack spacing={2}>
          {sections.map((section, index) => (
            <Box
              key={index}
              sx={{
                border: "1px solid #ECE6DD",
                borderRadius: 3,
                p: {
                  xs: 2.5,
                  md: 3,
                },
                backgroundColor: "#fff",
                transition: "all .25s ease",

                "&:hover": {
                  borderColor: "#D8C3AD",
                  backgroundColor: "#FCFAF7",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="flex-start"
              >
                {/* Section Icon */}

                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2.5,
                    backgroundColor: "#F5EDE4",
                    color: "#A86C45",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {section.icon}
                </Box>

                {/* Section Content */}

                <Box>
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#2B332F",
                      mb: 0.8,
                    }}
                  >
                    {section.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#6F6F6F",
                      fontSize: 14,
                      lineHeight: 1.8,
                    }}
                  >
                    {section.content}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          ))}
        </Stack>

        {/* =====================================================
            PRIVACY PROMISE
        ===================================================== */}

        <Box
          sx={{
            mt: 6,
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
              direction={{
                xs: "column",
                md: "row",
              }}
              spacing={3}
              alignItems={{
                xs: "flex-start",
                md: "center",
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.08)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <SecurityOutlinedIcon
                  sx={{
                    color: "#D8B99A",
                    fontSize: 28,
                  }}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: 22,
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  Our Privacy Promise
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.70)",
                    fontSize: 14,
                    lineHeight: 1.8,
                    maxWidth: 700,
                  }}
                >
                  We are committed to treating your personal information with
                  respect and care. GlowCare continuously works to maintain a
                  safe and trusted experience for every customer.
                </Typography>
              </Box>
            </Stack>

            <Divider
              sx={{
                my: 3,
                borderColor: "rgba(255,255,255,0.10)",
              }}
            />

            <Typography
              sx={{
                fontSize: 13,
                color: "rgba(255,255,255,0.60)",
              }}
            >
              Last updated: September 2026
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default PrivacyPolicy;