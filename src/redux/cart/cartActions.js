import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "./cartSlice";

import {
  getCartItems,
  saveCartItem,
  updateCartItem,
  removeCartItem,
  clearCartItems,
} from "../../database/cartService";

// ======================================================
// LOAD CART FROM BACKEND
// ======================================================

export const loadCartFromDB = () => async (dispatch) => {
  try {
    const cartItems = await getCartItems();

    dispatch({
      type: "cart/loadCart",
      payload: cartItems,
    });
  } catch (error) {
    console.error("Failed to load cart:", error);
  }
};

// ======================================================
// ADD PRODUCT TO CART
// ======================================================

export const addProductToCart =
  (product) => async (dispatch, getState) => {
    try {
      // Update Redux immediately
      dispatch(addToCart(product));

      // Get updated item from Redux
      const item = getState().cart.items.find(
        (i) =>
          i.productId === product.productId &&
          i.variantId === product.variantId,
      );

      if (!item) return;

      // Save to backend
      await saveCartItem(item);
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

// ======================================================
// INCREASE QUANTITY
// ======================================================

export const increaseCartQuantity =
  ({ productId, variantId }) =>
  async (dispatch, getState) => {
    try {
      // Update Redux
      dispatch(
        increaseQuantity({
          productId,
          variantId,
        }),
      );

      // Get updated item
      const item = getState().cart.items.find(
        (i) =>
          i.productId === productId &&
          i.variantId === variantId,
      );

      if (!item) return;

      // Update backend
      await updateCartItem(
        productId,
        variantId,
        item.quantity,
      );
    } catch (error) {
      console.error(
        "Failed to increase cart quantity:",
        error,
      );
    }
  };

// ======================================================
// DECREASE QUANTITY
// ======================================================

export const decreaseCartQuantity =
  ({ productId, variantId }) =>
  async (dispatch, getState) => {
    try {
      // Update Redux
      dispatch(
        decreaseQuantity({
          productId,
          variantId,
        }),
      );

      // Check whether item still exists
      const item = getState().cart.items.find(
        (i) =>
          i.productId === productId &&
          i.variantId === variantId,
      );

      if (!item) {
        // Quantity reached 0
        await removeCartItem(
          productId,
          variantId,
        );

        return;
      }

      // Update backend quantity
      await updateCartItem(
        productId,
        variantId,
        item.quantity,
      );
    } catch (error) {
      console.error(
        "Failed to decrease cart quantity:",
        error,
      );
    }
  };

// ======================================================
// REMOVE PRODUCT FROM CART
// ======================================================

export const removeProductFromCart =
  ({ productId, variantId }) =>
  async (dispatch) => {
    try {
      // Update Redux
      dispatch(
        removeFromCart({
          productId,
          variantId,
        }),
      );

      // Remove from backend
      await removeCartItem(
        productId,
        variantId,
      );
    } catch (error) {
      console.error(
        "Failed to remove product from cart:",
        error,
      );
    }
  };

// ======================================================
// CLEAR CART
// ======================================================

export const clearWholeCart = () => async (dispatch) => {
  try {
    // Clear Redux
    dispatch(clearCart());

    // Clear backend cart
    await clearCartItems();
  } catch (error) {
    console.error(
      "Failed to clear cart:",
      error,
    );
  }
};