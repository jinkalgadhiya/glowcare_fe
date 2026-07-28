import dbPromise from "./db";

// Get all products
export const getProducts = async () => {
  const db = await dbPromise;
  return await db.getAll("products");
};

// Get one product
export const getProductById = async (id) => {
  const db = await dbPromise;
  return await db.get("products", id);
};

// Add new product
export const addProduct = async (product) => {
  const db = await dbPromise;
  await db.put("products", product);
};

// Update product
export const updateProduct = async (product) => {
  const db = await dbPromise;
  await db.put("products", product);
};

// Delete product
export const deleteProduct = async (id) => {
  const db = await dbPromise;
  await db.delete("products", id);
};

// Delete all products
export const clearProducts = async () => {
  const db = await dbPromise;
  await db.clear("products");
};