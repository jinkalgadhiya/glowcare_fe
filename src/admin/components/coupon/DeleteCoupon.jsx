import React from "react";

import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Button,
} from "@mui/material";

import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import { useThemeContext } from "../../context/ThemeContext";

const DeleteCoupon = ({
  open,
  onClose,
  coupon,
  onConfirm,
}) => {
  const { darkMode } = useThemeContext();

  if (!coupon) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 560,
          borderRadius: "10px",

          // ================================
          // DIALOG BACKGROUND
          // ================================
          bgcolor: darkMode
            ? "#252525 !important"
            : "#FFFFFF !important",

          color: darkMode
            ? "#FFFFFF !important"
            : "#222222 !important",

          border: darkMode
            ? "1px solid #3D3D3D"
            : "1px solid #E5E5E5",

          boxShadow: darkMode
            ? "0 15px 45px rgba(0, 0, 0, 0.6)"
            : "0 15px 45px rgba(0, 0, 0, 0.15)",
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: darkMode
              ? "rgba(0, 0, 0, 0.72)"
              : "rgba(0, 0, 0, 0.45)",
          },
        },
      }}
    >
      <DialogContent
        sx={{
          p: 4,
          textAlign: "center",

          bgcolor: darkMode
            ? "#252525"
            : "#FFFFFF",

          color: darkMode
            ? "#FFFFFF"
            : "#222222",
        }}
      >
        {/* ==========================================
            WARNING ICON
        ========================================== */}

        <Box
          sx={{
            width: 82,
            height: 82,
            mx: "auto",
            mb: 3,

            borderRadius: "50%",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            bgcolor: darkMode
              ? "#3A2929"
              : "#F8EEEC",

            border: darkMode
              ? "1px solid #523838"
              : "1px solid #E8D0CA",
          }}
        >
          <WarningAmberRoundedIcon
            sx={{
              fontSize: 42,

              color: darkMode
                ? "#FF8A80"
                : "#A34B40",
            }}
          />
        </Box>

        {/* ==========================================
            TITLE
        ========================================== */}

        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 700,

            color: darkMode
              ? "#FFFFFF"
              : "#1E2F2B",
          }}
        >
          Delete Coupon?
        </Typography>

        {/* ==========================================
            DESCRIPTION
        ========================================== */}

        <Typography
          component="div"
          sx={{
            mt: 1.5,

            fontSize: 15,
            lineHeight: 1.7,

            color: darkMode
              ? "#C7C7C7"
              : "#777777",
          }}
        >
          Are you sure you want to delete{" "}
          <Box
            component="span"
            sx={{
              fontWeight: 700,

              color: darkMode
                ? "#FFFFFF"
                : "#333333",
            }}
          >
            {coupon.code}
          </Box>
          ?
          <br />
          This action cannot be undone.
        </Typography>

        {/* ==========================================
            BUTTONS
        ========================================== */}

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 4,
          }}
        >
          {/* CANCEL */}

          <Button
            fullWidth
            variant="outlined"
            onClick={onClose}
            sx={{
              height: 46,

              borderRadius: 2,

              textTransform: "none",

              fontSize: 15,
              fontWeight: 600,

              color: darkMode
                ? "#D0D0D0"
                : "#555555",

              borderColor: darkMode
                ? "#555555"
                : "#CCCCCC",

              bgcolor: "transparent",

              "&:hover": {
                borderColor: "#B89478",

                bgcolor: darkMode
                  ? "#333333"
                  : "#F8F5F1",
              },
            }}
          >
            Cancel
          </Button>

          {/* DELETE */}

          <Button
            fullWidth
            variant="contained"
            onClick={onConfirm}
            sx={{
              height: 46,

              borderRadius: 2,

              textTransform: "none",

              fontSize: 15,
              fontWeight: 600,

              color: "#FFFFFF",

              bgcolor: "#A34B40",

              boxShadow: "none",

              "&:hover": {
                bgcolor: "#893D34",

                boxShadow: "none",
              },
            }}
          >
            Delete
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCoupon;