import React, { useState } from "react";

import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Avatar,
  Box,
  CircularProgress,
} from "@mui/material";

import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { useThemeContext } from "../../context/ThemeContext";

import { deleteReview } from "../../../database/reviewService";

// =====================================================
// REVIEWS TABLE
// =====================================================

const ReviewsTable = ({
  reviews = [],
  setSelectedReview,
  onDelete,
}) => {
  const { darkMode } = useThemeContext();

  const [anchorEl, setAnchorEl] =
    useState(null);

  const [selectedRow, setSelectedRow] =
    useState(null);

  const [deleting, setDeleting] =
    useState(false);

  const open = Boolean(anchorEl);

  // =====================================================
  // OPEN MENU
  // =====================================================

  const handleMenu = (
    event,
    review
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(review);
  };

  // =====================================================
  // CLOSE MENU
  // =====================================================

  const handleClose = () => {
    setAnchorEl(null);
  };

  // =====================================================
  // GET REVIEW ID
  // =====================================================

  const getReviewId = (review) => {
    return (
      review?._id ||
      review?.id
    );
  };

  // =====================================================
  // DELETE REVIEW
  // =====================================================

  const handleDelete = async () => {
    if (!selectedRow) {
      return;
    }

    const reviewId =
      getReviewId(selectedRow);

    if (!reviewId) {
      console.error(
        "Review ID not found"
      );

      handleClose();
      return;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this review?"
      );

    if (!confirmed) {
      handleClose();
      return;
    }

    try {
      setDeleting(true);

      // ================================================
      // DELETE FROM BACKEND / MONGODB
      // ================================================

      await deleteReview(
        reviewId
      );

      console.log(
        "Review deleted successfully:",
        reviewId
      );

      // ================================================
      // UPDATE PARENT LIST
      // ================================================

      if (onDelete) {
        await onDelete(
          selectedRow
        );
      }

      handleClose();

    } catch (error) {
      console.error(
        "Failed to delete review:",
        error
      );

      alert(
        error.message ||
          "Failed to delete review."
      );

    } finally {
      setDeleting(false);
      setSelectedRow(null);
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        mt: 4,
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: darkMode
          ? "#252525"
          : "#fff",
      }}
    >
      <Table
        sx={{
          minWidth: 1000,

          "& .MuiTableCell-root": {
            color: darkMode
              ? "#F5F5F5"
              : "#222",

            borderBottom:
              darkMode
                ? "1px solid #454545"
                : "1px solid #EAEAEA",
          },
        }}
      >
        {/* =================================================
            TABLE HEAD
        ================================================= */}

        <TableHead>
          <TableRow
            sx={{
              bgcolor: darkMode
                ? "#303030"
                : "#F8F5F1",
            }}
          >
            {[
              "#",
              "Product",
              "Customer",
              "Rating",
              "Review",
              "Date",
              "Actions",
            ].map((item) => (
              <TableCell
                key={item}
                align={
                  item === "Actions"
                    ? "center"
                    : "left"
                }
                sx={{
                  fontWeight: 700,
                  fontSize: 14,
                  whiteSpace:
                    "nowrap",
                }}
              >
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* =================================================
            TABLE BODY
        ================================================= */}

        <TableBody>
          {reviews.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                align="center"
                sx={{
                  py: 8,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: darkMode
                      ? "#FFFFFF"
                      : "#555",
                    fontWeight: 600,
                  }}
                >
                  No reviews found
                </Typography>

                <Typography
                  sx={{
                    mt: 1,
                    color: darkMode
                      ? "#BDBDBD"
                      : "#888",
                  }}
                >
                  Reviews submitted by
                  customers will appear
                  here.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            reviews.map(
              (
                review,
                index
              ) => {
                const reviewId =
                  getReviewId(
                    review
                  );

                const reviewText =
                  review.comment ||
                  review.review ||
                  "";

                const customerName =
                  review.customerName ||
                  review.userName ||
                  "Customer";

                const customerImage =
                  review.customerImage ||
                  review.userImage ||
                  "";

                return (
                  <TableRow
                    key={
                      reviewId ||
                      index
                    }
                    hover
                    sx={{
                      transition:
                        ".25s",

                      "&:hover": {
                        bgcolor:
                          darkMode
                            ? "#2F2F2F"
                            : "#FAF7F4",
                      },
                    }}
                  >
                    {/* ======================================
                        #
                    ====================================== */}

                    <TableCell>
                      {index + 1}
                    </TableCell>

                    {/* ======================================
                        PRODUCT
                    ====================================== */}

                    <TableCell>
                      <Box
                        sx={{
                          display:
                            "flex",
                          alignItems:
                            "center",
                          gap: 1.2,
                        }}
                      >
                        <Avatar
                          src={
                            review.productImage ||
                            ""
                          }
                          variant="rounded"
                          sx={{
                            width: 42,
                            height: 42,
                            borderRadius: 1.5,
                            bgcolor:
                              darkMode
                                ? "#3A3A3A"
                                : "#F2EEE8",
                          }}
                        />

                        <Box>
                          <Typography
                            fontWeight={
                              600
                            }
                            sx={{
                              maxWidth: 220,
                            }}
                          >
                            {review.productName ||
                              "Product"}
                          </Typography>

                          {review.productSize && (
                            <Typography
                              sx={{
                                fontSize: 12,
                                color:
                                  darkMode
                                    ? "#AAA"
                                    : "#888",
                                mt: 0.3,
                              }}
                            >
                              Size:{" "}
                              {
                                review.productSize
                              }
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </TableCell>

                    {/* ======================================
                        CUSTOMER
                    ====================================== */}

                    <TableCell>
                      <Box
                        sx={{
                          display:
                            "flex",
                          alignItems:
                            "center",
                          gap: 1,
                        }}
                      >
                        <Avatar
                          src={
                            customerImage
                          }
                          sx={{
                            width: 34,
                            height: 34,
                          }}
                        >
                          {customerName
                            ?.charAt(
                              0
                            )
                            ?.toUpperCase()}
                        </Avatar>

                        <Box>
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: 500,
                            }}
                          >
                            {
                              customerName
                            }
                          </Typography>

                          {review.customerEmail && (
                            <Typography
                              sx={{
                                fontSize: 11,
                                color:
                                  darkMode
                                    ? "#AAA"
                                    : "#888",
                              }}
                            >
                              {
                                review.customerEmail
                              }
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </TableCell>

                    {/* ======================================
                        RATING
                    ====================================== */}

                    <TableCell>
                      <Rating
                        value={
                          Number(
                            review.rating
                          ) || 0
                        }
                        readOnly
                        size="small"
                      />
                    </TableCell>

                    {/* ======================================
                        REVIEW
                    ====================================== */}

                    <TableCell
                      sx={{
                        maxWidth: 280,
                      }}
                    >
                      <Typography
                        sx={{
                          maxWidth: 280,
                          whiteSpace:
                            "nowrap",
                          overflow:
                            "hidden",
                          textOverflow:
                            "ellipsis",
                          fontSize: 14,
                        }}
                      >
                        {reviewText ||
                          "-"}
                      </Typography>
                    </TableCell>

                    {/* ======================================
                        DATE
                    ====================================== */}

                    <TableCell>
                      {review.createdAt
                        ? new Date(
                            review.createdAt
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month:
                                "short",
                              year: "numeric",
                            }
                          )
                        : "-"}
                    </TableCell>

                    {/* ======================================
                        ACTIONS
                    ====================================== */}

                    <TableCell
                      align="center"
                    >
                      <IconButton
                        onClick={(e) =>
                          handleMenu(
                            e,
                            review
                          )
                        }
                        disabled={
                          deleting
                        }
                        sx={{
                          color:
                            darkMode
                              ? "#F5F5F5"
                              : "#444",
                        }}
                      >
                        <MoreHorizOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              }
            )
          )}
        </TableBody>
      </Table>

      {/* =================================================
          ACTION MENU
      ================================================= */}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 200,
            mt: 1,
            borderRadius: 2,

            bgcolor: darkMode
              ? "#2B2B2B"
              : "#FFFFFF",

            color: darkMode
              ? "#FFFFFF"
              : "#222",
          },
        }}
      >
        {/* ================================================
            VIEW REVIEW
        ================================================ */}

        <MenuItem
          onClick={() => {
            if (
              setSelectedReview &&
              selectedRow
            ) {
              setSelectedReview(
                selectedRow
              );
            }

            handleClose();
          }}
        >
          <ListItemIcon>
            <VisibilityOutlinedIcon
              fontSize="small"
            />
          </ListItemIcon>

          <ListItemText>
            View Review
          </ListItemText>
        </MenuItem>

        {/* ================================================
            DELETE REVIEW
        ================================================ */}

        <MenuItem
          onClick={
            handleDelete
          }
          disabled={deleting}
          sx={{
            color: "#EF5350",
          }}
        >
          <ListItemIcon
            sx={{
              color: "#EF5350",
            }}
          >
            {deleting ? (
              <CircularProgress
                size={18}
                sx={{
                  color:
                    "#EF5350",
                }}
              />
            ) : (
              <DeleteOutlineOutlinedIcon
                fontSize="small"
              />
            )}
          </ListItemIcon>

          <ListItemText>
            {deleting
              ? "Deleting..."
              : "Delete Review"}
          </ListItemText>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default ReviewsTable;