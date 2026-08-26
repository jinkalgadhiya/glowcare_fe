import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import ShopPage from "../pages/shop/ShopPage";
import ProductDetails from "../pages/shop/ProductDetails";
import UserProfile from "../pages/UserProfile";

import ProtectedRoute from "../auth/UserProtectedRoute";

const UserRoute = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/cart" element={<Cart />} />

      <Route
        path="/shop/:category"
        element={<ShopPage />}
      />

      <Route
        path="/product/:id"
        element={<ProductDetails />}
      />

      {/* ================= PROTECTED ================= */}

      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      {/* ================= USER PROFILE ================= */}

      <Route
        path="/user/*"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default UserRoute;