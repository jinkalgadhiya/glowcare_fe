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
          const { id, updatedAt, ...homePageSettings } =
            savedSettings;

          const mergedSettings =
            mergeHomePageSettings(
              homePageSettings,
            );

          setHeroSlides(
            mergedSettings.hero.slides || [],
          );
        } else {
          const defaults =
            getDefaultHomePageSettings();

          setHeroSlides(
            defaults.hero.slides || [],
          );
        }
      } catch (error) {
        console.error(
          "Error loading hero settings:",
          error,
        );

        const defaults =
          getDefaultHomePageSettings();

        setHeroSlides(
          defaults.hero.slides || [],
        );
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
      setCurrentImage(
        (prev) =>
          (prev + 1) %
          heroSlides.length,
      );
    }, 4000);

    return () =>
      clearInterval(interval);
  }, [heroSlides]);

  // =====================================================
  // NEXT SLIDE
  // =====================================================

  const nextSlide = () => {
    setCurrentImage(
      (prev) =>
        (prev + 1) %
        heroSlides.length,
    );
  };

  // =====================================================
  // PREVIOUS SLIDE
  // =====================================================

  const prevSlide = () => {
    setCurrentImage((prev) =>
      prev === 0
        ? heroSlides.length - 1
        : prev - 1,
    );
  };

  // =====================================================
  // NO SLIDES
  // =====================================================

  if (!heroSlides.length) return null;

  const currentSlide =
    heroSlides[currentImage];

  // =====================================================
  // CONTENT POSITION
  // =====================================================

  const getContentPosition = () => {
    switch (
      currentSlide.contentPosition
    ) {
      case "left":
        return {
          left: "8%",
          textAlign: "left",
        };

      case "right":
        return {
          right: "8%",
          textAlign: "right",
        };

      default:
        return {
          left: "50%",
          transform:
            "translate(-50%, -50%)",
          textAlign: "center",
        };
    }
  };

  // =====================================================
  // CHECK IF BUTTON TEXT EXISTS
  // =====================================================

  const hasButton =
    currentSlide?.buttonLabel &&
    String(
      currentSlide.buttonLabel,
    ).trim() !== "";

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <Box
      sx={{
        width: "100%",
        height: "95vh",
        backgroundImage: `url(${currentSlide.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {/* Overlay */}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor:
            "rgba(0,0,0,0.15)",
        }}
      />

      {/* Dynamic Content */}

      <Box
        sx={{
          position: "absolute",
          top: "45%",
          color: "white",
          maxWidth: "600px",
          zIndex: 2,
          ...getContentPosition(),
        }}
      >
        {/* TITLE */}

        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            mb: 2,
            whiteSpace: "pre-line",
          }}
        >
          {currentSlide.title}
        </Typography>

        {/* SUBTITLE */}

        <Typography
          sx={{
            mb: hasButton ? 4 : 0,
            fontSize: {
              xs: "16px",
              md: "20px",
            },
            opacity: 0.9,
            whiteSpace: "pre-line",
          }}
        >
          {currentSlide.subtitle}
        </Typography>

        {/* BUTTON
            ONLY SHOW IF BUTTON LABEL EXISTS */}

        {hasButton && (
          <Button
            variant="contained"
            onClick={() =>
              navigate(
                currentSlide.buttonLink ||
                  "/shop",
              )
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
                backgroundColor:
                  "#f5f5f5",
              },
            }}
          >
            {currentSlide.buttonLabel}
          </Button>
        )}
      </Box>

      {/* Left Arrow */}

      <IconButton
        onClick={prevSlide}
        sx={{
          position: "absolute",
          left: 20,
          top: "50%",
          transform:
            "translateY(-50%)",
          color: "white",
          zIndex: 2,
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>

      {/* Right Arrow */}

      <IconButton
        onClick={nextSlide}
        sx={{
          position: "absolute",
          right: 20,
          top: "50%",
          transform:
            "translateY(-50%)",
          color: "white",
          zIndex: 2,
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {/* Dots */}

      <Box
        sx={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform:
            "translateX(-50%)",
          display: "flex",
          gap: 1,
          zIndex: 2,
        }}
      >
        {heroSlides.map(
          (_, index) => (
            <Box
              key={index}
              onClick={() =>
                setCurrentImage(index)
              }
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                cursor: "pointer",
                bgcolor:
                  currentImage === index
                    ? "white"
                    : "rgba(255,255,255,.5)",
              }}
            />
          ),
        )}
      </Box>

      {/* Scroll Indicator */}

      <Box
        sx={{
          position: "absolute",
          bottom: 70,
          left: "50%",
          transform:
            "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
          opacity: 0.8,
          zIndex: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            letterSpacing: "3px",
            mb: 0.5,
          }}
        >
          SCROLL
        </Typography>

        <KeyboardArrowDownIcon
          sx={{
            fontSize: 28,
            animation:
              "bounce 1.5s infinite",
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