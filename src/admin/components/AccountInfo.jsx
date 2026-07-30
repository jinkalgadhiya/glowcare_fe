import React from "react";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

import { useThemeContext } from "../context/ThemeContext";

const AccountInfo = ({ admin }) => {
  const { darkMode } = useThemeContext();

  if (!admin) return null;

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
          pb: 2,
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: 2,
            bgcolor: darkMode ? "#303030" : "#F8F4EF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PersonOutlineOutlinedIcon
            sx={{
              color: "#B89478",
              fontSize: 32,
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
            Account Information
          </Typography>

          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 400,
              color: darkMode ? "#B5B5B5" : "#6B7280",
              mt: 0.4,
            }}
          >
            View your account details
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Profile */}

      <Box
        sx={{
          p: 4,
        }}
      >
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={4}
          alignItems="center"
        >
          <Avatar
            src={admin.image}
            sx={{
              width: 90,
              height: 90,
              fontSize: 42,
              bgcolor: "#D8D8D8",
              fontWeight: 700,
            }}
          >
            {!admin.image && admin.fullName?.charAt(0)}
          </Avatar>

          <Box flex={1}>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 700,
                lineHeight: 1.3,
                color: darkMode ? "#fff" : "#1E1E1E",
              }}
            >
              {admin.fullName}
            </Typography>

            <Chip
              label={admin.role}
              color="success"
              sx={{
                mt: 1,
                mb: 1.5,
                height: 24,
                fontSize: 12,
                fontWeight: 600,
              }}
            />

            <Typography
              sx={{
                color: darkMode ? "#B5B5B5" : "#666",
                fontSize: 14,
                fontWeight: 400,
              }}
            >
              {admin.email}
            </Typography>

            <Typography
              sx={{
                color: darkMode ? "#B5B5B5" : "#666",
                mt: 1,
                fontSize: 14,
              }}
            >
              {admin.phone}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 4 }} />
        <Stack spacing={0}>
          <InfoRow
            icon={<EmailOutlinedIcon />}
            label="Email Address"
            value={admin.email}
            darkMode={darkMode}
          />

          <InfoRow
            icon={<PhoneOutlinedIcon />}
            label="Phone Number"
            value={admin.phone}
            darkMode={darkMode}
          />

          <InfoRow
            icon={<AdminPanelSettingsOutlinedIcon />}
            label="Role"
            value={admin.role}
            darkMode={darkMode}
          />

          <InfoRow
            icon={<CalendarTodayOutlinedIcon />}
            label="Joined Date"
            value={
              admin.joinedDate
                ? new Date(admin.joinedDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "-"
            }
            darkMode={darkMode}
          />

          <InfoRow
            icon={<VerifiedUserOutlinedIcon />}
            label="Account Status"
            value={
              <Chip
                label={admin.status}
                color="success"
                size="small"
                sx={{
                  fontWeight: 600,
                }}
              />
            }
            darkMode={darkMode}
            last
          />
        </Stack>
      </Box>
    </Paper>
  );
};

const InfoRow = ({ icon, label, value, darkMode, last = false }) => (
  <>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        py: 1.5,
      }}
    >
      <Box
        sx={{
          fontSize: 20,
          display: "flex",
          alignItems: "center",
          color: "#B89478",
          mr: 3,
        }}
      >
        {icon}  
      </Box>

      <Typography
        sx={{
          width: 150,
          fontSize: 13,
          fontWeight: 500,
          color: darkMode ? "#D4D4D4" : "#555",
          
        }}
      >
        {label}
      </Typography>

      <Box
        sx={{
          flex: 1,
          color: darkMode ? "#fff" : "#222",
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        {value}
      </Box>
    </Box>

    {!last && (
      <Divider
        sx={{
          borderColor: "#EFEFEF",
        }}
      />
    )}
  </>
);

export default AccountInfo;
