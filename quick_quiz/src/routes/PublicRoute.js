import { Navigate } from "react-router-dom";

const PublicRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/home" /> : children;
};

export default PublicRoute;