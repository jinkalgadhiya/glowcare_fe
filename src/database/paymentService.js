import api from "../api/axios";

export const createRazorpayOrder = async (orderId) => {
  try {
    const response = await api.post("/payments/create-order", {
      orderId,
    });

    console.log("RAZORPAY ORDER RESPONSE:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "RAZORPAY CREATE ORDER ERROR:",
      error.response?.data || error.message
    );

    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.error ||
        "Unable to create Razorpay payment order"
    );
  }
};

export const verifyRazorpayPayment = async (paymentData) => {
  try {
    const response = await api.post("/payments/verify", paymentData);

    console.log("RAZORPAY VERIFY RESPONSE:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "RAZORPAY VERIFY ERROR:",
      error.response?.data || error.message
    );

    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.error ||
        "Payment verification failed"
    );
  }
};