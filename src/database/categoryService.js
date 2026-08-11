import dbPromise from "./db";

// Get all categories
export const getCategories = async () => {
  const db = await dbPromise;
  return await db.getAll("categories");
};

// Get category by ID
export const getCategoryById = async (id) => {
  const db = await dbPromise;
  return await db.get("categories", id);
};

// Add category
export const addCategory = async (category) => {
  const db = await dbPromise;
  await db.put("categories", category);
};

// Update category
export const updateCategory = async (category) => {
  const db = await dbPromise;
  await db.put("categories", category);
};

// Delete category
export const deleteCategory = async (id) => {
  const db = await dbPromise;
  await db.delete("categories", id);
};

// Clear all categories
export const clearCategories = async () => {
  const db = await dbPromise;
  await db.clear("categories");
};

// Check duplicate category
export const checkCategoryExists = async (
  menuType,
  mainCategory,
  subCategory,
  excludeId = null
) => {
  const categories = await getCategories();

  return categories.find(
    (item) =>
      item.menuType === menuType &&
      item.mainCategory?.toLowerCase().trim() ===
        mainCategory?.toLowerCase().trim() &&
      item.subCategory?.toLowerCase().trim() ===
        subCategory?.toLowerCase().trim() &&
      item.id !== excludeId
  );
};