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
        py: {
          xs: 7,
          sm: 8,
          md: 12,
        },
        px: {
          xs: 2,
          sm: 4,
          md: 8,
        },
        overflow: "hidden",
      }}
    >
      <Grid
        container
        spacing={{
          xs: 5,
          sm: 6,
          md: 8,
        }}
        alignItems="center"
      >
        {/* =====================================================
            LEFT SIDE
        ====================================================== */}

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            ml: {
              xs: 0,
              sm: 0,
              md: "100px",
            },
            width: {
              xs: "100%",
              md: "auto",
            },
          }}
        >
          {/* Eyebrow */}

          <Typography
            sx={{
              fontSize: {
                xs: 10,
                sm: 11,
                md: 12,
              },
              letterSpacing: {
                xs: 2.5,
                sm: 3,
                md: 4,
              },
              color: "#B89478",
              textTransform: "uppercase",
              mb: {
                xs: 1.5,
                md: 2,
              },
            }}
          >
            {newsletter.eyebrow}
          </Typography>

          {/* Title */}

          <Typography
            sx={{
              fontSize: {
                xs: 34,
                sm: 42,
                md: 58,
              },
              fontWeight: 500,
              color: "#1E2F2B",
              lineHeight: {
                xs: 1.15,
                md: 1.1,
              },
              mb: {
                xs: 2,
                sm: 2.5,
                md: 3,
              },
              whiteSpace: "pre-line",
            }}
          >
            {newsletter.title}
          </Typography>

          {/* Description */}

          <Typography
            sx={{
              color: "#6D6D6D",
              fontSize: {
                xs: 14,
                sm: 15,
                md: 16,
              },
              lineHeight: {
                xs: 1.7,
                md: 1.9,
              },
              maxWidth: 520,
              mb: {
                xs: 3,
                sm: 4,
                md: 5,
              },
            }}
          >
            {newsletter.description}
          </Typography>

          {/* Newsletter Form */}

          <Box
            sx={{
              display: "flex",
              gap: {
                xs: 1.5,
                sm: 2,
              },
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              width: "100%",
              maxWidth: 650,
            }}
          >
            <TextField
              fullWidth
              placeholder={newsletter.placeholder}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: {
                    xs: 52,
                    sm: 56,
                    md: 58,
                  },
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

                "& .MuiInputBase-input": {
                  fontSize: {
                    xs: 14,
                    sm: 15,
                    md: 16,
                  },
                },
              }}
            />

            <Button
              variant="contained"
              sx={{
                minWidth: {
                  xs: "100%",
                  sm: 150,
                  md: 170,
                },
                height: {
                  xs: 52,
                  sm: 56,
                  md: 58,
                },
                borderRadius: "50px",
                backgroundColor: "#1E2F2B",
                textTransform: "none",
                fontSize: {
                  xs: 14,
                  sm: 15,
                  md: 16,
                },
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

          {/* Note */}

          <Typography
            sx={{
              mt: {
                xs: 2,
                md: 3,
              },
              color: "#7C7C7C",
              fontSize: {
                xs: 12,
                sm: 13,
                md: 14,
              },
              lineHeight: 1.6,
            }}
          >
            {newsletter.note}
          </Typography>
        </Grid>

        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            ml: {
              xs: 0,
              sm: 0,
              md: "70px",
            },

            mt: {
              xs: 1,
              sm: 2,
              md: 0,
            },
          }}
        >
          <Box
            sx={{
              position: "relative",

              width: {
                xs: 290,
                sm: 380,
                md: 500,
              },

              height: {
                xs: 290,
                sm: 380,
                md: 500,
              },

              maxWidth: "100%",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Main Glow */}

            <Box
              sx={{
                position: "absolute",

                width: {
                  xs: 230,
                  sm: 310,
                  md: 420,
                },

                height: {
                  xs: 230,
                  sm: 310,
                  md: 420,
                },

                borderRadius: "50%",

                background:
                  "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(248,245,241,0) 75%)",

                filter: {
                  xs: "blur(14px)",
                  md: "blur(20px)",
                },
              }}
            />

            {/* Inner Circle */}

            <Box
              sx={{
                position: "absolute",

                width: {
                  xs: 205,
                  sm: 275,
                  md: 360,
                },

                height: {
                  xs: 205,
                  sm: 275,
                  md: 360,
                },

                border: "1px solid rgba(184,148,120,.25)",
                borderRadius: "50%",
              }}
            />

            {/* Outer Circle */}

            <Box
              sx={{
                position: "absolute",

                width: {
                  xs: 255,
                  sm: 335,
                  md: 450,
                },

                height: {
                  xs: 255,
                  sm: 335,
                  md: 450,
                },

                border: "1px solid rgba(184,148,120,.12)",
                borderRadius: "50%",
              }}
            />

            {/* Product Image */}

            <Box
              component="img"
              src={newsletter.image}
              alt="Newsletter"
              sx={{
                width: {
                  xs: 185,
                  sm: 245,
                  md: 320,
                },

                maxWidth: "80%",

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

            {/* Decorative Dot 1 */}

            <Box
              sx={{
                position: "absolute",
                top: "18%",
                left: "15%",

                width: {
                  xs: 7,
                  sm: 9,
                  md: 10,
                },

                height: {
                  xs: 7,
                  sm: 9,
                  md: 10,
                },

                borderRadius: "50%",
                background: "#D7B48D",
                opacity: 0.7,
              }}
            />

            {/* Decorative Dot 2 */}

            <Box
              sx={{
                position: "absolute",
                bottom: "22%",
                right: "12%",

                width: {
                  xs: 6,
                  sm: 7,
                  md: 8,
                },

                height: {
                  xs: 6,
                  sm: 7,
                  md: 8,
                },

                borderRadius: "50%",
                background: "#D7B48D",
                opacity: 0.5,
              }}
            />

            {/* Decorative Dot 3 */}

            <Box
              sx={{
                position: "absolute",
                top: "28%",
                right: "18%",

                width: {
                  xs: 10,
                  sm: 12,
                  md: 14,
                },

                height: {
                  xs: 10,
                  sm: 12,
                  md: 14,
                },

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