import dbPromise from "./db";

// Get all orders
export const getOrders = async () => {
  const db = await dbPromise;
  return await db.getAll("orders");
};

// Get one order
export const getOrderById = async (id) => {
  const db = await dbPromise;
  return await db.get("orders", id);
};

// Create new order
export const createOrder = async (orderData) => {
  const db = await dbPromise;

  const order = {
    id: `GC-${Date.now()}`,
    orderDate: new Date().toISOString(),
    status: "Pending",
    ...orderData,
  };

  await db.put("orders", order);

  return order;
};

// Update order
export const updateOrder = async (order) => {
  const db = await dbPromise;
  await db.put("orders", order);
};

// Delete order
export const deleteOrder = async (id) => {
  const db = await dbPromise;
  await db.delete("orders", id);
};

// Clear all orders
export const clearOrders = async () => {
  const db = await dbPromise;
  await db.clear("orders");
};