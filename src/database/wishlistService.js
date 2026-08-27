import api from "../api/axios";

// ======================================================
// GET MY WISHLIST
// ======================================================

export const getWishlist = async () => {
  try {
    const response = await api.get("/wishlist");

    return response.data.data || [];
  } catch (error) {
    console.error(
      "Error fetching wishlist:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

// ======================================================
// ADD TO WISHLIST
// ======================================================

export const addToWishlistDB = async (
  productId,
  variantId = null,
) => {
  try {
    const response = await api.post("/wishlist", {
      productId,
      variantId,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error adding to wishlist:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

// ======================================================
// REMOVE FROM WISHLIST
// ======================================================

export const removeFromWishlistDB = async (productId) => {
  try {
    const response = await api.delete(
      `/wishlist/${productId}`,
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error removing from wishlist:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

// ======================================================
// CHECK WISHLIST
// ======================================================

export const checkWishlist = async (productId) => {
  try {
    const response = await api.get(
      `/wishlist/check/${productId}`,
    );

    return response.data.isWishlisted || false;
  } catch (error) {
    console.error(
      "Error checking wishlist:",
      error.response?.data || error.message,
    );

    return false;
  }
};