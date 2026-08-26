const CURRENT_USER_KEY = "currentUser";
const TOKEN_KEY = "token";

const ADMIN_USER_KEY = "adminUser";
const ADMIN_TOKEN_KEY = "adminToken";

// =====================================================
// CUSTOMER AUTH
// =====================================================

export const login = (user, token) => {
  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(user)
  );

  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(
    CURRENT_USER_KEY
  );

  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch (error) {
    console.error(
      "Invalid current user data:",
      error
    );

    // Remove corrupted user data
    localStorage.removeItem(
      CURRENT_USER_KEY
    );

    return null;
  }
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// =====================================================
// CUSTOMER LOGIN CHECK
// =====================================================

export const isLoggedIn = () => {
  const token = getToken();
  const user = getCurrentUser();

  return Boolean(token && user);
};

// =====================================================
// ADMIN AUTH
// =====================================================

export const adminLogin = (admin, token) => {
  localStorage.setItem(
    ADMIN_USER_KEY,
    JSON.stringify(admin)
  );

  localStorage.setItem(
    ADMIN_TOKEN_KEY,
    token
  );
};

export const adminLogout = () => {
  localStorage.removeItem(
    ADMIN_USER_KEY
  );

  localStorage.removeItem(
    ADMIN_TOKEN_KEY
  );
};

export const getAdminUser = () => {
  const admin = localStorage.getItem(
    ADMIN_USER_KEY
  );

  if (!admin) return null;

  try {
    return JSON.parse(admin);
  } catch (error) {
    console.error(
      "Invalid admin user data:",
      error
    );

    localStorage.removeItem(
      ADMIN_USER_KEY
    );

    return null;
  }
};

export const getAdminToken = () => {
  return localStorage.getItem(
    ADMIN_TOKEN_KEY
  );
};

export const isAdminLoggedIn = () => {
  const token = getAdminToken();
  const admin = getAdminUser();

  return Boolean(token && admin);
};