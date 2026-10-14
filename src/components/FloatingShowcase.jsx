import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
} from "@mui/material";

import {
  getHomePageSettings,
} from "../database/homePageService";

import {
  getDefaultHomePageSettings,
  mergeHomePageSettings,
} from "../data/homePageDefaults";

import "../styles/FloatingShowcase.css";

const FloatingShowcase = () => {
  const [floatingShowcase, setFloatingShowcase] = useState(
    getDefaultHomePageSettings().floatingShowcase
  );

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await getHomePageSettings();

        if (savedSettings) {
          const mergedSettings =
            mergeHomePageSettings(savedSettings);

          setFloatingShowcase(
            mergedSettings.floatingShowcase
          );
        }
      } catch (error) {
        console.error(
          "Error loading Floating Showcase settings:",
          error
        );
      }
    };

    loadSettings();
  }, []);

  return (
    <Box className="bloom-section">
      {/* Background Glow */}
      <Box className="background-glow" />

      {/* Center Content */}
      <Box className="center-content">
        <Typography className="small-title">
          {floatingShowcase.eyebrow}
        </Typography>

        <Typography className="main-title">
          {floatingShowcase.title}
        </Typography>

        <Typography className="description">
          {floatingShowcase.description}
        </Typography>

        <Button
          variant="contained"
          className="explore-btn"
        >
          {floatingShowcase.buttonLabel}
        </Button>
      </Box>

      {/* Floating Products */}
      {floatingShowcase.items?.map((item, index) => (
        <Box
          key={item.id}
          className={`product-card product-card-${index + 1}`}
          sx={{
            top: item.top || "auto",
            bottom: item.bottom || "auto",
            left: item.left || "auto",
            right: item.right || "auto",
            transform: `rotate(${item.rotate || "0deg"})`,
          }}
        >
          <Box
            component="img"
            src={item.image}
            alt={item.name}
            className="product-image"
          />

          <Typography className="product-name">
            {item.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default FloatingShowcase;