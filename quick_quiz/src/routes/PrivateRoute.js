import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, isAuthenticated }) => {
 
  const token = localStorage.getItem('token');
  if (isAuthenticated === null && token) {
    return null; 
  }

  return isAuthenticated ? children : <Navigate to="/SignIn" />;
};

export default PrivateRoute;