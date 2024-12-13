import axiosConfig from "../config/customizations/axiosConfig";

const login = async (credentials) => {
    const response = await axiosConfig.post('/auth/login', credentials);
    return response.data;
  };
  
  const register = async (userInfo) => {
    const response = await axiosConfig.post('/auth/register', userInfo);
    return response.data;
  };
  
  export default {
    login,
    register,
  };