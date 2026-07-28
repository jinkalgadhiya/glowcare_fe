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

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { useThemeContext } from "../context/ThemeContext";

const ViewProduct = ({ product, onClose, onEdit, onDelete }) => {
  const { darkMode } = useThemeContext();

  if (!product) return null;

  return (
    <Box
      sx={{
        width: 380,
        height: "100vh",
        p: 4,
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
          flex: 1,
          overflowY: "auto",
          p: 3,
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Avatar
            src={product.image}
            variant="rounded"
            sx={{
              width: 150,
              height: 150,
              borderRadius: 3,
            }}
          />

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: darkMode ? "#fff" : "#222",
            }}
          >
            {product.name}
          </Typography>

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
                {product.category}
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
                ₹{product.variants?.[0]?.price || 0}
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
                ₹{product.variants[0].discountPrice}
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
                {product.variants?.[0]?.stock || 0}
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
                {product.variants?.[0]?.sku || "-"}
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
                {product.description}
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
                {product.createdAt}
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              mt: 5,
            }}
          >
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 6,
                bgcolor: "#B89478",
                textTransform: "none",
                borderRadius: 2,
                boxShadow: "none",

                "&:hover": {
                  bgcolor: "#A88366",
                  boxShadow: "none",
                },
              }}
              onClick={onClose}
            >
              Back
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default ViewProduct;
