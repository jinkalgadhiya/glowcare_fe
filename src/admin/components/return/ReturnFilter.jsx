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

const ReturnFilter = ({
  open,
  onClose,

  statusFilter,
  setStatusFilter,

  refundStatusFilter,
  setRefundStatusFilter,

  sortBy,
  setSortBy,

  onReset,
}) => {
  const { darkMode } = useThemeContext();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 360,

          backgroundColor: darkMode
            ? "#1E1E1E"
            : "#FFFFFF",

          color: darkMode
            ? "#FFFFFF"
            : "#222",

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

          backgroundColor: darkMode
            ? "#1E1E1E"
            : "#FFFFFF",

          display: "flex",
          flexDirection: "column",

          "&::-webkit-scrollbar": {
            width: "8px",
          },

          "&::-webkit-scrollbar-track": {
            background: darkMode
              ? "#1E1E1E"
              : "#F5F5F5",
          },

          "&::-webkit-scrollbar-thumb": {
            background: darkMode
              ? "#4A4A4A"
              : "#C5C5C5",

            borderRadius: "10px",
          },
        }}
      >
        {/* ================================================
            HEADER
        ================================================= */}

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

              color: darkMode
                ? "#FFFFFF"
                : "#1E2F2B",
            }}
          >
            Filter Returns
          </Typography>

          <IconButton
            onClick={onClose}
            sx={{
              color: darkMode
                ? "#FFFFFF"
                : "#555",

              "&:hover": {
                backgroundColor: darkMode
                  ? "#383838"
                  : "#F5F5F5",
              },
            }}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </Box>

        <Divider
          sx={{
            borderColor: darkMode
              ? "#3A3A3A"
              : "#E7DDD2",

            my: 3,
          }}
        />

        {/* ================================================
            RETURN STATUS
        ================================================= */}

        <Typography
          sx={{
            fontWeight: 600,
            mb: 2,

            color: darkMode
              ? "#FFFFFF"
              : "#222",
          }}
        >
          Return Status
        </Typography>

        <RadioGroup
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          {[
            "All",
            "Pending",
            "Approved",
            "Rejected",
            "Pickup Scheduled",
            "Picked Up",
            "Received",
            "Refunded",
            "Cancelled",
          ].map((item) => (
            <FormControlLabel
              key={item}
              value={item}
              control={
                <Radio
                  sx={{
                    color: darkMode
                      ? "#888"
                      : "#B89478",

                    "&.Mui-checked": {
                      color: "#B89478",
                    },
                  }}
                />
              }
              label={item}
              sx={{
                color: darkMode
                  ? "#E0E0E0"
                  : "#444",
              }}
            />
          ))}
        </RadioGroup>

        <Divider
          sx={{
            borderColor: darkMode
              ? "#3A3A3A"
              : "#E7DDD2",

            my: 3,
          }}
        />

        {/* ================================================
            REFUND STATUS
        ================================================= */}

        <Typography
          sx={{
            fontWeight: 600,
            mb: 2,

            color: darkMode
              ? "#FFFFFF"
              : "#222",
          }}
        >
          Refund Status
        </Typography>

        <RadioGroup
          value={refundStatusFilter}
          onChange={(e) =>
            setRefundStatusFilter(
              e.target.value,
            )
          }
        >
          {[
            "All",
            "Not Initiated",
            "Pending",
            "Processed",
            "Completed",
          ].map((item) => (
            <FormControlLabel
              key={item}
              value={item}
              control={
                <Radio
                  sx={{
                    color: darkMode
                      ? "#888"
                      : "#B89478",

                    "&.Mui-checked": {
                      color: "#B89478",
                    },
                  }}
                />
              }
              label={item}
              sx={{
                color: darkMode
                  ? "#E0E0E0"
                  : "#444",
              }}
            />
          ))}
        </RadioGroup>

        <Divider
          sx={{
            borderColor: darkMode
              ? "#3A3A3A"
              : "#E7DDD2",

            my: 3,
          }}
        />

        {/* ================================================
            SORT BY
        ================================================= */}

        <Typography
          sx={{
            fontWeight: 600,
            mb: 2,

            color: darkMode
              ? "#FFFFFF"
              : "#222",
          }}
        >
          Sort By
        </Typography>

        <RadioGroup
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >
          {[
            "Newest",
            "Oldest",
            "Refund Amount Low → High",
            "Refund Amount High → Low",
          ].map((item) => (
            <FormControlLabel
              key={item}
              value={item}
              control={
                <Radio
                  sx={{
                    color: darkMode
                      ? "#888"
                      : "#B89478",

                    "&.Mui-checked": {
                      color: "#B89478",
                    },
                  }}
                />
              }
              label={item}
              sx={{
                color: darkMode
                  ? "#E0E0E0"
                  : "#444",
              }}
            />
          ))}
        </RadioGroup>

        {/* PUSH BUTTONS TO BOTTOM */}

        <Box
          sx={{
            flexGrow: 1,
          }}
        />

        <Divider
          sx={{
            borderColor: darkMode
              ? "#3A3A3A"
              : "#E7DDD2",

            my: 3,
          }}
        />

        {/* ================================================
            BUTTONS
        ================================================= */}

        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          {/* RESET */}

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

          {/* APPLY */}

          <Button
            fullWidth
            variant="contained"
            onClick={onClose}
            sx={{
              height: 48,

              bgcolor: "#B89478",

              textTransform: "none",

              fontWeight: 600,

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

export default ReturnFilter;