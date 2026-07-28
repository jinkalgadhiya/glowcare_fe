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
  Avatar,
} from "@mui/material";

import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { deleteProduct } from "../../database/productService";
import { useThemeContext } from "../context/ThemeContext";

const DeleteProduct = ({ open, onClose, product }) => {
  const { darkMode } = useThemeContext();

  if (!product) return null;

  const handleDelete = async () => {
    await deleteProduct(product.id);

    onClose();

    window.location.reload();
  };

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
        <WarningAmberRoundedIcon color="error" fontSize="large" />
        Delete Product
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ mt: 2 }}>
        <Typography
          sx={{
            fontSize: 16,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Are you sure you want to delete this product?
        </Typography>

        <Typography
          sx={{
            mt: 1,
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
            backgroundColor: darkMode ? "#303030" : "#F7F5F2",
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={product.image}
              variant="rounded"
              sx={{
                width: 70,
                height: 70,
              }}
            />

            <Box>
              <Typography fontWeight={600}>{product.name}</Typography>

              <Typography variant="body2" color="text.secondary">
                {product.category}
              </Typography>

              <Typography variant="body2" color="success.main">
                ₹ {product.price}
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
            minWidth: 150,
            textTransform: "none",
            borderRadius: 2,
            boxShadow: "none",

            "&:hover": {
              boxShadow: "none",
            },
          }}
        >
          Delete Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProduct;
