import React from "react";

import {
  Box,
  Typography,
  Button,
  Stack,
  Divider,
  Chip,
  Rating,
  Avatar,
} from "@mui/material";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";

// =====================================================
// VIEW REVIEW
// =====================================================

const ViewReview = ({
  review,
  onClose,
  darkMode,
}) => {
  if (!review) {
    return null;
  }

  // =====================================================
  // BACKEND DATA
  // =====================================================

  const reviewId =
    review._id ||
    review.id ||
    "-";

  const productName =
    review.productName ||
    "Product";

  const productImage =
    review.productImage ||
    review.image ||
    "";

  const productSize =
    review.productSize ||
    review.size ||
    "";

  const customerName =
    review.customerName ||
    review.userName ||
    "Customer";

  const customerEmail =
    review.customerEmail ||
    "";

  const customerPhone =
    review.customerPhone ||
    "";

  const reviewText =
    review.comment ||
    review.review ||
    "-";

  const rating =
    Number(review.rating) || 0;

  const orderNumber =
    review.orderNumber ||
    "";

  const createdAt =
    review.createdAt
      ? new Date(
          review.createdAt
        ).toLocaleString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }
        )
      : "-";

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <Box
      sx={{
        width: 400,
        maxWidth: "100%",
        height: "100vh",
        p: 4,
        overflowY: "auto",

        backgroundColor:
          darkMode
            ? "#252525"
            : "#FFFFFF",

        color:
          darkMode
            ? "#FFFFFF"
            : "#222",
      }}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        mb={3}
      >
        <Box
          onClick={onClose}
          sx={{
            width: 38,
            height: 38,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",

            "&:hover": {
              backgroundColor:
                darkMode
                  ? "#333"
                  : "#F5F1EC",
            },
          }}
        >
          <ArrowBackIosNewRoundedIcon
            sx={{
              fontSize: 19,
              color: "#B89478",
            }}
          />
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 700,
              color:
                darkMode
                  ? "#FFFFFF"
                  : "#222",
            }}
          >
            Review Details
          </Typography>

          <Typography
            sx={{
              mt: 0.3,
              fontSize: 12,
              color:
                darkMode
                  ? "#AFAFAF"
                  : "#888",
            }}
          >
            Review information
          </Typography>
        </Box>
      </Stack>

      <Divider
        sx={{
          mb: 3,
          borderColor:
            darkMode
              ? "#444"
              : "#EAEAEA",
        }}
      />

      {/* =================================================
          PRODUCT CARD
      ================================================= */}

      <Box
        sx={{
          p: 2,
          borderRadius: 3,
          mb: 3,

          backgroundColor:
            darkMode
              ? "#303030"
              : "#F8F5F1",

          border:
            darkMode
              ? "1px solid #444"
              : "1px solid #E6DED5",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <Avatar
            src={productImage}
            variant="rounded"
            sx={{
              width: 72,
              height: 72,
              borderRadius: 2,

              backgroundColor:
                darkMode
                  ? "#3A3A3A"
                  : "#EEE8E0",
            }}
          >
            <ShoppingBagOutlinedIcon />
          </Avatar>

          <Box
            sx={{
              minWidth: 0,
              flex: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 700,
                color:
                  darkMode
                    ? "#FFFFFF"
                    : "#222",
              }}
            >
              {productName}
            </Typography>

            {productSize && (
              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 13,
                  color:
                    darkMode
                      ? "#BDBDBD"
                      : "#777",
                }}
              >
                Size: {productSize}
              </Typography>
            )}

            {orderNumber && (
              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 12,
                  color:
                    darkMode
                      ? "#999"
                      : "#999",
                }}
              >
                Order #{orderNumber}
              </Typography>
            )}
          </Box>
        </Stack>
      </Box>

      {/* =================================================
          REVIEW INFORMATION
      ================================================= */}

      <Stack spacing={3}>

        {/* =================================================
            REVIEW ID
        ================================================= */}

        <Box>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            mb={0.8}
          >
            <RateReviewOutlinedIcon
              sx={{
                fontSize: 18,
                color: "#B89478",
              }}
            />

            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color:
                  darkMode
                    ? "#AFAFAF"
                    : "#777",
              }}
            >
              Review ID
            </Typography>
          </Stack>

          <Typography
            sx={{
              fontSize: 13,
              wordBreak: "break-all",
              color:
                darkMode
                  ? "#FFFFFF"
                  : "#333",
            }}
          >
            {reviewId}
          </Typography>
        </Box>

        {/* =================================================
            CUSTOMER
        ================================================= */}

        <Box>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            mb={1}
          >
            <PersonOutlineOutlinedIcon
              sx={{
                fontSize: 19,
                color: "#B89478",
              }}
            />

            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color:
                  darkMode
                    ? "#AFAFAF"
                    : "#777",
              }}
            >
              Customer
            </Typography>
          </Stack>

          <Box
            sx={{
              p: 2,
              borderRadius: 2.5,

              backgroundColor:
                darkMode
                  ? "#303030"
                  : "#FAF8F5",

              border:
                darkMode
                  ? "1px solid #444"
                  : "1px solid #E8E1D9",
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 600,
                color:
                  darkMode
                    ? "#FFFFFF"
                    : "#222",
              }}
            >
              {customerName}
            </Typography>

            {customerEmail && (
              <Typography
                sx={{
                  mt: 0.6,
                  fontSize: 13,
                  color:
                    darkMode
                      ? "#BDBDBD"
                      : "#666",
                }}
              >
                {customerEmail}
              </Typography>
            )}

            {customerPhone && (
              <Typography
                sx={{
                  mt: 0.4,
                  fontSize: 13,
                  color:
                    darkMode
                      ? "#BDBDBD"
                      : "#666",
                }}
              >
                {customerPhone}
              </Typography>
            )}
          </Box>
        </Box>

        {/* =================================================
            RATING
        ================================================= */}

        <Box>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              mb: 1,
              color:
                darkMode
                  ? "#AFAFAF"
                  : "#777",
            }}
          >
            Rating
          </Typography>

          <Stack
            direction="row"
            spacing={1.2}
            alignItems="center"
          >
            <Rating
              value={rating}
              readOnly
              precision={1}
              size="medium"
            />

            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 600,
                color:
                  darkMode
                    ? "#FFFFFF"
                    : "#444",
              }}
            >
              {rating}/5
            </Typography>
          </Stack>
        </Box>

        {/* =================================================
            REVIEW TEXT
        ================================================= */}

        <Box>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              mb: 1,
              color:
                darkMode
                  ? "#AFAFAF"
                  : "#777",
            }}
          >
            Customer Review
          </Typography>

          <Box
            sx={{
              p: 2.2,
              borderRadius: 2.5,

              backgroundColor:
                darkMode
                  ? "#303030"
                  : "#FAF8F5",

              border:
                darkMode
                  ? "1px solid #444"
                  : "1px solid #E8E1D9",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: 1.8,
                color:
                  darkMode
                    ? "#F1F1F1"
                    : "#333",
                whiteSpace:
                  "pre-wrap",
                wordBreak:
                  "break-word",
              }}
            >
              {reviewText}
            </Typography>
          </Box>
        </Box>

        {/* =================================================
            REVIEW DATE
        ================================================= */}

        <Box>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            mb={1}
          >
            <CalendarTodayOutlinedIcon
              sx={{
                fontSize: 17,
                color: "#B89478",
              }}
            />

            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color:
                  darkMode
                    ? "#AFAFAF"
                    : "#777",
              }}
            >
              Review Date
            </Typography>
          </Stack>

          <Typography
            sx={{
              fontSize: 14,
              color:
                darkMode
                  ? "#FFFFFF"
                  : "#333",
            }}
          >
            {createdAt}
          </Typography>
        </Box>
      </Stack>

      {/* =================================================
          BACK BUTTON
      ================================================= */}

      <Button
        fullWidth
        variant="contained"
        onClick={onClose}
        startIcon={
          <ArrowBackIosNewRoundedIcon
            sx={{
              fontSize:
                "16px !important",
            }}
          />
        }
        sx={{
          mt: 5,
          mb: 2,
          height: 45,

          backgroundColor:
            "#B89478",

          textTransform:
            "none",

          borderRadius: 2,

          fontWeight: 600,

          boxShadow: "none",

          "&:hover": {
            backgroundColor:
              "#A88366",
            boxShadow: "none",
          },
        }}
      >
        Back
      </Button>
    </Box>
  );
};

export default ViewReview;