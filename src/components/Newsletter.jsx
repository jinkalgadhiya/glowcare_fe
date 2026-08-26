import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";

import { getHomePageSettings } from "../database/homePageService";
import {
  getDefaultHomePageSettings,
  mergeHomePageSettings,
} from "../data/homePageDefaults";

const Newsletter = () => {
  const [newsletter, setNewsletter] = useState(
    getDefaultHomePageSettings().newsletter
  );

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await getHomePageSettings();

        if (savedSettings) {
          const mergedSettings =
            mergeHomePageSettings(savedSettings);

          setNewsletter(mergedSettings.newsletter);
        }
      } catch (error) {
        console.error(
          "Error loading newsletter settings:",
          error
        );
      }
    };

    loadSettings();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#fff",
        py: { xs: 8, md: 12 },
        px: { xs: 3, md: 8 },
      }}
    >
      <Grid container spacing={8} alignItems="center">
        {/* Left Side */}

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            ml: "100px",
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              letterSpacing: 4,
              color: "#B89478",
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            {newsletter.eyebrow}
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: 40,
                md: 58,
              },
              fontWeight: 500,
              color: "#1E2F2B",
              lineHeight: 1.1,
              mb: 3,
              whiteSpace: "pre-line",
            }}
          >
            {newsletter.title}
          </Typography>

          <Typography
            sx={{
              color: "#6D6D6D",
              fontSize: 16,
              lineHeight: 1.9,
              maxWidth: 520,
              mb: 5,
            }}
          >
            {newsletter.description}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: {
                xs: "wrap",
                sm: "nowrap",
              },
            }}
          >
            <TextField
              fullWidth
              placeholder={newsletter.placeholder}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: 58,
                  borderRadius: "50px",
                  background: "#fff",

                  "& fieldset": {
                    borderColor: "#E3DDD6",
                  },

                  "&:hover fieldset": {
                    borderColor: "#B89478",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "#B89478",
                  },
                },
              }}
            />

            <Button
              variant="contained"
              sx={{
                minWidth: 170,
                height: 58,
                borderRadius: "50px",
                backgroundColor: "#1E2F2B",
                textTransform: "none",
                fontSize: 16,
                boxShadow: "none",

                "&:hover": {
                  backgroundColor: "#16231F",
                  boxShadow: "none",
                },
              }}
            >
              {newsletter.buttonLabel}
            </Button>
          </Box>

          <Typography
            sx={{
              mt: 3,
              color: "#7C7C7C",
              fontSize: 14,
            }}
          >
            {newsletter.note}
          </Typography>
        </Grid>

        {/* Right Side */}

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            ml: "70px",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: { xs: 320, md: 500 },
              height: { xs: 320, md: 500 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: { xs: 260, md: 420 },
                height: { xs: 260, md: 420 },
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(248,245,241,0) 75%)",
                filter: "blur(20px)",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                width: { xs: 230, md: 360 },
                height: { xs: 230, md: 360 },
                border: "1px solid rgba(184,148,120,.25)",
                borderRadius: "50%",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                width: { xs: 290, md: 450 },
                height: { xs: 290, md: 450 },
                border: "1px solid rgba(184,148,120,.12)",
                borderRadius: "50%",
              }}
            />

            <Box
              component="img"
              src={newsletter.image}
              alt="Newsletter"
              sx={{
                width: {
                  xs: 220,
                  md: 320,
                },

                position: "relative",
                zIndex: 2,

                filter:
                  "drop-shadow(0 30px 40px rgba(0,0,0,.15))",

                transition: ".5s",

                animation:
                  "floatingBottle 5s ease-in-out infinite",

                "&:hover": {
                  transform: "scale(1.05)",
                },

                "@keyframes floatingBottle": {
                  "0%": {
                    transform: "translateY(0px)",
                  },

                  "50%": {
                    transform: "translateY(-18px)",
                  },

                  "100%": {
                    transform: "translateY(0px)",
                  },
                },
              }}
            />

            <Box
              sx={{
                position: "absolute",
                top: "18%",
                left: "15%",
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#D7B48D",
                opacity: 0.7,
              }}
            />

            <Box
              sx={{
                position: "absolute",
                bottom: "22%",
                right: "12%",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#D7B48D",
                opacity: 0.5,
              }}
            />

            <Box
              sx={{
                position: "absolute",
                top: "28%",
                right: "18%",
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#EFE4D5",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Newsletter;