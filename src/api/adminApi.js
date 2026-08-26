import axios from "axios";
import { getAdminToken } from "../auth/AdminAuthService";

const adminApi = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

adminApi.interceptors.request.use(
  (config) => {
    const token = getAdminToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default adminApi;