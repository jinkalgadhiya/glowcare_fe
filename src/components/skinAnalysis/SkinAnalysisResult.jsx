import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Chip,
} from "@mui/material";

const SkinAnalysisResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const image = location.state?.image;

  // Backend response:
  // {
  //   success: true,
  //   message: "...",
  //   analysis: {
  //      skinType,
  //      oiliness,
  //      ...
  //   }
  // }

  const analysis = location.state?.analysis?.analysis;

  // ---------------------------------------------------
  // If user directly opens /skin-analysis/result
  // ---------------------------------------------------

  if (!image || !analysis) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#F9F6F1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            maxWidth: 500,
            width: "100%",
            p: 5,
            textAlign: "center",
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "#3F3A35",
              mb: 2,
            }}
          >
            No Analysis Found
          </Typography>

          <Typography
            sx={{
              color: "#777",
              mb: 3,
            }}
          >
            Please upload a photo to start your skin analysis.
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate("/skin-analysis")}
            sx={{
              backgroundColor: "#6B705C",
              borderRadius: 3,
              px: 4,
              py: 1.4,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#5A5F4D",
              },
            }}
          >
            Start Skin Analysis
          </Button>
        </Paper>
      </Box>
    );
  }

  // ---------------------------------------------------
  // Analysis characteristics
  // ---------------------------------------------------

  const skinCharacteristics = [
    {
      label: "Skin Type",
      value: analysis.skinType,
    },
    {
      label: "Oiliness",
      value: analysis.oiliness,
    },
    {
      label: "Dryness",
      value: analysis.dryness,
    },
    {
      label: "Texture",
      value: analysis.texture,
    },
    {
      label: "Visible Pores",
      value: analysis.visiblePores,
    },
    {
      label: "Redness",
      value: analysis.redness,
    },
    {
      label: "Dark Spots",
      value: analysis.darkSpots,
    },
    {
      label: "Acne Appearance",
      value: analysis.acneAppearance,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F9F6F1",
        py: {
          xs: 4,
          md: 7,
        },
      }}
    >
      <Container maxWidth="lg">

        {/* =================================================
            HEADER
        ================================================= */}

        <Box
          sx={{
            textAlign: "center",
            mb: 6,
          }}
        >
          <Typography
            sx={{
              color: "#8A8178",
              fontSize: 14,
              letterSpacing: 2,
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            GlowCare Skin Advisor
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              color: "#3F3A35",
              mb: 1.5,
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
            }}
          >
            Your Skin Analysis
          </Typography>

          <Typography
            sx={{
              color: "#777",
              maxWidth: 650,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            Here's a cosmetic overview of the visible characteristics
            in your photo.
          </Typography>
        </Box>

        {/* =================================================
            PHOTO + SUMMARY
        ================================================= */}

        <Grid
          container
          spacing={4}
          sx={{
            mb: 5,
          }}
        >
          {/* IMAGE */}

          <Grid size={{ xs: 12, md: 5 }}>
            <Paper
              elevation={0}
              sx={{
                overflow: "hidden",
                borderRadius: 4,
                backgroundColor: "#FFFFFF",
              }}
            >
              <Box
                component="img"
                src={image}
                alt="Skin analysis"
                sx={{
                  width: "100%",
                  height: {
                    xs: 380,
                    md: 500,
                  },
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Paper>
          </Grid>

          {/* SUMMARY */}

          <Grid size={{ xs: 12, md: 7 }}>
            <Paper
              elevation={0}
              sx={{
                height: "100%",
                p: {
                  xs: 3,
                  md: 5,
                },
                borderRadius: 4,
                backgroundColor: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#8A8178",
                  fontSize: 14,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  mb: 1,
                }}
              >
                Your Skin Profile
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  color: "#3F3A35",
                  fontWeight: 600,
                  mb: 3,
                }}
              >
                {analysis.skinType}
              </Typography>

              <Typography
                sx={{
                  color: "#666",
                  lineHeight: 1.8,
                  fontSize: 16,
                  mb: 3,
                }}
              >
                {analysis.summary}
              </Typography>

              {/* SKINCARE FOCUS */}

              {analysis.skincareFocus?.length > 0 && (
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: "#3F3A35",
                      mb: 1.5,
                    }}
                  >
                    Skincare Focus
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    {analysis.skincareFocus.map(
                      (focus, index) => (
                        <Chip
                          key={index}
                          label={focus}
                          sx={{
                            backgroundColor: "#ECE9E1",
                            color: "#55554C",
                            fontWeight: 500,
                          }}
                        />
                      )
                    )}
                  </Box>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* =================================================
            SKIN CHARACTERISTICS
        ================================================= */}

        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 3,
              md: 5,
            },
            borderRadius: 4,
            backgroundColor: "#FFFFFF",
            mb: 5,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "#3F3A35",
              mb: 4,
            }}
          >
            Visible Skin Characteristics
          </Typography>

          <Grid
            container
            spacing={2}
          >
            {skinCharacteristics.map(
              (item, index) => (
                <Grid
                  size={{
                    xs: 12,
                    sm: 6,
                    md: 3,
                  }}
                  key={index}
                >
                  <Box
                    sx={{
                      backgroundColor: "#F9F6F1",
                      borderRadius: 3,
                      p: 2.5,
                      height: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#8A8178",
                        fontSize: 13,
                        mb: 1,
                      }}
                    >
                      {item.label}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#3F3A35",
                        fontWeight: 600,
                        fontSize: 16,
                      }}
                    >
                      {item.value || "Not clearly visible"}
                    </Typography>
                  </Box>
                </Grid>
              )
            )}
          </Grid>
        </Paper>

        {/* =================================================
            SKIN TONE
        ================================================= */}

        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 3,
              md: 4,
            },
            borderRadius: 4,
            backgroundColor: "#FFFFFF",
            mb: 5,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#3F3A35",
              mb: 1,
            }}
          >
            Visible Skin Tone
          </Typography>

          <Typography
            sx={{
              color: "#666",
            }}
          >
            {analysis.skinTone || "Not clearly visible"}
          </Typography>
        </Paper>

        {/* =================================================
            PRODUCT RECOMMENDATION PLACEHOLDER
        ================================================= */}

        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 3,
              md: 5,
            },
            borderRadius: 4,
            backgroundColor: "#EFECE5",
            mb: 5,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "#3F3A35",
              mb: 1.5,
            }}
          >
            Personalized GlowCare Recommendations
          </Typography>

          <Typography
            sx={{
              color: "#777",
              maxWidth: 600,
              mx: "auto",
            }}
          >
            We're going to match your skin profile with
            GlowCare products that fit your skincare needs.
          </Typography>
        </Paper>

        {/* =================================================
            BUTTONS
        ================================================= */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate("/skin-analysis")}
            sx={{
              backgroundColor: "#6B705C",
              borderRadius: 3,
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontSize: 15,
              "&:hover": {
                backgroundColor: "#5A5F4D",
              },
            }}
          >
            Analyze Another Photo
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/")}
            sx={{
              borderColor: "#6B705C",
              color: "#6B705C",
              borderRadius: 3,
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontSize: 15,
              "&:hover": {
                borderColor: "#5A5F4D",
                backgroundColor: "#F5F2EC",
              },
            }}
          >
            Back to Home
          </Button>
        </Box>

      </Container>
    </Box>
  );
};

export default SkinAnalysisResult;