const CURRENT_ADMIN_KEY = "currentAdmin";
const ADMIN_TOKEN_KEY = "adminToken";

// ===============================
// Admin Login
// ===============================

export const adminLogin = (admin, token) => {
  localStorage.setItem(
    CURRENT_ADMIN_KEY,
    JSON.stringify(admin),
  );

  localStorage.setItem(
    ADMIN_TOKEN_KEY,
    token,
  );
};

// ===============================
// Admin Logout
// ===============================

export const adminLogout = () => {
  localStorage.removeItem(CURRENT_ADMIN_KEY);
  localStorage.removeItem(ADMIN_TOKEN_KEY);
};

// ===============================
// Get Current Admin
// ===============================

export const getCurrentAdmin = () => {
  const admin = localStorage.getItem(
    CURRENT_ADMIN_KEY,
  );

  if (!admin) return null;

  try {
    return JSON.parse(admin);
  } catch (error) {
    console.error(
      "Invalid current admin data:",
      error,
    );

    return null;
  }
};

// ===============================
// Get Admin Token
// ===============================

export const getAdminToken = () => {
  return localStorage.getItem(
    ADMIN_TOKEN_KEY,
  );
};

// ===============================
// Admin Logged In
// ===============================

export const isAdminLoggedIn = () => {
  return !!getAdminToken();
};