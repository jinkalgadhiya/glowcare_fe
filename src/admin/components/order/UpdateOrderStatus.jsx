import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Chip,
  Box,
} from "@mui/material";

import { updateOrderStatus } from "../../../database/orderService";
import { useThemeContext } from "../../context/ThemeContext";

const UpdateOrderStatus = ({
  open,
  onClose,
  order,
  onStatusUpdated,
}) => {
  const { darkMode } = useThemeContext();

  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (order) {
      setStatus(order.status || "Pending");
    }
  }, [order]);

  const getOrderId = () => {
    return order?._id || order?.id;
  };

  const getPaymentStatus = () => {
    return (
      order?.paymentStatus ||
      order?.payment?.status ||
      "Pending"
    );
  };

  const handleSave = async () => {
    if (!order) return;

    const orderId = getOrderId();

    if (!orderId) {
      console.error("Order ID is missing");
      return;
    }

    try {
      setSaving(true);

      const updatedOrder = await updateOrderStatus(
        orderId,
        status,
        getPaymentStatus(),
      );

      onStatusUpdated?.(updatedOrder);

      onClose();
    } catch (error) {
      console.error("Failed to update order status:", error);
    } finally {
      setSaving(false);
    }
  };

  const getStatusColor = (value) => {
    switch (value?.toLowerCase()) {
      case "pending":
        return "warning";

      case "processing":
        return "info";

      case "shipped":
        return "secondary";

      case "delivered":
        return "success";

      case "cancelled":
        return "error";

      default:
        return "default";
    }
  };

  return (
    <Dialog
      open={open}
      onClose={saving ? undefined : onClose}
      fullWidth
      maxWidth="xs"
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: darkMode
            ? "#252525 !important"
            : "#fff",
          color: darkMode ? "#fff" : "#222",
          borderRadius: 3,
        },
      }}
      PaperProps={{
        sx: {
          p: 1,
        },
      }}
    >
      {/* Header */}

      <DialogTitle sx={{ pb: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Update Order Status
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 0.5,
            color: darkMode ? "#AFAFAF" : "#777",
          }}
        >
          Change the current status of this order.
        </Typography>
      </DialogTitle>

      {/* Content */}

      <DialogContent sx={{ pt: "12px !important" }}>
        <Stack spacing={3}>
          {/* Current Status */}

          <Box>
            <Typography
              sx={{
                mb: 1,
                fontSize: 13,
                color: darkMode ? "#AFAFAF" : "#777",
              }}
            >
              Current Status
            </Typography>

            <Chip
              label={order?.status || "Pending"}
              color={getStatusColor(order?.status)}
            />
          </Box>

          {/* New Status */}

          <FormControl
            fullWidth
            size="small"
            sx={{
              "& .MuiInputLabel-root": {
                color: darkMode ? "#AFAFAF" : "#777",
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: "#B89478",
              },

              "& .MuiOutlinedInput-root": {
                color: darkMode ? "#fff" : "#222",

                "& fieldset": {
                  borderColor: darkMode ? "#555" : "#ccc",
                },

                "&:hover fieldset": {
                  borderColor: "#B89478",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#B89478",
                },
              },

              "& .MuiSvgIcon-root": {
                color: darkMode ? "#fff" : "#222",
              },
            }}
          >
            <InputLabel>New Status</InputLabel>

            <Select
              value={status}
              label="New Status"
              onChange={(e) => setStatus(e.target.value)}
              disabled={saving}
            >
              <MenuItem value="Pending">
                Pending
              </MenuItem>

              <MenuItem value="Processing">
                Processing
              </MenuItem>

              <MenuItem value="Shipped">
                Shipped
              </MenuItem>

              <MenuItem value="Delivered">
                Delivered
              </MenuItem>

              <MenuItem value="Cancelled">
                Cancelled
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>

      {/* Actions */}

      <DialogActions
        sx={{
          px: 3,
          pb: 2,
          pt: 1,
          justifyContent: "flex-end",
          gap: 1,
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={saving}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            borderColor: "#B89478",
            color: "#B89478",

            "&:hover": {
              borderColor: "#A88366",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saving || !status}
          sx={{
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
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateOrderStatus;