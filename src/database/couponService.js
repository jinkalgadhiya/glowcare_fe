import api from "../api/axios";

// ======================================================
// GET ALL COUPONS
// ======================================================

export const getCoupons = async () => {
  try {
    const response = await api.get("/api/coupons");

    return response.data.data || [];
  } catch (error) {
    console.error(
      "Error fetching coupons:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

// ======================================================
// GET SINGLE COUPON
// ======================================================

export const getCouponById = async (id) => {
  try {
    const response = await api.get(
      `/api/coupons/${id}`,
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching coupon:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

// ======================================================
// CREATE COUPON
// ======================================================

export const addCoupon = async (couponData) => {
  try {
    const response = await api.post(
      "/api/coupons",
      couponData,
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Error creating coupon:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

// ======================================================
// UPDATE COUPON
// ======================================================

export const updateCoupon = async (
  id,
  couponData,
) => {
  try {
    const response = await api.put(
      `/api/coupons/${id}`,
      couponData,
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Error updating coupon:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

// ======================================================
// DELETE COUPON
// ======================================================

export const deleteCoupon = async (id) => {
  try {
    const response = await api.delete(
      `/api/coupons/${id}`,
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error deleting coupon:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

// ======================================================
// APPLY COUPON
// ======================================================

export const applyCoupon = async (
  code,
  subtotal,
) => {
  try {
    const response = await api.post(
      "/api/coupons/apply",
      {
        code,
        subtotal,
      },
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Error applying coupon:",
      error.response?.data || error.message,
    );

    throw error;
  }
};