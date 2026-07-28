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
  removeCartItem,
  clearCartItems,
} from "../../database/cartService";

// Load Cart From IndexedDB
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

// Add Product
export const addProductToCart = (product) => async (dispatch, getState) => {
  dispatch(addToCart(product));

  const item = getState().cart.items.find(
    (i) =>
      i.productId === product.productId &&
      i.variantId === product.variantId
  );

  await saveCartItem(item);
};

// Increase Quantity
export const increaseCartQuantity =
  ({ productId, variantId }) =>
  async (dispatch, getState) => {
    dispatch(increaseQuantity({ productId, variantId }));

    const item = getState().cart.items.find(
      (i) =>
        i.productId === productId &&
        i.variantId === variantId
    );

    if (item) {
      await saveCartItem(item);
    }
  };

// Decrease Quantity
export const decreaseCartQuantity =
  ({ productId, variantId }) =>
  async (dispatch, getState) => {
    dispatch(decreaseQuantity({ productId, variantId }));

    const item = getState().cart.items.find(
      (i) =>
        i.productId === productId &&
        i.variantId === variantId
    );

    if (item) {
      await saveCartItem(item);
    } else {
      await removeCartItem(productId, variantId);
    }
  };

// Remove Product
export const removeProductFromCart =
  ({ productId, variantId }) =>
  async (dispatch) => {
    dispatch(removeFromCart({ productId, variantId }));

    await removeCartItem(productId, variantId);
  };

// Clear Cart
export const clearWholeCart = () => async (dispatch) => {
  dispatch(clearCart());

  await clearCartItems();
};