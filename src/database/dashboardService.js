import { getProducts } from "./productService";
import { getCategories } from "./categoryService";
import { getOrders } from "./orderService";
import { getUsers } from "./userService";

export const getDashboardData = async () => {
  try {
    const [products, categories, orders, customers] = await Promise.all([
      getProducts(),
      getCategories(),
      getOrders(),
      getUsers(),
    ]);

    return {
      products,
      categories,
      orders,
      customers,
    };
  } catch (error) {
    console.error("Error loading dashboard data:", error);
    throw error;
  }
};