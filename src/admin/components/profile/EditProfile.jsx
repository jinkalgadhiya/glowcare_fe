import React, { useEffect, useState } from "react";
import {
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Avatar,
  Stack,
} from "@mui/material";

import { useThemeContext } from "../../context/ThemeContext";
import api from "../../../api/axios";
import CustomTextField from "../../../components/common/CustomTextField";

const EditProfile = ({ admin, onClose, onUpdated }) => {
  const { darkMode } = useThemeContext();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (admin) {
      setFullName(admin.fullName || "");
      setEmail(admin.email || "");
      setPhone(admin.contactNumber || "");
      setImage(admin.image || "");
    }
  }, [admin]);

  const handleSave = async () => {
    try {
      const response = await api.put("/admin/profile", {
        fullName: fullName.trim(),
        email: email.trim(),
        contactNumber: phone.trim(),
        image,
      });

      if (response.data.status === "success") {
        onUpdated(response.data.data);

        alert("Profile updated successfully");

        onClose();
      }
    } catch (error) {
      console.error("Update admin profile error:", error);

      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  if (!admin) return null;

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

  return (
    <>
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
              }}
            >
              {fullName?.charAt(0)}
            </Avatar>
          </Box>

          <CustomTextField
            label="Full Name"
            fullWidth
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            sx={textFieldStyle}
          />

          <CustomTextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={textFieldStyle}
          />

          <CustomTextField
            label="Phone Number"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            sx={textFieldStyle}
          />

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
            color: "#777",
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
    </>
  );
};

export default EditProfile;
