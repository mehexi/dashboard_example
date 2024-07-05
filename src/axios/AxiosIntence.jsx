import axios from "axios";

const BASE_URL = import.meta.env.VITE_URL;

// Public axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL 
});

export default axiosInstance;