import api from "../api/axios";
import adminApi from "../api/adminApi";

// ======================================================
// CREATE ORDER - CUSTOMER
// ======================================================

export const createOrder = async (orderData) => {
  try {
    const response = await api.post("/orders", orderData);

    return response.data.data;
  } catch (error) {
    console.error(
      "Error creating order:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ======================================================
// GET MY ORDERS - CUSTOMER
// ======================================================

export const getMyOrders = async () => {
  try {
    const response = await api.get("/orders/my-orders");

    return response.data.data || [];
  } catch (error) {
    console.error(
      "Error fetching my orders:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ======================================================
// GET ALL ORDERS - ADMIN
// ======================================================

export const getOrders = async () => {
  try {
    const response = await adminApi.get("/orders");

    return response.data.data || [];
  } catch (error) {
    console.error(
      "Error fetching admin orders:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ======================================================
// GET SINGLE ORDER - ADMIN
// ======================================================

export const getOrderById = async (id) => {
  try {
    const response = await adminApi.get(`/orders/${id}`);

    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching admin order:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ======================================================
// UPDATE ORDER STATUS - ADMIN
// ======================================================

export const updateOrderStatus = async (
  id,
  status,
  paymentStatus
) => {
  try {
    const response = await adminApi.put(
      `/orders/${id}/status`,
      {
        status,
        paymentStatus,
      }
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Error updating order status:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ======================================================
// DELETE ORDER - ADMIN
// ======================================================

export const deleteOrder = async (id) => {
  try {
    const response = await adminApi.delete(
      `/orders/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error deleting order:",
      error.response?.data || error.message
    );

    throw error;
  }
};