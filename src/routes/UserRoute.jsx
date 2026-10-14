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

// Skin Analysis
import SkinAnalysis from "../pages/SkinAnalysis";
import SkinAnalysisResult from "../components/skinAnalysis/SkinAnalysisResult";
import ProtectedRoute from "../auth/UserProtectedRoute";

const UserRoute = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/cart" element={<Cart />} />

      {/* ================= SKIN ANALYSIS ================= */}

      <Route path="/skin-analysis" element={<SkinAnalysis />} />

      <Route path="/skin-analysis/result" element={<SkinAnalysisResult />} />

      {/* ================= SHOP ================= */}

      {/* Global Search */}
      <Route path="/shop" element={<ShopPage />} />

      {/* Category Shop */}
      <Route path="/shop/:category" element={<ShopPage />} />

      {/* ================= PRODUCT ================= */}

      <Route path="/product/:id" element={<ProductDetails />} />

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

      {/* ================= ADMIN ================= */}

      {/* Prevent "No routes matched" warning for admin routes */}
      <Route path="/admin/*" element={null} />
    </Routes>
  );
};

export default UserRoute;
