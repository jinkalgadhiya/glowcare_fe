import React, { useState } from "react";

import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  TextField,
  Button,
  Avatar,
  IconButton,
  Rating,
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";

// =====================================================
// REVIEW DIALOG
// =====================================================

const ReviewDialog = ({
  open,
  onClose,
  product,
  order,
  onSubmit,
}) => {
  const [rating, setRating] = useState(0);

  const [reviewText, setReviewText] =
    useState("");

  const [error, setError] = useState("");

  const [submitting, setSubmitting] =
    useState(false);

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setRating(0);
    setReviewText("");
    setError("");
  };

  // =====================================================
  // CLOSE
  // =====================================================

  const handleClose = () => {
    if (submitting) {
      return;
    }

    resetForm();
    onClose();
  };

  // =====================================================
  // SUBMIT REVIEW
  // =====================================================

  const handleSubmit = async () => {
    // =================================================
    // RATING VALIDATION
    // =================================================

    if (!rating) {
      setError("Please select a rating.");
      return;
    }

    // =================================================
    // REVIEW VALIDATION
    // =================================================

    const trimmedReview =
      reviewText.trim();

    if (!trimmedReview) {
      setError("Please write a review.");
      return;
    }

    // =================================================
    // MINIMUM LENGTH
    // =================================================

    if (trimmedReview.length < 10) {
      setError(
        "Review should contain at least 10 characters."
      );
      return;
    }

    // =================================================
    // MAXIMUM LENGTH
    // =================================================

    if (trimmedReview.length > 500) {
      setError(
        "Review cannot exceed 500 characters."
      );
      return;
    }

    // =================================================
    // PRODUCT CHECK
    // =================================================

    if (!product) {
      setError(
        "Product information is missing."
      );
      return;
    }

    // =================================================
    // ORDER CHECK
    // =================================================

    if (!order) {
      setError(
        "Order information is missing."
      );
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      // =================================================
      // ONLY FORM DATA
      // =================================================
      //
      // OrderDetails will add:
      // - orderId
      // - orderNumber
      // - productId
      // - productName
      // - productImage
      // - customer information
      //
      // =================================================

      const reviewData = {
        rating: Number(rating),
        comment: trimmedReview,
      };

      console.log(
        "⭐ REVIEW FORM DATA:",
        reviewData
      );

      // =================================================
      // SEND TO PARENT
      // =================================================

      if (!onSubmit) {
        throw new Error(
          "Review submission handler is missing."
        );
      }

      await onSubmit(reviewData);

      // =================================================
      // SUCCESS
      // =================================================

      console.log(
        "✅ Review submitted successfully."
      );

      resetForm();

    } catch (error) {
      console.error(
        "❌ REVIEW SUBMISSION ERROR:",
        error
      );

      // =================================================
      // IMPORTANT
      // =================================================
      //
      // Your reviewService uses:
      //
      // throw new Error(data.message)
      //
      // Therefore we need error.message
      //
      // =================================================

      const errorMessage =
        error?.message ||
        "Unable to submit your review. Please try again.";

      setError(errorMessage);

    } finally {
      setSubmitting(false);
    }
  };

  // =====================================================
  // PRODUCT DATA
  // =====================================================

  const productName =
    product?.name ||
    product?.productName ||
    "Product";

  const productImage =
    product?.image ||
    product?.thumbnail ||
    product?.images?.[0] ||
    "";

  const productSize =
    product?.size || "";

  // =====================================================
  // ORDER DATA
  // =====================================================

  const orderNumber =
    order?.orderNumber ||
    "";

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "22px",
          overflow: "hidden",

          backgroundColor:
            "#FFFDFC",

          border:
            "1px solid #E5DED4",

          boxShadow:
            "0 24px 70px rgba(30,47,43,0.20)",
        },
      }}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <Box
        sx={{
          px: {
            xs: 3,
            sm: 4,
          },

          py: 2,

          background:
            "linear-gradient(135deg, #F3EBDD 0%, #E8DDCC 100%)",

          borderBottom:
            "1px solid #DED3C4",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems:
              "flex-start",

            justifyContent:
              "space-between",

            gap: 2,
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <RateReviewOutlinedIcon
                sx={{
                  color: "#1E2F2B",
                  fontSize: 22,
                }}
              />

              <Typography
                sx={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#1E2F2B",
                }}
              >
                Write a Review
              </Typography>
            </Box>

            <Typography
              sx={{
                mt: 0.7,
                fontSize: 13,
                color: "#756E65",
              }}
            >
              Share your experience
              with this product.
            </Typography>
          </Box>

          <IconButton
            onClick={handleClose}
            disabled={submitting}
            sx={{
              color: "#5F5952",

              width: 38,
              height: 38,

              "&:hover": {
                backgroundColor:
                  "rgba(30,47,43,0.08)",
              },
            }}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
      </Box>

      {/* =================================================
          CONTENT
      ================================================= */}

      <DialogContent
        sx={{
          p: {
            xs: 3,
            sm: 4,
          },
        }}
      >
        {/* =================================================
            PRODUCT
        ================================================= */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,

            p: 2,
            mb: 3,

            borderRadius: 2.5,

            backgroundColor:
              "#F8F6F2",

            border:
              "1px solid #E8E0D6",
          }}
        >
          <Avatar
            src={productImage}
            variant="rounded"
            sx={{
              width: 70,
              height: 70,

              borderRadius: 2,

              backgroundColor:
                "#EFE8DE",
            }}
          />

          <Box
            sx={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 700,
                color: "#1E2F2B",
              }}
            >
              {productName}
            </Typography>

            {productSize && (
              <Typography
                sx={{
                  mt: 0.4,
                  fontSize: 13,
                  color: "#777",
                }}
              >
                Size: {productSize}
              </Typography>
            )}

            {orderNumber && (
              <Typography
                sx={{
                  mt: 0.3,
                  fontSize: 12,
                  color: "#999",
                }}
              >
                Order #{orderNumber}
              </Typography>
            )}
          </Box>
        </Box>

        {/* =================================================
            RATING
        ================================================= */}

        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 700,
            color: "#333",
            mb: 1.2,
          }}
        >
          How would you rate
          this product?
        </Typography>

        <Rating
          value={rating}
          onChange={(
            event,
            newValue
          ) => {
            setRating(
              newValue || 0
            );

            setError("");
          }}
          size="large"
          disabled={submitting}
          sx={{
            mb: 3,

            "& .MuiRating-iconFilled": {
              color: "#B48A4A",
            },

            "& .MuiRating-iconHover": {
              color: "#B48A4A",
            },
          }}
        />

        {/* =================================================
            REVIEW TEXT
        ================================================= */}

        <TextField
          fullWidth
          multiline
          minRows={5}
          disabled={submitting}
          label="Your Review"
          placeholder="Tell us about your experience with this product..."
          value={reviewText}
          onChange={(e) => {
            setReviewText(
              e.target.value
            );

            setError("");
          }}
          error={Boolean(error)}
          helperText={
            error ||
            `${reviewText.length}/500`
          }
          inputProps={{
            maxLength: 500,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "13px",

              backgroundColor:
                "#FAF7F2",

              "& fieldset": {
                borderColor:
                  "#DDD4C8",
              },

              "&:hover fieldset": {
                borderColor:
                  "#BBAFA2",
              },

              "&.Mui-focused fieldset": {
                borderColor:
                  "#1E2F2B",
              },
            },

            "& .MuiInputLabel-root.Mui-focused":
              {
                color:
                  "#1E2F2B",
              },
          }}
        />

        {/* =================================================
            NOTE
        ================================================= */}

        <Typography
          sx={{
            mt: 1.5,
            fontSize: 12,
            lineHeight: 1.6,
            color: "#888",
          }}
        >
          Your review may be
          reviewed by GlowCare
          before it appears
          publicly.
        </Typography>

        {/* =================================================
            BUTTONS
        ================================================= */}

        <Box
          sx={{
            display: "flex",
            justifyContent:
              "flex-end",

            gap: 1.5,

            mt: 3,
            pt: 2.5,

            borderTop:
              "1px solid #E9E1D7",
          }}
        >
          <Button
            onClick={handleClose}
            disabled={submitting}
            variant="outlined"
            sx={{
              minWidth: 105,
              height: 44,

              borderRadius: "12px",

              textTransform:
                "none",

              fontWeight: 600,

              color: "#5F5952",

              borderColor:
                "#D6CCC0",

              "&:hover": {
                backgroundColor:
                  "#F6F1EA",

                borderColor:
                  "#C8BCAF",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={submitting}
            variant="contained"
            sx={{
              minWidth: 145,
              height: 44,

              borderRadius: "12px",

              textTransform:
                "none",

              fontWeight: 600,

              backgroundColor:
                "#1E2F2B",

              boxShadow: "none",

              "&:hover": {
                backgroundColor:
                  "#294039",

                boxShadow:
                  "0 6px 18px rgba(30,47,43,0.15)",
              },
            }}
          >
            {submitting
              ? "Submitting..."
              : "Submit Review"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;