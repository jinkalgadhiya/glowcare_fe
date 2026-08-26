import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Divider,
  Stack,
  Box,
  Rating,
  Avatar,
} from "@mui/material";

import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import { deleteReview } from "../../../database/reviewService";
import { useThemeContext } from "../../context/ThemeContext";

const DeleteReview = ({
  open,
  onClose,
  review,
  setReviews,
}) => {
  const { darkMode } = useThemeContext();

  const [isDeleting, setIsDeleting] =
    useState(false);

  const handleDelete = async () => {
    if (!review || isDeleting) return;

    try {
      setIsDeleting(true);

      await deleteReview(review.id);

      setReviews((prev) =>
        prev.filter(
          (item) => item.id !== review.id
        )
      );

      onClose();
    } catch (error) {
      console.error(
        "Error deleting review:",
        error
      );
    } finally {
      setIsDeleting(false);
    }
  };

  if (!review) return null;

  return (
    <Dialog
      open={open}
      onClose={
        isDeleting ? undefined : onClose
      }
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: darkMode
            ? "#252525"
            : "#FFFFFF",
          color: darkMode
            ? "#FFFFFF"
            : "#222",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          color: "#D32F2F",
          fontWeight: 700,
        }}
      >
        <WarningAmberRoundedIcon
          sx={{ fontSize: 34 }}
        />
        Delete Review
      </DialogTitle>

      <Divider
        sx={{
          borderColor: darkMode
            ? "#3A3A3A"
            : "#E7DDD2",
        }}
      />

      <DialogContent>
        <Typography
          sx={{
            fontSize: 16,
            color: darkMode
              ? "#FFFFFF"
              : "#222",
          }}
        >
          Are you sure you want to delete
          this review?
        </Typography>

        <Typography
          sx={{
            mt: 2,
            color: darkMode
              ? "#BDBDBD"
              : "#777",
          }}
        >
          This action cannot be undone.
        </Typography>

        <Box
          sx={{
            mt: 4,
            p: 2,
            borderRadius: 2,
            backgroundColor: darkMode
              ? "#1E1E1E"
              : "#F7F5F2",
            border: "1px solid",
            borderColor: darkMode
              ? "#3A3A3A"
              : "#E7DDD2",
          }}
        >
          <Stack spacing={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Avatar
                src={review.userImage}
                sx={{
                  width: 56,
                  height: 56,
                }}
              />

              <Box>
                <Typography
                  fontWeight={600}
                  sx={{
                    color: darkMode
                      ? "#FFFFFF"
                      : "#222",
                  }}
                >
                  {review.userName ||
                    "Customer"}
                </Typography>

                <Typography
                  fontSize={13}
                  sx={{
                    color: darkMode
                      ? "#AFAFAF"
                      : "#777",
                  }}
                >
                  {review.email || "-"}
                </Typography>
              </Box>
            </Box>

            <Box>
              <Typography
                fontSize={13}
                sx={{
                  color: darkMode
                    ? "#AFAFAF"
                    : "#777",
                }}
              >
                Product
              </Typography>

              <Typography
                fontWeight={600}
                sx={{
                  color: darkMode
                    ? "#FFFFFF"
                    : "#222",
                }}
              >
                {review.productName || "-"}
              </Typography>
            </Box>

            <Box>
              <Typography
                fontSize={13}
                sx={{
                  color: darkMode
                    ? "#AFAFAF"
                    : "#777",
                  mb: 1,
                }}
              >
                Rating
              </Typography>

              <Rating
                value={review.rating || 0}
                readOnly
              />
            </Box>

            <Box>
              <Typography
                fontSize={13}
                sx={{
                  color: darkMode
                    ? "#AFAFAF"
                    : "#777",
                }}
              >
                Review
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  color: darkMode
                    ? "#FFFFFF"
                    : "#222",
                }}
              >
                {review.review ||
                  review.comment ||
                  "-"}
              </Typography>
            </Box>

            <Box>
              <Typography
                fontSize={13}
                sx={{
                  color: darkMode
                    ? "#AFAFAF"
                    : "#777",
                }}
              >
                Date
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  color: darkMode
                    ? "#FFFFFF"
                    : "#222",
                }}
              >
                {review.createdAt
                  ? new Date(
                      review.createdAt
                    ).toLocaleString()
                  : "-"}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </DialogContent>

      <Divider
        sx={{
          borderColor: darkMode
            ? "#3A3A3A"
            : "#E7DDD2",
        }}
      />

      <DialogActions
        sx={{
          p: 3,
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={isDeleting}
          sx={{
            minWidth: 120,
            textTransform: "none",
            borderRadius: 2,
            color: "#B89478",
            borderColor: "#B89478",
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          disabled={isDeleting}
          sx={{
            minWidth: 150,
            textTransform: "none",
            borderRadius: 2,
            boxShadow: "none",
          }}
        >
          {isDeleting
            ? "Deleting..."
            : "Delete Review"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteReview;