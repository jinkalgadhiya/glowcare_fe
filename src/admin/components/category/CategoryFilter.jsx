import React from "react";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useThemeContext } from "../../context/ThemeContext";

const CategoryFilter = ({
  open,
  onClose,

  statusFilter,
  setStatusFilter,

  menuFilter,
  setMenuFilter,

  categoryTypeFilter,
  setCategoryTypeFilter,

  sortBy,
  setSortBy,

  onReset,
}) => {
  const { darkMode } = useThemeContext();

  const radioStyle = {
    color: darkMode ? "#888" : "#B89478",

    "&.Mui-checked": {
      color: "#B89478",
    },
  };

  const labelStyle = {
    color: darkMode ? "#E0E0E0" : "#444",
  };

  const dividerStyle = {
    borderColor: darkMode ? "#3A3A3A" : "#E7DDD2",
    my: 3,
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 360,
          backgroundColor: darkMode ? "#1E1E1E" : "#fff",
          color: darkMode ? "#fff" : "#222",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          p: 3,
          height: "100vh",
          overflowY: "auto",
          backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
          display: "flex",
          flexDirection: "column",

          "&::-webkit-scrollbar": {
            width: "8px",
          },

          "&::-webkit-scrollbar-track": {
            background: darkMode ? "#1E1E1E" : "#F5F5F5",
          },

          "&::-webkit-scrollbar-thumb": {
            background: darkMode ? "#4A4A4A" : "#C5C5C5",
            borderRadius: "10px",
          },
        }}
      >
        {/* Header */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 600,
              color: darkMode ? "#fff" : "#1E2F2B",
            }}
          >
            Filter Categories
          </Typography>

          <IconButton
            onClick={onClose}
            sx={{
              color: darkMode ? "#fff" : "#555",

              "&:hover": {
                backgroundColor: darkMode ? "#383838" : "#F5F5F5",
              },
            }}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </Box>

        <Divider sx={dividerStyle} />

        {/* =========================
            STATUS
        ========================= */}

        <Typography
          sx={{
            fontWeight: 600,
            mb: 2,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Status
        </Typography>

        <RadioGroup
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {["All", "Active", "Inactive"].map((item) => (
            <FormControlLabel
              key={item}
              value={item}
              control={<Radio sx={radioStyle} />}
              label={item}
              sx={labelStyle}
            />
          ))}
        </RadioGroup>

        <Divider sx={dividerStyle} />

        {/* =========================
            MENU TYPE
        ========================= */}

        <Typography
          sx={{
            fontWeight: 600,
            mb: 2,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Menu Type
        </Typography>

        <RadioGroup
          value={menuFilter}
          onChange={(e) => setMenuFilter(e.target.value)}
        >
          {[
            { value: "All", label: "All" },
            { value: "skincare", label: "Skincare" },
            { value: "haircare", label: "Haircare" },
            { value: "more", label: "More" },
          ].map((item) => (
            <FormControlLabel
              key={item.value}
              value={item.value}
              control={<Radio sx={radioStyle} />}
              label={item.label}
              sx={labelStyle}
            />
          ))}
        </RadioGroup>

        <Divider sx={dividerStyle} />

        {/* =========================
            CATEGORY TYPE
        ========================= */}

        <Typography
          sx={{
            fontWeight: 600,
            mb: 2,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Category Type
        </Typography>

        <RadioGroup
          value={categoryTypeFilter}
          onChange={(e) => setCategoryTypeFilter(e.target.value)}
        >
          {[
            { value: "All", label: "All" },
            { value: "main", label: "Main Category" },
            { value: "sub", label: "Sub Category" },
          ].map((item) => (
            <FormControlLabel
              key={item.value}
              value={item.value}
              control={<Radio sx={radioStyle} />}
              label={item.label}
              sx={labelStyle}
            />
          ))}
        </RadioGroup>

        <Divider sx={dividerStyle} />

        {/* =========================
            SORT
        ========================= */}

        <Typography
          sx={{
            fontWeight: 600,
            mb: 2,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Sort By
        </Typography>

        <RadioGroup value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          {[
            { value: "Newest", label: "Newest First" },
            { value: "Oldest", label: "Oldest First" },
            { value: "A-Z", label: "A-Z" },
            { value: "Z-A", label: "Z-A" },
          ].map((item) => (
            <FormControlLabel
              key={item.value}
              value={item.value}
              control={<Radio sx={radioStyle} />}
              label={item.label}
              sx={labelStyle}
            />
          ))}
        </RadioGroup>

        {/* Push buttons to bottom */}

        <Box sx={{ flexGrow: 1 }} />

        <Divider sx={dividerStyle} />

        {/* =========================
            BUTTONS
        ========================= */}

        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            onClick={onReset}
            sx={{
              height: 48,
              borderColor: "#B89478",
              color: "#B89478",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,

              "&:hover": {
                borderColor: "#A88366",
                bgcolor: darkMode
                  ? "rgba(184,148,120,.12)"
                  : "rgba(184,148,120,.08)",
              },
            }}
          >
            Reset
          </Button>

          <Button
            fullWidth
            variant="contained"
            onClick={onClose}
            sx={{
              height: 48,
              bgcolor: "#B89478",
              color: "#fff",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              boxShadow: "none",

              "&:hover": {
                bgcolor: "#A88366",
                boxShadow: "none",
              },
            }}
          >
            Apply
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CategoryFilter;
