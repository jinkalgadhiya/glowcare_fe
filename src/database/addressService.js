import api from "../api/axios";

// ======================================================
// NORMALIZE ADDRESS
// ======================================================

const normalizeAddress = (address) => {
  if (!address) return null;

  return {
    ...address,
    id: address._id || address.id,
  };
};

// ======================================================
// GET MY ADDRESSES
// ======================================================

export const getAddresses = async () => {
  try {
    const response = await api.get("/addresses");

    const addresses = response.data.data || [];

    return addresses.map(normalizeAddress);
  } catch (error) {
    console.error(
      "Error fetching addresses:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ======================================================
// ADD ADDRESS
// ======================================================

export const addAddress = async (addressData) => {
  try {
    const response = await api.post("/addresses", {
      addressType: addressData.addressType,
      fullName: addressData.fullName,
      phone: addressData.phone,
      addressLine: addressData.addressLine,
      city: addressData.city,
      state: addressData.state,
      pincode: addressData.pincode,
      isDefault: addressData.isDefault || false,
    });

    return normalizeAddress(response.data.data);
  } catch (error) {
    console.error(
      "Error adding address:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ======================================================
// UPDATE ADDRESS
// ======================================================

export const updateAddress = async (addressData) => {
  try {
    const id = addressData.id || addressData._id;

    if (!id) {
      throw new Error("Address ID is required");
    }

    const response = await api.put(`/addresses/${id}`, {
      addressType: addressData.addressType,
      fullName: addressData.fullName,
      phone: addressData.phone,
      addressLine: addressData.addressLine,
      city: addressData.city,
      state: addressData.state,
      pincode: addressData.pincode,
      isDefault: addressData.isDefault || false,
    });

    return normalizeAddress(response.data.data);
  } catch (error) {
    console.error(
      "Error updating address:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ======================================================
// SET DEFAULT ADDRESS
// ======================================================

export const setDefaultAddress = async (id) => {
  try {
    const response = await api.put(
      `/addresses/${id}/default`
    );

    return normalizeAddress(response.data.data);
  } catch (error) {
    console.error(
      "Error setting default address:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ======================================================
// DELETE ADDRESS
// ======================================================

export const deleteAddress = async (id) => {
  try {
    const response = await api.delete(
      `/addresses/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error deleting address:",
      error.response?.data || error.message
    );

    throw error;
  }
};