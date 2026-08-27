import api from "../api/axios";

// ======================================================
// GET MY CART
// ======================================================

export const getCartItems = async () => {
  try {
    const response = await api.get("/cart");

    return response.data.data?.items || [];
  } catch (error) {
    console.error(
      "Error fetching cart:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

// ======================================================
// ADD ITEM TO CART
// ======================================================

export const saveCartItem = async (item) => {
  try {
    const response = await api.post("/cart", {
      productId: item.productId,
      variantId: item.variantId,
      name: item.name,
      image: item.image,
      category: item.category,
      description: item.description,
      size: item.size,
      price: item.price,
      originalPrice: item.originalPrice,
      quantity: item.quantity,
    });

    return response.data.data;
  } catch (error) {
    console.error(
      "Error adding item to cart:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

// ======================================================
// UPDATE CART ITEM QUANTITY
// ======================================================

export const updateCartItem = async (
  productId,
  variantId,
  quantity,
) => {
  try {
    const response = await api.put(
      `/cart/${productId}/${variantId}`,
      {
        quantity,
      },
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Error updating cart item:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

// ======================================================
// REMOVE CART ITEM
// ======================================================

export const removeCartItem = async (
  productId,
  variantId,
) => {
  try {
    const response = await api.delete(
      `/cart/${productId}/${variantId}`,
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error removing cart item:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

// ======================================================
// CLEAR CART
// ======================================================

export const clearCartItems = async () => {
  try {
    const response = await api.delete("/cart");

    return response.data;
  } catch (error) {
    console.error(
      "Error clearing cart:",
      error.response?.data || error.message,
    );

    throw error;
  }
};