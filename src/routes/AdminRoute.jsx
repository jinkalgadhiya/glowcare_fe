import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminLogin from "../auth/AdminLogin";
import AdminProtectedRoute from "../auth/AdminProtectedRoute";

import Dashboard from "../admin/pages/Dashboard";
import HomePageSettings from "../admin/pages/HomePageSettings";

// Categories
import Categories from "../admin/pages/Categories";
import AddCategory from "../admin/pages/AddCategory";
import DeleteCategory from "../admin/components/category/DeleteCategory";

// Products
import Products from "../admin/pages/products";
import AddProducts from "../admin/pages/AddProducts";

// Orders
import Orders from "../admin/pages/Orders";

// Returns
import Returns from "../admin/pages/Return";

// Customers
import Customers from "../admin/pages/Customers";

// Profile
import Profile from "../admin/pages/Profile";

// Reviews
import Reviews from "../admin/pages/Reviews";

// Coupons
import Coupon from "../admin/pages/Coupon";

const AdminRoute = () => {
  return (
    <Routes>
      {/* ===============================
          ADMIN LOGIN
      =============================== */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      {/* ===============================
          DASHBOARD
      =============================== */}

      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <Dashboard />
          </AdminProtectedRoute>
        }
      />

      {/* ===============================
          HOME PAGE SETTINGS
      =============================== */}

      <Route
        path="/admin/home-page"
        element={
          <AdminProtectedRoute>
            <HomePageSettings />
          </AdminProtectedRoute>
        }
      />

      {/* ===============================
          CATEGORIES
      =============================== */}

      <Route
        path="/admin/categories"
        element={
          <AdminProtectedRoute>
            <Categories />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/categories/create"
        element={
          <AdminProtectedRoute>
            <AddCategory />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/categories/edit/:id"
        element={
          <AdminProtectedRoute>
            <AddCategory />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/categories/delete/:id"
        element={
          <AdminProtectedRoute>
            <DeleteCategory />
          </AdminProtectedRoute>
        }
      />

      {/* ===============================
          PRODUCTS
      =============================== */}

      <Route
        path="/admin/products"
        element={
          <AdminProtectedRoute>
            <Products />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/products/create"
        element={
          <AdminProtectedRoute>
            <AddProducts />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/products/edit/:id"
        element={
          <AdminProtectedRoute>
            <AddProducts />
          </AdminProtectedRoute>
        }
      />

      {/* ===============================
          ORDERS
      =============================== */}

      <Route
        path="/admin/orders"
        element={
          <AdminProtectedRoute>
            <Orders />
          </AdminProtectedRoute>
        }
      />

      {/* ===============================
          RETURNS
      =============================== */}

      <Route
        path="/admin/returns"
        element={
          <AdminProtectedRoute>
            <Returns />
          </AdminProtectedRoute>
        }
      />

      {/* ===============================
          CUSTOMERS
      =============================== */}

      <Route
        path="/admin/customers"
        element={
          <AdminProtectedRoute>
            <Customers />
          </AdminProtectedRoute>
        }
      />

      {/* ===============================
          PROFILE
      =============================== */}

      <Route
        path="/admin/profile"
        element={
          <AdminProtectedRoute>
            <Profile />
          </AdminProtectedRoute>
        }
      />

      {/* ===============================
          REVIEWS
      =============================== */}

      <Route
        path="/admin/reviews"
        element={
          <AdminProtectedRoute>
            <Reviews />
          </AdminProtectedRoute>
        }
      />

      {/* ===============================
          COUPONS
      =============================== */}

      <Route
        path="/admin/coupons"
        element={
          <AdminProtectedRoute>
            <Coupon />
          </AdminProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoute;