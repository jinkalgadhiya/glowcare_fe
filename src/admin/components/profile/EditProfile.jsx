import React, { useEffect, useState } from "react";

import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Avatar,
  Stack,
} from "@mui/material";

import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

import { useThemeContext } from "../../context/ThemeContext";
import adminApi from "../../../api/adminApi";

import CustomTextField from "../../../components/common/CustomTextField";

const EditProfile = ({ admin, onClose, onUpdated }) => {
  const { darkMode } = useThemeContext();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

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
  // LOAD ADMIN DATA
  // ==========================================

  useEffect(() => {
    if (admin) {
      setFullName(admin.fullName || "");
      setEmail(admin.email || "");
      setPhone(admin.contactNumber || "");
      setImage(admin.image || "");
    }
  }, [admin]);

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
  // SAVE PROFILE
  // ==========================================

  const handleSave = async () => {
    // Validation

    if (!fullName.trim()) {
      showModal("error", "Full Name Required", "Please enter your full name.");

      return;
    }

    if (!email.trim()) {
      showModal("error", "Email Required", "Please enter your email address.");

      return;
    }

    try {
      const response = await adminApi.put("/admin/profile", {
        fullName: fullName.trim(),
        email: email.trim(),
        contactNumber: phone.trim(),
        image,
      });

      if (response.data.status === "success") {
        onUpdated(response.data.data);

        showModal(
          "success",
          "Profile Updated",
          "Your profile has been updated successfully.",
        );
      }
    } catch (error) {
      console.error("Update admin profile error:", error);

      showModal(
        "error",
        "Profile Update Failed",
        error.response?.data?.message ||
          "Failed to update profile. Please try again.",
      );
    }
  };

  // ==========================================
  // MODAL CLOSE
  // ==========================================

  const handleModalOK = () => {
    const modalType = modal.type;

    handleCloseModal();

    // Close Edit Profile after successful update

    if (modalType === "success") {
      onClose();
    }
  };

  // ==========================================
  // TEXT FIELD STYLE
  // ==========================================

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      color: darkMode ? "#FFFFFF" : "#222",

      "& fieldset": {
        borderColor: darkMode ? "#4B4B4B" : "#D9D9D9",
      },

      "&:hover fieldset": {
        borderColor: "#B89478",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#B89478",
      },
    },

    "& .MuiInputLabel-root": {
      color: darkMode ? "#CFCFCF" : "#666",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#B89478",
    },

    "& .MuiFormHelperText-root": {
      color: darkMode ? "#A8A8A8" : "#777",
    },

    "& input": {
      color: darkMode ? "#FFFFFF" : "#222",
    },
  };

  if (!admin) return null;

  return (
    <>
      {/* ==========================================
          EDIT PROFILE FORM
      ========================================== */}

      <DialogTitle
        sx={{
          fontWeight: 700,
          color: darkMode ? "#fff" : "#222",
          bgcolor: darkMode ? "#252525" : "#fff",
        }}
      >
        Edit Profile
      </DialogTitle>

      <DialogContent
        sx={{
          bgcolor: darkMode ? "#252525" : "#fff",
        }}
      >
        <Stack
          spacing={3}
          sx={{
            mt: 2,
          }}
        >
          {/* PROFILE IMAGE */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              src={image}
              sx={{
                width: 110,
                height: 110,
                fontSize: 42,
                fontWeight: 700,

                bgcolor: "#F8F4EF",
                color: "#B89478",
              }}
            >
              {fullName?.charAt(0)}
            </Avatar>
          </Box>

          {/* FULL NAME */}

          <CustomTextField
            label="Full Name"
            fullWidth
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            sx={textFieldStyle}
          />

          {/* EMAIL */}

          <CustomTextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={textFieldStyle}
          />

          {/* PHONE */}

          <CustomTextField
            label="Phone Number"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            sx={textFieldStyle}
          />

          {/* PROFILE IMAGE URL */}

          <CustomTextField
            label="Profile Image URL"
            fullWidth
            value={image}
            onChange={(e) => setImage(e.target.value)}
            helperText="Paste an image URL (optional)"
            sx={textFieldStyle}
          />
        </Stack>
      </DialogContent>

      {/* ==========================================
          FORM ACTIONS
      ========================================== */}

      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          bgcolor: darkMode ? "#252525" : "#fff",
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            textTransform: "none",
            color: darkMode ? "#B5B5B5" : "#777",
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

      {/* ==========================================
          SUCCESS / ERROR MODAL
      ========================================== */}

      <Dialog
        open={modal.open}
        onClose={handleCloseModal}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,

            bgcolor: darkMode ? "#252525" : "#FFFCF8",

            border: darkMode ? "1px solid #3A3A3A" : "1px solid #E9DED4",
          },
        }}
      >
        {/* ICON */}

        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 4,
            pb: 1,
          }}
        >
          <Box
            sx={{
              width: 68,
              height: 68,

              borderRadius: "50%",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              bgcolor: modal.type === "success" ? "#EEF5EF" : "#FFF1F1",
            }}
          >
            {modal.type === "success" ? (
              <CheckCircleOutlineOutlinedIcon
                sx={{
                  fontSize: 38,
                  color: "#5E8B68",
                }}
              />
            ) : (
              <ErrorOutlineOutlinedIcon
                sx={{
                  fontSize: 38,
                  color: "#B85C5C",
                }}
              />
            )}
          </Box>
        </DialogTitle>

        {/* CONTENT */}

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

              color: darkMode ? "#fff" : "#1E2F2B",
            }}
          >
            {modal.title}
          </Typography>

          <Typography
            sx={{
              fontSize: 14,
              lineHeight: 1.7,

              color: darkMode ? "#B5B5B5" : "#6B7280",
            }}
          >
            {modal.message}
          </Typography>
        </DialogContent>

        {/* BUTTON */}

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
            onClick={handleModalOK}
            sx={{
              height: 46,

              borderRadius: 2,

              textTransform: "none",

              fontSize: 15,
              fontWeight: 600,

              bgcolor: "#B89478",

              boxShadow: "none",

              "&:hover": {
                bgcolor: "#A88366",
                boxShadow: "none",
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

export default EditProfile;
