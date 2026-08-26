import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminLogin from "../auth/AdminLogin";
import AdminProtectedRoute from "../auth/AdminProtectedRoute";

import Dashboard from "../admin/pages/Dashboard";
import HomePageSettings from "../admin/pages/HomePageSettings";

import Categories from "../admin/pages/Categories";
import AddCategory from "../admin/pages/AddCategory";
import DeleteCategory from "../admin/components/DeleteCategory";

import Products from "../admin/pages/Products";
import AddProducts from "../admin/pages/AddProducts";

import Orders from "../admin/pages/Orders";
import Customers from "../admin/pages/Customers";

import Profile from "../admin/pages/Profile";
import Reviews from "../admin/pages/Reviews";

import Coupon from "../admin/pages/Coupon";

const AdminRoute = () => {
  return (
    <Routes>
      {/* Login */}
      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      {/* Dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <Dashboard />
          </AdminProtectedRoute>
        }
      />

      {/* Home Page Settings */}
      <Route
        path="/admin/home-page"
        element={
          <AdminProtectedRoute>
            <HomePageSettings />
          </AdminProtectedRoute>
        }
      />

      {/* Categories */}
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

      {/* Products */}
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

      {/* Orders */}
      <Route
        path="/admin/orders"
        element={
          <AdminProtectedRoute>
            <Orders />
          </AdminProtectedRoute>
        }
      />

      {/* Customers */}
      <Route
        path="/admin/customers"
        element={
          <AdminProtectedRoute>
            <Customers />
          </AdminProtectedRoute>
        }
      />

      {/* Profile */}
      <Route
        path="/admin/profile"
        element={
          <AdminProtectedRoute>
            <Profile />
          </AdminProtectedRoute>
        }
      />

      {/* Reviews */}
      <Route
        path="/admin/reviews"
        element={
          <AdminProtectedRoute>
            <Reviews />
          </AdminProtectedRoute>
        }
      />

      {/* Coupons */}
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