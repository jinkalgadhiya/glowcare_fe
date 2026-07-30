import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminLogin from "../auth/AdminLogin";
import Dashboard from "../admin/pages/Dashboard";

import Categories from "../admin/pages/Categories";
import AddCategory from "../admin/pages/AddCategory";
import DeleteCategory from "../admin/components/DeleteCategory";

import Products from "../admin/pages/Products";
import AddProducts from "../admin/pages/AddProducts";

import Orders from "../admin/pages/Orders";
import Customers from "../admin/pages/Customers";

import Profile from "../admin/pages/Profile";
import Reviews from "../admin/pages/Reviews";

const AdminRoute = () => {
  return (
    <Routes>
      {/* Login */}

      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Dashboard */}

      <Route path="/admin/dashboard" element={<Dashboard />} />

      {/* Categories */}

      <Route path="/admin/categories" element={<Categories />} />

      {/* Create Category */}

      <Route
        path="/admin/categories/create"
        element={<AddCategory />}
      />

      {/* Edit Category */}

      <Route
        path="/admin/categories/edit/:id"
        element={<AddCategory />}
      />

      {/* Delete Category */}

      <Route
        path="/admin/categories/delete/:id"
        element={<DeleteCategory />}
      />

      {/* Products */}

      <Route path="/admin/products" element={<Products />} />

      <Route
        path="/admin/products/create"
        element={<AddProducts />}
      />

      <Route
        path="/admin/products/edit/:id"
        element={<AddProducts />}
      />

      {/* Orders */}

      <Route path="/admin/orders" element={<Orders />} />

      {/* Customers */}

      <Route
        path="/admin/customers"
        element={<Customers />}
      />

      <Route path="/admin/profile" element={<Profile />} />

      <Route path="/admin/reviews" element={<Reviews />} />
    </Routes>
  );
};

export default AdminRoute;