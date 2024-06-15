import axios from "axios";


const BASE_URL = "http://localhost:5001";

// Public axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL 
});

export default axiosInstance;