import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // Load Cart From IndexedDB
    loadCart: (state, action) => {
      state.items = action.payload;
    },

    // Add Product
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
        quantity,
      } = action.payload;

      const existingItem = state.items.find(
        (item) => item.productId === productId && item.variantId === variantId,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
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
          quantity,
        });
      }
    },

    // Increase Quantity
    increaseQuantity: (state, action) => {
      const { productId, variantId } = action.payload;

      const item = state.items.find(
        (item) => item.productId === productId && item.variantId === variantId,
      );

      if (item) {
        item.quantity += 1;
      }
    },

    // Decrease Quantity
    decreaseQuantity: (state, action) => {
      const { productId, variantId } = action.payload;

      const item = state.items.find(
        (item) => item.productId === productId && item.variantId === variantId,
      );

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (item) =>
            !(item.productId === productId && item.variantId === variantId),
        );
      }
    },

    // Remove Product
    removeFromCart: (state, action) => {
      const { productId, variantId } = action.payload;

      state.items = state.items.filter(
        (item) =>
          !(item.productId === productId && item.variantId === variantId),
      );
    },

    // Clear Cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  loadCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
