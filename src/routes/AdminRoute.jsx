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

const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/admin/dashboard" element={<Dashboard />} />

      <Route path="/admin/categories" element={<Categories />} />

      {/* Create Category */}
      <Route path="/admin/categories/create" element={<AddCategory />} />

      {/* Edit Category (Same Page) */}
      <Route path="/admin/categories/edit/:id" element={<AddCategory />} />

      {/* Delete Category */}
      <Route path="/admin/categories/delete/:id" element={<DeleteCategory />} />

      {/* Products */}

      <Route path="/admin/products" element={<Products />} />

      <Route path="/admin/products/create" element={<AddProducts />} />

      <Route path="/admin/products/edit/:id" element={<AddProducts />} />

      {/* Orders */}

      <Route path="/admin/orders" element={<Orders />} />
    </Routes>
  );
};

export default AdminRoute;
