import React from "react";
import { Navigate } from "react-router-dom";

import {
  getToken,
  getCurrentUser,
} from "./AuthService";

const UserProtectedRoute = ({ children }) => {
  const token = getToken();
  const user = getCurrentUser();

  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
};

export default UserProtectedRoute;