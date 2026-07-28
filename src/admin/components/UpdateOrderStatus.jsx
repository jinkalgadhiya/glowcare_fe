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

import { updateOrder } from "../../database/orderService";
import { useThemeContext } from "../context/ThemeContext";

const UpdateOrderStatus = ({ open, onClose, order, onStatusUpdated }) => {
  const { darkMode } = useThemeContext();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (order) {
      setStatus(order.status || "");
    }
  }, [order]);

  const handleSave = async () => {
    if (!order) return;

    const updatedOrder = {
      ...order,
      status,
    };

    await updateOrder(updatedOrder);

    onStatusUpdated?.(updatedOrder);

    onClose();
  };

  const getStatusColor = (value) => {
    switch (value) {
      case "Pending":
        return "warning";
      case "Processing":
        return "info";
      case "Shipped":
        return "secondary";
      case "Delivered":
        return "success";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: darkMode ? "#252525 !important" : "#fff",
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
      <DialogTitle
        sx={{
          pb: 1,
        }}
      >
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

      <DialogContent sx={{ pt: "12px !important" }}>
        <Stack spacing={3}>
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

            <Chip label={order?.status} color={getStatusColor(order?.status)} />
          </Box>

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
              displayEmpty
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Processing">Processing</MenuItem>
              <MenuItem value="Shipped">Shipped</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>

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
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateOrderStatus;
