import dbPromise from "./db";

// ===============================
// Get All Users
// ===============================
export const getUsers = async () => {
  const db = await dbPromise;
  return await db.getAll("users");
};

// ===============================
// Get User By ID
// ===============================
export const getUserById = async (id) => {
  const db = await dbPromise;
  return await db.get("users", id);
};

// ===============================
// Get All Customers
// ===============================
export const getCustomers = async () => {
  const db = await dbPromise;

  const users = await db.getAll("users");

  return users.filter((user) => user.role === "customer");
};

// ===============================
// Add User
// ===============================
export const addUser = async (user) => {
  const db = await dbPromise;
  await db.put("users", user);
};

// ===============================
// Update User
// ===============================
export const updateUser = async (user) => {
  const db = await dbPromise;
  await db.put("users", user);
};

// ===============================
// Update Customer Status
// ===============================
export const updateCustomerStatus = async (id, status) => {
  const db = await dbPromise;

  const customer = await db.get("users", id);

  if (!customer) return;

  customer.status = status;

  await db.put("users", customer);

  return customer;
};

// ===============================
// Delete User / Customer
// ===============================
export const deleteUser = async (id) => {
  const db = await dbPromise;
  await db.delete("users", id);
};

// ===============================
// Delete Customer
// ===============================
export const deleteCustomer = async (id) => {
  const db = await dbPromise;
  await db.delete("users", id);
};

// ===============================
// Clear All Users
// ===============================
export const clearUsers = async () => {
  const db = await dbPromise;
  await db.clear("users");
};