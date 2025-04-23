import axios from "axios";

const LiveUrl = "https://cred-demo.onrender.com";
const LocalUrl = "http://127.0.0.1:8003";

const axiosInstance = axios.create({
  baseURL: LocalUrl, // Replace with your API base URL
});

export default axiosInstance;
