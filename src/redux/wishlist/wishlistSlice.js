import { createSlice } from "@reduxjs/toolkit";

// ======================================================
// LOAD WISHLIST FROM LOCAL STORAGE
// ======================================================

const getStoredWishlist = () => {
  try {
    const data = localStorage.getItem("wishlist");

    if (!data) {
      return [];
    }

    const parsedData = JSON.parse(data);

    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error(
      "Error loading wishlist from localStorage:",
      error
    );

    return [];
  }
};

// ======================================================
// SAVE WISHLIST TO LOCAL STORAGE
// ======================================================

const saveWishlist = (items) => {
  try {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(items)
    );
  } catch (error) {
    console.error(
      "Error saving wishlist to localStorage:",
      error
    );
  }
};

// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
  items: getStoredWishlist(),
};

// ======================================================
// WISHLIST SLICE
// ======================================================

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    // ====================================================
    // ADD TO WISHLIST
    // ====================================================

    addToWishlist: (state, action) => {
      const product = action.payload;

      const exists = state.items.some(
        (item) =>
          String(item.id) === String(product.id)
      );

      if (!exists) {
        state.items.push(product);

        saveWishlist(state.items);
      }
    },

    // ====================================================
    // REMOVE FROM WISHLIST
    // ====================================================

    removeFromWishlist: (state, action) => {
      const productId = action.payload;

      state.items = state.items.filter(
        (item) =>
          String(item.id) !== String(productId)
      );

      saveWishlist(state.items);
    },

    // ====================================================
    // CLEAR WISHLIST
    // ====================================================

    clearWishlist: (state) => {
      state.items = [];

      saveWishlist([]);
    },

    // ====================================================
    // LOAD WISHLIST
    // ====================================================

    loadWishlist: (state, action) => {
      state.items = Array.isArray(action.payload)
        ? action.payload
        : [];

      saveWishlist(state.items);
    },
  },
});

// ======================================================
// EXPORT ACTIONS
// ======================================================

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  loadWishlist,
} = wishlistSlice.actions;

// ======================================================
// EXPORT REDUCER
// ======================================================

export default wishlistSlice.reducer;