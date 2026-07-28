import dbPromise from "./db";

// Get all users
export const getUsers = async () => {
  const db = await dbPromise;
  return await db.getAll("users");
};

// Get user by ID
export const getUserById = async (id) => {
  const db = await dbPromise;
  return await db.get("users", id);
};

// Add user
export const addUser = async (user) => {
  const db = await dbPromise;
  await db.put("users", user);
};

// Update user
export const updateUser = async (user) => {
  const db = await dbPromise;
  await db.put("users", user);
};

// Delete user
export const deleteUser = async (id) => {
  const db = await dbPromise;
  await db.delete("users", id);
};