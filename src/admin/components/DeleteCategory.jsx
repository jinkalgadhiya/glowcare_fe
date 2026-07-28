import React from "react";
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

const DeleteCategory = ({
  open,
  onClose,
  category,
  setCategories,
}) => {
  const { darkMode } = useThemeContext();

  const handleDelete = async () => {
  await deleteCategory(category.id);

  setCategories((prev) =>
    prev.filter((item) => item.id !== category.id)
  );

  onClose();
};

  if (!category) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: darkMode ? "#252525" : "#fff",
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
        }}
      >
        <WarningAmberRoundedIcon
          color="error"
          fontSize="large"
        />

        Delete Category
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ mt: 2 }}>
        <Typography
          sx={{
            fontSize: 16,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Are you sure you want to delete this
          category?
        </Typography>

        <Typography
          sx={{
            mt: 2,
            color: darkMode ? "#BDBDBD" : "#777",
          }}
        >
          This action cannot be undone.
        </Typography>

        <Box
          sx={{
            mt: 4,
            p: 2,
            borderRadius: 2,
            backgroundColor: darkMode
              ? "#303030"
              : "#F7F5F2",
          }}
        >
          <Stack spacing={2}>
            <Box>
              <Typography
                fontSize={13}
                color="text.secondary"
              >
                Category Name
              </Typography>

              <Typography fontWeight={600}>
                {category.name}
              </Typography>
            </Box>

            <Box>
              <Typography
                fontSize={13}
                color="text.secondary"
              >
                Description
              </Typography>

              <Typography>
                {category.description}
              </Typography>
            </Box>
                        <Box>
              <Typography
                fontSize={13}
                color="text.secondary"
              >
                Status
              </Typography>

              <Typography fontWeight={600}>
                {category.status}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions
        sx={{
          p: 3,
          justifyContent: "flex-end",
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            minWidth: 120,
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          sx={{
            minWidth: 140,
            textTransform: "none",
            borderRadius: 2,
            boxShadow: "none",
          }}
        >
          Delete Category
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCategory;