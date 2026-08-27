import React from "react";
import { Box, Typography, Button, Stack, Divider, Chip } from "@mui/material";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

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
          onClick={onClose}
          sx={{
            color: "#A88366",
            fontSize: 22,
            cursor: "pointer",
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

      <Divider sx={{ mb: 4, mt: 4 }} />

      {/* Details */}

      <Stack spacing={4}>
        <Box>
          <Typography
            sx={{
              fontSize: 13,
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
            Menu Type
          </Typography>

          <Typography
            mt={1}
            sx={{
              fontSize: 18,
              fontWeight: 500,
              color: darkMode ? "#ffffff" : "#222",
              textTransform: "capitalize",
            }}
          >
            {category.menuType || "-"}
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: 13,
              color: darkMode ? "#AFAFAF" : "#777",
            }}
          >
            Category Type
          </Typography>

          <Typography
            mt={1}
            sx={{
              fontSize: 18,
              fontWeight: 500,
              color: darkMode ? "#ffffff" : "#222",
              textTransform: "capitalize",
            }}
          >
            {category.categoryType || "-"}
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: 13,
              color: darkMode ? "#AFAFAF" : "#777",
            }}
          >
            Main Category
          </Typography>

          <Typography
            mt={1}
            sx={{
              fontSize: 18,
              fontWeight: 500,
              color: darkMode ? "#ffffff" : "#222",
            }}
          >
            {category.mainCategory || "-"}
          </Typography>
        </Box>

        {category.categoryType === "sub" && (
          <>
            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  color: darkMode ? "#AFAFAF" : "#777",
                }}
              >
                Sub Category
              </Typography>

              <Typography
                mt={1}
                sx={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: darkMode ? "#ffffff" : "#222",
                }}
              >
                {category.subCategory || "-"}
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
                  fontSize: 16,
                  lineHeight: 1.7,
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
                  mb: 1,
                }}
              >
                Banner Image
              </Typography>

              {category.bannerImage ? (
                <Box
                  component="img"
                  src={category.bannerImage}
                  alt={category.subCategory}
                  sx={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                    borderRadius: 2,
                    border: darkMode ? "1px solid #444" : "1px solid #EAEAEA",
                  }}
                />
              ) : (
                <Typography color="text.secondary">
                  No banner image available
                </Typography>
              )}
            </Box>
          </>
        )}

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
            {category.createdAt
              ? new Date(category.createdAt).toLocaleString()
              : "-"}
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
