import React, { useState } from "react";

import {
  Paper,
  Typography,
  Button,
  Box,
  Divider,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

import { useThemeContext } from "../../context/ThemeContext";
import api from "../../../api/axios";

import CustomTextField from "../../../components/common/CustomTextField";

const ChangePassword = ({ admin }) => {
  const { darkMode } = useThemeContext();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ==========================================
  // MODAL STATE
  // ==========================================

  const [modal, setModal] = useState({
    open: false,
    type: "success",
    title: "",
    message: "",
  });

  // ==========================================
  // OPEN MODAL
  // ==========================================

  const showModal = (type, title, message) => {
    setModal({
      open: true,
      type,
      title,
      message,
    });
  };

  // ==========================================
  // CLOSE MODAL
  // ==========================================

  const handleCloseModal = () => {
    setModal((prev) => ({
      ...prev,
      open: false,
    }));
  };

  // ==========================================
  // MODAL ICON
  // ==========================================

  const getModalIcon = () => {
    const iconStyle = {
      fontSize: 48,
    };

    switch (modal.type) {
      case "success":
        return (
          <CheckCircleOutlineOutlinedIcon
            sx={{
              ...iconStyle,
              color: "#B89478",
            }}
          />
        );

      case "error":
        return (
          <ErrorOutlineOutlinedIcon
            sx={{
              ...iconStyle,
              color: "#D32F2F",
            }}
          />
        );

      case "warning":
      default:
        return (
          <WarningAmberOutlinedIcon
            sx={{
              ...iconStyle,
              color: "#B89478",
            }}
          />
        );
    }
  };

  // ==========================================
  // UPDATE PASSWORD
  // ==========================================

  const handleUpdatePassword = async () => {
    if (!admin) return;

    if (!currentPassword.trim()) {
      showModal(
        "warning",
        "Current Password Required",
        "Please enter your current password."
      );
      return;
    }

    if (!newPassword.trim()) {
      showModal(
        "warning",
        "New Password Required",
        "Please enter your new password."
      );
      return;
    }

    if (!confirmPassword.trim()) {
      showModal(
        "warning",
        "Confirm Password Required",
        "Please confirm your new password."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      showModal(
        "error",
        "Passwords Do Not Match",
        "Your new password and confirm password must be the same."
      );
      return;
    }

    try {
      const response = await api.put(
        "/admin/change-password",
        {
          currentPassword,
          newPassword,
        }
      );

      if (response.data.status === "success") {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        showModal(
          "success",
          "Password Updated",
          "Your password has been updated successfully."
        );
      }
    } catch (error) {
      console.error(
        "Change admin password error:",
        error
      );

      showModal(
        "error",
        "Password Update Failed",
        error.response?.data?.message ||
          "Failed to update password. Please try again."
      );
    }
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid",
          borderColor: darkMode
            ? "#333"
            : "#E7E7E7",
          bgcolor: darkMode
            ? "#252525"
            : "#fff",
          overflow: "hidden",
        }}
      >
        {/* HEADER */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 3,
          }}
        >
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: 2,
              bgcolor: darkMode
                ? "#303030"
                : "#F8F4EF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LockOutlinedIcon
              sx={{
                color: "#B89478",
                fontSize: 24,
              }}
            />
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 700,
                lineHeight: 1.2,
                color: darkMode
                  ? "#fff"
                  : "#1E1E1E",
              }}
            >
              Change Password
            </Typography>

            <Typography
              sx={{
                fontSize: 13,
                mt: 0.3,
                color: darkMode
                  ? "#B5B5B5"
                  : "#6B7280",
              }}
            >
              Update your account password
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Box sx={{ p: 3 }}>

          {/* CURRENT PASSWORD */}

          <Box sx={{ mb: 2.5 }}>
            <Typography
              sx={{
                mb: 0.8,
                fontSize: 15,
                fontWeight: 550,
                color: darkMode
                  ? "#F5F5F5"
                  : "#2B2B2B",
              }}
            >
              Current Password
            </Typography>

            <CustomTextField
              fullWidth
              placeholder="Enter current password"
              type={
                showCurrent
                  ? "text"
                  : "password"
              }
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowCurrent(!showCurrent)
                        }
                      >
                        {showCurrent ? (
                          <VisibilityOffOutlinedIcon />
                        ) : (
                          <VisibilityOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: 57,
                  borderRadius: 2,
                  fontSize: 15,
                  color: "#a7a7a7",
                },
              }}
            />
          </Box>

          {/* NEW PASSWORD */}

          <Box sx={{ mb: 2.5 }}>
            <Typography
              sx={{
                mb: 0.8,
                fontSize: 15,
                fontWeight: 550,
                color: darkMode
                  ? "#F5F5F5"
                  : "#2B2B2B",
              }}
            >
              New Password
            </Typography>

            <CustomTextField
              fullWidth
              placeholder="Enter new password"
              type={
                showNew
                  ? "text"
                  : "password"
              }
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowNew(!showNew)
                        }
                      >
                        {showNew ? (
                          <VisibilityOffOutlinedIcon />
                        ) : (
                          <VisibilityOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: 57,
                  borderRadius: 2,
                  fontSize: 15,
                  color: "#a7a7a7",
                },
              }}
            />
          </Box>

          {/* CONFIRM PASSWORD */}

          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                mb: 0.8,
                fontSize: 15,
                fontWeight: 550,
                color: darkMode
                  ? "#F5F5F5"
                  : "#2B2B2B",
              }}
            >
              Confirm New Password
            </Typography>

            <CustomTextField
              fullWidth
              placeholder="Confirm new password"
              type={
                showConfirm
                  ? "text"
                  : "password"
              }
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirm(!showConfirm)
                        }
                      >
                        {showConfirm ? (
                          <VisibilityOffOutlinedIcon />
                        ) : (
                          <VisibilityOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: 57,
                  borderRadius: 2,
                  fontSize: 15,
                  color: "#a7a7a7",
                },
              }}
            />
          </Box>

          {/* UPDATE BUTTON */}

          <Button
            fullWidth
            variant="contained"
            onClick={handleUpdatePassword}
            sx={{
              mt: 4,
              height: 54,
              bgcolor: "#B89478",
              textTransform: "none",
              fontSize: 16,
              fontWeight: 600,
              borderRadius: 2,
              boxShadow: "none",

              "&:hover": {
                bgcolor: "#A88366",
                boxShadow: "none",
              },
            }}
          >
            Update Password
          </Button>
        </Box>
      </Paper>

      {/* ==========================================
          GLOWCARE CUSTOM MODAL
      ========================================== */}

      <Dialog
        open={modal.open}
        onClose={handleCloseModal}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            bgcolor: darkMode
              ? "#252525"
              : "#fff",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 4,
            pb: 1,
          }}
        >
          {getModalIcon()}
        </DialogTitle>

        <DialogContent
          sx={{
            textAlign: "center",
            px: 4,
            pb: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 700,
              mb: 1,
              color: darkMode
                ? "#fff"
                : "#1E1E1E",
            }}
          >
            {modal.title}
          </Typography>

          <Typography
            sx={{
              fontSize: 14,
              lineHeight: 1.7,
              color: darkMode
                ? "#B5B5B5"
                : "#6B7280",
            }}
          >
            {modal.message}
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "center",
            pb: 3,
            px: 4,
          }}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={handleCloseModal}
            sx={{
              height: 46,
              borderRadius: 2,
              textTransform: "none",
              fontSize: 15,
              fontWeight: 600,

              // GlowCare theme color
              bgcolor:
                modal.type === "error"
                  ? "#D32F2F"
                  : "#B89478",

              "&:hover": {
                bgcolor:
                  modal.type === "error"
                    ? "#B71C1C"
                    : "#A88366",
              },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChangePassword;