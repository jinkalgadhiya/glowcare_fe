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
import { deleteReturnRequest } from "../../../database/returnService";

const DeleteReturn = ({
  open,
  onClose,
  returnRequest,
  onDelete,
}) => {
  const { darkMode } = useThemeContext();

  const [deleting, setDeleting] = useState(false);

  // =====================================================
  // DELETE RETURN
  // =====================================================

  const handleDelete = async () => {
    if (!returnRequest) return;

    const returnId =
      returnRequest._id ||
      returnRequest.id;

    if (!returnId) {
      console.error("Return ID not found");
      return;
    }

    try {
      setDeleting(true);

      // Delete return from MongoDB
      await deleteReturnRequest(returnId);

      // Remove return from Admin UI
      onDelete?.(returnId);

      onClose();
    } catch (error) {
      console.error(
        "Delete return error:",
        error,
      );

      console.error(
        error.response?.data?.message ||
          "Failed to delete return request",
      );
    } finally {
      setDeleting(false);
    }
  };

  // =====================================================
  // RETURN ID
  // =====================================================

  const returnId =
    returnRequest?._id ||
    returnRequest?.id;

  // =====================================================
  // PRODUCT NAME
  // =====================================================

  const productName =
    returnRequest?.productName ||
    "N/A";

  // =====================================================
  // CUSTOMER NAME
  // =====================================================

  const customerName =
    returnRequest?.customerName ||
    returnRequest?.customer?.fullName ||
    "N/A";

  return (
    <Dialog
      open={open}
      onClose={deleting ? undefined : onClose}
      fullWidth
      maxWidth="xs"
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: darkMode
            ? "#252525"
            : "#FFFFFF",

          color: darkMode
            ? "#FFFFFF"
            : "#222",

          borderRadius: 3,
        },
      }}
    >
      {/* ===============================================
          HEADER
      =============================================== */}

      <DialogTitle
        sx={{
          pb: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: darkMode
              ? "#FFFFFF"
              : "#222",
          }}
        >
          Delete Return Request
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 0.5,
            color: darkMode
              ? "#AFAFAF"
              : "#777",
          }}
        >
          This action cannot be undone.
        </Typography>
      </DialogTitle>

      {/* ===============================================
          CONTENT
      =============================================== */}

      <DialogContent
        sx={{
          pt: "12px !important",
        }}
      >
        <Box
          sx={{
            p: 2,

            borderRadius: 2,

            backgroundColor: darkMode
              ? "#303030"
              : "#F8F8F8",

            border: "1px solid",

            borderColor: darkMode
              ? "#444"
              : "#E5E5E5",
          }}
        >
          {/* RETURN ID */}

          <Typography
            sx={{
              fontSize: 13,

              color: darkMode
                ? "#AFAFAF"
                : "#777",
            }}
          >
            Return ID
          </Typography>

          <Typography
            sx={{
              mt: 0.5,

              fontWeight: 600,

              color: darkMode
                ? "#FFFFFF"
                : "#222",

              wordBreak: "break-all",
            }}
          >
            {returnId || "N/A"}
          </Typography>

          {/* PRODUCT */}

          <Typography
            sx={{
              mt: 2,

              fontSize: 13,

              color: darkMode
                ? "#AFAFAF"
                : "#777",
            }}
          >
            Product
          </Typography>

          <Typography
            sx={{
              mt: 0.5,

              fontWeight: 600,

              color: darkMode
                ? "#FFFFFF"
                : "#222",
            }}
          >
            {productName}
          </Typography>

          {/* CUSTOMER */}

          <Typography
            sx={{
              mt: 2,

              fontSize: 13,

              color: darkMode
                ? "#AFAFAF"
                : "#777",
            }}
          >
            Customer
          </Typography>

          <Typography
            sx={{
              mt: 0.5,

              fontWeight: 600,

              color: darkMode
                ? "#FFFFFF"
                : "#222",
            }}
          >
            {customerName}
          </Typography>
        </Box>

        <Typography
          sx={{
            mt: 3,

            color: darkMode
              ? "#DDDDDD"
              : "#666",

            lineHeight: 1.7,
          }}
        >
          Are you sure you want to permanently delete
          this return request?
        </Typography>
      </DialogContent>

      {/* ===============================================
          ACTIONS
      =============================================== */}

      <DialogActions
        sx={{
          px: 3,
          pb: 2,
          pt: 1,
          gap: 1,
        }}
      >
        {/* CANCEL */}

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

        {/* DELETE */}

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
          {deleting
            ? "Deleting..."
            : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteReturn;