import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import adminApi from "../api/adminApi";
import {
  getAdminToken,
  adminLogout,
} from "./AdminAuthService";

const AdminProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = getAdminToken();

      if (!token) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      try {
        const response = await adminApi.get("/admin/me");

        if (
          response.data.status === "success" &&
          response.data.data
        ) {
          setAuthorized(true);
        } else {
          adminLogout();
          setAuthorized(false);
        }
      } catch (error) {
        console.error("Admin authentication error:", error);

        adminLogout();
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, []);

  if (loading) {
    return null;
  }

  if (!authorized) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;