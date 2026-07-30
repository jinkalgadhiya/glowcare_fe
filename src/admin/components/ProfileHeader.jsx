import React from "react";
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { useThemeContext } from "../context/ThemeContext";

const ProfileHeader = ({ onEdit }) => {
  const { darkMode } = useThemeContext();

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        pt: "60px",
        mt: "-60px",
        mb: 4,
      }}
    >
      {/* Breadcrumb */}

      <Breadcrumbs
        separator={<NavigateNextIcon sx={{ fontSize: 16 }} />}
        sx={{ mb: 3 }}
      >
        <Link
          underline="hover"
          onClick={() => navigate("/admin/dashboard")}
          sx={{
            cursor: "pointer",
            color: darkMode ? "#AFAFAF" : "#777",
            fontSize: 14,

            "&:hover": {
              color: "#B89478",
            },
          }}
        >
          Dashboard
        </Link>

        <Link
          underline="hover"
          sx={{
            cursor: "pointer",
            color: darkMode ? "#AFAFAF" : "#777",
            fontSize: 14,
          }}
        >
          Settings
        </Link>

        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 500,
            color: darkMode ? "#fff" : "#474040",
          }}
        >
          Profile
        </Typography>
      </Breadcrumbs>

      {/* Heading */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 34,
              fontWeight: 700,
              color: darkMode ? "#fff" : "#222",
            }}
          >
            Admin Profile
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: darkMode ? "#B5B5B5" : "#666",
            }}
          >
            Manage your account information and security settings.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<EditOutlinedIcon />}
          disableElevation
          onClick={onEdit}
          sx={{
            minWidth: 170,
            height: 46,
            bgcolor: "#B89478",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,

            "&:hover": {
              bgcolor: "#A88366",
            },
          }}
        >
          Edit Profile
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileHeader;