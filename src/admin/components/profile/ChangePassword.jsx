import React, { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Box,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

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

  const handleUpdatePassword = async () => {
    if (!admin) return;

    if (!currentPassword.trim()) {
      alert("Please enter your current password.");
      return;
    }

    if (!newPassword.trim()) {
      alert("Please enter your new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await api.put("/admin/change-password", {
        currentPassword,
        newPassword,
      });

      if (response.data.status === "success") {
        alert("Password updated successfully.");

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error("Change admin password error:", error);

      alert(error.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: darkMode ? "#333" : "#E7E7E7",
        bgcolor: darkMode ? "#252525" : "#fff",
        overflow: "hidden",
      }}
    >
      {/* Header */}

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
            bgcolor: darkMode ? "#303030" : "#F8F4EF",
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
              color: darkMode ? "#fff" : "#1E1E1E",
            }}
          >
            Change Password
          </Typography>

          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 400,
              mt: 0.3,
              color: darkMode ? "#B5B5B5" : "#6B7280",
            }}
          >
            Update your account password
          </Typography>
        </Box>
      </Box>

      <Divider />

      <Box sx={{ p: 3 }}>
        {/* Current Password */}

        <Box sx={{ mb: 2.5 }}>
          <Typography
            sx={{
              mb: 0.8,
              fontSize: 15,
              fontWeight: 550,
              color: darkMode ? "#F5F5F5" : "#2B2B2B",
            }}
          >
            Current Password
          </Typography>

          <CustomTextField
            fullWidth
            placeholder="Enter current password"
            type={showCurrent ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowCurrent(!showCurrent)}>
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

              "& .MuiInputAdornment-root svg": {
                fontSize: 20,
                color: "#8A8A8A",
              },
            }}
          />
        </Box>

        {/* New Password */}

        <Box sx={{ mb: 2.5 }}>
          <Typography
            sx={{
              mb: 0.8,
              fontSize: 15,
              fontWeight: 550,
              color: darkMode ? "#F5F5F5" : "#2B2B2B",
            }}
          >
            New Password
          </Typography>

          <CustomTextField
            fullWidth
            placeholder="Enter new password"
            type={showNew ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowNew(!showNew)}>
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

              "& .MuiInputAdornment-root svg": {
                fontSize: 20,
                color: "#8A8A8A",
              },
            }}
          />
        </Box>

        {/* Confirm New Password */}

        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              mb: 0.8,
              fontSize: 15,
              fontWeight: 550,
              color: darkMode ? "#F5F5F5" : "#2B2B2B",
            }}
          >
            Confirm New Password
          </Typography>

          <CustomTextField
            fullWidth
            placeholder="Confirm new password"
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm(!showConfirm)}>
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

              "& .MuiInputAdornment-root svg": {
                fontSize: 20,
                color: "#8A8A8A",
              },
            }}
          />
        </Box>

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
  );
};

export default ChangePassword;
