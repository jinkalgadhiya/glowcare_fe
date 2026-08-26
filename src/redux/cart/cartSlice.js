import { createSlice } from "@reduxjs/toolkit";

// ======================================================
// LOAD CART FROM LOCAL STORAGE
// ======================================================

const getStoredCart = () => {
  try {
    const data = localStorage.getItem("cart");

    if (!data) {
      return [];
    }

    const parsedData = JSON.parse(data);

    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error(
      "Error loading cart from localStorage:",
      error
    );

    return [];
  }
};

// ======================================================
// SAVE CART TO LOCAL STORAGE
// ======================================================

const saveCart = (items) => {
  try {
    localStorage.setItem(
      "cart",
      JSON.stringify(items)
    );
  } catch (error) {
    console.error(
      "Error saving cart to localStorage:",
      error
    );
  }
};

// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
  items: getStoredCart(),
};

// ======================================================
// CART SLICE
// ======================================================

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    // ====================================================
    // LOAD CART
    // ====================================================

    loadCart: (state, action) => {
      state.items = Array.isArray(action.payload)
        ? action.payload
        : [];

      saveCart(state.items);
    },

    // ====================================================
    // ADD PRODUCT
    // ====================================================

    addToCart: (state, action) => {
      const {
        productId,
        variantId,
        name,
        image,
        category,
        description,
        size,
        price,
        originalPrice,
        quantity = 1,
      } = action.payload;

      const existingItem = state.items.find(
        (item) =>
          String(item.productId) === String(productId) &&
          String(item.variantId) === String(variantId)
      );

      if (existingItem) {
        existingItem.quantity += Number(quantity) || 1;
      } else {
        state.items.push({
          productId,
          variantId,
          name,
          image,
          category,
          description,
          size,
          price,
          originalPrice,
          quantity: Number(quantity) || 1,
        });
      }

      saveCart(state.items);
    },

    // ====================================================
    // INCREASE QUANTITY
    // ====================================================

    increaseQuantity: (state, action) => {
      const { productId, variantId } = action.payload;

      const item = state.items.find(
        (item) =>
          String(item.productId) === String(productId) &&
          String(item.variantId) === String(variantId)
      );

      if (item) {
        item.quantity += 1;
      }

      saveCart(state.items);
    },

    // ====================================================
    // DECREASE QUANTITY
    // ====================================================

    decreaseQuantity: (state, action) => {
      const { productId, variantId } = action.payload;

      const item = state.items.find(
        (item) =>
          String(item.productId) === String(productId) &&
          String(item.variantId) === String(variantId)
      );

      if (!item) {
        return;
      }

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (item) =>
            !(
              String(item.productId) === String(productId) &&
              String(item.variantId) === String(variantId)
            )
        );
      }

      saveCart(state.items);
    },

    // ====================================================
    // REMOVE PRODUCT
    // ====================================================

    removeFromCart: (state, action) => {
      const { productId, variantId } = action.payload;

      state.items = state.items.filter(
        (item) =>
          !(
            String(item.productId) === String(productId) &&
            String(item.variantId) === String(variantId)
          )
      );

      saveCart(state.items);
    },

    // ====================================================
    // CLEAR CART
    // ====================================================

    clearCart: (state) => {
      state.items = [];

      saveCart([]);
    },
  },
});

// ======================================================
// EXPORT ACTIONS
// ======================================================

export const {
  loadCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

// ======================================================
// EXPORT REDUCER
// ======================================================

export default cartSlice.reducer;