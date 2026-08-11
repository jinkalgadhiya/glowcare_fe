import { openDB } from "idb";

const dbPromise = openDB("GlowCareDB", 9, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("products")) {
      const productStore = db.createObjectStore("products", {
        keyPath: "id",
      });

      productStore.createIndex("productName", "productName");
      productStore.createIndex("category", "category");
      productStore.createIndex("status", "status");
    }

    if (!db.objectStoreNames.contains("categories")) {
      const categoryStore = db.createObjectStore("categories", {
        keyPath: "id",
      });

      categoryStore.createIndex("menuType", "menuType");
      categoryStore.createIndex("categoryType", "categoryType");
      categoryStore.createIndex("status", "status");
    }

    if (!db.objectStoreNames.contains("users")) {
      db.createObjectStore("users", {
        keyPath: "id",
      });
    }

    if (!db.objectStoreNames.contains("cart")) {
      db.createObjectStore("cart", {
        keyPath: "id",
      });
    }

    if (!db.objectStoreNames.contains("orders")) {
      db.createObjectStore("orders", {
        keyPath: "id",
      });
    }

    if (!db.objectStoreNames.contains("admins")) {
      db.createObjectStore("admins", {
        keyPath: "id",
      });
    }
  },
});

export default dbPromise;
