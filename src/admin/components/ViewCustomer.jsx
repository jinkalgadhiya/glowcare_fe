import React from "react";
import {
  Box,
  Typography,
  Divider,
  Avatar,
  Chip,
  IconButton,
  Stack,
  Button,
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { useThemeContext } from "../context/ThemeContext";

const ViewCustomer = ({ customer, onClose }) => {
  const { darkMode } = useThemeContext();

  if (!customer) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "success";

      case "Inactive":
        return "warning";

      default:
        return "default";
    }
  };

  return (
    <Box
      sx={{
        width: 380,
        height: "100vh",
        backgroundColor: darkMode ? "#252525" : "#fff",
        overflowY: "auto",
      }}
    >
      {/* Header */}

      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid",
          borderColor: darkMode ? "#444" : "#eee",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Customer Details
        </Typography>

        <IconButton
          onClick={onClose}
          sx={{
            color: darkMode ? "#fff" : "#222",
          }}
        >
          <CloseOutlinedIcon />
        </IconButton>
      </Box>

      {/* Content */}

      <Box sx={{ p: 3 }}>
        {/* Profile */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Avatar
            src={customer.image}
            sx={{
              width: 90,
              height: 90,
              mb: 2,
            }}
          >
            {customer.fullName?.charAt(0)}
          </Avatar>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: darkMode ? "#fff" : "#222",
            }}
          >
            {customer.fullName}
          </Typography>

          <Typography
            sx={{
              color: darkMode ? "#B5B5B5" : "#777",
              mt: 0.5,
            }}
          >
            {customer.email}
          </Typography>

          <Chip
            label={customer.status}
            color={getStatusColor(customer.status)}
            sx={{ mt: 2 }}
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Personal Information */}

        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 700,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Personal Information
        </Typography>

        <Stack spacing={3}>
          <Box>
            <Typography
              sx={{
                fontSize: 13,
                color: darkMode ? "#AFAFAF" : "#777",
              }}
            >
              Full Name
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: darkMode ? "#fff" : "#222",
              }}
            >
              {customer.fullName}
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 13,
                color: darkMode ? "#AFAFAF" : "#777",
              }}
            >
              Email
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: darkMode ? "#fff" : "#222",
              }}
            >
              {customer.email}
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 13,
                color: darkMode ? "#AFAFAF" : "#777",
              }}
            >
              Phone
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: darkMode ? "#fff" : "#222",
              }}
            >
              {customer.contactNumber || "-"}
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 13,
                color: darkMode ? "#AFAFAF" : "#777",
              }}
            >
              Joined Date
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: darkMode ? "#fff" : "#222",
              }}
            >
              {customer.createdAt
  ? new Date(customer.createdAt).toLocaleDateString()
  : "-"}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Shopping Summary */}

        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 700,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Shopping Summary
        </Typography>

        <Stack spacing={2}>
          <Typography
            sx={{
              color: darkMode ? "#fff" : "#222",
            }}
          >
            Total Orders : {customer.totalOrders || 0}
          </Typography>

          <Typography
            sx={{
              color: darkMode ? "#fff" : "#222",
            }}
          >
            Total Spent : ₹{customer.totalSpent || 0}
          </Typography>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Address */}

        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 700,
            color: darkMode ? "#fff" : "#222",
          }}
        >
          Address
        </Typography>

        <Typography
          sx={{
            color: darkMode ? "#fff" : "#222",
            lineHeight: 1.8,
          }}
        >
          {customer.address?.street || "-"}
          <br />
          {customer.address?.city || ""},{" "}
          {customer.address?.state || ""}
          <br />
          {customer.address?.pincode || ""}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          sx={{
            mt: 5,
            bgcolor: "#B89478",
            textTransform: "none",
            borderRadius: 2,
            boxShadow: "none",

            "&:hover": {
              bgcolor: "#A88366",
              boxShadow: "none",
            },
          }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default ViewCustomer;