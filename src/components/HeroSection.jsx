import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { getHomePageSettings } from "../database/homePageService";

import {
  getDefaultHomePageSettings,
  mergeHomePageSettings,
} from "../data/homePageDefaults";

const HeroSection = () => {
  const navigate = useNavigate();

  const [currentImage, setCurrentImage] = useState(0);
  const [heroSlides, setHeroSlides] = useState([]);

  // =====================================================
  // LOAD HERO SETTINGS
  // =====================================================

  useEffect(() => {
    const loadHeroSettings = async () => {
      try {
        const savedSettings = await getHomePageSettings();

        if (savedSettings) {
          const { id, updatedAt, ...homePageSettings } = savedSettings;

          const mergedSettings = mergeHomePageSettings(homePageSettings);

          setHeroSlides(mergedSettings.hero.slides || []);
        } else {
          const defaults = getDefaultHomePageSettings();

          setHeroSlides(defaults.hero.slides || []);
        }
      } catch (error) {
        console.error("Error loading hero settings:", error);

        const defaults = getDefaultHomePageSettings();

        setHeroSlides(defaults.hero.slides || []);
      }
    };

    loadHeroSettings();
  }, []);

  // =====================================================
  // AUTO SLIDE
  // =====================================================

  useEffect(() => {
    if (!heroSlides.length) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroSlides]);

  // =====================================================
  // NEXT SLIDE
  // =====================================================

  const nextSlide = () => {
    setCurrentImage((prev) => (prev + 1) % heroSlides.length);
  };

  // =====================================================
  // PREVIOUS SLIDE
  // =====================================================

  const prevSlide = () => {
    setCurrentImage((prev) =>
      prev === 0 ? heroSlides.length - 1 : prev - 1,
    );
  };

  // =====================================================
  // NO SLIDES
  // =====================================================

  if (!heroSlides.length) return null;

  const currentSlide = heroSlides[currentImage];

  // =====================================================
  // CONTENT POSITION
  // =====================================================

  const getContentPosition = () => {
    switch (currentSlide.contentPosition) {
      case "left":
        return {
          left: "8%",
          textAlign: "left",

          // =============================================
          // MINI LAPTOP
          // =============================================

          "@media (max-width: 1199px)": {
            left: "6%",
          },

          // =============================================
          // TABLET
          // =============================================

          "@media (max-width: 899px)": {
            left: "7%",
            maxWidth: "520px",
          },

          // =============================================
          // PHONE
          // =============================================

          "@media (max-width: 599px)": {
            left: "8%",
            right: "8%",
            maxWidth: "none",
            textAlign: "left",
          },
        };

      case "right":
        return {
          right: "8%",
          textAlign: "right",

          // =============================================
          // MINI LAPTOP
          // =============================================

          "@media (max-width: 1199px)": {
            right: "6%",
          },

          // =============================================
          // TABLET
          // =============================================

          "@media (max-width: 899px)": {
            right: "7%",
            maxWidth: "520px",
          },

          // =============================================
          // PHONE
          // =============================================

          "@media (max-width: 599px)": {
            left: "8%",
            right: "8%",
            maxWidth: "none",
            textAlign: "right",
          },
        };

      default:
        return {
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",

          // =============================================
          // PHONE
          // =============================================

          "@media (max-width: 599px)": {
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "84%",
            maxWidth: "none",
            textAlign: "center",
          },
        };
    }
  };

  // =====================================================
  // CHECK IF BUTTON TEXT EXISTS
  // =====================================================

  const hasButton =
    currentSlide?.buttonLabel &&
    String(currentSlide.buttonLabel).trim() !== "";

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <Box
      sx={{
        width: "100%",

        // ORIGINAL DESKTOP HEIGHT
        height: "95vh",

        backgroundImage: `url(${currentSlide.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        position: "relative",

        // ===============================================
        // MINI LAPTOP
        // ===============================================

        "@media (max-width: 1199px)": {
          height: "90vh",
        },

        // ===============================================
        // TABLET
        // ===============================================

        "@media (max-width: 899px)": {
          height: "80vh",
          minHeight: "520px",
        },

        // ===============================================
        // PHONE
        // ===============================================

        "@media (max-width: 599px)": {
          height: "78vh",
          minHeight: "520px",
        },
      }}
    >
      {/* =================================================
          OVERLAY
      ================================================= */}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.15)",
        }}
      />

      {/* =================================================
          DYNAMIC CONTENT
      ================================================= */}

      <Box
        sx={{
          position: "absolute",

          // ORIGINAL DESKTOP
          top: "45%",

          color: "white",

          maxWidth: "600px",

          zIndex: 2,

          ...getContentPosition(),

          // =============================================
          // MINI LAPTOP
          // =============================================

          "@media (max-width: 1199px)": {
            maxWidth: "560px",
          },

          // =============================================
          // TABLET
          // =============================================

          "@media (max-width: 899px)": {
            top: "45%",
            maxWidth: "520px",
          },

          // =============================================
          // PHONE
          // =============================================

          "@media (max-width: 599px)": {
            top: "45%",
            maxWidth: "none",
            width: "84%",
          },
        }}
      >
        {/* =================================================
            TITLE
        ================================================= */}

        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            mb: 2,
            whiteSpace: "pre-line",

            // ORIGINAL DESKTOP
            fontSize: undefined,

            // =============================================
            // MINI LAPTOP
            // =============================================

            "@media (max-width: 1199px)": {
              fontSize: "3.5rem",
            },

            // =============================================
            // TABLET
            // =============================================

            "@media (max-width: 899px)": {
              fontSize: "3rem",
              lineHeight: 1.1,
            },

            // =============================================
            // PHONE
            // =============================================

            "@media (max-width: 599px)": {
              fontSize: "2.2rem",
              lineHeight: 1.15,
              mb: 1.5,
            },
          }}
        >
          {currentSlide.title}
        </Typography>

        {/* =================================================
            SUBTITLE
        ================================================= */}

        <Typography
          sx={{
            mb: hasButton ? 4 : 0,

            fontSize: {
              xs: "16px",
              md: "20px",
            },

            opacity: 0.9,

            whiteSpace: "pre-line",

            // =============================================
            // MINI LAPTOP
            // =============================================

            "@media (max-width: 1199px)": {
              fontSize: "19px",
            },

            // =============================================
            // TABLET
            // =============================================

            "@media (max-width: 899px)": {
              fontSize: "17px",
              lineHeight: 1.5,
            },

            // =============================================
            // PHONE
            // =============================================

            "@media (max-width: 599px)": {
              fontSize: "15px",
              lineHeight: 1.45,
              mb: hasButton ? 3 : 0,
            },
          }}
        >
          {currentSlide.subtitle}
        </Typography>

        {/* =================================================
            BUTTON
            ONLY SHOW IF BUTTON LABEL EXISTS
        ================================================= */}

        {hasButton && (
          <Button
            variant="contained"
            onClick={() =>
              navigate(currentSlide.buttonLink || "/shop")
            }
            sx={{
              backgroundColor: "white",
              color: "black",
              borderRadius: "30px",
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              boxShadow: 3,

              "&:hover": {
                backgroundColor: "#f5f5f5",
              },

              // ===========================================
              // TABLET
              // ===========================================

              "@media (max-width: 899px)": {
                px: 3.5,
                py: 1.3,
                fontSize: "13px",
              },

              // ===========================================
              // PHONE
              // ===========================================

              "@media (max-width: 599px)": {
                px: 3,
                py: 1.2,
                fontSize: "12px",
              },
            }}
          >
            {currentSlide.buttonLabel}
          </Button>
        )}
      </Box>

      {/* =================================================
          LEFT ARROW
      ================================================= */}

      <IconButton
        onClick={prevSlide}
        sx={{
          position: "absolute",

          // ORIGINAL DESKTOP
          left: 20,

          top: "50%",

          transform: "translateY(-50%)",

          color: "white",

          zIndex: 2,

          // =============================================
          // TABLET
          // =============================================

          "@media (max-width: 899px)": {
            left: 12,
          },

          // =============================================
          // PHONE
          // =============================================

          "@media (max-width: 599px)": {
            left: 6,
            p: 0.8,
          },
        }}
      >
        <ArrowBackIosNewIcon
          sx={{
            "@media (max-width: 899px)": {
              fontSize: 24,
            },

            "@media (max-width: 599px)": {
              fontSize: 20,
            },
          }}
        />
      </IconButton>

      {/* =================================================
          RIGHT ARROW
      ================================================= */}

      <IconButton
        onClick={nextSlide}
        sx={{
          position: "absolute",

          // ORIGINAL DESKTOP
          right: 20,

          top: "50%",

          transform: "translateY(-50%)",

          color: "white",

          zIndex: 2,

          // =============================================
          // TABLET
          // =============================================

          "@media (max-width: 899px)": {
            right: 12,
          },

          // =============================================
          // PHONE
          // =============================================

          "@media (max-width: 599px)": {
            right: 6,
            p: 0.8,
          },
        }}
      >
        <ArrowForwardIosIcon
          sx={{
            "@media (max-width: 899px)": {
              fontSize: 24,
            },

            "@media (max-width: 599px)": {
              fontSize: 20,
            },
          }}
        />
      </IconButton>

      {/* =================================================
          DOTS
      ================================================= */}

      <Box
        sx={{
          position: "absolute",

          // ORIGINAL DESKTOP
          bottom: 30,

          left: "50%",

          transform: "translateX(-50%)",

          display: "flex",

          gap: 1,

          zIndex: 2,

          // =============================================
          // PHONE
          // =============================================

          "@media (max-width: 599px)": {
            bottom: 25,
            gap: 0.8,
          },
        }}
      >
        {heroSlides.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentImage(index)}
            sx={{
              width: 10,
              height: 10,

              borderRadius: "50%",

              cursor: "pointer",

              bgcolor:
                currentImage === index
                  ? "white"
                  : "rgba(255,255,255,.5)",

              "@media (max-width: 599px)": {
                width: 8,
                height: 8,
              },
            }}
          />
        ))}
      </Box>

      {/* =================================================
          SCROLL INDICATOR
      ================================================= */}

      <Box
        sx={{
          position: "absolute",

          // ORIGINAL DESKTOP
          bottom: 70,

          left: "50%",

          transform: "translateX(-50%)",

          display: "flex",

          flexDirection: "column",

          alignItems: "center",

          color: "white",

          opacity: 0.8,

          zIndex: 2,

          // =============================================
          // TABLET
          // =============================================

          "@media (max-width: 899px)": {
            bottom: 60,
          },

          // =============================================
          // PHONE
          // =============================================

          "@media (max-width: 599px)": {
            bottom: 55,
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",

            letterSpacing: "3px",

            mb: 0.5,

            "@media (max-width: 599px)": {
              fontSize: "10px",
              letterSpacing: "2px",
            },
          }}
        >
          SCROLL
        </Typography>

        <KeyboardArrowDownIcon
          sx={{
            fontSize: 28,

            animation: "bounce 1.5s infinite",

            "@media (max-width: 599px)": {
              fontSize: 24,
            },
          }}
        />

        <style>
          {`
            @keyframes bounce {
              0%, 100% {
                transform: translateY(0);
              }

              50% {
                transform: translateY(8px);
              }
            }
          `}
        </style>
      </Box>
    </Box>
  );
};

export default HeroSection;