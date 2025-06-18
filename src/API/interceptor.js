import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const AUTH_TOKEN = import.meta.env.VITE_TMDB_AUTH_KEY;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
  },
});

// Interceptor to add Bearer Token
axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
  return config;
});

export default axiosInstance;
