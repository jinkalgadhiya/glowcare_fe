import api from "../api/axios";
import adminApi from "../api/adminApi";

// ===============================
// Get All Products - CUSTOMER
// ===============================
export const getProducts = async (params = {}) => {
  try {
    const response = await api.get("/products", {
      params,
    });

    return response.data.data || [];
  } catch (error) {
    console.error(
      "Error fetching products:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ===============================
// Get Single Product - CUSTOMER
// ===============================
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);

    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching product:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ===============================
// Create Product - ADMIN
// ===============================
export const createProduct = async (productData) => {
  try {
    const response = await adminApi.post(
      "/products",
      productData
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Error creating product:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ===============================
// Update Product - ADMIN
// ===============================
export const updateProduct = async (id, productData) => {
  try {
    const response = await adminApi.put(
      `/products/${id}`,
      productData
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Error updating product:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ===============================
// Delete Product - ADMIN
// ===============================
export const deleteProduct = async (id) => {
  try {
    const response = await adminApi.delete(
      `/products/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error deleting product:",
      error.response?.data || error.message
    );

    throw error;
  }
};