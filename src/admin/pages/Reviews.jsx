import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Box,
  Drawer,
  Pagination,
  CircularProgress,
  Typography,
} from "@mui/material";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

import ReviewHeader from "../components/review/ReviewHeader";
import ReviewTable from "../components/review/ReviewTable";
import ReviewFilter from "../components/review/ReviewFilter";
import ViewReview from "../components/review/ViewReview";
import DeleteReview from "../components/review/DeleteReview";

import { useThemeContext } from "../context/ThemeContext";

// =====================================================
// BACKEND REVIEW SERVICE
// =====================================================

import { getReviews } from "../../database/reviewService";

// =====================================================
// REVIEWS PAGE
// =====================================================

const Reviews = () => {
  const { darkMode } =
    useThemeContext();

  // =====================================================
  // REVIEWS
  // =====================================================

  const [reviews, setReviews] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =====================================================
  // SEARCH
  // =====================================================

  const [searchTerm, setSearchTerm] =
    useState("");

  // =====================================================
  // PAGINATION
  // =====================================================

  const [page, setPage] =
    useState(1);

  const rowsPerPage = 20;

  // =====================================================
  // SELECTED REVIEW
  // =====================================================

  const [selectedReview, setSelectedReview] =
    useState(null);

  // =====================================================
  // DELETE
  // =====================================================

  const [openDelete, setOpenDelete] =
    useState(false);

  // =====================================================
  // FILTER DRAWER
  // =====================================================

  const [filterOpen, setFilterOpen] =
    useState(false);

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [ratingFilter, setRatingFilter] =
    useState("All");

  const [productFilter, setProductFilter] =
    useState("");

  const [customerFilter, setCustomerFilter] =
    useState("");

  const [sortBy, setSortBy] =
    useState("Newest");

  // =====================================================
  // LOAD REVIEWS FROM BACKEND
  // =====================================================

  const loadReviews = async () => {
  try {
    setLoading(true);
    setError("");

    const data = await getReviews();

    console.log("Reviews loaded from backend:", data);

    setReviews(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error("Failed to load reviews:", error);

    setError(
      error.message || "Failed to load reviews."
    );

    setReviews([]);
  } finally {
    setLoading(false);
  }
};

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    loadReviews();
  }, []);

  // =====================================================
  // RESET PAGE WHEN FILTER CHANGES
  // =====================================================

  useEffect(() => {
    setPage(1);
  }, [
    searchTerm,
    statusFilter,
    ratingFilter,
    productFilter,
    customerFilter,
    sortBy,
  ]);

  // =====================================================
  // FILTER + SEARCH + SORT
  // =====================================================

  const filteredReviews =
    useMemo(() => {
      let filtered = [
        ...reviews,
      ];

      // ================================================
      // SEARCH
      // ================================================

      if (
        searchTerm.trim()
      ) {
        const search =
          searchTerm
            .toLowerCase()
            .trim();

        filtered =
          filtered.filter(
            (review) => {
              const customerName =
                review.customerName ||
                review.userName ||
                "";

              const productName =
                review.productName ||
                "";

              const comment =
                review.comment ||
                review.review ||
                "";

              const customerEmail =
                review.customerEmail ||
                "";

              return (
                `${customerName}
                 ${productName}
                 ${comment}
                 ${customerEmail}`
                  .toLowerCase()
                  .includes(search)
              );
            }
          );
      }

      // ================================================
      // STATUS FILTER
      // ================================================

      if (
        statusFilter !==
        "All"
      ) {
        filtered =
          filtered.filter(
            (review) =>
              String(
                review.status ||
                  "Pending"
              ).toLowerCase() ===
              String(
                statusFilter
              ).toLowerCase()
          );
      }

      // ================================================
      // RATING FILTER
      // ================================================

      if (
        ratingFilter !==
        "All"
      ) {
        filtered =
          filtered.filter(
            (review) =>
              Number(
                review.rating
              ) ===
              Number(
                ratingFilter
              )
          );
      }

      // ================================================
      // PRODUCT FILTER
      // ================================================

      if (
        productFilter.trim()
      ) {
        const productSearch =
          productFilter
            .toLowerCase()
            .trim();

        filtered =
          filtered.filter(
            (review) =>
              (
                review.productName ||
                ""
              )
                .toLowerCase()
                .includes(
                  productSearch
                )
          );
      }

      // ================================================
      // CUSTOMER FILTER
      // ================================================

      if (
        customerFilter.trim()
      ) {
        const customerSearch =
          customerFilter
            .toLowerCase()
            .trim();

        filtered =
          filtered.filter(
            (review) =>
              (
                review.customerName ||
                review.userName ||
                ""
              )
                .toLowerCase()
                .includes(
                  customerSearch
                )
          );
      }

      // ================================================
      // SORT
      // ================================================

      switch (sortBy) {
        case "Newest":
          filtered.sort(
            (a, b) =>
              new Date(
                b.createdAt || 0
              ) -
              new Date(
                a.createdAt || 0
              )
          );
          break;

        case "Oldest":
          filtered.sort(
            (a, b) =>
              new Date(
                a.createdAt || 0
              ) -
              new Date(
                b.createdAt || 0
              )
          );
          break;

        case "Highest Rating":
          filtered.sort(
            (a, b) =>
              Number(
                b.rating || 0
              ) -
              Number(
                a.rating || 0
              )
          );
          break;

        case "Lowest Rating":
          filtered.sort(
            (a, b) =>
              Number(
                a.rating || 0
              ) -
              Number(
                b.rating || 0
              )
          );
          break;

        default:
          break;
      }

      return filtered;
    }, [
      reviews,
      searchTerm,
      statusFilter,
      ratingFilter,
      productFilter,
      customerFilter,
      sortBy,
    ]);

  // =====================================================
  // PAGINATION
  // =====================================================

  const paginatedReviews =
    filteredReviews.slice(
      (page - 1) *
        rowsPerPage,
      page *
        rowsPerPage
    );

  // =====================================================
  // DELETE SUCCESS
  // =====================================================

  const handleDeleteSuccess =
    async () => {
      setOpenDelete(false);
      setSelectedReview(null);

      // Reload from MongoDB
      await loadReviews();
    };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* =================================================
          SIDEBAR
      ================================================= */}

      <AdminSidebar />

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <Box
        sx={{
          flex: 1,
          ml: "300px",

          backgroundColor:
            darkMode
              ? "#181818"
              : "#F7F5F2",

          minHeight:
            "100vh",
        }}
      >
        {/* =================================================
            NAVBAR
        ================================================= */}

        <AdminNavbar />

        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <Box
          sx={{
            p: 4,
            pt: "90px",
          }}
        >
          {/* =================================================
              HEADER
          ================================================= */}

          <ReviewHeader
            searchTerm={
              searchTerm
            }
            setSearchTerm={
              setSearchTerm
            }
            onOpenFilter={() =>
              setFilterOpen(
                true
              )
            }
          />

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: 2,
                backgroundColor:
                  darkMode
                    ? "#3A2424"
                    : "#FDECEC",
                border:
                  "1px solid #E8B4B4",
              }}
            >
              <Typography
                sx={{
                  color:
                    darkMode
                      ? "#FFB4B4"
                      : "#C62828",
                  fontSize: 14,
                }}
              >
                {error}
              </Typography>
            </Box>
          )}

          {/* =================================================
              LOADING
          ================================================= */}

          {loading ? (
            <Box
              sx={{
                minHeight: 400,
                display:
                  "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
              }}
            >
              <CircularProgress
                sx={{
                  color:
                    "#B89478",
                }}
              />
            </Box>
          ) : (
            /* =================================================
                REVIEWS TABLE
            ================================================= */

            <ReviewTable
              reviews={
                paginatedReviews
              }
              setSelectedReview={
                setSelectedReview
              }
              onDelete={(
                review
              ) => {
                setSelectedReview(
                  review
                );

                setOpenDelete(
                  true
                );
              }}
            />
          )}
        </Box>

        {/* =================================================
            PAGINATION
        ================================================= */}

        {!loading &&
          filteredReviews.length >
            0 && (
            <Box
              sx={{
                display:
                  "flex",
                justifyContent:
                  "center",
                mt: 3,
              }}
            >
              <Pagination
                page={page}
                onChange={(
                  e,
                  value
                ) =>
                  setPage(
                    value
                  )
                }
                count={Math.ceil(
                  filteredReviews.length /
                    rowsPerPage
                )}
                sx={{
                  mb: 6,

                  "& .MuiPaginationItem-root":
                    {
                      color:
                        darkMode
                          ? "#fff"
                          : "#555",
                    },

                  "& .Mui-selected":
                    {
                      backgroundColor:
                        "#B89478 !important",
                      color:
                        "#fff",
                    },

                  "& .Mui-selected:hover":
                    {
                      backgroundColor:
                        "#A88366 !important",
                    },
                }}
              />
            </Box>
          )}
      </Box>

      {/* =====================================================
          FILTER DRAWER
      ===================================================== */}

      <ReviewFilter
        open={filterOpen}
        onClose={() =>
          setFilterOpen(
            false
          )
        }
        statusFilter={
          statusFilter
        }
        setStatusFilter={
          setStatusFilter
        }
        ratingFilter={
          ratingFilter
        }
        setRatingFilter={
          setRatingFilter
        }
        productFilter={
          productFilter
        }
        setProductFilter={
          setProductFilter
        }
        customerFilter={
          customerFilter
        }
        setCustomerFilter={
          setCustomerFilter
        }
        sortBy={sortBy}
        setSortBy={setSortBy}
        onReset={() => {
          setStatusFilter(
            "All"
          );

          setRatingFilter(
            "All"
          );

          setProductFilter(
            ""
          );

          setCustomerFilter(
            ""
          );

          setSortBy(
            "Newest"
          );
        }}
      />

      {/* =====================================================
          VIEW REVIEW DRAWER
      ===================================================== */}

      <Drawer
        anchor="right"
        open={Boolean(
          selectedReview
        )}
        onClose={() =>
          setSelectedReview(
            null
          )
        }
        PaperProps={{
          sx: {
            width: 400,

            backgroundColor:
              darkMode
                ? "#252525"
                : "#fff",
          },
        }}
      >
        <ViewReview
          review={
            selectedReview
          }
          darkMode={
            darkMode
          }
          onClose={() =>
            setSelectedReview(
              null
            )
          }
        />
      </Drawer>

      {/* =====================================================
          DELETE REVIEW
      ===================================================== */}

      <DeleteReview
        open={openDelete}
        onClose={() => {
          setOpenDelete(false);
          setSelectedReview(
            null
          );
        }}
        review={
          selectedReview
        }
        onDeleted={
          handleDeleteSuccess
        }
      />
    </Box>
  );
};

export default Reviews;