import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

import skinBeforeAfter from "../assets/skin-before-after.png";

const SkinAdvisorSection = () => {
  const navigate = useNavigate();

  const handleAnalyzeSkin = () => {
    navigate("/skin-analysis");
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#F5F1EA",
        py: {
          xs: 5,
          sm: 6,
          md: 7,
        },
      }}
    >
      <Box
        sx={{
          width: {
            xs: "92%",
            sm: "88%",
            md: "86%",
            lg: "82%",
          },
          maxWidth: "1180px",
          mx: "auto",

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          gap: {
            xs: 4,
            md: 7,
          },

          flexDirection: {
            xs: "column",
            md: "row",
          },

          // =============================================
          // MINI LAPTOP
          // =============================================

          "@media (min-width: 900px) and (max-width: 1199px)": {
            gap: 5,
          },
        }}
      >
        {/* =========================================
            LEFT CONTENT
        ========================================== */}

        <Box
          sx={{
            flex: 1,
            width: "100%",
            maxWidth: {
              xs: "100%",
              md: "430px",
            },

            // =========================================
            // TABLET / PHONE
            // =========================================

            "@media (max-width: 899px)": {
              maxWidth: "600px",
            },

            "@media (max-width: 599px)": {
              maxWidth: "100%",
            },
          }}
        >
          {/* Small label */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1.5,

              "@media (max-width: 599px)": {
                gap: 0.8,
                mb: 1.2,
              },
            }}
          >
            <AutoAwesomeOutlinedIcon
              sx={{
                fontSize: 15,
                color: "#1E2F2B",

                "@media (max-width: 599px)": {
                  fontSize: 14,
                },
              }}
            />

            <Typography
              sx={{
                fontSize: "10px",
                letterSpacing: "2px",
                fontWeight: 600,
                color: "#1E2F2B",
                textTransform: "uppercase",

                "@media (max-width: 599px)": {
                  fontSize: "9px",
                  letterSpacing: "1.5px",
                },
              }}
            >
              GlowCare Skin Advisor
            </Typography>
          </Box>

          {/* Heading */}

          <Typography
            sx={{
              fontFamily: "Georgia, serif",
              fontSize: {
                xs: "34px",
                sm: "40px",
                md: "46px",
              },
              lineHeight: 1.1,
              fontWeight: 400,
              color: "#1E2F2B",
              mb: 1.5,

              // =========================================
              // MINI LAPTOP
              // =========================================

              "@media (min-width: 900px) and (max-width: 1199px)": {
                fontSize: "42px",
              },

              // =========================================
              // PHONE
              // =========================================

              "@media (max-width: 599px)": {
                fontSize: "32px",
                lineHeight: 1.12,
                mb: 1.3,
              },
            }}
          >
            Know your skin.
            <br />
            Love your routine.
          </Typography>

          {/* Description */}

          <Typography
            sx={{
              fontSize: {
                xs: "12px",
                md: "13px",
              },
              lineHeight: 1.7,
              color: "#77716A",
              maxWidth: "390px",
              mb: 2.5,

              "@media (max-width: 899px)": {
                maxWidth: "500px",
              },

              "@media (max-width: 599px)": {
                fontSize: "12px",
                lineHeight: 1.65,
                maxWidth: "100%",
                mb: 2.2,
              },
            }}
          >
            Upload a photo and discover skincare recommendations tailored to
            your skin&apos;s visible characteristics.
          </Typography>

          {/* CTA */}

          <Button
            variant="contained"
            onClick={handleAnalyzeSkin}
            endIcon={
              <ArrowForwardIcon
                sx={{
                  fontSize: 16,

                  "@media (max-width: 599px)": {
                    fontSize: 14,
                  },
                }}
              />
            }
            sx={{
              backgroundColor: "#1E2F2B",
              color: "#FFFFFF",

              px: 2.5,
              py: 1.2,

              borderRadius: "4px",

              textTransform: "none",

              fontSize: "11px",
              fontWeight: 500,

              boxShadow: "none",

              "&:hover": {
                backgroundColor: "#16251F",
                boxShadow: "none",
              },

              "@media (max-width: 599px)": {
                px: 2.3,
                py: 1.1,
                fontSize: "10.5px",
              },
            }}
          >
            Analyze My Skin
          </Button>
        </Box>

        {/* =========================================
            RIGHT IMAGE AREA
        ========================================== */}

        <Box
          sx={{
            flex: 1,
            width: "100%",

            maxWidth: {
              xs: "100%",
              md: "620px",
            },

            height: {
              xs: "260px",
              sm: "300px",
              md: "320px",
            },

            position: "relative",

            borderRadius: "12px",

            overflow: "hidden",

            backgroundColor: "#E8E0D5",

            // =========================================
            // MINI LAPTOP
            // =========================================

            "@media (min-width: 900px) and (max-width: 1199px)": {
              height: "300px",
            },

            // =========================================
            // TABLET
            // =========================================

            "@media (min-width: 600px) and (max-width: 899px)": {
              height: "300px",
              maxWidth: "620px",
            },

            // =========================================
            // PHONE
            // =========================================

            "@media (max-width: 599px)": {
              height: "250px",
              borderRadius: "10px",
            },
          }}
        >
          {/* Before / After Image */}

          <Box
            component="img"
            src={skinBeforeAfter}
            alt="GlowCare before and after skincare results"
            sx={{
              width: "100%",
              height: "100%",

              objectFit: "cover",

              objectPosition: "center",

              display: "block",
            }}
          />

          {/* Slight overlay */}

          <Box
            sx={{
              position: "absolute",
              inset: 0,

              background:
                "linear-gradient(90deg, rgba(30,47,43,0.04), rgba(30,47,43,0))",

              pointerEvents: "none",
            }}
          />

          {/* =====================================
              CAMERA CARD
          ====================================== */}

          <Box
            onClick={handleAnalyzeSkin}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                handleAnalyzeSkin();
              }
            }}
            sx={{
              position: "absolute",

              left: {
                xs: "15px",
                sm: "20px",
                md: "25px",
              },

              bottom: {
                xs: "15px",
                md: "20px",
              },

              width: {
                xs: "105px",
                sm: "120px",
                md: "130px",
              },

              height: {
                xs: "105px",
                sm: "115px",
                md: "125px",
              },

              backgroundColor: "rgba(255,255,255,0.94)",

              borderRadius: "8px",

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",

              cursor: "pointer",

              boxShadow: "0 8px 25px rgba(30,47,43,0.12)",

              transition: "all 0.25s ease",

              "&:hover": {
                transform: "translateY(-3px)",
                backgroundColor: "#FFFFFF",
              },

              "@media (max-width: 599px)": {
                left: "12px",
                bottom: "12px",
                width: "92px",
                height: "92px",
                borderRadius: "7px",
              },
            }}
          >
            {/* Camera icon */}

            <IconButton
              sx={{
                width: 42,
                height: 42,

                backgroundColor: "#F5F1EA",

                color: "#1E2F2B",

                mb: 0.8,

                "&:hover": {
                  backgroundColor: "#E9E1D6",
                },

                "@media (max-width: 599px)": {
                  width: 36,
                  height: 36,
                  mb: 0.5,
                },
              }}
            >
              <CameraAltOutlinedIcon
                sx={{
                  fontSize: 20,

                  "@media (max-width: 599px)": {
                    fontSize: 17,
                  },
                }}
              />
            </IconButton>

            <Typography
              sx={{
                fontSize: "9px",
                fontWeight: 600,
                color: "#1E2F2B",

                "@media (max-width: 599px)": {
                  fontSize: "8px",
                },
              }}
            >
              Upload Photo
            </Typography>

            <Typography
              sx={{
                fontSize: "7px",
                color: "#88827A",
                mt: 0.3,

                "@media (max-width: 599px)": {
                  fontSize: "6px",
                },
              }}
            >
              Start analysis
            </Typography>
          </Box>

          {/* =====================================
              BEFORE LABEL
          ====================================== */}

          <Box
            sx={{
              position: "absolute",

              bottom: {
                xs: "15px",
                md: "20px",
              },

              left: "50%",

              transform: "translateX(-105%)",

              backgroundColor: "rgba(255,255,255,0.88)",

              px: 1.7,
              py: 0.6,

              borderRadius: "20px",

              "@media (max-width: 599px)": {
                bottom: "12px",
                px: 1.2,
                py: 0.45,
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "9px",
                fontWeight: 600,
                color: "#1E2F2B",

                "@media (max-width: 599px)": {
                  fontSize: "7px",
                },
              }}
            >
              Before
            </Typography>
          </Box>

          {/* =====================================
              AFTER LABEL
          ====================================== */}

          <Box
            sx={{
              position: "absolute",

              bottom: {
                xs: "15px",
                md: "20px",
              },

              left: "50%",

              transform: "translateX(10%)",

              backgroundColor: "rgba(255,255,255,0.88)",

              px: 1.7,
              py: 0.6,

              borderRadius: "20px",

              "@media (max-width: 599px)": {
                bottom: "12px",
                px: 1.2,
                py: 0.45,
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "9px",
                fontWeight: 600,
                color: "#1E2F2B",

                "@media (max-width: 599px)": {
                  fontSize: "7px",
                },
              }}
            >
              After
            </Typography>
          </Box>

          {/* =====================================
              CENTER DIVIDER
          ====================================== */}

          <Box
            sx={{
              position: "absolute",

              top: 0,
              bottom: 0,

              left: "50%",

              width: "1px",

              backgroundColor: "rgba(255,255,255,0.8)",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SkinAdvisorSection;