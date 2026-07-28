// AuthService.js

const CURRENT_USER_KEY = "currentUser";

export const login = (user) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY);

  if (!user) return null;

  return JSON.parse(user);
};

export const isLoggedIn = () => {
  return getCurrentUser() !== null;
};