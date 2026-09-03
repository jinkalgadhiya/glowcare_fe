import api from "../api/axios";

// ======================================================
// CREATE RETURN REQUEST
// ======================================================

export const createReturnRequest = async (returnData) => {
  try {
    const response = await api.post(
      "/returns",
      returnData,
    );

    return response.data;
  } catch (error) {
    console.error(
      "Create return request error:",
      error,
    );

    throw (
      error.response?.data ||
      new Error(
        "Failed to create return request",
      )
    );
  }
};

// ======================================================
// GET ALL RETURN REQUESTS
// ======================================================

export const getReturnRequests = async () => {
  try {
    const response = await api.get("/returns");

    return (
      response.data?.data ||
      response.data ||
      []
    );
  } catch (error) {
    console.error(
      "Get return requests error:",
      error,
    );

    throw error;
  }
};

// ======================================================
// UPDATE RETURN STATUS
// ======================================================

export const updateReturnStatus = async (
  returnId,
  updatedData,
) => {
  try {
    const response = await api.patch(
      `/returns/${returnId}/status`,
      updatedData,
    );

    return (
      response.data?.data ||
      response.data
    );
  } catch (error) {
    console.error(
      "Update return status error:",
      error,
    );

    throw error;
  }
};

// ======================================================
// DELETE RETURN REQUEST
// ======================================================

export const deleteReturnRequest = async (
  returnId,
) => {
  try {
    const response = await api.delete(
      `/returns/${returnId}`,
    );

    return response.data;
  } catch (error) {
    console.error(
      "Delete return request error:",
      error,
    );

    throw error;
  }
};