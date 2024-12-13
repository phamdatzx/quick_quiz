import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: "http://localhost:8080/api"/* process.env.REACT_APP_API_BASE_URL */,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosConfig.interceptors.request.use((config) => {
    const token = /* localStorage.getItem('token') */"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMUBnbWFpbC5jb20iLCJpYXQiOjE3MzQwNjI0NTEsImV4cCI6MTczNDE0ODg1MX0.YcWkX0rHqxgM6QjLMTapm1_LN2hbf68oJ8ITCuLE_QE"; 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
  }
  console.log("Request Config:", config);
    return config;
  });

export default axiosConfig;