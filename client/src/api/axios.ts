import axios from "axios";

const api = axios.create({
  baseURL: "https://server-2ypk.onrender.com/api", // || "http://localhost:5000/api"
  headers: {
    "Content-Type": "application/json",
  },
});

// Role from localStorage
api.interceptors.request.use((config) => {
  const role = localStorage.getItem("userRole") || "intern";
  config.headers["x-user-role"] = role;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  },
);

export default api;
