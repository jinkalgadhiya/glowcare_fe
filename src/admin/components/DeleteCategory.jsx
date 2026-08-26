import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Divider,
  Stack,
  Box,
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import { deleteCategory } from "../../database/categoryService";
import { useThemeContext } from "../context/ThemeContext";

const DeleteCategory = ({ open, onClose, category, setCategories }) => {
  const { darkMode } = useThemeContext();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!category || isDeleting) return;

    try {
      setIsDeleting(true);

      // Pass the complete category object for cascade deletion
      await deleteCategory(category._id);

      setCategories((prev) => prev.filter((item) => item._id !== category._id));

      onClose();
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!category) return null;

  return (
    <Dialog
      open={open}
      onClose={isDeleting ? undefined : onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: darkMode ? "#252525" : "#FFFFFF",
          color: darkMode ? "#FFFFFF" : "#222",

          "& .MuiDialog-paper": {
            backgroundColor: darkMode ? "#252525" : "#FFFFFF",
          },

          "& .MuiDialogContent-root": {
            backgroundColor: darkMode ? "#252525" : "#FFFFFF",
          },

          "& .MuiDialogActions-root": {
            backgroundColor: darkMode ? "#252525" : "#FFFFFF",
          },

          "& .MuiDialog-container": {
            backgroundColor: "transparent",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          color: "#D32F2F",
          fontWeight: 700,
          backgroundColor: darkMode ? "#252525" : "#FFFFFF",
        }}
      >
        <WarningAmberRoundedIcon sx={{ fontSize: 34 }} />
        Delete Category
      </DialogTitle>

      <Divider
        sx={{
          borderColor: darkMode ? "#3A3A3A" : "#E7DDD2",
        }}
      />

      <DialogContent
        sx={{
          backgroundColor: darkMode ? "#252525" : "#FFFFFF",

          "&::-webkit-scrollbar": {
            width: "8px",
          },

          "&::-webkit-scrollbar-track": {
            background: darkMode ? "#252525" : "#F5F5F5",
          },

          "&::-webkit-scrollbar-thumb": {
            background: darkMode ? "#555" : "#CFCFCF",
            borderRadius: "10px",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            color: darkMode ? "#FFFFFF" : "#222",
          }}
        >
          Are you sure you want to delete this category?
        </Typography>

        <Typography
          sx={{
            mt: 2,
            color: darkMode ? "#BDBDBD" : "#777",
          }}
        >
          This action will also delete all related subcategories and products.
          It cannot be undone.
        </Typography>

        <Box
          sx={{
            mt: 4,
            p: 2,
            borderRadius: 2,
            backgroundColor: darkMode ? "#1E1E1E" : "#F7F5F2",
            border: "1px solid",
            borderColor: darkMode ? "#3A3A3A" : "#E7DDD2",
            maxHeight: "400px",
            overflowY: "auto",

            "&::-webkit-scrollbar": {
              width: "8px",
            },

            "&::-webkit-scrollbar-thumb": {
              backgroundColor: darkMode ? "#555" : "#CFCFCF",
              borderRadius: "10px",
            },
          }}
        >
          <Stack spacing={2}>
            <Box>
              <Typography
                fontSize={13}
                sx={{ color: darkMode ? "#AFAFAF" : "#777" }}
              >
                Menu Type
              </Typography>

              <Typography
                fontWeight={600}
                sx={{ color: darkMode ? "#FFFFFF" : "#222" }}
              >
                {category.menuType}
              </Typography>
            </Box>

            <Box>
              <Typography
                fontSize={13}
                sx={{ color: darkMode ? "#AFAFAF" : "#777" }}
              >
                Main Category
              </Typography>

              <Typography
                fontWeight={600}
                sx={{ color: darkMode ? "#FFFFFF" : "#222" }}
              >
                {category.mainCategory}
              </Typography>
            </Box>

            <Box>
              <Typography
                fontSize={13}
                sx={{ color: darkMode ? "#AFAFAF" : "#777" }}
              >
                Sub Category
              </Typography>

              <Typography
                fontWeight={600}
                sx={{ color: darkMode ? "#FFFFFF" : "#222" }}
              >
                {category.subCategory || "-"}
              </Typography>
            </Box>

            <Box>
              <Typography
                fontSize={13}
                sx={{ color: darkMode ? "#AFAFAF" : "#777" }}
              >
                Subtitle
              </Typography>

              <Typography sx={{ color: darkMode ? "#FFFFFF" : "#222" }}>
                {category.subtitle || "-"}
              </Typography>
            </Box>

            {category.bannerImage && (
              <Box>
                <Typography
                  fontSize={13}
                  sx={{
                    mb: 1,
                    color: darkMode ? "#AFAFAF" : "#777",
                  }}
                >
                  Banner Image
                </Typography>

                <Box
                  component="img"
                  src={category.bannerImage}
                  alt={category.subCategory || category.mainCategory}
                  sx={{
                    width: "100%",
                    height: 120,
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
              </Box>
            )}

            <Box>
              <Typography
                fontSize={13}
                sx={{ color: darkMode ? "#AFAFAF" : "#777" }}
              >
                Status
              </Typography>

              <Typography
                fontWeight={600}
                sx={{
                  color: category.status === "Active" ? "#4CAF50" : "#E53935",
                }}
              >
                {category.status}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </DialogContent>

      <Divider
        sx={{
          borderColor: darkMode ? "#3A3A3A" : "#E7DDD2",
        }}
      />

      <DialogActions
        sx={{
          p: 3,
          justifyContent: "flex-end",
          gap: 2,
          backgroundColor: darkMode ? "#252525" : "#FFFFFF",
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={isDeleting}
          sx={{
            minWidth: 120,
            textTransform: "none",
            borderRadius: 2,
            color: "#B89478",
            borderColor: "#B89478",

            "&:hover": {
              borderColor: "#A88366",
              backgroundColor: darkMode
                ? "rgba(184,148,120,.12)"
                : "rgba(184,148,120,.08)",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          disabled={isDeleting}
          sx={{
            minWidth: 140,
            textTransform: "none",
            borderRadius: 2,
            boxShadow: "none",

            "&:hover": {
              boxShadow: "none",
            },
          }}
        >
          {isDeleting ? "Deleting..." : "Delete Category"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCategory;
