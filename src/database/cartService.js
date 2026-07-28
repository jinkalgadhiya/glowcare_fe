import dbPromise from "./db";

// Get All Cart Items
export const getCartItems = async () => {
  const db = await dbPromise;
  return await db.getAll("cart");
};

// Add / Update Item
export const saveCartItem = async (item) => {
  const db = await dbPromise;

  await db.put("cart", {
    ...item,
    id: `${item.productId}-${item.variantId}`,
  });
};

// Remove Item
export const removeCartItem = async (productId, variantId) => {
  const db = await dbPromise;

  await db.delete("cart", `${productId}-${variantId}`);
};

// Clear Cart
export const clearCartItems = async () => {
  const db = await dbPromise;

  const tx = db.transaction("cart", "readwrite");

  await tx.store.clear();

  await tx.done;
};