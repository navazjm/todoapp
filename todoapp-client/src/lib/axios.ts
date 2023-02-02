import axios from "axios";

export const BASE_API_URL = import.meta.env.CLIENT_API_BASE_URL || "http://localhost:8080/v1";

export default axios.create({
    baseURL: BASE_API_URL
});
