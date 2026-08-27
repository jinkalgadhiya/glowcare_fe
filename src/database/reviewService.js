// ======================================================
// REVIEW API SERVICE
// ======================================================

const API_URL = "https://glowcare-be.onrender.com/api/reviews";

const ADMIN_TOKEN_KEY = "adminToken";
const CUSTOMER_TOKEN_KEY = "token";

// ======================================================
// CUSTOMER AUTH HEADER
// ======================================================

const getCustomerAuthHeaders = () => {
  const token = localStorage.getItem(
    CUSTOMER_TOKEN_KEY
  );

  return {
    "Content-Type": "application/json",

    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
  };
};

// ======================================================
// ADMIN AUTH HEADER
// ======================================================

const getAdminAuthHeaders = () => {
  const token = localStorage.getItem(
    ADMIN_TOKEN_KEY
  );

  return {
    "Content-Type": "application/json",

    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
  };
};

// ======================================================
// GET ALL REVIEWS
// ADMIN
// GET /api/reviews
// ======================================================

export const getReviews = async () => {
  try {
    const token = localStorage.getItem(
      ADMIN_TOKEN_KEY
    );

    if (!token) {
      throw new Error(
        "Admin token not found. Please login again."
      );
    }

    const response = await fetch(
      API_URL,
      {
        method: "GET",
        headers: getAdminAuthHeaders(),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to fetch reviews"
      );
    }

    return data.reviews || [];
  } catch (error) {
    console.error(
      "Get reviews error:",
      error
    );

    throw error;
  }
};

// ======================================================
// GET MY REVIEWS
// CUSTOMER
// GET /api/reviews/my
// ======================================================

export const getMyReviews = async () => {
  try {
    const token = localStorage.getItem(
      CUSTOMER_TOKEN_KEY
    );

    if (!token) {
      throw new Error(
        "Customer token not found. Please login again."
      );
    }

    const response = await fetch(
      `${API_URL}/my`,
      {
        method: "GET",
        headers: getCustomerAuthHeaders(),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to fetch your reviews"
      );
    }

    return data.reviews || [];
  } catch (error) {
    console.error(
      "Get my reviews error:",
      error
    );

    throw error;
  }
};

// ======================================================
// GET SINGLE REVIEW
// ADMIN
// GET /api/reviews/:id
// ======================================================

export const getReviewById = async (
  id
) => {
  try {
    const response = await fetch(
      `${API_URL}/${id}`,
      {
        method: "GET",
        headers: getAdminAuthHeaders(),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to fetch review"
      );
    }

    return data.review;
  } catch (error) {
    console.error(
      "Get review by ID error:",
      error
    );

    throw error;
  }
};

// ======================================================
// CREATE REVIEW
// CUSTOMER
// POST /api/reviews
// ======================================================

export const createReview = async (
  reviewData
) => {
  try {
    const token = localStorage.getItem(
      CUSTOMER_TOKEN_KEY
    );

    if (!token) {
      throw new Error(
        "Customer token not found. Please login again."
      );
    }

    const response = await fetch(
      API_URL,
      {
        method: "POST",
        headers: getCustomerAuthHeaders(),
        body: JSON.stringify(
          reviewData
        ),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to submit review"
      );
    }

    return data.review;
  } catch (error) {
    console.error(
      "Create review error:",
      error
    );

    throw error;
  }
};

// ======================================================
// UPDATE REVIEW STATUS
// ADMIN
// PATCH /api/reviews/:id/status
// ======================================================

export const updateReviewStatus = async (
  id,
  status
) => {
  try {
    const response = await fetch(
      `${API_URL}/${id}/status`,
      {
        method: "PATCH",
        headers: getAdminAuthHeaders(),
        body: JSON.stringify({
          status,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to update review status"
      );
    }

    return data.review;
  } catch (error) {
    console.error(
      "Update review status error:",
      error
    );

    throw error;
  }
};

// ======================================================
// DELETE REVIEW
// ADMIN
// DELETE /api/reviews/:id
// ======================================================

export const deleteReview = async (
  id
) => {
  try {
    const response = await fetch(
      `${API_URL}/${id}`,
      {
        method: "DELETE",
        headers: getAdminAuthHeaders(),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to delete review"
      );
    }

    return data;
  } catch (error) {
    console.error(
      "Delete review error:",
      error
    );

    throw error;
  }
};