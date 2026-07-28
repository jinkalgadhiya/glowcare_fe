import React from "react";
import { Box, Typography, Button, Stack, Divider, Chip } from "@mui/material";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const ViewCategory = ({ category, onClose, onEdit, onDelete, darkMode }) => {
  if (!category) return null;

  return (
    <Box
      sx={{
        width: 380,
        height: "100vh",
        p: 4,
        backgroundColor: darkMode ? "#252525" : "#fff",
        overflowY: "auto",
      }}
    >
      {/* Header */}

      <Stack direction="row" spacing={2} alignItems="center" mb={4}>
        <ArrowBackIosNewRoundedIcon
          sx={{
            color: "#4F6BFF",
            fontSize: 22,
          }}
        />

        <Typography
          variant="h4"
          sx={{
            fontWeight: 500,
            color: darkMode ? "#ffffff" : "#222",
          }}
        >
          Category Details
        </Typography>
      </Stack>

      {/* Buttons */}

      <Divider sx={{ mb: 4 }} />

      {/* Details */}

      <Stack spacing={4}>
        <Box>
          <Typography
            sx={{
              fontSize: 15,
              color: darkMode ? "#AFAFAF" : "#777",
            }}
          >
            Category ID
          </Typography>

          <Typography
            mt={1}
            sx={{
              fontWeight: 500,
              color: darkMode ? "#ffffff" : "#222",
            }}
          >
            {category.id}
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: 13,
              color: darkMode ? "#AFAFAF" : "#777",
            }}
          >
            Category Name
          </Typography>

          <Typography
            mt={1}
            sx={{
              fontSize: 18,
              fontWeight: 500,
              color: darkMode ? "#ffffff" : "#222",
            }}
          >
            {category.name}
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: 13,
              color: darkMode ? "#AFAFAF" : "#777",
            }}
          >
            Description
          </Typography>

          <Typography
            mt={1}
            sx={{
              fontSize: 18,
              fontWeight: 500,
              color: darkMode ? "#ffffff" : "#222",
            }}
          >
            {category.description || "-"}
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: 13,
              color: darkMode ? "#AFAFAF" : "#777",
            }}
          >
            Status
          </Typography>

          <Box mt={1}>
            <Chip
              label={category.status}
              color={category.status === "Active" ? "success" : "default"}
              size="small"
            />
          </Box>
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: 13,
              color: darkMode ? "#AFAFAF" : "#777",
            }}
          >
            Created At
          </Typography>

          <Typography
            mt={1}
            sx={{
              fontSize: 18,
              fontWeight: 500,
              color: darkMode ? "#ffffff" : "#222",
            }}
          >
            {category.createdAt}
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: 13,
              color: darkMode ? "#AFAFAF" : "#777",
            }}
          >
            Total Products
          </Typography>

          <Typography
            mt={1}
            sx={{
              fontSize: 18,
              fontWeight: 500,
              color: darkMode ? "#ffffff" : "#222",
            }}
          >
            {category.productCount || 0}
          </Typography>
        </Box>
      </Stack>

      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 6,
          bgcolor: "#B89478",
          textTransform: "none",
          borderRadius: 2,
          boxShadow: "none",

          "&:hover": {
            bgcolor: "#A88366",
            boxShadow: "none",
          },
        }}
        onClick={onClose}
      >
        Back
      </Button>
    </Box>
  );
};

export default ViewCategory;
