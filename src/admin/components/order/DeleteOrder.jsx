import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
} from "@mui/material";

import { useThemeContext } from "../../context/ThemeContext";
import api from "../../../api/axios";

const DeleteOrder = ({ open, onClose, order, onDelete }) => {
  const { darkMode } = useThemeContext();

  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!order) return;

    const orderId = order._id || order.id;

    if (!orderId) {
      console.error("Order ID not found");
      return;
    }

    try {
      setDeleting(true);

      // Delete order from MongoDB
      await api.delete(`/orders/${orderId}`);

      // Remove order from Admin UI
      onDelete?.(orderId);

      onClose();
    } catch (error) {
      console.error("Delete order error:", error);

      console.error(
        error.response?.data?.message ||
          "Failed to delete order"
      );
    } finally {
      setDeleting(false);
    }
  };

  const orderId = order?._id || order?.id;

  return (
    <Dialog
      open={open}
      onClose={deleting ? undefined : onClose}
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
      {/* ================= HEADER ================= */}

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

      {/* ================= CONTENT ================= */}

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
          {/* Order ID */}

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
              wordBreak: "break-all",
            }}
          >
            {orderId || "N/A"}
          </Typography>

          {/* Customer */}

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
            {order?.customer?.fullName || "N/A"}
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

      {/* ================= ACTIONS ================= */}

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
          disabled={deleting}
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
          disabled={deleting}
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
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteOrder;