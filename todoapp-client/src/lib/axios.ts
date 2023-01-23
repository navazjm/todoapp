import axios from "axios";

export const BASE_API_URL = import.meta.env.API_URL || "http://localhost:8080";

export default axios.create({
    baseURL: BASE_API_URL
});
