import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
} from "@mui/material";

import { deleteOrder } from "../../database/orderService";
import { useThemeContext } from "../context/ThemeContext";

const DeleteOrder = ({ open, onClose, order, onDelete }) => {
  const { darkMode } = useThemeContext();

  const handleDelete = async () => {
    if (!order) return;

    await deleteOrder(order.id);

    onDelete?.(order.id);

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: darkMode ? "#252525" : "#fff",
          color: darkMode ? "#fff" : "#222",
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Delete Order
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 0.5,
            color: darkMode ? "#AFAFAF" : "#777",
          }}
        >
          This action cannot be undone.
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: "12px !important" }}>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: darkMode ? "#303030" : "#F8F8F8",
            border: "1px solid",
            borderColor: darkMode ? "#444" : "#E5E5E5",
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              color: darkMode ? "#AFAFAF" : "#777",
            }}
          >
            Order ID
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontWeight: 600,
              color: darkMode ? "#fff" : "#222",
            }}
          >
            {order?.id}
          </Typography>

          <Typography
            sx={{
              mt: 2,
              fontSize: 13,
              color: darkMode ? "#AFAFAF" : "#777",
            }}
          >
            Customer
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontWeight: 600,
              color: darkMode ? "#fff" : "#222",
            }}
          >
            {order?.customer?.fullName}
          </Typography>
        </Box>

        <Typography
          sx={{
            mt: 3,
            color: darkMode ? "#ddd" : "#666",
            lineHeight: 1.7,
          }}
        >
          Are you sure you want to permanently delete this order?
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 2,
          pt: 1,
          gap: 1,
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            borderColor: "#B89478",
            color: "#B89478",

            "&:hover": {
              borderColor: "#A88366",
              backgroundColor: "transparent",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleDelete}
          sx={{
            bgcolor: "#D32F2F",
            textTransform: "none",
            borderRadius: 2,
            boxShadow: "none",

            "&:hover": {
              bgcolor: "#B71C1C",
              boxShadow: "none",
            },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteOrder;
