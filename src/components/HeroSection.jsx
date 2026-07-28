import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import Banner1 from "../assets/Banner-1.webp";
import Banner2 from "../assets/Banner-2.webp";
import Banner3 from "../assets/Banner-3.webp";

const images = [Banner1, Banner2, Banner3];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "95vh",
        backgroundImage: `url(${images[currentImage]})`,
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
          backgroundColor: "rgba(0,0,0,0.15)",
        }}
      />

      {/* Shop Now Button */}
      {currentImage === 0 && (
        <Box
          sx={{
            position: "absolute",
            right: "10%",
            top: "45%",
            transform: "translateY(-50%)",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              mb: 2,
            }}
          >
            Calm
          </Typography>

          <Typography
            sx={{
              mb: 4,
              fontSize: "24px",
              fontStyle: "italic",
              opacity: 0.9,
            }}
          >
            your skin's new normal
          </Typography>

          <Button
            variant="contained"
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
            }}
          >
            Shop Now
          </Button>
        </Box>
      )}
      {currentImage === 2 && (
        <Box
          sx={{
            position: "absolute",
            left: "8%",
            top: "45%",
            transform: "translateY(-50%)",
            color: "white",
          }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              mb: 2,
            }}
          >
            Luxury
            <br />
            Fragrances
          </Typography>

          <Typography
            sx={{
              mb: 4,
              fontSize: "18px",
              opacity: 0.9,
            }}
          >
            Discover scents that leave
            <br />a lasting impression.
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "black",
              borderRadius: "30px",
              px: 4,
              py: 1.5,
              fontWeight: "bold",

              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            Explore Collection
          </Button>
        </Box>
      )}

      {/* Left Arrow */}
      <IconButton
        onClick={prevSlide}
        sx={{
          position: "absolute",
          left: 20,
          top: "50%",
          transform: "translateY(-50%)",
          color: "white",
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
          transform: "translateY(-50%)",
          color: "white",
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
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1,
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor:
                currentImage === index ? "white" : "rgba(255,255,255,.5)",
            }}
          />
        ))}
      </Box>

      {/* Scroll Indicator */}
      <Box
        sx={{
          position: "absolute",
          bottom: 70,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
          opacity: 0.8,
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
            animation: "bounce 1.5s infinite",
          }}
        />

        <style>
          {`
      @keyframes bounce {
        0%,100% {
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
