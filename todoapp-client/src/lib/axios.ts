import axios from "axios";

export const BASE_API_URL = import.meta.env.VITE_CLIENT_API_BASE_URL || "http://localhost:8080/v1";

export default axios.create({
    baseURL: BASE_API_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_API_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
});
