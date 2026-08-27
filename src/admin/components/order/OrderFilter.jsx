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

const OrderFilter = ({
  open,
  onClose,

  statusFilter,
  setStatusFilter,

  paymentFilter,
  setPaymentFilter,

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
            Filter Orders
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

        <Divider
          sx={{
            borderColor: darkMode ? "#3A3A3A" : "#E7DDD2",
            my: 3,
          }}
        />

        {/* Order Status */}

        <Typography
          sx={{
            fontWeight: 600,
            mb: 2,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Order Status
        </Typography>

        <RadioGroup
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {[
            "All",
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled",
          ].map((item) => (
            <FormControlLabel
              key={item}
              value={item}
              control={
                <Radio
                  sx={{
                    color: darkMode ? "#888" : "#B89478",

                    "&.Mui-checked": {
                      color: "#B89478",
                    },
                  }}
                />
              }
              label={item}
              sx={{
                color: darkMode ? "#E0E0E0" : "#444",
              }}
            />
          ))}
        </RadioGroup>

        <Divider
          sx={{
            borderColor: darkMode ? "#3A3A3A" : "#E7DDD2",
            my: 3,
          }}
        />

        {/* Payment Method */}

        <Typography
          sx={{
            fontWeight: 600,
            mb: 2,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Payment Method
        </Typography>

        <RadioGroup
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
        >
          {["All", "COD", "Card", "UPI"].map((item) => (
            <FormControlLabel
              key={item}
              value={item}
              control={
                <Radio
                  sx={{
                    color: darkMode ? "#888" : "#B89478",

                    "&.Mui-checked": {
                      color: "#B89478",
                    },
                  }}
                />
              }
              label={
                item === "COD"
                  ? "Cash on Delivery"
                  : item
              }
              sx={{
                color: darkMode ? "#E0E0E0" : "#444",
              }}
            />
          ))}
        </RadioGroup>

        <Divider
          sx={{
            borderColor: darkMode ? "#3A3A3A" : "#E7DDD2",
            my: 3,
          }}
        />

        {/* Sort By */}

        <Typography
          sx={{
            fontWeight: 600,
            mb: 2,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Sort By
        </Typography>

        <RadioGroup
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {[
            "Newest",
            "Oldest",
            "Amount Low → High",
            "Amount High → Low",
          ].map((item) => (
            <FormControlLabel
              key={item}
              value={item}
              control={
                <Radio
                  sx={{
                    color: darkMode ? "#888" : "#B89478",

                    "&.Mui-checked": {
                      color: "#B89478",
                    },
                  }}
                />
              }
              label={item}
              sx={{
                color: darkMode ? "#E0E0E0" : "#444",
              }}
            />
          ))}
        </RadioGroup>

        <Box sx={{ flexGrow: 1 }} />

        <Divider
          sx={{
            borderColor: darkMode ? "#3A3A3A" : "#E7DDD2",
            my: 3,
          }}
        />

        {/* Buttons */}

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

export default OrderFilter;