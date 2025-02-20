import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = () => {
  const isAuthenticated  = useAuth();
//   console.log("auth:",isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;};
    
export default PrivateRoute;
