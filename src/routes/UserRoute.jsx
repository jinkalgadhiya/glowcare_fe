import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import NotFound from "../pages/NotFound";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import ProtectedRoute from "../auth/ProtectedRoute";
import Checkout from "../pages/Checkout";
import ShopPage from "../pages/shop/ShopPage";

const UserRoute = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/notfound" element={<NotFound />} />

      {/* Protected Routes */}
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

      <Route path="/shop/:category" element={<ShopPage />} />

      {/* Future Protected Routes */}
      {/* 
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      
      */}

      {/* <Route path="/best-sellers" element={<BestSellerPage />} /> */}
    </Routes>
  );
};

export default UserRoute;
