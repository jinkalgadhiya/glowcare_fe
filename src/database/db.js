import { openDB } from "idb";

const dbPromise = openDB("GlowCareDB", 12, {
  upgrade(db) {
    // Products
    if (!db.objectStoreNames.contains("products")) {
      const productStore = db.createObjectStore("products", {
        keyPath: "id",
      });

      productStore.createIndex("productName", "productName");
      productStore.createIndex("category", "category");
      productStore.createIndex("status", "status");
    }

    // Categories
    if (!db.objectStoreNames.contains("categories")) {
      const categoryStore = db.createObjectStore("categories", {
        keyPath: "id",
      });

      categoryStore.createIndex("menuType", "menuType");
      categoryStore.createIndex("categoryType", "categoryType");
      categoryStore.createIndex("status", "status");
    }

    // Users
    if (!db.objectStoreNames.contains("users")) {
      db.createObjectStore("users", {
        keyPath: "id",
      });
    }

    // Cart
    if (!db.objectStoreNames.contains("cart")) {
      db.createObjectStore("cart", {
        keyPath: "id",
      });
    }

    // Orders
    if (!db.objectStoreNames.contains("orders")) {
      db.createObjectStore("orders", {
        keyPath: "id",
      });
    }

    // Reviews ✅
    if (!db.objectStoreNames.contains("reviews")) {
      const reviewStore = db.createObjectStore("reviews", {
        keyPath: "id",
      });

      reviewStore.createIndex("customerName", "customerName");
      reviewStore.createIndex("productName", "productName");
      reviewStore.createIndex("rating", "rating");
      reviewStore.createIndex("status", "status");
      reviewStore.createIndex("createdAt", "createdAt");
    }

    // Admins
    if (!db.objectStoreNames.contains("admins")) {
      db.createObjectStore("admins", {
        keyPath: "id",
      });
    }

    // Home Page
    if (!db.objectStoreNames.contains("homePage")) {
      db.createObjectStore("homePage", {
        keyPath: "id",
      });
    }

    if (!db.objectStoreNames.contains("addresses")) {
      db.createObjectStore("addresses", {
        keyPath: "id",
      });
    }

    if (!db.objectStoreNames.contains("wishlist")) {
      db.createObjectStore("wishlist", {
        keyPath: "id",
      });
    }

    if (!db.objectStoreNames.contains("coupons")) {
      db.createObjectStore("coupons", {
        keyPath: "id",
      });
    }
  },
});

export default dbPromise;
