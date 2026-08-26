import api from "../api/axios";
import adminApi from "../api/adminApi";

// ===============================
// Get All Users - ADMIN
// ===============================

export const getUsers = async () => {
  try {
    const response = await adminApi.get("/users");

    return response.data.data || [];
  } catch (error) {
    console.error(
      "Error fetching users:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ===============================
// Get User By ID - ADMIN
// ===============================

export const getUserById = async (id) => {
  try {
    const response = await adminApi.get(`/users/get/${id}`);

    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching user:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ===============================
// Get All Customers - ADMIN
// ===============================

export const getCustomers = async () => {
  try {
    const response = await adminApi.get("/users");

    return response.data.data || [];
  } catch (error) {
    console.error(
      "Error fetching customers:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ===============================
// Add User / Register - CUSTOMER
// ===============================

export const addUser = async (userData) => {
  try {
    const response = await api.post(
      "/users/add",
      userData
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Error adding user:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ===============================
// Update User - ADMIN
// ===============================

export const updateUser = async (id, userData) => {
  try {
    const response = await adminApi.put(
      `/users/update/${id}`,
      userData
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Error updating user:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ===============================
// Update Customer Status - ADMIN
// ===============================

export const updateCustomerStatus = async (
  id,
  status
) => {
  try {
    const response = await adminApi.put(
      `/users/update/${id}`,
      { status }
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Error updating customer status:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ===============================
// Delete User - ADMIN
// ===============================

export const deleteUser = async (id) => {
  try {
    const response = await adminApi.delete(
      `/users/delete/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error deleting user:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ===============================
// Delete Customer - ADMIN
// ===============================

export const deleteCustomer = async (id) => {
  try {
    const response = await adminApi.delete(
      `/users/delete/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error deleting customer:",
      error.response?.data || error.message
    );

    throw error;
  }
};