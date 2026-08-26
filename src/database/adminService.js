import dbPromise from "./db";

// Get Admin
export const getAdmin = async () => {
  const db = await dbPromise;

  const admins = await db.getAll("admins");

  return admins[0] || null;
};

// Add Admin
export const addAdmin = async (admin) => {
  const db = await dbPromise;

  await db.put("admins", admin);
};

// Update Admin
export const updateAdmin = async (admin) => {
  const db = await dbPromise;

  await db.put("admins", admin);
};

// Delete Admin
export const deleteAdmin = async (id) => {
  const db = await dbPromise;

  await db.delete("admins", id);
};

export const initializeAdmin = async (defaultAdmin) => {
  const db = await dbPromise;

  const admins = await db.getAll("admins");

  if (admins.length === 0) {
    await db.put("admins", defaultAdmin);
  }
};