import api from "../api/axios";
import adminApi from "../api/adminApi";

// ======================================================
// GET ALL REVIEWS
// ADMIN
// GET /api/reviews
// ======================================================

export const getReviews = async () => {
  const response = await adminApi.get("/api/reviews");

  return response.data.reviews || [];
};

// ======================================================
// GET MY REVIEWS
// CUSTOMER
// GET /api/reviews/my
// ======================================================

export const getMyReviews = async () => {
  const response = await api.get("/api/reviews/my");

  return response.data.reviews || [];
};

// ======================================================
// GET SINGLE REVIEW
// ADMIN
// GET /api/reviews/:id
// ======================================================

export const getReviewById = async (id) => {
  const response = await adminApi.get(`/api/reviews/${id}`);

  return response.data.review;
};

// ======================================================
// CREATE REVIEW
// CUSTOMER
// POST /api/reviews
// ======================================================

export const createReview = async (reviewData) => {
  const response = await api.post(
    "/api/reviews",
    reviewData
  );

  return response.data.review;
};

// ======================================================
// UPDATE REVIEW STATUS
// ADMIN
// PATCH /api/reviews/:id/status
// ======================================================

export const updateReviewStatus = async (id, status) => {
  const response = await adminApi.patch(
    `/api/reviews/${id}/status`,
    {
      status,
    }
  );

  return response.data.review;
};

// ======================================================
// DELETE REVIEW
// ADMIN
// DELETE /api/reviews/:id
// ======================================================

export const deleteReview = async (id) => {
  const response = await adminApi.delete(
    `/api/reviews/${id}`
  );

  return response.data;
};