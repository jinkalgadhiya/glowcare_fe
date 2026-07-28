import { openDB } from "idb";

const dbPromise = openDB("GlowCareDB", 6, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("products")) {
      db.createObjectStore("products", {
        keyPath: "id",
      });
    }

    if (!db.objectStoreNames.contains("categories")) {
      db.createObjectStore("categories", {
        keyPath: "id",
      });
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
  },
});

export default dbPromise;