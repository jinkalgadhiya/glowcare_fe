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
} from "@mui/material";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const ProductDescription = ({ product, activeTab }) => {
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
      .filter(Boolean);

  if (activeTab === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 5,
          borderRadius: 4,
          border: "1px solid #ECE6DD",
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={3} color="#1E2F2B">
          Product Description
        </Typography>

        <Typography
          sx={{
            lineHeight: 2,
            color: "#666",
            fontSize: 16,
          }}
        >
          {product.description}
        </Typography>
      </Paper>
    );
  }

  if (activeTab === 1) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 5,
          borderRadius: 4,
          border: "1px solid #ECE6DD",
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={4} color="#1E2F2B">
          Key Ingredients
        </Typography>

        <Stack direction="row" flexWrap="wrap" gap={2}>
          {ingredients.map((ingredient, index) => (
            <Chip
              key={index}
              icon={<SpaRoundedIcon />}
              label={ingredient}
              sx={{
                px: 1,
                py: 3,

                bgcolor: "#F8F4EE",

                color: "#1E2F2B",

                fontWeight: 600,

                borderRadius: 3,

                "& .MuiChip-icon": {
                  color: "#B89478",
                },
              }}
            />
          ))}
        </Stack>
      </Paper>
    );
  }

  if (activeTab === 2) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 5,
          borderRadius: 4,
          border: "1px solid #ECE6DD",
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={4} color="#1E2F2B">
          Product Benefits
        </Typography>

        <List disablePadding>
          {benefits.map((benefit, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{
                mb: 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                }}
              >
                <CheckCircleRoundedIcon
                  sx={{
                    color: "#B89478",
                  }}
                />
              </ListItemIcon>

              <ListItemText primary={benefit} />
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }
  if (activeTab === 3) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 5,
          borderRadius: 4,
          border: "1px solid #ECE6DD",
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={4} color="#1E2F2B">
          How To Use
        </Typography>

        <Stack spacing={3}>
          {howToUse.map((step, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  bgcolor: "#1E2F2B",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {index + 1}
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: 17,
                    color: "#444",
                    lineHeight: 1.8,
                  }}
                >
                  {step}
                </Typography>

                {index !== howToUse.length - 1 && (
                  <Divider
                    sx={{
                      mt: 3,
                    }}
                  />
                )}
              </Box>
            </Box>
          ))}
        </Stack>
      </Paper>
    );
  }

  if (activeTab === 4) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 5,
          borderRadius: 4,
          border: "1px solid #ECE6DD",
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={4} color="#1E2F2B">
          Customer Reviews
        </Typography>

        {[1, 2, 3].map((review) => (
          <Box
            key={review}
            sx={{
              mb: 4,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography fontWeight={600}>Customer {review}</Typography>

              <Rating value={5} readOnly size="small" />
            </Stack>

            <Typography
              sx={{
                color: "#666",
                lineHeight: 1.8,
              }}
            >
              Amazing product. It feels gentle on the skin, absorbs quickly, and
              leaves my skin hydrated throughout the day. Definitely one of my
              favorite GlowCare products.
            </Typography>

            {review !== 3 && (
              <Divider
                sx={{
                  mt: 3,
                }}
              />
            )}
          </Box>
        ))}
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 5,
        borderRadius: 4,
        border: "1px solid #ECE6DD",
      }}
    >
      <Typography>No information available.</Typography>
    </Paper>
  );
};

export default ProductDescription;
