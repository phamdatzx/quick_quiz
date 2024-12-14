import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: "http://localhost:8080/api"/* process.env.REACT_APP_API_BASE_URL */,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosConfig.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
  }
  console.log("Request Config:", config);
    return config;
  });

export default axiosConfig;