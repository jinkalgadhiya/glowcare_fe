import api from "../api/axios";
import adminApi from "../api/adminApi";

// ===============================
// Get All Categories - CUSTOMER
// ===============================
export const getCategories = async () => {
  try {
    const response = await api.get("/categories");

    return response.data.data || [];
  } catch (error) {
    console.error(
      "Error fetching categories:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ===============================
// Get Single Category - CUSTOMER
// ===============================
export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/categories/${id}`);

    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching category:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ===============================
// Create Category - ADMIN
// ===============================
export const createCategory = async (categoryData) => {
  try {
    const response = await adminApi.post(
      "/categories",
      categoryData
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Error creating category:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ===============================
// Update Category - ADMIN
// ===============================
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await adminApi.put(
      `/categories/${id}`,
      categoryData
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Error updating category:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ===============================
// Delete Category - ADMIN
// ===============================
export const deleteCategory = async (id) => {
  try {
    const response = await adminApi.delete(
      `/categories/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error deleting category:",
      error.response?.data || error.message
    );

    throw error;
  }
};