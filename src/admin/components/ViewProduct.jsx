import React from "react";
import {
  Box,
  Typography,
  Divider,
  Stack,
  Button,
  Chip,
  Avatar,
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { useThemeContext } from "../context/ThemeContext";

const ViewProduct = ({ product, onClose, onEdit, onDelete }) => {
  const { darkMode } = useThemeContext();

  if (!product) return null;

  /* ---------------- CATEGORY NAME ---------------- */

  const categoryName = product.category
    ? product.category.subCategory
      ? `${product.category.mainCategory} → ${product.category.subCategory}`
      : product.category.mainCategory || "-"
    : "-";

  /* ---------------- FIRST VARIANT ---------------- */

  const firstVariant = product.variants?.[0];

  return (
    <Box
      sx={{
        width: 380,
        height: "100vh",
        backgroundColor: darkMode ? "#252525" : "#fff",
        overflowY: "auto",
      }}
    >
      {/* Header */}

      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid",
          borderColor: darkMode ? "#444" : "#eee",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Product Details
        </Typography>

        <Button
          onClick={onClose}
          sx={{
            minWidth: 40,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          <CloseOutlinedIcon />
        </Button>
      </Box>

      {/* Content */}

      <Box
        sx={{
          p: 3,
        }}
      >
        <Stack spacing={3} alignItems="center">
          {/* Product Image */}

          <Avatar
            src={product.image}
            variant="rounded"
            sx={{
              width: 150,
              height: 150,
              borderRadius: 3,
            }}
          />

          {/* Product Name */}

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: darkMode ? "#fff" : "#222",
              textAlign: "center",
            }}
          >
            {product.productName}
          </Typography>

          {/* Badge */}

          {product.badge && product.badge !== "None" && (
            <Chip
              label={product.badge}
              size="small"
              sx={{
                fontWeight: 600,
              }}
            />
          )}

          {/* Status */}

          <Chip
            label={product.status}
            color={product.status === "Active" ? "success" : "default"}
          />

          <Divider
            sx={{
              width: "100%",
            }}
          />

          <Stack
            spacing={3}
            sx={{
              width: "100%",
            }}
          >
            {/* Category */}

            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  color: darkMode ? "#AFAFAF" : "#777",
                }}
              >
                Category
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  fontWeight: 600,
                  color: darkMode ? "#fff" : "#222",
                }}
              >
                {categoryName}
              </Typography>
            </Box>

            {/* Price */}

            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  color: darkMode ? "#AFAFAF" : "#777",
                }}
              >
                Price
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  fontWeight: 600,
                  color: "#2E7D32",
                }}
              >
                ₹{firstVariant?.price || 0}
              </Typography>
            </Box>

            {/* Discount Price */}

            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  color: darkMode ? "#AFAFAF" : "#777",
                }}
              >
                Discount Price
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  fontWeight: 600,
                  color: "#E67E22",
                }}
              >
                ₹{firstVariant?.discountPrice || 0}
              </Typography>
            </Box>

            {/* Stock */}

            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  color: darkMode ? "#AFAFAF" : "#777",
                }}
              >
                Stock
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  fontWeight: 600,
                  color: darkMode ? "#fff" : "#222",
                }}
              >
                {firstVariant?.stock || 0}
              </Typography>
            </Box>

            {/* SKU */}

            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  color: darkMode ? "#AFAFAF" : "#777",
                }}
              >
                SKU
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  fontWeight: 600,
                  color: darkMode ? "#fff" : "#222",
                }}
              >
                {firstVariant?.sku || "-"}
              </Typography>
            </Box>

            {/* Description */}

            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  color: darkMode ? "#AFAFAF" : "#777",
                }}
              >
                Description
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  lineHeight: 1.8,
                  color: darkMode ? "#fff" : "#222",
                }}
              >
                {product.description || "-"}
              </Typography>
            </Box>

            {/* Key Ingredients */}

            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  color: darkMode ? "#AFAFAF" : "#777",
                }}
              >
                Key Ingredients
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  lineHeight: 1.8,
                  color: darkMode ? "#fff" : "#222",
                }}
              >
                {product.keyIngredients || "-"}
              </Typography>
            </Box>

            {/* Texture */}

            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  color: darkMode ? "#AFAFAF" : "#777",
                }}
              >
                Texture
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  fontWeight: 600,
                  color: darkMode ? "#fff" : "#222",
                }}
              >
                {product.texture || "-"}
              </Typography>
            </Box>

            {/* Fragrance */}

            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  color: darkMode ? "#AFAFAF" : "#777",
                }}
              >
                Fragrance
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  fontWeight: 600,
                  color: darkMode ? "#fff" : "#222",
                }}
              >
                {product.fragrance || "-"}
              </Typography>
            </Box>

            {/* pH */}

            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  color: darkMode ? "#AFAFAF" : "#777",
                }}
              >
                pH Value
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  fontWeight: 600,
                  color: darkMode ? "#fff" : "#222",
                }}
              >
                {product.phValue || "-"}
              </Typography>
            </Box>

            {/* Shelf Life */}

            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  color: darkMode ? "#AFAFAF" : "#777",
                }}
              >
                Shelf Life
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  fontWeight: 600,
                  color: darkMode ? "#fff" : "#222",
                }}
              >
                {product.shelfLife || "-"}
              </Typography>
            </Box>

            {/* Suitable For */}

            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  color: darkMode ? "#AFAFAF" : "#777",
                }}
              >
                Suitable For
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
                sx={{ mt: 1 }}
              >
                {product.suitableFor?.length ? (
                  product.suitableFor.map((item) => (
                    <Chip key={item} label={item} size="small" />
                  ))
                ) : (
                  <Typography>-</Typography>
                )}
              </Stack>
            </Box>

            {/* Skin Concerns */}

            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  color: darkMode ? "#AFAFAF" : "#777",
                }}
              >
                Skin Concerns
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
                sx={{ mt: 1 }}
              >
                {product.skinConcerns?.length ? (
                  product.skinConcerns.map((item) => (
                    <Chip key={item} label={item} size="small" />
                  ))
                ) : (
                  <Typography>-</Typography>
                )}
              </Stack>
            </Box>

            {/* Benefits */}

            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  color: darkMode ? "#AFAFAF" : "#777",
                }}
              >
                Benefits
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
                sx={{ mt: 1 }}
              >
                {product.benefits?.length ? (
                  product.benefits.map((item) => (
                    <Chip key={item} label={item} size="small" />
                  ))
                ) : (
                  <Typography>-</Typography>
                )}
              </Stack>
            </Box>

            {/* Caution */}

            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  color: darkMode ? "#AFAFAF" : "#777",
                }}
              >
                Caution
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  lineHeight: 1.8,
                  color: darkMode ? "#fff" : "#222",
                }}
              >
                {product.caution || "-"}
              </Typography>
            </Box>

            {/* Created At */}

            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  color: darkMode ? "#AFAFAF" : "#777",
                }}
              >
                Created At
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  color: darkMode ? "#fff" : "#222",
                }}
              >
                {product.createdAt
                  ? new Date(product.createdAt).toLocaleString()
                  : "-"}
              </Typography>
            </Box>
          </Stack>

          {/* Actions */}

          <Stack
            direction="row"
            spacing={2}
            sx={{
              mt: 3,
              width: "100%",
            }}
          >
            <Button
              fullWidth
              variant="outlined"
              onClick={onEdit}
              startIcon={<EditOutlinedIcon />}
              sx={{
                height: 44,
                borderColor: "#B89478",
                color: "#B89478",
                textTransform: "none",
                borderRadius: 2,

                "&:hover": {
                  borderColor: "#A88366",
                  backgroundColor: "rgba(184,148,120,.08)",
                },
              }}
            >
              Edit
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={onDelete}
              startIcon={<DeleteOutlineOutlinedIcon />}
              sx={{
                height: 44,
                borderColor: "#E53935",
                color: "#E53935",
                textTransform: "none",
                borderRadius: 2,

                "&:hover": {
                  borderColor: "#C62828",
                  backgroundColor: "rgba(229,57,53,.08)",
                },
              }}
            >
              Delete
            </Button>
          </Stack>

          <Button
            fullWidth
            variant="contained"
            onClick={onClose}
            sx={{
              height: 44,
              bgcolor: "#B89478",
              textTransform: "none",
              borderRadius: 2,
              boxShadow: "none",

              "&:hover": {
                bgcolor: "#A88366",
                boxShadow: "none",
              },
            }}
          >
            Back
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ViewProduct;
