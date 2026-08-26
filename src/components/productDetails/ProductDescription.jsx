import {
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Rating,
  Stack,
  Typography,
  Avatar,
} from "@mui/material";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";

const ProductDescription = ({ product, activeTab }) => {
  // =====================================================
  // DATA
  // =====================================================

  const ingredients = Array.isArray(product?.keyIngredients)
    ? product.keyIngredients
    : (product?.keyIngredients || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

  const benefits = Array.isArray(product?.benefits)
    ? product.benefits
    : (product?.benefits || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

  const howToUse = Array.isArray(product?.howToUse)
    ? product.howToUse
    : (product?.howToUse || "")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

  // =====================================================
  // COMMON PAPER STYLE
  // =====================================================

  const paperSx = {
    p: {
      xs: 3,
      md: 5,
      lg: 6,
    },

    borderRadius: 4,

    border: "1px solid #ECE6DD",

    background:
      "linear-gradient(180deg, #FFFFFF 0%, #FCFAF7 100%)",

    boxShadow: "0 8px 30px rgba(30,47,43,0.04)",
  };

  // =====================================================
  // DESCRIPTION
  // =====================================================

  if (activeTab === 0) {
    return (
      <Paper elevation={0} sx={paperSx}>
        {/* Header */}

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            mb: 3.5,
          }}
        >
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              bgcolor: "#F7EFE8",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <AutoAwesomeRoundedIcon
              sx={{
                color: "#B89478",
                fontSize: 23,
              }}
            />
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 13,
                color: "#B89478",
                fontWeight: 700,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                mb: 0.5,
              }}
            >
              GlowCare
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: 22,
                  md: 26,
                },
                fontWeight: 650,
                color: "#1E2F2B",
              }}
            >
              Product Description
            </Typography>
          </Box>
        </Stack>

        <Divider
          sx={{
            mb: 4,
            borderColor: "#EEE7DF",
          }}
        />

        {/* Description */}

        <Box
          sx={{
            maxWidth: 1000,
          }}
        >
          <Typography
            sx={{
              color: "#626262",
              fontSize: {
                xs: 15,
                md: 16,
              },
              lineHeight: 2,
              letterSpacing: 0.1,
            }}
          >
            {product?.description || "No description available."}
          </Typography>
        </Box>

        {/* Small product info */}

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
          sx={{
            mt: 5,
          }}
        >
          <Box
            sx={{
              flex: 1,
              p: 2.5,
              borderRadius: 3,
              bgcolor: "#F9F5F0",
              border: "1px solid #EEE5DA",
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                color: "#999",
                mb: 0.7,
                textTransform: "uppercase",
                letterSpacing: 0.8,
              }}
            >
              Texture
            </Typography>

            <Typography
              sx={{
                fontWeight: 600,
                color: "#5A3B28",
              }}
            >
              {product?.texture || "-"}
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              p: 2.5,
              borderRadius: 3,
              bgcolor: "#F9F5F0",
              border: "1px solid #EEE5DA",
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                color: "#999",
                mb: 0.7,
                textTransform: "uppercase",
                letterSpacing: 0.8,
              }}
            >
              Fragrance
            </Typography>

            <Typography
              sx={{
                fontWeight: 600,
                color: "#5A3B28",
              }}
            >
              {product?.fragrance || "-"}
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              p: 2.5,
              borderRadius: 3,
              bgcolor: "#F9F5F0",
              border: "1px solid #EEE5DA",
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                color: "#999",
                mb: 0.7,
                textTransform: "uppercase",
                letterSpacing: 0.8,
              }}
            >
              pH Value
            </Typography>

            <Typography
              sx={{
                fontWeight: 600,
                color: "#5A3B28",
              }}
            >
              {product?.phValue || "-"}
            </Typography>
          </Box>
        </Stack>
      </Paper>
    );
  }

  // =====================================================
  // INGREDIENTS
  // =====================================================

  if (activeTab === 1) {
    return (
      <Paper elevation={0} sx={paperSx}>
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              fontSize: 13,
              color: "#B89478",
              fontWeight: 700,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            What's Inside
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: 24,
                md: 28,
              },
              fontWeight: 650,
              color: "#1E2F2B",
            }}
          >
            Key Ingredients
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#777",
              fontSize: 15,
              lineHeight: 1.7,
              maxWidth: 650,
            }}
          >
            Carefully selected ingredients designed to support your skin and
            enhance your daily skincare routine.
          </Typography>
        </Box>

        {ingredients.length > 0 ? (
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={2}
          >
            {ingredients.map((ingredient, index) => (
              <Box
                key={index}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "calc(50% - 8px)",
                    md: "calc(33.333% - 11px)",
                  },

                  minHeight: 100,

                  p: 2.5,

                  borderRadius: 3,

                  backgroundColor: "#FAF7F2",

                  border: "1px solid #EEE5DA",

                  display: "flex",
                  alignItems: "center",

                  transition: "all .25s ease",

                  "&:hover": {
                    transform: "translateY(-3px)",
                    borderColor: "#C9A987",
                    boxShadow:
                      "0 8px 20px rgba(184,148,120,.12)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    bgcolor: "#F0E5D8",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mr: 2,
                    flexShrink: 0,
                  }}
                >
                  <SpaRoundedIcon
                    sx={{
                      color: "#B89478",
                    }}
                  />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: "#3D3D3D",
                      fontSize: 15,
                    }}
                  >
                    {ingredient}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.4,
                      fontSize: 12,
                      color: "#999",
                    }}
                  >
                    Skin-loving ingredient
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <Typography color="text.secondary">
            No ingredient information available.
          </Typography>
        )}
      </Paper>
    );
  }

  // =====================================================
  // BENEFITS
  // =====================================================

  if (activeTab === 2) {
    return (
      <Paper elevation={0} sx={paperSx}>
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              fontSize: 13,
              color: "#B89478",
              fontWeight: 700,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            Why You'll Love It
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: 24,
                md: 28,
              },
              fontWeight: 650,
              color: "#1E2F2B",
            }}
          >
            Product Benefits
          </Typography>
        </Box>

        {benefits.length > 0 ? (
          <List disablePadding>
            {benefits.map((benefit, index) => (
              <ListItem
                key={index}
                disableGutters
                sx={{
                  py: 2.2,

                  borderBottom:
                    index !== benefits.length - 1
                      ? "1px solid #EEE8E1"
                      : "none",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 52,
                  }}
                >
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      bgcolor: "#F6EEE6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CheckCircleRoundedIcon
                      sx={{
                        color: "#B89478",
                        fontSize: 22,
                      }}
                    />
                  </Box>
                </ListItemIcon>

                <ListItemText
                  primary={benefit}
                  primaryTypographyProps={{
                    sx: {
                      fontSize: 16,
                      fontWeight: 500,
                      color: "#444",
                      lineHeight: 1.7,
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography color="text.secondary">
            No benefits information available.
          </Typography>
        )}
      </Paper>
    );
  }

  // =====================================================
  // HOW TO USE
  // =====================================================

  if (activeTab === 3) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: {
          xs: 3,
          md: 5,
        },
        borderRadius: 4,
        border: "1px solid #ECE6DD",
        backgroundColor: "#fff",
      }}
    >
      {/* Header */}

      <Box sx={{ mb: 5 }}>
        <Typography
          sx={{
            fontSize: 13,
            color: "#B89478",
            fontWeight: 700,
            letterSpacing: 1.2,
            textTransform: "uppercase",
          }}
        >
          Simple Routine
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: 24,
              md: 28,
            },
            fontWeight: 650,
            color: "#1E2F2B",
          }}
        >
          How To Use
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "#777",
            fontSize: 15,
            lineHeight: 1.7,
          }}
        >
          Follow these simple steps to get the best results from your
          skincare routine.
        </Typography>
      </Box>

      {/* Steps */}

      {howToUse.length > 0 ? (
        <Stack spacing={3}>
          {howToUse.map((step, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
                p: 2,

                borderRadius: 3,

                backgroundColor:
                  index % 2 === 0 ? "#FAF7F2" : "#FCFAF7",

                border: "1px solid #EEE5DA",

                transition: "all .25s ease",

                "&:hover": {
                  borderColor: "#C9A987",
                  transform: "translateY(-2px)",
                  boxShadow:
                    "0 8px 20px rgba(184,148,120,.10)",
                },
              }}
            >
              {/* Step Number */}

              <Box
                sx={{
                  width: 46,
                  height: 46,
                  minWidth: 46,

                  borderRadius: "50%",

                  backgroundColor: "#1E2F2B",
                  color: "#fff",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",

                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                {index + 1}
              </Box>

              {/* Step Content */}

              <Box
                sx={{
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 17,
                    fontWeight: 650,
                    color: "#1E2F2B",
                    mb: 0.2,
                  }}
                >
                  Step {index + 1}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 15.5,
                    color: "#666",
                    lineHeight: 1.8,
                    wordBreak: "break-word",
                  }}
                >
                  {step}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      ) : (
        <Box
          sx={{
            py: 5,
            textAlign: "center",
            backgroundColor: "#FAF7F2",
            borderRadius: 3,
          }}
        >
          <Typography color="text.secondary">
            No usage instructions available.
          </Typography>
        </Box>
      )}
    </Paper>
  );
}

  // =====================================================
  // REVIEWS
  // =====================================================

  if (activeTab === 4) {
    return (
      <Paper elevation={0} sx={paperSx}>
        {/* Header */}

        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          justifyContent="space-between"
          alignItems={{
            xs: "flex-start",
            md: "center",
          }}
          spacing={2}
          sx={{
            mb: 5,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 13,
                color: "#B89478",
                fontWeight: 700,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                mb: 1,
              }}
            >
              Customer Experience
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: 24,
                  md: 28,
                },
                fontWeight: 650,
                color: "#1E2F2B",
              }}
            >
              Customer Reviews
            </Typography>
          </Box>

          <Box
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: 3,
              bgcolor: "#FAF5EF",
              border: "1px solid #EEE5DA",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <StarRoundedIcon
                sx={{
                  color: "#C18A45",
                }}
              />

              <Typography
                sx={{
                  fontWeight: 700,
                  color: "#5A3B28",
                }}
              >
                5.0
              </Typography>

              <Typography
                sx={{
                  color: "#888",
                  fontSize: 13,
                }}
              >
                / 5
              </Typography>
            </Stack>
          </Box>
        </Stack>

        {/* Reviews */}

        {[1, 2, 3].map((review) => (
          <Box
            key={review}
            sx={{
              py: review === 1 ? 0 : 4,

              borderTop:
                review !== 1
                  ? "1px solid #EEE8E1"
                  : "none",
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="flex-start"
            >
              {/* Avatar */}

              <Avatar
                sx={{
                  width: 46,
                  height: 46,
                  bgcolor: "#EBDCCD",
                  color: "#7A5238",
                  fontWeight: 700,
                }}
              >
                C
              </Avatar>

              <Box
                sx={{
                  flex: 1,
                }}
              >
                <Stack
                  direction={{
                    xs: "column",
                    sm: "row",
                  }}
                  justifyContent="space-between"
                  alignItems={{
                    xs: "flex-start",
                    sm: "center",
                  }}
                  spacing={1}
                  mb={1}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 650,
                        color: "#333",
                      }}
                    >
                      Customer {review}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#999",
                        mt: 0.3,
                      }}
                    >
                      Verified Purchase
                    </Typography>
                  </Box>

                  <Rating
                    value={5}
                    readOnly
                    size="small"
                    sx={{
                      "& .MuiRating-iconFilled": {
                        color: "#C18A45",
                      },
                    }}
                  />
                </Stack>

                <Box
                  sx={{
                    position: "relative",
                    mt: 2,
                    pl: 3,
                  }}
                >
                  <FormatQuoteRoundedIcon
                    sx={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      color: "#DCC8B4",
                      fontSize: 22,
                    }}
                  />

                  <Typography
                    sx={{
                      color: "#666",
                      lineHeight: 1.8,
                      fontSize: 15,
                    }}
                  >
                    Amazing product. It feels gentle on the skin,
                    absorbs quickly, and leaves my skin hydrated
                    throughout the day. Definitely one of my
                    favorite GlowCare products.
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>
        ))}
      </Paper>
    );
  }

  // =====================================================
  // FALLBACK
  // =====================================================

  return (
    <Paper elevation={0} sx={paperSx}>
      <Typography color="text.secondary">
        No information available.
      </Typography>
    </Paper>
  );
};

export default ProductDescription;